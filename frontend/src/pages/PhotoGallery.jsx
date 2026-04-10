import React, { useState } from "react";
import "./PhotoGallery.css";

export default function PhotoGallery() {
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const galleryData = [
        {
            title: "Summer Camp",
            cover: "/gallery/summercamp/cover.jpg",
            photos: [
                "/gallery/summercamp/1.jpg",
                "/gallery/summercamp/2.jpg",
                "/gallery/summercamp/3.jpg"
            ]
        },
        {
            title: "Academy Matches",
            cover: "/gallery/matches/cover.jpg",
            photos: [
                "/gallery/matches/1.jpg",
                "/gallery/matches/2.jpg"
            ]
        },
        {
            title: "Events",
            cover: "/gallery/events/cover.jpg",
            photos: [
                "/gallery/events/1.jpg",
                "/gallery/events/2.jpg"
            ]
        }
    ];

    const nextImage = () => {
        setActiveImageIndex((prev) =>
            prev === activeAlbum.photos.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setActiveImageIndex((prev) =>
            prev === 0 ? activeAlbum.photos.length - 1 : prev - 1
        );
    };

    return (
        <section className="gallery">

            <div className="gallery-grid">
                {galleryData.map((album, index) => (
                    <div
                        key={index}
                        className="gallery-card"
                        style={{ animationDelay: `${index * 0.15}s` }}
                        onClick={() => setActiveAlbum(album)}
                    >
                        <img src={album.cover} alt={album.title} />
                        <div className="gallery-overlay">
                            <h3>{album.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {activeAlbum && (
                <div className="album-modal" onClick={() => setActiveAlbum(null)}>
                    <div
                        className="album-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="album-header">
                            <h2>{activeAlbum.title}</h2>
                            <span onClick={() => setActiveAlbum(null)}>✖</span>
                        </div>

                        <div className="photo-grid">
                            {activeAlbum.photos.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt=""
                                    onClick={() => setActiveImageIndex(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeAlbum && activeImageIndex !== null && (
                <div className="fullscreen" onClick={() => setActiveImageIndex(null)}>
                    <span className="close" onClick={() => setActiveImageIndex(null)}>✖</span>

                    <button className="prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                        ❮
                    </button>

                    <img
                        src={activeAlbum.photos[activeImageIndex]}
                        alt=""
                    />

                    <button className="next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                        ❯
                    </button>
                </div>
            )}
        </section>
    );
}