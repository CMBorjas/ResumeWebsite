'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FlashCardProps {
  frontContent: string
  backContent: string
  isFlipped: boolean
  onFlip: () => void
}

export default function FlashCard({ frontContent, backContent, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div className="relative w-full h-[350px] cursor-pointer [perspective:1000px]" onClick={onFlip}>
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-slate-900 border-2 border-brand-purple rounded-xl shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-purple)_30%,transparent)] flex flex-col items-center justify-center p-8 text-center">
          <div className="absolute top-4 left-4 text-xs font-mono text-brand-purple tracking-widest uppercase opacity-70">
            [ FRONT ]
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">{frontContent}</h3>
          <div className="absolute bottom-4 right-4 text-brand-purple animate-pulse">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#0a0f18] border-2 border-brand-cyan rounded-xl shadow-[0_0_20px_color-mix(in_srgb,var(--color-brand-cyan)_30%,transparent)] flex flex-col items-center justify-center p-8 text-center overflow-y-auto"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute top-4 left-4 text-xs font-mono text-brand-cyan tracking-widest uppercase opacity-70">
            [ BACK ]
          </div>
          <div className="text-lg text-slate-300 leading-relaxed font-mono">
            {backContent}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
