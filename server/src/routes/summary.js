import express from 'express';
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

router.post('/summarize-pending', async (req, res) => {
  try {
    const pendingTasks = req.body.tasks;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Summarize the following pending tasks:\n\n${pendingTasks
      .map((t, i) => `${i + 1}. ${t.title}: ${t.description || ''}`)
      .join('\n')}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ summary: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to summarize tasks' });
  }
});

export default router;