'use client'

import { useState } from 'react'

interface ProfileStatsPanelProps {
  totalRepos: number
  totalStars: number
  totalForks: number
  topLangs: [string, number][]
  langColors: Record<string, string>
}

export default function ProfileStatsPanel({
  totalRepos,
  totalStars,
  totalForks,
  topLangs,
  langColors
}: ProfileStatsPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <>
      <div className={`relative bg-slate-900/70 backdrop-blur-md rounded-xl border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] flex flex-col overflow-hidden transition-all duration-300 ${isMaximized ? '!fixed !inset-4 md:!inset-10 !z-[100] !bg-[#0a0f18] !scale-100 h-auto w-auto max-h-none' : 'h-fit lg:sticky lg:top-8'} ${isMinimized ? '!h-10 !min-h-[40px]' : ''}`}>

        {/* Header Bar */}
        <div className="w-full h-10 bg-brand-cyan/10 border-b border-brand-cyan/30 flex items-center px-4 justify-between backdrop-blur-md font-mono shrink-0">
          <span className="text-[11px] text-brand-cyan tracking-widest font-bold">~/GIT_HUB_PROFILE</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-not-allowed" title="Close (Disabled)"></div>
            <div onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); setIsMaximized(false); }} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" title={isMinimized ? "Restore" : "Minimize"}></div>
            <div onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 hover:shadow-[0_0_8px_color-mix(in srgb, var(--color-green-500) 80%, transparent)] transition-all cursor-pointer" title={isMaximized ? "Restore" : "Maximize"}></div>
          </div>
        </div>

        <div className={`flex-1 p-4 overflow-y-auto custom-scrollbar ${isMinimized ? 'hidden' : ''}`}>
          {/* Avatar + name */}
          <div className="flex flex-col items-center mb-4">
            <img
              src="https://github.com/CMBorjas.png"
              alt="GitHub avatar"
              width={80}
              height={80}
              className="rounded-full border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] mb-2"
            />
            <p className="font-semibold text-sm text-brand-cyan">CMBorjas</p>
            <a href="https://github.com/CMBorjas" target="_blank" rel="noreferrer" className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors">github.com/CMBorjas</a>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <a
              href="https://github.com/CMBorjas"
              target="_blank"
              rel="noreferrer"
              className="stat-card group block border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] hover:border-brand-cyan/80 hover:shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 60%, transparent)]"
            >
              <p className="text-lg font-bold text-brand-cyan group-hover:text-white transition-colors">{totalRepos}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide group-hover:text-white transition-colors">Repos</p>
            </a>
            <div className="stat-card group border-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:border-yellow-400/80 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]">
              <p className="text-lg font-bold text-yellow-400 group-hover:text-white transition-colors">{totalStars}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide group-hover:text-white transition-colors">Stars</p>
            </div>
            <div className="stat-card group border-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.4)] hover:border-blue-400/80 hover:shadow-[0_0_15px_rgba(96,165,250,0.6)]">
              <p className="text-lg font-bold text-blue-400 group-hover:text-white transition-colors">{totalForks}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide group-hover:text-white transition-colors">Forks</p>
            </div>
          </div>

          {/* Top languages */}
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">Top Languages</p>
            <div className="space-y-1.5">
              {topLangs.map(([lang, count]) => {
                const pct = Math.round((count / totalRepos) * 100)
                const color = langColors[lang] ?? '#00ffe1'
                return (
                  <div key={lang}>
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span style={{ color }} className="font-medium">{lang}</span>
                      <span className="text-slate-500">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">Links</p>
            <div className="flex flex-col gap-1.5">
              <a
                href="https://github.com/CMBorjas"
                target="_blank"
                rel="noreferrer"
                className="quick-link flex items-center gap-2 text-xs font-bold transition-all px-2 py-1.5 rounded-md hover:bg-slate-800/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/cchristian-mandujano"
                target="_blank"
                rel="noreferrer"
                className="quick-link flex items-center gap-2 text-xs font-bold transition-all px-2 py-1.5 rounded-md hover:bg-slate-800/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
              <a
                href="mailto:Christian.MandujanoBorjas@ucdenver.edu"
                className="quick-link flex items-center gap-2 text-xs font-bold transition-all px-2 py-1.5 rounded-md hover:bg-slate-800/60"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
