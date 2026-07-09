---
file: src/app/projects/data-visualization/page.tsx
type: component
tags: [react, nextjs, recharts, framer-motion, frontend, ui]
---

# Data Visualization Page

## Overview
This file (`src/app/projects/data-visualization/page.tsx`) contains the main React component for the Data Visualization project on the ResumeWebsite.

## What Was Modified
This file was **created** to introduce a new route (`/projects/data-visualization`). It implements an interactive dashboard featuring a Line Chart, a Bar Chart, and a Radar Chart.

## Why It Was Modified
The Data Visualization project was listed as a High Priority goal in the `TODO.md` roadmap. It serves to showcase the ability to render complex data sets graphically in a visually appealing, responsive manner.

## How It Works
- **Layout**: It utilizes a CSS Grid ("Bento Box" style) to organize the charts into responsive cards.
- **Animations**: It uses `framer-motion` (`<motion.div>`) to apply subtle staggered entrance animations (fade and scale up) when the page loads.
- **Charts**: It utilizes the `recharts` library (`<LineChart>`, `<BarChart>`, `<RadarChart>`) to render SVG-based interactive charts.
- **Theming**: The charts pull color values directly from the site's global CSS variables (e.g., `var(--primary)`, `var(--foreground)`). This ensures the charts instantly recolor themselves when the user swaps the global theme (e.g., Cyberpunk to Forestpunk) without requiring a page reload or state drill-down.

## Requirements
- **Dependencies**: 
  - `recharts`: For rendering the SVG data visualizations.
  - `framer-motion`: For the entrance micro-animations.
  - `lucide-react`: For the back arrow icon (`<ArrowLeft>`).
- **Styles**: Requires the global CSS variables defined in the `Dynamic Theme Engine Context` to render correctly.

## Data Flow (Outbound)
**None.** 
This component is purely presentational and client-side. It relies entirely on static, hardcoded mock data for demonstration purposes. It does not send any HTTP requests, does not mutate global state, and does not emit data to other parts of the application.
