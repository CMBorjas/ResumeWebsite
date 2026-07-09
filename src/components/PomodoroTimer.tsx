"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "WORK" | "SHORT_BREAK" | "LONG_BREAK";

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("WORK");
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Custom Durations (in minutes)
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  
  const MODES = {
    WORK: { 
      label: "Deep Work", 
      duration: workMinutes * 60, 
      color: "text-brand-pink", 
      bg: "bg-brand-pink", 
      border: "border-brand-pink/50",
      shadow: "shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)]" 
    },
    SHORT_BREAK: { 
      label: "Short Rest", 
      duration: shortBreakMinutes * 60, 
      color: "text-brand-cyan", 
      bg: "bg-brand-cyan", 
      border: "border-brand-cyan/50",
      shadow: "shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)]" 
    },
    LONG_BREAK: { 
      label: "Long Recovery", 
      duration: longBreakMinutes * 60, 
      color: "text-yellow-400", 
      bg: "bg-yellow-400", 
      border: "border-yellow-400/50",
      shadow: "shadow-[0_0_15px_rgba(250,204,21,0.4)]" 
    }
  };

  const [timeLeft, setTimeLeft] = useState(MODES.WORK.duration);

  // Update time left if durations change while paused
  useEffect(() => {
    if (!isRunning) {
      if (mode === "WORK") setTimeLeft(workMinutes * 60);
      else if (mode === "SHORT_BREAK") setTimeLeft(shortBreakMinutes * 60);
      else if (mode === "LONG_BREAK") setTimeLeft(longBreakMinutes * 60);
    }
  }, [workMinutes, shortBreakMinutes, longBreakMinutes, mode, isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      
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
    if (newMode === "WORK") setTimeLeft(workMinutes * 60);
    else if (newMode === "SHORT_BREAK") setTimeLeft(shortBreakMinutes * 60);
    else if (newMode === "LONG_BREAK") setTimeLeft(longBreakMinutes * 60);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (mode === "WORK") setTimeLeft(workMinutes * 60);
    else if (mode === "SHORT_BREAK") setTimeLeft(shortBreakMinutes * 60);
    else if (mode === "LONG_BREAK") setTimeLeft(longBreakMinutes * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progress = ((MODES[mode].duration - timeLeft) / MODES[mode].duration) * 100;
  const currentModeData = MODES[mode];

  // Calculate current training stage if it matches the pattern
  const currentStage = (workMinutes % 5 === 0 && shortBreakMinutes % 2 === 0 && workMinutes / 5 === shortBreakMinutes / 2 && workMinutes / 5 >= 1 && workMinutes / 5 <= 9) ? workMinutes / 5 : 0;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#0a0f18]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden group min-h-[500px]">
      {/* Decorative Glow */}
      <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-1000 ${currentModeData.bg}`}></div>
      
      <AnimatePresence mode="wait">
        {showSettings ? (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full h-full relative z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-mono text-white">Timer Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto no-scrollbar pb-4 flex-1">
              {/* Training Mode Section */}
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5">
                <h4 className="text-sm font-bold text-brand-pink mb-2 uppercase tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                  Endurance Training
                </h4>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">Gradually build up your focus to 45 minutes over 9 stages. Adjust the slider to set your current capability.</p>
                
                <div className="flex flex-col gap-4">
                  <input 
                    type="range" 
                    min="1" max="9" 
                    step="1"
                    onChange={(e) => {
                      const stage = parseInt(e.target.value);
                      setWorkMinutes(stage * 5);
                      setShortBreakMinutes(stage * 2);
                      setMode("WORK");
                      setIsRunning(false);
                    }}
                    value={currentStage || 1}
                    className="w-full accent-brand-pink h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-end text-xs font-mono">
                    <div className="flex flex-col text-slate-500">
                      <span>Stage 1</span>
                      <span className="text-[10px]">5m work / 2m rest</span>
                    </div>
                    {currentStage > 0 && (
                      <div className="flex flex-col items-center text-brand-pink font-bold">
                        <span>Stage {currentStage}</span>
                        <span className="text-[10px]">{currentStage * 5}m / {currentStage * 2}m</span>
                      </div>
                    )}
                    <div className="flex flex-col text-slate-500 text-right">
                      <span>Stage 9</span>
                      <span className="text-[10px]">45m work / 18m rest</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Settings */}
              <div className="bg-black/30 p-5 rounded-2xl border border-white/5 space-y-5">
                <h4 className="text-sm font-bold text-brand-cyan mb-2 uppercase tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>
                  Custom Durations
                </h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center group">
                    <label className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">Focus (minutes)</label>
                    <input 
                      type="number" 
                      value={workMinutes} 
                      onChange={(e) => {
                        setWorkMinutes(Math.max(1, parseInt(e.target.value) || 1));
                        setIsRunning(false);
                      }}
                      className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-sm w-20 text-center focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                  <div className="flex justify-between items-center group">
                    <label className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">Short Rest (minutes)</label>
                    <input 
                      type="number" 
                      value={shortBreakMinutes} 
                      onChange={(e) => {
                        setShortBreakMinutes(Math.max(1, parseInt(e.target.value) || 1));
                        setIsRunning(false);
                      }}
                      className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-sm w-20 text-center focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                  <div className="flex justify-between items-center group">
                    <label className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">Long Recovery (minutes)</label>
                    <input 
                      type="number" 
                      value={longBreakMinutes} 
                      onChange={(e) => {
                        setLongBreakMinutes(Math.max(1, parseInt(e.target.value) || 1));
                        setIsRunning(false);
                      }}
                      className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-sm w-20 text-center focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowSettings(false)}
              className="mt-4 w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              Done
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="timer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-10 bg-black/40 p-1.5 rounded-full border border-white/5 relative z-10 w-full">
              {(Object.keys(MODES) as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${mode === m ? `${MODES[m].bg} text-black font-extrabold ${MODES[m].shadow}` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
                className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all duration-300 flex items-center justify-center"
                title="Reset Timer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 transition-all duration-300 flex items-center justify-center"
                title="Settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
