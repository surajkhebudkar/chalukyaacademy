import React, { useState } from "react";
import "./Sports.css";

export default function Sports() {
    const [activeSport, setActiveSport] = useState(null);
    const [tab, setTab] = useState("history");

    // 👉 NEW STATE (branch select)
    const [activeBranch, setActiveBranch] = useState("Kolhapur Branch");

    const branchesData = [
        {
            name: "Kolhapur Branch",
            image: "/branches/kolhapur.jpg",
            location: "Kolhapur, Maharashtra",
            map: "https://www.google.com/maps?q=kolhapur&output=embed",

            sports: [
                {
                    name: "Archery",
                    image: "/sports/archery.jpg",
                    history: "Archery is an ancient sport requiring focus and precision.",
                    equipment: [
                        { name: "Bow", image: "/equipments/bow.jpg" },
                        { name: "Arrow", image: "/equipments/arrow.jpg" }
                    ],
                    coaches: [
                        {
                            name: "Coach Rahul",
                            photo: "/coaches/trainer.png",
                            experience: "8 Years",
                            achievements: ["State Champion", "Level 2 Certified"]
                        }
                    ]
                },
                {
                    name: "Basketball",
                    image: "/sports/basketball.jpg",
                    history: "Basketball is one of the most popular sports.",
                    equipment: [
                        { name: "Basketball", image: "/equipments/basketball.jpg" }
                    ],
                    coaches: [{
                        name: "Coach Rahul",
                        photo: "/coaches/trainer.png",
                        experience: "8 Years",
                        achievements: ["State Champion", "Level 2 Certified"]
                    }]
                },
                {
                    name: "Fencing",
                    image: "/sports/fencing.jpg",
                    history: "Fencing evolved from sword fighting.",
                    equipment: [],
                    coaches: []
                },
                {
                    name: "MMA",
                    image: "/sports/mma.jpg",
                    history: "Mixed Martial Arts combines combat styles.",
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
                    name: "Gymnastic",
                    image: "/sports/gymnastic.jpg",
                    history: "Gymnastics builds strength.",
                    equipment: [],
                    coaches: []
                },
                {
                    name: "Kurash",
                    image: "/sports/kurash.jpg",
                    history: "Traditional wrestling sport.",
                    equipment: [],
                    coaches: []
                },
                {
                    name: "Skating",
                    image: "/sports/skating.jpg",
                    history: "Fun and competitive sport.",
                    equipment: [],
                    coaches: []
                },
                {
                    name: "Yoga",
                    image: "/sports/yoga.jpeg",
                    history: "Improves mental and physical health.",
                    equipment: [],
                    coaches: []
                }
            ]
        },

        {
            name: "Sangli Branch",
            image: "/branches/sangli.jpg",
            location: "Sangli, Maharashtra",
            map: "https://www.google.com/maps?q=sangli&output=embed",

            sports: [
                {
                    name: "Gymnastic",
                    image: "/sports/gymnastic.jpg",
                    history: "Gymnastics builds flexibility.",
                    equipment: [],
                    coaches: [{
                        name: "Coach Rahul",
                        photo: "/coaches/trainer.png",
                        experience: "8 Years",
                        achievements: ["State Champion", "Level 2 Certified"]
                    }]
                },
                {
                    name: "Kurash",
                    image: "/sports/kurash.jpg",
                    history: "Traditional sport.",
                    equipment: [],
                    coaches: [{
                        name: "Coach Rahul",
                        photo: "/coaches/trainer.png",
                        experience: "8 Years",
                        achievements: ["State Champion", "Level 2 Certified"]
                    }]
                },
                {
                    name: "Skating",
                    image: "/sports/skating.jpg",
                    history: "Speed and balance sport.",
                    equipment: [],
                    coaches: []
                },
                {
                    name: "Yoga",
                    image: "/sports/yoga.jpeg",
                    history: "Mind-body balance.",
                    equipment: [],
                    coaches: []
                }
            ]
        }
    ];

    return (
        <section className="sports">

            <div className="sports-title">
                <img src="/bgimage/sportbg.jpg" alt="Sports" />
            </div>

            <div className="branch-tabs">
                {branchesData.map((branch, i) => (
                    <button
                        key={i}
                        className={activeBranch === branch.name ? "active-tab" : ""}
                        onClick={() => setActiveBranch(branch.name)}
                    >
                        {branch.name}
                    </button>
                ))}
            </div>

            {branchesData
                .filter(branch => branch.name === activeBranch)
                .map((branch, bIndex) => (
                    <div key={activeBranch} className="branch-section animate-branch">

                        <div className="branch-header">
                            <img src={branch.image} alt={branch.name} />

                            <div className="branch-info">
                                <h2>{branch.name}</h2>
                                <p>{branch.location}</p>

                                <iframe
                                    src={branch.map}
                                    width="100%"
                                    height="200"
                                    loading="lazy"
                                    title={branch.name}
                                ></iframe>
                            </div>
                        </div>

                        <div className="sports-grid">
                            {branch.sports.map((sport, index) => (
                                <div
                                    key={index}
                                    className="sport-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
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
                    </div>
                ))}

            {activeSport && (
                <div className="sport-modal" onClick={() => setActiveSport(null)}>
                    <div
                        className="sport-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>{activeSport.name}</h2>

                        <div className="tabs">
                            <button onClick={() => setTab("history")}>History</button>
                            <button onClick={() => setTab("equipment")}>Equipment</button>
                            <button onClick={() => setTab("coaches")}>Coaches</button>
                        </div>

                        {tab === "history" && (
                            <p className="sport-text">{activeSport.history}</p>
                        )}

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
                                    <p>No equipment available</p>
                                )}
                            </div>
                        )}

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