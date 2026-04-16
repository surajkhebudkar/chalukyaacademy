import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./PhotoGallery.css";

export default function PhotoGallery() {
    const [galleryData, setGalleryData] = useState([]);
    const [activeAlbum, setActiveAlbum] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchGallery(currentPage);
    }, [currentPage]);

    const fetchGallery = async (page = 1) => {
        try {
            const res = await axios.get(`/gallery?page=${page}&limit=6`);

            const formatted = (res.data.data || []).map(item => ({
                _id: item._id,
                title: item.title,
                cover: `http://localhost:5000${item.coverImage}`,
                photos: item.photos.map(p => `http://localhost:5000${p}`)
            }));

            setGalleryData(formatted);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

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
                        key={album._id}
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

            {/* ✅ PAGINATION (NO DESIGN CHANGE) */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    ⬅ Prev
                </button>

                <span>
                    {currentPage} / {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next ➡
                </button>
            </div>
        </section>
    );
}