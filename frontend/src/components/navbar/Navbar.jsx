import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    const indicatorRef = useRef(null);
    const navRefs = useRef([]);

    const menuItems = ["Home", "News", "Events", "Sports", "Photo Gallery", "About"];

    // Indicator fix (correct parent)
    useEffect(() => {
        const el = navRefs.current[activeIndex];
        if (el && indicatorRef.current) {
            indicatorRef.current.style.width = `${el.offsetWidth}px`;
            indicatorRef.current.style.left = `${el.offsetLeft}px`;
        }
    }, [activeIndex]);

    return (
        <header className="navbar">
            <div className="nav-wrapper">
                <div
                    className={`Navbaroverlay ${mobileOpen ? "show" : ""}`}
                    onClick={() => setMobileOpen(false)}
                >
                </div>
                <div
                    className={`hamburger ${mobileOpen ? "active" : ""}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                
                {/* Menu */}
                <nav className={`navmenu ${mobileOpen ? "open" : ""}`}>
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    ref={(el) => (navRefs.current[index] = el)}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setMobileOpen(false);
                                    }}
                                    className={activeIndex === index ? "active" : ""}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                   
                </nav>

            </div>
        </header>
    );
};

export default Navbar;