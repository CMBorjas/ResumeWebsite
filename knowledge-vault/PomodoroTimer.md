# PomodoroTimer Component

## What is it?
The `PomodoroTimer.tsx` is a client-side productivity tool that implements the Pomodoro time management technique (25 minutes work, 5 minutes break). Located at `src/components/PomodoroTimer.tsx`.

## Why was it modified/created?
Created to fulfill the "Pomodoro Timer" objective on the roadmap. It acts as an interactive utility within the portfolio's project feed, demonstrating competence with React interval management, state lifecycle, and audio API integration.

## How it works?
1. **State Management**: Uses `useState` for `timeLeft` (in seconds), `isActive` (boolean), and `mode` (Work or Break).
2. **Interval**: A `useEffect` hook initializes a `setInterval` that decrements `timeLeft` every 1000ms if `isActive` is true.
3. **Mode Switching**: When `timeLeft` hits 0, the component automatically toggles the `mode` and resets the timer to the corresponding default value.
4. **Audio**: (Optional) Uses the HTML5 `Audio` API to play a short chime when the timer expires.
5. **UI**: Displays a large monospaced countdown clock with neon glowing accents that change color based on the mode (e.g., Red for Work, Green for Break).

## Requirements
- React hooks (`useState`, `useEffect`, `useRef`).
- Standard Web APIs (`setInterval`, `clearInterval`).

## Outbound Data Flow
- **Input**: User clicks (Start, Pause, Reset).
- **Output**: Purely internal state updates and DOM re-renders. No network data is emitted.
