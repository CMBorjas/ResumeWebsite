---
name: data-visualization-recharts
description: Interactive and animated data visualization charts using Recharts, integrated with dynamic CSS variables.
---

# Data Visualization with Recharts

This skill provides guidelines and patterns for building responsive, theme-aware data visualizations in the ResumeWebsite project using Recharts.

## Core Principles

1.  **Dynamic Theming**: Always use the project's CSS variables (`var(--primary)`, `var(--accent)`, `var(--foreground)`, `var(--background)`) for chart colors (strokes, fills, tooltip backgrounds) rather than hardcoded hex values. This ensures the charts instantly adapt when the user switches themes (Cyberpunk, Forestpunk, Corporate).
2.  **Responsiveness**: Wrap charts in a `<ResponsiveContainer width="100%" height="100%">` and place them within a sized parent `div` (e.g., `h-[300px] w-full`) to guarantee they scale beautifully across desktop and mobile.
3.  **Bento Box Layout**: Data visualizations should be presented inside styled cards (`bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--primary)]/20 p-6 rounded-2xl shadow-xl`), aligning with the project's Bento Box design architecture.
4.  **Animations**: Combine Recharts' built-in SVG animations with `framer-motion` for the parent containers to create a fluid, staggered entrance effect.

## Basic Implementation Pattern

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 }
];

export function ThemedLineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--primary)]/20 p-6 rounded-2xl shadow-xl"
    >
      <h2 className="text-xl font-bold mb-4 text-[var(--foreground)]">Chart Title</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--primary)" opacity={0.1} />
            <XAxis dataKey="name" stroke="var(--foreground)" opacity={0.7} />
            <YAxis stroke="var(--foreground)" opacity={0.7} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--primary)',
                color: 'var(--foreground)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--primary)" 
              strokeWidth={3} 
              dot={{ r: 4 }} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
```

## Best Practices

- Avoid using default D3/Recharts color palettes. They will clash with the site's neon/dark-mode aesthetic.
- Use `opacity` (e.g., `opacity={0.1}` on `CartesianGrid`) to keep charts looking clean and futuristic without overwhelming the data lines.
- Customize the `Tooltip` component to use the site's theme background and primary/accent colors for borders.
