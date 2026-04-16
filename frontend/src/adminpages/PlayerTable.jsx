import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const confirmDelete = (msg) => window.confirm(msg);

const PlayerTable = ({
    players,
    refresh,
    onEdit,
    currentPage,
    totalPages,
    onPageChange
}) => {

    const deletePlayer = async (id) => {
        if (!confirmDelete("Delete this player?")) return;

        try {
            await axios.delete(`/players/${id}`);
            refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <table className="news-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {(players || []).map((p) => (
                        <tr key={p._id}>

                            <td>{p.name}</td>
                            <td>{p.level}</td>

                            <td>
                                <button className="edit-btn" onClick={() => onEdit(p)}>
                                    Edit
                                </button>

                                <button className="delete-btn" onClick={() => deletePlayer(p._id)}>
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

                <span>{currentPage} / {totalPages}</span>

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

export default PlayerTable;