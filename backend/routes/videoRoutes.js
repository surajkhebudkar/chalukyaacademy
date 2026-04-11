import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadVideo } from "../middleware/upload.js";
import { updateVideo } from "../controllers/videoController.js";

import {
    createVideo,
    getAllVideos,
    updateVideo,
    deleteVideo
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

router.get("/", getAllVideos);

router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteVideo);

export default router;