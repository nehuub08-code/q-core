import React, { useState, useEffect } from "react";
import { QUIZ_LEVELS } from "../../data/quizData";
import { sound } from "../../utils/audioEffects";
import { CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";

export default function Level2_Match({ mode = "classical", onComplete }) {
  const allPairs = QUIZ_LEVELS[1].pairs;
  const pairsData = allPairs.filter(p => p.type === mode);

  const [selectedComponent, setSelectedComponent] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({});
  const [wrongAttempt, setWrongAttempt] = useState(null);
  const [definitions, setDefinitions] = useState([]);

  // Reset & re-scramble on mode change
  useEffect(() => {
    setSelectedComponent(null);
    setMatchedPairs({});
    setWrongAttempt(null);
    setDefinitions(
      [...pairsData]
        .map((p) => ({ id: p.id, match: p.match }))
        .sort(() => Math.random() - 0.5)
    );
  }, [mode]);

  const handleComponentClick = (id) => {
    if (matchedPairs[id]) return; // already solved
    sound.playClick();
    setSelectedComponent(id);
    setWrongAttempt(null);
  };

  const handleDefinitionClick = (defId) => {
    if (!selectedComponent) return;

    if (selectedComponent === defId) {
      sound.playSuccess();
      const updated = { ...matchedPairs, [selectedComponent]: defId };
      setMatchedPairs(updated);
      setSelectedComponent(null);
      setWrongAttempt(null);

      // Check if all pairs matched
      if (Object.keys(updated).length === pairsData.length) {
        setTimeout(() => {
          onComplete({
            level: 2,
            mode,
            score: pairsData.length,
            total: pairsData.length,
            accuracy: 100
          });
        }, 800);
      }
    } else {
      sound.playError();
      setWrongAttempt(defId);
      setTimeout(() => setWrongAttempt(null), 800);
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedComponent(null);
    setMatchedPairs({});
    setWrongAttempt(null);
    setDefinitions(
      [...pairsData]
        .map((p) => ({ id: p.id, match: p.match }))
        .sort(() => Math.random() - 0.5)
    );
  };

  const isAllComplete = Object.keys(matchedPairs).length === pairsData.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-mono">
        <span className="text-blue-600 font-bold">
          {mode === "classical" ? "💻 Classical Architecture Match" : "⚛️ Quantum Hardware Match"} • Matched: {Object.keys(matchedPairs).length} of {pairsData.length} pairs
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Pairs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Components Column */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            1. Select Component:
          </span>
          {pairsData.map((item) => {
            const isMatched = !!matchedPairs[item.id];
            const isSelected = selectedComponent === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleComponentClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                  isMatched
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 opacity-80"
                    : isSelected
                    ? "bg-blue-600 text-white shadow-md scale-102 border-blue-600"
                    : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 shadow-xs"
                }`}
              >
                <span>{item.component}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right: Function & Role Column */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            2. Match to Physical Role:
          </span>
          {definitions.map((item) => {
            const isMatched = Object.values(matchedPairs).includes(item.id);
            const isWrong = wrongAttempt === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleDefinitionClick(item.id)}
                disabled={isMatched}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  isMatched
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 opacity-80"
                    : isWrong
                    ? "bg-rose-50 border-rose-400 text-rose-700 animate-shake"
                    : selectedComponent
                    ? "bg-white border-slate-300 text-slate-800 hover:border-blue-500 hover:bg-blue-50/50 shadow-xs cursor-pointer"
                    : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>{item.match}</span>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAllComplete && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
          <span className="font-bold text-emerald-700 block">
            ✓ Level 2 Perfect Match Complete!
          </span>
          <p className="text-xs text-slate-700">
            All {mode === "classical" ? "classical CPU" : "quantum QPU"} functional pairings accurately identified.
          </p>
        </div>
      )}
    </div>
  );
}
