# RandomRepoShoutout (Portfolio Feed Showcase)

## What is it?
The `RandomRepoShoutout.tsx` component serves as the primary "Portfolio" feed on the homepage. It was originally a single, randomly cycling carousel of projects rendered inside a BentoBox. It has since been transformed into a full-width, vertically scrolling sequence of massive, highly stylized project cards (a "Hybrid Showcase").

## Why was it modified/created?
The original implementation was a static, manual carousel inside a small grid box. It was redesigned to match the "Screenshots 14-17" aesthetic, providing a high-impact, premium feel using a dark glassmorphic layout, huge typography, and animated floating action buttons. The goal was to make the portfolio section feel like a core feature rather than a minor widget.

## How it works?
The component maps over `showcaseProjects` (which filters `projects.ts` for entries containing either a `repoUrl` or `liveUrl`). 
For each project, it renders a large `motion.div` (`min-h-[550px]`) containing:
1. **Background Elements**: Faint grid overlay and large blurred gradients (cyan/pink).
2. **Dynamic Typography**: The project title rendered at `15vw` (or `10vw` on desktop) behind the content with a low opacity.
3. **Card Content**: The index number, bold title, tech stack pills, and description.
4. **Floating Action Button**: An absolutely centered "Live Demo" or "View Repo" gradient pill button. It uses nested Tailwind groups (`group/btn`) to stay hidden until the parent card is hovered, and handles internal hover animations independently.
5. **Animations**: The cards use `framer-motion`'s `whileInView` prop to smoothly glide and fade upwards into view as the user scrolls down the page.

## Requirements
- **Framer Motion**: For scroll-reveal and interaction animations.
- **Tailwind CSS v4**: For all styling, specifically complex nested groups (`group` / `group-hover` and `group/btn` / `group-hover/btn`).
- **Data Source**: Reaches out to `../lib/projects.ts` to source the project details.

## Outbound Data Flow
The component is stateless and purely reads from `projects.ts`. It renders outbound links via `next/link` which directs the user to either the GitHub repository or the live production deployment of the specific project.
