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
| VB-002 | 2026-07-14 | 2026-07-14 | `/page.tsx` | Fixed missing profile picture on GitHub pages by replacing `<img>` tags with Next.js `<Image>` which automatically handles `basePath`. |

---
*Note for AI Agents: Always append new open bugs to the "Active Bugs" table. When resolving, move the row to the "Resolved Bugs" table and summarize the fix.*
