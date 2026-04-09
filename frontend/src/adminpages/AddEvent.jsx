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

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title,
                description: editData.description,
                date: editData.date?.substring(0, 10)
            });

            if (editData.image) {
                setPreview(`http://localhost:5000/uploads/events/${editData.image}`);
            }
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        if (image) formData.append("image", image);

        if (editData) {
            await axios.put(`/events/${editData._id}`, formData);
        } else {
            await axios.post("/events", formData);
        }

        onSuccess();
    };

    return (
        <div className="add-news-container">
            <h2>{editData ? "Edit Event" : "Add Event"}</h2>

            <form onSubmit={handleSubmit} className="add-news-form">
                <input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />

                <textarea name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />

                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />

                <input type="file" onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                }} />

                {preview && <img src={preview} className="preview-img" />}

                <div className="btn-group">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddEvent;