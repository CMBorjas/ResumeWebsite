# Accordion Component

## What is it?
The `Accordion.tsx` is a reusable, collapsible UI component for the React frontend, located at `src/components/Accordion.tsx`.

## Why was it modified/created?
It was created to fulfill the "Accordion" objective on the priority roadmap. An accordion is essential for managing dense information (like FAQs or grouped settings) in a clean, space-saving manner that aligns with the portfolio's cyberpunk/bento-box aesthetic.

## How it works?
1. **State Management**: Uses a boolean `isOpen` state to track whether the accordion body is expanded or collapsed.
2. **Animation**: Relies on `framer-motion`'s `<AnimatePresence>` and `<motion.div>` to animate the `height` from `0` to `auto` and `opacity` from `0` to `1` when toggled.
3. **Accessibility/UI**: Renders a button header that toggles the state, displaying a chevron icon that rotates based on the `isOpen` state.

## Requirements
- `framer-motion` for height/opacity transition physics.
- `lucide-react` (or standard SVG) for the toggle chevron.
- React hooks (`useState`).

## Outbound Data Flow
- **Input**: `title` (string) and `children` (ReactNode) props.
- **Output**: Purely internal UI state changes. No outbound data.
