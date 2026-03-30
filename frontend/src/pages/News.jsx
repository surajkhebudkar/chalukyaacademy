import React, { useState, useEffect, useRef } from "react";
import "./News.css";

export default function News() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [show, setShow] = useState(false);
    const sectionRef = useRef();

    const newsData = [
        {
            title: "State Archery Championship 2026",
            date: "12 Feb 2026",
            image: "/newsimages/1.jpg",
            isNew: true,
            details:
                "The state-level archery championship witnessed participation from over 200 athletes across Maharashtra. The competition highlighted exceptional talent and discipline."
        },
        {
            title: "National Training Camp Announced",
            date: "05 Feb 2026",
            image: "/newsimages/7.jpg",
            isNew: true,
            details:
                "A national-level training camp has been scheduled to prepare athletes for upcoming international tournaments."
        },
        {
            title: "District Level Winners Declared",
            date: "28 Jan 2026",
            image: "/newsimages/3.jpg",
            isNew: false,
            details:
                "Top performers from district competitions have been selected for state-level qualifiers."
        }
    ];
    // const [newsData, setNewsData] = useState([]);

    // useEffect(() => {
    //     fetch("/api/news")
    //         .then(res => res.json())
    //         .then(data => setNewsData(data));
    // }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`news ${show ? "show" : ""}`}>
            <h2 className="news-title">News</h2>

            <div className="news-grid">
                {newsData.map((item, index) => (
                    <div
                        key={index}
                        className="news-card"
                        style={{
                            animationDelay: `${index * 0.15}s`
                        }}
                        onClick={() =>
                            setActiveIndex(activeIndex === index ? null : index)
                        }
                    >
                        <img src={item.image} alt={item.title} />

                        {/* NEW TAG */}
                        {item.isNew && <span className="new-badge">NEW</span>}

                        <div
                            className={`news-overlay ${activeIndex === index ? "active" : ""
                                }`}
                        >
                            <div className="news-top">
                                <h3>{item.title}</h3>
                                <span>{item.date}</span>
                            </div>

                            <div className="news-details">
                                <p>{item.details}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}