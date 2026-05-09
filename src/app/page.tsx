"use client";

import Link from 'next/link'
import styles from './page.module.css'
import { useState, useEffect } from 'react'

const paragraphs = [
  "I am Christian Mandujano Borjas, an aspiring software engineer currently pursuing a degree in Computer Science at the University of Colorado Denver. With a strong foundation in programming languages like Python, Java, and C++, I have a passion for solving complex problems and building efficient systems.",
  "I am currently working on a full stack web development project using HTML, CSS, and JavaScript. I have experience with database management using MySQL and SQLite, and I am familiar with cloud services like Google firebase and Amazon Web Services. I am also interested in cybersecurity and have experience with virus protection, firewall management, and backup & recovery.",
  "My experience as an I.T. Technician at The Monarch Casino and as a CIS Lab Assistant at the Community College of Denver has given me hands-on experience in hardware maintenance, networking, and team collaboration. I have worked with technologies such as Docker, Git, and cloud services like Google Cloud.",
  "In addition to my technical skills, I am passionate about model building, playing guitar, and Android development. I enjoy hiking and teaching self-defense as part of my diverse interests. I'm constantly learning and seeking new opportunities to improve both my technical and interpersonal skills."
];

let hasPlayedAnimation = false;

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = paragraphs.join("\n\n");

  useEffect(() => {
    // If it has already played during this session, just show the full text immediately
    if (hasPlayedAnimation) {
      setDisplayedText(fullText);
      setIsTypingDone(true);
      return;
    }

    let i = 0;
    // DOS effect usually is very fast. 10ms per character.
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
        hasPlayedAnimation = true; // Mark as played for this session
      }
    }, 10);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="max-w-4xl mx-auto mt-4">
      <h2 className={`mb-6 ${styles.aboutTitle} font-bold tracking-widest drop-shadow-[0_0_8px_rgba(0,255,225,0.8)]`}>ABOUT ME</h2>
      
      {/* DOS Terminal Window */}
      <div className="bg-black/85 rounded-sm p-6 shadow-[0_0_20px_rgba(0,255,225,0.15)] border border-brand-cyan/40 font-mono text-brand-cyan/90 min-h-[400px] relative overflow-hidden flex flex-col">
        {/* Decorative Top Bar for DOS feel */}
        <div className="absolute top-0 left-0 w-full h-6 bg-brand-cyan/20 border-b border-brand-cyan/40 flex items-center px-2">
          <span className="text-[10px] text-brand-cyan/80 font-mono tracking-widest">C:\SYSTEM\ABOUT_ME.EXE</span>
        </div>
        
        <div className="mt-4 flex-grow">
          <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
            <span className="text-brand-pink mr-2">&gt;</span>{displayedText}
            <span className={`${isTypingDone ? 'animate-pulse' : ''} inline-block w-2 h-4 bg-brand-cyan align-middle ml-1`}></span>
          </p>
        </div>

        <div className={`mt-8 flex gap-4 transition-opacity duration-1000 ${isTypingDone ? 'opacity-100' : 'opacity-0'}`}>
          <Link className="px-5 py-2.5 bg-brand-pink/90 hover:bg-brand-pink transition-all duration-300 rounded-sm text-white font-sans font-bold shadow-[0_0_15px_rgba(255,15,77,0.3)] hover:shadow-[0_0_25px_rgba(255,15,77,0.6)] uppercase tracking-wider text-sm" href="/projects">
            View Projects
          </Link>
          <Link className="px-5 py-2.5 border border-brand-cyan/50 hover:bg-brand-cyan/10 hover:border-brand-cyan transition-all duration-300 rounded-sm text-brand-cyan font-sans uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(0,255,225,0.1)] hover:shadow-[0_0_20px_rgba(0,255,225,0.3)]" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
