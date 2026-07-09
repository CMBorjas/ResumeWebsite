import React from 'react'
import StockAnalysis from '../../../components/StockAnalysis'
import { Activity } from 'lucide-react'

export default function StockAnalysisPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center gap-4 uppercase tracking-widest">
          <Activity className="w-10 h-10 text-brand-purple" />
          Stock_Price_Analysis
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto">
          A full-stack proof-of-concept analytical dashboard. It queries a Next.js Server API route that can hook into premium financial APIs, currently utilizing a fallback random-walk simulation algorithm to generate realistic 30-day OHLC data streams. Visualized with <span className="text-brand-cyan">Recharts</span>.
        </p>
      </div>

      <StockAnalysis />
    </div>
  )
}
