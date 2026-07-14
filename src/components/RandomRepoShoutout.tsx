"use client";

import { motion } from "framer-motion";
import { projects } from "../lib/projects";
import Link from 'next/link';
import WeatherWidget from './WeatherWidget';
import TrendingRepoShoutout from './TrendingRepoShoutout';

export default function RandomRepoShoutout() {
  const showcaseProjects = projects.filter(p => p.repoUrl || p.liveUrl);

  if (showcaseProjects.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm p-6">
        No projects found.
      </div>
    );
  }

  const formatIndex = (index: number) => (index + 1).toString().padStart(2, '0');

  return (
    <div className="flex flex-col gap-12 w-full">
      {showcaseProjects.map((project, idx) => {
        const isWeather = project.title === 'Weather Widget';
        const isTrending = project.title === '~/trending';
        const isSpecialWidget = isWeather || isTrending;

        return (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col w-full relative group overflow-hidden bg-[#05080f] min-h-[550px] rounded-3xl"
        >
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/10 rounded-full blur-[100px] pointer-events-none z-0 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none z-0 -translate-x-1/3 translate-y-1/3"></div>

          {/* Grid overlay for cyberpunk feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none z-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)' }} />

          {/* Dynamic Background Typography */}
          {!isSpecialWidget && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-5 select-none z-0">
              <h2 className="text-[15vw] md:text-[10vw] font-black text-white text-center leading-none whitespace-nowrap overflow-visible drop-shadow-2xl">
                {project.title.toUpperCase()}
              </h2>
            </div>
          )}

          {/* Main Content Area */}
          <div className="relative z-10 w-full h-full flex flex-col p-8 md:p-12">
            
            {/* Header: Title and Tags */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-5xl font-black text-white/50 tracking-tighter">
                  {formatIndex(idx)}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {project.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {project.techStack?.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-4 py-1.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    {tech}
                  </span>
                ))}
                {project.techStack && project.techStack.length > 3 && (
                  <span className="px-4 py-1.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Project Description or Live Widget */}
            {isWeather ? (
              <div className="mt-8 md:mt-12 flex-1 -mx-8 -mb-8 md:-mx-12 md:-mb-12 relative z-40 overflow-hidden flex flex-col">
                <WeatherWidget isMaximized={true} />
              </div>
            ) : isTrending ? (
              <div className="mt-8 md:mt-12 flex-1 -mx-8 -mb-8 md:-mx-12 md:-mb-12 relative z-40 overflow-hidden flex flex-col">
                <TrendingRepoShoutout />
              </div>
            ) : (
              <div className="mt-8 md:mt-12 max-w-2xl bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
                <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* Floating Action Button (Centered on Hover) */}
          {!isSpecialWidget && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 pointer-events-auto">
                  <Link
                    href={project.liveUrl || project.repoUrl || "#"}
                    target="_blank"
                    className="group/btn relative flex items-center justify-between w-64 h-24 bg-gradient-to-r from-[#8a2be2] to-[#da70d6] rounded-full p-2 shadow-[0_0_30px_rgba(138,43,226,0.4)] hover:shadow-[0_0_50px_rgba(138,43,226,0.6)] transition-all duration-300 hover:scale-105"
                  >
                    <span className="pl-6 text-white font-black text-sm tracking-[0.2em] uppercase whitespace-nowrap">
                      {project.liveUrl ? 'Live Demo' : 'View Repo'}
                    </span>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-white transition-colors duration-300">
                      <svg className="w-8 h-8 text-white group-hover/btn:text-[#8a2be2] transition-colors -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
          )}
        </motion.div>
      )})}
    </div>
  );
}

