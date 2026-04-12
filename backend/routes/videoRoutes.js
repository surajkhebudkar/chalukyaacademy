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

router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadVideo.single("video"),
    createVideo
);

router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadVideo.single("video"),
    updateVideo
);

router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteVideo
);

router.get("/", getAllVideos);

export default router;