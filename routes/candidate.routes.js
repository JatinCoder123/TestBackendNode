import express from "express";
import { handleDeleteCandidate, handleGetCandidates, handleGetCandidate, handleLogout, handleRegister, handleUpdateCandidate, handleRuleBreak } from "../controllers/candidate.controllers.js";
import { authCandidate } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", handleRegister);
router.get("/logout", handleLogout);
router.get("/get_candidates", handleGetCandidates);
router.get("/get", authCandidate, handleGetCandidate);
router.put("/update_candidate", authCandidate, handleUpdateCandidate);
router.delete("/delete_candidate", handleDeleteCandidate);
router.post("/rule_break", authCandidate, handleRuleBreak);

export default router;
