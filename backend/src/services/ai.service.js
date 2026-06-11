import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_APIKEY
});

async function generateInterviewReport({ resume, jobDescription, selfDescription }) {

    const prompt = `You are an expert interview coach. Analyze the candidate's profile and generate a detailed interview report.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY a valid JSON object with EXACTLY these fields, nothing else:
{
    "matchScore": <number 0-100>,
    "title": "<job title string>",
    "technicalQusetion": [
        {
            "question": "<technical question>",
            "intention": "<why interviewer asks this>",
            "answer": "<how to answer this>"
        }
    ],
    "behaviourQuestion": [
        {
            "question": "<behavioral question>",
            "intention": "<why interviewer asks this>",
            "answer": "<how to answer this>"
        }
    ],
    "skillGaps": [
        {
            "skill": "<missing skill>",
            "severity": "<low|medium|high>"
        }
    ],
    "preparationPlan": [
        {
            "day": <day number>,
            "focus": "<focus area>",
            "tasks": ["<task 1>", "<task 2>"]
        }
    ]
}

Generate at least 5 technical questions, 5 behavioral questions, 3 skill gaps, and 5 day preparation plan.`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
    })

    console.log("RAW RESPONSE:", response.text)

    // JSON backticks hata do agar ho
    // ✅ Yeh replace karo
const cleanText = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

let parsed;
try {
    parsed = JSON.parse(cleanText)
} catch(err) {
    console.log("PARSE ERROR:", err)
    throw new Error("AI response parse nahi hua")
}

return parsed;
}

export default generateInterviewReport;