import React, { useEffect, useRef, useState } from "react";
import "./NewsSection.css";

const NewsSection = () => {

    const sectionRef = useRef();
    const [show, setShow] = useState(false);
    const [newss, setNews] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const dummyNews = [
            { id: 1, title: "Archery Championship 2026", image: "/newsimages/1.jpg" },
            { id: 2, title: "New Basketball Court Open", image: "/newsimages/3.jpg" },
            { id: 3, title: "Yoga Camp Registration Open", image: "/newsimages/7.jpg" }
        ];

        setNews(dummyNews);
    }, []);

    return (
        <section className={`news-section ${show ? "show" : ""}`} ref={sectionRef}>
            <h2 className="newsTitle">Latest News</h2>

            <div className="newsContainer">
                {newss.map((item) => (
                    <div className="newsCard" key={item.id}>
                        <img src={item.image} alt="news" />

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