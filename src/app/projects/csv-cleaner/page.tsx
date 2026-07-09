import React from 'react'
import CsvCleaner from '../../../components/CsvCleaner'

export default function CsvCleanerPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center md:justify-start gap-4">
          <span className="text-brand-cyan">&lt;</span>
          Data Sanitizer
          <span className="text-brand-cyan">/&gt;</span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto md:mx-0">
          A client-side CSV processing utility. Instantly parse, clean, and export massive datasets directly in your browser without communicating with any external servers. Built on PapaParse for extreme parsing speeds.
        </p>
      </div>

      <CsvCleaner />
    </div>
  )
}
