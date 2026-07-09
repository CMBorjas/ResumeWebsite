# PhotoMasonry Component

## What is it?
The `PhotoMasonry.tsx` component is a dynamic CSS masonry grid showcasing photography, integrated with a custom `framer-motion` Lightbox modal. It is located at `src/app/projects/photo-showcase/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Photo Showcase" objective from the backlog. It demonstrates advanced CSS layout techniques (using Tailwind columns for true masonry without JS calculations) combined with high-fidelity UI animations for the lightbox overlay.

## How it works?
1. **Masonry Layout**: The main grid uses Tailwind's `columns-1 sm:columns-2 lg:columns-3` combined with `break-inside-avoid` on children to create a seamless vertical masonry layout.
2. **Hover Effects**: Each photo features a gradient overlay and text that slides up on hover, utilizing standard Tailwind `group-hover` translation and opacity transitions.
3. **Lightbox Modal**: When an image is clicked, `selectedPhoto` state is set. An `<AnimatePresence>` block renders a fixed-position overlay. The clicked image expands using a spring physics transition (`framer-motion`).
4. **Data Source**: It uses a mocked array of high-quality Unsplash URLs (pre-filtered for a cyberpunk/neon aesthetic).

## Requirements
- `framer-motion` for the Lightbox entrance/exit spring animations.
- React state (`useState`).

## Outbound Data Flow
- **Input**: User clicks on images.
- **Output**: Purely internal state mutations for the lightbox. Images are fetched via standard `<img>` requests to Unsplash CDN. No local data persistence is required.
