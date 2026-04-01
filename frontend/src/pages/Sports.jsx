import React, { useState } from "react";
import "./Sports.css";

export default function Sports() {
    const [activeSport, setActiveSport] = useState(null);
    const [tab, setTab] = useState("history");

    const sportsData = [
        {
            name: "Archery",
            image: "/sports/archery.jpg",
            history:
                "Archery is an ancient sport requiring focus, precision, and discipline.",
            equipment: [
                { name: "Bow", image: "/equipments/bow.jpg" },
                { name: "Arrow", image: "/equipments/arrow.jpg" }
            ],
            coaches: [
                {
                    name: "Coach Rahul",
                    photo: "/coaches/trainer.png",
                    experience: "8 Years",
                    achievements: ["National Medalist", "Level 2 Certified"]
                }
            ]
        },
        {
            name: "Basketball",
            image: "/sports/basketball.jpg",
            history:
                "Basketball is one of the most popular sports worldwide.",
            equipment: [
                { name: "Basketball", image: "/equipments/basketball.jpg" }
            ],
            coaches: [
                {
                    name: "Coach Amit",
                    photo: "/coaches/trainer.png",
                    experience: "5 Years",
                    achievements: ["State Champion", "Level 2 Certified"]
                }
            ]
        },
        {
            name: "Fencing",
            image: "/sports/fencing.jpg",
            history: "Fencing evolved from sword fighting.",
            equipment: [
                { name: "Fencing", image: "/equipments/fencing.jpg" }
            ],
            coaches: [
                {
                    name: "Coach Amit",
                    photo: "/coaches/trainer.png",
                    experience: "5 Years",
                    achievements: ["State Champion", "Level 2 Certified"]
                }
            ]
        },
        {
            name: "Gymnastic",
            image: "/sports/gymnastic.jpg",
            history: "Gymnastics builds strength and flexibility.",
            equipment: [
                { name: "Gymnastics", image: "/equipments/gymnastics.jpg" }
            ],
            coaches: [
                {
                    name: "Coach Amit",
                    photo: "/coaches/trainer.png",
                    experience: "5 Years",
                    achievements: ["State Champion", "Level 2 Certified"]
                }
            ]
        },
        {
            name: "Kurash",
            image: "/sports/kurash.jpg",
            history: "Kurash is a traditional wrestling sport.",
            equipment: [],
            coaches: []
        },
        {
            name: "MMA",
            image: "/sports/mma.jpg",
            history: "Mixed Martial Arts combines various combat styles.",
            equipment: [],
            coaches: []
        },
        {
            name: "Skating",
            image: "/sports/skating.jpg",
            history: "Skating is both fun and competitive.",
            equipment: [],
            coaches: []
        },
        {
            name: "Sports Nursery",
            image: "/sports/nursery.jpg",
            history: "Basic sports training for kids.",
            equipment: [],
            coaches: []
        },
        {
            name: "Yoga",
            image: "/sports/yoga.jpeg",
            history: "Yoga promotes physical and mental wellness.",
            equipment: [],
            coaches: []
        }
    ];

    return (
        <section className="sports">

            <div className="sports-title">
                <h1>Our Sports</h1>
            </div>

            {/* Grid */}
            <div className="sports-grid">
                {sportsData.map((sport, index) => (
                    <div
                        key={index}
                        className="sport-card"
                        onClick={() => {
                            setActiveSport(sport);
                            setTab("history");
                        }}
                    >
                        <img src={sport.image} alt={sport.name} />
                        <div className="sport-overlay">
                            <h3>{sport.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {activeSport && (
                <div className="sport-modal" onClick={() => setActiveSport(null)}>
                    <div
                        className="sport-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{activeSport.name}</h2>

                        {/* Tabs */}
                        <div className="tabs">
                            <button onClick={() => setTab("history")}>History</button>
                            <button onClick={() => setTab("equipment")}>Equipment</button>
                            <button onClick={() => setTab("coaches")}>Coaches</button>
                        </div>

                        {/* History */}
                        {tab === "history" && (
                            <p className="sport-text">{activeSport.history}</p>
                        )}

                        {/* Equipment */}
                        {tab === "equipment" && (
                            <div className="equipment-grid">
                                {activeSport.equipment.length > 0 ? (
                                    activeSport.equipment.map((item, i) => (
                                        <div key={i} className="equipment-card">
                                            <img src={item.image} alt={item.name} />
                                            <p>{item.name}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No equipment info available</p>
                                )}
                            </div>
                        )}

                        {/* Coaches */}
                        {tab === "coaches" && (
                            <div className="coach-grid">
                                {activeSport.coaches.length > 0 ? (
                                    activeSport.coaches.map((coach, i) => (
                                        <div key={i} className="coach-card">
                                            <img src={coach.photo} alt={coach.name} />
                                            <h4>{coach.name}</h4>

                                            <p className="coach-exp">
                                                Experience: {coach.experience}
                                            </p>

                                            <div className="badges">
                                                {coach.achievements.map((ach, j) => (
                                                    <span key={j} className="badge">
                                                        🏆 {ach}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No coaches available</p>
                                )}
                            </div>
                        )}

                        <button onClick={() => setActiveSport(null)}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}