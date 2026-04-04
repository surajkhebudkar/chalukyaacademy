import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: "Events", path: "/events" },
        { name: "Sports", path: "/sports" },
        { name: "Photo Gallery", path: "/gallery" },
        { name: "About", path: "/about" },
    ];
    const navRefs = useRef([]);
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };
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
                                        onClick={() => setMobileOpen(false)}
                                        className={location.pathname === item.path ? "active" : ""}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <button onClick={handleLogout}>Logout</button>
                        </ul>
                    </nav>

                </div>
            </header>
        </>
    );
};

export default Navbar;