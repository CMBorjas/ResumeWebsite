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

## Agent Instructions
- **File Integrity**: Preserve all existing comments and docstrings unless explicitly told to remove them.
- **Self-Maintenance**: If you make architectural changes, add new pages, or achieve roadmap goals, you MUST update the project's documentation, including the `README.md` and `.agents/knowledge_graph.md`.
- **Knowledge Vault**: Whenever you modify or create significant files, you MUST create or update the corresponding Markdown file inside the `knowledge-vault/` Obsidian directory. Each vault file should explain what the file is, why it was modified, how it works, its requirements, and its outbound data flow.
- **Task Tracking**: Whenever you stage and push changes to GitHub, you MUST ensure that `TODO.md` is fully updated, verifying that all completed objectives are checked off correctly and moved to the appropriate completed sections if necessary.
