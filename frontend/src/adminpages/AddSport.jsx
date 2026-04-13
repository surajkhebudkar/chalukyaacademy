import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddSport({ onSuccess, onCancel, editData }) {

    const [form, setForm] = useState({
        branchName: "",
        branchLocation: "",
        branchMap: "",
        sports: []
    });

    const [files, setFiles] = useState({
        branchImage: null,
        sportImages: [],
        coachPhotos: {} // 🔥 CHANGED (array → object)
    });

    // ✅ EDIT LOAD
    useEffect(() => {
        if (editData) {
            setForm({
                branchName: editData.branchName || "",
                branchLocation: editData.branchLocation || "",
                branchMap: editData.branchMap || "",
                sports: Array.isArray(editData.sports) ? editData.sports : []
            });

            // 🔥 RESET FILES (VERY IMPORTANT)
            setFiles({
                branchImage: null,
                sportImages: [],
                coachPhotos: {}
            });
        }
    }, [editData]);

    // ➕ ADD SPORT
    const addSport = () => {
        setForm(prev => ({
            ...prev,
            sports: [
                ...prev.sports,
                { name: "", coaches: [] }
            ]
        }));
    };

    const deleteSportRow = (sIndex) => {
        const updated = [...form.sports];
        updated.splice(sIndex, 1);
        setForm({ ...form, sports: updated });
    };

    // ➕ ADD COACH
    const addCoach = (sIndex) => {
        const updated = [...form.sports];
        updated[sIndex].coaches.push({
            name: "",
            experience: "",
            achievements: []
        });
        setForm({ ...form, sports: updated });
    };

    const deleteCoach = (sIndex, cIndex) => {
        const updated = [...form.sports];
        updated[sIndex].coaches.splice(cIndex, 1);
        setForm({ ...form, sports: updated });
    };

    // ➕ ADD ACHIEVEMENT
    const addAchievement = (sIndex, cIndex) => {
        const updated = [...form.sports];
        updated[sIndex].coaches[cIndex].achievements.push("");
        setForm({ ...form, sports: updated });
    };

    const deleteAchievement = (sIndex, cIndex, aIndex) => {
        const updated = [...form.sports];
        updated[sIndex].coaches[cIndex].achievements.splice(aIndex, 1);
        setForm({ ...form, sports: updated });
    };

    // 🔥 NEW UNIQUE KEY (FIX)
    const getCoachKey = (sIndex, cIndex) => `${sIndex}-${cIndex}`;

    // 🚀 SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.branchName || form.sports.length === 0) {
            alert("Branch & at least one sport required");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(form));

            if (files.branchImage) {
                formData.append("branchImage", files.branchImage);
            }

            files.sportImages.forEach(f => {
                if (f) formData.append("sportImages", f);
            });

            // 🔥 FIXED COACH IMAGE SEND
            Object.values(files.coachPhotos).forEach(f => {
                if (f) formData.append("coachPhotos", f);
            });

            if (editData) {
                await axios.put(`/sports/${editData._id}`, formData);
                alert("Updated Successfully ✅");
            } else {
                await axios.post("/sports", formData);
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
                    placeholder="Branch Name"
                    value={form.branchName}
                    onChange={(e) => setForm({ ...form, branchName: e.target.value })}
                    required
                />

                <input
                    placeholder="Location"
                    value={form.branchLocation}
                    onChange={(e) => setForm({ ...form, branchLocation: e.target.value })}
                />

                <input
                    placeholder="Google Map Link"
                    value={form.branchMap}
                    onChange={(e) => setForm({ ...form, branchMap: e.target.value })}
                />

                <label>Branch Image</label>
                <input
                    type="file"
                    onChange={(e) =>
                        setFiles({ ...files, branchImage: e.target.files[0] })
                    }
                />

                <button type="button" className="add-btnsport" onClick={addSport}>
                    + Add Sport
                </button>

                {form.sports.map((sport, sIndex) => (
                    <div key={sIndex} className="dynamic-row">

                        <input
                            placeholder="Sport Name"
                            value={sport.name}
                            onChange={(e) => {
                                const updated = [...form.sports];
                                updated[sIndex].name = e.target.value;
                                setForm({ ...form, sports: updated });
                            }}
                        />

                        <input
                            type="file"
                            onChange={(e) => {
                                const arr = [...files.sportImages];
                                arr[sIndex] = e.target.files[0];
                                setFiles({ ...files, sportImages: arr });
                            }}
                        />

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => deleteSportRow(sIndex)}
                        >
                            ❌ Remove Sport
                        </button>

                        <button
                            type="button"
                            className="add-btnsport"
                            onClick={() => addCoach(sIndex)}
                        >
                            + Add Coach
                        </button>

                        {sport.coaches.map((c, cIndex) => (
                            <div key={cIndex}>

                                <input
                                    placeholder="Coach Name"
                                    value={c.name}
                                    onChange={(e) => {
                                        const updated = [...form.sports];
                                        updated[sIndex].coaches[cIndex].name = e.target.value;
                                        setForm({ ...form, sports: updated });
                                    }}
                                />

                                <input
                                    placeholder="Experience"
                                    value={c.experience}
                                    onChange={(e) => {
                                        const updated = [...form.sports];
                                        updated[sIndex].coaches[cIndex].experience = e.target.value;
                                        setForm({ ...form, sports: updated });
                                    }}
                                />

                                {/* 🔥 FIXED IMAGE */}
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const key = getCoachKey(sIndex, cIndex);
                                        setFiles(prev => ({
                                            ...prev,
                                            coachPhotos: {
                                                ...prev.coachPhotos,
                                                [key]: e.target.files[0]
                                            }
                                        }));
                                    }}
                                />

                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => deleteCoach(sIndex, cIndex)}
                                >
                                    ❌ Remove Coach
                                </button>

                                <button
                                    type="button"
                                    className="add-btnsport"
                                    onClick={() => addAchievement(sIndex, cIndex)}
                                >
                                    + Add Achievement
                                </button>

                                {c.achievements.map((a, aIndex) => (
                                    <div key={aIndex} style={{ display: "flex", gap: "8px" }}>
                                        <input
                                            placeholder="Achievement"
                                            value={a}
                                            onChange={(e) => {
                                                const updated = [...form.sports];
                                                updated[sIndex].coaches[cIndex].achievements[aIndex] = e.target.value;
                                                setForm({ ...form, sports: updated });
                                            }}
                                        />

                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() => deleteAchievement(sIndex, cIndex, aIndex)}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

                <div className="btn-group">
                    <button type="submit" className="primary-btn">
                        {editData ? "Update Sports" : "Add All Sports"}
                    </button>

                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}