import React, { useEffect, useState, useRef } from "react";
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
        const images = [
            "/galleryimages/1.jpg",
            "/galleryimages/2.jpg",
            "/galleryimages/3.jpg",
            "/galleryimages/4.jpg",
            "/galleryimages/5.jpg",
            "/galleryimages/6.jpg",
            "/galleryimages/7.jpg",
            "/galleryimages/8.jpg",
            "/galleryimages/9.jpg",
            "/galleryimages/10.jpg",
            "/galleryimages/11.jpg",
            "/galleryimages/12.jpg",
            "/galleryimages/13.jpg",
            "/galleryimages/14.jpg",
            "/galleryimages/15.jpg",
        ];

        setPhotos(images);
    }, []);

    return (
        <section
            ref={galleryRef}
            className={`gallery section-dark ${show ? "show" : ""}`}
        >
            <h2 className="gallery-title">Photo Gallery</h2>

            <div className="gallery-grid">
                {photos.map((img, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={img} alt="gallery" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PhotoGallerySection;