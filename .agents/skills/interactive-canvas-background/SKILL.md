---
name: interactive-canvas-background
description: Custom HTML5 canvas background component that reacts to cursor movement.
version: 1.0.0
metadata:
  hermes:
    tags: [react, canvas, interactive, ui]
    category: ui
---

# Interactive Canvas Background

## When to Use
Trigger this skill when updating the background visuals, particle effects, or any interactive geometry on the canvas background.

## Procedure
1. Modify `src/components/InteractiveCanvas.tsx`.
2. Adjust particle density, connection distance, or colors within the drawing loop.
3. Handle window resize events to maintain canvas scaling.

## Pitfalls
- High particle counts can cause performance degradation on mobile devices. Limit drawing operations and use `requestAnimationFrame`.

## Verification
Move the cursor across the screen and verify that particles/connections react smoothly at 60 FPS.
