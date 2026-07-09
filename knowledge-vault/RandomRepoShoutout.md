# RandomRepoShoutout Component

## What is it?
The `RandomRepoShoutout.tsx` is a specialized widget that fetches and displays a random open-source repository from GitHub. It is located at `src/components/RandomRepoShoutout.tsx`.

## Why was it modified/created?
Created to fulfill the "Random GitHub Repo Shoutout" objective. It demonstrates API integration, error handling, and adds a dynamic, discovery-oriented element to the home page or blog sidebar.

## How it works?
1. **Data Fetching**: Utilizes Next.js App Router server-side fetching (or client-side `useEffect`) to ping the GitHub Search API (`https://api.github.com/search/repositories?q=stars:>1000`).
2. **Randomization**: To bypass the API returning the same exact repos sequentially, it dynamically randomizes the query parameters (e.g., picking a random letter or random page offset) before the `fetch` call.
3. **Display**: Extracts `name`, `description`, `stargazers_count`, and `html_url` from the JSON response and renders it in a styled card.
4. **Caching**: If fetched server-side, it uses ISR (`next: { revalidate: 3600 }`) to change the random repo once an hour, preventing API rate limiting.

## Requirements
- Access to the GitHub REST API (no authentication strictly required for public endpoints, but rate limits apply).
- `lucide-react` for star/fork icons.

## Outbound Data Flow
- **Input**: None from the user.
- **Output**: Makes an HTTP GET request to `api.github.com`. Emits visual data to the DOM.
