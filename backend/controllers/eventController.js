import Event from "../models/Event.js";

// ➕ CREATE
export const createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const image = req.file ? req.file.filename : null;

        const event = new Event({
            title,
            description,
            date,
            image
        });

        await event.save();

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📄 GET ALL (Pagination)
export const getAllEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const total = await Event.countDocuments();

        const events = await Event.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: events,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✏️ UPDATE
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;

        let updateData = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedEvent);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ DELETE
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};