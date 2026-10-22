# TestimonialCards Component

## What is it?
The `TestimonialCards.tsx` component renders an interactive, glassmorphic grid of endorsement quotes and professional recommendations from colleagues and engineering leaders (Tanner Clites, Saul Hernandez, Alexis Smith, Larry Brian). It resides in `src/components/TestimonialCards.tsx`.

## Why was it modified/created?
Originally built to fulfill the "Testimonial Cards" requirement in the priority roadmap to provide social proof and credibility. It was updated to replace generic placeholders (Jane Doe, John Smith, etc.) with real endorsements from colleagues and supervisors. Additionally, the component was previously evolved from a single-card rotating carousel into a multi-card responsive Bento grid.

## How it works?
1. **Data Structure**: Testimonials are stored in an internal static array containing `quote`, `author`, and `role`:
   - **Tanner Clites**: System Coordinator
   - **Saul Hernandez**: Facilities Manager
   - **Alexis Smith**: Project Engineer
   - **Larry Brian**: Junior Systems Engineer
2. **Responsive Layout**: Renders within a responsive grid (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6`) matching the cyberpunk bento aesthetic with backdrop blur (`backdrop-blur-xl`), dark slate tint (`bg-[#0a0f18]/80`), and neon border accents (`border-brand-cyan/20`).
3. **Micro-Interactions**: Leverages `framer-motion`'s `motion.div` with `whileHover={{ scale: 1.02, y: -5 }}` and CSS gradient transitions to provide smooth, reactive elevation and glow on card hover.
4. **Dynamic Avatar**: Extracts the author's initial dynamically (`testimonial.author.charAt(0)`) displayed within a gradient avatar badge.

## Requirements
- `framer-motion` for `motion.div` hover transitions.
- Tailwind CSS for glassmorphic styling, responsive grid, and theme token blending.

## Outbound Data Flow
- **Input**: Internal static array of testimonial objects.
- **Output**: Presentational DOM tree. Self-contained; does not ping external endpoints or mutate global context.

