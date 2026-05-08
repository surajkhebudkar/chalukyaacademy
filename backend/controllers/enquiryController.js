import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";

// CREATE ENQUIRY
export const createEnquiry = async (req, res) => {
    try {
        const { name, email, contact, enquiry, remark } = req.body;

        const newEnquiry = new Enquiry({
            name,
            email,
            contact,
            enquiry,
            remark,
        });

        await newEnquiry.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: email,
            to: "your-email@gmail.com",
            subject: "New Enquiry",
            html: `
                <h3>New Enquiry Received</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Contact:</b> ${contact}</p>
                <p><b>Enquiry:</b> ${enquiry}</p>
                <p><b>Remark:</b> ${remark}</p>
            `,
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// GET ALL ENQUIRIES
export const getAllEnquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const total = await Enquiry.countDocuments();

        const enquiries = await Enquiry.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: enquiries,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    // DELETE ENQUIRY
    export const deleteEnquiry = async (req, res) => {
        try {

            await Enquiry.findByIdAndDelete(req.params.id);

            res.status(200).json({
                success: true,
                message: "Enquiry deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }
    };
};