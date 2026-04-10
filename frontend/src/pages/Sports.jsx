import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./Sports.css";

export default function Sports() {
    const [activeSport, setActiveSport] = useState(null);
    const [tab, setTab] = useState("history");

    const [branchesData, setBranchesData] = useState([]);
    const [activeBranch, setActiveBranch] = useState("");

    // ✅ MAP FIX FUNCTION
    const getMapUrl = (url) => {
        if (!url) return "";

        if (url.includes("output=embed")) return url;

        if (url.includes("google.com/maps")) {
            const query = url.split("q=")[1];
            if (query) {
                return `https://www.google.com/maps?q=${query}&output=embed`;
            }
        }

        return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
    };

    // ✅ FETCH
    const fetchSports = async () => {
        try {
            const res = await axios.get(`/sports`);
            const data = res.data.data || [];

            const formatted = data.map(branch => ({
                name: branch.branchName,
                image: branch.branchImage
                    ? `http://localhost:5000/uploads/sports/${branch.branchImage}`
                    : "/placeholder.png",
                location: branch.branchLocation,
                map: branch.branchMap,
                sports: (branch.sports || []).map(s => ({
                    name: s.name,
                    image: s.image
                        ? `http://localhost:5000/uploads/sports/${s.image}`
                        : "/placeholder.png",
                    history: s.history,
                    equipment: s.equipment || [],
                    coaches: s.coaches || []
                }))
            }));

            setBranchesData(formatted);

            // ✅ FIX: only set once
            if (formatted.length > 0) {
                setActiveBranch(prev => prev || formatted[0].name);
            }

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSports();
    }, []);

    return (
        <section className="sports">

            {/* BRANCH TABS */}
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

            {/* BRANCH DATA */}
            {branchesData
                .filter(branch => branch.name === activeBranch)
                .map((branch) => (
                    <div key={branch.name} className="branch-section animate-branch">

                        <div className="branch-header">
                            <img src={branch.image} alt={branch.name} />

                            <div className="branch-info">
                                <h2>{branch.name}</h2>
                                <p>{branch.location}</p>

                                {branch.map && (
                                    <iframe
                                        src={getMapUrl(branch.map)}
                                        width="100%"
                                        height="200"
                                        loading="lazy"
                                        title={branch.name}
                                    ></iframe>
                                )}
                            </div>
                        </div>

                        {/* SPORTS GRID */}
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

            {/* MODAL */}
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
                            <p className="sport-text">
                                {activeSport.history || "No history available"}
                            </p>
                        )}

                        {tab === "equipment" && (
                            <div className="equipment-grid">
                                {activeSport.equipment?.length > 0 ? (
                                    activeSport.equipment.map((item, i) => (
                                        <div key={i} className="equipment-card">
                                            <img
                                                src={
                                                    item.image
                                                        ? `http://localhost:5000/uploads/sports/${item.image}`
                                                        : "/placeholder.png"
                                                }
                                                alt={item.name}
                                            />
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
                                {activeSport.coaches?.length > 0 ? (
                                    activeSport.coaches.map((coach, i) => (
                                        <div key={i} className="coach-card">
                                            <img
                                                src={
                                                    coach.photo
                                                        ? `http://localhost:5000/uploads/sports/${coach.photo}`
                                                        : "/placeholder.png"
                                                }
                                                alt={coach.name}
                                            />
                                            <h4>{coach.name}</h4>
                                            <p className="coach-exp">
                                                Experience: {coach.experience}
                                            </p>

                                            <div className="badges">
                                                {coach.achievements?.map((ach, j) => (
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