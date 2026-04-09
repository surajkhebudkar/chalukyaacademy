import multer from "multer";
import path from "path";
import fs from "fs";

const createStorage = (folderName) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = `uploads/${folderName}`;
            fs.mkdirSync(folder, { recursive: true });
            cb(null, folder);
        },
        filename: function (req, file, cb) {
            const uniqueName = Date.now() + path.extname(file.originalname);
            cb(null, uniqueName);
        }
    });
};

export const uploadNews = multer({
    storage: createStorage("news"),
});

export const uploadEvents = multer({
    storage: createStorage("events"),
});