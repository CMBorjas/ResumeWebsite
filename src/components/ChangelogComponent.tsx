"use client";

import { motion } from "framer-motion";
import changelogData from "../lib/changelog.json";

export default function ChangelogComponent() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="relative border-l-2 border-brand-cyan/20 ml-4 md:ml-0">
        {changelogData.map((log, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 relative pl-8 md:pl-12 group"
          >
            {/* Timeline node */}
            <div className="absolute w-4 h-4 rounded-full bg-[#0a0f18] border-[3px] border-brand-cyan left-[-9px] top-1.5 group-hover:bg-brand-cyan group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_80%,transparent)] transition-all duration-300"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline mb-3">
              <h3 className="text-xl font-bold text-white tracking-wide">
                <span className="text-brand-pink drop-shadow-[0_0_5px_color-mix(in_srgb,var(--color-brand-pink)_80%,transparent)] mr-2">{log.version}</span>
                <span className="text-slate-500 mx-2 hidden md:inline">|</span>
                {log.title}
              </h3>
              <span className="text-xs font-mono text-brand-cyan/60 mt-1 md:mt-0 md:ml-auto block tracking-widest">{log.date}</span>
            </div>
            
            <div className="bg-[#0a0f18]/80 backdrop-blur-md border border-brand-cyan/10 rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:border-brand-cyan/30 group-hover:shadow-[0_4px_30px_color-mix(in_srgb,var(--color-brand-cyan)_10%,transparent)] transition-all duration-300">
              <p className="text-slate-400 text-sm mb-5 leading-relaxed border-b border-white/5 pb-4">{log.description}</p>
              
              <ul className="space-y-3">
                {log.changes.map((change, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-300">
                    <span className="text-brand-cyan mr-3 font-bold opacity-80 mt-0.5">›</span> 
                    <span className="leading-snug">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
