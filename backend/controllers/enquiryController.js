import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";

// CREATE ENQUIRY
export const createEnquiry = async (req, res) => {

    try {

        let {name, email, contact, enquiry, remark} = req.body;
        name = name?.trim();
        email = email?.trim();
        contact = contact?.trim();
        enquiry = enquiry?.trim();
        remark = remark?.trim();
        if (!name || !contact || !enquiry) {

            return res.status(400).json({
                success: false,
                error: "Required fields are missing"
            });
        }
        if (name.length < 2) {
            return res.status(400).json({
                success: false,
                error: "Name must be at least 2 characters"
            });
        }
        if (!/^[0-9]{10}$/.test(contact)) {
            return res.status(400).json({
                success: false,
                error: "Contact number must be 10 digits"
            });
        }
        if (
            email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {

            return res.status(400).json({
                success: false,
                error: "Invalid email format"
            });
        }

        if (enquiry === "Select Enquiry") {

            return res.status(400).json({
                success: false,
                error: "Please select enquiry type"
            });
        }

        if (remark && remark.length > 500) {

            return res.status(400).json({
                success: false,
                error: "Remark cannot exceed 500 characters"
            });
        }

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
            from: process.env.EMAIL_USER,
            replyTo: email || process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Enquiry",

            html: `
                <h2>New Enquiry Received</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email || "Not Provided"}</p>
                <p><b>Contact:</b> ${contact}</p>
                <p><b>Enquiry:</b> ${enquiry}</p>
                <p><b>Remark:</b> ${remark || "No Remark"}</p>
            `,
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

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
            success: true,
            data: enquiries,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

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
            success: false,
            error: error.message
        });

    }
};