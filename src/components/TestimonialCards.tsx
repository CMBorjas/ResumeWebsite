"use client";

import { motion } from 'framer-motion';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {testimonials.map((testimonial, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-full flex flex-col group hover:shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)] hover:border-brand-cyan/40 transition-all duration-300 relative overflow-hidden min-h-[200px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <span className="absolute -top-4 -left-2 text-6xl text-brand-cyan/20 font-serif z-0">"</span>
          
          <p className="text-sm text-slate-300 italic mb-6 relative z-10 flex-1 pl-4 border-l-2 border-brand-pink/50 leading-relaxed mt-4">
            {testimonial.quote}
          </p>
          
          <div className="flex items-center gap-3 relative z-10 mt-auto pt-4 border-t border-brand-cyan/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-cyan to-brand-pink p-[1px] shrink-0">
              <div className="w-full h-full rounded-full bg-[#0a0f18] flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {testimonial.author.charAt(0)}
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate group-hover:text-brand-cyan transition-colors">{testimonial.author}</p>
              <p className="text-xs text-brand-cyan truncate">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
