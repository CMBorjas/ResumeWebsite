# Server Performance Statistics (Nexus_Core)

## What is it?
Nexus_Core is a front-end telemetry dashboard mimicking a high-performance server monitoring suite. It tracks metrics like CPU Usage, Memory Allocation, and Network I/O in real-time, matching the overarching cyberpunk theme of the portfolio. It leverages Recharts for data visualization and framer-motion for micro-interactions.

## Why was it modified/created?
It was created to fulfill the "Server performance statistics" objective on the project backlog, demonstrating the ability to integrate graphing libraries (Recharts) and build dynamic, interval-based React components that simulate real-time data streams on a static export environment.

## How it works?
Because the portfolio is statically exported to GitHub Pages (`output: 'export'`), an actual Node.js backend cannot run dynamically to fetch real OS-level telemetry. Instead, the `ServerStats.tsx` component acts as both the client and the simulated server. 
A React `useEffect` runs a `setInterval` every 1000ms. On each tick, it generates realistic fluctuations for CPU, RAM, and Network metrics based on the previous state, preventing jarring jumps in the data. The data is appended to an array (capped at 20 points) and passed into two Recharts `AreaChart` components. Framer-motion animates the expanding progress bars and flashes a system status warning if the simulated CPU load spikes above 85%.

## Requirements
- `recharts` for the `AreaChart`, `XAxis`, `YAxis`, and `Tooltip`.
- `framer-motion` for animated status text (`AnimatePresence`) and progress bars.
- `lucide-react` for iconography.
- React 19 Client Component (`"use client"`).

## Outbound Data Flow
Data flows entirely within the isolated scope of `ServerStats.tsx`. The generated metrics dictate the height of the SVG area gradients and the width of the DOM progress bars. It does not mutate global context or localStorage.
