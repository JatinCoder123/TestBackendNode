import { aptiQuestionPrompt, dsaQuestionPrompt, roleQuestionPrompt } from "../assets/prompts.js"
import { generateQuestions } from "../services/AiService.js"

export const handleGetQuestions = (req, res) => { }
export const handleAddQuestion = (req, res) => { }
export const handleUpdateQuestion = (req, res) => { }
export const handleDeleteQuestion = (req, res) => { }
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
        const { curret_round, experience, is_dsa, role_id } = candidate[0]
        let questions = []

        try {
            if (curret_round === 1) {
                questions = await generateQuestions(aptiQuestionPrompt())
            } else {
                const role = await pool.query(
                    "SELECT * FROM roles WHERE id = ? LIMIT 1",
                    [role_id]
                );
                if (!role.length) {
                    return res.status(404).json({ success: false, message: "Role not found" });
                }
                const { title, dsa_level, role_skills } = role[0]
                if (curret_round === 2) {
                    questions = await generateQuestions(roleQuestionPrompt(title, experience, role_skills))
                }
                else if (curret_round === 3 && is_dsa) {
                    questions = await generateQuestions(dsaQuestionPrompt(dsa_level, experience))
                }
            }
            res.status(200).json({ success: true, data: questions });

        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
