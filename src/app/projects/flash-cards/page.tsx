import React from 'react'
import FlashCardDeck from '../../../components/FlashCardDeck'

export default function FlashCardsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center gap-4 uppercase tracking-widest">
          <span className="text-brand-purple">{'//'}</span>
          Neural_Imprint
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto">
          A high-performance flash card system built with `framer-motion` for fluid 3D transformations. Progress is persistently tracked locally via the browser's `localStorage` engine.
        </p>
      </div>

      <FlashCardDeck />
    </div>
  )
}
