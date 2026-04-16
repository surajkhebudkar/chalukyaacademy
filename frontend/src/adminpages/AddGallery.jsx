import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddGallery({ onSuccess, onCancel, editData }) {

    const [form, setForm] = useState({
        title: ""
    });

    const [files, setFiles] = useState({
        coverImage: null,
        photos: []
    });

    const [preview, setPreview] = useState({
        coverImage: "",
        photos: []
    });

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || ""
            });

            setPreview({
                coverImage: editData.coverImage
                    ? `http://localhost:5000${editData.coverImage}`
                    : "",
                photos: editData.photos
                    ? editData.photos.map(p => `http://localhost:5000${p}`)
                    : []
            });
        }
    }, [editData]);

    const addPhoto = () => {
        setFiles(prev => ({
            ...prev,
            photos: [...prev.photos, null]
        }));
    };

    const removeOldPhoto = (index) => {
        const updated = [...preview.photos];
        updated.splice(index, 1);
        setPreview({ ...preview, photos: updated });
    };

    const removeNewPhoto = (index) => {
        const updated = [...files.photos];
        updated.splice(index, 1);
        setFiles({ ...files, photos: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("title", form.title);

            formData.append("existingPhotos", JSON.stringify(preview.photos));

            if (files.coverImage) {
                formData.append("coverImage", files.coverImage);
            }

            files.photos.forEach(f => {
                if (f) formData.append("photos", f);
            });

            if (editData) {
                await axios.put(`/gallery/${editData._id}`, formData);
                alert("Updated Successfully ✅");
            } else {
                await axios.post("/gallery", formData);
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
                    placeholder="Album Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <label>Cover Image</label>

                {preview.coverImage && (
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <img
                            src={preview.coverImage}
                            alt="cover"
                            width="100"
                            style={{ borderRadius: "6px" }}
                        />
                    </div>
                )}

                <input
                    type="file"
                    onChange={(e) =>
                        setFiles({ ...files, coverImage: e.target.files[0] })
                    }
                />

                <button
                    type="button"
                    className="add-btnsport"
                    onClick={addPhoto}
                >
                    + Add Photos
                </button>

                {preview.photos.length > 0 && (
                    <div className="dynamic-row" style={{ display: "flex", flexWrap: "wrap" }}>
                        {preview.photos.map((img, i) => (
                            <div key={i} style={{ position: "relative", margin: "5px" }}>
                                <img
                                    src={img}
                                    alt=""
                                    width="70"
                                    style={{ borderRadius: "6px" }}
                                />

                                <button
                                    type="button"
                                    onClick={() => removeOldPhoto(i)}
                                    style={{
                                        position: "absolute",
                                        top: "-6px",
                                        right: "-6px",
                                        background: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        fontSize: "12px",
                                        cursor: "pointer"
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {files.photos.map((p, index) => (
                    <div key={index} className="dynamic-row" style={{ position: "relative" }}>
                        <input
                            type="file"
                            onChange={(e) => {
                                const arr = [...files.photos];
                                arr[index] = e.target.files[0];
                                setFiles({ ...files, photos: arr });
                            }}
                        />

                        <button
                            type="button"
                            onClick={() => removeNewPhoto(index)}
                            style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                fontSize: "12px",
                                cursor: "pointer"
                            }}
                        >
                            ✖
                        </button>
                    </div>
                ))}

                <div className="btn-group">
                    <button type="submit" className="primary-btn">
                        {editData ? "Update Gallery" : "Add Gallery"}
                    </button>

                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}