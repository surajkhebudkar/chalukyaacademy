import axios from "../utils/axiosInstance";
import "./AdminDashboard.css";

const EnquiryTable = ({
    enquiries,
    currentPage,
    totalPages,
    onPageChange
}) => {
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
                                {new Date(item.createdAt).toLocaleString()}
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