import express from "express";
import { checkRole } from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createNews,
    getAllNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// router.post("/", upload.single("image"), createNews);
// router.get("/", getAllNews);
// router.put("/:id", upload.single("image"), updateNews);
// router.delete("/:id", deleteNews);

router.post("/", authMiddleware, checkRole(["admin"]), createNews);
router.put("/:id", authMiddleware, checkRole(["admin"]), updateNews);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteNews);
router.get("/", getAllNews);

export default router;