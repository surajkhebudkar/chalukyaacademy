import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";


const EventsTable = ({ events, refresh, onEdit }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`/events/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
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
                    <th>Title</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {events.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <img
                                src={`http://localhost:5000/uploads/events/${item.image}`}
                                width="60"
                            />
                        </td>

                        <td>
                            {item.title}
                            {isNew(item.createdAt) && (
                                <span className="new-news-badge">NEW</span>
                            )}
                        </td>

                        <td>{new Date(item.date).toLocaleDateString()}</td>

                        <td>{item.description}</td>

                        <td>
                            {role === "admin" && (
                                <button className="edit-btn" onClick={() => onEdit(item)}>
                                    Edit
                                </button>
                            )}
                            {role === "admin" && (
                                <button className="delete-btn" onClick={() => deleteEvent(item._id)}>
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EventsTable;