# LiveLeaderboard Component

## What is it?
The `LiveLeaderboard.tsx` component is a real-time data visualization tool that simulates live scoring updates. It is located at `src/app/projects/leaderboard/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Real-Time Leaderboard" objective from the backlog. It demonstrates the ability to handle high-frequency state updates and utilize `framer-motion`'s `layout` prop to automatically and smoothly reorder DOM nodes as their underlying array data changes.

## How it works?
1. **State**: Maintains an array of `Player` objects containing a `score` and `trend` ('up', 'down', 'stable').
2. **Simulation**: A `useEffect` hook runs a `setInterval` loop every 2 seconds when `isLive` is true. It randomly selects a player, increases their score, adjusts trends, and re-sorts the array descending by score.
3. **Animation Engine**: The mapped `players` array is rendered inside an `<AnimatePresence>`. Each player row is a `<motion.div>` with the `layout` prop. When the array is re-sorted, `framer-motion` calculates the new DOM positions and automatically interpolates the transition, causing rows to physically swap places smoothly.

## Requirements
- `framer-motion` for layout transition physics.
- React hooks (`useState`, `useEffect`).

## Outbound Data Flow
- **Input**: Local user toggle to start/stop the simulation.
- **Output**: Purely local UI state updates. No network data is exported.
