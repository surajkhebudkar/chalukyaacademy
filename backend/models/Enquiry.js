import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    contact: { type: String, required: true },
    enquiry: { type: String, required: true },
    remark: { type: String },
}, { timestamps: true });

export default mongoose.model("Enquiry", enquirySchema);