import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AddNews from "./AddNews";
import NewsTable from "./NewsTable";
import axios from "../utils/axiosInstance";
import AddEvent from "./AddEvent";
import EventsTable from "./EventsTable";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [activeMenu, setActiveMenu] = useState("news");
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        if (activeMenu === "news") fetchNews(currentPage);
        if (activeMenu === "events") fetchEvents(currentPage);
    }, [currentPage, activeMenu]);

    const fetchNews = async (page = 1) => {
        try {
            const res = await axios.get(`/news?page=${page}&limit=5`);
            setData(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchEvents = async (page = 1) => {
        try {
            const res = await axios.get(`/events?page=${page}&limit=5`);
            setEventData(res.data.data || []);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    const filterData = (list) => {
        if (!search) return list;
        return list.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    return (
        <div
            className="admin-container"
            onTouchStart={(e) => setTouchStartX(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEndX(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
                if (touchStartX < 50 && touchEndX > 100) setSidebarOpen(true);
                if (touchStartX > 200 && touchEndX < 100) setSidebarOpen(false);
            }}
        >

            {/* SIDEBAR */}
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="logo-container">
                    <img src="/chalukyaimages/chlukyaacademylogo.png" className="logo-img" />
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

                    <li>🏆 Sports</li>
                </ul>
            </div>

            {/* OVERLAY */}
            {sidebarOpen && (
                <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* MAIN */}
            <div className="main">

                {/* TOPBAR */}
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

                {/* CARDS */}
                <div className="cards">
                    <div className="card gradient1">
                        <h3>Total News</h3>
                        <p>{data.length}</p>
                    </div>

                    <div className="card gradient2">
                        <h3>Total Events</h3>
                        <p>{eventData.length}</p>
                    </div>
                </div>

                {/* SEARCH */}
                <div style={{ marginBottom: "15px" }}>
                    <input
                        placeholder="🔍 Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "8px",
                            width: "250px",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <div className="section">

                    {/* NEWS */}
                    {activeMenu === "news" && (
                        <>
                            <div className="news-header">
                                <h2>📰 News Management</h2>

                                {role === "admin" && (
                                    <button className="add-btn" onClick={() => setActiveMenu("addNews")}>
                                        + Add News
                                    </button>
                                )}
                            </div>

                            <NewsTable
                                news={filterData(data)}
                                refresh={() => fetchNews(currentPage)}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editNews");
                                }}
                            />

                            <div className="pagination">
                                <button disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}>
                                    Prev
                                </button>

                                <span>{currentPage} / {totalPages}</span>

                                <button disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}>
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* ADD NEWS */}
                    {activeMenu === "addNews" && (
                        <AddNews
                            onSuccess={() => {
                                fetchNews(currentPage);
                                setActiveMenu("news");
                            }}
                            onCancel={() => setActiveMenu("news")}
                        />
                    )}

                    {/* EDIT NEWS */}
                    {activeMenu === "editNews" && (
                        <AddNews
                            editData={editData}
                            onSuccess={() => {
                                fetchNews(currentPage);
                                setActiveMenu("news");
                            }}
                            onCancel={() => setActiveMenu("news")}
                        />
                    )}

                    {/* EVENTS */}
                    {activeMenu === "events" && (
                        <>
                            <div className="news-header">
                                <h2>📅 Events Management</h2>

                                {role === "admin" && (
                                    <button
                                        className="add-btn"
                                        onClick={() => setActiveMenu("addEvent")}
                                    >
                                        + Add Event
                                    </button>
                                )}
                            </div>

                            <EventsTable
                                events={filterData(eventData)}
                                refresh={() => fetchEvents(currentPage)}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editEvent");
                                }}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />

                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                >
                                    Prev
                                </button>

                                <span>{currentPage} / {totalPages}</span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {/* ADD EVENT */}
                    {activeMenu === "addEvent" && (
                        <AddEvent
                            onSuccess={() => {
                                fetchEvents(currentPage);
                                setActiveMenu("events");
                            }}
                            onCancel={() => setActiveMenu("events")}
                        />
                    )}

                    {/* EDIT EVENT */}
                    {activeMenu === "editEvent" && (
                        <AddEvent
                            editData={editData}
                            onSuccess={() => {
                                fetchEvents(currentPage);
                                setActiveMenu("events");
                            }}
                            onCancel={() => setActiveMenu("events")}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;