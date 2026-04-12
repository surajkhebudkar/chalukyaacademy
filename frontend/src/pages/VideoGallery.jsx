import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./PhotoGallery.css";

export default function VideoGallery() {
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);

    // ✅ pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ✅ fetch with pagination
    useEffect(() => {
        fetchVideos(currentPage);
    }, [currentPage]);

    const fetchVideos = async (page = 1) => {
        try {
            const res = await axios.get(`/videos?page=${page}&limit=6`);

            const formatted = (res.data.data || []).map(v => ({
                _id: v._id,
                title: v.title,
                video: `http://localhost:5000${v.video}`
            }));

            setVideos(formatted);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ scroll top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    return (
        <section className="gallery">

            <div className="gallery-grid">
                {videos.map((v, index) => (
                    <div
                        key={v._id}
                        className="gallery-card"
                        style={{ animationDelay: `${index * 0.15}s` }}
                        onClick={() => setActiveVideo(v)}
                    >
                        <video
                            src={v.video}
                            muted
                            loop
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => {
                                e.target.pause();
                                e.target.currentTime = 0;
                            }}
                            style={{
                                width: "100%",
                                height: "280px",
                                objectFit: "cover"
                            }}
                        />

                        <div className="gallery-overlay">
                            <h3>{v.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {activeVideo && (
                <div className="fullscreen" onClick={() => setActiveVideo(null)}>
                    <span
                        className="close"
                        onClick={() => setActiveVideo(null)}
                    >
                        ✖
                    </span>

                    <video
                        src={activeVideo.video}
                        controls
                        autoPlay
                        style={{ maxWidth: "90%", maxHeight: "90%" }}
                    />
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