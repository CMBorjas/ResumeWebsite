# GithubActivityFeed Component

## What is it?
The `GithubActivityFeed.tsx` is a React Server-rendered client component (rendered within a server-page) that fetches and displays the most recent public GitHub activities (pushes, pull requests, stars, forks, etc.) for the user. It visualizes these events in a sleek, glassmorphic timeline UI that aligns with the site's overall cyberpunk aesthetic.

## Why was it modified/created?
It was created as part of the "Easy Win 1" roadmap task (Github User Activity) to enhance the `/projects` page. It complements the existing static project feed and `ProfileStatsPanel` by adding dynamic, real-time "proof of work" and recent developer activity, making the portfolio feel alive.

## How it works?
1. The Next.js Server Component (`src/app/projects/page.tsx`) fetches the raw event data directly from the GitHub REST API (`https://api.github.com/users/CMBorjas/events/public?per_page=15`).
2. The fetch request uses Next.js caching features (`next: { revalidate: 1800 }`) to cache the data for 30 minutes, preventing API rate-limiting while keeping data reasonably fresh.
3. The raw array of `GitHubEvent` objects is passed as a prop down to the `GithubActivityFeed` component.
4. The component maps over the array, using a switch statement to conditionally render an appropriate icon (from `lucide-react`) and descriptive text (e.g., "Pushed 3 commits to ResumeWebsite") based on the `type` of the event.
5. `framer-motion` and Tailwind CSS are used to provide the glassmorphic background, neon hover effects, and a vertical timeline line.

## Requirements
- `lucide-react` for the event icons.
- Internet connectivity to the GitHub API on the server (during ISR revalidation).
- Must be used within a layout that provides adequate horizontal space (e.g., a 260px wide sidebar column) as it's designed as a vertical feed.

## Outbound Data Flow
- **Input**: Receives `GitHubEvent[]` from the parent page component.
- **Output**: Renders the DOM elements for the timeline. It does not export data anywhere else or mutate any global state.
