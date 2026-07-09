# JobScraper Component & API

## What is it?
The "Target_Acquisition" tool consists of a Next.js API route (`src/app/api/scrape-jobs/route.ts`) and a frontend React component (`src/components/JobFeed.tsx`). It scrapes job listings from Y Combinator's Hacker News job board. The page lives at `src/app/projects/job-scraper/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Job List Scraper" objective from the backlog. It demonstrates the ability to build a full-stack feature within Next.js, bypassing CORS restrictions by performing the HTTP scraping request server-side, parsing the HTML securely with `cheerio`, and serving a clean JSON payload to the client.

## How it works?
1. **Server-Side API (`/api/scrape-jobs`)**:
   - Executes an HTTP `fetch` to `https://news.ycombinator.com/jobs`.
   - Uses `cheerio` to parse the raw HTML string into a traverseable DOM.
   - Extracts the `title`, `url`, `timestamp`, and roughly parses the `company` name from the `.athing` DOM elements.
   - Returns a structured JSON array. The route is configured to cache (`revalidate = 3600`) to prevent rate-limiting.
2. **Client-Side Component (`JobFeed.tsx`)**:
   - Uses a `useEffect` hook to query our internal API route.
   - Maintains a local `searchTerm` state to instantly filter the JSON payload.
   - Renders the feed with staggered `framer-motion` entrance animations.

## Requirements
- `cheerio` package for server-side HTML parsing.
- Next.js API Routes (App Router `route.ts`).
- `framer-motion` for entrance animations.

## Outbound Data Flow
- **Input**: Server makes an outbound `GET` request to Hacker News.
- **Output**: The frontend receives JSON and renders it. No database mutations occur.
