import React, { useState, useEffect, useRef } from "react";
import "./Events.css";
import axios from "../utils/axiosInstance";

export default function Events() {
    const [eventsData, setEventsData] = useState([]);
    const [activeEvent, setActiveEvent] = useState(null);
    const [show, setShow] = useState(false);
    const sectionRef = useRef();

    // ✅ Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ✅ Fetch events (backend pagination)
    const fetchEvents = async (page = 1) => {
        try {
            const res = await axios.get(`/events?page=${page}&limit=6`);
            setEventsData(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ Reload on page change
    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]);

    // ✅ Animation trigger
    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    // ✅ Scroll top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    // ✅ NEW badge logic
    const isNew = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
        return diff <= 3;
    };

    return (
        <section ref={sectionRef} className={`events ${show ? "show" : ""}`}>

            <div className="events-grid">
                {eventsData.map((event) => (
                    <div
                        key={event._id}
                        className="event-card"
                        onClick={() => setActiveEvent(event)}
                    >
                        <img
                            src={`http://localhost:5000/uploads/events/${event.image}`}
                            alt={event.title}
                        />

                        {isNew(event.createdAt) && (
                            <span className="new-badge">NEW</span>
                        )}

                        <div className="event-overlay">
                            <h3>{event.title}</h3>
                            <span>
                                {new Date(event.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ MODAL */}
            {activeEvent && (
                <div
                    className="event-modal"
                    onClick={() => setActiveEvent(null)}
                >
                    <div
                        className="event-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{activeEvent.title}</h2>

                        <p className="event-date">
                            {new Date(activeEvent.date).toLocaleDateString()}
                        </p>

                        <p className="event-text">
                            {activeEvent.description}
                        </p>

                        <button onClick={() => setActiveEvent(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* ✅ PAGINATION */}
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