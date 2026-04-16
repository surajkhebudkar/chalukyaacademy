import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Slider", sliderSchema);