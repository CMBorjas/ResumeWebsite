type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  techStack?: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-slate-800 rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{project.description}</p>
      <div className="mt-3 flex gap-2 flex-wrap">
        {project.techStack?.map((t) => (
          <span key={t} className="text-xs px-2 py-1 bg-slate-700 rounded">{t}</span>
        ))}
      </div>
      {project.repoUrl && (
        <div className="mt-3">
          <a className="text-brand-pink" href={project.repoUrl} target="_blank" rel="noreferrer">View Repo</a>
        </div>
      )}
    </article>
  )
}
