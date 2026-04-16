import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const confirmDelete = (message) => {
    return window.confirm(message);
};

const SliderTable = ({ slides, refresh, onEdit }) => {

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
        <table className="news-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {(slides || []).map((item) => (
                    <tr key={item._id}>
                        <td>
                            <img
                                src={`http://localhost:5000/uploads/imageslider/${item.image}`}
                                width="80"
                            />
                        </td>

                        <td style={{ display: "flex", gap: "8px" }}>
                            {/* ✅ EDIT BUTTON */}
                            <button
                                className="edit-btn"
                                onClick={() => onEdit(item)}
                            >
                                Edit
                            </button>

                            {/* DELETE */}
                            <button
                                className="delete-btn"
                                onClick={() => deleteImage(item._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SliderTable;