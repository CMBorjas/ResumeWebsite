# TrendingRepoShoutout Component

## What is it?
The `TrendingRepoShoutout.tsx` is a companion/alternative to the Random Repo widget. It fetches and displays the current #1 trending repository on GitHub (or within a specific tech stack) for a given day or week. Located at `src/components/TrendingRepoShoutout.tsx`.

## Why was it modified/created?
While "Random Repo" explores obscure repositories, a "Trending Repo" widget keeps the portfolio dynamic and relevant to the current software engineering zeitgeist. It shows that the developer is tuned into the broader open-source ecosystem.

## How it works?
1. **Data Fetching**: Next.js server-side fetch calls an external trending API (since GitHub doesn't have an official REST endpoint for 'Trending', this usually scrapes the GitHub Trending page or uses a third-party aggregator API).
2. **Parsing**: The API response is mapped into a standard repository display object (Name, Description, Language, Stars, Forks).
3. **Caching**: Relies heavily on Next.js Incremental Static Regeneration (ISR) with a revalidation time of 24 hours (`next: { revalidate: 86400 }`), as trending repos don't fluctuate by the minute.
4. **UI**: Rendered within a glassmorphic Next.js Client Component or Server Component using Tailwind CSS and `lucide-react` icons.

## Requirements
- Third-party trending API or specialized scraping utility.
- Next.js App Router caching.

## Outbound Data Flow
- **Input**: None.
- **Output**: Issues an HTTP GET request to a trending API. Renders to the DOM.
