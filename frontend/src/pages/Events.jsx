import React, { useState, useEffect, useRef } from "react";
import "./Events.css";

export default function Events() {
    const [activeEvent, setActiveEvent] = useState(null);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const sectionRef = useRef();

    const eventsData = [
        {
            title: "Inter School Archery Event",
            date: "2026-04-20",
            image: "/events/eventimages/1.jpeg",
            isNew: true,
            type: "text",
            category: "upcoming",
            content: "School level competition for young archers."
        },
        {
            title: "State Ranking Tournament",
            date: "2026-03-10",
            image: "/events/eventimages/2.jpg",
            isNew: true,
            type: "pdf",
            category: "upcoming",
            file: "/events/eventpdf/sample.pdf"
        },
        {
            title: "District Championship",
            date: "2026-01-15",
            image: "/events/eventimages/3.jpg",
            isNew: false,
            type: "text",
            category: "past",
            content: "District level winners selected."
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setShow(true),
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const filteredEvents = eventsData
        .filter(e =>
            e.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter(e => (filter === "all" ? true : e.category === filter))
        .sort((a, b) => {
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return new Date(b.date) - new Date(a.date);
        });

    return (
        <section ref={sectionRef} className={`events ${show ? "show" : ""}`}>

            <div className="events-title">
               
            </div>

            <div className="events-controls">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                </select>
            </div>

            <div className="events-grid">
                {filteredEvents.map((event, index) => (
                    <div
                        key={index}
                        className="event-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setActiveEvent(event)}
                    >
                        <img src={event.image} alt={event.title} />

                        {event.isNew && <span className="new-badge">NEW</span>}

                        <div className="event-overlay">
                            <h3>{event.title}</h3>
                            <span>{event.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {activeEvent && (
                <div className="event-modal" onClick={() => setActiveEvent(null)}>
                    <div
                        className="event-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{activeEvent.title}</h2>
                        <p className="event-date">{activeEvent.date}</p>

                        {activeEvent.type === "pdf" ? (
                            <>
                                <iframe src={activeEvent.file} title="PDF"></iframe>
                                <a
                                    href={activeEvent.file}
                                    download
                                    className="download-btn"
                                >
                                    Download PDF
                                </a>
                            </>
                        ) : (
                            <p className="event-text">{activeEvent.content}</p>
                        )}

                        <button onClick={() => setActiveEvent(null)}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}