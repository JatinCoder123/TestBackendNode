import pool from "../config/db.js";
import { generateToken } from "../utils/jwt.js";

export const handleRegister = async (req, res) => {
    try {
        const {
            email,
            first_name,
            last_name,
            role_id,
            experience,
            skills,
            is_dsa
        } = req.body;

        /* 1️⃣ VALIDATION */
        if (!email || !first_name || !role_id || !experience || !skills || !is_dsa) {
            return res.status(400).json({
                success: false,
                error: "All fields except lastName are required"
            });
        }



        /* 2️⃣ CHECK IF USER EXISTS */
        const [existingUser] = await pool.query(
            "SELECT id FROM candidates WHERE email = ? LIMIT 1",
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                error: "User already exists"
            });
        }

        /* 3️⃣ INSERT CANDIDATE */
        const [insertResult] = await pool.query(
            `INSERT INTO candidates
      (email, first_name, last_name, role_id,is_dsa, experience, skills)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                email,
                first_name,
                last_name || null,
                role_id,
                is_dsa,
                experience,
                JSON.stringify(skills)
            ]
        );

        const candidateId = insertResult.insertId;
        const token = generateToken({ id: candidateId, email });
        res.cookie("token", token, {
            httpOnly: true,        // JS can't access
            secure: process.env.NODE_ENV === "production", // HTTPS only in prod
            sameSite: "strict",    // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({
            success: true,
            message: "Candidate registered successfully",
            candidate_id: candidateId
        });

    } catch (error) {
        console.error("Error registering candidate:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                error: "User already exists"
            });
        }

        res.status(500).json({
            success: false,
            error: "Failed to register candidate"
        });
    }
};

export const handleLogout = async (req, res) => {
    try {
        res.json({ message: "Candidate logged out successfully" });
    } catch (error) {
        console.error("Error logging out candidate:", error);
        res.status(500).json({ error: "Failed to log out candidate" });
    }
};
export const handleGetCandidates = async (req, res) => {
    try {
        const { id } = req.query;
        if (id) {
            const [candidate] = await pool.query(
                "SELECT * FROM candidates WHERE id = ? LIMIT 1",
                [id]
            );
            res.json({ message: "Candidate fetched successfully", candidate });
            return;
        }
        const [candidates] = await pool.query(
            "SELECT * FROM candidates"
        );
        res.json({ message: "Candidates fetched successfully", candidates });
    } catch (error) {
        console.error("Error fetching candidates:", error);
        res.status(500).json({ error: "Failed to fetch candidates" });
    }
};
export const handleGetCandidate = async (req, res) => {
    try {
        const { id } = req.user;
        const [candidate] = await pool.query(
            "SELECT * FROM candidates WHERE id = ? LIMIT 1",
            [id]
        );
        res.json({ message: "Candidate fetched successfully", candidate });
    } catch (error) {
        console.error("Error fetching candidate:", error);
        res.status(500).json({ error: "Failed to fetch candidate" });
    }
};
export const handleUpdateCandidate = async (req, res) => {
    try {
        res.json({ message: "Candidate updated successfully" });
    } catch (error) {
        console.error("Error updating candidate:", error);
        res.status(500).json({ error: "Failed to update candidate" });
    }
};
export const handleDeleteCandidate = async (req, res) => {
    try {
        res.json({ message: "Candidate deleted successfully" });
    } catch (error) {
        console.error("Error deleting candidate:", error);
        res.status(500).json({ error: "Failed to delete candidate" });
    }
};
