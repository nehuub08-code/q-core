import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  Pause,
  Grid,
  Monitor,
  FileText,
  ExternalLink,
  Sparkles,
  GraduationCap
} from "lucide-react";
import { sound } from "../../utils/audioEffects";
import SectionModeToggle from "../common/SectionModeToggle";

export default function PresentationDeck() {
  const [slideFilter, setSlideFilter] = useState("classical");
  const [currentSlide, setCurrentSlide] = useState(2);
  const [viewMode, setViewMode] = useState("deck"); // 'deck' | 'grid'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const classicalSlideNums = [1, 2, 3, 4, 8];
  const quantumSlideNums = [1, 5, 6, 7, 8, 9];

  const handleFilterChange = (mode) => {
    setSlideFilter(mode);
    if (mode === "classical" && !classicalSlideNums.includes(currentSlide)) {
      setCurrentSlide(2);
    } else if (mode === "quantum" && !quantumSlideNums.includes(currentSlide)) {
      setCurrentSlide(5);
    }
  };

  const totalSlides = 9;

  const slidesMeta = [
    {
      num: 1,
      title: "Title & Author Team",
      desc: "Dr. D. Y. Patil College of Engineering and Innovation • Topic: quantum vs classical microprocessor • Authors: Neha Borkar, Mayuri Mundkar, Janvhi Patil, Vedika Karlekar"
    },
    {
      num: 2,
      title: "Working of a Classical Microprocessor",
      desc: "Binary bits (0 and 1) & the continuous fetch–decode–execute–store cycle."
    },
    {
      num: 3,
      title: "Applications of Classical Microprocessor",
      desc: "Computers, Embedded Systems, Automobiles, Industrial Automation, Medical, Communications, Consumer, Robotics."
    },
    {
      num: 4,
      title: "Advantages & Disadvantages of Classical Microprocessor",
      desc: "Simple, Low cost, Reliable vs Limited speed, Power draw, Cannot perform quantum computations."
    },
    {
      num: 5,
      title: "Working of Quantum Microprocessor",
      desc: "7-Step Flowchart: Input Data → Qubits → Superposition & Entanglement → Quantum Gates → Processing → Measurement → Output."
    },
    {
      num: 6,
      title: "Applications of Quantum Microprocessor",
      desc: "AI & ML, Cryptography & Cybersecurity, Drug & Medical, Weather & Climate, Optimization."
    },
    {
      num: 7,
      title: "Advantages & Disadvantages of Quantum Microprocessor",
      desc: "High processing power, Complex problem speedup vs High cost, Cryogenics, High error sensitivity."
    },
    {
      num: 8,
      title: "Aspect Comparison Matrix",
      desc: "7-Point Technical Comparison: Basic Unit, State Principle, Processing Style, Speed, Error Rate, Operating Conditions, Maturity."
    },
    {
      num: 9,
      title: "Concluding Acknowledgments",
      desc: "Department of Engineering Science & Humanities • Thank You."
    }
  ];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSlides = slidesMeta.filter((s) =>
    slideFilter === "classical"
      ? classicalSlideNums.includes(s.num)
      : quantumSlideNums.includes(s.num)
  );

  const nextSlide = () => {
    sound.playClick();
    const currentIdx = filteredSlides.findIndex((s) => s.num === currentSlide);
    if (currentIdx === -1 || currentIdx === filteredSlides.length - 1) {
      setCurrentSlide(filteredSlides[0].num);
    } else {
      setCurrentSlide(filteredSlides[currentIdx + 1].num);
    }
  };

  const prevSlide = () => {
    sound.playClick();
    const currentIdx = filteredSlides.findIndex((s) => s.num === currentSlide);
    if (currentIdx <= 0) {
      setCurrentSlide(filteredSlides[filteredSlides.length - 1].num);
    } else {
      setCurrentSlide(filteredSlides[currentIdx - 1].num);
    }
  };

  const selectSlide = (num) => {
    sound.playClick();
    setCurrentSlide(num);
  };

  return (
    <section id="presentation" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Presentation Archive
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Curriculum Presentation Deck
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Official presentation slides submitted and evaluated for <strong className="text-slate-900 dark:text-white font-semibold">Computer Architecture and Organization</strong> at Dr. D. Y. Patil College of Engineering and Innovation.
            </p>
          </div>

          {/* Controls: Deck vs Grid & Downloads */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center gap-1 shadow-xs">
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("deck");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "deck"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Presentation Mode</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setViewMode("grid");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Slides Grid</span>
              </button>
            </div>

            {/* Direct Download Buttons */}
            <a
              href={`${import.meta.env.BASE_URL}downloads/Quantum_vs_Classical_Microprocessor_DYPCOEI.pptx`}
              download="Quantum_vs_Classical_Microprocessor_DYPCOEI.pptx"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
              title="Download Original PowerPoint Presentation"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Download .PPTX</span>
            </a>

            <a
              href={`${import.meta.env.BASE_URL}downloads/Quantum_vs_Classical_Microprocessor_DYPCOEI.pdf`}
              download="Quantum_vs_Classical_Microprocessor_DYPCOEI.pdf"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
              title="Download Original PDF Presentation"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Download .PDF</span>
            </a>
          </div>
        </div>

        {/* Section Mode Filter Buttons */}
        <SectionModeToggle
          mode={slideFilter}
          onModeChange={handleFilterChange}
          classicalLabel="Classical Microprocessor Slides"
          quantumLabel="Quantum Microprocessor Slides"
        />

        {/* 1. Presentation Mode (16:9 Cinematic Screen with exact slide) */}
        {viewMode === "deck" && (
          <div className="space-y-6">
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
              {/* Slide Screen Container (16:9 Aspect Ratio) */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 shadow-xl flex items-center justify-center group">
                <img
                  src={`${import.meta.env.BASE_URL}slides/slide-${currentSlide}.png`}
                  alt={`Slide ${currentSlide}: ${slidesMeta[currentSlide - 1]?.title}`}
                  className="w-full h-full object-contain select-none"
                />

                {/* Left / Right Hover Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-105 transition-all shadow-lg cursor-pointer"
                  title="Previous Slide (or Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-105 transition-all shadow-lg cursor-pointer"
                  title="Next Slide (or Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-xs font-semibold text-blue-400 shadow-xs">
                  Slide {currentSlide} of {totalSlides} ({slideFilter === "classical" ? "Classical Track" : "Quantum Track"})
                </div>

                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 shadow-xs">
                  {slidesMeta[currentSlide - 1]?.title}
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-xs font-semibold transition-all shadow-xs"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextSlide}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-xs"
                  >
                    Next Slide →
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isPlaying
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? "Pause Slideshow" : "Auto-Play (4s)"}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Tip: Use keyboard ← → arrow keys to navigate slides
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                {slideFilter === "classical" ? "Classical Track Slides:" : "Quantum Track Slides:"}
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {filteredSlides.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => selectSlide(s.num)}
                    className={`relative aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                      currentSlide === s.num
                        ? "border-blue-600 shadow-md scale-105"
                        : "border-slate-200 hover:border-blue-400 opacity-80 hover:opacity-100"
                    }`}
                    title={`Go to slide ${s.num}: ${s.title}`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}slides/slide-${s.num}.png`}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 bg-slate-900/90 px-1 rounded text-[9px] font-mono text-white font-bold">
                      {s.num}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Grid View: Filtered Slides */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSlides.map((slide) => (
              <div
                key={slide.num}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-500 transition-all duration-200 group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}slides/slide-${slide.num}.png`}
                      alt={slide.title}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-200 cursor-pointer"
                      onClick={() => {
                        sound.playClick();
                        setCurrentSlide(slide.num);
                        setViewMode("deck");
                      }}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/90 text-[10px] font-mono font-bold text-blue-400 border border-slate-700">
                      Slide 0{slide.num}
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {slide.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {slide.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCurrentSlide(slide.num);
                      setViewMode("deck");
                    }}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white border border-slate-200 text-xs font-semibold text-slate-700 transition-all text-center shadow-xs cursor-pointer"
                  >
                    View in Presentation Deck
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
