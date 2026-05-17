import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const EnquiryTable = ({
    enquiries,
    currentPage,
    totalPages,
    onPageChange,
    refresh
}) => {

    const deleteEnquiry = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this enquiry?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`/enquiry/${id}`);

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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Enquiry</th>
                        <th>Remark</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {(enquiries || []).map((item) => (
                        <tr key={item._id}>

                            <td>{item.name}</td>

                            <td>{item.email || "-"}</td>

                            <td>{item.contact}</td>

                            <td>{item.enquiry}</td>

                            <td>{item.remark || "-"}</td>

                            <td>
                                {new Date(item.createdAt)
                                    .toLocaleString()}
                            </td>

                            <td>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >

                                {item.email && (
                                    <a
                                        href={`mailto:${item.email}`}
                                        className="edit-btn"
                                        style={{
                                            textDecoration: "none",
                                            display: "inline-block"
                                        }}
                                    >
                                        Reply
                                    </a>
                                )}

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteEnquiry(item._id)}
                                >
                                    Delete
                                </button>

                                </div>
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

export default EnquiryTable;