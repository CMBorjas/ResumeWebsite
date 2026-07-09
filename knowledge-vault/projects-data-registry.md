# Projects Data Registry

## What is it?
This file (`src/lib/projects.ts`) acts as the centralized data store (registry) for all projects featured on the ResumeWebsite. It exports an array of `Project` objects.

## Why was it modified/created?
It was created to decouple data from the UI. Instead of hardcoding 15+ project cards into the `ProjectFeedClient.tsx`, this central registry ensures that adding a new feature only requires a simple JSON-like object insertion. It was modified recently to include live routes to components like Data Visualization, CSV Cleaner, and Job Scraper.

## How it works?
1. It defines a rigorous TypeScript interface: `type Project = { title: string, description: string, liveUrl: string, techStack: string[] }`.
2. It exports a static array: `export const projects: Project[]`.
3. When the Next.js application builds or renders, components import this array, map over it, and dynamically instantiate `<ProjectCard>` elements.

## Requirements
- Valid TypeScript interface adherence.
- All `liveUrl` paths must map directly to valid Next.js App Router folders (e.g., `/projects/[slug]`).

## Outbound Data Flow
- **Input**: Hardcoded developer additions to the array.
- **Output**: Feeds structural data to `ProjectFeedClient.tsx` and the main Projects page layout, dictating exactly how many cards spawn and what routing links they contain.
