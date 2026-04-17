import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "./VideoSection.css";

const VideoSection = () => {

    const sectionRef = useRef();
    const [show, setShow] = useState(false);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get("/videos?limit=3");
                const data = res.data.data || res.data;
                setVideos(Array.isArray(data) ? data.slice(0, 3) : []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchVideos();
    }, []);

    return (
        <section className={`video-section ${show ? "show" : ""}`} ref={sectionRef}>
            <h2 className="videoTitle">Latest Videos</h2>

            <div className="videoContainer">
                {videos.map((item) => (

                    <div
                        className="videoCard"
                        key={item._id}
                        onClick={() => navigate("/videogallery")}
                    >

                        <video
                            src={
                                item.video
                                    ? `http://localhost:5000${item.video}`
                                    : `http://localhost:5000/uploads/videos/${item.video}`
                            }
                            muted
                            playsInline
                            preload="metadata"

                            onMouseEnter={(e) => {
                                const video = e.target;

                                video._hoverDelay = setTimeout(() => {

                                    video.currentTime = 2; // preview start point
                                    video.play();

                                    video._previewTimeout = setTimeout(() => {
                                        video.pause();
                                    }, 3000);

                                }, 500);
                            }}

                            onMouseLeave={(e) => {
                                const video = e.target;

                                clearTimeout(video._hoverDelay);
                                clearTimeout(video._previewTimeout);

                                video.pause();
                                video.currentTime = 0;
                            }}
                        />

                        <div className="videooverlay">
                            <h4>{item.title}</h4>
                        </div>

                    </div>

                ))}
            </div>
        </section>
    );
};

export default VideoSection;