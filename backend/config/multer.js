import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.baseUrl.includes("events")
            ? "uploads/events"
            : "uploads/news";

        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;