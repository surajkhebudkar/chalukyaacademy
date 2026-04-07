import { useEffect, useState } from "react";
import { getProtectedData } from "../services/api";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [activeMenu, setActiveMenu] = useState("news");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); 
    };

    useEffect(() => {
        getProtectedData()
            .then(setData)
            .catch((err) => console.log(err));
    }, []);
    
    return (
        <div
            className="admin-container"
            onTouchStart={(e) => setTouchStartX(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEndX(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
                if (touchStartX < 50 && touchEndX > 100) {
                    setSidebarOpen(true); // swipe right → open
                }
                if (touchStartX > 200 && touchEndX < 100) {
                    setSidebarOpen(false); // swipe left → close
                }
            }}
        >
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="logo-container">
                    <img src="/chalukyaimages/chlukyaacademylogo.png" alt="logo" className="logo-img" />
                    <h2 className="logo-text">Chalukya Admin</h2>
                </div>
                <ul>
                    <li
                        className={activeMenu === "news" ? "active" : ""}
                        onClick={() => {
                            setActiveMenu("news");
                            setSidebarOpen(false);
                        }}
                    >
                        📰 News
                    </li>
                    <li
                        className={activeMenu === "events" ? "active" : ""}
                        onClick={() => {
                            setActiveMenu("events");
                            setSidebarOpen(false);
                        }}
                    >
                        📅 Events
                    </li>
                    <li
                        className={activeMenu === "sports" ? "active" : ""}
                        onClick={() => {
                            setActiveMenu("sports");
                            setSidebarOpen(false);
                        }}
                    >
                        🏆 Sports
                    </li>
                </ul>
            </div>

            {sidebarOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className="main">
                <div className="topbar">
                    <div className="left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            ☰
                        </button>
                        <h1>Dashboard</h1>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                <div className="cards">
                    <div className="card gradient1">
                        <h3>Total News</h3>
                        <p>{data.length}</p>
                    </div>
                    <div className="card gradient2">
                        <h3>Total Events</h3>
                        <p>0</p>
                    </div>
                    <div className="card gradient3">
                        <h3>Total Sports</h3>
                        <p>0</p>
                    </div>
                </div>


                <div className="section">
                    {activeMenu === "news" && (
                        <div className="fade">
                            <h2>📰 News Data</h2>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}

                    {activeMenu === "events" && (
                        <div className="fade">
                            <h2>📅 Events Section</h2>
                        </div>
                    )}

                    {activeMenu === "sports" && (
                        <div className="fade">
                            <h2>🏆 Sports Section</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;