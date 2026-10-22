# ResumePage Route

## What is it?
The `ResumePage` component (`src/app/resume/page.tsx`) provides a dedicated interactive resume viewing and download interface at the `/resume` route of the portfolio.

## Why was it modified/created?
Built to offer recruiters, colleagues, and collaborators instant in-browser inspection and direct downloading of Christian Mandujano Borjas's official curriculum vitae. Updated with the latest single-page resume PDF showcasing systems administration, network integrity, and software engineering experience.

## How it works?
1. **Dynamic Pathing**: Calculates `basePath` based on `process.env.NODE_ENV` (`/ResumeWebsite` in production for GitHub Pages static hosting, empty in development).
2. **Download Link**: Employs an anchor element with `download="Christian_Mandujano_Borjas_Resume.pdf"` linking directly to `${basePath}/resume/Christian_Mandujano_Borjas_Resume.pdf`.
3. **Embedded Viewer**: Utilizes an `<iframe>` container enclosed within a cyberpunk glassmorphic frame (`bg-[#0d1117]`, `border-2 border-brand-cyan/50`, and hover glow) displaying the PDF document directly.

## Requirements
- Next.js App Router (`output: 'export'`).
- Static PDF asset located at `public/resume/Christian_Mandujano_Borjas_Resume.pdf`.
- Tailwind CSS cyberpunk theme tokens (`var(--color-brand-cyan)`).

## Outbound Data Flow
- Self-contained presentational route. Does not mutate external data or make external network calls.
