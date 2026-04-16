import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadSlider } from "../middleware/upload.js";

import {
    addSliderImage,
    getSliderImages,
    deleteSliderImage,
    updateSliderImage
} from "../controllers/imageSliderController.js";

const router = express.Router();

// ADD IMAGE
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadSlider.single("image"),
    addSliderImage
);

// GET ALL
router.get("/", getSliderImages);

// DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteSliderImage
);

// UPDATE IMAGE
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadSlider.single("image"),
    updateSliderImage
);

export default router;