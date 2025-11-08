## Repo summary

This repository is a simple, static resume website built with plain HTML and CSS. There is no build step. The site lives at the repository root (`index.html`) and additional pages are stored in the `pages/` folder. Static assets (images, logo, header images) live under `images/website resources/`.

Key files to read before editing:
- `index.html` — homepage and primary layout (header + main content)
- `pages/*.html` — individual pages (education, skills, work-experience, contact)
- `styles.css` — global styling for the whole site
- `images/website resources/header/` and `images/website resources/logo/` — header background and logo
- `README.md` — basic README and the published GitHub Pages URL

What an AI assistant should know and do here
- This is a static site: changes are immediate (no compile). Aim for minimal, targeted edits to HTML/CSS.
- Preserve the site's relative linking pattern. Pages use relative hrefs (e.g., `pages/education.html` or `../index.html`) — update links consistently when adding new files.
- Keep global styles in `styles.css`. Prefer adding small component classes there rather than inline styles scattered across files.
- Images use spaces in the folder name (`website resources`). When generating paths, match the existing structure exactly (e.g., `images/website resources/logo/website.png`).

Local dev & verification (PowerShell-friendly)
- Quick check by opening `index.html` in a browser. For a local server (better for relative assets), from project root:

```powershell
# from repo root
python -m http.server 8000
# then open http://localhost:8000 in a browser
```

Or use Live Server / VS Code extension if preferred. No npm / build commands are required.

Editing patterns & examples
- To add a new page: create `pages/your-page.html`, add content, then add a link in the footer nav in `index.html` and each page (footer is duplicated across pages). Example link: `<li><a href="pages/projects.html">Projects</a></li>`.
- To change the site palette or typography, edit `styles.css` — do not introduce new CSS files unless the change is large and documented in the commit message.
- Header background: `index.html` and `styles.css` use a background image line in header (`images/website resources/header/...`). If you replace the image, keep the same filename or update both the HTML and the CSS where referenced.

AI code-edit guidance (be conservative)
- Make localized changes. Avoid global refactors without an explicit request.
- Preserve email and contact information unless instructed to anonymize. If asked to change content, state the change and its scope in the PR message.
- When adding files, update the footer navigation in every page so links remain consistent.

Deployment notes
- The README indicates this is hosted on GitHub Pages at `https://cmborjas.github.io/ResumeWebsite/`. Deploy is automatic when pushing to `main` (GitHub Pages configured for repo-root). No CI or build steps.

Success criteria for edits
- Site renders locally (open `index.html` or via `python -m http.server`) with no missing images or broken links.
- CSS changes are limited to `styles.css` and do not duplicate existing rules.
- Footer navigation and header remain present and functional on all pages.

Files to inspect for context when making changes: `index.html`, `pages/*.html`, `styles.css`, `images/website resources/*`, `README.md`.

If anything is unclear, ask which pages or assets to modify and whether you should update all footer navs or only specific ones.

— End of instructions —
