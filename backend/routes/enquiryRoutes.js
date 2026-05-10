import express from "express";

import {
    createEnquiry,
    getAllEnquiries,
    deleteEnquiry
} from "../controllers/enquiryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC form submit
router.post("/", createEnquiry);

// view enquiries
router.get(
    "/",
    authMiddleware,
    checkRole(["admin"]),
    getAllEnquiries
);

// delete enquiry
router.delete(
    "/:id",
    authMiddleware,
    checkRole(["admin"]),
    deleteEnquiry
);

export default router;