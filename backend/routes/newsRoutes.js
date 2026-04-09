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

router.post(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    (req, res, next) => {
        console.log("🔥 NEWS API HIT");
        next();
    },
    uploadNews.single("image"),
    createNews
);
router.put(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    uploadNews.single("image"),
    updateNews
);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteNews);
router.get("/", getAllNews);

export default router;