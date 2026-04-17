import React, { useEffect, useState, useRef } from "react";
import axios from "../../utils/axiosInstance";
import "./PhotoGallerySection.css";

const PhotoGallerySection = () => {
    const [photos, setPhotos] = useState([]);
    const [show, setShow] = useState(false);
    const galleryRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                }
            },
            { threshold: 0.2 }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {

        const fetchPhotos = async () => {
            try {
                const res = await axios.get("/gallery?limit=100");
                const albums = res.data.data || [];

                let allPhotos = [];

                albums.forEach(album => {
                    (album.photos || []).forEach(p => {
                        allPhotos.push(`http://localhost:5000${p}`);
                    });
                });

                allPhotos.sort(() => Math.random() - 0.5);

                const selected = allPhotos.slice(0, 15);

                setPhotos(selected);

                localStorage.setItem("gallery_cache", JSON.stringify(selected));
                localStorage.setItem("gallery_time", Date.now());

            } catch (err) {
                console.log(err);
            }
        };

        const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

        const cached = localStorage.getItem("gallery_cache");
        const time = localStorage.getItem("gallery_time");

        if (cached && time && (Date.now() - time < FIVE_DAYS)) {
            setPhotos(JSON.parse(cached));
        } else {
            fetchPhotos();
        }

    }, []);

    return (
        <section
            ref={galleryRef}
            className={`Hgallery section-dark ${show ? "show" : ""}`}
        >
            <h2 className="Hgallery-title">Photo Gallery</h2>

            <div className="Hgallery-grid">
                {photos.map((img, index) => (
                    <div className="Hgallery-item" key={index}>
                        <img src={img} alt="gallery" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PhotoGallerySection;