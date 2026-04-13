import express from "express";
import { checkRole } from "../middleware/roleMiddleware.js";
import { uploadNews } from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createNews,
    getAllNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js";

const router = express.Router();

// ➕ CREATE NEWS
router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    uploadNews.single("image"),
    createNews
);

// 📄 GET ALL NEWS
router.get("/", getAllNews);

// ✏️ UPDATE NEWS
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadNews.single("image"),
    updateNews
);

// ❌ DELETE NEWS
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteNews
);

export default router;