import React, { useState } from "react";
import "./AboutUs.css";

export default function AboutUs() {

    const [activeTab, setActiveTab] = useState("foundation");

    const commonTeam = [
        { role: "Founder", name: "Mr. Founder Name", photo: "/team/imageperson.png", info: "15+ years experience" },
        { role: "President", name: "Mr. President Name", photo: "/team/imageperson.png", info: "Leads vision" },
        { role: "Vice President", name: "Mr. VP Name", photo: "/team/imageperson.png", info: "Operations head" },
        { role: "Secretary", name: "Mr. Secretary", photo: "/team/imageperson.png", info: "Admin & events" },
        { role: "Joint Secretary", name: "Mr. Joint Sec", photo: "/team/imageperson.png", info: "Support management" },
        { role: "Member", name: "Team Member", photo: "/team/imageperson.png", info: "Contributor" }
    ];

    const sportsTeam = [
        { role: "Branch Head (Kolhapur)", name: "Kolhapur Head", photo: "/team/imageperson.png", info: "Kolhapur lead" },
        { role: "Branch Head (Sangli)", name: "Sangli Head", photo: "/team/imageperson.png", info: "Sangli lead" },
        ...commonTeam
    ];

    const renderCards = (team) => (
        <div className="team-grid premium-fade">
            {team.map((m, i) => (
                <div
                    key={i}
                    className="team-card premium-card"
                    style={{ animationDelay: `${i * 0.08}s` }}
                >
                    <img src={m.photo} alt="" />
                    <h4>{m.name}</h4>
                    <p className="role">{m.role}</p>
                    <p className="info">{m.info}</p>
                </div>
            ))}
        </div>
    );

    return (
        <section className="about">

            <div className="tabs-container">
                <button
                    className={activeTab === "foundation" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("foundation")}
                >
                    Foundation
                </button>

                <button
                    className={activeTab === "sports" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("sports")}
                >
                    Sports Academy
                </button>

                <button
                    className={activeTab === "finance" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("finance")}
                >
                    Micro Finance
                </button>
            </div>

            {/* ================= FOUNDATION ================= */}
            {activeTab === "foundation" && (
                <div className="tab-content premium-slide">

                    <div className="title-aboutus">
                        <h2>Chalukyas Atmanirbhar Sports Foundation</h2>
                    </div>

                    <div className="about-container">
                        <div className="about-box">
                            <h2>About Foundation</h2>
                            <p>
                                Empowering youth through sports, education, and development
                                to build a stronger and self-reliant future.
                            </p>
                        </div>

                        <div className="about-grid">

                            <div className="about-card">
                                <i className="bi bi-eye-fill"></i>
                                <h3>Vision</h3>
                                <p>
                                    To empower youth and create future leaders through
                                    discipline, sports, and opportunities.
                                </p>
                            </div>

                            <div className="about-card">
                                <i className="bi bi-bullseye"></i>
                                <h3>Mission</h3>
                                <p>
                                    To provide support, training, and resources that help
                                    individuals achieve excellence in sports and life.
                                </p>
                            </div>

                            <div className="about-card">
                                <i className="bi bi-stars"></i>
                                <h3>Core Values</h3>
                                <p>
                                    Discipline, dedication, teamwork, and continuous growth
                                    are the pillars of our foundation.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="team-section">
                        <h2>Foundation Team</h2>
                        {renderCards(commonTeam)}
                    </div>

                </div>
            )}

            {/* ================= SPORTS ================= */}
            {activeTab === "sports" && (
                <div className="tab-content premium-slide">

                    <div className="title-aboutus">
                        <h2>Chalukyas Sports Academy</h2>
                    </div>

                    <div className="about-container">
                        <div className="about-box">
                            <h2>About Academy</h2>
                            <p>
                                We provide structured training, professional coaching, and modern facilities
                                to develop athletes for district, state, and national level competitions.
                            </p>
                        </div>

                        <div className="about-grid">

                            <div className="about-card">
                                <i className="bi bi-trophy-fill"></i>
                                <h3>High Performance Training</h3>
                                <p>
                                    Professional coaching programs designed to prepare athletes
                                    for district, state, and national competitions.
                                </p>
                            </div>

                            <div className="about-card">
                                <i className="bi bi-building"></i>
                                <h3>Modern Facilities</h3>
                                <p>
                                    Well-equipped grounds, training equipment, and safe
                                    environment to support athlete growth.
                                </p>
                            </div>

                            <div className="about-card">
                                <i className="bi bi-graph-up-arrow"></i>
                                <h3>Athlete Development</h3>
                                <p>
                                    Continuous skill improvement, fitness training,
                                    and performance tracking for long-term success.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="team-section">
                        <h2>Academy Team</h2>
                        {renderCards(sportsTeam)}
                    </div>

                </div>
            )}

            {/* ================= FINANCE ================= */}
            {activeTab === "finance" && (
                <div className="tab-content premium-slide">

                    <div className="title-aboutus">
                        <h2>Chalukyas Micro Finance</h2>
                    </div>

                    <div className="about-container">
                        <div className="about-box">
                            <h2>About Finance</h2>
                            <p>
                                Providing financial support and empowering individuals and small businesses
                                through accessible funding and growth opportunities.
                            </p>
                        </div>

                        <div className="about-grid">

                            <div className="about-card">
                                <i className="bi bi-cash-stack"></i>
                                <h3>Loans</h3>
                                <p>
                                    Quick and easy loan services to support personal and business needs
                                    with flexible repayment options.
                                </p>
                            </div>

                            <div className="about-card">
                                <i className="bi bi-briefcase-fill"></i>
                                <h3>Business Support</h3>
                                <p>
                                    Financial assistance and guidance to help small businesses grow,
                                    scale, and succeed in competitive markets.
                                </p>
                            </div>

                            <div className="about-card">
                                <i className="bi bi-people-fill"></i>
                                <h3>Women Empowerment</h3>
                                <p>
                                    Special financial programs designed to empower women and
                                    support entrepreneurship and independence.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="team-section">
                        <h2>Finance Team</h2>
                        {renderCards(commonTeam)}
                    </div>

                </div>
            )}

        </section>
    );
}