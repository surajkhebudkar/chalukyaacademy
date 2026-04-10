import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const SportsTable = ({ sports, refresh, onEdit }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const deleteSport = async (id) => {
        try {
            await axios.delete(`/sports/${id}`);
            refresh();
        } catch (err) {
            alert("Delete failed");
        }
    };

    const isNew = (date) => {
        const diff = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24);
        return diff <= 3;
    };

    return (
        <table className="news-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Sport</th>
                    <th>Branch</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {sports.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <img
                                src={`http://localhost:5000/uploads/sports/${item.sportImage}`}
                                width="60"
                            />
                        </td>

                        <td>
                            {item.sportName}
                            {isNew(item.createdAt) && (
                                <span className="new-news-badge">NEW</span>
                            )}
                        </td>

                        <td>{item.branchName}</td>

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
                                        onClick={() => deleteSport(item._id)}
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
    );
};

export default SportsTable;