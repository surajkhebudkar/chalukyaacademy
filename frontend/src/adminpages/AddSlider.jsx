import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddSlider({ onSuccess, onCancel, editData }) {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [title, setTitle] = useState("");

    const resetForm = () => {
        setImage(null);
        setPreview("");
        setTitle("");

        document.getElementById("slider-file").value = "";
    };

    useEffect(() => {
        if (editData) {
            setTitle(editData.title || "");

            if (editData.image) {
                setPreview(`http://localhost:5000/uploads/imageslider/${editData.image}`);
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

            if (image) formData.append("image", image);
            formData.append("title", title);

            if (editData) {
                await axios.put(`/slider/${editData._id}`, formData);
                alert("Updated Successfully ✅");
            } else {
                await axios.post("/slider", formData);
                alert("Added Successfully ✅");
            }

            resetForm();
            onSuccess();

        } catch (err) {
            console.log("SLIDER ERROR:", err.response?.data || err);
            alert("Error ❌");
        }
    };

    return (
        <div className="add-sport-container">
            <form onSubmit={handleSubmit} className="add-sport-form">

                <input
                    placeholder="Slide Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Slider Image</label>

                <input
                    id="slider-file"  // 🔥 important
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
                    <img src={preview} width="150" style={{ borderRadius: "6px" }} />
                )}

                <div className="btn-group">
                    <button type="submit" className="primary-btn">
                        {loading ? "Saving..." : editData ? "Update Image" : "Add Image"}
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