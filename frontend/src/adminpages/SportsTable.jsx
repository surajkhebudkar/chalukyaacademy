import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const confirmDelete = (message) => {
    return window.confirm(message);
};

const SportsTable = ({
    sports = [],
    refresh,
    onEdit,
    currentPage,
    totalPages,
    onPageChange
}) => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.role;

    const deleteSport = async (branchId) => {
        if (!confirmDelete("⚠️ This will delete the entire branch with all sports. Continue?")) return;

        try {
            await axios.delete(`/sports/${branchId}`);
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
                        <th>Branch Image</th>
                        <th>Branch Name</th>
                        <th>Total Sports</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {(Array.isArray(sports) ? sports : []).map((branch) => (
                        <tr key={branch._id}>
                            <td>
                                <img
                                    src={
                                        branch.branchImage
                                            ? `http://localhost:5000/uploads/sports/branches/${branch.branchImage}`
                                            : "/placeholder.png"
                                    }
                                    width="60"
                                    alt="branch"
                                />
                            </td>

                            <td>
                                {branch.branchName}
                                {isNew(branch.createdAt) && (
                                    <span className="new-news-badge" style={{ marginLeft: "8px" }}>
                                        NEW
                                    </span>
                                )}
                            </td>

                            <td>{branch.sports?.length || 0}</td>

                            <td>
                                {role === "admin" && (
                                    <>
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(branch)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteSport(branch._id)}
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

export default SportsTable;