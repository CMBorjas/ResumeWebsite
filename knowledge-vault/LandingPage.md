## What is it?
The main entry point of the website (`src/app/page.tsx`), acting as the primary landing page and showcasing a hybrid architectural layout.

## Why was it modified/created?
It was modified to combine the existing Cyberpunk Bento Box grid with premium, smooth-scrolling portfolio aesthetics. The goal was to create a more impactful first impression with a full-viewport Hero section and a more interactive scroll experience.

## How it works?
The page is split into two primary sections:
1. **Hero Section**: A `min-h-[95vh]` container featuring:
   - Fullscreen interactive typography ("CHRISTIAN MANDUJANO BORJAS" and watermark "COMPUTER SCIENCE GRADUATE").
   - Bottom-left action column: circular spinning SVG badge ("HIRE ME") and cybernetic social icon links.
   - Bottom-right anchored headshot: A cropped, transparent-background portrait of Christian Mandujano Borjas (`public/images/profile/Headshot_nobg.png`) set inside an `absolute bottom-0 right-0 z-20 pointer-events-none` container with `aspect-square`. On mobile, sized to `w-[135px] h-[135px]` (`sm:w-[170px]`) with `gap-4` on socials to guarantee 55px+ clearance from the email icon and prevent overlap, while scaling smoothly up to `h-[86vh]` on desktop/web (`md:max-w-[50vw]`) with `object-contain object-right-bottom` for a commanding corner presence with zero facial clipping.
   - Visitor telemetry integration: Executes the `useVisitorTelemetry()` hook on component mount, logging client environment parameters and broadcasting to configurable webhooks (e.g. Discord).
2. **Bento Grid Section**: A CSS Grid layout containing various modules (Skills, Experience, Weather, etc.). Each `BentoBox` is wrapped in a `framer-motion` `<motion.div>` utilizing `whileInView` with a `viewport={{ once: true, margin: "-50px" }}` parameter, causing the boxes to spring up organically as the user scrolls them into the viewport.

## Requirements
- Next.js 16 (App Router)
- React 19 hooks (`useState`, `useEffect`)
- `framer-motion` for scroll and hover animations
- Tailwind CSS 4 for layout and typography
- `@/hooks/useVisitorTelemetry` for anonymous telemetry pings

## Outbound Data Flow
The landing page aggregates and displays several client components (WeatherWidget, TestimonialCards, GithubActivityFeed, etc.). State is maintained locally within the `BentoBox` for minimize/maximize functionality. On mount, `useVisitorTelemetry()` emits anonymized visit metadata to configured endpoints (Discord webhook / custom HTTP receiver).

