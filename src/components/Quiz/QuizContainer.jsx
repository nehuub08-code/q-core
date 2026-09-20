import React, { useState } from "react";
import { Award, Layers, CheckCircle2, ChevronRight, Sparkles, HelpCircle } from "lucide-react";
import Level1_MCQ from "./Level1_MCQ";
import Level2_Match from "./Level2_Match";
import Level3_InteractiveBuild from "./Level3_InteractiveBuild";
import CertificateModal from "./CertificateModal";
import SectionModeToggle from "../common/SectionModeToggle";
import { sound } from "../../utils/audioEffects";

export default function QuizContainer({ onQuizComplete }) {
  const [mode, setMode] = useState("classical");
  const [activeLevel, setActiveLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState({});
  const [showCertificate, setShowCertificate] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const levels = [
    { level: 1, title: "Level 1: Academic MCQs", subtitle: "Curriculum Concept Verification", type: "Easy" },
    { level: 2, title: "Level 2: Architecture Match", subtitle: "Component & Physical Role Linking", type: "Medium" },
    { level: 3, title: "Level 3: Master Assembly", subtitle: "Cycle Sequencing & Bell State", type: "Hard" }
  ];

  const handleLevelComplete = (result) => {
    sound.playSuccess();
    setCompletedLevels((prev) => ({ ...prev, [`${mode}_${result.level}`]: result }));
    setTotalScore((prev) => prev + (result.score || 25));

    if (result.level < 3) {
      setActiveLevel(result.level + 1);
    } else {
      setShowCertificate(true);
      if (onQuizComplete) onQuizComplete(100);
    }
  };

  return (
    <section id="quiz" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <Award className="w-3.5 h-3.5" />
            3-Tier Assessment & Certification
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Curriculum Mastery Challenge
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Test your knowledge of Classical vs Quantum microprocessors across three difficulty tiers. Complete Level 3 to claim your academic certification.
          </p>
        </div>

        {/* Executive Section Mode Toggle */}
        <SectionModeToggle
          mode={mode}
          onModeChange={setMode}
          classicalCount="Classical CPU Track"
          quantumCount="Quantum QPU Track"
        />

        {/* Level Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {levels.map((lvl) => {
            const isSelected = activeLevel === lvl.level;
            const isDone = completedLevels[`${mode}_${lvl.level}`];

            return (
              <button
                key={lvl.level}
                onClick={() => {
                  sound.playClick();
                  setActiveLevel(lvl.level);
                }}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group shadow-xs ${
                  isSelected
                    ? "bg-white border-blue-600 ring-2 ring-blue-500/20 shadow-md scale-102"
                    : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-xs"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                      {lvl.type}
                    </span>
                    {isDone && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {lvl.title}
                  </h4>
                  <p className="text-xs text-slate-500">{lvl.subtitle}</p>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>

        {/* Level Interactive Body */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {activeLevel === 1 && <Level1_MCQ mode={mode} onComplete={handleLevelComplete} />}
          {activeLevel === 2 && <Level2_Match mode={mode} onComplete={handleLevelComplete} />}
          {activeLevel === 3 && <Level3_InteractiveBuild mode={mode} onComplete={handleLevelComplete} />}
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <CertificateModal
            score={totalScore || 100}
            accuracy={96}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </div>
    </section>
  );
}
