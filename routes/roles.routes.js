import express from "express";
import { handleCreateRole, handleDeleteRole, handleGetRoles, handleUpdateRole } from "../controllers/roles.controllers.js";
const router = express.Router();

router.get("/get_roles", handleGetRoles);
router.post("/create_role", handleCreateRole);
router.put("/update_role", handleUpdateRole);
router.delete("/delete_role", handleDeleteRole);

export default router;
