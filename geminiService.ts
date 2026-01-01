
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "./types";

// Always use the process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchReactQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 5 challenging React JS interview questions for a hackathon quiz.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["question", "options", "correctAnswer", "explanation"],
          },
        },
      },
    });

    const jsonStr = response.text?.trim() || "[]";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Fallback static questions if API fails
    return [
      {
        question: "What is the purpose of useEffect hook in React?",
        options: ["Manage state", "Perform side effects", "Direct DOM manipulation", "Context creation"],
        correctAnswer: "Perform side effects",
        explanation: "useEffect allows you to synchronize a component with an external system."
      },
      {
        question: "Which hook is used to access the previous value of a prop or state?",
        options: ["useRef", "useMemo", "usePrevious", "useState"],
        correctAnswer: "useRef",
        explanation: "useRef can store values across renders without triggering a re-render."
      },
      {
        question: "What does the 'virtual DOM' refer to in React?",
        options: ["A direct copy of the HTML", "A server-side rendering tool", "A lightweight representation of the real DOM in memory", "The shadow DOM"],
        correctAnswer: "A lightweight representation of the real DOM in memory",
        explanation: "React uses it to batch updates efficiently."
      },
      {
        question: "How do you pass data from a child component to its parent?",
        options: ["Using Redux only", "Via callbacks/functions passed as props", "Using context", "Children cannot pass data to parents"],
        correctAnswer: "Via callbacks/functions passed as props",
        explanation: "This is a standard pattern for lifting state up."
      },
      {
        question: "What is React.memo() used for?",
        options: ["State management", "Component memoization to prevent unnecessary re-renders", "Memory management", "Caching API results"],
        correctAnswer: "Component memoization to prevent unnecessary re-renders",
        explanation: "It performs a shallow comparison of props."
      }
    ];
  }
};
