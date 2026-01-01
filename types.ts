
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface User {
  username: string;
  email: string;
}

export type View = 'login' | 'signup' | 'quiz' | 'result';
