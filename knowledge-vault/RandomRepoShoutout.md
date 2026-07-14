# RandomRepoShoutout Component

## What is it?
The `RandomRepoShoutout.tsx` component was repurposed into the primary **Hybrid Project Showcase Feed** on the homepage. It renders an animated, vertically stacked bento-box feed of the most prominent projects from `projects.ts`. It is located at `src/components/RandomRepoShoutout.tsx`.

## Why was it modified/created?
Modified to fulfill the "Hybrid Project Showcase Redesign" goal. It replaces the old static layout with massive dynamic typography, glassmorphic hover effects, and interactive embeds.

## How it works?
1. **Data Source**: It filters `projects.ts` to only include projects that have a `repoUrl` or `liveUrl`.
2. **Layout**: Uses a CSS grid (Bento Box) style. As the user scrolls, `framer-motion` `whileInView` triggers reveal animations.
3. **Dynamic Typography**: Renders the project's title in massive, faint background text (`text-[15vw] opacity-5`) inside the card container.
4. **Interactive Embedding**: Contains specific conditional logic for the "Weather Widget" project. When rendering the weather widget card, it hides the standard description text and massive hover buttons, and directly embeds the live, interactive `<WeatherWidget isMaximized={true} />` component inside the card layout.

## Requirements
- `framer-motion` for scroll animations.
- The `WeatherWidget` component for interactive embedding.

## Outbound Data Flow
- **Input**: None directly, but passes data down to embedded interactive components.
- **Output**: Renders project data visually to the DOM.
