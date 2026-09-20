import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Award, Printer, X, Sparkles } from "lucide-react";
import { INSTITUTION_INFO } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";

export default function CertificateModal({ score = 100, accuracy = 100, timeSpent = "4m 12s", onClose }) {
  const [studentName, setStudentName] = useState("Engineering Student");

  useEffect(() => {
    sound.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#2563EB", "#7C3AED", "#059669", "#EA580C", "#0284C7"]
      });
    } catch (e) {}
  }, []);

  const getRank = (acc) => {
    if (acc >= 90) return "Q-CORE Grandmaster & Quantum Physicist";
    if (acc >= 75) return "Silicon Architect & Senior Micro-Engineer";
    return "Quantum Computing Apprentice";
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 max-w-3xl w-full relative space-y-6 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Congratulatory Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Curriculum Certification Eligible
          </div>
          <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl sm:text-3xl text-slate-900">
            Congratulations on Completing Q-CORE!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            You have successfully demonstrated practical and theoretical mastery of Classical and Quantum Microprocessors.
          </p>
        </div>

        {/* Student Name Input */}
        <div className="max-w-md mx-auto space-y-1.5 text-center">
          <label className="text-xs font-bold text-slate-700 block">
            Enter Your Full Name for Certificate:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full text-center bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-lg focus:border-blue-600 focus:outline-none focus:bg-white"
            placeholder="Your Name"
          />
        </div>

        {/* Performance Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Overall Score</span>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-blue-600">{score} pts</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Accuracy</span>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-emerald-600">{accuracy}%</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Session Time</span>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl text-amber-600">{timeSpent}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Achieved Rank</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-indigo-600 block truncate mt-1">
              {getRank(accuracy).split("&")[0]}
            </span>
          </div>
        </div>

        {/* Formal Printable Diploma Certificate Container */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-10 rounded-2xl border-2 border-blue-600/30 bg-slate-50 relative text-center space-y-5 overflow-hidden shadow-inner"
        >
          <div className="space-y-1">
            <h5 className="text-xs font-black tracking-widest text-blue-700 uppercase">
              {INSTITUTION_INFO.college}
            </h5>
            <p className="text-[11px] text-slate-600 font-medium">
              {INSTITUTION_INFO.department} • {INSTITUTION_INFO.campus}
            </p>
          </div>

          <div className="py-2">
            <span className="text-xs uppercase font-semibold text-slate-500 tracking-widest block">
              Certificate of Academic Excellence
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
              {studentName}
            </h2>
          </div>

          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Has successfully demonstrated comprehensive academic understanding and practical simulation skills in{" "}
            <strong className="text-slate-900">Computer Architecture & Organization</strong>, covering both{" "}
            <strong className="text-blue-600">Classical Von Neumann Microprocessors</strong> and{" "}
            <strong className="text-indigo-600">Superconducting Quantum Processors (QPU)</strong>.
          </p>

          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600">
            <div className="text-left">
              <span className="block text-slate-900 font-bold">Honors Rank:</span>
              <span className="text-blue-600 font-bold">{getRank(accuracy)}</span>
            </div>
            <div className="text-right">
              <span className="block text-slate-900 font-bold">Verification ID:</span>
              <span>Q-CORE-DYPCOEI-2026-CERT</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
