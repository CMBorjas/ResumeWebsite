import React from 'react'
import JobFeed from '../../../components/JobFeed'

export default function JobScraperPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center justify-center gap-4 uppercase tracking-widest">
          <span className="text-brand-cyan">{'//'}</span>
          Target_Acquisition
        </h1>
        <p className="text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed mx-auto">
          A server-side web scraper utility. Bypasses CORS restrictions by utilizing a Next.js API route combined with the `cheerio` HTML parsing library to passively monitor the Y Combinator job feed.
        </p>
      </div>

      <JobFeed />
    </div>
  )
}
