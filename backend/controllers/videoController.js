import Video from "../models/Video.js";
import fs from "fs";

// CREATE
export const createVideo = async (req, res) => {
    try {
        const { title } = req.body;

        const video = req.file
            ? `/uploads/videos/${req.file.filename}`
            : "";

        const newVideo = new Video({ title, video });
        await newVideo.save();

        res.status(201).json({ success: true, data: newVideo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const updateVideo = async (req, res) => {
    try {
        const { title } = req.body;

        const videoData = await Video.findById(req.params.id);

        if (!videoData) {
            return res.status(404).json({ message: "Not found" });
        }

        let videoPath = videoData.video;

        if (req.file) {
            if (videoData.video && fs.existsSync(`.${videoData.video}`)) {
                fs.unlinkSync(`.${videoData.video}`);
            }

            videoPath = `/uploads/videos/${req.file.filename}`;
        }

        videoData.title = title || videoData.title;
        videoData.video = videoPath;

        await videoData.save();

        res.json({ success: true, data: videoData });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// GET ALL
export const getAllVideos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const total = await Video.countDocuments();

        const videos = await Video.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            data: videos,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) return res.status(404).json({ message: "Not found" });

        if (video.video && fs.existsSync(`.${video.video}`)) {
            fs.unlinkSync(`.${video.video}`);
        }

        await video.deleteOne();

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};