# TrendingRepoShoutout Component

## What is it?
The `TrendingRepoShoutout.tsx` is a companion/alternative to the Random Repo widget. It fetches and displays the current #1 trending repository on GitHub (or within a specific tech stack) for a given day or week. Located at `src/components/TrendingRepoShoutout.tsx`.

## Why was it modified/created?
While "Random Repo" explores obscure repositories, a "Trending Repo" widget keeps the portfolio dynamic and relevant to the current software engineering zeitgeist. It shows that the developer is tuned into the broader open-source ecosystem.

## How it works?
1. **Data Fetching**: A client-side `useEffect` hook makes a GET request to the public `api.github.com/search/repositories` endpoint, querying for repositories created in the last 7 days, sorted by stars.
2. **Parsing**: The API response is parsed to display the repository name, description, owner avatar, language, and stargazer count.
3. **UI**: Rendered as a glassmorphic Next.js Client Component using Tailwind CSS and Framer Motion. It automatically cycles through the top 10 trending repositories every 6 seconds using a `setInterval` and `AnimatePresence`.
4. **Integration**: Embedded seamlessly within the `ProjectCarousel` and `RandomRepoShoutout` components by leveraging a special `isTrendingWidget` check in `src/lib/projects.ts`, similarly to how the `WeatherWidget` functions.

## Requirements
- GitHub Search API (rate limited to 10 requests per minute for unauthenticated users, but only fetched once on component mount).
- Client-side rendering enabled via `"use client"`.

## Outbound Data Flow
- **Input**: None.
- **Output**: Issues an HTTP GET request to GitHub's Search API. Renders the top trending repositories to the DOM.
