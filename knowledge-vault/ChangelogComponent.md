# ChangelogComponent 

## What is it?
The `ChangelogComponent.tsx` is an interactive timeline widget that parses and displays project version history, release notes, and patch updates. It is located at `src/components/ChangelogComponent.tsx`.

## Why was it modified/created?
Created to fulfill the "Changelog Component" objective. It allows the portfolio to demonstrate iterative development (CI/CD visualization) by listing out semantic versions (e.g., v1.0.2) along with categorized bullet points (Added, Fixed, Removed).

## How it works?
1. **Data Ingestion**: Takes a prop containing structured JSON or an array of release objects (`version`, `date`, `changes[]`).
2. **Rendering**: Maps through the releases, utilizing Tailwind CSS to create a vertical timeline line on the left side of the container.
3. **Categorization**: Reads the `type` of each change (e.g., 'feat', 'fix', 'chore') and assigns color-coded badges (e.g., Green for features, Red for fixes) dynamically.
4. **Animation**: `framer-motion` provides a staggered slide-in effect as the user scrolls down the timeline.

## Requirements
- `framer-motion` for scroll-linked entrance animations.
- Tailwind CSS for border/timeline generation.
- A structured data source (either passed as a prop or imported from a static `.json` file).

## Outbound Data Flow
- **Input**: `ChangelogData[]` array.
- **Output**: Purely presentational. No outbound data flow.
