import React from 'react'
import NumberGuessingGame from '../../../components/NumberGuessingGame'

export default function NumberGuessingGamePage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center md:justify-start gap-4 uppercase tracking-widest">
          <span className="text-brand-pink">{'//'}</span>
          Terminal_Link
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
          A client-side neural decryption mini-game. Utilize binary search principles to narrow down the target sequence. Built entirely with React hooks and framer-motion for UI interactions.
        </p>
      </div>

      <div className="flex justify-center mt-12">
        <NumberGuessingGame />
      </div>
    </div>
  )
}
