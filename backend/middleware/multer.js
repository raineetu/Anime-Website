import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the 'uploads' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extname) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    },
}).single('profilePicture'); // Ensure the field name matches what the frontend sends
