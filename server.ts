/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON parsing middleware
app.use(express.json());

// Lazy-initialized Gemini Client to prevent crash if key is missing on backend startup
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is missing or has placeholder value. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const coursesCatalog: Record<string, { num: string; title: string; desc: string }> = {
  phil101: { num: "PHIL 101", title: "Introduction to Philosophy", desc: "A survey of the fundamental problems of philosophy — knowledge, reality, mind, and the good life." },
  phil101h: { num: "PHIL 101H", title: "Honors Intro to Philosophy", desc: "An accelerated honors section engaging primary texts and advanced seminar-style discussion of core philosophical problems." },
  phil103: { num: "PHIL 103", title: "Ethics & Society", desc: "Examination of ethical theory and its application to contemporary moral and social issues." },
  phil105: { num: "PHIL 105", title: "Critical Thinking", desc: "Principles of reasoning, argument analysis, informal fallacies, and the evaluation of evidence in everyday contexts." },
  phil106: { num: "PHIL 106", title: "Symbolic Logic", desc: "Formal systems of propositional and predicate logic, proofs, and the foundations of mathematical reasoning." },
  phil107: { num: "PHIL 107", title: "Philosophy of Religion", desc: "Arguments for and against the existence of God, faith and reason, religious experience, and the problem of evil." },
  phil111: { num: "PHIL 111", title: "Ancient & Medieval Philosophy", desc: "From the Pre-Socratics and Plato through Aristotle to Augustine, Aquinas, and the Scholastics." },
  phil112: { num: "PHIL 112", title: "Modern Philosophy", desc: "Descartes, Locke, Hume, Kant, and the rise of modern epistemology, metaphysics, and moral philosophy." },
  phil117: { num: "PHIL 117", title: "Political Philosophy", desc: "Justice, liberty, democracy, authority, and rights from Hobbes and Rousseau to Rawls and contemporary debate." },
  phil374: { num: "PHIL 374", title: "Medical Ethics", desc: "Ethical frameworks applied to healthcare — autonomy, informed consent, end-of-life care, resource allocation, and bioethics." }
};

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API: Socratic Chat Companion
app.post("/api/socratic-chat", async (req, res) => {
  try {
    const { courseId, message, history = [] } = req.body;

    if (!courseId || !message) {
      res.status(400).json({ error: "Missing courseId or message parameter" });
      return;
    }

    const course = coursesCatalog[courseId] || { num: "PHIL General", title: "General Philosophy Study", desc: "Philosophical inquiry, reasoning, and conceptual analysis." };
    const ai = getAiClient();

    // Prepare system instruction
    const systemInstruction = `You are Prof. Felipe Leon, a dedicated and insightful Philosophy Professor at El Camino College.
You have a profound, stimulating, and encouraging Socratic teaching style to guide college-level students.
Your course context is "${course.num}: ${course.title}" which focuses on: "${course.desc}".

Follow these strictly as Prof. Leon:
1. Speak warmly, respectfully, and Socratic-ally. Invite active reasoning instead of writing overly long, heavy info-dumps off the bat.
2. Ask 1 short, stimulating follow-up question per message that encourages original reflection on the student's part.
3. Keep responses relatively concise (2-3 short, clean paragraphs maximum) and highly legible. 
4. If a student is stuck or confused, illustrate the concepts using concrete analogies, common scenarios, or famous thought experiments (e.g., Plato's Cave, Nozick's Experience Machine, Judith Thomson's violinist, or basic truth table validations), then prompt them to apply the concept themselves.
5. Embody intellectual curiosity and philosophical precision. Do not break character. Do not use robotic boilerplate. Refer to "El Camino College" or "our department" occasionally if highly relevant.`;

    // Format chat history for `@google/genai` Chat API if applicable OR translate to plain contents array.
    // Let's pass a structured instructions and conversational history in the contents parameter.
    const contents: any[] = [];
    
    // Add past history conversation
    history.forEach((h: { role: 'user' | 'assistant', content: string }) => {
      contents.push({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      });
    });

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Socratic API Error:", error);
    res.status(500).json({ error: error.message || "An internal error occurred on the Socratic teaching backend." });
  }
});

// API: AI Philosophy Quiz Generator
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      res.status(400).json({ error: "Missing topic parameter" });
      return;
    }

    const ai = getAiClient();
    const prompt = `Generate a highly engaging, educational Philosophy multiple-choice self-assessment quiz on the topic: "${topic}".
The quiz must consist of exactly 5 rigorous, diverse multiple-choice questions suitable for an undergraduate philosophy student at El Camino College.
Each question must include 4 options, a correct answer index (0, 1, 2, or 3), and a clear, constructive, and highly detailed Socratic explanation that teaches the concept deeply.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert philosophy professor and curriculum developer. Create flawless, clear, and high-quality assessments.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The title of the custom-generated philosophy assessment (e.g., 'Epistemology & Skepticism Quiz')"
            },
            topic: {
              type: Type.STRING,
              description: "The topic being assessed"
            },
            questions: {
              type: Type.ARRAY,
              description: "The list of 5 multiple choice questions",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: "The deep, conceptual question text"
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Broad list of 4 distinct logical answer choices"
                  },
                  answerIndex: {
                    type: Type.INTEGER,
                    description: "Unbiased 0-based index of the single correct answer option (0 to 3)"
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "An elegant, comprehensive Socratic explanation of why that correct answer holds, clarifying any common student misunderstandings or explaining the specific philosophers referenced."
                  }
                },
                required: ["question", "options", "answerIndex", "explanation"]
              }
            }
          },
          required: ["title", "topic", "questions"]
        }
      }
    });

    // Make sure we have the response text
    const textData = response.text || "{}";
    const quizResponse = JSON.parse(textData);
    res.json(quizResponse);
  } catch (error: any) {
    console.error("Quiz Generator API Error:", error);
    res.status(500).json({ error: error.message || "An internal error occurred on the Quiz generation backend." });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Prof. Felipe Leon's Course Portal running on port ${PORT}`);
  });
}

startServer();
