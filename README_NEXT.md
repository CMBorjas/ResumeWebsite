# Next.js + Tailwind scaffold (experimental)

This scaffold was added on top of the existing static site to migrate to a Next.js + TypeScript + Tailwind stack.

Quick start (PowerShell):

```powershell
# from repo root
npm install
npm run dev
```

Notes:
- The original static pages remain in the repo (`index.html`, `pages/` folder). The Next app lives under `src/app/`.
- After you confirm the migration, you may remove or archive the old static files.
- This is a minimal scaffold: add real projects to `src/lib/projects.ts` and images to `public/images/projects/`.
