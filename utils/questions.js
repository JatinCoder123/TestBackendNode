import pool from "../config/db.js";


export default function getShuffledQuestion(questions, count) {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled.slice(0, count);
}



export async function getSavedQuestions(type) {
    try {
        let questions = []
        if (type == "apti") {
            const [aptiQuestions] = await pool.query("SELECT * FROM apti_questions");
            questions = aptiQuestions;
        }
        else if (type == "dsa") {
            const [dsaQuestions] = await pool.query("SELECT * FROM dsa_questions");
            questions = dsaQuestions;
        }
        else {
            const [roleQuestions] = await pool.query("SELECT * FROM role_questions WHERE role_id = ?", [type]);
            questions = roleQuestions
        }
        return questions;
    } catch (error) {
        console.error("Error reading aptitude questions:", error.message);
        throw error;
    }
}


