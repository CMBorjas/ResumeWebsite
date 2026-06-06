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
    <article className="project-card min-w-0 bg-[#0d1117] border border-[#00ffe1]/50 shadow-[0_0_8px_rgba(0,255,225,0.3)] rounded-md p-3 flex flex-col h-full hover:border-[#00ffe1]/80 hover:shadow-[0_0_15px_rgba(0,255,225,0.6)] transition-all duration-300 min-h-[180px]">
      <div className="flex justify-between items-start mb-2 w-full min-w-0 gap-2">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="project-title font-semibold text-sm hover:underline truncate flex-1 min-w-0 max-w-full"
        >
          {project.title}
        </a>
        <span className="text-[10px] border border-green-500/50 text-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)] px-2 py-0.5 rounded-full shrink-0">
          Public
        </span>
      </div>

      <div className="flex-grow overflow-y-auto mb-3 custom-scrollbar pr-1">
        <p className="text-xs text-slate-300 leading-relaxed break-words">
          {project.description}
        </p>
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
