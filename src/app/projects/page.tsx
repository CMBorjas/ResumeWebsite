import { projects as manualProjects } from '../../lib/projects'
import ProjectCard from '../../components/ProjectCard'

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  updated_at: string
  stargazers_count: number
  forks_count: number
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
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    // You could add a default image or conditional logic here
  }))

  const allProjects = [...manualProjects, ...githubProjects]

  return (
    <section className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-brand-pink text-center">Projects Feed</h2>

      {/* Scrollable Container with Fade Mask - "Slot Machine" feel */}
      <div className="relative bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-inner">
        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar pb-12">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
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
