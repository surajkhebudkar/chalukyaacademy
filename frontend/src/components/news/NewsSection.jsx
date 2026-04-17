import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "./NewsSection.css";

const NewsSection = () => {

    const sectionRef = useRef();
    const [show, setShow] = useState(false);
    const [newss, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get("/news?limit=3");
                const data = res.data.data || res.data;
                setNews(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchNews();
    }, []);

    return (
        <section className={`news-section ${show ? "show" : ""}`} ref={sectionRef}>
            <h2 className="newsTitle">Latest News</h2>

            <div className="newsContainer">
                {(Array.isArray(newss) ? newss : []).map((item) => (

                    <div
                        className="newsCard"
                        key={item._id}
                        onClick={() => navigate("/news")}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={`http://localhost:5000/uploads/news/${item.image}`}
                            alt="news"
                        />

                        <div className="newsoverlay">
                            <h4>{item.title}</h4>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default NewsSection;