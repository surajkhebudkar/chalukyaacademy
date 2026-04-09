import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

// ✅ ADMIN
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    upload.single("image"), 
    createEvent
);

router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    upload.single("image"), 
    updateEvent
);

// ❌ DELETE
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteEvent);

// 🌐 PUBLIC
router.get("/", getAllEvents);

export default router;