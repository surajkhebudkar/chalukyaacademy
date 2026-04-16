import BestPlayer from "../models/BestPlayer.js";
import fs from "fs";

// ADD
export const addPlayer = async (req, res) => {
    try {
        const { name, level, medals, achievement } = req.body;

        const player = new BestPlayer({
            name,
            level,
            medals,
            achievement,
            image: req.file ? req.file.filename : ""
        });

        await player.save();

        res.status(201).json({ success: true, data: player });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


// GET
export const getPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const skip = (page - 1) * limit;

        const total = await BestPlayer.countDocuments();

        const players = await BestPlayer.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            data: players,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalItems: total
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


// UPDATE
export const updatePlayer = async (req, res) => {
    try {
        const player = await BestPlayer.findById(req.params.id);

        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }

        player.name = req.body.name || player.name;
        player.level = req.body.level || player.level;
        player.medals = req.body.medals || player.medals;
        player.achievement = req.body.achievement || player.achievement;

        if (req.file) {
            if (player.image) {
                const oldPath = `uploads/players/${player.image}`;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            player.image = req.file.filename;
        }

        await player.save();

        res.json({ success: true, data: player });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


// DELETE
export const deletePlayer = async (req, res) => {
    try {
        const player = await BestPlayer.findById(req.params.id);

        if (!player) {
            return res.status(404).json({ error: "Player not found" });
        }

        if (player.image) {
            const filePath = `uploads/players/${player.image}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await player.deleteOne();

        res.json({ message: "Player deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};