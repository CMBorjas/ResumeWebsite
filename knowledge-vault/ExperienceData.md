## What is it?
`src/lib/experience.ts` is the centralized data source for all work experience and education entries displayed in the Experience timeline on the homepage. It exports typed `ExperienceEntry` objects with convenience filters (`workEntries`, `educationEntries`).

## Why was it modified/created?
The old Experience section was a tiny BentoBox widget with two hardcoded items. It was redesigned into a full timeline layout matching theme screenshots 18–21, requiring a proper data file for maintainability and reuse across the homepage timeline and the dedicated `/work-experience` and `/education` pages.

## How it works?
- Defines an `ExperienceEntry` interface with fields: `id`, `type` (work/education), `title`, `organization`, `location`, `dateRange`, `tag`, `tagColor`, and `bullets`.
- Exports the full `experienceEntries` array plus filtered helpers `workEntries` and `educationEntries`.
- Each entry's `tagColor` maps to a `TAG_COLORS` lookup in `page.tsx` for consistent badge styling.
- The `bullets` array drives the inline accordion expand ("KNOW MORE") content.

## Requirements
- No external dependencies — pure TypeScript data module.
- Must be imported wherever experience data is rendered (homepage `page.tsx`, potentially `work-experience/page.tsx` and `education/page.tsx`).

## Outbound Data Flow
- Consumed by `ExperienceTimeline` and `TimelineEntry` components in `src/app/page.tsx`.
- Data flows into framer-motion animated timeline cards with inline accordion expand.
