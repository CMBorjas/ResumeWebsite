## What is it?
The main entry point of the website (`src/app/page.tsx`), acting as the primary landing page and showcasing a hybrid architectural layout.

## Why was it modified/created?
It was modified to combine the existing Cyberpunk Bento Box grid with premium, smooth-scrolling portfolio aesthetics. The goal was to create a more impactful first impression with a full-viewport Hero section and a more interactive scroll experience.

## How it works?
The page is split into two primary sections:
1. **Hero Section**: A `min-h-[95vh]` container using flexbox to center massive typography and call-to-action buttons. It includes a scroll indicator with an infinite `framer-motion` bounce loop.
2. **Bento Grid Section**: A CSS Grid layout containing various modules (Skills, Experience, Weather, etc.). Each `BentoBox` is wrapped in a `framer-motion` `<motion.div>` utilizing `whileInView` with a `viewport={{ once: true, margin: "-50px" }}` parameter, causing the boxes to spring up organically as the user scrolls them into the viewport.

## Requirements
- Next.js (App Router)
- React hooks (`useState`, `useEffect`)
- `framer-motion` for scroll and hover animations
- Tailwind CSS for layout and typography

## Outbound Data Flow
The landing page does not mutate external data but aggregates and displays several client components (WeatherWidget, TestimonialCards, GithubActivityFeed, etc.). State is maintained locally within the `BentoBox` for minimize/maximize functionality.
