export type Project = {
  title: string
  description: string
  imageUrl?: string
  repoUrl?: string
  techStack?: string[]
}

export const projects: Project[] = [
  {
    title: 'Example Project',
    description: 'A short summary about an example project. Replace with real content.',
    imageUrl: '/images/projects/example.png',
    repoUrl: 'https://github.com/CMBorjas',
    techStack: ['Next.js', 'TypeScript']
  }
]
