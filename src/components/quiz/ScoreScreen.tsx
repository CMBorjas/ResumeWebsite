'use client'

import { motion } from 'framer-motion'
import { Trophy, RefreshCw, Cpu } from 'lucide-react'

type ScoreScreenProps = {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export default function ScoreScreen({ score, totalQuestions, onRestart }: ScoreScreenProps) {
  
  const percentage = (score / totalQuestions) * 100
  
  let rank = 'NOVICE'
  let color = 'text-gray-400'
  let glow = 'drop-shadow-[0_0_10px_rgba(156,163,175,0.8)]'
  
  if (percentage === 100) {
    rank = 'NETRUNNER (FLAWLESS)'
    color = 'text-[var(--color-primary)]'
    glow = 'drop-shadow-[0_0_15px_var(--color-primary)]'
  } else if (percentage >= 80) {
    rank = 'SENIOR ARCHITECT'
    color = 'text-green-400'
    glow = 'drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]'
  } else if (percentage >= 60) {
    rank = 'JUNIOR HACKER'
    color = 'text-yellow-400'
    glow = 'drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]'
  } else {
    rank = 'SYSTEM COMPROMISED'
    color = 'text-red-500'
    glow = 'drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-black/60 backdrop-blur-md border border-[var(--color-primary)] p-8 md:p-12 rounded-2xl shadow-[0_0_30px_rgba(0,255,225,0.15)] flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary)]/10 via-transparent to-transparent opacity-50" />
        
        <Trophy className={`w-20 h-20 mb-6 ${color} ${glow} z-10`} />
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono uppercase tracking-widest z-10">
          Simulation Complete
        </h2>
        
        <p className="text-gray-400 text-lg font-mono mb-8 z-10">
          Nodes Secured: <span className="text-white font-bold">{score} / {totalQuestions}</span>
        </p>

        <div className={`mb-12 border border-current px-6 py-3 rounded-full ${color} ${glow} bg-black/50 z-10 flex items-center gap-3`}>
          <Cpu className="w-5 h-5" />
          <span className="font-bold tracking-[0.2em] uppercase text-sm md:text-base">
            Rank: {rank}
          </span>
        </div>

        <button
          onClick={onRestart}
          className="z-10 group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest font-mono rounded hover:bg-[var(--color-primary)] hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Re-initialize Link
        </button>
      </motion.div>
    </div>
  )
}
