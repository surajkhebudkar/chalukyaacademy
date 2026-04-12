import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AddNews from "./AddNews";
import NewsTable from "./NewsTable";
import axios from "../utils/axiosInstance";
import AddEvent from "./AddEvent";
import EventsTable from "./EventsTable";
import SportsTable from "./SportsTable";
import AddSport from "./AddSport";
import GalleryTable from "./GalleryTable";
import AddGallery from "./AddGallery";
import VideoTable from "./VideoTable";
import AddVideo from "./AddVideo";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [sportsData, setSportsData] = useState([]);
    const [galleryData, setGalleryData] = useState([]);
    const [videoData, setVideoData] = useState([]);

    const [activeMenu, setActiveMenu] = useState("news");
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState("");

    // ✅ separate pagination
    const [newsPage, setNewsPage] = useState(1);
    const [newsTotal, setNewsTotal] = useState(1);

    const [eventPage, setEventPage] = useState(1);
    const [eventTotal, setEventTotal] = useState(1);

    const [sportsPage, setSportsPage] = useState(1);
    const [sportsTotal, setSportsTotal] = useState(1);

    const [galleryPage, setGalleryPage] = useState(1);
    const [galleryTotal, setGalleryTotal] = useState(1);

    const [videoPage, setVideoPage] = useState(1);
    const [videoTotal, setVideoTotal] = useState(1);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // ✅ FETCH
    useEffect(() => {
        if (activeMenu === "news") fetchNews(newsPage);
        if (activeMenu === "events") fetchEvents(eventPage);
        if (activeMenu === "sports") fetchSports();
        if (activeMenu === "gallery") fetchGallery();
        if (activeMenu === "videos") fetchVideos();
    }, [activeMenu, newsPage, eventPage]);

    const fetchNews = async (page = 1) => {
        try {
            const res = await axios.get(`/news?page=${page}&limit=5`);
            setData(res.data.data || []);
            setNewsTotal(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchEvents = async (page = 1) => {
        try {
            const res = await axios.get(`/events?page=${page}&limit=5`);
            setEventData(res.data.data || []);
            setEventTotal(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    // ❗ no pagination backend
    const fetchSports = async () => {
        try {
            const res = await axios.get(`/sports`);
            setSportsData(res.data.data || []);
            setSportsTotal(1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchGallery = async () => {
        try {
            const res = await axios.get(`/gallery`);
            setGalleryData(res.data || []);
            setGalleryTotal(1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchVideos = async () => {
        try {
            const res = await axios.get(`/videos`);
            setVideoData(res.data || []);
            setVideoTotal(1);
        } catch (err) {
            console.log(err);
        }
    };

    const filterData = (list) => {
        if (!search) return list;
        return list.filter(item =>
            JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
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
                    <li onClick={() => { setActiveMenu("news"); setNewsPage(1); setSidebarOpen(false); }}>📰 News</li>
                    <li onClick={() => { setActiveMenu("events"); setEventPage(1); setSidebarOpen(false); }}>📅 Events</li>
                    <li onClick={() => { setActiveMenu("sports"); setSidebarOpen(false); }}>🏆 Sports</li>
                    <li onClick={() => { setActiveMenu("gallery"); setSidebarOpen(false); }}>🖼️ Gallery</li>
                    <li onClick={() => { setActiveMenu("videos"); setSidebarOpen(false); }}>🎥 Videos</li>
                </ul>
            </div>

            {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>}

            {/* MAIN */}
            <div className="main">

                <div className="topbar">
                    <div className="left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
                        <h1>Dashboard</h1>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
                                refresh={() => fetchNews(newsPage)}
                                currentPage={newsPage}
                                totalPages={newsTotal}
                                onPageChange={setNewsPage}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editNews");
                                }}
                            />
                        </>
                    )}

                    {activeMenu === "addNews" && (
                        <AddNews
                            onSuccess={() => {
                                fetchNews(newsPage);
                                setActiveMenu("news");
                            }}
                            onCancel={() => setActiveMenu("news")}
                        />
                    )}

                    {activeMenu === "editNews" && (
                        <AddNews
                            editData={editData}
                            onSuccess={() => {
                                fetchNews(newsPage);
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
                                    <button className="add-btn" onClick={() => setActiveMenu("addEvent")}>
                                        + Add Event
                                    </button>
                                )}
                            </div>

                            <EventsTable
                                events={filterData(eventData)}
                                refresh={() => fetchEvents(eventPage)}
                                currentPage={eventPage}
                                totalPages={eventTotal}
                                onPageChange={setEventPage}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editEvent");
                                }}
                            />
                        </>
                    )}

                    {/* SPORTS */}
                    {activeMenu === "sports" && (
                        <>
                            <div className="news-header">
                                <h2>🏆 Sports Management</h2>

                                <button className="add-btn" onClick={() => setActiveMenu("addSport")}>
                                    + Add Sport
                                </button>
                            </div>

                            <SportsTable
                                sports={filterData(sportsData)}
                                refresh={fetchSports}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editSport");
                                }}
                            />
                        </>
                    )}

                    {/* GALLERY */}
                    {activeMenu === "gallery" && (
                        <>
                            <div className="news-header">
                                <h2>🖼️ Gallery Management</h2>

                                <button className="add-btn" onClick={() => setActiveMenu("addGallery")}>
                                    + Add Gallery
                                </button>
                            </div>

                            <GalleryTable
                                galleries={filterData(galleryData)}
                                refresh={fetchGallery}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editGallery");
                                }}
                            />
                        </>
                    )}

                    {/* VIDEOS */}
                    {activeMenu === "videos" && (
                        <>
                            <div className="news-header">
                                <h2>🎥 Video Management</h2>

                                <button className="add-btn" onClick={() => setActiveMenu("addVideo")}>
                                    + Add Video
                                </button>
                            </div>

                            <VideoTable
                                videos={videoData}
                                refresh={fetchVideos}
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editVideo");
                                }}
                            />
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;