import { Request} from "express";
import multer, { FileFilterCallback } from "multer";
import path from 'path';
import { fileURLToPath } from "url";
import { AppError } from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../uploads/elements_images"));
  },
  filename: (req, file, callback) => {
    const newFileName = Date.now() + "-" + Math.round(Math.random()*1e9);
    const extension = path.extname(file.originalname);
    callback(null, `${newFileName}${extension}`);
  }
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new AppError(
      422,
      'filed filter in upload image middleware failed : only images are accepted, bad MIME Type',
      "Seules les images sont acceptées comme fichier."
    ))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 Mo max for file size
});