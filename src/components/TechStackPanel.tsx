import { useState } from 'react';

const TECH_MAP: Record<string, { icon: string, category: string, hoverGlow?: string, selectedGlow?: string }> = {
  // Languages
  'Python': { icon: 'devicon-python-plain colored', category: 'Languages' },
  'Java': { icon: 'devicon-java-plain colored', category: 'Languages' },
  'C++': { icon: 'devicon-cplusplus-plain colored', category: 'Languages' },
  'JavaScript': { icon: 'devicon-javascript-plain colored', category: 'Languages' },
  'TypeScript': { icon: 'devicon-typescript-plain colored', category: 'Languages' },
  'HTML': { icon: 'devicon-html5-plain colored', category: 'Languages' },
  'CSS': { icon: 'devicon-css3-plain colored', category: 'Languages' },
  'React': { icon: 'devicon-react-original colored', category: 'Languages' },
  'Node.js': { icon: 'devicon-nodejs-plain colored', category: 'Languages' },
  'Bash': { icon: 'devicon-bash-plain text-white', category: 'Languages' },
  'Rust': { icon: 'devicon-rust-plain text-orange-500', hoverGlow: 'group-hover:drop-shadow-[0_0_8px_#ffffff]', selectedGlow: 'drop-shadow-[0_0_8px_#ffffff]', category: 'Languages' },
  
  // Tools & Platforms
  'Next.js': { icon: 'devicon-nextjs-plain text-white', category: 'Tools & Platforms' },
  'Tailwind': { icon: 'devicon-tailwindcss-plain colored', category: 'Tools & Platforms' },
  'Flask': { icon: 'devicon-flask-original text-white', category: 'Tools & Platforms' },
  'LangChain': { icon: 'devicon-python-plain colored', category: 'Tools & Platforms' }, // fallback
  'Docker': { icon: 'devicon-docker-plain colored', category: 'Tools & Platforms' },
  'Git': { icon: 'devicon-git-plain colored', category: 'Tools & Platforms' },
  'VS Code': { icon: 'devicon-vscode-plain colored', category: 'Tools & Platforms' },
  'Anaconda': { icon: 'devicon-anaconda-plain colored', category: 'Tools & Platforms' },
  'Android Studio': { icon: 'devicon-androidstudio-plain colored', category: 'Tools & Platforms' },
  'PDF.js': { icon: 'devicon-javascript-plain colored', category: 'Tools & Platforms' },
  'pdf-lib': { icon: 'devicon-javascript-plain colored', category: 'Tools & Platforms' },
  'Jupyter Notebook': { icon: 'devicon-jupyter-plain colored', category: 'Tools & Platforms' },

  // Cloud & Data
  'MySQL': { icon: 'devicon-mysql-plain colored', category: 'Cloud & Data' },
  'AWS': { icon: 'devicon-amazonwebservices-plain colored', category: 'Cloud & Data' },
  'Google Cloud': { icon: 'devicon-googlecloud-plain colored', category: 'Cloud & Data' },
  'Firebase': { icon: 'devicon-firebase-plain colored', category: 'Cloud & Data' },
  'SQLite': { icon: 'devicon-sqlite-plain colored', category: 'Cloud & Data' },

  // Operating Systems
  'Linux': { icon: 'devicon-linux-plain text-white', category: 'Operating Systems' },
  'Windows': { icon: 'devicon-windows11-plain colored', category: 'Operating Systems' },
  'Android': { icon: 'devicon-android-plain colored', category: 'Operating Systems' },
}

export default function TechStackPanel({
  selectedTechs = [],
  availableTechs = [],
  activeTechs = [],
  onToggleTech = () => {},
  liveFilter = 'all',
  setLiveFilter = () => {},
  isMinimizedProp,
  setIsMinimizedProp,
  onClose,
  hideLiveFilter = false
}: {
  selectedTechs?: string[]
  availableTechs?: string[]
  activeTechs?: string[]
  onToggleTech?: (tech: string) => void
  liveFilter?: 'all' | 'live' | 'non-live'
  setLiveFilter?: (filter: 'all' | 'live' | 'non-live') => void
  isMinimizedProp?: boolean
  setIsMinimizedProp?: (val: boolean) => void
  onClose?: () => void
  hideLiveFilter?: boolean
}) {
  const [localIsMinimized, setLocalIsMinimized] = useState(false)
  const isMinimized = isMinimizedProp !== undefined ? isMinimizedProp : localIsMinimized
  const setIsMinimized = setIsMinimizedProp || setLocalIsMinimized
  const [isMaximized, setIsMaximized] = useState(false)

  const techsToShow = availableTechs && availableTechs.length > 0 
    ? availableTechs 
    : Object.keys(TECH_MAP);

  const categoriesMap = techsToShow.reduce((acc, techName) => {
    const techInfo = TECH_MAP[techName] || { icon: 'devicon-devicon-plain text-brand-cyan', category: 'Other' };
    if (!acc[techInfo.category]) acc[techInfo.category] = [];
    acc[techInfo.category].push({ name: techName, ...techInfo });
    return acc;
  }, {} as Record<string, any[]>);

  const categoryOrder = ['Languages', 'Tools & Platforms', 'Cloud & Data', 'Operating Systems', 'Other'];
  
  const techCategories = categoryOrder
    .map(label => ({ label, items: categoriesMap[label] || [] }))
    .filter(cat => cat.items.length > 0);

  return (
    <>
      <div className={`relative bg-slate-900/70 backdrop-blur-md rounded-xl border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] flex flex-col overflow-hidden transition-all duration-300 ${isMaximized ? '!fixed !inset-4 md:!inset-10 !z-[100] !bg-[#0a0f18] !scale-100 h-auto w-auto max-h-none' : 'h-fit lg:sticky lg:top-8'} ${isMinimized ? '!h-10 !min-h-[40px]' : ''}`}>
        <div className="w-full h-10 bg-brand-cyan/10 border-b border-brand-cyan/30 flex items-center px-4 justify-between backdrop-blur-md font-mono shrink-0">
          <span className="text-[11px] text-brand-cyan tracking-widest font-bold">~/TECH_STACK</span>
          <div className="flex gap-2">
            <div onClick={(e) => { e.stopPropagation(); if (onClose) onClose(); }} className={`w-3 h-3 rounded-full ${onClose ? 'bg-red-500/80 hover:bg-red-500 hover:shadow-[0_0_8px_color-mix(in srgb,var(--color-red-500)_80%,transparent)] cursor-pointer' : 'bg-red-500/80 hover:bg-red-500 cursor-not-allowed'} transition-all`} title={onClose ? "Close" : "Close (Disabled)"}></div>
            <div onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); setIsMaximized(false); }} className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" title={isMinimized ? "Restore" : "Minimize"}></div>
            <div onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }} className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 hover:shadow-[0_0_8px_color-mix(in srgb, var(--color-green-500) 80%, transparent)] transition-all cursor-pointer" title={isMaximized ? "Restore" : "Maximize"}></div>
          </div>
        </div>

        <div className={`flex-1 p-4 overflow-y-auto custom-scrollbar ${isMinimized ? 'hidden' : ''}`}>
          {/* Live Status Filter */}
          {!hideLiveFilter && (
            <div className="flex bg-[#0d1117] border border-brand-cyan/30 rounded-lg p-1 mb-6 gap-1 shrink-0">
              <button 
                onClick={() => setLiveFilter('all')} 
                className={`flex-1 text-[10px] uppercase font-bold tracking-widest py-1.5 rounded-md transition-all ${liveFilter === 'all' ? 'bg-brand-cyan/20 text-brand-cyan shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
              >
                All
              </button>
              <button 
                onClick={() => setLiveFilter('live')} 
                className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-widest py-1.5 rounded-md transition-all ${liveFilter === 'live' ? 'bg-brand-pink/20 text-brand-pink shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-pink) 40%, transparent)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${liveFilter === 'live' ? 'bg-brand-pink shadow-[0_0_5px_currentColor] animate-pulse' : 'bg-slate-500'}`}></span>
                Live
              </button>
              <button 
                onClick={() => setLiveFilter('non-live')} 
                className={`flex-1 text-[10px] uppercase font-bold tracking-widest py-1.5 rounded-md transition-all ${liveFilter === 'non-live' ? 'bg-slate-700 text-white shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
              >
                Non-Live
              </button>
            </div>
          )}

          {techCategories.map((cat) => (
            <div key={cat.label} className="mb-5 last:mb-0">
              <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                {cat.label}
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2">
                {cat.items.map((item) => {
                  const isSelected = selectedTechs.includes(item.name)
                  const isActive = activeTechs.includes(item.name)
                  return (
                    <div
                      key={item.name}
                      onClick={() => onToggleTech(item.name)}
                      className={`tech-logo-item flex flex-col items-center gap-1 p-2 rounded-lg
                                 transition-all duration-300 cursor-pointer group border
                                 ${!isActive && !isSelected ? 'opacity-30 grayscale hover:opacity-70 hover:grayscale-[50%]' : ''}
                                 ${isSelected 
                                    ? 'bg-brand-cyan/20 border-brand-cyan/80 shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 60%, transparent)] scale-105' 
                                    : 'border-transparent hover:bg-brand-cyan/10 hover:border-brand-cyan/50 hover:shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]'}`}
                    >
                      <i
                        className={`${item.icon} text-2xl transition-all duration-200 ${isSelected ? `scale-110 ${(item as any).selectedGlow || 'drop-shadow-[0_0_8px_currentColor]'}` : `group-hover:scale-110 ${(item as any).hoverGlow || 'group-hover:drop-shadow-[0_0_8px_currentColor]'}`}`}
                        aria-hidden="true"
                      />
                      <span className={`text-[10px] text-center leading-tight transition-colors ${isSelected ? 'text-brand-cyan font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {item.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
