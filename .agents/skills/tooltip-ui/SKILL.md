---
name: tooltip-ui
description: Dynamic tool tip UI for displaying additional information on hover.
version: 1.0.0
metadata:
  hermes:
    tags: [react, tailwind, ui]
    category: ui
---

# Tool Tip UI

## When to Use
Trigger this skill when a UI element needs supplementary context without cluttering the screen.

## Procedure
1. Import and wrap the target element with the `Tooltip` component from `src/components/Tooltip.tsx`.
2. Provide the `content` prop with the text to display.
3. Position the tooltip (top, bottom, left, right) using the appropriate props.

## Pitfalls
- Tooltips getting cut off by `overflow-hidden` containers. Use portals or z-index positioning if necessary.

## Verification
Hover over the wrapped element and verify the tooltip appears after a short delay and is positioned correctly.
