# FlashCard & FlashCardDeck Components

## What is it?
The `FlashCard.tsx` and `FlashCardDeck.tsx` components form the "Neural_Imprint" study tool. They provide a 3D flipping card UI for self-testing knowledge. The app lives on its own dedicated route at `src/app/projects/flash-cards/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Flash Cards" objective from the backlog. It demonstrates the ability to manage complex state transitions and UI animations (`framer-motion`) while persisting user progress data locally across browser sessions.

## How it works?
1. **FlashCard.tsx**: A purely presentational component that receives `frontContent` and `backContent`. It relies on `framer-motion`'s `<motion.div>` and the `rotateY` property (combined with arbitrary Tailwind classes like `[transform-style:preserve-3d]` and `[backface-visibility:hidden]`) to create a smooth 3D flip effect when the `isFlipped` prop changes.
2. **FlashCardDeck.tsx**: The stateful container. It manages:
   - The loaded `deck` of cards (currently a hardcoded Tech Interview default).
   - The `currentIndex` to determine which card is active.
   - The `memorizedIds` (a `Set` of card IDs that the user has marked as memorized).
3. **Persistence**: `FlashCardDeck` utilizes two `useEffect` hooks. On mount, it parses `memorized_flashcards` from `localStorage`. On any mutation of the `memorizedIds` set, it stringifies the array and saves it back to `localStorage`.
4. **UI Updates**: A progress bar dynamically fills based on the ratio of memorized cards to total deck size.

## Requirements
- `framer-motion` for 3D spring animations.
- React hooks (`useState`, `useEffect`).
- LocalStorage API access.

## Outbound Data Flow
- **Input**: Local user clicks (flip, next, prev, mark memorized).
- **Output**: Persists JSON arrays of string IDs to the browser's `localStorage` under the key `memorized_flashcards`. No network calls are made.
