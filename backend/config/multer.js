import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/news");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// File filter (only images)
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