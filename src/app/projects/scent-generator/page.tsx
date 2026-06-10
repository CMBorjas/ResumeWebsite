'use client'

import { useState } from 'react'
import { pleasantScents, pungentScents } from '../../../lib/scents'

export default function ScentGeneratorPage() {
  const [currentScent, setCurrentScent] = useState<{pleasant: string, pungent: string} | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateScent = () => {
    setIsGenerating(true)
    
    // Simulate a brief calculation/generation delay for effect
    setTimeout(() => {
      const randomPleasant = pleasantScents[Math.floor(Math.random() * pleasantScents.length)]
      const randomPungent = pungentScents[Math.floor(Math.random() * pungentScents.length)]
      
      setCurrentScent({
        pleasant: randomPleasant,
        pungent: randomPungent
      })
      setIsGenerating(false)
    }, 400)
  }

  return (
    <div className="w-full max-w-[800px] mx-auto px-4 py-12">
      <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-8 border-2 border-brand-cyan/50 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] flex flex-col items-center text-center">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brand-cyan mb-2 shadow-brand-cyan drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 60%, transparent)]">
            Scent Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            A pleasant and putrid scent generator designed for the Memory Palace technique. Generate unexpected scent combinations to anchor your memories.
          </p>
        </div>

        <div className="w-full bg-[#0d1117] rounded-lg border border-slate-800 p-8 min-h-[200px] flex items-center justify-center mb-8 relative overflow-hidden">
          {/* Cyberpunk grid background effect */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,225,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,225,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {isGenerating ? (
              <div className="flex items-center gap-3 text-brand-cyan animate-pulse">
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xl tracking-widest uppercase">Synthesizing...</span>
              </div>
            ) : currentScent ? (
              <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="text-3xl font-bold text-white break-words">
                  <span className="text-brand-pink drop-shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-pink) 60%, transparent)]">
                    {currentScent.pleasant}
                  </span>
                  <span className="text-slate-500 mx-3">and</span>
                  <span className="text-yellow-400 drop-shadow-[0_0_8px_color-mix(in srgb, yellow 40%, transparent)]">
                    {currentScent.pungent}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-slate-600 text-lg tracking-widest uppercase">
                Awaiting Input
              </div>
            )}
          </div>
        </div>

        <button
          onClick={generateScent}
          disabled={isGenerating}
          className="group relative px-8 py-3 bg-brand-cyan/10 border-2 border-brand-cyan text-brand-cyan font-bold text-lg uppercase tracking-widest rounded transition-all hover:bg-brand-cyan hover:text-slate-900 hover:shadow-[0_0_20px_color-mix(in srgb, var(--color-brand-cyan) 80%, transparent)] focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="relative z-10">Generate Combo</span>
          <div className="absolute inset-0 bg-brand-cyan/20 blur-md group-hover:bg-brand-cyan/40 transition-all" />
        </button>
        
        <div className="mt-8 text-xs text-slate-500 text-center">
          Available via the <a href="https://github.com/CMBorjas/scentGenerator" target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">Scent Generator Repository</a>
        </div>
      </div>
    </div>
  )
}
