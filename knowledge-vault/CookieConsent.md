# CookieConsent Component

## What is it?
The `CookieConsent.tsx` is a non-intrusive banner component located at `src/components/CookieConsent.tsx`. It prompts the user for cookie policy tracking consent.

## Why was it modified/created?
Created to fulfill the "Cookie Consent Banner" roadmap goal. While this portfolio does not actively harvest malicious tracking data, a consent banner is standard practice for GDPR/CCPA compliance and demonstrates the ability to handle legal/UX patterns correctly in a professional setting.

## How it works?
1. **Persistence**: Checks `localStorage` (or potentially a Next.js cookie depending on configuration) on component mount to determine if consent has already been granted.
2. **Animation**: If consent has not been granted, it slides up from the bottom of the screen using `framer-motion` (`y: 100` to `y: 0`).
3. **Action**: Provides 'Accept' and 'Decline' buttons. Pressing either triggers a handler that sets the choice in `localStorage` and smoothly animates the banner out of the DOM via `<AnimatePresence>`.

## Requirements
- `framer-motion` for slide-up entrance and exit animations.
- Browser `localStorage` API access.
- React hooks (`useState`, `useEffect`).

## Outbound Data Flow
- **Input**: User clicks on consent buttons.
- **Output**: Persists a boolean/string value to `localStorage` (e.g., `cookie_consent: true`). No external network requests are made.
