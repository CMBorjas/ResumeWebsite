# ResumeWebsite Agent Rules and Documentation

## Project Context
This is a cyberpunk-themed personal portfolio for Christian Mandujano Borjas built with Next.js App Router, React, Tailwind CSS, and Framer Motion. 

## Architectural Rules
1. **Aesthetics Over Simplicity**: Prioritize visually stunning UI implementations. Use "Bento Box" glassmorphic grid layouts, high-contrast neon accents, and interactive hover states. Do not default to plain or "basic" layouts.
2. **Component Structure**: Place new reusable React components in `src/components/`. Use Server Components by default; add `"use client"` only when hooks or interactive animations (`framer-motion`) are necessary.
3. **Animations**: Next.js page route changes should be fluid. Utilize `framer-motion` and `<AnimatePresence>` for seamless transitions.
4. **State Management**: Use React Context for global states (e.g., the Dynamic Theme Engine) and `localStorage` for persisting user preferences.
5. **Data Handling**: Always cross-reference `src/lib/projects.ts` when modifying project data or GitHub feeds to maintain data integrity.

## Agent Instructions
- **File Integrity**: Preserve all existing comments and docstrings unless explicitly told to remove them.
- **Self-Maintenance**: If you make architectural changes, add new pages, or achieve roadmap goals, you MUST update the project's documentation, including the `README.md` and `.agents/knowledge_graph.md`.
- **Knowledge Vault**: Whenever you modify or create significant files, you MUST create or update the corresponding Markdown file inside the `knowledge-vault/` Obsidian directory. Each vault file should explain what the file is, why it was modified, how it works, its requirements, and its outbound data flow.
