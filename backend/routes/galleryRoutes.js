import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadGallery } from "../middleware/upload.js";

import {
    createGallery,
    getAllGalleries,
    deleteGallery,
    updateGallery
} from "../controllers/galleryController.js";

const router = express.Router();

// CREATE
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadGallery.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "photos", maxCount: 20 }
    ]),
    createGallery
);

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadGallery.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "photos", maxCount: 20 }
    ]),
    updateGallery
);

// DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteGallery
);

// GET ALL
router.get("/", getAllGalleries);

export default router;