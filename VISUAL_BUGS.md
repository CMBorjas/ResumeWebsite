# Visual Bug Tracker

This document serves as a centralized, manually-maintained log of all visual bugs, UI layout breaks, and responsive design flaws across the cyberpunk portfolio. 
It operates in tandem with the `.github/ISSUE_TEMPLATE/visual_bug_report.md` for repository tracking.

**Agents MUST update this file** whenever a visual bug is discovered, resolved, or bypassed.

## Active Bugs

| Bug ID | Date Logged | Component / Page | Description | Environment | Status |
|---|---|---|---|---|---|
| VB-001 | 2026-07-09 | `/projects` Feed | Tags break into multiple lines awkwardly on very narrow screens (width < 340px). | Mobile (Safari) | `OPEN` |

## Resolved Bugs

| Bug ID | Date Logged | Date Resolved | Component / Page | Resolution Summary |
|---|---|---|---|---|
| (Example) | YYYY-MM-DD | YYYY-MM-DD | `HexagonMenu.tsx` | Fixed z-index overlap preventing tooltips from rendering over the canvas background. |
| VB-002 | 2026-07-14 | 2026-07-14 | `/page.tsx` | Fixed missing profile picture on GitHub Pages. With `output: export` and `unoptimized: true`, string paths bypass `basePath` mapping. Switched to Next.js static imports (`import headshotImage from '...'`) to ensure `basePath` is automatically prepended. |
| VB-003 | 2026-07-14 | 2026-07-14 | `CircularText` | Fixed text overlap (spelling mistake) and border intersecting text by adjusting font size, reducing component width, and pushing border to a negative inset. |
| VB-004 | 2026-07-22 | 2026-07-22 | `page.tsx` & `layout.tsx` | Fixed an issue where the InteractiveCanvas background was visually clipping through the sides of the layout padding on desktop (visible as a bright white edge on the corporate theme). Addressed by modifying the main container background to `bg-[#0a0f18]/80 backdrop-blur-sm` to create a seamless glassmorphic overlay, properly blending the canvas behind the main content. |

---
*Note for AI Agents: Always append new open bugs to the "Active Bugs" table. When resolving, move the row to the "Resolved Bugs" table and summarize the fix.*
