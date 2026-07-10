## What is it?
The Live Projects page (`src/app/live-projects/page.tsx`) is a dedicated route that exclusively filters and serves projects containing a `liveUrl`. It acts as a customized wrapper around the main `ProjectFeedClient` component, hiding the redundant "Live Status" filter toggle since it only displays live projects.

## Why was it modified/created?
Users needed a faster, more direct way to access projects that have an active deployment (Live UI) without having to dig through the main Projects page and manually select the "Live" filter from the Tech Stack panel. Adding a dedicated tab directly to the global navigation structure resolves this friction.

## How it works?
The Server Component (`live-projects/page.tsx`) imports the static registry (`src/lib/projects.ts`) and the fetched GitHub repos. It immediately filters the `allProjectsMap` to retain only projects where `!!p.liveUrl` is true. It then passes these filtered projects to `<ProjectFeedClient allProjects={liveProjects} hideLiveFilter={true} />`. 
The `hideLiveFilter` prop propagates down to `TechStackPanel.tsx`, which conditionally removes the redundant Live/Non-live filter toggle from the UI. 

## Requirements
- `ProjectFeedClient.tsx` and `TechStackPanel.tsx` must accept the `hideLiveFilter` boolean prop to avoid UI confusion.
- Must be compatible with Next.js `output: 'export'` (Statically generated).
- Connected to the global navigation (`HexagonMenu.tsx` and `layout.tsx` footer).

## Outbound Data Flow
- Data originates statically from `lib/projects.ts`.
- Filtered on the server.
- Flows down into `ProjectFeedClient` which renders `ProjectCard` instances.
