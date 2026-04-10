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
    branchName: { type: String, required: true },
    branchImage: String,
    branchLocation: String,
    branchMap: String,

    sportName: { type: String, required: true },
    sportImage: String,
    history: String,

    equipment: [equipmentSchema],
    coaches: [coachSchema],

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Sport", sportSchema);