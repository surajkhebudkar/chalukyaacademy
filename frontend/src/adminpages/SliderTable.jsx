import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const confirmDelete = (message) => {
    return window.confirm(message);
};

const SliderTable = ({
    slides = [],
    refresh,
    onEdit,
    currentPage,
    totalPages,
    onPageChange
}) => {

    const deleteImage = async (id) => {
        if (!confirmDelete("Delete this image?")) return;

        try {
            await axios.delete(`/slider/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    return (
        <>
            <table className="news-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {(slides || []).map((item) => (
                        <tr key={item._id}>

                            <td>
                                <img
                                    src={`http://localhost:5000/uploads/imageslider/${item.image}`}
                                    alt="slider"
                                    style={{
                                        width: "80px",
                                        height: "60px",
                                        objectFit: "cover", // 🔥 FIX
                                        borderRadius: "6px"
                                    }}
                                />
                            </td>

                            <td>
                                {item.title || "-"}
                            </td>

                            <td>
                                <div style={{
                                    display: "flex",
                                    gap: "8px",
                                    alignItems: "center"
                                }}>
                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteImage(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

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

export default SliderTable;