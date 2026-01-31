type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  techStack?: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  // Generate a deterministic gradient based on the title length or char code for variety
  const gradientIndex = project.title.length % 5
  const gradients = [
    'from-pink-500/20 to-purple-900/40',
    'from-cyan-500/20 to-blue-900/40',
    'from-emerald-500/20 to-teal-900/40',
    'from-orange-500/20 to-red-900/40',
    'from-indigo-500/20 to-violet-900/40'
  ]
  const bgGradient = gradients[gradientIndex]

  return (
    <article className="group relative w-full aspect-video bg-slate-800 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Background Image / Gradient Placeholder */}
      <div className={`absolute inset-0 bg-slate-800 bg-gradient-to-br ${bgGradient} group-hover:scale-105 transition-transform duration-500`}>
        {/* If we had images, an <img /> would go here */}
      </div>

      {/* Hover Overlay - Description & Tech Stack */}
      <div className="absolute inset-0 bg-slate-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
        <p className="text-slate-200 text-sm mb-4 line-clamp-4 leading-relaxed font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {project.techStack?.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-white/10 text-white rounded-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer - Title & Link (Always Visible or Slide up) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex justify-between items-end">
        <h3 className="text-white font-bold text-sm truncate mr-2 drop-shadow-md">
          {project.title}
        </h3>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            title="View Source"
          >
            {/* Simple Link Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}
