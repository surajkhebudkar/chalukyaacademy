import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddPlayer({ onSuccess, onCancel, editData }) {

    const [form, setForm] = useState({
        name: "",
        level: "",
        medals: "",
        achievement: ""
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const resetForm = () => {
        setForm({
            name: "",
            level: "",
            medals: "",
            achievement: ""
        });

        setImage(null);
        setPreview("");

        const fileInput = document.getElementById("player-file");
        if (fileInput) fileInput.value = "";
    };

    useEffect(() => {
        if (editData) {
            setForm({
                name: editData.name || "",
                level: editData.level || "",
                medals: editData.medals || "",
                achievement: editData.achievement || ""
            });

            if (editData.image) {
                setPreview(`http://localhost:5000/uploads/bestplayers/${editData.image}`);
            }
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!image && !editData) {
                alert("Please select image ❌");
                return;
            }

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("level", form.level);
            formData.append("medals", form.medals);
            formData.append("achievement", form.achievement);

            if (image) {
                formData.append("image", image);
            }

            if (editData) {
                await axios.put(`/players/${editData._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                alert("Updated Successfully ✅");
            } else {
                await axios.post(`/players`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                alert("Added Successfully ✅");
            }

            resetForm();
            onSuccess();

        } catch (err) {
            console.log("PLAYER ERROR:", err.response?.data || err);
            alert("Error ❌");
        }
    };

    return (
        <div className="add-sport-container">
            <form onSubmit={handleSubmit} className="add-sport-form">

                <input
                    placeholder="Player Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

                <input
                    placeholder="Level (State/National)"
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                />

                <input
                    placeholder="Medals (e.g. 🥇 3 Gold | 🥈 2 Silver)"
                    value={form.medals}
                    onChange={(e) => setForm({ ...form, medals: e.target.value })}
                />

                <input
                    placeholder="Achievement"
                    value={form.achievement}
                    onChange={(e) => setForm({ ...form, achievement: e.target.value })}
                />

                <input
                    id="player-file"   // 🔥 important (reset साठी)
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
                        width="120"
                        style={{ borderRadius: "6px" }}
                    />
                )}

                <div className="btn-group">
                    <button type="submit" className="primary-btn">
                        {loading ? "Saving..." : editData ? "Update Player" : "Add Player"}
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                            resetForm();
                            onCancel();
                        }}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}