import React, { useState, useEffect, useRef } from "react";
import "./News.css";
import axios from "../utils/axiosInstance";

export default function News() {
    const [newsData, setNewsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [show, setShow] = useState(false);

    const itemsPerPage = 4;
    const sectionRef = useRef();

    // 👉 fetch news
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await axios.get("/news?page=1&limit=100");
            setNewsData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // 👉 animation trigger
    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    // 👉 click outside = close overlay
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".news-card")) {
                setActiveIndex(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // 👉 swipe down to close (mobile)
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        if (touchStartY.current < touchEndY.current - 50) {
            // swipe down
            setActiveIndex(null);
        }
    };

    // 👉 new badge logic
    const isNew = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
        return diff <= 3;
    };

    // 👉 pagination
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    const currentNews = Array.isArray(newsData)
        ? newsData.slice(indexOfFirst, indexOfLast)
        : [];

    const totalPages = Math.ceil(newsData.length / itemsPerPage) || 1;

    return (
        <section ref={sectionRef} className={`news ${show ? "show" : ""}`}>
            <div className="news-grid">
                {currentNews.map((item) => (
                    <div
                        className="news-card"
                        key={item._id}
                        onClick={() =>
                            setActiveIndex(activeIndex === item._id ? null : item._id)
                        }
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <img
                            src={`http://localhost:5000/uploads/news/${item.image}`}
                        />

                        {isNew(item.createdAt) && (
                            <span className="new-badge">NEW</span>
                        )}

                        <div
                            className={`news-overlay ${activeIndex === item._id ? "active" : ""
                                }`}
                            onClick={() => setActiveIndex(null)}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    ⬅ Prev
                </button>

                <span>
                    {currentPage} / {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next ➡
                </button>
            </div>
        </section>
    );
}