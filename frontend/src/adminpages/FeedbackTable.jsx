import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const FeedbackTable = ({
    feedbacks,
    currentPage,
    totalPages,
    onPageChange,
    refresh
}) => {

    const deleteFeedback = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this feedback?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`/feedback/${id}`);

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
                        <th>Feedback</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {(feedbacks || []).map((item) => (
                        <tr key={item._id}>

                            <td>{item.feedback}</td>

                            <td>
                                {new Date(item.createdAt)
                                    .toLocaleString()}
                            </td>

                            <td>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteFeedback(item._id)}
                                >
                                    Delete
                                </button>

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

export default FeedbackTable;