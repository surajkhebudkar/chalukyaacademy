import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sectorOpen, setSectorOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);

    const dropdownRef = useRef();
    const navRef = useRef();

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
        { name: "Events", path: "/events" },
        {
            name: "Working Sectors",
            submenu: [
                { name: "Sports", path: "/sports" },
                { name: "Finance", path: "/Micro Finance" },
            ],
        },
        {
            name: "Gallery",
            submenu: [
                { name: "Photo Gallery", path: "/photogallery" },
                { name: "Video Gallery", path: "/videogallery" },
            ],
        },
        { name: "About", path: "/about" },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }

            if (navRef.current && !navRef.current.contains(e.target)) {
                setSectorOpen(false);
                setGalleryOpen(false);
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

                    <div
                        className={`hamburger ${mobileOpen ? "active" : ""}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <nav ref={navRef} className={`navmenu ${mobileOpen ? "open" : ""}`}>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index} className="nav-item">

                                    {!item.submenu && (
                                        <Link
                                            to={item.path}
                                            onClick={() => setMobileOpen(false)}
                                            className={
                                                location.pathname === item.path ? "active" : ""
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {item.submenu && (
                                        <>
                                            <div
                                                className="dropdown-toggle"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    if (item.name === "Working Sectors") {
                                                        setSectorOpen((prev) => !prev);
                                                        setGalleryOpen(false);
                                                    } else if (item.name === "Gallery") {
                                                        setGalleryOpen((prev) => !prev);
                                                        setSectorOpen(false);
                                                    }
                                                }}
                                            >
                                                {item.name}
                                            </div>

                                            <ul
                                                className={`submenu ${item.name === "Working Sectors"
                                                        ? sectorOpen
                                                            ? "show"
                                                            : ""
                                                        : galleryOpen
                                                            ? "show"
                                                            : ""
                                                    }`}
                                            >
                                                {item.submenu.map((sub, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            to={sub.path}
                                                            onClick={() => {
                                                                setMobileOpen(false);
                                                                setSectorOpen(false);
                                                                setGalleryOpen(false);
                                                            }}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="profile-container" ref={dropdownRef}>
                        <div
                            className="avatar"
                            onClick={() => setDropdownOpen((prev) => !prev)}
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