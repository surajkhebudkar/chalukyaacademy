import express from "express";
const router = express.Router();

import {
    createNews,
    getAllNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js";

import upload from "../config/multer.js";
import { verifyToken } from "../middleware/authMiddleware.js";

// CREATE
router.post("/", verifyToken, upload.single("image"), createNews);

// READ
router.get("/", verifyToken, getAllNews);

// UPDATE
router.put("/:id", verifyToken, upload.single("image"), updateNews);

// DELETE
router.delete("/:id", verifyToken, deleteNews);

export default router;