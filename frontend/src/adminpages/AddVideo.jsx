import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddVideo({ onSuccess, onCancel, editData }) {

    const [form, setForm] = useState({
        title: ""
    });

    const [file, setFile] = useState(null);

    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || ""
            });

            setPreview(
                editData.video
                    ? `http://localhost:5000${editData.video}`
                    : ""
            );
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

                {/* TITLE */}
                <input
                    placeholder="Video Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                {preview && (
                    <div className="dynamic-row">
                        <video
                            src={preview}
                            controls
                            width="100%"
                            style={{ borderRadius: "8px" }}
                        />
                    </div>
                )}

                <label>Upload Video</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files[0])}
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