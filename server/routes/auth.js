import express from "express";
import { login } from "../controllers/auth.js";
import { newsletterEmail } from "../controllers/mailer.js";

const router = express.Router()

router.post("/login", login);
router.post("/email", newsletterEmail);

export default router;