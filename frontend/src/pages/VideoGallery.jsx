import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./PhotoGallery.css";

export default function VideoGallery() {
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await axios.get("/videos");

            const formatted = res.data.map(v => ({
                _id: v._id,
                title: v.title,
                video: `http://localhost:5000${v.video}`
            }));

            setVideos(formatted);
        } catch (err) {
            console.log(err);
        }
    };

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
        </section>
    );
}