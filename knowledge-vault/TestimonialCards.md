# TestimonialCards Component

## What is it?
The `TestimonialCards.tsx` component displays an animated, rotating carousel of quotes or statements from satisfied clients, colleagues, or users. It resides in `src/components/TestimonialCards.tsx`.

## Why was it modified/created?
It was built to fulfill the "Testimonial Cards" requirement in the priority roadmap. Displaying testimonials adds social proof and credibility to the portfolio. It was designed to fit seamlessly into the "Bento Box" layout on the main index page.

## How it works?
1. **Data Structure**: Testimonials are currently stored in an internal static array containing `quote`, `author`, and `role`.
2. **State**: The component uses React `useState` to track the `currentIndex` of the visible quote and an `isPaused` boolean to halt the carousel on mouse hover.
3. **Animations**: It integrates `AnimatePresence` and `motion.div` from `framer-motion` to create a smooth crossfade and slide transition between array indices.
4. **Auto-Rotation**: A `useEffect` hook initializes a `setInterval` that automatically increments the `currentIndex` every 5 seconds, provided `isPaused` is false.

## Requirements
- React hooks (`useState`, `useEffect`).
- `framer-motion` for `<AnimatePresence>` carousel physics.
- Tailwind CSS for the glassmorphic styling inside the bento grid.

## Outbound Data Flow
- **Input**: Internal static array of quotes.
- **Output**: Emits DOM structure and animation states. Fully self-contained. It does not ping external APIs or mutate global state.
