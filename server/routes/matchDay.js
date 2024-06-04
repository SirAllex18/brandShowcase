import { getMatchDay } from "../controllers/MatchCard.js";
import express from "express";


const router = express.Router()

router.get("/getMatchDay/:flag", getMatchDay )

export default router;