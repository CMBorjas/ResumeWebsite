import { projects as manualProjects } from '../../lib/projects'
import ProjectCard from '../../components/ProjectCard'

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  updated_at: string
}

async function getRepos() {
  const res = await fetch('https://api.github.com/users/CMBorjas/repos?sort=updated&per_page=100', {
    next: { revalidate: 3600 }
  })

  if (!res.ok) {
    console.error('Failed to fetch repos')
    return []
  }

  const repos: GitHubRepo[] = await res.json()
  return repos
}

export default async function ProjectsPage() {
  const repos = await getRepos()

  const githubProjects = repos.map(repo => ({
    title: repo.name,
    description: repo.description || 'No description available',
    repoUrl: repo.html_url,
    techStack: repo.language ? [repo.language] : [],
    // You could add a default image or conditional logic here
  }))

  const allProjects = [...manualProjects, ...githubProjects]

  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-brand-pink text-center">Projects Feed</h2>

      {/* Scrollable Container with Fade Mask */}
      <div className="relative">
        <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((p) => (
              <ProjectCard key={p.title + p.repoUrl} project={p} />
            ))}
          </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>
    </section>
  )
}
