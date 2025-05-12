import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, '../public/companyLogos');


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const rawName = req.body.companyName;
        const cleanCompany = rawName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]/g, '');

    const ext = path.extname(file.originalname);
    const uniqueName = `${cleanCompany}${ext}`;
    const name = Date.now() + '-' + uniqueName;
    cb(null, name);
    },
    });
export const uploadFile = multer({
    storage: storageConfig,
});