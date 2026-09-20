import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PresentationDeck from "./components/PresentationDeck/PresentationDeck";
import Timeline from "./components/Timeline/Timeline";
import ClassicalOverview from "./components/Classical/ClassicalOverview";
import QuantumOverview from "./components/Quantum/QuantumOverview";
import LabDashboard from "./components/Labs/LabDashboard";
import ComparisonWheel from "./components/Comparison/ComparisonWheel";
import BenchmarkCenter from "./components/Benchmarks/BenchmarkCenter";
import ApplicationsGallery from "./components/Applications/ApplicationsGallery";
import QuizContainer from "./components/Quiz/QuizContainer";
import LearningDashboard from "./components/Analytics/LearningDashboard";
import Footer from "./components/Footer/Footer";
import AITutorOrb from "./components/AI/AITutorOrb";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [hindiMode, setHindiMode] = useState(false);
  const [completedLabs, setCompletedLabs] = useState({
    lab1: true,
    lab2: false,
    lab3: false,
    lab4: false
  });
  const [quizScore, setQuizScore] = useState(90);

  // Smooth navigation helper
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Intersection observer to track active section
  useEffect(() => {
    const sections = [
      "hero",
      "presentation",
      "timeline",
      "classical",
      "quantum",
      "labs",
      "comparison",
      "benchmarks",
      "applications",
      "quiz",
      "analytics"
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLabComplete = (labId) => {
    setCompletedLabs((prev) => ({ ...prev, [labId]: true }));
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400 relative overflow-x-hidden transition-colors duration-200">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAITutor={() => setIsTutorOpen(true)}
        hindiMode={hindiMode}
        setHindiMode={setHindiMode}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* 2. Original Academic Presentation Deck */}
        <PresentationDeck />

        {/* 3. Interactive Evolution Timeline */}
        <Timeline />

        {/* 3. Classical Microprocessor Architecture & Simulator */}
        <ClassicalOverview />

        {/* 4. Quantum Microprocessor Architecture & Bloch Sphere */}
        <QuantumOverview />

        {/* 5. Virtual Laboratories (4 Comprehensive Labs) */}
        <LabDashboard
          completedLabs={completedLabs}
          onLabComplete={handleLabComplete}
        />

        {/* 6. Comparison Center (Rotary Wheel) */}
        <ComparisonWheel />

        {/* 7. Performance Simulation Center */}
        <BenchmarkCenter />

        {/* 8. Applications Gallery */}
        <ApplicationsGallery />

        {/* 9. Quiz & Certification System */}
        <QuizContainer onQuizComplete={handleQuizComplete} />

        {/* 10. Learning Analytics & Badges Dashboard */}
        <LearningDashboard
          completedLabs={completedLabs}
          quizScore={quizScore}
        />
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* AI Tutor Assistant Orb */}
      <AITutorOrb
        isOpen={isTutorOpen}
        onToggle={() => setIsTutorOpen(!isTutorOpen)}
        activeSection={activeSection}
        hindiMode={hindiMode}
        onToggleHindi={() => setHindiMode(!hindiMode)}
      />
    </div>
  );
}
