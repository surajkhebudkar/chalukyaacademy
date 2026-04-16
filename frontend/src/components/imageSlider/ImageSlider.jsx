import { useEffect, useState, useRef } from "react";
import axios from "../../utils/axiosInstance";
import "./ImageSlider.css";

const ImageSlider = () => {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);
    const [show, setShow] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const sliderRef = useRef();
    const touchStartX = useRef(0);

    const fetchSlides = async () => {
        try {
            const res = await axios.get("/slider");
            const data = res.data.data || [];

            const formatted = data
                .slice(0, 10)
                .map(item => ({
                    img: `http://localhost:5000/uploads/imageslider/${item.image}`,
                    title: item.title || "Chalukya Sports Academy"
                }));

            setSlides(formatted);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0 || isPaused) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [slides, isPaused]);

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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${index === current ? "active" : ""}`}
                >
                    <img src={slide.img} alt="slide" />

                    <div className="slideroverlay">
                        <h2>{slide.title}</h2>
                    </div>
                </div>
            ))}

            <div className="controls">
                <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>‹</button>
                <button onClick={() => setCurrent((current + 1) % slides.length)}>›</button>
            </div>

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