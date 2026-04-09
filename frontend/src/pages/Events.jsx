import React, { useState, useEffect, useRef } from "react";
import "./Events.css";
import axios from "../utils/axiosInstance";

export default function Events() {
    const [eventsData, setEventsData] = useState([]);
    const [activeEvent, setActiveEvent] = useState(null);
    const [show, setShow] = useState(false);
    const sectionRef = useRef();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get("/events?page=1&limit=100");
            setEventsData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    const isNew = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
        return diff <= 3;
    };

    return (
        <section ref={sectionRef} className={`events ${show ? "show" : ""}`}>
            <div className="events-grid">
                {eventsData.map((event, index) => (
                    <div
                        key={event._id}
                        className="event-card"
                        onClick={() => setActiveEvent(event)}
                    >
                        <img
                            src={`http://localhost:5000/uploads/events/${event.image}`}
                        />

                        {isNew(event.createdAt) && (
                            <span className="new-badge">NEW</span>
                        )}

                        <div className="event-overlay">
                            <h3>{event.title}</h3>
                            <span>{new Date(event.date).toLocaleDateString()}</span>
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
                        <p className="event-date">
                            {new Date(activeEvent.date).toLocaleDateString()}
                        </p>

                        <p className="event-text">{activeEvent.description}</p>

                        <button onClick={() => setActiveEvent(null)}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}