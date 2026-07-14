## What is it?
The `ExperienceTimeline` is a section-level component rendered on the homepage (`src/app/page.tsx`) that displays a vertical timeline of work experience and education entries. It replaces the old compact BentoBox `~/EXPERIENCE` widget.

## Why was it modified/created?
Redesigned to match theme screenshots 18–21 from `Themes_examples/Theme/`. The old BentoBox was too compact and didn't do justice to the experience data. The new design uses massive typographic headers, icon section dividers, dashed vertical timelines, and inline accordion expand — all animated with framer-motion.

## How it works?
1. **ExperienceTimeline** renders the full section:
   - Massive "EXPERIENCE" typographic header with overlay blend effect (matches hero treatment)
   - Briefcase icon in a dashed circle divides the "work" sub-section
   - `TimelineEntry` cards for each `workEntries` item
   - Graduation cap icon divides the "education" sub-section
   - `TimelineEntry` cards for each `educationEntries` item

2. **TimelineEntry** renders each card:
   - Desktop: date range in a dashed-border box on the left, content card on the right
   - Mobile: date range renders inline at the top of the card
   - "KNOW MORE" button toggles an `AnimatePresence` accordion revealing bullet points
   - Each bullet staggers in with a slight delay for visual polish
   - Tag badge (HARDWARE, SUPPORT, DEGREE, ASSOCIATE) with color-coded styling
   - Sequential number (01, 02) rendered in faded large text

3. **Animations**: All elements use `whileInView` for scroll-triggered reveals. Entries stagger by index.

## Requirements
- `framer-motion` for `AnimatePresence`, `motion.div`, `whileInView`
- `src/lib/experience.ts` for data
- Tailwind CSS 4 with `brand-cyan`/`brand-pink` custom colors

## Outbound Data Flow
- Reads from `experience.ts` — does not mutate any state
- Self-contained section; no props passed from parent
