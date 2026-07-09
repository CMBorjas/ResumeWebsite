# Data Visualization Route & Component

## What is it?
The `data-visualization-page.md` documents the `src/app/projects/data-visualization/page.tsx` page and any corresponding visualization components. It serves as a graphical representation hub for complex datasets, built on `recharts`.

## Why was it modified/created?
It was created as part of the "Data Visualization" task on the roadmap. It gives users visual insight into analytical data within the application using interactive SVGs instead of standard HTML elements, enhancing the dashboard and portfolio experience.

## How it works?
1. The route `src/app/projects/data-visualization/page.tsx` acts as the primary layout.
2. It imports `Recharts` library components (`LineChart`, `BarChart`, etc.) to map numerical and categorical data arrays into interactive visuals.
3. The charts use `framer-motion` for entrance micro-animations to align with the site's aesthetic.
4. Navigation utilizes `lucide-react` icons (like `<ArrowLeft>`) to navigate back to the main projects feed.

## Requirements
- `recharts` for SVG-based charts.
- `framer-motion` for component mount animations.
- `lucide-react` for iconography.
- Global CSS variables from the Dynamic Theme Engine to style chart elements consistently.

## Outbound Data Flow
- **Input**: Hardcoded mock datasets simulating API ingestion.
- **Output**: Purely presentational rendering to the DOM. It does not send any HTTP requests, does not mutate global state, and does not emit data out of the component.
