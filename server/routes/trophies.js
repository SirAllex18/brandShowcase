import express from "express";
import { addTrophies, getAllTrophies } from "../controllers/Trophies.js"; 

const router = express.Router()

router.post("/addTrophies", addTrophies );
router.get("/getTrophies", getAllTrophies );


export default router;