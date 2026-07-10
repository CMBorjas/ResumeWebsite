# HexagonMenu Component

## What is it?
The `HexagonMenu.tsx` component is a visually distinct replacement for standard "Three Dots" (kebab) menus. Located at `src/components/HexagonMenu.tsx`, it uses a honeycomb/hexagon icon shape to toggle a dropdown list of quick-actions.

## Why was it modified/created?
Created to fulfill the "Homescreen Three Dots Menu" objective. Standard kebab menus are generic; a glowing, animated Hexagon menu perfectly aligns with the sci-fi, cyberpunk aesthetic of the portfolio, acting as a functional micro-interaction centerpiece.

## How it works?
1. **Trigger**: An SVG hexagon icon acts as the main button. Hovering or clicking rotates the hexagon (`framer-motion` `rotate` property).
2. **Dropdown**: Clicking toggles a `isOpen` state, which mounts a contextual dropdown menu using `<AnimatePresence>`.
3. **Click Outside**: Incorporates a custom `useClickOutside` hook (or ref-based event listener) to automatically close the menu if the user interacts with the rest of the application.
4. **Navigation**: Contains links to primary pages including Home, Projects, Resume, Contact, Live Projects, and Blog.

## Requirements
- `framer-motion` for rotation and dropdown physics.
- React hooks (`useState`, `useEffect`, `useRef`).
- SVG assets or `lucide-react` for the honeycomb graphic.

## Outbound Data Flow
- **Input**: User clicks/hovers.
- **Output**: Triggers navigation events or internal state mutations depending on the selected dropdown action. Does not emit data externally.
