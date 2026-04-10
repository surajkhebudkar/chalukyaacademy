import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ COMMON STORAGE CREATOR
const createStorage = (folderName) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = `uploads/${folderName}`;
            fs.mkdirSync(folder, { recursive: true });
            cb(null, folder);
        },
        filename: function (req, file, cb) {
            const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)
                + path.extname(file.originalname);
            cb(null, uniqueName);
        }
    });
};

// ✅ FILE FILTER (ONLY IMAGES)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// ✅ COMMON OPTIONS
const createUpload = (folder) => multer({
    storage: createStorage(folder),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// ✅ EXPORTS
export const uploadNews = createUpload("news");
export const uploadEvents = createUpload("events");
export const uploadSports = createUpload("sports");