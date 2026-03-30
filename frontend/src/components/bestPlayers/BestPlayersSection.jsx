import React, { useState } from "react";
import "./BestPlayersSection.css";

export default function BestPlayersSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const players = [
        {
            name: "Rahul Patil",
            img: "/playerimages/5.jpg",
            level: "National Player",
            medals: "🥇 3 Gold | 🥈 2 Silver",
            achievement: "National Archery Championship Winner"
        },
        {
            name: "Sneha Kulkarni",
            img: "/playerimages/2.jpg",
            level: "State Player",
            medals: "🥇 2 Gold",
            achievement: "State Level Champion"
        },
        {
            name: "Amit Deshmukh",
            img: "/playerimages/3.jpg",
            level: "International",
            medals: "🥇 1 Gold | 🥉 2 Bronze",
            achievement: "Represented India"
        },
        {
            name: "Pooja Sharma",
            img: "/playerimages/10.jpg",
            level: "District",
            medals: "🥇 4 Gold",
            achievement: "District Winner"
        },
        {
            name: "Rohit Jadhav",
            img: "/playerimages/9.jpg",
            level: "State Player",
            medals: "🥈 3 Silver",
            achievement: "Top 5 State Rank"
        },
        {
            name: "Anjali More",
            img: "/playerimages/7.jpg",
            level: "National",
            medals: "🥇 2 Gold | 🥉 1 Bronze",
            achievement: "National Finalist"
        }
    ];

    return (
        <section className="players">
            <h2 className="players-title">Our Best Players</h2>

            <div className="players-grid">
                {players.map((player, index) => (
                    <div
                        className="player-card"
                        key={index}
                        onClick={() =>
                            setActiveIndex(activeIndex === index ? null : index)
                        }
                    >
                        <img src={player.img} alt={player.name} />

                        <div
                            className={`overlay ${activeIndex === index ? "active" : ""
                                }`}
                        >
                            <h3>{player.name}</h3>
                            <p>{player.achievement}</p>
                            <span>{player.medals}</span>
                            <small>{player.level}</small>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}