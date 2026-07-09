'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface JobData {
  id: string
  title: string
  url: string
  timestamp: string
  company: string
}

export default function JobFeed() {
  const [jobs, setJobs] = useState<JobData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/scrape-jobs')
        const data = await response.json()
        
        if (data.success) {
          setJobs(data.jobs)
        } else {
          setError(data.error || 'Failed to fetch data from uplink.')
        }
      } catch (err) {
        setError('Connection to job mainframe severed.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0a0f18]/90 backdrop-blur-md rounded-xl border border-brand-cyan/30 shadow-[0_0_15px_color-mix(in_srgb,var(--color-brand-cyan)_20%,transparent)] overflow-hidden flex flex-col h-[700px]">
      
      {/* Header & Search */}
      <div className="bg-slate-900/80 p-6 border-b border-brand-cyan/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_8px_var(--color-brand-cyan)]"></div>
          <h2 className="text-xl font-bold text-white font-mono uppercase tracking-widest">
            YC_Job_Terminal
          </h2>
        </div>
        
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-slate-700 rounded text-slate-300 font-mono text-sm px-4 py-2 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
          />
          <svg className="w-4 h-4 absolute right-3 top-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Feed Area */}
      <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-cyan font-mono gap-4">
            <div className="w-12 h-12 border-4 border-slate-800 border-t-brand-cyan rounded-full animate-spin"></div>
            <p className="animate-pulse">Initializing data scrape sequence...</p>
          </div>
        ) : error ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-red-500 font-mono gap-4">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>{error}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono">
            No active targets found matching query.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index < 10 ? index * 0.05 : 0 }}
                  className="group block relative bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-brand-cyan/50 p-4 rounded-lg transition-all"
                >
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                    <span className="sr-only">View Job</span>
                  </a>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-white font-bold group-hover:text-brand-cyan transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                        <span className="text-brand-pink">{job.company}</span>
                        {job.timestamp && (
                          <>
                            <span className="text-slate-600">|</span>
                            <span title={job.timestamp}>Recently</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs font-mono text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      INFILTRATE
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Footer Status */}
      <div className="bg-slate-900/80 p-2 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span>Source: news.ycombinator.com/jobs</span>
        <span>
          {isLoading ? 'Status: Fetching' : `Targets Acquired: ${filteredJobs.length}`}
        </span>
      </div>

    </div>
  )
}
