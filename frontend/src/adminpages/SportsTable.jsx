import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const SportsTable = ({
    sports = [],
    refresh,
    onEdit,
    currentPage,
    totalPages,
    onPageChange
}) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const deleteSport = async (branchId, sportId) => {
        try {
            await axios.delete(`/sports/${branchId}/sport/${sportId}`);
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
                        <th>Image</th>
                        <th>Sport</th>
                        <th>Branch</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {sports.map((branch) =>
                        (branch.sports || []).map((sport, index) => (
                            <tr key={sport._id}>
                                <td>
                                    <img
                                        src={
                                            sport.image
                                                ? `http://localhost:5000/uploads/sports/branchsports/${sport.image}`
                                                : "/placeholder.png"
                                        }
                                        width="60"
                                        alt="sport"
                                    />
                                </td>

                                <td>
                                    {sport.name}
                                    {isNew(branch.createdAt) && (
                                        <span className="new-news-badge" style={{ marginLeft: "8px" }}>
                                            NEW
                                        </span>
                                    )}
                                </td>

                                <td>{branch.branchName}</td>

                                <td>
                                    {role === "admin" && (
                                        <>
                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    onEdit({
                                                        ...branch,
                                                        sportIndex: index
                                                    })
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteSport(branch._id, sport._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
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

export default SportsTable;