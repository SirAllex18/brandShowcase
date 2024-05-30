import express from "express";
import { FileInsert, getAllNews } from "../controllers/NewsInsert.js";

const router = express.Router()

router.post("/fileInsert", FileInsert );
router.get("/getAllNews", getAllNews )

export default router;