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
import AddSlider from "./AddSlider";
import SliderTable from "./SliderTable";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [sportsData, setSportsData] = useState([]);
    const [galleryData, setGalleryData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    

    const [activeMenu, setActiveMenu] = useState("news");
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState("");

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

    const [sliderPage, setSliderPage] = useState(1);
    const [sliderTotal, setSliderTotal] = useState(1);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        if (activeMenu === "news") fetchNews(newsPage);
    }, [newsPage, activeMenu]);

    useEffect(() => {
        if (activeMenu === "events") fetchEvents(eventPage);
    }, [eventPage, activeMenu]);

    useEffect(() => {
        if (activeMenu === "sports") fetchSports(sportsPage);
    }, [sportsPage, activeMenu]);

    useEffect(() => {
        if (activeMenu === "gallery") fetchGallery(galleryPage);
    }, [galleryPage, activeMenu]);

    useEffect(() => {
        if (activeMenu === "videos") fetchVideos(videoPage);
    }, [videoPage, activeMenu]);

    useEffect(() => {
        if (activeMenu === "slider") fetchSlider(sliderPage);
    }, [activeMenu, sliderPage]);

    
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
    

    const fetchSports = async (page = 1) => {
        try {
            const res = await axios.get(`/sports?page=${page}&limit=5`);
            setSportsData(res.data.data || []);
            setSportsTotal(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchGallery = async (page = 1) => {
        try {
            const res = await axios.get(`/gallery?page=${page}&limit=6`);

            console.log("GALLERY RESPONSE:", res.data);

            setGalleryData(res.data.data || []);
            setGalleryTotal(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchVideos = async (page = 1) => {
        try {
            const res = await axios.get(`/videos?page=${page}&limit=6`);

            setVideoData(res.data.data || []);
            setVideoTotal(res.data.totalPages || 1);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSlider = async (page = 1) => {
        try {
            const res = await axios.get(`/slider?page=${page}&limit=6`);

            setSliderData(res.data.data || []);
            setSliderTotal(res.data.totalPages || 1);

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

            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="logo-container">
                    <img src="/chalukyaimages/chlukyaacademylogo.png" className="logo-img" />
                    <h2 className="logo-text">Chalukya Admin</h2>
                </div>

                <ul>
                    <li onClick={() => { setActiveMenu("news"); setNewsPage(1); setSidebarOpen(false); }}>📰 News</li>
                    <li onClick={() => { setActiveMenu("events"); setEventPage(1); setSidebarOpen(false); }}>📅 Events</li>
                    <li onClick={() => { setActiveMenu("sports"); setSportsPage(1); setSidebarOpen(false); }}>🏆 Sports Branch</li>
                    <li onClick={() => { setActiveMenu("gallery"); setGalleryPage(1); setSidebarOpen(false); }}>🖼️ Photo Gallery</li>
                    <li onClick={() => { setActiveMenu("videos"); setVideoPage(1); setSidebarOpen(false); }}>🎥 Videos Gallery</li>
                    <li onClick={() => { setActiveMenu("slider"); setSliderPage(1); setSidebarOpen(false); }}>🎞️ Image Slider</li>
                </ul>
            </div>

            {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)}></div>}

            <div className="main">

                <div className="topbar">
                    <div className="left">
                        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
                        <h1>Dashboard</h1>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>

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

                    {activeMenu === "addEvent" && (
                        <AddEvent
                            onSuccess={() => {
                                fetchEvents(eventPage);
                                setActiveMenu("events");
                            }}
                            onCancel={() => setActiveMenu("events")}
                        />
                    )}

                    {activeMenu === "editEvent" && (
                        <AddEvent
                            editData={editData}
                            onSuccess={() => {
                                fetchEvents(eventPage);
                                setActiveMenu("events");
                            }}
                            onCancel={() => setActiveMenu("events")}
                        />
                    )}

                    {activeMenu === "sports" && (
                        <>
                            <div className="news-header">
                                <h2>🏆 Sports Management</h2>

                                <button className="add-btn" onClick={() => setActiveMenu("addSport")}>
                                    + Add Sport Branch
                                </button>
                            </div>

                            <SportsTable
                                sports={filterData(sportsData)}
                                refresh={() => fetchSports(sportsPage)}
                                currentPage={sportsPage}
                                totalPages={sportsTotal}
                                onPageChange={setSportsPage}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editSport");
                                }}
                            />
                        </>
                    )}

                    {activeMenu === "addSport" && (
                        <AddSport
                            onSuccess={() => {
                                fetchSports(sportsPage);
                                setActiveMenu("sports");
                            }}
                            onCancel={() => setActiveMenu("sports")}
                        />
                    )}

                    {activeMenu === "editSport" && (
                        <AddSport
                            editData={editData}
                            onSuccess={() => {
                                fetchSports(sportsPage);
                                setActiveMenu("sports");
                            }}
                            onCancel={() => setActiveMenu("sports")}
                        />
                    )}

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
                                refresh={() => fetchGallery(galleryPage)}
                                currentPage={galleryPage}
                                totalPages={galleryTotal}
                                onPageChange={setGalleryPage}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editGallery");
                                }}
                            />
                        </>
                    )}

                    {activeMenu === "addGallery" && (
                        <AddGallery
                            onSuccess={() => {
                                fetchGallery(galleryPage);
                                setActiveMenu("gallery");
                            }}
                            onCancel={() => setActiveMenu("gallery")}
                        />
                    )}

                    {activeMenu === "editGallery" && (
                        <AddGallery
                            editData={editData}
                            onSuccess={() => {
                                fetchGallery(galleryPage);
                                setActiveMenu("gallery");
                            }}
                            onCancel={() => setActiveMenu("gallery")}
                        />
                    )}

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
                                refresh={() => fetchVideos(videoPage)}
                                currentPage={videoPage}
                                totalPages={videoTotal}
                                onPageChange={setVideoPage}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editVideo");
                                }}
                            />
                        </>
                    )}

                    {activeMenu === "addVideo" && (
                        <AddVideo
                            onSuccess={() => {
                                fetchVideos(videoPage);
                                setActiveMenu("videos");
                            }}
                            onCancel={() => setActiveMenu("videos")}
                        />
                    )}

                    {activeMenu === "editVideo" && (
                        <AddVideo
                            editData={editData}
                            onSuccess={() => {
                                fetchVideos(videoPage);
                                setActiveMenu("videos");
                            }}
                            onCancel={() => setActiveMenu("videos")}
                        />
                    )}

                    {activeMenu === "slider" && (
                        <>
                            <div className="news-header">
                                <h2>🎞️ Slider Management</h2>

                                <button className="add-btn" onClick={() => setActiveMenu("addSlider")}>
                                    + Add Image
                                </button>
                            </div>

                            <SliderTable
                                slides={sliderData}
                                refresh={() => fetchSlider(sliderPage)}
                                currentPage={sliderPage}
                                totalPages={sliderTotal}
                                onPageChange={setSliderPage}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editSlider");
                                }}
                            />
                        </>
                    )}

                    {activeMenu === "addSlider" && (
                        <AddSlider
                            onSuccess={() => {
                                fetchSlider(sliderPage);
                                setActiveMenu("slider");
                            }}
                            onCancel={() => setActiveMenu("slider")}
                        />
                    )}

                    {activeMenu === "editSlider" && (
                        <AddSlider
                            editData={editData}
                            onSuccess={() => {
                                fetchSlider(sliderPage);
                                setActiveMenu("slider");
                            }}
                            onCancel={() => setActiveMenu("slider")}
                        />
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;