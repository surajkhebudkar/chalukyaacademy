import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
    const footerRef = useRef();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                }
            },
            { threshold: 0.2 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);
    const logoRef = useRef();

    const handleTilt = (e) => {
        const rect = logoRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 6;
        const rotateY = (x - centerX) / 6;

        logoRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.20)`;
    };

    const resetTilt = () => {
        logoRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
    };

    return (
        <footer className={`footer ${show ? "show" : ""}`} ref={footerRef}>
            <div className="footer-container">

                <div className="footer-section section1">
                    <h4>Contact</h4>
                    <p><i className="bi bi-envelope"></i> hello@example.com</p>
                    <p><i className="bi bi-telephone"></i> +91 0000000000</p>

                    <div
                        className="footer-logo"
                        onMouseMove={(e) => handleTilt(e)}
                        onMouseLeave={() => resetTilt()}
                    >
                        <img
                            src="/chalukyaimages/chlukyaacademylogo.png"
                            alt="logo"
                            ref={logoRef}
                        />
                    </div>
                </div>

                <div className="footer-section section2">
                    <h4>Connect</h4>
                    <p><i className="bi bi-whatsapp"></i> WhatsApp</p>
                    <p><i className="bi bi-instagram"></i> Instagram</p>
                    <p><i className="bi bi-facebook"></i> Facebook</p>
                </div>

                <div className="footer-section section3">
                    <h4>Enquiry</h4>
                    <form className="footer-form">
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Contact" />

                        <select>
                            <option>Select Enquiry</option>
                            <option>Archery</option>
                            <option>Basketball</option>
                            <option>Fencing</option>
                            <option>Gymnastic</option>
                            <option>Kurash</option>
                            <option>MMA</option>
                            <option>Skating</option>
                            <option>Yoga</option>
                            <option>Other</option>
                        </select>

                        <textarea placeholder="Remark"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="footer-section section4">
                    <h4>Feedback</h4>
                    <textarea placeholder="Write feedback..." />
                    <button className="feedback-btn">Send</button>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Sports Academy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;