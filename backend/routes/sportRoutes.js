import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadSports } from "../middleware/upload.js";

import {
    createSport,
    getAllSports,
    updateSport,
    deleteSport,
    deleteSingleSport
} from "../controllers/sportController.js";

const router = express.Router();

// CREATE
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadSports.fields([
        { name: "branchImage", maxCount: 1 },
        { name: "sportImages" },
        { name: "equipmentImages" },
        { name: "coachPhotos" }
    ]),
    createSport
);

// GET
router.get("/", getAllSports);

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadSports.fields([
        { name: "branchImage", maxCount: 1 },
        { name: "sportImages" },
        { name: "equipmentImages" },
        { name: "coachPhotos" }
    ]),
    updateSport
);

// DELETE BRANCH
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteSport);

// DELETE SINGLE SPORT
router.delete(
    "/:branchId/sport/:sportId",
    authMiddleware,
    checkRole(["admin"]),
    deleteSingleSport
);

export default router;