import React, { useEffect, useRef, useState } from "react";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "../utils/axiosInstance";

const Footer = () => {
    const footerRef = useRef();
    const logoRef = useRef();

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        enquiry: "Select Enquiry",
        remark: "",
        feedback: "",
    });

    const [errors, setErrors] = useState({});

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
        logoRef.current.style.transform =
            "rotateX(0) rotateY(0) scale(1)";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Please enter your name!";
        }

        if (!formData.contact.trim()) {
            newErrors.contact = "Please enter your contact number!";
        }

        if (formData.enquiry === "Select Enquiry") {
            newErrors.enquiry = "Please Select the Option!";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await axios.post("/enquiry", formData);

                alert("Enquiry submitted successfully!");

                setFormData({
                    name: "",
                    email: "",
                    contact: "",
                    enquiry: "Select Enquiry",
                    remark: "",
                    feedback: ""
                });

            } catch (error) {
                alert("Failed to send enquiry");
            }
        }
    };

    const validateFeedback = () => {
        let newErrors = {};

        if (!formData.feedback.trim()) {
            newErrors.feedback = "Please write your feedback!";
        }

        setErrors({
            ...errors,
            ...newErrors,
        });

        return Object.keys(newErrors).length === 0;
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();

        if (validateFeedback()) {
            console.log("Feedback Submitted:", formData.feedback);

            alert("Feedback sent successfully!");

            setFormData({
                ...formData,
                feedback: "",
            });

            setErrors({
                ...errors,
                feedback: "",
            });
        }
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
                        onMouseMove={handleTilt}
                        onMouseLeave={resetTilt}
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
                    <p><i className="bi bi-youtube"></i> Youtube</p>
                </div>

                <div className="footer-section section3">
                    <h4>Enquiry</h4>

                    <form className="footer-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <small className="error-text">{errors.name}</small>
                        )}

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={formData.contact}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^\d*$/.test(value)) {
                                    handleChange(e);
                                }
                            }}
                            maxLength="10"
                        />
                        {errors.contact && (
                            <small className="error-text">{errors.contact}</small>
                        )}

                        <select
                            name="enquiry"
                            value={formData.enquiry}
                            onChange={handleChange}
                        >
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
                        {errors.enquiry && (
                            <small className="error-text">{errors.enquiry}</small>
                        )}

                        <textarea
                            name="remark"
                            placeholder="Remark"
                            value={formData.remark}
                            onChange={handleChange}
                        ></textarea>

                        <button type="submit">Submit</button>
                    </form>
                </div>


                <div className="footer-section section4">
                    <h4>Feedback</h4>

                    <textarea
                        name="feedback"
                        placeholder="Write feedback..."
                        value={formData.feedback}
                        onChange={handleChange}
                    />

                    {errors.feedback && (
                        <small className="error-text">{errors.feedback}</small>
                    )}

                    <button
                        className="feedback-btn"
                        onClick={handleFeedbackSubmit}
                    >
                        Send
                    </button>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 Sports Academy. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;