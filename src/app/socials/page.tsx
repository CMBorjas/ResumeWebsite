'use client';

import React from 'react';

const upcomingGoals = [
  { id: 'g1', title: 'Testimonial Cards', status: 'PENDING', desc: 'User endorsements and recommendations.' },
  { id: 'g2', title: 'Photo Showcase', status: 'PENDING', desc: 'Instagram/Facebook imported gallery via GitHub API.' },
  { id: 'g3', title: 'Personal Blog', status: 'PENDING', desc: 'Dedicated space for articles and tutorials.' },
  { id: 'g4', title: 'Photo Gallery 24hr Story', status: 'PENDING', desc: 'Ephemeral 24-hour photo updates.' },
];

export default function SocialsPage() {
  return (
    <section className="max-w-6xl mx-auto pt-8 space-y-12 pb-16 px-4">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-8 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] relative overflow-hidden group">
        <div className="absolute inset-0 border-2 border-brand-cyan opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>

        <h2 className="text-3xl font-bold text-brand-cyan drop-shadow-[0_0_8px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] tracking-wide mb-6">
          <span className="text-white mr-2">&gt;</span> SYSTEM.SOCIALS
        </h2>
        
        <p className="text-slate-300 mb-8 leading-relaxed max-w-3xl">
          This sector is currently under construction. Below is the master schematic for upcoming social integrations, dynamic feeds, and interactive experiments scheduled for future deployments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingGoals.map((goal) => (
            <div 
              key={goal.id} 
              className="bg-[#0d1117]/80 rounded-lg p-6 border border-brand-cyan/30 hover:border-brand-cyan/80 transition-all duration-300 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_40%,transparent)] group/card flex flex-col h-full relative overflow-hidden"
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none z-0"></div>
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white group-hover/card:text-brand-cyan transition-colors">
                  {goal.title}
                </h3>
                <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded ${
                  goal.status === 'PENDING' 
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' 
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {goal.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm flex-grow relative z-10 font-mono">
                {goal.desc}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-800/50 flex justify-between items-center relative z-10">
                <span className="text-xs text-brand-cyan/50 font-mono">ID: {goal.id}</span>
                <span className="text-xs text-slate-500 font-mono tracking-widest animate-pulse">AWAITING_DEPLOY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
