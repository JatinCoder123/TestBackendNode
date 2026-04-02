import axios from "axios";

export const generateQuestions = async (prompt) => {
    try {
        const seed = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        const response = await axios.post(
            process.env.GPT4_API_URL, // ✅ KEEP chat/completions
            {
                messages: [
                    {
                        role: "system",
                        content: `
You are an API that returns ONLY valid raw JSON.
Do NOT wrap output in quotes or markdown.
Generate completely NEW and UNIQUE questions.
Do NOT repeat common or known aptitude questions.
Randomness seed: ${seed}
`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.85,
                max_completion_tokens: 5000   // ✅ SAME AS PHP
            },
            {
                headers: {
                    "api-key": process.env.GPT4_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        /* ✅ SAME RESPONSE STRUCTURE AS PHP */
        const rawOutput = response.data.choices[0].message.content;

        const parsedOutput = safeJsonParse(rawOutput);

        /* ✅ FIX FIELD MISMATCH */
        const normalized = parsedOutput.map((q) => ({
            ...q,
            answer: q.correct_answer
        }));

        return normalized;

    } catch (error) {
        console.error("AI ERROR:", error?.response?.data || error.message);
        throw error;
    }
};

function safeJsonParse(text) {
    try {
        return JSON.parse(text);
    } catch (err) {
        const arrayMatch = text.match(/\[[\s\S]*\]/);
        if (arrayMatch) return JSON.parse(arrayMatch[0]);

        const objectMatch = text.match(/\{[\s\S]*\}/);
        if (objectMatch) return JSON.parse(objectMatch[0]);

        throw new Error("Invalid JSON returned by AI");
    }
}