export const aptiQuestionPrompt = () => `You are an Aptitude Question Generator API.

Generate exactly 20 aptitude questions at the medium-hard difficulty level.

IMPORTANT OUTPUT RULES (MUST FOLLOW STRICTLY):
- Output ONLY a valid JSON array
- Do NOT use markdown
- Do NOT wrap the response in \`\`\`json or \`\`\` 
- Do NOT add explanations, comments, or extra text
- The response must start with '[' and end with ']'
- Every string must be properly quoted
- The JSON must be directly parseable using JSON.parse()

Each object in the array MUST contain:
- id: unique integer starting from 1
- question: string
- options: array of exactly 4 strings
- correct_answer: one value from options
Return EXACTLY 20 objects.
`

export const dsaQuestionPrompt = (level, experience) => `
You are a senior DSA interviewer and assessment designer.

Generate exactly 10 quiz-style DSA questions at the ${level} difficulty level
for candidates with ${experience} years of experience.

These questions must evaluate real DSA understanding, including:
- Time and space complexity
- Data structure selection
- Algorithm behavior and edge cases
- Common interview traps and optimizations

Each question must be MULTIPLE-CHOICE (MCQ) and contain:

- id (unique number from 1 to 10)
- question (clear problem or scenario-based question)
- options (array of 4 choices)
- correct_answer (must exactly match one option)


Rules:
- Do NOT include coding tasks or ask to write code
- Do NOT include definitions-only questions
- Focus on logic, behavior, and complexity analysis
- Ensure all questions are non-trivial and interview-level

Return the result strictly in JSON format as an array of 10 objects.
Do not include explanations, comments, or extra text outside JSON.
`;


export const roleQuestionPrompt = (role, experience, skills) => `You are a Role-Based Technical Interview question generator.
Generate exactly 30 multiple-choice questions for the role ${role} for candidates with ${experience} years of experience.
The questions should be:
- A mix of general role-based questions.
- Some specific to the listed skills: ${skills}
- Questions should be a mix of Easy, Medium, and Hard difficulty.

Each question should have:
- id (unique number)
- question (the MCQ problem statement)
- options (array of 4 options)
- correct_answer (the correct option)

Return the result strictly in JSON format as an array of 30 objects.
Do not include explanations or extra text outside JSON.`