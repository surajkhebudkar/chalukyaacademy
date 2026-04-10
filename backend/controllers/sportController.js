import fs from "fs";
import path from "path";
import Sport from "../models/Sport.js";

// 🧹 DELETE FILE
const deleteFile = (file) => {
    if (!file) return;
    const filePath = path.join("uploads/sports", file);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// ➕ CREATE (MULTIPLE SPORTS)
export const createSport = async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const files = req.files || {};

        const branchImage = files["branchImage"]?.[0]?.filename;
        const sportImages = files["sportImages"] || [];
        const equipmentImages = files["equipmentImages"] || [];
        const coachPhotos = files["coachPhotos"] || [];

        let eqIndex = 0;
        let coachIndex = 0;

        const sports = (data.sports || []).map((sport, sIndex) => {

            const equipment = (sport.equipment || []).map((eq) => {
                const imageFile = equipmentImages[eqIndex++];
                return {
                    name: eq.name,
                    image: imageFile ? imageFile.filename : null
                };
            });

            const coaches = (sport.coaches || []).map((c) => {
                const photoFile = coachPhotos[coachIndex++];
                return {
                    name: c.name,
                    experience: c.experience,
                    achievements: c.achievements || [],
                    photo: photoFile ? photoFile.filename : null
                };
            });

            return {
                name: sport.name,
                history: sport.history,
                image: sportImages[sIndex]?.filename || null,
                equipment,
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

// 📄 GET ALL
export const getAllSports = async (req, res) => {
    try {
        const data = await Sport.find().sort({ createdAt: -1 });
        res.json({ data });
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

        // 🔥 branch update
        existing.branchName = data.branchName;
        existing.branchLocation = data.branchLocation;
        existing.branchMap = data.branchMap;

        if (files["branchImage"]) {
            deleteFile(existing.branchImage);
            existing.branchImage = files["branchImage"][0].filename;
        }

        const sportImages = files["sportImages"] || [];
        const equipmentImages = files["equipmentImages"] || [];
        const coachPhotos = files["coachPhotos"] || [];

        let eqIndex = 0;
        let coachIndex = 0;

        existing.sports = (data.sports || []).map((sport, sIndex) => {

            const equipment = (sport.equipment || []).map((eq) => {
                const file = equipmentImages[eqIndex++];
                return {
                    name: eq.name,
                    image: file ? file.filename : eq.image || null
                };
            });

            const coaches = (sport.coaches || []).map((c) => {
                const file = coachPhotos[coachIndex++];
                return {
                    name: c.name,
                    experience: c.experience,
                    achievements: c.achievements || [],
                    photo: file ? file.filename : c.photo || null
                };
            });

            return {
                name: sport.name,
                history: sport.history,
                image: sportImages[sIndex]?.filename || sport.image || null,
                equipment,
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
            s.equipment?.forEach(eq => deleteFile(eq.image));
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
        sport.equipment?.forEach(eq => deleteFile(eq.image));
        sport.coaches?.forEach(c => deleteFile(c.photo));

        sport.remove();

        await branch.save();

        res.json({ message: "Sport deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};