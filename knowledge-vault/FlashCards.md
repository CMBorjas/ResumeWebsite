# FlashCard & FlashCardDeck Components

## What is it?
The `FlashCard.tsx` and `FlashCardDeck.tsx` components form the "Neural_Imprint" study tool. They provide a 3D flipping card UI for self-testing knowledge. The app lives on its own dedicated route at `src/app/projects/flash-cards/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Flash Cards" objective from the backlog. It demonstrates the ability to manage complex state transitions and UI animations (`framer-motion`) while persisting user progress data locally across browser sessions.

## How it works?
1. **FlashCard.tsx**: A purely presentational component that receives `frontContent` and `backContent`. It relies on `framer-motion`'s `<motion.div>` and the `rotateY` property (combined with arbitrary Tailwind classes like `[transform-style:preserve-3d]` and `[backface-visibility:hidden]`) to create a smooth 3D flip effect when the `isFlipped` prop changes. Now supports `react-markdown`.
2. **FlashCardDeck.tsx**: The stateful container. It manages:
   - The loaded `deck` of cards (can toggle between a hardcoded Tech Interview default and a custom deck).
   - The `currentIndex` to determine which card is active.
   - The `memorizedIds` (a `Set` of card IDs that the user has marked as memorized).
3. **FlashCardEditor.tsx (Neural_Forge)**: A dedicated editor allowing users to create custom flashcards with a dual-sided textarea interface. Supports markdown and advanced keyboard shortcuts.
4. **Persistence**: `FlashCardDeck` utilizes `useEffect` hooks. On mount, it parses `memorized_flashcards` and `custom_flashcards` from `localStorage`. On any mutation, it stringifies the array and saves it back to `localStorage`.
5. **UI Updates**: A progress bar dynamically fills based on the ratio of memorized cards to total deck size.

## Requirements
- `framer-motion` for 3D spring animations.
- React hooks (`useState`, `useEffect`).
- LocalStorage API access.

## Outbound Data Flow
- **Input**: Local user clicks (flip, next, prev, mark memorized), keyboard shortcuts, text input for editing.
- **Output**: Persists JSON arrays of string IDs (`memorized_flashcards`) and custom card objects (`custom_flashcards`) to the browser's `localStorage`. No network calls are made.

> [!WARNING]
> Because the application is a static Next.js export (`output: 'export'`), all user-created custom flashcards and memorized states are stored strictly in `localStorage`. If the user clears their browser cache, resets site data, or uses a different browser, their custom cards **will be permanently lost**. A true database backend (like PostgreSQL) is required to resolve this in a future server-side deployment.
