import News from "../models/News.js";

// ➕ Create News
export const createNews = async (req, res) => {
    try {
        const { title, description } = req.body;

        const news = new News({
            title,
            description,
            image: req.file ? req.file.path : ""
        });

        await news.save();

        res.status(201).json({
            success: true,
            message: "News created successfully",
            data: news
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📥 Get All News
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: news
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✏️ Update News
export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;

        let updateData = {
            title: req.body.title,
            description: req.body.description
        };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const news = await News.findByIdAndUpdate(id, updateData, { new: true });

        res.json({
            success: true,
            message: "News updated successfully",
            data: news
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ Delete News
export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        await News.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "News deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};