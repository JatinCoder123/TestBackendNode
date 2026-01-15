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

export const dsaQuestionPrompt = (level, experience) => `You are a DSA (Data Structures and Algorithms) question generator.
Generate exactly 10 DSA questions at the ${level} difficulty level for candidates with ${experience} years of experience.

Each question should have:
- id (unique number)
- question (the problem statement)
- topic (like Arrays, Strings, Trees,  etc.)
- difficulty (Easy/Medium/Hard)
- example_input (a sample input)
- example_output (the expected output for the sample input)

Return the result strictly in JSON format as an array of 10 objects.
Do not include explanations or extra text outside JSON.`

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
- category (General or Skill-specific with skill name)
- difficulty (Easy/Medium/Hard)

Return the result strictly in JSON format as an array of 30 objects.
Do not include explanations or extra text outside JSON.`