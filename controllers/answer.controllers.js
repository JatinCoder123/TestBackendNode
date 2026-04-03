import pool from "../config/db.js";

export const handleSendAnswer = async (req, res) => {
    try {
        const { id: candidate_id } = req.user;
        const { round, answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                message: "Answers must be an array"
            });
        }

        // ✅ Convert to JSON string (MySQL JSON)
        const jsonAnswers = JSON.stringify(answers);

        // ✅ Check if candidate row exists
        const [existing] = await pool.query(
            "SELECT candidate_id FROM answer WHERE candidate_id = ?",
            [candidate_id]
        );

        if (existing.length === 0) {
            // 🔥 INSERT
            await pool.query(
                `INSERT INTO answer (candidate_id, round${round})
                 VALUES (?, ?)`,
                [candidate_id, jsonAnswers]
            );
        } else {
            // 🔥 UPDATE specific round column
            await pool.query(
                `UPDATE answer 
                 SET round${round} = ?
                 WHERE candidate_id = ?`,
                [jsonAnswers, candidate_id]
            );
        }

        res.status(200).json({
            success: true,
            message: "Answer saved successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};