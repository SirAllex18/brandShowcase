import express from "express";
import { FileInsert } from "../controllers/NewsInsert.js";

const router = express.Router()

router.post("/fileInsert", FileInsert);

export default router;