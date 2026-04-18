import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

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
                title: editData.title || "",
                description: editData.description || "",
                date: editData.date?.substring(0, 10) || ""
            });

            if (editData.image) {
                setPreview(`http://localhost:5000/uploads/events/${editData.image}`);
            }
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            if (image) {
                formData.append("image", image);
            }

            if (editData) {
                await axios.put(`/events/${editData._id}`, formData);
                alert("Updated Successfully ✅");
            } else {
                await axios.post("/events", formData);
                alert("Added Successfully ✅");
            }

            onSuccess();

        } catch (err) {
            console.log("EVENT ERROR:", err.response?.data || err);
            alert("Error ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-sport-container">
            <form onSubmit={handleSubmit} className="add-sport-form">

                <input
                    placeholder="Event Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />

                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                />

                <label>Event Image</label>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setImage(file);
                        if (file) {
                            setPreview(URL.createObjectURL(file));
                        }
                    }}
                />

                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        width="120"
                        style={{ borderRadius: "6px", margin: "auto" }}
                    />
                )}

                <div className="btn-group">
                    <button type="submit" className="primary-btn">
                        {loading ? "Saving..." : editData ? "Update Event" : "Add Event"}
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

export default AddEvent;