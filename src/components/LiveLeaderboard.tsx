'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Player {
  id: string
  name: string
  score: number
  trend: 'up' | 'down' | 'stable'
  avatar: string
}

const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'ZeroCool', score: 9540, trend: 'stable', avatar: 'ZC' },
  { id: '2', name: 'AcidBurn', score: 8900, trend: 'stable', avatar: 'AB' },
  { id: '3', name: 'CrashOverride', score: 8200, trend: 'stable', avatar: 'CO' },
  { id: '4', name: 'PhantomPhreak', score: 7150, trend: 'stable', avatar: 'PP' },
  { id: '5', name: 'CerealKiller', score: 6800, trend: 'stable', avatar: 'CK' },
  { id: '6', name: 'LordNikon', score: 6200, trend: 'stable', avatar: 'LN' },
  { id: '7', name: 'Joey', score: 4500, trend: 'stable', avatar: 'JY' },
  { id: '8', name: 'Plague', score: 3100, trend: 'stable', avatar: 'PL' },
]

export default function LiveLeaderboard() {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS)
  const [isLive, setIsLive] = useState(false)

  // Simulation loop
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setPlayers(currentPlayers => {
        // Pick a random player to update
        const playerIndex = Math.floor(Math.random() * currentPlayers.length)
        const pointGain = Math.floor(Math.random() * 500) + 50
        
        const newPlayers = currentPlayers.map((player, idx) => {
          if (idx === playerIndex) {
            return {
              ...player,
              score: player.score + pointGain,
              trend: 'up' as const
            }
          }
          // Reset others to stable randomly
          return {
            ...player,
            trend: Math.random() > 0.8 ? 'down' as const : 'stable' as const
          }
        })

        // Sort descending
        return newPlayers.sort((a, b) => b.score - a.score)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      {/* Header Panel */}
      <div className="bg-[#0a0f18]/90 backdrop-blur-md rounded-t-xl border-x border-t border-brand-purple/50 p-6 flex justify-between items-center shadow-[0_-10px_20px_color-mix(in_srgb,var(--color-brand-purple)_15%,transparent)]">
        <div>
          <h2 className="text-2xl font-bold text-white font-mono uppercase tracking-widest flex items-center gap-3">
            <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Global_Rankings
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">SIMULATED WEBSOCKET STREAM</p>
        </div>
        
        <button 
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold transition-all ${
            isLive 
              ? 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
              : 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan hover:bg-brand-cyan/20'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-brand-cyan'}`} />
          {isLive ? 'DISCONNECT' : 'ESTABLISH LINK'}
        </button>
      </div>

      {/* Leaderboard Body */}
      <div className="bg-[#0a0f18]/80 backdrop-blur-md rounded-b-xl border border-brand-purple/50 p-4 min-h-[500px]">
        
        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-mono text-slate-500 uppercase tracking-widest border-b border-slate-800 mb-4">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">Operative</div>
          <div className="col-span-4 text-right">Reputation</div>
        </div>

        {/* Player Rows (Animated using framer-motion layout feature) */}
        <div className="flex flex-col gap-2 relative">
          <AnimatePresence>
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg border transition-colors ${
                  index === 0 
                    ? 'bg-brand-purple/10 border-brand-purple shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-purple)_30%,transparent)]' 
                    : index === 1
                    ? 'bg-brand-cyan/10 border-brand-cyan'
                    : index === 2
                    ? 'bg-brand-pink/10 border-brand-pink'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                {/* Rank */}
                <div className="col-span-2 flex justify-center items-center">
                  <span className={`font-mono font-bold text-xl ${
                    index === 0 ? 'text-brand-purple' : index === 1 ? 'text-brand-cyan' : index === 2 ? 'text-brand-pink' : 'text-slate-500'
                  }`}>
                    #{index + 1}
                  </span>
                </div>

                {/* Avatar & Name */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-black ${
                    index === 0 ? 'bg-brand-purple' : index === 1 ? 'bg-brand-cyan' : index === 2 ? 'bg-brand-pink' : 'bg-slate-600'
                  }`}>
                    {player.avatar}
                  </div>
                  <span className="font-bold text-white font-mono truncate">{player.name}</span>
                </div>

                {/* Score & Trend */}
                <div className="col-span-4 flex justify-end items-center gap-3">
                  <motion.span 
                    key={player.score} // Animate when score changes
                    initial={{ y: -10, color: '#10b981' }} // Green when updating
                    animate={{ y: 0, color: '#f8fafc' }}   // Slate-50 default
                    className="font-mono font-bold text-lg"
                  >
                    {player.score.toLocaleString()}
                  </motion.span>
                  
                  <div className="w-4 h-4 flex items-center justify-center">
                    {player.trend === 'up' && <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>}
                    {player.trend === 'down' && <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>}
                    {player.trend === 'stable' && <span className="text-slate-600">-</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
