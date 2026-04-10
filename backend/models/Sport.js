import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
    name: String,
    photo: String,
    experience: String,
    achievements: [String]
});

const equipmentSchema = new mongoose.Schema({
    name: String,
    image: String
});

const sportSchema = new mongoose.Schema({
    name: String,
    image: String,
    history: String,
    equipment: [equipmentSchema],
    coaches: [coachSchema]
});

const branchSchema = new mongoose.Schema({
    branchName: { type: String, required: true },
    branchImage: String,
    branchLocation: String,
    branchMap: String,

    sports: [sportSchema], // 🔥 IMPORTANT CHANGE

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Sport", branchSchema);