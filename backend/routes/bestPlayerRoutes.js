import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadPlayer } from "../middleware/upload.js";

import {
    addPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer
} from "../controllers/bestPlayerController.js";

const router = express.Router();

// ADD PLAYER
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadPlayer.single("image"),
    addPlayer
);

// GET PLAYERS
router.get("/", getPlayers);

// UPDATE PLAYER
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadPlayer.single("image"),
    updatePlayer
);

// DELETE PLAYER
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deletePlayer
);

export default router;