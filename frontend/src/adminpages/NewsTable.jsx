import axios from "axios";

const NewsTable = ({ news, refresh }) => {

    const deleteNews = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/news/${id}`);
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
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {news.map((item) => (
                    <tr key={item._id}>
                        <td>
                            <img
                                src={`http://localhost:5000/uploads/news/${item.image}`}
                                width="60"
                            />
                        </td>

                        <td>
                            {item.title}
                            {isNew(item.createdAt) && (
                                <span className="new-badge" style={{ marginLeft: "8px" }}>
                                    NEW
                                </span>
                            )}
                        </td>

                        <td>{item.description}</td>

                        <td>
                           <button
                           className="edit-btn" 
                           onClick={() => onEdit(item)}>Edit</button>
                        </td>
                        <td>
                            <button
                                className="delete-btn"
                                onClick={() => deleteNews(item._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default NewsTable;