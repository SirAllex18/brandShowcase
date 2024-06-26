import express from "express";
import { FileInsert, deleteNews, getAllNews, updateNews } from "../controllers/NewsInsert.js";
import multer from "multer";
import path from 'path';

const router = express.Router()
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/server-assets");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  
router.post("/fileInsert", upload.single('image'), FileInsert);
router.get("/getAllNews", getAllNews )
router.put("/deleteNews", deleteNews)
router.put("/updateNews", updateNews)

export default router;