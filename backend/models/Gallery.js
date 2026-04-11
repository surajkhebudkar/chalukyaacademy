import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: { type: String, required: true },

    coverImage: { type: String, required: true },

    photos: [{ type: String }],

    folderName: { type: String, required: true },

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Gallery", gallerySchema);