import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddVideo({ onSuccess, onCancel, editData }) {

    const [form, setForm] = useState({
        title: ""
    });

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || ""
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("title", form.title);

            if (file) {
                formData.append("video", file);
            }

            if (editData) {
                await axios.put(`/videos/${editData._id}`, formData);
                alert("Updated Successfully ✅");
            } else {
                await axios.post("/videos", formData);
                alert("Added Successfully ✅");
            }

            onSuccess();

        } catch (err) {
            console.log(err);
            alert("Error ❌");
        }
    };

    return (
        <div className="add-sport-container">
            <form onSubmit={handleSubmit} className="add-sport-form">

                <input
                    placeholder="Video Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <label>Upload Video</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required={!editData}
                />

                <div className="btn-group">
                    <button type="submit" className="primary-btn">
                        {editData ? "Update Video" : "Add Video"}
                    </button>

                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}