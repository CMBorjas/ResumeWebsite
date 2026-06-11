"use client";

import { motion } from 'framer-motion';
import { FaThumbsUp, FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';

export default function PricingPage() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-transparent relative z-10 pt-24 pb-16">
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] mb-4"
          >
            Support the Network
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-mono text-sm max-w-xl mx-auto"
          >
            Choose a tier to fuel the servers, upgrade the cybernetics, and keep the grid online. Secure transactions guaranteed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Tier 1: Thumbs up */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-brand-cyan/40 hover:shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)] transition-all duration-300 flex flex-col relative group h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6 border border-brand-cyan/20">
                <FaThumbsUp className="text-brand-cyan text-xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Supporter</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Show your appreciation with a digital thumbs up.</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white">Free</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Good karma</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Virtual high five</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Moral support</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-brand-cyan/50 text-brand-cyan font-bold hover:bg-brand-cyan hover:text-black hover:shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)] transition-all uppercase tracking-wider text-sm mt-auto">
                Send Thumbs Up
              </button>
            </div>
          </motion.div>

          {/* Tier 2: Dollar (Recommended) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0a0f18] backdrop-blur-xl border-2 border-brand-pink rounded-3xl p-8 shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-pink) 20%, transparent)] hover:shadow-[0_0_40px_color-mix(in srgb, var(--color-brand-pink) 30%, transparent)] transition-all duration-300 flex flex-col relative group transform md:scale-105 z-10 h-full md:h-[105%]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-pink text-black text-[10px] font-extrabold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-pink) 60%, transparent)] z-20">
              Recommended
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center mb-6 border border-brand-pink/50">
                <FaDollarSign className="text-brand-pink text-xl drop-shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-pink) 80%, transparent)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enthusiast</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Buy me a coffee to keep the code compiling.</p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">$1</span>
                <span className="text-slate-400 ml-2 font-mono text-xs">/one-time</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-pink mr-3 font-bold">✓</span> Everything in Supporter</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-pink mr-3 font-bold">✓</span> Caffeine contribution</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-pink mr-3 font-bold">✓</span> Name in commit history</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-pink mr-3 font-bold">✓</span> VIP status</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-brand-pink text-black font-extrabold hover:bg-brand-pink/90 hover:shadow-[0_0_20px_color-mix(in srgb, var(--color-brand-pink) 60%, transparent)] transition-all uppercase tracking-wider text-sm mt-auto">
                Donate $1
              </button>
            </div>
          </motion.div>

          {/* Tier 3: 5 Bucks */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0a0f18]/80 backdrop-blur-xl border border-brand-cyan/20 rounded-3xl p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-brand-cyan/40 hover:shadow-[0_0_30px_color-mix(in srgb, var(--color-brand-cyan) 15%, transparent)] transition-all duration-300 flex flex-col relative group h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6 border border-brand-cyan/20">
                <FaMoneyBillWave className="text-brand-cyan text-xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sponsor</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Help me buy server space and custom domains.</p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-white">$5</span>
                <span className="text-slate-400 ml-2 font-mono text-xs">/one-time</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Everything in Enthusiast</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Server fund contribution</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Personalized thank you</li>
                <li className="flex items-start text-sm text-slate-300"><span className="text-brand-cyan mr-3 font-bold">✓</span> Extreme gratitude</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-brand-cyan/50 text-brand-cyan font-bold hover:bg-brand-cyan hover:text-black hover:shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 50%, transparent)] transition-all uppercase tracking-wider text-sm mt-auto">
                Donate $5
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
