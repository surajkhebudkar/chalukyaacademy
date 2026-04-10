import fs from "fs";
import path from "path";
import Joi from "joi";
import Sport from "../models/Sport.js";

// ✅ CACHE
let sportsCache = null;

// ✅ VALIDATION
const schema = Joi.object({
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

// 🧹 DELETE FILE
const deleteFile = (file) => {
    if (!file) return;
    const filePath = path.join("uploads/sports", file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// ➕ CREATE (🔥 MAIN LOGIC)
export const createSport = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);

        const { error } = schema.validate(data);
        if (error) return res.status(400).json({ error: error.message });

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

        const newSport = {
            name: data.sportName,
            image: sportImage,
            history: data.history,
            equipment,
            coaches
        };

        // 🔥 CHECK IF BRANCH EXISTS
        let branch = await Sport.findOne({ branchName: data.branchName });

        if (branch) {
            // 👉 ADD SPORT TO EXISTING BRANCH
            branch.sports.push(newSport);
            await branch.save();
        } else {
            // 👉 CREATE NEW BRANCH
            branch = new Sport({
                branchName: data.branchName,
                branchLocation: data.branchLocation,
                branchMap: data.branchMap,
                branchImage,
                sports: [newSport]
            });
            await branch.save();
        }

        sportsCache = null;

        res.status(201).json({ success: true, data: branch });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📄 GET
export const getAllSports = async (req, res) => {
    try {
        if (sportsCache) return res.json(sportsCache);

        const branches = await Sport.find().sort({ createdAt: -1 });

        const response = { data: branches };

        sportsCache = response;

        res.json(response);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ DELETE (DELETE FULL BRANCH)
export const deleteSport = async (req, res) => {
    try {
        const branch = await Sport.findById(req.params.id);

        if (!branch) {
            return res.status(404).json({ error: "Not found" });
        }

        // delete images
        deleteFile(branch.branchImage);

        branch.sports.forEach(s => {
            deleteFile(s.image);
            s.equipment?.forEach(eq => deleteFile(eq.image));
            s.coaches?.forEach(c => deleteFile(c.photo));
        });

        await branch.deleteOne();

        sportsCache = null;

        res.json({ message: "Branch deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};