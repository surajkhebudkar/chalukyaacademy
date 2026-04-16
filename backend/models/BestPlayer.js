import mongoose from "mongoose";

const bestPlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    level: String,
    medals: String,
    achievement: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("BestPlayer", bestPlayerSchema);