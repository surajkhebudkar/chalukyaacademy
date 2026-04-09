import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import "./AddNews.css";

const AddEvent = ({ onSuccess, onCancel, editData }) => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        date: ""
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title,
                description: editData.description,
                date: editData.date?.split("T")[0]
            });

            if (editData.image) {
                setPreview(`http://localhost:5000/uploads/events/${editData.image}`);
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
            formData.append("date", form.date);
            if (image) formData.append("image", image);

            if (editData) {
                await axios.put(`/events/${editData._id}`, formData);
                alert("Updated ✅");
            } else {
                await axios.post("/events", formData);
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
            <h2>{editData ? "Edit Event" : "Add Event"}</h2>

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

                {/* 🆕 DATE FIELD */}
                <input
                    type="date"
                    name="date"
                    value={form.date}
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

export default AddEvent;