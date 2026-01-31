import { Project } from '../lib/projects'

const languageColors: { [key: string]: string } = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-purple-500',
  Java: 'bg-red-500',
  Go: 'bg-cyan-500',
  Shell: 'bg-gray-500',
  other: 'bg-slate-500'
}

export default function ProjectCard({ project }: { project: Project }) {
  const mainLang = project.techStack?.[0] || 'other'
  const langColor = languageColors[mainLang] || languageColors['other']

  return (
    <article className="bg-[#0d1117] border border-slate-700/50 rounded-md p-3 flex flex-col h-full hover:border-slate-500 transition-colors aspect-[1.9/1]">
      <div className="flex justify-between items-start mb-2">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 font-semibold text-sm hover:underline truncate mr-2"
        >
          {project.title}
        </a>
        <span className="text-[10px] border border-slate-600 text-slate-400 px-1.5 rounded-full">
          Public
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-3 flex-grow line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-400 mt-auto">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${langColor}`}></span>
          <span>{mainLang}</span>
        </div>

        {(project.stars ?? 0) > 0 && (
          <div className="flex items-center gap-1 hover:text-blue-400 cursor-default">
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
    </article>
  )
}
