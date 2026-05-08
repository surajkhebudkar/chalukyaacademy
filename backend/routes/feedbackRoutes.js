import express from "express";

import {
    createFeedback,
    getAllFeedbacks,
    deleteFeedback
} from "../controllers/feedbackController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createFeedback);

// ADMIN GET
router.get(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    getAllFeedbacks
);

// ADMIN DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteFeedback
);

export default router;