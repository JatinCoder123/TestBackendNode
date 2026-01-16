import express from "express";
import { authCandidate } from "../middlewares/auth.middleware.js";
import { getCurrentRoundQuestions, handleAddQuestion, handleDeleteQuestion, handleGetQuestions, handleUpdateQuestion } from "../controllers/questions.controllers.js";
const router = express.Router();

router.get("/get_questions", handleGetQuestions);
router.post("/add_question", handleAddQuestion);
router.put("/update_question", handleUpdateQuestion);
router.delete("/delete_question", handleDeleteQuestion);
router.get("/get", authCandidate, getCurrentRoundQuestions);
export default router;

