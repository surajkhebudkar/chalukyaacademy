import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    date: { type: Date, required: true }, // 🆕 event date
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Event", eventSchema);