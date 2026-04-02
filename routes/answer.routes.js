import express from "express";
import { authCandidate } from "../middlewares/auth.middleware.js";
import { handleSendAnswer } from "../controllers/answer.controllers.js";
const router = express.Router();

router.post("/submit", authCandidate, handleSendAnswer);
export default router;

