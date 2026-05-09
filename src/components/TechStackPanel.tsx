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
      { name: 'Bash',       icon: 'devicon-bash-plain colored' },
      { name: 'MySQL',      icon: 'devicon-mysql-plain colored' },
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
      { name: 'Linux',   icon: 'devicon-linux-plain colored' },
      { name: 'Windows', icon: 'devicon-windows11-plain colored' },
      { name: 'Android', icon: 'devicon-android-plain colored' },
    ],
  },
]

export default function TechStackPanel() {
  return (
    <div className="glass-panel rounded-xl p-4 h-fit lg:sticky lg:top-8">
      <h3 className="text-lg font-bold text-brand-cyan mb-4 text-center">Tech Stack</h3>

      {techCategories.map((cat) => (
        <div key={cat.label} className="mb-5 last:mb-0">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">
            {cat.label}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {cat.items.map((item) => (
              <div
                key={item.name}
                className="tech-logo-item flex flex-col items-center gap-1 p-2 rounded-lg
                           hover:bg-slate-700/40 transition-all duration-200 cursor-default group"
              >
                <i
                  className={`${item.icon} text-2xl transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor]`}
                  aria-hidden="true"
                />
                <span className="text-[10px] text-slate-400 group-hover:text-slate-200 text-center leading-tight transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
