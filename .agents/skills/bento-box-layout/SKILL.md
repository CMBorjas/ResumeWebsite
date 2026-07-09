---
name: bento-box-layout
description: Responsive, glassmorphic CSS Grid architecture for UI panels.
version: 1.0.0
metadata:
  hermes:
    tags: [css, grid, tailwind, ui]
    category: ui
---

# Bento Box Layout

## When to Use
Trigger this skill when designing new page layouts or adding sections that require compartmentalized, glassmorphic cards.

## Procedure
1. Use CSS Grid (Tailwind's `grid`, `col-span-X`, `row-span-Y`) to define the bento box structure.
2. Apply the glassmorphism classes (e.g., `backdrop-blur`, semi-transparent backgrounds, magnetic borders) to the grid items.
3. Ensure the layout collapses gracefully to a single column on mobile viewports (`md:`, `lg:` prefixes).

## Pitfalls
- Overusing complex hover states on every single grid item can clutter the user experience.

## Verification
Resize the browser window from desktop to mobile and ensure the grid items stack correctly without overlapping.
