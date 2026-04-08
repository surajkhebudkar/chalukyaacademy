import News from "../models/News.js";

// ➕ ADD
export const createNews = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const news = new News({ title, description, image });
        await news.save();

        res.status(201).json({
            success: true,
            message: "News created successfully",
            data: news,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📄 GET
export const getAllNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const total = await News.countDocuments();

        const news = await News.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            data: news,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✏️ UPDATE
export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;

        let updateData = {
            title: req.body.title,
            description: req.body.description,
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ DELETE
export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await News.findByIdAndDelete(id);
        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};