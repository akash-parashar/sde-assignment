export interface Question {
  id: string;
  text: string;
  type: 'rating' | 'text';
  maxRating?: number;
}

export interface Answer {
  questionId: string;
  value: string | number;
}

export interface Survey {
  sessionId: string;
  answers: Answer[];
  status: 'IN_PROGRESS' | 'COMPLETED';
  timestamp: number;
}