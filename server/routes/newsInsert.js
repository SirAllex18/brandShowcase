import express from "express";
import { FileInsert, deleteNews, getAllNews, updateNews } from "../controllers/NewsInsert.js";

const router = express.Router()

router.post("/fileInsert", FileInsert );
router.get("/getAllNews", getAllNews )
router.put("/deleteNews", deleteNews)
router.put("/updateNews", updateNews)

export default router;