# Neural Hacker Quiz

## What is it?
A cyberpunk-styled interactive quiz simulation designed to test knowledge of Data Structures and Algorithms (LeetCode style). It features multiple-choice nodes and fill-in-the-blank code snippets, alongside an optional pressure countdown timer.

## Why was it modified/created?
It was created to fulfill the "Quiz App" backlog feature in `TODO.md`. The goal was to demonstrate state management, timer usage, and interactive UI logic via Framer Motion without requiring a true Node.js backend. 

## How it works?
The application is split into three main states managed by `src/app/projects/quiz-app/page.tsx`:
1. **Start**: The user can configure the simulation (enabling or disabling the timer) before initializing.
2. **Playing**: Iterates over a data registry of questions (`src/lib/quiz-data.ts`).
   - Renders `QuizInterface.tsx` which parses either a multiple-choice object or a fill-in-the-blank text input.
   - Text inputs utilize strict string matching (`toLowerCase().trim()`).
   - If the timer is enabled, a `useEffect` hook decrements a state variable every second. Reaching 0 forces a "Compilation Failed" state.
3. **Ended**: Renders the `ScoreScreen.tsx` where the total score is tallied to provide a "Hacker Rank".

## Requirements
- `framer-motion` for animations.
- `lucide-react` for icons.

## Outbound Data Flow
Currently entirely isolated on the client side. Future updates may log high scores to `localStorage` or sync to an external database.
