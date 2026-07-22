## What is it?
The `ThemeProvider.tsx` component is the central State Management engine for the application's visual themes. It wraps the entire application tree and provides a globally accessible Context for reading and switching the current theme.

## Why was it modified/created?
It was created to support the "Dynamic Theme Engine" feature, allowing users to toggle between different aesthetic paradigms (e.g., Cyberpunk, Corporate, Forestpunk). It was recently modified to set "corporate" as the initial default theme state.

## How it works?
The component utilizes React's Context API. It initializes a `theme` state and a `mounted` state to prevent hydration mismatches during Server-Side Rendering (SSR). Upon mounting on the client, a `useEffect` hook attempts to retrieve a previously saved theme preference from `localStorage`. A second `useEffect` hook watches for changes to the `theme` state; when it changes, it updates the `data-theme` attribute on the root HTML `document.documentElement` (which triggers CSS variable overrides defined in `globals.css`) and persists the new choice to `localStorage`.

## Requirements
- Next.js (App Router)
- React Hooks (`useState`, `useEffect`, `createContext`, `useContext`)
- Corresponding CSS variables defined in `globals.css` targeting `[data-theme="..."]`.

## Outbound Data Flow
1. Sets the `data-theme` attribute on the DOM root.
2. Writes the string value of the active theme to the browser's `localStorage` under the key "theme".
3. Provides `{ theme, setTheme }` to all child components via Context.
