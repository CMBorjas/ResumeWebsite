"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const paragraphs = [
  "I am Christian Mandujano Borjas, an aspiring software engineer currently pursuing a degree in Computer Science at the University of Colorado Denver. With a strong foundation in programming languages like Python, Java, and C++, I have a passion for solving complex problems and building efficient systems.",
  "I am currently working on a full stack web development project using HTML, CSS, and JavaScript. I have experience with database management using MySQL and SQLite, and I am familiar with cloud services like Google Firebase and Amazon Web Services.",
  "My experience as an I.T. Technician at The Monarch Casino and as a CIS Lab Assistant at the Community College of Denver has given me hands-on experience in hardware maintenance, networking, and team collaboration."
];

let hasPlayedAnimation = false;

const BentoBox = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, zIndex: 10 }}
    className={`bg-[#0a0f18]/80 backdrop-blur-xl border border-[#00ffe1]/20 rounded-3xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,255,225,0.15)] hover:border-[#00ffe1]/40 overflow-hidden relative group transition-colors duration-300 flex flex-col ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffe1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 w-full h-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

const SkillBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#00ffe1]/10 text-[#00ffe1] border border-[#00ffe1]/20 group-hover:bg-[#00ffe1]/20 group-hover:shadow-[0_0_10px_rgba(0,255,225,0.3)] transition-all duration-300">
    {children}
  </span>
);

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = paragraphs.join("\n\n");

  useEffect(() => {
    if (hasPlayedAnimation) {
      setDisplayedText(fullText);
      setIsTypingDone(true);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i += 3; // speed up typing
      if (i > fullText.length) {
        clearInterval(interval);
        setDisplayedText(fullText);
        setIsTypingDone(true);
        hasPlayedAnimation = true;
      }
    }, 10);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center pt-8 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1200px] w-full auto-rows-[minmax(180px,auto)]">
        
        {/* Intro Box */}
        <BentoBox className="md:col-span-2 md:row-span-1 justify-center" delay={0.1}>
          <p className="text-[#00ffe1] text-xs font-mono tracking-widest mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ffe1] animate-pulse"></span>
            Welcome to my portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffe1] to-brand-pink drop-shadow-[0_0_10px_rgba(0,255,225,0.4)]">digital experiences</span>
          </h1>
        </BentoBox>

        {/* Location/Status Box */}
        <BentoBox className="md:col-span-1 md:row-span-1 items-center justify-center text-center" delay={0.2}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00ffe1]/20 to-brand-pink/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-[#00ffe1]/30">
            <svg className="w-8 h-8 text-[#00ffe1] drop-shadow-[0_0_5px_rgba(0,255,225,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-white tracking-wide">Denver, CO</h3>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-semibold">CS @ CU Denver</p>
        </BentoBox>

        {/* Quick Contact Box */}
        <BentoBox className="md:col-span-1 md:row-span-1 justify-between bg-gradient-to-br hover:from-brand-pink/5 hover:to-transparent transition-colors duration-500" delay={0.3}>
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(255,15,77,0.4)] transition-all duration-300">
              <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-pink shadow-[0_0_8px_rgba(255,15,77,0.8)]"></span>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Let's work together</p>
            <a href="mailto:C.mandujano.borjas@gmail.com" className="text-white font-bold text-sm hover:text-brand-pink transition-colors truncate block">
              Send an Email ↗
            </a>
          </div>
        </BentoBox>

        {/* Terminal / About Me Box */}
        <BentoBox className="md:col-span-2 md:row-span-2 !p-0 !bg-black/80 font-mono" delay={0.4}>
          <div className="w-full h-10 bg-[#00ffe1]/10 border-b border-[#00ffe1]/30 flex items-center px-4 justify-between backdrop-blur-md">
             <span className="text-[11px] text-[#00ffe1] tracking-widest font-bold">C:\SYSTEM\ABOUT_ME.EXE</span>
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-brand-pink/80 hover:bg-brand-pink hover:shadow-[0_0_8px_rgba(255,15,77,0.8)] transition-all cursor-pointer"></div>
             </div>
          </div>
          <div className="p-6 flex-grow overflow-y-auto custom-scrollbar h-[300px]">
            <p className="whitespace-pre-wrap leading-relaxed text-sm text-[#00ffe1]/90">
              <span className="text-brand-pink mr-2 font-bold">&gt;</span>{displayedText}
              <span className={`${isTypingDone ? 'animate-pulse' : ''} inline-block w-2.5 h-4 bg-[#00ffe1] align-middle ml-1 shadow-[0_0_8px_rgba(0,255,225,0.8)]`}></span>
            </p>
          </div>
        </BentoBox>

        {/* Skills Box */}
        <BentoBox className="md:col-span-2 md:row-span-1" delay={0.5}>
          <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
             <svg className="w-4 h-4 text-[#00ffe1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
             Core Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <SkillBadge>Python</SkillBadge>
            <SkillBadge>Java</SkillBadge>
            <SkillBadge>C++</SkillBadge>
            <SkillBadge>TypeScript</SkillBadge>
            <SkillBadge>Next.js</SkillBadge>
            <SkillBadge>React</SkillBadge>
            <SkillBadge>Tailwind CSS</SkillBadge>
            <SkillBadge>Node.js</SkillBadge>
            <SkillBadge>MySQL</SkillBadge>
            <SkillBadge>Docker</SkillBadge>
            <SkillBadge>AWS</SkillBadge>
            <SkillBadge>Linux</SkillBadge>
          </div>
        </BentoBox>

        {/* Roles/Experience Box */}
        <BentoBox className="md:col-span-2 md:row-span-1 justify-center" delay={0.6}>
           <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
             <svg className="w-4 h-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             Recent Experience
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-3 hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
              <div>
                <p className="text-white font-bold text-sm">I.T. Technician</p>
                <p className="text-slate-400 text-xs mt-0.5">The Monarch Casino</p>
              </div>
              <span className="text-[10px] text-[#00ffe1] bg-[#00ffe1]/10 px-3 py-1 rounded-full border border-[#00ffe1]/20 font-bold tracking-wider">HARDWARE</span>
            </div>
            <div className="flex justify-between items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
              <div>
                <p className="text-white font-bold text-sm">CIS Lab Assistant</p>
                <p className="text-slate-400 text-xs mt-0.5">Community College of Denver</p>
              </div>
              <span className="text-[10px] text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20 font-bold tracking-wider">SUPPORT</span>
            </div>
          </div>
        </BentoBox>

      </div>
    </div>
  )
}
