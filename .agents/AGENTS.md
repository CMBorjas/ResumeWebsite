# ResumeWebsite Agent Rules and Documentation

## Project Context
This is a cyberpunk-themed personal portfolio for Christian Mandujano Borjas built with Next.js App Router, React, Tailwind CSS, and Framer Motion. 

## Architectural Rules
1. **Aesthetics Over Simplicity**: Prioritize visually stunning UI implementations. Use "Bento Box" glassmorphic grid layouts, high-contrast neon accents, and interactive hover states. Do not default to plain or "basic" layouts.
2. **Component Structure**: Place new reusable React components in `src/components/`. Use Server Components by default; add `"use client"` only when hooks or interactive animations (`framer-motion`) are necessary.
3. **Animations**: Next.js page route changes should be fluid. Utilize `framer-motion` and `<AnimatePresence>` for seamless transitions.
4. **State Management**: Use React Context for global states (e.g., the Dynamic Theme Engine) and `localStorage` for persisting user preferences.
5. **Data Handling**: Always cross-reference `src/lib/projects.ts` when modifying project data or GitHub feeds to maintain data integrity.
6. **Utility Widgets & APIs**: When building utility converters (e.g. Currency Converter) or feeds that rely on public external APIs, fetch data in a Next.js Server Component utilizing Incremental Static Regeneration (ISR) (`next: { revalidate: <seconds> }`) to prevent rate limiting, and pass the data down to a Client Component for interactive UI rendering and math operations.
7. **Static Export Data Simulation**: Since the site relies on `output: 'export'` for GitHub Pages, you cannot run an active Node.js backend. All dynamic backend data simulations (like telemetry or server stats) MUST be built entirely on the client side using React `useEffect` intervals or realistic randomized data generation techniques to maintain a "live" feel.

## Agent Instructions
- **File Integrity**: Preserve all existing comments and docstrings unless explicitly told to remove them.
- **Self-Maintenance**: If you make architectural changes, add new pages, or achieve roadmap goals, you MUST update the project's documentation, including the `README.md` and `.agents/knowledge_graph.md`.
- **Knowledge Vault**: Whenever you modify or create significant files, you MUST create or update the corresponding Markdown file inside the `knowledge-vault/` Obsidian directory. Use the following outline for each file:
  - `## What is it?`: Explain what the file is.
  - `## Why was it modified/created?`: The rationale behind the changes.
  - `## How it works?`: Detailed technical explanation.
  - `## Requirements`: Dependencies, APIs, or required context.
  - `## Outbound Data Flow`: Where the data goes or what it mutates.
- **Task Tracking**: Whenever you stage and push changes to GitHub, you MUST ensure that `TODO.md` is fully updated, verifying that all completed objectives are checked off correctly and moved to the appropriate completed sections if necessary.
- **Visual Bug Tracking**: If you discover, fix, or encounter any visual bugs (UI layout breaks, responsive design flaws, etc.), you MUST update `VISUAL_BUGS.md` in the repository root. Ensure you use the provided tables to log active bugs or document resolved ones.
