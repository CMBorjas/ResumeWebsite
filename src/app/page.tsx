"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPython, FaJava, FaReact, FaNodeJs, FaDocker, FaAws, FaLinux } from 'react-icons/fa';
import { SiBluesky, SiCplusplus, SiTypescript, SiNextdotjs, SiTailwindcss, SiMysql } from 'react-icons/si';
import Tooltip from '../components/Tooltip';
import RandomRepoShoutout from '../components/RandomRepoShoutout';
import TrendingRepoShoutout from '../components/TrendingRepoShoutout';
import WeatherWidget from '../components/WeatherWidget';
import TestimonialCards from '../components/TestimonialCards';
import ProjectCarousel from '../components/ProjectCarousel';
import { projects } from '../lib/projects';
import MyGoals from '../components/MyGoals';
import ServicesSection from '../components/ServicesSection';



const BentoBox = ({ children, className, delay = 0, title }: { children: React.ReactNode | ((isMaximized: boolean) => React.ReactNode), className?: string, delay?: number, title?: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      {isMaximized && <div className={className} style={{ opacity: 0 }} />}
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: isMaximized ? 0 : delay, type: "spring", bounce: 0.2 }}
        whileHover={!isMaximized ? { scale: 1.02, zIndex: 10 } : undefined}
        className={`bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden group transition-all duration-300 flex flex-col 
        ${!isMaximized ? 'hover:shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)] hover:border-brand-cyan/40' : ''} 
        ${isMaximized ? '!fixed !inset-4 md:!inset-10 !z-[100] !bg-[#0a0f18] !scale-100 !h-auto !w-auto' : className}
        ${isMinimized ? '!h-10 !min-h-[40px] !p-0' : ''}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative z-10 w-full h-full flex flex-col">
          {title && (
            <div className="w-full h-10 bg-brand-cyan/10 border-b border-brand-cyan/30 flex items-center px-4 justify-between backdrop-blur-md font-mono shrink-0">
              <span className="text-[11px] text-brand-cyan tracking-widest font-bold">{title}</span>
              <div className="flex gap-2">
                <div onClick={(e) => { e.stopPropagation(); setIsVisible(false); }} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" title="Close"></div>
                <div onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); setIsMaximized(false); }} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" title={isMinimized ? "Restore" : "Minimize"}></div>
                <div onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 hover:shadow-[0_0_8px_color-mix(in srgb, var(--color-green-500) 80%, transparent)] transition-all cursor-pointer" title={isMaximized ? "Restore" : "Maximize"}></div>
              </div>
            </div>
          )}
          <div className={`flex-1 overflow-y-auto custom-scrollbar relative flex flex-col ${isMinimized ? 'hidden' : ''}`}>
            {typeof children === 'function' ? children(isMaximized) : children}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SkillBadge = ({ children, icon: Icon, color = '#00ffe1' }: { children: React.ReactNode, icon?: React.ElementType, color?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: isHovered ? `${color}33` : 'rgba(0, 255, 225, 0.1)',
        borderColor: isHovered ? `${color}80` : 'rgba(0, 255, 225, 0.2)',
        color: isHovered ? color : '#00ffe1',
        boxShadow: isHovered ? `0 0 10px ${color}66` : 'none',
      }}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

// Circular Text Component for "hire me"
const CircularText = () => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/20 border-t-brand-cyan animate-[spin_3s_linear_infinite]" />
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-full h-full relative"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="circlePath"
            d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            fill="transparent"
          />
          <text className="text-[9.5px] font-bold tracking-[0.3em] uppercase fill-brand-cyan drop-shadow-[0_0_5px_rgba(0,255,225,0.8)]">
            <textPath href="#circlePath" startOffset="0%">
              HIRE ME • HIRE ME • HIRE ME • HIRE ME • 
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink opacity-20 blur-xl animate-pulse" />
      
      {/* Animated Scroll Arrows */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <svg className="w-6 h-6 text-brand-cyan animate-bounce drop-shadow-[0_0_8px_rgba(0,255,225,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

const ProgressBar = ({ label, percentage }: { label: string, percentage: number }) => (
  <div className="w-full mb-6">
    <div className="flex justify-between items-end mb-2">
      <span className="text-xs font-bold text-white tracking-widest uppercase">{label}</span>
      <span className="text-xs text-brand-cyan font-mono">{percentage}%</span>
    </div>
    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="h-full bg-gradient-to-r from-brand-cyan to-brand-pink shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)]" 
      />
    </div>
  </div>
);

export default function Home() {


  // Fetch the 10 most recently added projects from the array
  const recentProjects = [...projects].reverse().slice(0, 10);



  return (
    <div className="w-full bg-transparent">
      
      {/* 100vh HERO SPLASH SECTION */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden z-0">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-cyan/10 via-transparent to-transparent opacity-60 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Top Left: Name */}
        <div className="relative z-10 p-8 lg:p-12">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink drop-shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)]">
            Christian Mandujano Borjas
          </h1>
        </div>

        {/* Center/Background: Massive Title */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
          <h2 className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black text-white/5 text-center w-full px-4 whitespace-normal tracking-tighter leading-[0.9] select-none break-words">
            COMPUTER SCIENCE<br/>GRADUATE
          </h2>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
          <h2 className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black text-white/90 text-center w-full px-4 whitespace-normal tracking-tighter leading-[0.9] select-none mix-blend-overlay break-words">
            COMPUTER SCIENCE<br/>GRADUATE
          </h2>
        </div>

        {/* Bottom Area: Socials & Headshot */}
        <div className="relative z-20 flex justify-between items-end p-8 lg:p-12 h-full">
          
          {/* Bottom Left: Badge & Socials */}
          <div className="flex flex-col justify-end gap-16 md:gap-20 pb-8 items-start relative z-30">
            {/* Hovering Circular Badge */}
            <div className="scale-[1.5] md:scale-[2] ml-12 md:ml-16 mb-4">
              <CircularText />
            </div>

            <div className="flex gap-6">
              <a href="https://github.com/CMBorjas" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-cyan hover:scale-110 hover:drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] transition-all duration-300">
                <FaGithub className="w-8 h-8" />
              </a>
              <a href="https://linkedin.com/in/christian-mandujano-borjas" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5] hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,119,181,0.8)] transition-all duration-300">
                <FaLinkedin className="w-8 h-8" />
              </a>
              <a href="#" className="text-slate-400 hover:text-[#05a0fa] hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(5,160,250,0.8)] transition-all duration-300" title="Bluesky (Pending)">
                <SiBluesky className="w-8 h-8" />
              </a>
              <a href="mailto:C.mandujano.borjas@gmail.com" className="text-slate-400 hover:text-brand-pink hover:scale-110 hover:drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-pink) 80%, transparent)] transition-all duration-300">
                <FaEnvelope className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Bottom Right: Headshot & Spinning Badge */}
          <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[700px] flex justify-end items-end h-[60vh] md:h-[80vh]">
            <Image src="/images/profile/Headshot_nobg.png" alt="Christian Mandujano Borjas" fill className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-none scale-[2.0] origin-bottom" priority />

          </div>
        </div>
      </section>

      {/* SPLIT LAYOUT SECTION */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#0a0f18] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      
      {/* LEFT SIDEBAR (STICKY ON DESKTOP) */}
      <aside className="w-full lg:w-[350px] xl:w-[400px] lg:h-screen lg:sticky lg:top-0 bg-[#05080f] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between p-8 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]">
        
        {/* Top: Avatar & Status */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-brand-cyan/30 mb-6 relative shadow-[0_0_25px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)]">
            <Image src="/images/profile/Headshot_nobg.png" alt="Christian Mandujano Borjas" fill className="object-cover" priority />
          </div>
          <div className="flex items-center gap-2 mb-8 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_color-mix(in srgb, var(--color-green-500) 80%, transparent)]"></span>
            <span className="text-[10px] text-slate-300 tracking-[0.2em] uppercase font-bold">Available For Hire</span>
          </div>
        </div>

        {/* Middle: Name & Title */}
        <div className="text-center my-6 flex-1 flex flex-col justify-center">
          <h1 className="text-3xl xl:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">Christian<br/>Mandujano Borjas</h1>
          <p className="text-sm text-slate-400 font-mono tracking-widest leading-relaxed">
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink font-bold drop-shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">digital experiences</span>
          </p>
        </div>

        {/* Bottom: CTAs */}
        <div className="flex flex-col gap-4 mt-8">
          <a href="mailto:C.mandujano.borjas@gmail.com" className="w-full py-4 bg-gradient-to-r from-brand-cyan to-brand-pink text-white rounded-full font-bold text-center hover:scale-[1.02] hover:shadow-[0_0_20px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] transition-all duration-300 tracking-wider flex items-center justify-center gap-2 text-sm">
            HIRE ME
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
          <Link href="/resume" className="w-full py-4 bg-transparent border border-brand-cyan/30 text-brand-cyan rounded-full font-bold text-center hover:bg-brand-cyan/10 hover:border-brand-cyan/60 transition-all duration-300 tracking-wider flex items-center justify-center gap-2 text-sm">
            RESUME
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </Link>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA (SCROLLABLE) */}
      <main className="flex-1 min-h-screen p-4 lg:p-10 xl:p-16 relative overflow-x-hidden">
        
        <div className="max-w-[1200px] mx-auto w-full">
          
          {/* SECTION 1: STATS HEADER */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16 pt-8">
            <div className="flex-1 w-full">
              {/* Skills Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-white mb-8 tracking-widest uppercase flex items-center gap-4">
                  Skills
                  <div className="h-px bg-gradient-to-r from-brand-cyan/50 to-transparent flex-1" />
                </h2>
                <Tooltip text="Filter the projects by skill" position="top" align="left">
                  <Link href="/projects" className="block">
                    <div className="flex flex-wrap gap-2.5 cursor-pointer">
                      <SkillBadge icon={FaPython} color="#FFD43B">Python</SkillBadge>
                      <SkillBadge icon={FaJava} color="#ED8B00">Java</SkillBadge>
                      <SkillBadge icon={SiCplusplus} color="#00599C">C++</SkillBadge>
                      <SkillBadge icon={SiTypescript} color="#3178C6">TypeScript</SkillBadge>
                      <SkillBadge icon={SiNextdotjs} color="#FFFFFF">Next.js</SkillBadge>
                      <SkillBadge icon={FaReact} color="#61DAFB">React</SkillBadge>
                      <SkillBadge icon={SiTailwindcss} color="#38BDF8">Tailwind CSS</SkillBadge>
                      <SkillBadge icon={FaNodeJs} color="#339933">Node.js</SkillBadge>
                      <SkillBadge icon={SiMysql} color="#4479A1">MySQL</SkillBadge>
                      <SkillBadge icon={FaDocker} color="#2496ED">Docker</SkillBadge>
                      <SkillBadge icon={FaAws} color="#FF9900">AWS</SkillBadge>
                      <SkillBadge icon={FaLinux} color="#FCC624">Linux</SkillBadge>
                    </div>
                  </Link>
                </Tooltip>
              </div>

              <ProgressBar label="Full Stack" percentage={95} />
              <ProgressBar label="Information Technology" percentage={88} />
              <ProgressBar label="Artificial Intelligence" percentage={80} />
            </div>
          </div>

          {/* SECTION 2: RECENT PROJECTS */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-8 tracking-widest uppercase flex items-center gap-4">
              Recent Projects
              <div className="h-px bg-gradient-to-r from-brand-cyan/50 to-transparent flex-1" />
            </h2>
            
            <ProjectCarousel projects={recentProjects} />
          </div>

          {/* SECTION 3: TESTIMONIALS */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-8 tracking-widest uppercase flex items-center gap-4">
              Testimonials
              <div className="h-px bg-gradient-to-r from-brand-cyan/50 to-transparent flex-1" />
            </h2>
            <TestimonialCards />
          </div>

          {/* SECTION 4: GOALS & SERVICES */}
          <h2 className="text-2xl font-bold text-white mb-8 tracking-wider uppercase flex items-center gap-4 mt-8">
            Goals
            <div className="h-px bg-gradient-to-r from-brand-pink/50 to-transparent flex-1" />
          </h2>

          <div className="mb-8 w-full">
            <MyGoals />
          </div>

          <ServicesSection />

          <div className="w-full mb-16 mt-16">
            <h2 className="text-3xl font-extrabold text-white mb-8 tracking-widest uppercase flex items-center gap-4">
              Portfolio
              <div className="h-px bg-gradient-to-r from-brand-cyan/50 to-transparent flex-1" />
            </h2>
            <RandomRepoShoutout />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full auto-rows-[minmax(180px,auto)] pb-24">
            
            {/* Location/Weather Box */}
            <BentoBox className="order-2 md:col-span-1 md:row-span-1 !p-0 !bg-black/80" delay={0.2} title="~/WEATHER">
              {(isMaximized) => <WeatherWidget isMaximized={isMaximized} />}
            </BentoBox>

            {/* Quick Contact Box */}
            <BentoBox className="order-3 md:col-span-1 md:row-span-1 !p-0 !bg-black/80" delay={0.3} title="~/CONTACT">
              <div className="p-6 flex flex-col justify-between h-full bg-gradient-to-br hover:from-brand-pink/5 hover:to-transparent transition-colors duration-500">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full bg-brand-pink/10 border border-brand-pink/30 flex items-center justify-center group-hover:shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-pink) 40%, transparent)] transition-all duration-300">
                    <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-pink shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-pink) 80%, transparent)]"></span>
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Let's work together</p>
                  <a href="mailto:C.mandujano.borjas@gmail.com" className="text-white font-bold text-sm hover:text-brand-pink transition-colors truncate block">
                    Send an Email ↗
                  </a>
                </div>
              </div>
            </BentoBox>



            {/* Roles/Experience Box */}
            <BentoBox className="order-4 md:col-span-2 md:row-span-1 !p-0 !bg-black/80" delay={0.4} title="~/EXPERIENCE">
              <div className="p-6 h-full flex flex-col justify-center">
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
                    <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20 font-bold tracking-wider">HARDWARE</span>
                  </div>
                  <div className="flex justify-between items-center hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                    <div>
                      <p className="text-white font-bold text-sm">CIS Lab Assistant</p>
                      <p className="text-slate-400 text-xs mt-0.5">Community College of Denver</p>
                    </div>
                    <span className="text-[10px] text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/20 font-bold tracking-wider">SUPPORT</span>
                  </div>
                </div>
              </div>
            </BentoBox>


            {/* Trending Repo Box */}
            <BentoBox className="order-6 md:col-span-4 md:row-span-1 !p-0 !bg-black/80" delay={0.6} title="~/TRENDING_NOW">
              <TrendingRepoShoutout />
            </BentoBox>

          </div>
        </div>
      </main>
          </div>
    </div>
  )
}
