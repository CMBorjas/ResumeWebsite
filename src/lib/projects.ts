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
    liveUrl: 'https://cmborjas.github.io/ResumeWebsite',
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
    liveUrl: '/projects/scent-generator',
    techStack: ['Rust', 'TypeScript', 'React', 'Next.js', 'Tailwind']
  },
  {
    title: 'pdf_splitter',
    description: 'A web-based PDF splitting tool that allows users to upload a PDF, preview its pages, and extract or split specific pages into separate files.',
    repoUrl: 'https://github.com/CMBorjas/pdf_splitter',
    liveUrl: '/projects/pdf-splitter',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'PDF.js']
  },
  {
    title: 'CSCI_3415-Homework004',
    description: 'A robust sentiment analysis engine that parses the Stanford SocialSent dataset to evaluate user-uploaded texts. Originally engineered in Rust for memory-safe CLI processing, and subsequently ported to a serverless Next.js architecture with a dynamic, cyberpunk-themed UI.',
    repoUrl: 'https://github.com/CMBorjas/CSCI_3415-Homework004',
    liveUrl: '/projects/social-sent-score',
    techStack: ['Rust', 'TypeScript', 'Next.js', 'React', 'Tailwind', 'Data Parsing']
  },
  {
    title: 'neuron-from-scratch-vz',
    description: 'A faithful, from-scratch implementation of a 2-2-1 neural network described by Victor Zhou. This project features a full Python testing and documentation suite alongside an interactive web port demonstrating real-time training and inference.',
    repoUrl: 'https://github.com/CMBorjas/neuron-from-scratch-vz',
    liveUrl: '/projects/neuron-from-scratch',
    techStack: ['Python', 'Numpy', 'TypeScript', 'React', 'Next.js', 'Tailwind']
  },
  {
    title: 'NeuroFocus Pomodoro',
    description: 'A cyberpunk-themed pomodoro timer featuring distinct work/rest states, interactive glowing progress rings, and a custom CSS animated UI built entirely in Next.js/Tailwind.',
    repoUrl: 'https://github.com/CMBorjas/ResumeWebsite',
    liveUrl: '/projects/pomodoro',
    techStack: ['React', 'Next.js', 'Tailwind', 'Framer Motion']
  },
  {
    title: 'Markdown.sys',
    description: 'A cyberpunk-styled, browser-based Markdown editor with live preview compilation, syntax highlighting, and persistent local storage.',
    repoUrl: 'https://github.com/CMBorjas/ResumeWebsite',
    liveUrl: '/projects/markdown-notes',
    techStack: ['React', 'Next.js', 'Tailwind', 'react-markdown', 'remark-gfm']
  },
  {
    title: 'LinkCompressor',
    description: 'A URL shortening utility utilizing the is.gd API to compress long web addresses into bite-sized links. Features a history log and quick-copy functionality.',
    repoUrl: 'https://github.com/CMBorjas/ResumeWebsite',
    liveUrl: '/projects/url-shortener',
    techStack: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'REST API']
  },
  {
    title: 'Rust-Mini-redis-server',
    description: 'A hands-on implementation of asynchronous programming in Rust using the powerful Tokio runtime. Demonstrates modern Rust patterns for building high-performance, concurrent network applications.',
    repoUrl: 'https://github.com/CMBorjas/Rust-Mini-redis-server',
    techStack: ['Rust', 'Tokio', 'Async/Await', 'TCP']
  }
]
