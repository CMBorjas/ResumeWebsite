# Testimonial Cards

**File:** `src/components/TestimonialCards.tsx`

## Overview
The `TestimonialCards` component displays a rotating carousel of quotes or statements from satisfied customers, colleagues, or users. It uses `framer-motion` for smooth animated transitions between testimonials and is designed to fit inside the Bento Box layout of the home page.

## Why it was created
This component was created to satisfy the "Testimonial Cards" objective from the project's TODO roadmap. Displaying testimonials adds social proof and credibility to the portfolio, highlighting the author's professional reputation.

## How it works
1. **Data Structure:** Testimonials are stored in a static array containing a `quote`, `author`, and `role`.
2. **State Management:** Uses React `useState` to track the `currentIndex` of the active testimonial and `isPaused` to stop rotation on hover.
3. **Animations:** Integrates `AnimatePresence` and `motion.div` from `framer-motion` to create a smooth fade and slide transition when switching between testimonials.
4. **Auto-Rotation:** Uses a `useEffect` hook with a `setInterval` to automatically rotate the testimonials every 5 seconds. Hovering over the component pauses the rotation.

## Requirements
- `react` (useState, useEffect)
- `framer-motion` (AnimatePresence, motion)

## Outbound Data Flow
The component is fully self-contained and currently uses static internal data. It is imported and rendered directly in the home page (`src/app/page.tsx`) within a `BentoBox` wrapper. No external API calls are made.
