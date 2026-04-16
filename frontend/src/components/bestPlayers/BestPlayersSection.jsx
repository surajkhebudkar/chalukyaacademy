import React, { useState, useEffect, useRef } from "react";
import axios from "../../utils/axiosInstance";
import "./BestPlayersSection.css";

export default function BestPlayersSection() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [show, setShow] = useState(false);
    const [players, setPlayers] = useState([]);

    const sectionRef = useRef();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await axios.get("/players?limit=6");

                const formatted = (res.data.data || []).map(p => ({
                    name: p.name,
                    img: p.image
                        ? `http://localhost:5000/uploads/bestplayers/${p.image}`
                        : "/placeholder.png",
                    level: p.level,
                    medals: p.medals,
                    achievement: p.achievement
                }));

                setPlayers(formatted);

            } catch (err) {
                console.log(err);
            }
        };

        fetchPlayers();
    }, []);

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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".player-card")) {
                setActiveIndex(null);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`players ${show ? "show" : ""}`}
        >
            <h2 className="players-title">Our Best Players</h2>

            <div className="players-grid">
                {players.map((player, index) => (
                    <div
                        className="player-card"
                        key={index}
                        style={{
                            animationDelay: `${index * 0.12}s`,
                            transitionDelay: `${index * 0.05}s`
                        }}
                        onClick={() =>
                            setActiveIndex(activeIndex === index ? null : index)
                        }
                    >
                        <img src={player.img} alt={player.name} />

                        <div
                            className={`overlay ${activeIndex === index ? "active" : ""
                                }`}
                        >
                            <h3 className="hpname">{player.name}</h3>
                            <p className="hpachie">{player.achievement}</p>
                            <span className="hpmedals">{player.medals}</span>
                            <small className="hplevel">{player.level}</small>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}