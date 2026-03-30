import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: "Events", path: "/events" },
        { name: "Sports", path: "/sports" },
        { name: "Photo Gallery", path: "/gallery" },
        { name: "About", path: "/about" }
    ];
    const navRefs = useRef([]);

    return (
        <>
            <div
                className={`Navbaroverlay ${mobileOpen ? "show" : ""}`}
                onClick={() => setMobileOpen(false)}
            ></div>

            <header className="navbar">
                <div className="nav-wrapper">

                    <div
                        className={`hamburger ${mobileOpen ? "active" : ""}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <nav className={`navmenu ${mobileOpen ? "open" : ""}`}>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            setMobileOpen(false);
                                        }}
                                        className={activeIndex === index ? "active" : ""}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </div>
            </header>
        </>
    );
};

export default Navbar;