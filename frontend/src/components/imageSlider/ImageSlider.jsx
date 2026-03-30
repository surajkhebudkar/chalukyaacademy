import { useEffect, useState, useRef } from "react";
import "./ImageSlider.css";

const slides = [
    { img: "/sliderimages/1.jpg", title: "Chalukya Sports Academy" },
    { img: "/sliderimages/2.jpg", title: "Professional Training" },
    { img: "/sliderimages/3.jpg", title: "Championship Events" },
    { img: "/sliderimages/4.jpg", title: "Modern Facilities" },
    { img: "/sliderimages/5.jpg", title: "Modern Demos" },
    { img: "/sliderimages/6.jpg", title: "Modern Demos" },
    { img: "/sliderimages/7.jpg", title: "Modern Demos" },
    { img: "/sliderimages/8.jpg", title: "Modern Demos" },
    { img: "/sliderimages/9.jpg", title: "Modern Demos" },
    { img: "/sliderimages/10.jpg", title: "Modern Demos" },
];

const ImageSlider = () => {
    const [current, setCurrent] = useState(0);
    const [show, setShow] = useState(false);
    const sliderRef = useRef();
    const touchStartX = useRef(0);

    // 🔥 auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // 🔥 scroll animation trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sliderRef.current) observer.observe(sliderRef.current);

        return () => observer.disconnect();
    }, []);

    // 👉 swipe
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;

        if (diff > 50) {
            setCurrent((prev) => (prev + 1) % slides.length);
        } else if (diff < -50) {
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        }
    };

    return (
        <div
            ref={sliderRef}
            className={`slider ${show ? "show" : ""}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === current ? "active" : ""}`}>
                    <img src={slide.img} alt="slide" />

                    <div className="slideroverlay">
                        <h2>{slide.title}</h2>
                    </div>
                </div>
            ))}

            {/* controls */}
            <div className="controls">
                <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>‹</button>
                <button onClick={() => setCurrent((current + 1) % slides.length)}>›</button>
            </div>

            {/* dots */}
            <div className="dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={index === current ? "active" : ""}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;