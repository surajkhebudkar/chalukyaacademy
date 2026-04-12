import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const GalleryTable = ({
    galleries = [],
    refresh,
    onEdit,
    currentPage,
    totalPages,
    onPageChange
}) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const deleteGallery = async (id) => {
        try {
            await axios.delete(`/gallery/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
            alert("Delete failed ❌");
        }
    };

    const isNew = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
        return diff <= 3;
    };

    return (
        <>
            <table className="news-table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Album</th>
                        <th>Total Photos</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {(Array.isArray(galleries) ? galleries : []).map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img
                                    src={
                                        item.coverImage
                                            ? `http://localhost:5000${item.coverImage}`
                                            : "/placeholder.png"
                                    }
                                    width="60"
                                    alt="cover"
                                />
                            </td>

                            <td>
                                {item.title}
                                {isNew(item.createdAt) && (
                                    <span className="new-news-badge" style={{ marginLeft: "8px" }}>
                                        NEW
                                    </span>
                                )}
                            </td>

                            <td>{item.photos?.length || 0}</td>

                            <td>
                                {role === "admin" && (
                                    <>
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(item)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteGallery(item._id)}
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

export default GalleryTable;