"use client";

import Link from 'next/link';
import Image from 'next/image';
import headshotImage from '../../public/images/profile/Headshot_nobg.png';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPython, FaJava, FaReact, FaNodeJs, FaDocker, FaAws, FaLinux } from 'react-icons/fa';
import { SiBluesky, SiCplusplus, SiTypescript, SiNextdotjs, SiTailwindcss, SiMysql } from 'react-icons/si';
import Tooltip from '../components/Tooltip';
import RandomRepoShoutout from '../components/RandomRepoShoutout';

import TestimonialCards from '../components/TestimonialCards';
import ProjectCarousel from '../components/ProjectCarousel';
import { projects } from '../lib/projects';
import { workEntries, educationEntries, activityEntries, type ExperienceEntry } from '../lib/experience';
import MyGoals from '../components/MyGoals';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';



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
    <div
      className="relative w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <div className="absolute -inset-3 rounded-full border-2 border-brand-cyan/20 border-t-brand-cyan animate-[spin_3s_linear_infinite]" />
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
          <text className="text-[11px] font-bold tracking-[0.3em] uppercase fill-brand-cyan drop-shadow-[0_0_5px_rgba(0,255,225,0.8)]">
            <textPath href="#circlePath" startOffset="0%">
              HIRE ME • HIRE ME • HIRE ME •
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink opacity-20 blur-xl animate-pulse" />

      {/* Animated Scroll Arrows */}
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <svg className="w-5 h-5 text-brand-cyan animate-bounce drop-shadow-[0_0_8px_rgba(0,255,225,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

/* ═══════════════════════════════════════════════════════════════════════════
 * TimelineEntry — A single row in the Experience timeline.
 * Date range on the left, content card on the right, with inline accordion.
 * ═══════════════════════════════════════════════════════════════════════════ */
const TAG_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  cyan: { text: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'border-brand-cyan/20' },
  pink: { text: 'text-brand-pink', bg: 'bg-brand-pink/10', border: 'border-brand-pink/20' },
  green: { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
};

const TimelineEntry = ({ entry, index, delay }: { entry: ExperienceEntry; index: number; delay: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const tagStyle = TAG_COLORS[entry.tagColor] || TAG_COLORS.cyan;
  const seqNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, type: 'spring', bounce: 0.15 }}
      className="flex gap-4 md:gap-8 items-stretch group"
    >
      {/* Left: Date Range Box */}
      <div className="hidden md:flex flex-col items-center w-[180px] shrink-0">
        <div className="border border-dashed border-white/20 rounded-2xl px-5 py-4 text-center group-hover:border-brand-cyan/40 transition-colors duration-300">
          <span className="text-brand-cyan font-mono text-sm tracking-wider font-bold">{entry.dateRange}</span>
        </div>
      </div>

      {/* Right: Content Card */}
      <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-cyan/20 hover:bg-white/[0.05] transition-all duration-300">
        <div className="p-5 md:p-6">
          {/* Mobile-only date */}
          <span className="md:hidden text-brand-cyan font-mono text-xs tracking-wider font-bold mb-2 block">{entry.dateRange}</span>

          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold text-base md:text-lg uppercase tracking-wide leading-tight">{entry.title}</h4>
              <p className="text-slate-400 text-xs md:text-sm mt-1">{entry.organization} — {entry.location}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`text-[10px] ${tagStyle.text} ${tagStyle.bg} px-3 py-1 rounded-full border ${tagStyle.border} font-bold tracking-wider hidden sm:inline-block`}>
                {entry.tag}
              </span>
              <span className="text-white/10 text-2xl md:text-3xl font-black tabular-nums select-none">{seqNumber}</span>
            </div>
          </div>

          {/* KNOW MORE toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold hover:text-brand-cyan transition-colors flex items-center gap-2 group/btn"
          >
            <span>{isExpanded ? 'SHOW LESS' : 'KNOW MORE'}</span>
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-3 h-3 group-hover/btn:text-brand-cyan transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          {/* Accordion Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                  {entry.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className="text-slate-400 text-xs md:text-sm leading-relaxed flex gap-2"
                    >
                      <span className="text-brand-cyan mt-1 shrink-0">▸</span>
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
 * ExperienceTimeline — Full section with massive typographic header,
 * icon dividers, and staggered timeline entries for work + education.
 * ═══════════════════════════════════════════════════════════════════════════ */
const ExperienceTimeline = () => {
  return (
    <section className="w-full mt-24 mb-16 relative">
      {/* ── Massive Typographic Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-24 relative"
      >
        <p className="text-brand-cyan text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-4">
          My Studying &amp; Working Experience
        </p>
        {/* Massive section title */}
        <h2 className="text-[14vw] md:text-[8vw] lg:text-[7vw] font-black text-white/[0.06] leading-none tracking-tighter select-none pointer-events-none">
          EXPERIENCE
        </h2>
      </motion.div>

      {/* ── Work Experience Sub-section ── */}
      {/* Icon Divider: Briefcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-12"
      >
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/15 flex items-center justify-center bg-white/[0.02]">
          <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </motion.div>

      {/* Timeline: Work Entries */}
      <div className="relative">
        {/* Vertical dashed line */}
        <div className="hidden md:block absolute left-[90px] top-0 bottom-0 w-px border-l border-dashed border-white/10" />

        <div className="space-y-6 md:space-y-8">
          {workEntries.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} delay={i * 0.15} />
          ))}
        </div>
      </div>

      {/* ── Education Sub-section ── */}
      {/* Icon Divider: Graduation Cap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center my-16"
      >
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/15 flex items-center justify-center bg-white/[0.02]">
          <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6.5" />
          </svg>
        </div>
      </motion.div>

      {/* Timeline: Education Entries */}
      <div className="relative">
        {/* Vertical dashed line */}
        <div className="hidden md:block absolute left-[90px] top-0 bottom-0 w-px border-l border-dashed border-white/10" />

        <div className="space-y-6 md:space-y-8">
          {educationEntries.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} delay={i * 0.15} />
          ))}
        </div>
      </div>

      {/* ── Clubs & Activities Sub-section ── */}
      {/* Icon Divider: Users/Groups */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center my-16"
      >
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/15 flex items-center justify-center bg-white/[0.02]">
          <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </motion.div>

      {/* Timeline: Activity Entries */}
      <div className="relative">
        {/* Vertical dashed line */}
        <div className="hidden md:block absolute left-[90px] top-0 bottom-0 w-px border-l border-dashed border-white/10" />

        <div className="space-y-6 md:space-y-8">
          {activityEntries.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

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
          <h2 className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black text-[var(--text-base)] opacity-5 text-center w-full px-4 whitespace-normal tracking-tighter leading-[0.9] select-none break-words">
            COMPUTER SCIENCE<br />GRADUATE
          </h2>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
          <h2 className="text-[10vw] md:text-[8vw] lg:text-[7vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink opacity-80 text-center w-full px-4 whitespace-normal tracking-tighter leading-[0.9] select-none break-words">
            COMPUTER SCIENCE<br />GRADUATE
          </h2>
        </div>

        {/* Bottom Area: Socials & Headshot */}
        <div className="relative z-20 flex justify-between items-end p-8 lg:p-12 h-full">

          {/* Bottom Left: Badge & Socials */}
          <div className="flex flex-col justify-end gap-16 md:gap-20 pb-24 md:pb-32 items-start relative z-30">
            {/* Hovering Circular Badge */}
            <div className="scale-[1.5] md:scale-[2] ml-12 md:ml-16 mb-4">
              <CircularText />
            </div>

            <div className="flex gap-6">
              <a href="https://github.com/CMBorjas" target="_blank" rel="noreferrer" className="text-white hover:text-brand-cyan hover:scale-110 hover:drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)] transition-all duration-300">
                <FaGithub className="w-8 h-8" />
              </a>
              <a href="https://linkedin.com/in/christian-mandujano-borjas" target="_blank" rel="noreferrer" className="text-[#0077b5] hover:text-[#00a0dc] hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,119,181,0.8)] transition-all duration-300">
                <FaLinkedin className="w-8 h-8" />
              </a>
              <a href="#" className="text-[#05a0fa] hover:text-[#38bdf8] hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(5,160,250,0.8)] transition-all duration-300" title="Bluesky (Pending)">
                <SiBluesky className="w-8 h-8" />
              </a>
              <a href="mailto:C.mandujano.borjas@gmail.com" className="text-brand-pink hover:text-brand-cyan hover:scale-110 hover:drop-shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)] transition-all duration-300">
                <FaEnvelope className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Bottom Right: Headshot & Spinning Badge */}
          <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[700px] flex justify-end items-end h-[60vh] md:h-[80vh]">
            <Image src={headshotImage} alt="Christian Mandujano Borjas" fill className="object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-none scale-[2.0] origin-bottom" priority />

          </div>
        </div>
      </section>

      {/* SPLIT LAYOUT SECTION */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#0a0f18]/80 backdrop-blur-sm relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">

        {/* LEFT SIDEBAR (STICKY ON DESKTOP) */}
        <aside className="w-full lg:w-[350px] xl:w-[400px] lg:h-screen lg:sticky lg:top-0 bg-[#05080f] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between p-8 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.6)]">

          {/* Top: Avatar & Status */}
          <div className="flex flex-col items-center mt-4">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-brand-cyan/30 mb-6 relative shadow-[0_0_25px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)]">
              <Image src={headshotImage} alt="Christian Mandujano Borjas" fill className="object-cover" priority />
            </div>
            <div className="flex items-center gap-2 mb-8 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_color-mix(in srgb, var(--color-green-500) 80%, transparent)]"></span>
              <span className="text-[10px] text-slate-300 tracking-[0.2em] uppercase font-bold">Available For Hire</span>
            </div>
          </div>

          {/* Middle: Name & Title */}
          <div className="text-center my-6 flex-1 flex flex-col justify-center">
            <h1 className="text-3xl xl:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">Christian<br />Mandujano Borjas</h1>
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
                <ProgressBar label="Artificial Intelligence" percentage={95} />
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

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* SECTION: EXPERIENCE TIMELINE                               */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <ExperienceTimeline />

          </div>
        </main>
      </div>

      {/* FULL BLEED CONTACT SECTION */}
      <ContactSection />
    </div>
  )
}
