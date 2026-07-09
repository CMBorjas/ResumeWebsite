# NumberGuessingGame Component

## What is it?
The `NumberGuessingGame.tsx` is a client-side React mini-game named "Terminal_Link". It's a classic number guessing game (binary search puzzle) where the user must determine a randomly generated number between 1 and 100. It's hosted on its own dedicated route at `src/app/projects/number-guessing-game/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Numberguessing game" objective from the backlog. It serves as an interactive portfolio piece showcasing the ability to build fun, state-driven UI loops with React hooks and `framer-motion` animations, all wrapped in the project's signature cyberpunk aesthetic.

## How it works?
1. **Game State Initialization**: On mount, a `useEffect` triggers `initializeGame()` which generates a random `targetNumber` (1-100) and resets the `attempts`, `history`, and `hasWon` state flags.
2. **User Interaction**: The user enters a guess via a controlled `<input>` form. 
3. **Logic Loop**: The `handleGuess` function evaluates the input against the `targetNumber`. It updates the feedback text to "Too high", "Too low", or "Access Granted". It also increments the attempt counter and adds the guess to the `history` array.
4. **Animations**: The `history` array is rendered within an `<AnimatePresence>` block from `framer-motion`, causing new guesses to slide in smoothly. The UI changes dynamically (e.g., swapping to a green border) when the user wins.

## Requirements
- `framer-motion` for fluid component entrance animations.
- React hooks (`useState`, `useEffect`, `useRef`).

## Outbound Data Flow
- **Input**: User form submissions.
- **Output**: Purely internal state mutations. No data is stored globally or sent over the network.
