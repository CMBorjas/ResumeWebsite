---
name: dynamic-theme-engine
description: Uses React Context to hot-swap CSS variables for different themes (Cyberpunk, Forestpunk, Corporate).
version: 1.0.0
metadata:
  hermes:
    tags: [react, nextjs, css, theme]
    category: ui
---

# Dynamic Theme Engine

## When to Use
Trigger this skill when modifying or adding new visual themes to the website, or when components need to respond to the current active theme.

## Procedure
1. Access the `ThemeProvider` context in `src/components/ThemeProvider.tsx`.
2. Define new CSS variables in `src/styles/globals.css` under the respective `[data-theme='new-theme']` selector.
3. Update `ThemeSwitcher.tsx` to include the new theme option.

## Pitfalls
- Ensure that the initial theme load from `localStorage` does not cause hydration mismatches between server and client.

## Verification
Switch themes using the ThemeSwitcher and verify that all styled components update instantly without a page reload.
