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
  onToggleTech = () => {}
}: {
  selectedTechs?: string[]
  availableTechs?: string[]
  onToggleTech?: (tech: string) => void
}) {
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
    <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-4 h-fit lg:sticky lg:top-8 border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
      <h3 className="text-lg font-bold text-brand-cyan mb-4 text-center">Tech Stack</h3>

      {techCategories.map((cat) => (
        <div key={cat.label} className="mb-5 last:mb-0">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">
            {cat.label}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {cat.items.map((item) => {
              const isSelected = selectedTechs.includes(item.name)
              return (
                <div
                  key={item.name}
                  onClick={() => onToggleTech(item.name)}
                  className={`tech-logo-item flex flex-col items-center gap-1 p-2 rounded-lg
                             transition-all duration-200 cursor-pointer group border
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
  )
}
