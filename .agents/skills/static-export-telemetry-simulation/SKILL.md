---
name: static-export-telemetry-simulation
description: Patterns for simulating live backend telemetry and real-time data streams purely on the client side for Next.js static exports.
---

# Static Export Telemetry Simulation

Because the project relies on a strictly static export (`output: 'export'`) to deploy to GitHub Pages, you cannot run active Node.js servers, WebSockets, or background daemons to stream real hardware telemetry or live metrics.

To maintain the dynamic, living feel of a cyberpunk OS, you must simulate "live" data directly within React Client Components.

## Core Simulation Principles

1. **The Client is the Server**: Use `useEffect` and `setInterval` on the client component to mimic backend data ticks.
2. **Smooth Value Fluctuations**: Do not use completely random numbers across the entire domain on every tick, as this creates a jarring, unrealistic aesthetic. Instead, calculate the *next* state based on the *previous* state using a restricted random-walk algorithm (e.g. `prev + (Math.random() * variance - (variance/2))`).
3. **Array Queueing**: When feeding graphing libraries (like Recharts), maintain a fixed-length array (e.g. 20 data points) to simulate a moving time window. Push new data to the end and slice off the front.
4. **No Recharts Animation**: When updating a graph every 1 second, Recharts' default animation will conflict with the new DOM paint. You MUST set `isAnimationActive={false}` on the `<Area>` or `<Line>` components to ensure it draws instantaneously.

## Basic Implementation Pattern

```tsx
'use client'
import { useState, useEffect } from 'react'

type DataPoint = {
  time: string
  metric: number
}

export function LiveTelemetryWidget() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // 1. Initialize data
    const initial = Array.from({ length: 20 }, (_, i) => ({
      time: `-${20 - i}s`,
      metric: 50 // Base starting point
    }))
    setData(initial)

    // 2. Start the simulation "backend"
    const interval = setInterval(() => {
      setData((prev) => {
        // 3. Smooth random walk (fluctuate by max +/- 5 from previous)
        const lastValue = prev[prev.length - 1].metric
        const nextValue = Math.max(0, Math.min(100, lastValue + (Math.random() * 10 - 5)))

        // 4. Slide the window
        return [...prev.slice(1), {
          time: 'Now',
          metric: Math.round(nextValue)
        }]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
       {/* Render data via Recharts here with isAnimationActive={false} */}
    </div>
  )
}
```

## Integrating with Framer Motion
While you should disable the internal `recharts` animations for the graph lines, you SHOULD use `framer-motion` for supplementary UI updates on the same tick (e.g., expanding a `<motion.div>` progress bar or using `<AnimatePresence mode="wait">` to swap a `STATUS: OK` text to a glowing red `STATUS: WARNING`).
