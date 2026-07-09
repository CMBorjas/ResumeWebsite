'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NumberGuessingGame() {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('Awaiting neural input...')
  const [attempts, setAttempts] = useState(0)
  const [hasWon, setHasWon] = useState(false)
  const [history, setHistory] = useState<number[]>([])
  
  const inputRef = useRef<HTMLInputElement>(null)

  const initializeGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setFeedback('Enter a sequence between 1 and 100.')
    setAttempts(0)
    setHasWon(false)
    setHistory([])
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault()
    if (hasWon) return

    const num = parseInt(guess, 10)
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback('Invalid sequence. Must be 1-100.')
      setGuess('')
      return
    }

    setAttempts(prev => prev + 1)
    setHistory(prev => [num, ...prev].slice(0, 5))

    if (num === targetNumber) {
      setFeedback('ACCESS GRANTED. Sequence matched.')
      setHasWon(true)
    } else if (num < targetNumber) {
      setFeedback('Sequence too low. Recalibrating...')
      setGuess('')
      inputRef.current?.focus()
    } else {
      setFeedback('Sequence too high. Recalibrating...')
      setGuess('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-xl p-6 border-2 border-brand-pink/50 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-pink)_30%,transparent)] relative overflow-hidden group max-w-md w-full mx-auto">
      <div className="absolute inset-0 border-2 border-brand-pink opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none rounded-xl"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-brand-pink flex items-center gap-2 font-mono uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></span>
          Terminal_Link
        </h2>
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          Attempts: {attempts}
        </span>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        
        {/* Main Display */}
        <div className={`w-full bg-slate-900/80 border text-center rounded-lg p-6 font-mono transition-all ${
          hasWon ? 'border-brand-green shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-green)_40%,transparent)]' : 'border-slate-700'
        }`}>
          <div className="text-4xl font-bold mb-2">
            {hasWon ? (
              <span className="text-brand-green">{targetNumber}</span>
            ) : (
              <span className="text-brand-pink animate-pulse">? ? ?</span>
            )}
          </div>
          <p className={`text-sm tracking-wide ${hasWon ? 'text-brand-green' : 'text-slate-400'}`}>
            {feedback}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGuess} className="flex gap-2">
          <input 
            ref={inputRef}
            type="number" 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={hasWon}
            placeholder="00"
            className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-lg p-3 outline-none focus:border-brand-pink/80 focus:shadow-[0_0_10px_color-mix(in_srgb,var(--color-brand-pink)_40%,transparent)] transition-all font-mono text-xl text-center disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={hasWon || !guess}
            className="bg-brand-pink text-black font-bold font-mono px-6 rounded-lg hover:bg-white hover:shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-pink)_80%,transparent)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            TRANSMIT
          </button>
        </form>

        {/* History & Controls */}
        <div className="flex justify-between items-end mt-2">
          <div className="flex flex-col gap-1 w-2/3">
            <label className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Recent Transmissions</label>
            <div className="flex gap-2 h-6">
              <AnimatePresence>
                {history.map((h, i) => (
                  <motion.div 
                    key={`${h}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded"
                  >
                    {h}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <button 
            onClick={initializeGame}
            className="text-xs font-mono text-slate-400 hover:text-brand-pink underline transition-colors"
          >
            [ REBOOT_SYS ]
          </button>
        </div>

      </div>
    </div>
  )
}
