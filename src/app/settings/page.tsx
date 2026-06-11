'use client'

import React from 'react'
import { useTheme } from '../../components/ThemeProvider'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-8 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
        <h1 className="text-3xl font-extrabold text-brand-cyan mb-8 border-b border-brand-cyan/20 pb-4">Settings</h1>
        
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Theme Preferences</h2>
          <p className="text-sm text-slate-400 mb-6">Select a visual theme for the entire portfolio. Currently, only the Cyberpunk theme is fully implemented.</p>
          
          <div className="flex flex-wrap gap-6">
            {/* Cyberpunk */}
            <div 
              onClick={() => setTheme('cyberpunk')}
              className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                theme === 'cyberpunk' 
                  ? 'border-brand-cyan bg-brand-cyan/10 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] scale-105' 
                  : 'border-slate-700 bg-[#0d1117] hover:border-brand-cyan/50'
              }`}
            >
              <div 
                className="w-12 h-12 rounded-full shadow-lg"
                style={{ background: "linear-gradient(135deg, #00ffe1, #ff0f4d)" }}
              />
              <span className={`font-bold text-sm uppercase tracking-wider ${theme === 'cyberpunk' ? 'text-brand-cyan' : 'text-slate-300'}`}>
                Cyberpunk
              </span>
            </div>

            {/* Forestpunk */}
            <div 
              className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-slate-800 bg-[#0d1117] opacity-50 cursor-not-allowed"
              title="Under Construction"
            >
              <div 
                className="w-12 h-12 rounded-full"
                style={{ background: "linear-gradient(135deg, #00ff88, #ff9900)" }}
              />
              <span className="font-bold text-sm uppercase tracking-wider text-slate-500">
                Forestpunk
              </span>
              <span className="text-[10px] text-yellow-500 uppercase font-bold px-2 py-0.5 border border-yellow-500/30 rounded-full bg-yellow-500/10">WIP</span>
            </div>

            {/* Corporate */}
            <div 
              className="flex flex-col items-center gap-3 p-4 rounded-lg border-2 border-slate-800 bg-[#0d1117] opacity-50 cursor-not-allowed"
              title="Under Construction"
            >
              <div 
                className="w-12 h-12 rounded-full"
                style={{ background: "linear-gradient(135deg, #ffffff, #0066cc)" }}
              />
              <span className="font-bold text-sm uppercase tracking-wider text-slate-500">
                Corporate
              </span>
              <span className="text-[10px] text-yellow-500 uppercase font-bold px-2 py-0.5 border border-yellow-500/30 rounded-full bg-yellow-500/10">WIP</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Navigation</h2>
          <p className="text-sm text-slate-400 mb-6">Your hexagon menu position can also be toggled directly from the menu itself.</p>
          <div className="bg-[#0d1117] p-4 rounded-lg border border-slate-700 max-w-sm">
            <p className="text-sm text-brand-cyan italic">Navigation position preference is stored in your local browser storage and managed by the menu toggle.</p>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Secondary Modules</h2>
          <p className="text-sm text-slate-400 mb-6">Access additional tools, utilities, and project history that have been removed from the main navigation bar to reduce clutter.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/changelog" className="bg-[#0d1117] p-6 rounded-lg border border-slate-700 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all group flex flex-col items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-brand-cyan transition-colors">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="font-bold text-sm text-slate-300 group-hover:text-brand-cyan tracking-wider">CHANGELOG</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
