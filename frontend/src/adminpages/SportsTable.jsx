import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const SportsTable = ({ sports = [], refresh, onEdit }) => {

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
                                            ? `http://localhost:5000/uploads/sports/${sport.image}`
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
                                        {/* ✅ FIXED EDIT */}
                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                onEdit({
                                                    ...branch,              // FULL branch
                                                    sportIndex: index       // which sport to edit
                                                })
                                            }
                                        >
                                            Edit
                                        </button>

                                        {/* ✅ DELETE SINGLE SPORT */}
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
    );
};

export default SportsTable;