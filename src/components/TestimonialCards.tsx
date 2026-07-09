"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Christian is an exceptional problem solver. His ability to break down complex issues into manageable tasks is impressive.",
    author: "Jane Doe",
    role: "Senior Developer",
  },
  {
    quote: "Working with Christian was a breeze. He's a quick learner and brings great energy to the team.",
    author: "John Smith",
    role: "Project Manager",
  },
  {
    quote: "His attention to detail and dedication to writing clean, maintainable code sets him apart.",
    author: "Alice Johnson",
    role: "Tech Lead",
  },
  {
    quote: "A true professional. Christian consistently delivers high-quality work and is always willing to go the extra mile.",
    author: "Sarah Connor",
    role: "Product Owner",
  }
];

export default function TestimonialCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="p-6 h-full flex flex-col justify-center relative overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
        <svg className="w-4 h-4 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Testimonials
      </h3>

      <div className="relative flex-grow flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="relative">
              <span className="absolute -top-4 -left-2 text-4xl text-brand-cyan/20 font-serif">"</span>
              <p className="text-sm text-slate-300 italic mb-4 relative z-10 pl-4 border-l-2 border-brand-pink/50">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex items-center gap-3 pl-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#0a0f18] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{testimonials[currentIndex].author}</p>
                  <p className="text-[10px] text-brand-cyan">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 bg-brand-cyan shadow-[0_0_8px_color-mix(in srgb,var(--color-brand-cyan) 80%,transparent)]' 
                : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
