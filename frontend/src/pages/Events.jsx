import React, { useState, useEffect, useRef } from "react";
import "./Events.css";

export default function Events() {
    const [activeEvent, setActiveEvent] = useState(null);
    const [show, setShow] = useState(false);
    const sectionRef = useRef();

    const eventsData = [
        {
            title: "Inter School Archery Event",
            date: "20 March 2026",
            type: "text", // text | pdf
            content:
                "This event focuses on young archers competing at school level. It encourages participation and skill development."
        },
        {
            title: "State Ranking Tournament",
            date: "10 April 2026",
            type: "pdf",
            file: "/events/sample.pdf"
        },
        {
            title: "Summer Training Camp",
            date: "01 May 2026",
            type: "text",
            content:
                "A special training camp for advanced players focusing on technique, fitness, and mental preparation."
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setShow(true);
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={`events ${show ? "show" : ""}`}>

            <div className="events-title">
                <img src="/bgimage/eventbg.jpg" alt="Events" />
            </div>

            <div className="events-grid">
                {eventsData.map((event, index) => (
                    <div
                        key={index}
                        className="event-card"
                        style={{ animationDelay: `${index * 0.15}s` }}
                        onClick={() => setActiveEvent(event)}
                    >
                        <div className="event-content">
                            <h3>{event.title}</h3>
                            <span>{event.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔥 Modal */}
            {activeEvent && (
                <div className="event-modal" onClick={() => setActiveEvent(null)}>
                    <div
                        className="event-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{activeEvent.title}</h2>
                        <p className="event-date">{activeEvent.date}</p>

                        {activeEvent.type === "pdf" ? (
                            <iframe
                                src={activeEvent.file}
                                title="PDF Viewer"
                            ></iframe>
                        ) : (
                            <p className="event-text">{activeEvent.content}</p>
                        )}

                        <button onClick={() => setActiveEvent(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}