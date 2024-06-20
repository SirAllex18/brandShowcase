import express from "express";
import { addTrophies, getAllTrophies, getTrophiesByCompetition } from "../controllers/Trophies.js"; 

const router = express.Router()

router.post("/addTrophies", addTrophies );
router.get("/getTrophies", getAllTrophies );
router.post("/getTrophiesCompetition", getTrophiesByCompetition)

export default router;