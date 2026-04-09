import Event from "../models/Event.js";

// ➕ CREATE
export const createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        const event = new Event({
            title,
            description,
            date,
            image: req.file ? req.file.filename : null
        });

        await event.save();

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📄 GET
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

        res.json({
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

        const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ DELETE
export const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};