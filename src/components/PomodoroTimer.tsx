"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Mode = "WORK" | "SHORT_BREAK" | "LONG_BREAK";

const MODES = {
  WORK: { 
    label: "Deep Work", 
    duration: 25 * 60, 
    color: "text-brand-pink", 
    bg: "bg-brand-pink", 
    border: "border-brand-pink/50",
    shadow: "shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)]" 
  },
  SHORT_BREAK: { 
    label: "Short Rest", 
    duration: 5 * 60, 
    color: "text-brand-cyan", 
    bg: "bg-brand-cyan", 
    border: "border-brand-cyan/50",
    shadow: "shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)]" 
  },
  LONG_BREAK: { 
    label: "Long Recovery", 
    duration: 15 * 60, 
    color: "text-yellow-400", 
    bg: "bg-yellow-400", 
    border: "border-yellow-400/50",
    shadow: "shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
  }
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("WORK");
  const [timeLeft, setTimeLeft] = useState(MODES.WORK.duration);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Optionally play a sound here
      alert(`Session completed: ${MODES[mode].label}`);
      
      // Auto-switch mode
      if (mode === "WORK") {
        switchMode("SHORT_BREAK");
      } else {
        switchMode("WORK");
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(MODES[mode].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = ((MODES[mode].duration - timeLeft) / MODES[mode].duration) * 100;
  const currentModeData = MODES[mode];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#0a0f18]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-1000 ${currentModeData.bg}`}></div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-10 bg-black/40 p-1.5 rounded-full border border-white/5 relative z-10">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${mode === m ? `${MODES[m].bg} text-black font-extrabold ${MODES[m].shadow}` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      <div className="relative flex items-center justify-center mb-10 w-72 h-72 z-10">
        {/* Outer Glowing Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-[0_0_10px_currentColor] transition-colors duration-1000" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="text-white/5" 
          />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeDasharray="283" 
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            transition={{ duration: 1, ease: "linear" }}
            className={currentModeData.color} 
          />
        </svg>

        <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <span className={`text-7xl font-black font-mono tracking-tighter drop-shadow-[0_0_15px_currentColor] transition-colors duration-1000 ${currentModeData.color}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-slate-400 font-mono text-xs tracking-widest uppercase mt-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isRunning ? 'animate-pulse' : ''} ${currentModeData.bg}`}></span>
            {isRunning ? "Running" : "Paused"}
          </span>
        </div>
      </div>

      <div className="flex gap-4 w-full z-10">
        <button 
          onClick={toggleTimer}
          className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 border ${isRunning ? 'border-red-500/50 text-red-500 hover:bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : `${currentModeData.border} ${currentModeData.color} hover:bg-white/5 ${currentModeData.shadow}`}`}
        >
          {isRunning ? "Pause" : "Start Focus"}
        </button>
        <button 
          onClick={resetTimer}
          className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
      </div>
    </div>
  );
}
