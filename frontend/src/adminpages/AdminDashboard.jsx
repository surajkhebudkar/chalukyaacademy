import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import AddNews from "./AddNews";
import NewsTable from "./NewsTable";
import axios from "../utils/axiosInstance";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    const [activeMenu, setActiveMenu] = useState("news");
    const [editData, setEditData] = useState(null);
    const [search, setSearch] = useState("");

    // ✅ Backend pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage]);

    // 🔥 FETCH WITH PAGINATION
    const fetchNews = async (page = 1) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/news?page=${page}&limit=5`
            );

            setData(res.data.data);
            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.log(err);
        }
    };

    // 🔍 SEARCH FILTER (FRONTEND)
    const filterData = (list) => {
        if (!search) return list;

        const text = search.toLowerCase();

        return list.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(text)
            )
        );
    };

    const filteredData = filterData(data);
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;
    return (
        <div className="admin-container">

            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo-container">
                    <img src="/chalukyaimages/chlukyaacademylogo.png" className="logo-img" />
                    <h2 className="logo-text">Chalukya Admin</h2>
                </div>

                <ul>
                    <li onClick={() => setActiveMenu("news")}>📰 News</li>
                    <li onClick={() => setActiveMenu("events")}>📅 Events</li>
                    <li onClick={() => setActiveMenu("sports")}>🏆 Sports</li>
                </ul>
            </div>

            <div className="main">
                {/* Topbar */}
                <div className="topbar">
                    <h1>Dashboard</h1>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Cards */}
                <div className="cards">
                    <div className="card gradient1">
                        <h3>Total News</h3>
                        <p>{data.length}</p>
                    </div>
                </div>

                {/* Search */}
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
                            {role === "admin" && (
                                <button onClick={() => setActiveMenu("addNews")}>
                                    + Add News
                                </button>
                            )}

                            <NewsTable
                                news={filteredData}
                                refresh={() => fetchNews(currentPage)}
                                onEdit={(item) => {
                                    setEditData(item);
                                    setActiveMenu("editNews");
                                }}
                            />

                            {/* 🔥 BACKEND PAGINATION UI */}
                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    Prev
                                </button>

                                <span>
                                    {currentPage} / {totalPages}
                                </span>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {activeMenu === "addNews" && (
                        <AddNews
                            onSuccess={() => {
                                fetchNews(currentPage);
                                setActiveMenu("news");
                            }}
                            onCancel={() => setActiveMenu("news")}
                        />
                    )}

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
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;