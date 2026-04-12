import fs from "fs";
import path from "path";
import Sport from "../models/Sport.js";

// 🧹 DELETE FILE
const deleteFile = (file) => {
    if (!file) return;

    const folders = ["branches", "branchsports", "coaches"];

    folders.forEach(folder => {
        const filePath = path.join("uploads/sports", folder, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
};

// ➕ CREATE (MULTIPLE SPORTS)
export const createSport = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const files = req.files || {};

        const branchImage = files["branchImage"]?.[0]?.filename;
        const sportImages = files["sportImages"] || [];
        const coachPhotos = files["coachPhotos"] || [];

        let coachIndex = 0;

        const sports = (data.sports || []).map((sport, sIndex) => {

            const coachCount = (sport.coaches || []).length;

            const coachSlice = coachPhotos.slice(
                coachIndex,
                coachIndex + coachCount
            );

            coachIndex += coachCount;

            const coaches = (sport.coaches || []).map((c, i) => ({
                name: c.name,
                experience: c.experience,
                achievements: c.achievements || [],
                photo: coachSlice[i]?.filename || null
            }));

            return {
                name: sport.name,
                image: sportImages[sIndex]?.filename || null,
                coaches
            };
        });

        const branch = new Sport({
            branchName: data.branchName,
            branchLocation: data.branchLocation,
            branchMap: data.branchMap,
            branchImage,
            sports
        });

        await branch.save();

        res.status(201).json({ success: true, data: branch });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// 📄 GET ALL (WITH PAGINATION)
export const getAllSports = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const total = await Sport.countDocuments();

        const data = await Sport.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            data,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✏️ UPDATE FULL BRANCH
export const updateSport = async (req, res) => {
    try {
        const { id } = req.params;
        const existing = await Sport.findById(id);

        if (!existing) {
            return res.status(404).json({ error: "Branch not found" });
        }

        const data = JSON.parse(req.body.data);
        const files = req.files || {};

        existing.branchName = data.branchName;
        existing.branchLocation = data.branchLocation;
        existing.branchMap = data.branchMap;

        if (files["branchImage"]) {
            deleteFile(existing.branchImage);
            existing.branchImage = files["branchImage"][0].filename;
        }

        const sportImages = files["sportImages"] || [];
        const coachPhotos = files["coachPhotos"] || [];

        let coachIndex = 0;

        existing.sports = (data.sports || []).map((sport, sIndex) => {

            const coachCount = (sport.coaches || []).length;

            const coachSlice = coachPhotos.slice(
                coachIndex,
                coachIndex + coachCount
            );

            coachIndex += coachCount;

            const coaches = (sport.coaches || []).map((c, i) => ({
                name: c.name,
                experience: c.experience,
                achievements: c.achievements || [],
                photo: coachSlice[i]?.filename || c.photo || null
            }));

            return {
                name: sport.name,
                image: sportImages[sIndex]?.filename || sport.image || null,
                coaches
            };
        });

        await existing.save();

        res.json({ success: true, data: existing });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// ❌ DELETE FULL BRANCH
export const deleteSport = async (req, res) => {
    try {
        const branch = await Sport.findById(req.params.id);

        if (!branch) return res.status(404).json({ error: "Not found" });

        deleteFile(branch.branchImage);

        branch.sports.forEach(s => {
            deleteFile(s.image);
            s.coaches?.forEach(c => deleteFile(c.photo));
        });

        await branch.deleteOne();

        res.json({ message: "Branch deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ❌ DELETE SINGLE SPORT
export const deleteSingleSport = async (req, res) => {
    try {
        const { branchId, sportId } = req.params;

        const branch = await Sport.findById(branchId);
        if (!branch) return res.status(404).json({ error: "Branch not found" });

        const sport = branch.sports.id(sportId);
        if (!sport) return res.status(404).json({ error: "Sport not found" });

        deleteFile(sport.image);
        sport.coaches?.forEach(c => deleteFile(c.photo));

        sport.remove();

        await branch.save();

        res.json({ message: "Sport deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};