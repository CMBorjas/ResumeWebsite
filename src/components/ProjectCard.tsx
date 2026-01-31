type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  techStack?: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-700/50 hover:border-brand-pink/50 transition-colors h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
      </div>

      <p className="text-sm text-slate-300 mb-4 flex-grow line-clamp-3 leading-snug">{project.description}</p>

      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex gap-1.5 flex-wrap">
          {project.techStack?.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-medium px-2 py-0.5 bg-slate-700/60 text-slate-200 rounded-full">
              {t}
            </span>
          ))}
        </div>

        {project.repoUrl && (
          <a className="text-xs text-brand-cyan hover:underline self-start" href={project.repoUrl} target="_blank" rel="noreferrer">
            View Source →
          </a>
        )}
      </div>
    </article>
  )
}
