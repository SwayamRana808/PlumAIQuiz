import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface FeedbackQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number;
}

interface UserQuizFeedbackRequest {
  questions: FeedbackQuestion[];
  score: number;
}

/**
 * Generates custom feedback based on user's answers and score
 */
async function generateFeedback(data: UserQuizFeedbackRequest): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are an expert quiz evaluator.
        A user completed a quiz with the following questions, options, correct answers, and their selected answers:
        
        ${JSON.stringify(data.questions, null, 2)}
        
        The user's score is ${data.score} out of ${data.questions.length}.
        
        Provide a detailed, friendly, motivational feedback message for the user.
        Return only the feedback text, no JSON, no extra commentary.
      `,
    });

    const rawText = response.text ?? '';
    return rawText.trim();
  } catch (error) {
    console.error('Error generating feedback with Gemini:', error);
    return 'Unable to generate feedback at this time. Keep practicing!';
  }
}

export default generateFeedback;
