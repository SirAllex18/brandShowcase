import express from "express";
import { findPlayersByPosition, getAllPlayers } from "../controllers/Players.js";

const router = express.Router()

router.post("/playerByPosition", findPlayersByPosition );
router.get("/getAllPlayers", getAllPlayers )

export default router;