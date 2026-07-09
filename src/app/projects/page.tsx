import { projects as manualProjects, type Project } from '../../lib/projects'
import ProjectFeedClient from '../../components/ProjectFeedClient'
import ProfileStatsPanel from '../../components/ProfileStatsPanel'
import GithubActivityFeed, { type GitHubEvent } from '../../components/GithubActivityFeed'

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  topics?: string[]
  updated_at: string
  stargazers_count: number
  forks_count: number
}

async function getRepos() {
  const res = await fetch('https://api.github.com/users/CMBorjas/repos?sort=updated&per_page=100', {
    next: { revalidate: 3600 } // Revalidate every hour
  })

  if (!res.ok) {
    console.error('Failed to fetch repos')
    return []
  }

  const repos: GitHubRepo[] = await res.json()
  return repos
}

async function getEvents() {
  const res = await fetch('https://api.github.com/users/CMBorjas/events/public?per_page=15', {
    next: { revalidate: 1800 } // Revalidate every 30 mins
  })

  if (!res.ok) {
    console.error('Failed to fetch events')
    return []
  }

  const events: GitHubEvent[] = await res.json()
  return events
}

export default async function ProjectsPage() {
  const [repos, events] = await Promise.all([getRepos(), getEvents()])

  const githubProjects = repos.map(repo => {
    const stack = new Set<string>()
    if (repo.language) stack.add(repo.language)
    if (repo.topics) {
      repo.topics.forEach(topic => {
        // Simple formatting to make tags look nicer (e.g. "react" -> "React", "nextjs" -> "Nextjs")
        // We will improve the icon matcher to handle these variations
        const formatted = topic.charAt(0).toUpperCase() + topic.slice(1)
        stack.add(formatted)
      })
    }

    return {
      title: repo.name,
      description: repo.description || 'No description available',
      repoUrl: repo.html_url,
      techStack: Array.from(stack),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }
  })

  const allProjectsMap = new Map<string, typeof githubProjects[0] | Project>()

  githubProjects.forEach(p => {
    const key = p.title.toLowerCase()
    allProjectsMap.set(key, p)
  })

  manualProjects.forEach(mp => {
    const key = mp.title.toLowerCase()
    if (allProjectsMap.has(key)) {
      const existing = allProjectsMap.get(key)!
      allProjectsMap.set(key, {
        ...existing,
        ...mp,
        techStack: Array.from(new Set([...(mp.techStack || []), ...(existing.techStack || [])])),
        description: mp.description || existing.description,
      })
    } else {
      allProjectsMap.set(key, mp)
    }
  })

  const allProjects = Array.from(allProjectsMap.values()) as Project[]

  // Aggregate stats
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0)
  const totalRepos = repos.length

  // Top languages
  const langCounts: Record<string, number> = {}
  repos.forEach(r => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
  })
  const topLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const langColors: Record<string, string> = {
    Python:            '#FFD43B',
    JavaScript:        '#f1e05a',
    TypeScript:        '#3178c6',
    'Jupyter Notebook':'#DA5B0B',
    'C++':             '#f34b7d',
    C:                 '#555555',
    'C#':              '#178600',
    Java:              '#b07219',
    Go:                '#00ADD8',
    Rust:              '#dea584',
    Ruby:              '#701516',
    PHP:               '#4F5D95',
    Swift:             '#F05138',
    Kotlin:            '#A97BFF',
    Shell:             '#89e051',
    HTML:              '#e34c26',
    CSS:               '#563d7c',
    Dockerfile:        '#384d54',
    Makefile:          '#427819',
  }
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4">
      <style>{`
        a.quick-link {
          color: #00ffe1;
          filter: drop-shadow(0 0 5px color-mix(in srgb, var(--color-brand-cyan) 60%, transparent));
        }
        a.quick-link:hover {
          color: #ffffff;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
        }
        .custom-scrollbar {
          scrollbar-color: #00ffe1 transparent;
          scrollbar-width: thin;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ffe1 !important;
          border-radius: 4px;
          box-shadow: 0 0 6px color-mix(in srgb, var(--color-brand-cyan) 80%, transparent);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7ffff4 !important;
          box-shadow: 0 0 10px color-mix(in srgb, var(--color-brand-cyan) 100%, transparent);
        }
      `}</style>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_260px] gap-6">

        {/* ── Left Panel: GitHub Profile Stats ── */}
        <aside className="order-2 lg:order-1">
          <ProfileStatsPanel 
            totalRepos={totalRepos}
            totalStars={totalStars}
            totalForks={totalForks}
            topLangs={topLangs}
            langColors={langColors}
          />
        </aside>

        <ProjectFeedClient allProjects={allProjects} />

        {/* ── Right Panel: GitHub Activity Feed ── */}
        <aside className="order-3 lg:order-3">
          <GithubActivityFeed events={events} />
        </aside>

      </div>
    </div>
  )
}
