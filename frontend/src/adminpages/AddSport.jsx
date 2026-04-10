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
        equipmentImages: [],
        coachPhotos: []
    });

    // ✅ EDIT LOAD FIX
    useEffect(() => {
        if (editData) {
            setForm({
                branchName: editData.branchName || "",
                branchLocation: editData.branchLocation || "",
                branchMap: editData.branchMap || "",
                sports: Array.isArray(editData.sports) ? editData.sports : []
            });
        }
    }, [editData]);

    // ➕ ADD SPORT
    const addSport = () => {
        setForm(prev => ({
            ...prev,
            sports: [
                ...prev.sports,
                { name: "", history: "", equipment: [], coaches: [] }
            ]
        }));
    };

    const addEquipment = (sIndex) => {
        const updated = [...form.sports];
        updated[sIndex].equipment.push({ name: "" });
        setForm({ ...form, sports: updated });
    };

    const addCoach = (sIndex) => {
        const updated = [...form.sports];
        updated[sIndex].coaches.push({
            name: "",
            experience: "",
            achievements: []
        });
        setForm({ ...form, sports: updated });
    };

    const addAchievement = (sIndex, cIndex) => {
        const updated = [...form.sports];
        updated[sIndex].coaches[cIndex].achievements.push("");
        setForm({ ...form, sports: updated });
    };

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

            files.equipmentImages.forEach(f => {
                if (f) formData.append("equipmentImages", f);
            });

            files.coachPhotos.forEach(f => {
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
                <input type="file"
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

                        <textarea
                            placeholder="History"
                            value={sport.history}
                            onChange={(e) => {
                                const updated = [...form.sports];
                                updated[sIndex].history = e.target.value;
                                setForm({ ...form, sports: updated });
                            }}
                        />

                        {/* SPORT IMAGE */}
                        <input type="file"
                            onChange={(e) => {
                                const arr = [...files.sportImages];
                                arr[sIndex] = e.target.files[0];
                                setFiles({ ...files, sportImages: arr });
                            }}
                        />

                        {/* EQUIPMENT */}
                        <button type="button" className="add-btnsport"
                            onClick={() => addEquipment(sIndex)}>
                            + Add Equipment
                        </button>

                        {sport.equipment.map((eq, eIndex) => (
                            <div key={eIndex}>
                                <input
                                    placeholder="Equipment"
                                    value={eq.name}
                                    onChange={(e) => {
                                        const updated = [...form.sports];
                                        updated[sIndex].equipment[eIndex].name = e.target.value;
                                        setForm({ ...form, sports: updated });
                                    }}
                                />

                                <input type="file"
                                    onChange={(e) => {
                                        const arr = [...files.equipmentImages];
                                        arr[eIndex] = e.target.files[0]; // ✅ FIX
                                        setFiles({ ...files, equipmentImages: arr });
                                    }}
                                />
                            </div>
                        ))}

                        {/* COACH */}
                        <button type="button" className="add-btnsport"
                            onClick={() => addCoach(sIndex)}>
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

                                <input type="file"
                                    onChange={(e) => {
                                        const arr = [...files.coachPhotos];
                                        arr[cIndex] = e.target.files[0]; // ✅ FIX
                                        setFiles({ ...files, coachPhotos: arr });
                                    }}
                                />

                                <button
                                    type="button"
                                    className="add-btnsport"
                                    style={{ marginLeft: "auto", display: "block" }}
                                    onClick={() => addAchievement(sIndex, cIndex)}
                                >
                                    + Add Achievement
                                </button>

                                {c.achievements.map((a, aIndex) => (
                                    <input
                                        key={aIndex}
                                        placeholder="Achievement"
                                        value={a}
                                        onChange={(e) => {
                                            const updated = [...form.sports];
                                            updated[sIndex].coaches[cIndex].achievements[aIndex] = e.target.value;
                                            setForm({ ...form, sports: updated });
                                        }}
                                    />
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