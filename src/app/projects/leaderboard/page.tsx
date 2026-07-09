import React from 'react'
import LiveLeaderboard from '../../../components/LiveLeaderboard'

export default function LeaderboardPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center gap-4 uppercase tracking-widest">
          <span className="text-brand-purple">{'//'}</span>
          Global_Rankings
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto">
          A real-time data visualization component showcasing dynamic ranking swaps. Utilizes the `framer-motion` layout engine to execute smooth DOM reordering algorithms upon receiving simulated WebSocket telemetry.
        </p>
      </div>

      <LiveLeaderboard />
    </div>
  )
}
