import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

// 🔐 ADMIN ONLY
router.post("/", authMiddleware, checkRole(["admin"]), createEvent);
router.put("/:id", authMiddleware, checkRole(["admin"]), updateEvent);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteEvent);

// 🌐 PUBLIC
router.get("/", getAllEvents);

export default router;