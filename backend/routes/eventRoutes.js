import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadEvents } from "../middleware/upload.js";

import {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
} from "../controllers/eventController.js";

const router = express.Router();

// CREATE
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadEvents.single("image"),
    createEvent
);

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadEvents.single("image"),
    updateEvent
);

// DELETE
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteEvent
);

// GET
router.get("/", getAllEvents);

export default router;