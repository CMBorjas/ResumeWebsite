export type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  liveUrl?: string
  techStack?: string[]
  stars?: number
  forks?: number
}

export const projects: Project[] = [
  {
    title: 'ResumeWebsite',
    description: 'A cyberpunk-themed interactive developer portfolio and resume site built with Next.js.',
    repoUrl: 'https://github.com/CMBorjas/ResumeWebsite',
    liveUrl: 'https://cchristian-mandujano.vercel.app',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js']
  },
  {
    title: 'DMML',
    description: 'An AI-powered assistant for Dungeon Masters running tabletop RPG campaigns. Leverages LangChain RAG to help DMs manage game sessions in real time, generating narrative suggestions, NPC dialogue, enemy encounters, and loot. Features a Flask web interface, SQLite/PostgreSQL database, and supports swappable AI backends like OpenAI and local Ollama.',
    repoUrl: 'https://github.com/CMBorjas/DMML',
    techStack: ['Python', 'Flask', 'LangChain', 'SQLite', 'Docker', 'Bash']
  }
]
