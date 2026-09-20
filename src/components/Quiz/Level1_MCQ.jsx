import React, { useState, useEffect } from "react";
import { QUIZ_LEVELS } from "../../data/quizData";
import { sound } from "../../utils/audioEffects";
import { CheckCircle2, AlertCircle, ArrowRight, BookOpen } from "lucide-react";

export default function Level1_MCQ({ mode = "classical", onComplete }) {
  const allQuestions = QUIZ_LEVELS[0].questions;
  // Filter by mode
  const questions = allQuestions.filter(q => q.type === mode);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // Reset if mode changes
  useEffect(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
  }, [mode]);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return; // prevent multiple clicks
    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      sound.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Completed Level 1 for this track
      onComplete({
        level: 1,
        mode,
        score,
        total: questions.length,
        accuracy: Math.round((score / questions.length) * 100)
      });
    }
  };

  if (!currentQ) return null;

  return (
    <div className="space-y-6">
      {/* Progress & Score Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-mono">
        <span className="text-blue-600 font-bold">
          {mode === "classical" ? "💻 Classical Track" : "⚛️ Quantum Track"} • Question {currentIdx + 1} of {questions.length}
        </span>
        <span className="text-slate-700">
          Score: <strong className="text-emerald-600">{score}</strong> / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
        <h4 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {currentQ.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === currentQ.correct;

            let btnStyle = "bg-white border-slate-200 hover:border-blue-500 text-slate-800 shadow-xs";
            if (selectedOption !== null) {
              if (isCorrect) {
                btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-700 font-bold shadow-xs";
              } else if (isSelected) {
                btnStyle = "bg-rose-50 border-rose-500 text-rose-700 font-bold";
              } else {
                btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(i)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {selectedOption !== null && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {selectedOption !== null && isSelected && !isCorrect && (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* PPT Explanation Box */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-blue-800 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Curriculum Grounding:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question Button */}
        {selectedOption !== null && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>{currentIdx < questions.length - 1 ? "Next Question" : "Complete Level 1"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
