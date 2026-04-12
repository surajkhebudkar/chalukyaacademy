import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";


const confirmDelete = (message) => {
    return window.confirm(message);
};
const VideoTable = ({
    videos = [],
    refresh,
    onEdit,
    currentPage,
    totalPages,
    onPageChange
}) => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.role;

    const deleteVideo = async (id) => {
        if (!confirmDelete("⚠️ This action cannot be undone. Delete this video?")) return;

        try {
            await axios.delete(`/videos/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
            alert("Delete failed ❌");
        }
    };

    return (
        <>
            <table className="news-table">
                <thead>
                    <tr>
                        <th>Video</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {(Array.isArray(videos) ? videos : []).map((v) => (
                        <tr key={v._id}>
                            <td>
                                <video
                                    src={
                                        v.video
                                            ? `http://localhost:5000${v.video}`
                                            : ""
                                    }
                                    width="70"
                                    muted
                                    controls
                                />
                            </td>

                            <td>{v.title}</td>

                            <td>
                                {role === "admin" && (
                                    <>
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(v)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteVideo(v._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ PAGINATION (NO DESIGN CHANGE) */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    ⬅ Prev
                </button>

                <span>
                    {currentPage} / {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next ➡
                </button>
            </div>
        </>
    );
};

export default VideoTable;