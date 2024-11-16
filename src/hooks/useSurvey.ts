import { useState, useEffect } from 'react';
import { Survey, Answer } from '../types';

const STORAGE_KEY = 'customer_surveys';

export function useSurvey() {
  const [currentSession, setCurrentSession] = useState<Survey | null>(null);

  const createNewSession = () => {
    const session: Survey = {
      sessionId: `session_${Date.now()}`,
      answers: [],
      status: 'IN_PROGRESS',
      timestamp: Date.now()
    };
    
    const surveys = getSurveys();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...surveys, session]));
    setCurrentSession(session);
    return session;
  };

  const getSurveys = (): Survey[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveAnswer = (questionId: string, value: string | number) => {
    if (!currentSession) return;

    const surveys = getSurveys();
    const updatedSession = {
      ...currentSession,
      answers: [
        ...currentSession.answers.filter(a => a.questionId !== questionId),
        { questionId, value }
      ]
    };

    const updatedSurveys = surveys.map(s => 
      s.sessionId === currentSession.sessionId ? updatedSession : s
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSurveys));
    setCurrentSession(updatedSession);
  };

  const completeSurvey = () => {
    if (!currentSession) return;

    const surveys = getSurveys();
    const updatedSession = {
      ...currentSession,
      status: 'COMPLETED' as const
    };

    const updatedSurveys = surveys.map(s => 
      s.sessionId === currentSession.sessionId ? updatedSession : s
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSurveys));
    setCurrentSession(null);
  };

  return {
    currentSession,
    createNewSession,
    saveAnswer,
    completeSurvey
  };
}