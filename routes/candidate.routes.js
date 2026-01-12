import express from "express";
import { handleDeleteCandidate, handleGetCandidates, handleGetCandidate, handleLogout, handleRegister, handleUpdateCandidate } from "../controllers/candidate.controllers.js";
import { authCandidate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", handleRegister);
router.get("/logout", handleLogout);
router.get("/get_candidates", handleGetCandidates);
router.get("/get", authCandidate, handleGetCandidate);
router.put("/update_candidate", authCandidate, handleUpdateCandidate);
router.delete("/delete_candidate", authCandidate, handleDeleteCandidate);

export default router;
