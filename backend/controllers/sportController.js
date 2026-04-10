import fs from "fs";
import path from "path";
import Joi from "joi";
import Sport from "../models/Sport.js";

// ✅ SIMPLE CACHE
let sportsCache = null;

// ✅ JOI VALIDATION
const sportSchema = Joi.object({
    branchName: Joi.string().required(),
    branchLocation: Joi.string().allow(""),
    branchMap: Joi.string().allow(""),

    sportName: Joi.string().required(),
    history: Joi.string().allow(""),

    equipment: Joi.array().items(
        Joi.object({
            name: Joi.string().allow("")
        })
    ).default([]),

    coaches: Joi.array().items(
        Joi.object({
            name: Joi.string().allow(""),
            experience: Joi.string().allow(""),
            achievements: Joi.array().items(Joi.string()).default([])
        })
    ).default([])
});

// 🧹 DELETE FILE HELPER
const deleteFile = (file) => {
    if (!file) return;
    const filePath = path.join("uploads/sports", file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// ➕ CREATE
export const createSport = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);

        // ✅ VALIDATION
        const { error } = sportSchema.validate(data);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const files = req.files || {};

        const sportImage = files["sportImage"]?.[0]?.filename;
        const branchImage = files["branchImage"]?.[0]?.filename;

        const equipmentImages = files["equipmentImages"] || [];
        const coachPhotos = files["coachPhotos"] || [];

        const equipment = (data.equipment || []).map((item, i) => ({
            name: item.name,
            image: equipmentImages[i]?.filename
        }));

        const coaches = (data.coaches || []).map((coach, i) => ({
            name: coach.name,
            experience: coach.experience,
            achievements: coach.achievements,
            photo: coachPhotos[i]?.filename
        }));

        const sport = new Sport({
            ...data,
            sportImage,
            branchImage,
            equipment,
            coaches
        });

        await sport.save();

        // ❌ clear cache
        sportsCache = null;

        res.status(201).json({ success: true, data: sport });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📄 GET (WITH CACHE)
export const getAllSports = async (req, res) => {
    try {
        // ✅ RETURN CACHE
        if (sportsCache) {
            return res.json(sportsCache);
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const total = await Sport.countDocuments();

        const sports = await Sport.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const response = {
            data: sports,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        };

        // ✅ STORE CACHE
        sportsCache = response;

        res.json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✏️ UPDATE
export const updateSport = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await Sport.findById(id);

        if (!existing) {
            return res.status(404).json({ error: "Sport not found" });
        }

        const data = req.body;

        // ✅ VALIDATION
        const { error } = sportSchema.validate(data);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // ❗ ONLY DELETE IF IMAGE IS CHANGED
        if (data.branchImage && data.branchImage !== existing.branchImage) {
            deleteFile(existing.branchImage);
        }

        if (data.sportImage && data.sportImage !== existing.sportImage) {
            deleteFile(existing.sportImage);
        }

        // ❗ DO NOT DELETE ALL equipment/coach images blindly
        // (very important fix)

        const updated = await Sport.findByIdAndUpdate(id, data, { new: true });

        // ❌ clear cache
        sportsCache = null;

        res.json(updated);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ DELETE
export const deleteSport = async (req, res) => {
    try {
        const sport = await Sport.findById(req.params.id);

        if (!sport) {
            return res.status(404).json({ error: "Not found" });
        }

        // 🧹 DELETE ALL IMAGES
        deleteFile(sport.branchImage);
        deleteFile(sport.sportImage);

        sport.equipment?.forEach(eq => deleteFile(eq.image));
        sport.coaches?.forEach(c => deleteFile(c.photo));

        await sport.deleteOne();

        // ❌ clear cache
        sportsCache = null;

        res.json({ message: "Deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};