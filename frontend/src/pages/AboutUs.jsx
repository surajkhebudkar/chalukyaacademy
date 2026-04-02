import React from "react";
import "./AboutUs.css";

export default function AboutUs() {

    const team = [
        {
            role: "Founder",
            name: "Mr. Founder Name",
            photo: "/team/imageperson.png",
            info: "Founder of the academy with 15+ years experience."
        },
        {
            role: "President",
            name: "Mr. President Name",
            photo: "/team/imageperson.png",
            info: "Leading the academy vision and development."
        },
        {
            role: "Vice President",
            name: "Mr. VP Name",
            photo: "/team/imageperson.png",
            info: "Managing operations and growth."
        },
        {
            role: "Secretary",
            name: "Mr. Secretary",
            photo: "/team/imageperson.png",
            info: "Handles administration and events."
        },
        {
            role: "Joint Secretary",
            name: "Mr. Joint Sec",
            photo: "/team/imageperson.png",
            info: "Supports academy management."
        },
        {
            role: "Member",
            name: "Team Member",
            photo: "/team/imageperson.png",
            info: "Active contributor in academy activities."
        }
    ];

    return (
        <section className="about">

            <div className="about-title">
                <img src="/bgimage/aboutusbg.jpg" alt="About" />
            </div>

            <div className="about-container">

                <div className="about-box">
                    <h2>About Academy</h2>
                    <p>
                        Our academy is dedicated to nurturing talent and building discipline
                        through sports. We provide professional coaching, modern facilities,
                        and a positive environment for athletes.
                    </p>
                </div>

                <div className="about-grid">

                    <div className="about-card">
                        <h3>Vision</h3>
                        <p>To become a leading sports academy producing national champions.</p>
                    </div>

                    <div className="about-card">
                        <h3>Mission</h3>
                        <p>Provide quality training, discipline, and opportunities for athletes.</p>
                    </div>

                    <div className="about-card">
                        <h3>Core Values</h3>
                        <ul>
                            <li>Discipline</li>
                            <li>Dedication</li>
                            <li>Teamwork</li>
                            <li>Excellence</li>
                        </ul>
                    </div>

                    <div className="about-card">
                        <h3>Branches</h3>
                        <p>Pune | Mumbai | Nashik</p>
                    </div>

                </div>
            </div>

            <div className="team-section">
                <h2>Our Team</h2>

                <div className="team-grid">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="team-card"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <img src={member.photo} alt={member.name} />
                            <h4>{member.name}</h4>
                            <p className="role">{member.role}</p>
                            <p className="info">{member.info}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}