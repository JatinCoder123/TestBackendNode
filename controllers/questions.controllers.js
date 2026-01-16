import { aptiQuestionPrompt, dsaQuestionPrompt, roleQuestionPrompt } from "../assets/prompts.js"
import pool from "../config/db.js"
import { generateQuestions } from "../services/AiService.js"
import getShuffledQuestion, { getSavedQuestions } from "../utils/questions.js"

export const handleGetQuestions = async (req, res) => {
    try {
        const { type } = req.query
        if (!type) {
            return res.status(400).json({ success: false, message: "Type is required" });
        }
        const questions = await getSavedQuestions(type)
        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

}
export const handleAddQuestion = async (req, res) => {
    try {
        const { type } = req.query
        if (!type) {
            return res.status(400).json({ success: false, message: "Type is required" });
        }
        const { role_id, question, options, answer } = req.body
        if (!question || !options || !answer) {
            return res.status(400).json({ success: false, message: "Question, options and answer are required" });
        }
        if (type == "apti") {
            await pool.query("INSERT INTO apti_questions SET ?", [req.body]);
        }
        else if (type == "dsa") {
            await pool.query("INSERT INTO dsa_questions SET ?", [req.body]);
        }
        else {
            if (!role_id) {
                return res.status(400).json({ success: false, message: "Role id is required" });
            }
            await pool.query("INSERT INTO role_questions SET ?", [req.body]);
        }
        res.status(200).json({ success: true, message: "Question added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const handleUpdateQuestion = async (req, res) => {
    try {
        const { type, id } = req.query
        if (!type || !id) {
            return res.status(400).json({ success: false, message: "Type and id are required" });
        }
        let question;
        if (type == "apti") {
            [question] = await pool.query("UPDATE apti_questions SET ? WHERE id = ?", [req.body, id]);
        }
        else if (type == "dsa") {
            [question] = await pool.query("UPDATE dsa_questions SET ? WHERE id = ?", [req.body, id]);
        }
        else {
            [question] = await pool.query("UPDATE role_questions SET ? WHERE id = ?", [req.body, id]);
        }
        if (question.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Question not found" });
        }
        res.status(200).json({ success: true, message: "Question updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const handleDeleteQuestion = async (req, res) => {
    try {
        const { type, id } = req.query
        if (!type || !id) {
            return res.status(400).json({ success: false, message: "Type and id are required" });
        }
        let question;
        if (type == "apti") {
            [question] = await pool.query("DELETE FROM apti_questions WHERE id = ?", [id]);
        }
        else if (type == "dsa") {
            [question] = await pool.query("DELETE FROM dsa_questions WHERE id = ?", [id]);
        }
        else {
            [question] = await pool.query("DELETE FROM role_questions WHERE id = ?", [id]);
        }
        if (question.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }
        res.status(200).json({
            success: true, message: "Question deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getCurrentRoundQuestions = async (req, res) => {
    try {
        const { id } = req.user
        const [candidate] = await pool.query(
            "SELECT * FROM candidates WHERE id = ? LIMIT 1",
            [id]
        );
        if (!candidate.length) {
            return res.status(404).json({ success: false, message: "Candidate not found" });
        }
        const { current_round, experience, is_dsa, role_id, skills } = candidate[0]
        let questions = []

        if (current_round == 1) {
            try {
                questions = await generateQuestions(aptiQuestionPrompt())
            } catch (error) {
                const aptiQuestions = await getSavedQuestions("apti")
                questions = getShuffledQuestion(aptiQuestions, 20)
            }
        } else {
            const [role] = await pool.query(
                "SELECT * FROM roles WHERE id = ? LIMIT 1",
                [role_id]
            );
            if (!role.length) {
                return res.status(404).json({ success: false, message: "Role not found" });
            }
            try {
                const { title, dsa_level } = role[0]
                if (current_round == 2) {
                    questions = await generateQuestions(roleQuestionPrompt(title, experience, skills))
                }
                else if (current_round == 3 && is_dsa) {
                    questions = await generateQuestions(dsaQuestionPrompt(dsa_level, experience))
                }
            } catch (error) {
                if (current_round == 2) {
                    const roleQuestions = await getSavedQuestions(role_id)
                    questions = getShuffledQuestion(roleQuestions, 20)
                }
                else if (current_round == 3 && is_dsa) {
                    const dsaQuestions = await getSavedQuestions("dsa")
                    questions = getShuffledQuestion(dsaQuestions, 20)
                }
            }
        }
        res.status(200).json({ success: true, data: questions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
