const techCategories = [
  {
    label: 'Languages',
    items: [
      { name: 'Python',     icon: 'devicon-python-plain colored' },
      { name: 'Java',       icon: 'devicon-java-plain colored' },
      { name: 'C++',        icon: 'devicon-cplusplus-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'HTML',       icon: 'devicon-html5-plain colored' },
      { name: 'CSS',        icon: 'devicon-css3-plain colored' },
      { name: 'Bash',       icon: 'devicon-bash-plain text-white' },
      { name: 'Rust',       icon: 'devicon-rust-plain text-orange-500', hoverGlow: 'group-hover:drop-shadow-[0_0_8px_#ffffff]', selectedGlow: 'drop-shadow-[0_0_8px_#ffffff]' },
      { name: 'MySQL',      icon: 'devicon-mysql-plain colored' },
      { name: 'Jupyter Notebook', icon: 'devicon-jupyter-plain colored' },
    ],
  },
  {
    label: 'Tools & Platforms',
    items: [
      { name: 'Docker',         icon: 'devicon-docker-plain colored' },
      { name: 'Git',            icon: 'devicon-git-plain colored' },
      { name: 'VS Code',        icon: 'devicon-vscode-plain colored' },
      { name: 'Anaconda',       icon: 'devicon-anaconda-plain colored' },
      { name: 'Android Studio', icon: 'devicon-androidstudio-plain colored' },
    ],
  },
  {
    label: 'Cloud & Data',
    items: [
      { name: 'AWS',          icon: 'devicon-amazonwebservices-plain colored' },
      { name: 'Google Cloud', icon: 'devicon-googlecloud-plain colored' },
      { name: 'Firebase',     icon: 'devicon-firebase-plain colored' },
      { name: 'SQLite',       icon: 'devicon-sqlite-plain colored' },
    ],
  },
  {
    label: 'Operating Systems',
    items: [
      { name: 'Linux',   icon: 'devicon-linux-plain text-white' },
      { name: 'Windows', icon: 'devicon-windows11-plain colored' },
      { name: 'Android', icon: 'devicon-android-plain colored' },
    ],
  },
]

export default function TechStackPanel({
  selectedTechs = [],
  onToggleTech = () => {}
}: {
  selectedTechs?: string[]
  onToggleTech?: (tech: string) => void
}) {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-4 h-fit lg:sticky lg:top-8 border-2 border-[#00ffe1]/50 shadow-[0_0_10px_rgba(0,255,225,0.4)]">
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
                                ? 'bg-brand-cyan/20 border-[#00ffe1]/80 shadow-[0_0_15px_rgba(0,255,225,0.6)] scale-105' 
                                : 'border-transparent hover:bg-brand-cyan/10 hover:border-[#00ffe1]/50 hover:shadow-[0_0_10px_rgba(0,255,225,0.4)]'}`}
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
