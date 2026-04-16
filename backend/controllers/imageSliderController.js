import Slider from "../models/ImageSlider.js";
import fs from "fs";
import path from "path";

// ADD IMAGE
export const addSliderImage = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        const image = req.file.filename;
        const title = req.body.title || "";

        const slider = new Slider({
            image,
            title
        });

        await slider.save();

        res.status(201).json({
            success: true,
            data: slider
        });

    } catch (err) {
        console.log("ADD SLIDER ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};


// GET ALL
export const getSliderImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Slider.countDocuments();

        const data = await Slider.find()
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


// DELETE
export const deleteSliderImage = async (req, res) => {
    try {
        const slider = await Slider.findById(req.params.id);

        if (!slider) {
            return res.status(404).json({ error: "Not found" });
        }

        const filePath = path.join("uploads/imageslider", slider.image);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await slider.deleteOne();

        res.json({ message: "Deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// UPDATE
export const updateSliderImage = async (req, res) => {
    try {
        const { id } = req.params;
        const slider = await Slider.findById(id);

        if (!slider) {
            return res.status(404).json({ error: "Not found" });
        }

        if (req.file) {
            const oldPath = path.join("uploads/imageslider", slider.image);

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            slider.image = req.file.filename;
        }

        if (req.body.title !== undefined) {
            slider.title = req.body.title;
        }

        await slider.save();

        res.json({ success: true, data: slider });

    } catch (err) {
        console.log("UPDATE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};