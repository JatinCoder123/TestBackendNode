import express from "express";
import { authCandidate } from "../middlewares/auth.middleware.js";
import { getCurrentRoundQuestions, handleAddQuestion, handleDeleteQuestion, handleGetQuestions, handleUpdateQuestion } from "../controllers/questions.controllers.js";
const router = express.Router();

router.get("/get_questions/:type", handleGetQuestions);
router.post("/add_question/:type", handleAddQuestion);
router.put("/update_question/:type", handleUpdateQuestion);
router.delete("/delete_question/:type", handleDeleteQuestion);
router.get("/get_questions", authCandidate, getCurrentRoundQuestions);
export default router;

