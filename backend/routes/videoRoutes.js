// 🔥 FIXED videoRoutes.js (NO DUPLICATE IMPORT)

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadVideo } from "../middleware/upload.js";

import {
    createVideo,
    getAllVideos,
    deleteVideo,
    updateVideo
} from "../controllers/videoController.js";

const router = express.Router();

// CREATE
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadVideo.single("video"),
    createVideo
);

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadVideo.single("video"),
    updateVideo
);

// DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteVideo
);

// GET
router.get("/", getAllVideos);

export default router;