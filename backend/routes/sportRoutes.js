import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadSports } from "../middleware/upload.js";
import {
    createSport,
    getAllSports,
    updateSport,
    deleteSport
} from "../controllers/sportController.js";

const router = express.Router();

// ➕ CREATE
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadSports.fields([
        { name: "sportImage", maxCount: 1 },
        { name: "branchImage", maxCount: 1 },
        { name: "equipmentImages" },
        { name: "coachPhotos" }
    ]),
    createSport
);

// 📄 GET
router.get("/", getAllSports);

// ✏️ UPDATE (🔥 FIXED — now supports images if needed)
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadSports.fields([
        { name: "sportImage", maxCount: 1 },
        { name: "branchImage", maxCount: 1 },
        { name: "equipmentImages" },
        { name: "coachPhotos" }
    ]),
    updateSport
);

// ❌ DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteSport
);

export default router;