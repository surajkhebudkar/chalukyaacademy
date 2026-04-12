import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";


const confirmDelete = (message) => {
    return window.confirm(message);
};
const EventsTable = ({
    events,
    refresh,
    onEdit,
    currentPage,
    totalPages,
    setCurrentPage
}) => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.role;
   


    const deleteEvent = async (id) => {
        if (!confirmDelete("⚠️ This action cannot be undone. Delete this event?")) return;

        try {
            await axios.delete(`/events/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    const isNew = (date) => {
        return (new Date() - new Date(date)) / (1000 * 60 * 60 * 24) <= 3;
    };

    return (
        <>
            <table className="news-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {events.map(e => (
                        <tr key={e._id}>
                            <td>
                                <img
                                    src={
                                        e.image
                                            ? `http://localhost:5000/uploads/events/${e.image}`
                                            : "/placeholder.png"
                                    }
                                    width="60"
                                />
                            </td>

                            <td>
                                {e.title}
                                {isNew(e.createdAt) && (
                                    <span className="new-news-badge">NEW</span>
                                )}
                            </td>

                            <td>
                                {new Date(e.date).toLocaleDateString()}
                            </td>

                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(e)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteEvent(e._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ PAGINATION (NO DESIGN CHANGE) */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    ⬅ Prev
                </button>

                <span>
                    {currentPage} / {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next ➡
                </button>
            </div>
        </>
    );
};

export default EventsTable;