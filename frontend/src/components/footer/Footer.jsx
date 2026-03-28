import React from "react";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Section 1 */}
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p><i className="bi bi-envelope"></i> hello@example.com</p>
                    <p><i className="bi bi-telephone"></i> +91 9876543210</p>
                    {/* Logo */}
                    <div className="footer-logo">
                        <img src="chalukyaimges/chlukyaacademylogo.png" alt="logo" />
                    </div>
                </div>

                {/* Section 2 */}
                <div className="footer-section">
                    <h4>Connect</h4>
                    <p><i className="bi bi-whatsapp"></i> WhatsApp</p>
                    <p><i className="bi bi-instagram"></i> Instagram</p>
                    <p><i className="bi bi-facebook"></i> Facebook</p>
                </div>

                {/* Section 3 */}
                <div className="footer-section">
                    <h4>Enquiry</h4>
                    <form className="footer-form">
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Contact" />

                        <select>
                            <option>Select Sport</option>
                            <option>Archery</option>
                            <option>Basketball</option>
                            <option>Fencing</option>
                            <option>Gymnastic</option>
                            <option>Kurash</option>
                            <option>MMA (Mixed Martial Arts)</option>
                            <option>Skating</option>
                            <option>Sports Nursery</option>
                            <option>Yoga</option>
                        </select>

                        <textarea placeholder="Remark"></textarea>

                        <button type="submit">Submit</button>
                    </form>
                </div>

                {/* Section 4 */}
                <div className="footer-section">
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