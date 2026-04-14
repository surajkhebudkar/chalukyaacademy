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

// ➕ CREATE
export const createSport = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const files = req.files || {};

        const branchImage = files["branchImage"]?.[0]?.filename;

        const sportImages = files["sportImages"] || [];
        const coachPhotos = files["coachPhotos"] || [];

        // 🔥 FINAL FIX
        const sportImageKeys = JSON.parse(req.body.sportImageKeys || "[]");
        const coachPhotoKeys = JSON.parse(req.body.coachPhotoKeys || "[]");

        const sports = (data.sports || []).map((sport) => ({
            name: sport.name,
            image: sport.image || null,
            coaches: (sport.coaches || []).map(c => ({
                name: c.name,
                experience: c.experience,
                achievements: c.achievements || [],
                photo: c.photo || null
            }))
        }));

        sportImageKeys.forEach((key, index) => {
            const sIndex = Number(key);
            if (sportImages[index] && sports[sIndex]) {
                sports[sIndex].image = sportImages[index].filename;
            }
        });

        coachPhotoKeys.forEach((key, index) => {
            const file = coachPhotos[index];
            if (!file) return;

            const [sIndex, cIndex] = key.split("-").map(Number);

            if (sports[sIndex] && sports[sIndex].coaches[cIndex]) {
                sports[sIndex].coaches[cIndex].photo = file.filename;
            }
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
        console.log("CREATE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

// 📄 GET
export const getAllSports = async (req, res) => {
    try {
        const data = await Sport.find().sort({ createdAt: -1 });
        res.json({ data });
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

        // 🔥 FINAL FIX
        const sportImageKeys = JSON.parse(req.body.sportImageKeys || "[]");
        const coachPhotoKeys = JSON.parse(req.body.coachPhotoKeys || "[]");

        existing.sports = (data.sports || []).map((sport) => ({
            name: sport.name,
            image: sport.image || null,
            coaches: (sport.coaches || []).map(c => ({
                name: c.name,
                experience: c.experience,
                achievements: c.achievements || [],
                photo: c.photo || null
            }))
        }));

        sportImageKeys.forEach((key, index) => {
            const sIndex = Number(key);
            if (sportImages[index] && existing.sports[sIndex]) {
                existing.sports[sIndex].image = sportImages[index].filename;
            }
        });

        coachPhotoKeys.forEach((key, index) => {
            const file = coachPhotos[index];
            if (!file) return;

            const [sIndex, cIndex] = key.split("-").map(Number);

            if (
                existing.sports[sIndex] &&
                existing.sports[sIndex].coaches[cIndex]
            ) {
                existing.sports[sIndex].coaches[cIndex].photo = file.filename;
            }
        });

        await existing.save();

        res.json({ success: true, data: existing });

    } catch (err) {
        console.log("UPDATE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

// ❌ DELETE
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