---
name: utility-converters-architecture
description: Architectural guidelines and patterns for building real-time conversion and utility widgets (e.g. Unit Converter, Currency Converter) within the ResumeWebsite project.
---

# Utility Converters Architecture

When tasked with building a new utility widget (such as a Unit Converter, File Integrity Checker, or Number Guessing Game), adhere to the following architecture:

## 1. File Location & Routing
- Place the core logic and UI in a standalone React Component within `src/components/` (e.g., `UnitConverter.tsx`).
- Serve the component on the dedicated `/projects/converters` page (`src/app/projects/converters/page.tsx`). If the utility doesn't fit the "converters" theme, find or create an appropriate sub-route under `/projects`.

## 2. API Data Fetching (Server-Side)
- If the widget relies on external public APIs (like exchange rates or weather), **do not fetch from the client component directly**.
- Fetch the data in the Server Component (`page.tsx`) using Next.js `fetch`.
- **CRITICAL**: Use Incremental Static Regeneration (ISR) via `next: { revalidate: <seconds> }` to heavily cache the data on the server and prevent rate limits.
- Example:
  ```typescript
  const res = await fetch('https://open.er-api.com/v6/latest/USD', {
    next: { revalidate: 86400 } // Cache for 24 hours
  })
  ```
- Pass the fetched data down to the Client Component as props.

## 3. Computation & Logic (Client-Side)
- The Client Component should include the `"use client"` directive.
- Perform all heavy computations, filtering, and state management purely in the browser using React's `useMemo`, `useState`, or Web APIs (e.g., `SubtleCrypto` for file hashing).

## 4. UI/UX Aesthetic
- The component must adhere to the project's glassmorphic "Bento Box" aesthetic.
- Use `bg-[#0a0f18]/80`, `backdrop-blur-md`, and glowing neon borders (e.g. `border-brand-cyan/50`).
- Incorporate hover micro-interactions to make the widget feel alive.
