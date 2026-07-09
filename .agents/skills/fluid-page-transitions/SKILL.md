---
name: fluid-page-transitions
description: Seamless route transitions using framer-motion and AnimatePresence.
version: 1.0.0
metadata:
  hermes:
    tags: [react, nextjs, framer-motion, animation]
    category: ui
---

# Fluid Page Transitions

## When to Use
Trigger this skill when creating new page routes or adjusting the entry/exit animations of the Next.js application.

## Procedure
1. Ensure the page component is wrapped with `<PageTransition>` from `src/components/PageTransition.tsx`.
2. Use `framer-motion` variants to define the `initial`, `animate`, and `exit` states.
3. Ensure `<AnimatePresence>` is properly configured in the root layout or template.

## Pitfalls
- Removing `<AnimatePresence>` or wrapping it incorrectly can cause exit animations to be skipped entirely.
- Ensure `"use client"` is at the top of any file using `framer-motion`.

## Verification
Navigate between routes and observe the fade/slide transitions.
