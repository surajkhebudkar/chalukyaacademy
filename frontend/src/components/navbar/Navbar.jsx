import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: "Events", path: "/events" },
        { name: "Sports", path: "/sports" },
        { name: "Photo Gallery", path: "/gallery" },
        { name: "About", path: "/about" },
    ];

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div
                className={`Navbaroverlay ${mobileOpen ? "show" : ""}`}
                onClick={() => setMobileOpen(false)}
            ></div>

            <header className="navbar">
                <div className="nav-wrapper">
                    {/* HAMBURGER */}
                    <div
                        className={`hamburger ${mobileOpen ? "active" : ""}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* MENU */}
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
                        </ul>
                    </nav>
                    
                    <div className="profile-container" ref={dropdownRef}>
                        <div
                            className="avatar"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            👤
                        </div>

                        <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                            <Link to="/login" onClick={() => setDropdownOpen(false)}>
                                Login
                            </Link>
                        </div>
                    </div>

                </div>
            </header>
        </>
    );
};

export default Navbar;