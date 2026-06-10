import { Project } from '../lib/projects'

const techIcons: { [key: string]: string } = {
  Python: 'devicon-python-plain colored',
  Java: 'devicon-java-plain colored',
  'C++': 'devicon-cplusplus-plain colored',
  C: 'devicon-c-plain colored',
  'C#': 'devicon-csharp-plain colored',
  JavaScript: 'devicon-javascript-plain colored',
  TypeScript: 'devicon-typescript-plain colored',
  HTML: 'devicon-html5-plain colored',
  CSS: 'devicon-css3-plain colored',
  Bash: 'devicon-bash-plain text-white',
  Shell: 'devicon-bash-plain text-white',
  MySQL: 'devicon-mysql-plain colored',
  Docker: 'devicon-docker-plain colored',
  Git: 'devicon-git-plain colored',
  'VS Code': 'devicon-vscode-plain colored',
  Anaconda: 'devicon-anaconda-plain colored',
  'Android Studio': 'devicon-androidstudio-plain colored',
  AWS: 'devicon-amazonwebservices-plain colored',
  'Google Cloud': 'devicon-googlecloud-plain colored',
  Firebase: 'devicon-firebase-plain colored',
  SQLite: 'devicon-sqlite-plain colored',
  Linux: 'devicon-linux-plain text-white',
  Windows: 'devicon-windows11-plain colored',
  Android: 'devicon-android-plain colored',
  'Jupyter Notebook': 'devicon-jupyter-plain colored',
  Rust: 'devicon-rust-plain text-orange-500',
  Go: 'devicon-go-plain colored',
  PHP: 'devicon-php-plain colored',
  Ruby: 'devicon-ruby-plain colored',
  Swift: 'devicon-swift-plain colored',
  Kotlin: 'devicon-kotlin-plain colored',
  'Next.js': 'devicon-nextjs-plain text-white',
  React: 'devicon-react-original colored',
  Node: 'devicon-nodejs-plain colored',
  'Node.js': 'devicon-nodejs-plain colored',
}

const techColors: { [key: string]: string } = {
  Python:             '#FFD43B',
  Java:               '#ED8B00',
  'C++':              '#00599C',
  C:                  '#A8B9CC',
  'C#':               '#9B4F96',
  JavaScript:         '#F7DF1E',
  TypeScript:         '#3178C6',
  HTML:               '#E34F26',
  CSS:                '#1572B6',
  Bash:               '#4EAA25',
  Shell:              '#4EAA25',
  MySQL:              '#4479A1',
  Docker:             '#2496ED',
  Git:                '#F05032',
  'VS Code':          '#007ACC',
  Anaconda:           '#44A833',
  'Android Studio':   '#3DDC84',
  AWS:                '#FF9900',
  'Google Cloud':     '#4285F4',
  Firebase:           '#FFCA28',
  SQLite:             '#44B4C1',
  Linux:              '#FCC624',
  Windows:            '#0078D6',
  Android:            '#3DDC84',
  'Jupyter Notebook': '#F37626',
  Rust:               '#DEA584',
  Go:                 '#00ADD8',
  PHP:                '#777BB4',
  Ruby:               '#CC342D',
  Swift:              '#FA7343',
  Kotlin:             '#7F52FF',
  'Next.js':          '#FFFFFF',
  React:              '#61DAFB',
  Node:               '#339933',
  'Node.js':          '#339933',
  Vue:                '#4FC08D',
  Tailwind:           '#38BDF8',
  TailwindCSS:        '#38BDF8',
}

export default function ProjectCard({ project }: { project: Project }) {

  return (
    <article className="project-card min-w-0 bg-[#0d1117] border border-brand-cyan/50 shadow-[0_0_8px_color-mix(in srgb, var(--color-brand-cyan) 30%, transparent)] rounded-md p-3 flex flex-col h-full hover:border-brand-cyan/80 hover:shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 60%, transparent)] transition-all duration-300 min-h-[180px]">
      <div className="flex justify-between items-start mb-2 w-full min-w-0 gap-2">
        <a
          href={project.liveUrl || project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="project-title font-semibold text-sm hover:underline truncate flex-1 min-w-0 max-w-full"
        >
          {project.title}
        </a>
        <div className="flex items-center gap-2 shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/demo flex items-center bg-[#ff003c]/10 border border-[#ff003c]/30 rounded-full px-2 py-0.5 transition-all hover:bg-[#ff003c]/20 hover:border-[#ff003c]/50 hover:shadow-[0_0_10px_rgba(255,0,60,0.4)]"
            >
              <span className="flex h-2.5 w-2.5 relative items-center justify-center shrink-0">
                <span className="animate-[ping_3s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-[#ff003c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff003c] shadow-[0_0_8px_rgba(255,0,60,1)]"></span>
              </span>
              <span className="max-w-0 overflow-hidden group-hover/demo:max-w-[100px] group-hover/demo:ml-1.5 transition-all duration-300 ease-in-out flex items-center gap-1 text-[10px] text-[#ff003c] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover/demo:opacity-100">
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>
                Live Demo
              </span>
            </a>
          )}
          <span className="text-[10px] border border-green-500/50 text-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)] px-2 py-0.5 rounded-full">
            Public
          </span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto mb-3 custom-scrollbar pr-1 flex flex-col gap-2">
        <p className="text-xs text-slate-300 leading-relaxed break-words">
          {project.description}
        </p>
        <div className="mt-auto flex gap-3 flex-wrap">

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="group/repo flex items-center bg-brand-cyan/10 border border-brand-cyan/30 rounded-full px-2 py-0.5 transition-all hover:bg-brand-cyan/20 hover:border-brand-cyan/50 hover:shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] text-brand-cyan hover:text-white w-fit"
            >
              <svg className="w-4 h-4 shrink-0 transition-all group-hover/repo:text-white" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              <span className="max-w-0 overflow-hidden group-hover/repo:max-w-[120px] group-hover/repo:ml-1.5 transition-all duration-300 ease-in-out flex items-center text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover/repo:opacity-100">
                View Repository
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-slate-400 mt-auto">
        <div className="flex flex-wrap items-center gap-3">
          {project.techStack && project.techStack.length > 0 ? (
            project.techStack.map(tech => {
              // Case-insensitive lookup and common GitHub topic aliases
              const getIconClass = (t: string) => {
                const lower = t.toLowerCase()
                for (const [key, val] of Object.entries(techIcons)) {
                  if (key.toLowerCase() === lower) return val
                }
                if (lower === 'nextjs' || lower === 'next-js') return techIcons['Next.js']
                if (lower === 'reactjs') return techIcons['React']
                if (lower === 'nodejs' || lower === 'node') return techIcons['Node.js']
                if (lower === 'cpp') return techIcons['C++']
                if (lower === 'csharp') return techIcons['C#']
                if (lower === 'vuejs') return 'devicon-vuejs-plain colored'
                if (lower === 'tailwindcss') return 'devicon-tailwindcss-plain colored'
                return undefined
              }

              const getColor = (t: string) => {
                const lower = t.toLowerCase()
                for (const [key, val] of Object.entries(techColors)) {
                  if (key.toLowerCase() === lower) return val
                }
                if (lower === 'nextjs' || lower === 'next-js') return techColors['Next.js']
                if (lower === 'reactjs') return techColors['React']
                if (lower === 'nodejs' || lower === 'node') return techColors['Node.js']
                if (lower === 'cpp') return techColors['C++']
                if (lower === 'csharp') return techColors['C#']
                if (lower === 'vuejs') return techColors['Vue']
                if (lower === 'tailwindcss') return techColors['TailwindCSS']
                return '#94a3b8' // slate-400 fallback
              }

              const iconClass = getIconClass(tech)
              const color = getColor(tech)

              if (iconClass) {
                return (
                  <div key={tech} className="flex items-center gap-1 transition-opacity hover:opacity-80" title={tech}>
                    <i className={`${iconClass} text-[13px]`} aria-hidden="true" />
                    <span style={{ color }}>{tech}</span>
                  </div>
                )
              }
              // Fallback dot with matching color
              return (
                <div key={tech} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                  <span style={{ color }}>{tech}</span>
                </div>
              )
            })
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              <span>other</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {(project.stars ?? 0) > 0 && (
            <div className="flex items-center gap-1 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)] hover:text-yellow-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-all cursor-default">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-current w-3.5 h-3.5">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
              </svg>
              <span>{project.stars}</span>
            </div>
          )}

          {(project.forks ?? 0) > 0 && (
            <div className="flex items-center gap-1 hover:text-blue-400 cursor-default">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-current w-3.5 h-3.5">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
              </svg>
              <span>{project.forks}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
