// controllers/galleryController.js

import Gallery from "../models/Gallery.js";
import fs from "fs";

// CREATE
export const createGallery = async (req, res) => {
    try {
        const { title } = req.body;

        const folderName = title.toLowerCase().replace(/\s+/g, "-");

        const coverImage = req.files?.coverImage
            ? `/uploads/gallery/${folderName}/${req.files.coverImage[0].filename}`
            : "";

        const photos = req.files?.photos
            ? req.files.photos.map(
                  (file) =>
                      `/uploads/gallery/${folderName}/${file.filename}`
              )
            : [];

        const gallery = new Gallery({
            title,
            coverImage,
            photos,
            folderName
        });

        await gallery.save();

        res.status(201).json({ success: true, data: gallery });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL (WITH PAGINATION)
export const getAllGalleries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const total = await Gallery.countDocuments();

        const galleries = await Gallery.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            data: galleries,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const updateGallery = async (req, res) => {
    try {
        const { title, existingPhotos } = req.body;

        const gallery = await Gallery.findById(req.params.id);

        if (!gallery) {
            return res.status(404).json({ message: "Gallery not found" });
        }

        const folderName = title
            ? title.toLowerCase().replace(/\s+/g, "-")
            : gallery.folderName;

        let updatedPhotos = [];
        if (existingPhotos) {
            updatedPhotos = JSON.parse(existingPhotos).map(p =>
                p.replace("http://localhost:5000", "")
            );
        }

        gallery.photos.forEach(oldPath => {
            if (!updatedPhotos.includes(oldPath)) {
                const fullPath = `.${oldPath}`;
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
        });

        if (req.files?.photos) {
            const newPhotos = req.files.photos.map(
                (file) =>
                    `/uploads/gallery/${folderName}/${file.filename}`
            );
            updatedPhotos = [...updatedPhotos, ...newPhotos];
        }

        let coverImage = gallery.coverImage;
        if (req.files?.coverImage) {
            coverImage = `/uploads/gallery/${folderName}/${req.files.coverImage[0].filename}`;
        }

        const updatedGallery = await Gallery.findByIdAndUpdate(
            req.params.id,
            {
                title: title || gallery.title,
                coverImage,
                photos: updatedPhotos,
                folderName
            },
            { new: true }
        );

        res.json({ success: true, data: updatedGallery });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteGallery = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);

        if (!gallery) {
            return res.status(404).json({ message: "Not found" });
        }

        const folderPath = `uploads/gallery/${gallery.folderName}`;

        if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
        }

        await gallery.deleteOne();

        res.json({ message: "Gallery deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};