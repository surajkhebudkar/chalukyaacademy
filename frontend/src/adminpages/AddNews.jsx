import { useEffect, useState } from "react";
import axios from "axios";
import "./AddNews.css";

const AddNews = ({ onSuccess, onCancel, editData }) => {

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title,
                description: editData.description
            });

            if (editData.image) {
                setPreview(`http://localhost:5000/uploads/news/${editData.image}`);
            }
        }
    }, [editData]);

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
            if (image) formData.append("image", image);

            if (editData) {
                await axios.put(`http://localhost:5000/api/news/${editData._id}`, formData);
                alert("Updated ✅");
            } else {
                await axios.post("http://localhost:5000/api/news", formData);
                alert("Added ✅");
            }

            onSuccess();
        } catch (err) {
            console.log(err);
            alert("Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-news-container">
            <h2>{editData ? "Edit News" : "Add News"}</h2>

            <form onSubmit={handleSubmit} className="add-news-form">

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                <input type="file" onChange={handleImageChange} />

                {preview && <img src={preview} className="preview-img" />}

                <div className="btn-group">
                    <button type="submit">
                        {loading ? "Saving..." : editData ? "Update" : "Add"}
                    </button>

                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNews;