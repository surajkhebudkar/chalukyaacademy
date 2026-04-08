import express from "express";
import {
    createNews,
    getAllNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createNews);
router.get("/", getAllNews);
router.put("/:id", upload.single("image"), updateNews);
router.delete("/:id", deleteNews);

export default router;