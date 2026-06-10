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
  },
  {
    title: 'scentGenerator',
    description: 'A pleasant and putrid scent generator for the Memory palace technique. Fully interactive web version.',
    repoUrl: 'https://github.com/CMBorjas/scentGenerator',
    liveUrl: '/ResumeWebsite/projects/scent-generator',
    techStack: ['Rust', 'TypeScript', 'React', 'Next.js', 'Tailwind']
  },
  {
    title: 'pdf_splitter',
    description: 'A web-based PDF splitting tool that allows users to upload a PDF, preview its pages, and extract or split specific pages into separate files.',
    repoUrl: 'https://github.com/CMBorjas/pdf_splitter',
    techStack: ['React', 'PDF.js', 'pdf-lib', 'Node.js', 'CSS']
  }
]
