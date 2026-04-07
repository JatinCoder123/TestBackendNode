import express from "express";
import { handleLogin, handleLogout, handleGetAdmin } from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/login", handleLogin);
router.get("/logout", handleLogout);
router.get("/get", handleGetAdmin);

export default router;
