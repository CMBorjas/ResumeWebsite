'use client'

import { useState } from 'react'
import { Project } from '../lib/projects'
import ProjectCard from './ProjectCard'
import TechStackPanel from './TechStackPanel'

export default function ProjectFeedClient({ allProjects }: { allProjects: Project[] }) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'default' | 'stars' | 'forks'>('default')

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

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'stars') return (b.stars || 0) - (a.stars || 0)
    if (sortBy === 'forks') return (b.forks || 0) - (a.forks || 0)
    return 0
  })

  const availableTechs = Array.from(new Set(allProjects.flatMap(p => p.techStack || [])))

  return (
    <>
      {/* ── Center: Projects Feed ── */}
      <section className="order-1 lg:order-2">
        {/* Scrollable Container with Fade Mask */}
        <div className="relative bg-slate-900/70 backdrop-blur-md p-4 rounded-xl border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] flex flex-col h-full max-h-[700px]">
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 shrink-0 pb-3 border-b border-brand-cyan/20 gap-3">
            <h2 className="text-2xl font-bold text-brand-cyan">Projects Feed</h2>
            
            <div className="flex flex-wrap items-center sm:justify-end gap-2">
              {selectedTechs.map(tech => (
                <span key={tech} className="text-[10px] bg-brand-cyan/10 border border-brand-cyan/50 text-brand-cyan px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_0_5px_color-mix(in srgb, var(--color-brand-cyan) 30%, transparent)]">
                  {tech}
                  <button onClick={() => toggleTech(tech)} className="hover:text-white font-bold ml-1 transition-colors">×</button>
                </span>
              ))}
              {selectedTechs.length > 0 && (
                <button 
                  onClick={() => setSelectedTechs([])}
                  className="text-xs text-slate-400 hover:text-white underline mx-1"
                >
                  Clear All
                </button>
              )}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0d1117] border border-brand-cyan/50 text-brand-cyan text-xs rounded px-2 py-1.5 outline-none focus:shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] transition-all cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="stars">Sort: Stars</option>
                <option value="forks">Sort: Forks</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-scroll pr-2 custom-scrollbar pb-12">
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
                {sortedProjects.map((p) => (
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
        <TechStackPanel selectedTechs={selectedTechs} onToggleTech={toggleTech} availableTechs={availableTechs} />
      </aside>
    </>
  )
}
