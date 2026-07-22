## What is it?
The `InteractiveCanvas.tsx` component is a background visual element that provides an interactive, full-screen particle system rendered natively on an HTML5 `<canvas>`.

## Why was it modified/created?
It was created to fulfill the project goal of replacing static backgrounds with a custom, high-performance interactive animation that responds to the user's cursor. It was recently modified to support the Dynamic Theme Engine (specifically the "corporate" theme) with adjusted opacity values to prevent visual overwhelming of the main content while maintaining its glassmorphic effect through the layout padding.

## How it works?
The component leverages the `useRef` hook to directly access the DOM `<canvas>` node and `requestAnimationFrame` for a smooth 60fps render loop. It generates a collection of particle objects that drift randomly across the screen. An event listener tracks mouse movement (`handleMouseMove`), updating a global mouse coordinate. As the animation loop iterates, particles calculate their distance to the cursor and apply a repulsion vector if they fall within the interaction radius, simulating a physical forcefield.

## Requirements
- Next.js / React (Client Component)
- HTML5 Canvas API
- `ThemeProvider` context to read the active theme for dynamic styling.

## Outbound Data Flow
The component does not mutate external state or export data. It operates purely as a visual backdrop at `z-0`, passively reacting to mouse inputs via DOM event listeners.
