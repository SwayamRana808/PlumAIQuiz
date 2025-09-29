import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// Define the structure of a single question for TypeScript
interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // Index of the correct option
}

// Define the structure of the entire API response
interface Quiz {
  questions: QuizQuestion[];
}

/**
 * Utility: Extract clean JSON from a text that may contain ```json ... ```
 */
function extractJSON(text: string): any | null {
  try {
    const cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('JSON parse failed:', err);
    return null;
  }
}

/**
 * Generates multiple choice questions on a given topic using the Gemini API.
 * @param topic - The topic for the questions.
 * @returns A promise that resolves to the parsed JSON object with the questions.
 */
async function generateQuestions(topic: string): Promise<Quiz> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Generate 5 medium multiple choice questions about ${topic}.
        The "answer" should be the zero-based index of the correct option in the "options" array.
        Follow this JSON schema exactly:
        {
          "questions": [
            {
              "question": "string",
              "options": ["string", "string", "string", "string"],
              "answer": number
            }
          ]
        }
      `,
    });

    if (!response.text) throw new Error('AI response has no text');
    const rawText = response.text ?? '';
    let parsed = extractJSON(rawText);

    if (!parsed) {
      throw new Error('Unable to parse AI response into valid JSON.');
    }

    return parsed as Quiz;
  } catch (error) {
    console.error('Error generating questions with Gemini:', error);
    throw new Error('Failed to generate questions. Please try again later.');
  }
}

export default generateQuestions;
