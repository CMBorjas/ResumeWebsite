type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  techStack?: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-slate-800 rounded-lg p-6 shadow-md border border-slate-700/50 hover:border-brand-pink/30 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        {project.repoUrl && (
          <a className="text-xs text-brand-cyan hover:underline" href={project.repoUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        )}
      </div>

      <p className="text-slate-300 leading-relaxed mb-4">{project.description}</p>

      <div className="flex gap-2 flex-wrap">
        {project.techStack?.map((t) => (
          <span key={t} className="text-xs font-medium px-2.5 py-1 bg-slate-700/50 text-slate-200 rounded-full border border-slate-600">
            {t}
          </span>
        ))}
      </div>

      {/* Optional: Add image here if available in the future for clearer "post" look */}
    </article>
  )
}
