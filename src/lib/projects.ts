export type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  techStack?: string[]
  stars?: number
  forks?: number
}

export const projects: Project[] = [
  {
    title: 'ResumeWebsite',
    description: 'A cyberpunk-themed interactive developer portfolio and resume site built with Next.js.',
    repoUrl: 'https://github.com/CMBorjas/ResumeWebsite',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js']
  }
]
