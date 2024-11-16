import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import { useSurvey } from './hooks/useSurvey';
import { RatingInput } from './components/RatingInput';
import { TextInput } from './components/TextInput';
import { ProgressBar } from './components/ProgressBar';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThanks, setShowThanks] = useState(false);
  const { currentSession, createNewSession, saveAnswer, completeSurvey } = useSurvey();

  const startSurvey = () => {
    createNewSession();
    setShowWelcome(false);
  };

  const getCurrentAnswer = () => {
    const question = questions[currentQuestionIndex];
    const answer = currentSession?.answers.find(a => a.questionId === question.id);
    return answer?.value ?? (question.type === 'rating' ? 0 : '');
  };

  const handleAnswer = (value: string | number) => {
    const question = questions[currentQuestionIndex];
    saveAnswer(question.id, value);
  };

  
  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the survey?')) {
      completeSurvey();
      setShowThanks(true);
      setTimeout(() => {
        setShowWelcome(true);
        setShowThanks(false);
        setCurrentQuestionIndex(0);
      }, 5000);
    }
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
          <div className="mb-6">
            <ShoppingBag className="w-16 h-16 text-blue-600 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our Store!
          </h1>
          <p className="text-gray-600 mb-8">
            We value your feedback. Please take a moment to complete our quick survey.
          </p>
          <button
            onClick={startSurvey}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold
              hover:bg-blue-700 transition-colors"
          >
            Start Survey
          </button>
        </div>
      </div>
    );
  }

  if (showThanks) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
          <div className="mb-6">
            <ShoppingBag className="w-16 h-16 text-green-600 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600">
            We appreciate your valuable feedback.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-blue-600 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.text}
          </h2>

          {currentQuestion.type === 'rating' && (
            <RatingInput
              maxRating={currentQuestion.maxRating!}
              value={getCurrentAnswer() as number}
              onChange={handleAnswer}
            />
          )}

          {currentQuestion.type === 'text' && (
            <TextInput
              value={getCurrentAnswer() as string}
              onChange={handleAnswer}
            />
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg
              ${currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-lg
                hover:bg-green-700 transition-colors"
            >
              Submit Survey
            </button>
          ) : (
            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                text-blue-600 hover:bg-blue-50"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;