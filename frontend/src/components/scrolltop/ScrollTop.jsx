import { useEffect, useState } from "react";
import "./ScrollTop.css";

const ScrollTop = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`scroll-top ${show ? "show" : ""}`}
            onClick={scrollToTop}
        >
            <i className="bi bi-arrow-up"></i>
        </div>
    );
};

export default ScrollTop;