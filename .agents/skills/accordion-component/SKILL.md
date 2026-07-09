---
name: accordion-component
description: Collapsible UI component for FAQs or dense information.
version: 1.0.0
metadata:
  hermes:
    tags: [react, tailwind, ui, animation]
    category: ui
---

# Accordion Component

## When to Use
Trigger this skill when displaying lists of information (like FAQs) that should be toggleable to save vertical space.

## Procedure
1. Import `Accordion` from `src/components/Accordion.tsx`.
2. Pass an array of items containing `title` and `content`.
3. Use `framer-motion` for the height animation to smoothly open and close items.

## Pitfalls
- Animating height to `auto` can be tricky. Ensure `framer-motion` handles the `height: "auto"` transition properly.

## Verification
Click an accordion header and verify it expands smoothly, collapsing any previously opened items if configured to do so.
