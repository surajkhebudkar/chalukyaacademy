import React, { useState, useEffect, useRef } from "react";
import "./News.css";
import axios from "../utils/axiosInstance";

export default function News() {
    const [newsData, setNewsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeIndex, setActiveIndex] = useState(null);
    const [show, setShow] = useState(false);

    const sectionRef = useRef();

    // 👉 fetch news (backend pagination)
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    const fetchNews = async (page = 1) => {
        try {
            const res = await axios.get(`/news?page=${page}&limit=4`);
            setNewsData(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    // 👉 animation trigger
    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    // 👉 scroll top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

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
            setActiveIndex(null);
        }
    };

    // 👉 new badge logic
    const isNew = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
        return diff <= 3;
    };

    return (
        <section ref={sectionRef} className={`news ${show ? "show" : ""}`}>
            <div className="news-grid">
                {newsData.map((item) => (
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
                            alt={item.title}
                        />

                        {isNew(item.createdAt) && (
                            <span className="new-badge">NEW</span>
                        )}

                        <div
                            className={`news-overlay ${activeIndex === item._id ? "active" : ""}`}
                            onClick={() => setActiveIndex(null)}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔥 Pagination */}
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