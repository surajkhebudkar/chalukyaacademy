import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./AddSport.css";

export default function AddSport({ onSuccess, onCancel, editData }) {

    const [form, setForm] = useState({
        branchName: "",
        branchLocation: "",
        branchMap: "",
        sportName: "",
        history: "",
        equipment: [],
        coaches: []
    });

    const [files, setFiles] = useState({});

    // ✅ EDIT MODE FIX
    useEffect(() => {
        if (editData) {
            setForm({
                ...editData,
                equipment: editData.equipment || [],
                coaches: editData.coaches || []
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ VALIDATION (basic)
    const validate = () => {
        if (!form.branchName || !form.sportName) {
            alert("Branch & Sport name required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const formData = new FormData();

            formData.append("data", JSON.stringify(form));

            Object.keys(files).forEach(key => {
                if (Array.isArray(files[key])) {
                    files[key].forEach(f => formData.append(key, f));
                } else {
                    formData.append(key, files[key]);
                }
            });

            if (editData) {
                // ✅ UPDATE (send JSON only, NOT files)
                await axios.put(`/sports/${editData._id}`, {
                    ...form
                });
                alert("Updated ✅");
            } else {
                await axios.post("/sports", formData);
                alert("Added ✅");
            }

            onSuccess();

        } catch (err) {
            console.log(err);
            alert("Error");
        }
    };

    return (
        <div className="add-sport-container">
            <h2>{editData ? "Edit Sport" : "Add Sport"}</h2>

            <form onSubmit={handleSubmit} className="add-sport-form">

                <input
                    name="branchName"
                    placeholder="Branch Name"
                    value={form.branchName}
                    onChange={handleChange}
                    required
                />

                <input
                    name="branchLocation"
                    placeholder="Location"
                    value={form.branchLocation}
                    onChange={handleChange}
                />

                <input
                    name="branchMap"
                    placeholder="Google Map Link"
                    value={form.branchMap}
                    onChange={handleChange}
                />

                <label>Branch Image</label>
                <input type="file"
                    onChange={(e) =>
                        setFiles({ ...files, branchImage: e.target.files[0] })
                    }
                />

                <input
                    name="sportName"
                    placeholder="Sport Name"
                    value={form.sportName}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="history"
                    placeholder="History"
                    value={form.history}
                    onChange={handleChange}
                />

                <label>Sport Image</label>
                <input type="file"
                    onChange={(e) =>
                        setFiles({ ...files, sportImage: e.target.files[0] })
                    }
                />

                {/* EQUIPMENT */}
                <label>Equipments</label>

                <button
                    type="button"
                    onClick={() =>
                        setForm({
                            ...form,
                            equipment: [...form.equipment, { name: "" }]
                        })
                    }
                >
                    + Add Equipment
                </button>

                {form.equipment.map((eq, i) => (
                    <div key={i}>
                        <input
                            value={eq.name}
                            placeholder="Equipment Name"
                            onChange={(e) => {
                                const newEq = [...form.equipment];
                                newEq[i].name = e.target.value;
                                setForm({ ...form, equipment: newEq });
                            }}
                        />

                        <input type="file"
                            onChange={(e) => {
                                const arr = files.equipmentImages || [];
                                arr[i] = e.target.files[0];
                                setFiles({ ...files, equipmentImages: arr });
                            }}
                        />
                    </div>
                ))}

                {/* COACHES */}
                <label>Coaches</label>

                <button
                    type="button"
                    onClick={() =>
                        setForm({
                            ...form,
                            coaches: [
                                ...form.coaches,
                                { name: "", experience: "", achievements: [] }
                            ]
                        })
                    }
                >
                    + Add Coach
                </button>

                {form.coaches.map((c, i) => (
                    <div key={i}>
                        <input
                            value={c.name}
                            placeholder="Name"
                            onChange={(e) => {
                                const arr = [...form.coaches];
                                arr[i].name = e.target.value;
                                setForm({ ...form, coaches: arr });
                            }}
                        />

                        <input
                            value={c.experience}
                            placeholder="Experience"
                            onChange={(e) => {
                                const arr = [...form.coaches];
                                arr[i].experience = e.target.value;
                                setForm({ ...form, coaches: arr });
                            }}
                        />

                        <input
                            placeholder="Achievements (comma separated)"
                            onChange={(e) => {
                                const arr = [...form.coaches];
                                arr[i].achievements = e.target.value.split(",");
                                setForm({ ...form, coaches: arr });
                            }}
                        />

                        <input type="file"
                            onChange={(e) => {
                                const arr = files.coachPhotos || [];
                                arr[i] = e.target.files[0];
                                setFiles({ ...files, coachPhotos: arr });
                            }}
                        />
                    </div>
                ))}

                <div className="btn-group">
                    <button type="submit">
                        {editData ? "Update" : "Add"}
                    </button>

                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}