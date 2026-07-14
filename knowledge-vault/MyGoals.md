## What is it?
The `MyGoals` component is a section displaying four primary career and technical goals, modeled after a structured numerical list UI with custom SVG icons. It replaced the previous text-heavy "About Me" component.

## Why was it modified/created?
Created to improve the visual hierarchy and scannability of the portfolio. The user requested a redesign to match a specific "Goals" theme consisting of numbered, bold items with descriptions and relevant iconography.

## How it works?
It iterates through a hardcoded `goals` array containing strings and React icons. It renders them using CSS grid (`grid-cols-2` on md breakpoint) with a hover effect that slightly dims the numbers and highlights the title and description to emphasize focus.

## Requirements
- `react-icons/fa` for SVG iconography.
- Tailwind CSS for styling, specifically utilizing `group` and `group-hover` utility classes for synchronized animations.

## Outbound Data Flow
Pure presentation component. No outbound data flow or state mutations.
