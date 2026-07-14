## What is it?
`ProjectCarousel.tsx` is a client-side React component that renders a seamless, infinite scrolling marquee (carousel) of GitHub project cards. 

## Why was it modified/created?
It was created to replace the static project grid on the homepage. The goal was to build a more dynamic, visually engaging way to showcase the top 10 most recent projects while saving vertical screen real estate. The tech stack labels were also transformed into interactive brand logos to match the project's premium aesthetic.

## How it works?
- **Seamless Looping:** It clones the provided `projects` array and renders two identical Flexbox container nodes next to each other.
- **Flawless Mathematics:** By matching the `gap` size to the `padding-right` of each cloned block, a translation of `-50%` across the parent container translates the elements by the exact pixel width of one cloned block. This eliminates the stutter/jump that normally plagues infinite carousels.
- **Animation Execution:** It uses a native injected `<style>` block to execute a 120-second linear `@keyframes` CSS animation. This guarantees the animation runs correctly on Next.js without requiring a Tailwind configuration reload.
- **Interactions:** Applying `animation-play-state: paused` on hover allows users to stop the carousel and interact with the centered action button (live demo/repo links) or hover over the tech stack logos.

## Requirements
- `framer-motion` (for internal card hover physics)
- `react-icons` (for mapping tech stack strings to brand SVGs)
- `next/link`
- `Project` data interface from `src/lib/projects.ts`

## Outbound Data Flow
The component does not mutate external state. It reads the array of `Project` objects passed down via props (usually the first 10 items from `src/lib/projects.ts`) and renders them within its DOM tree.
