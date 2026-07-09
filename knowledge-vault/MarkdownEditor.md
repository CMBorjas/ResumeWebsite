# MarkdownEditor Component

## What is it?
The `MarkdownEditor.tsx` component is a client-side note-taking utility that parses markdown text and renders it as rich HTML. It is housed at `src/components/MarkdownEditor.tsx`.

## Why was it modified/created?
Created to fulfill the "Markdown Note Taking App" objective. It demonstrates the ability to handle text parsing, state synchronization, and building developer-focused tooling within a web interface.

## How it works?
1. **Input/Output Split**: The UI is split into two panels: a raw `<textarea>` on the left (or top on mobile) for user input, and a rendered `<article>` on the right.
2. **State**: Uses `useState` to track the raw markdown string.
3. **Parsing**: Uses a markdown parsing library (like `marked` or `react-markdown`) to safely convert the raw string into DOM nodes.
4. **Security**: Ideally utilizes DOM sanitization (like `DOMPurify`) before rendering the parsed HTML to prevent XSS attacks if user-input is ever saved and re-rendered.

## Requirements
- A markdown parsing dependency (e.g., `react-markdown`).
- (Optional but recommended) `isomorphic-dompurify` for XSS protection.
- Tailwind Typography (`@tailwindcss/typography`) plugin for applying clean default styles (`prose prose-invert`) to the parsed HTML.

## Outbound Data Flow
- **Input**: User keystrokes in the raw textarea.
- **Output**: The parsed output is rendered directly to the DOM. Currently, it does not persist to an external database, though it may write to `localStorage` for session persistence.
