import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummary = async (tasks) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Summarize these pending tasks in a meaningful way:\n${tasks
      .map(t => `- ${t.title}: ${t.description}`)
      .join('\n')}\n\nSummary:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate summary");
  }
};