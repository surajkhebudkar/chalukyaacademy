import axios from "../utils/axiosInstance";

const EventsTable = ({
    events,
    refresh,
    onEdit,
    currentPage,
    totalPages,
    setCurrentPage
}) => {

    const deleteEvent = async (id) => {
        await axios.delete(`/events/${id}`);
        refresh();
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
                                    src={`http://localhost:5000/uploads/events/${e.image}`}
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

            
        </>
    );
};

export default EventsTable;