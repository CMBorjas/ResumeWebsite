# Tooltip Component

## What is it?
The `Tooltip.tsx` is a reusable interactive UI wrapper component located at `src/components/Tooltip.tsx`. It displays contextual information when a user hovers over or focuses on a specific child element.

## Why was it modified/created?
It was created to fulfill the "Tool Tip UI" objective. Tooltips enhance UX by providing secondary information without cluttering the primary interface. It was styled to match the glowing neon cyberpunk aesthetic of the overarching project.

## How it works?
1. **Trigger**: Wraps any `children` elements with `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onBlur` event listeners.
2. **State**: Uses a `isVisible` boolean state to track interaction.
3. **Positioning & Animation**: Uses `framer-motion` to smoothly fade in and translate the tooltip bubble slightly upwards (`y: -5`). CSS absolute positioning anchors it relative to the wrapping container.

## Requirements
- `framer-motion` for micro-animations.
- React hooks (`useState`).
- A relatively positioned parent container to ensure the absolute tooltip bubble aligns correctly.

## Outbound Data Flow
- **Input**: `content` (string/ReactNode) to display in the tooltip, and `children` (ReactNode) to act as the trigger.
- **Output**: None. This is a purely presentational wrapper component.
