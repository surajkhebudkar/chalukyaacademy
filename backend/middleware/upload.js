import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "uploads/sports/";

        if (file.fieldname === "branchImage") {
            folder += "branches";
        } else if (file.fieldname === "sportImages") {
            folder += "branchsports";
        } else if (file.fieldname === "coachPhotos") {
            folder += "coaches";
        } else {
            folder += "others";
        }

        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

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

export const uploadSports = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// =========================
//  NEWS
// =========================
export const uploadNews = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = "uploads/news";
            fs.mkdirSync(folder, { recursive: true });
            cb(null, folder);
        },
        filename: (req, file, cb) =>
            cb(null, Date.now() + path.extname(file.originalname))
    })
});

// =========================
//  EVENTS
// =========================
export const uploadEvents = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = "uploads/events";
            fs.mkdirSync(folder, { recursive: true });
            cb(null, folder);
        },
        filename: (req, file, cb) =>
            cb(null, Date.now() + path.extname(file.originalname))
    })
});


// =========================
//  PHOTO GALLERY
// =========================
export const uploadGallery = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let folderName = req.body.title;

            if (!folderName) {
                return cb(new Error("Album title is required"), false);
            }

            // convert to kebab-case
            folderName = folderName
                .toLowerCase()
                .replace(/\s+/g, "-");

            const basePath = `uploads/gallery/${folderName}`;

            fs.mkdirSync(basePath, { recursive: true });

            cb(null, basePath);
        },

        filename: function (req, file, cb) {
            if (file.fieldname === "coverImage") {
                cb(null, "cover" + path.extname(file.originalname));
            } else if (file.fieldname === "photos") {
                const unique =
                    Date.now() +
                    "-" +
                    Math.round(Math.random() * 1e9);
                cb(null, unique + path.extname(file.originalname));
            }
        }
    }),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});


// =========================
//  VIDEO GALLERY
// =========================

export const uploadVideo = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = "uploads/videos";
            fs.mkdirSync(folder, { recursive: true });
            cb(null, folder);
        },
        filename: (req, file, cb) =>
            cb(null, Date.now() + "-" + file.originalname)
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("video")) {
            cb(null, true);
        } else {
            cb(new Error("Only video allowed"), false);
        }
    }
});