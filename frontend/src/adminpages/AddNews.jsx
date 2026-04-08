import { useState } from "react";
import axios from "axios";
import "./AddNews.css";

const AddNews = ({ onSuccess, onCancel }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("image", image);

            await axios.post("http://localhost:5000/api/news", formData);

            alert("News Added Successfully 🔥");

            onSuccess(); // 👈 go back + refresh

        } catch (error) {
            console.error(error);
            alert("Error adding news");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-news-container">
            <h2>Add News</h2>

            <form onSubmit={handleSubmit} className="add-news-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Enter Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                <input type="file" onChange={handleImageChange} required />

                {preview && (
                    <img src={preview} alt="preview" className="preview-img" />
                )}

                <div className="btn-group">
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add News"}
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNews;