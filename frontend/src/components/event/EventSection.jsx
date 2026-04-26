import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "./EventSection.css";

const EventSection = () => {
    const sectionRef = useRef();
    const [show, setShow] = useState(false);
    const [events, setEvents] = useState([]);
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
        const fetchEvents = async () => {
            try {
                const res = await axios.get("/events?limit=3");
                const data = res.data.data || res.data;

                setEvents(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <section
            className={`event-section ${show ? "show" : ""}`}
            ref={sectionRef}
        >
            <h2 className="eventTitle">Latest Events</h2>

            <div className="eventContainer">
                {(Array.isArray(events) ? events : []).map((item) => (
                    <div
                        className="eventCard"
                        key={item._id}
                        onClick={() => navigate("/events")}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={`http://localhost:5000/uploads/events/${item.image}`}
                            alt="event"
                        />

                        <div className="eventoverlay">
                            <h4>{item.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EventSection;