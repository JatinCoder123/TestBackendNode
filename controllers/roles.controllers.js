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

        // ✅ Validation
        if (!title || !role_skills) {
            return res.status(400).json({
                success: false,
                error: "Title and role_skills are required",
            });
        }

        // ✅ Convert array → JSON string
        const skillsJSON = JSON.stringify(role_skills);

        const [result] = await pool.query(
            "INSERT INTO roles (title, dsa_level, role_skills) VALUES (?, ?, ?)",
            [title, dsa_level || null, skillsJSON]
        );

        res.json({
            success: true,
            message: "Role created successfully",
            roleId: result.insertId,
        });

    } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create role",
        });
    }
};
export const handleUpdateRole = async (req, res) => {
    try {
        const { id } = req.query; // ✅ FIXED (not query)
        const { title, dsa_level, role_skills } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "Role ID is required",
            });
        }

        // ✅ Build dynamic update object safely
        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (dsa_level !== undefined) updateData.dsa_level = dsa_level;

        if (role_skills !== undefined) {
            updateData.role_skills = JSON.stringify(role_skills); // 🔥 IMPORTANT
        }

        const [result] = await pool.query(
            "UPDATE roles SET ? WHERE id = ?",
            [updateData, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: "Role not found",
            });
        }

        res.json({
            success: true,
            message: "Role updated successfully",
        });

    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update role",
        });
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
