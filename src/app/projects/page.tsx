import { projects as manualProjects, type Project } from '../../lib/projects'
import ProjectFeedClient from '../../components/ProjectFeedClient'

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
    cache: 'force-cache'
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
    allProjectsMap.set(p.title.toLowerCase(), p)
  })

  manualProjects.forEach(mp => {
    const key = mp.title.toLowerCase()
    if (allProjectsMap.has(key)) {
      const existing = allProjectsMap.get(key)!
      allProjectsMap.set(key, {
        ...existing,
        ...mp,
        techStack: mp.techStack && mp.techStack.length > 0 ? mp.techStack : existing.techStack,
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
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-4 h-fit lg:sticky lg:top-8 border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
            {/* Avatar + name */}
            <div className="flex flex-col items-center mb-4">
              <img
                src="https://github.com/CMBorjas.png"
                alt="GitHub avatar"
                width={80}
                height={80}
                className="rounded-full border-2 border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] mb-2"
              />
              <p className="font-semibold text-sm text-brand-cyan">CMBorjas</p>
              <a href="https://github.com/CMBorjas" target="_blank" rel="noreferrer" className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors">github.com/CMBorjas</a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <a 
                href="https://github.com/CMBorjas" 
                target="_blank" 
                rel="noreferrer" 
                className="stat-card group block border-brand-cyan/50 shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)] hover:border-brand-cyan/80 hover:shadow-[0_0_15px_color-mix(in srgb, var(--color-brand-cyan) 60%, transparent)]"
              >
                <p className="text-lg font-bold text-brand-cyan group-hover:text-white transition-colors">{totalRepos}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide group-hover:text-white transition-colors">Repos</p>
              </a>
              <div className="stat-card group border-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:border-yellow-400/80 hover:shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                <p className="text-lg font-bold text-yellow-400 group-hover:text-white transition-colors">{totalStars}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide group-hover:text-white transition-colors">Stars</p>
              </div>
              <div className="stat-card group border-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.4)] hover:border-blue-400/80 hover:shadow-[0_0_15px_rgba(96,165,250,0.6)]">
                <p className="text-lg font-bold text-blue-400 group-hover:text-white transition-colors">{totalForks}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide group-hover:text-white transition-colors">Forks</p>
              </div>
            </div>

            {/* Top languages */}
            <div className="mb-4">
              <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">Top Languages</p>
              <div className="space-y-1.5">
                {topLangs.map(([lang, count]) => {
                  const pct = Math.round((count / totalRepos) * 100)
                  const color = langColors[lang] ?? '#00ffe1'
                  return (
                    <div key={lang}>
                      <div className="flex justify-between text-[11px] mb-0.5">
                        <span style={{ color }} className="font-medium">{lang}</span>
                        <span className="text-slate-500">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 mb-2 font-semibold">Links</p>
              <div className="flex flex-col gap-1.5">
                <a
                  href="https://github.com/CMBorjas"
                  target="_blank"
                  rel="noreferrer"
                  className="quick-link flex items-center gap-2 text-xs font-bold transition-all px-2 py-1.5 rounded-md hover:bg-slate-800/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/cchristian-mandujano"
                  target="_blank"
                  rel="noreferrer"
                  className="quick-link flex items-center gap-2 text-xs font-bold transition-all px-2 py-1.5 rounded-md hover:bg-slate-800/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a
                  href="mailto:Christian.MandujanoBorjas@ucdenver.edu"
                  className="quick-link flex items-center gap-2 text-xs font-bold transition-all px-2 py-1.5 rounded-md hover:bg-slate-800/60"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </aside>

        <ProjectFeedClient allProjects={allProjects} />

      </div>
    </div>
  )
}
