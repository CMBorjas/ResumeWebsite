'use client'

import { useState } from 'react'
import { Project } from '../lib/projects'
import ProjectCard from './ProjectCard'
import TechStackPanel from './TechStackPanel'

export default function ProjectFeedClient({ allProjects }: { allProjects: Project[] }) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    )
  }

  const filteredProjects = allProjects.filter(project => {
    if (selectedTechs.length === 0) return true
    
    // Check if the project matches ALL selected techs
    return selectedTechs.every(tech => {
      const t = tech.toLowerCase()
      const inStack = project.techStack?.some(pt => pt.toLowerCase() === t)
      const inDesc = project.description?.toLowerCase().includes(t)
      const inTitle = project.title.toLowerCase().includes(t)
      return inStack || inDesc || inTitle
    })
  })

  return (
    <>
      {/* ── Center: Projects Feed ── */}
      <section className="order-1 lg:order-2">
        {/* Scrollable Container with Fade Mask */}
        <div className="relative bg-slate-900/70 backdrop-blur-md p-4 rounded-xl border-2 border-[#00ffe1]/50 shadow-[0_0_10px_rgba(0,255,225,0.4)] flex flex-col h-full max-h-[700px]">
          
          <div className="relative mb-4 text-center shrink-0">
            <h2 className="text-2xl font-bold text-brand-cyan inline-block">Projects Feed</h2>
            {selectedTechs.length > 0 && (
              <button 
                onClick={() => setSelectedTechs([])}
                className="absolute right-0 bottom-1 text-xs text-brand-cyan hover:underline bg-slate-800/50 px-2 py-1 rounded transition-colors hover:bg-slate-700/50"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-12">
            {filteredProjects.length === 0 ? (
              <div className="text-center text-slate-400 py-10 flex flex-col items-center">
                <svg className="w-12 h-12 mb-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p>No projects match the selected filters.</p>
                <button 
                  onClick={() => setSelectedTechs([])}
                  className="mt-4 text-sm text-brand-cyan hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                {filteredProjects.map((p) => (
                  <ProjectCard key={p.title + (p.repoUrl || '')} project={p} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Fade Gradient */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
      </section>

      {/* ── Right Panel: Tech Stack ── */}
      <aside className="order-3">
        <TechStackPanel selectedTechs={selectedTechs} onToggleTech={toggleTech} />
      </aside>
    </>
  )
}
