import { projects } from '../../lib/projects'
import ProjectCard from '../../components/ProjectCard'

export default function ProjectsPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-brand-pink">Projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}
