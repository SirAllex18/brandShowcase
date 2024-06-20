import express from "express";
import { deleteUser, login } from "../controllers/auth.js";
import { newsletterEmail } from "../controllers/mailer.js";

const router = express.Router()

router.post("/login", login);
router.post("/email", newsletterEmail);
router.post("/deleteUser", deleteUser)

export default router;