"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../lib/projects";
import ProjectCard from "./ProjectCard";

export default function RandomRepoShoutout() {
  // Only show projects that have a repoUrl or liveUrl to ensure they are actionable
  const completedProjects = projects.filter(p => p.repoUrl || p.liveUrl);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % completedProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + completedProjects.length) % completedProjects.length);
  };

  if (completedProjects.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm p-6">
        No projects found.
      </div>
    );
  }

  const project = completedProjects[currentIndex];

  return (
    <div className="flex flex-col h-full relative group p-4 overflow-hidden bg-gradient-to-br hover:from-brand-cyan/5 hover:to-transparent transition-colors duration-500">
      {/* Decorative background glow */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl group-hover:bg-brand-cyan/20 transition-all duration-500 pointer-events-none"></div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={prevProject} className="p-1.5 bg-black/50 hover:bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan rounded-full backdrop-blur-sm transition-all shadow-[0_0_10px_rgba(0,255,225,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={nextProject} className="p-1.5 bg-black/50 hover:bg-brand-cyan/20 border border-brand-cyan/50 text-brand-cyan rounded-full backdrop-blur-sm transition-all shadow-[0_0_10px_rgba(0,255,225,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      
      {/* Pagination dots indicator */}
      <div className="absolute top-2 right-4 z-20 text-[10px] font-mono text-brand-cyan/70 font-bold tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-brand-cyan/20">
        {currentIndex + 1} / {completedProjects.length}
      </div>

      <div className="flex-1 w-full h-full relative z-10 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
             <ProjectCard project={project} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
