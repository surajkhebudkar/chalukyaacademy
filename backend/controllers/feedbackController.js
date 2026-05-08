import Feedback from "../models/Feedback.js";
import nodemailer from "nodemailer";

// CREATE FEEDBACK
export const createFeedback = async (req, res) => {
    try {

        const { feedback } = req.body;

        // SAVE TO DB
        const newFeedback = new Feedback({
            feedback
        });

        await newFeedback.save();

        // SEND EMAIL
        const transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Feedback Received",
            html: `
                <h3>New Feedback</h3>
                <p>${feedback}</p>
            `,
        });

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }
};

// GET FEEDBACKS
export const getAllFeedbacks = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const total = await Feedback.countDocuments();

        const feedbacks = await Feedback.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: feedbacks,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

// DELETE FEEDBACK
export const deleteFeedback = async (req, res) => {
    try {

        await Feedback.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Feedback deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};