import { getMatchDay } from "../controllers/MatchCard.js";
import express from "express";


const router = express.Router()

router.get("/getMatchDay", getMatchDay )

export default router;