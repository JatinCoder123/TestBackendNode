import pool from "../config/db.js";

export const handleGetRoles = async (req, res) => {
    try {
        const [roles] = await pool.query("SELECT * FROM roles");
        res.json({ success: true, message: "Roles fetched successfully", roles });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ success: false, error: "Failed to fetch roles" });
    }
};
export const handleCreateRole = async (req, res) => {
    try {
        const { title, dsa_level, role_skills } = req.body;
        const [role] = await pool.query("INSERT INTO roles (title, dsa_level, role_skills) VALUES (?, ?, ?)", [title, dsa_level, role_skills]);
        if (role.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Role not found" });
        }
        res.json({ success: true, message: "Role created successfully" });
    } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({ success: false, error: "Failed to create role" });
    }
};
export const handleUpdateRole = async (req, res) => {
    try {
        const [role] = await pool.query("UPDATE roles SET ? WHERE id = ?", [req.body, req.query.id]);
        if (role.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Role not found" });
        }
        res.json({ success: true, message: "Role updated successfully" });
    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ success: false, error: "Failed to update role" });
    }
};
export const handleDeleteRole = async (req, res) => {
    try {
        const { id } = req.query;

        const [result] = await pool.query(
            "DELETE FROM roles WHERE id = ?",
            [id] // ✅ MUST be array
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        res.json({
            success: true,
            message: "Role deleted successfully"
        });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
