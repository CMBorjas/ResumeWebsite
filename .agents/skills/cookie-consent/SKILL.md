---
name: cookie-consent
description: Animated banner for obtaining user consent for cookies.
version: 1.0.0
metadata:
  hermes:
    tags: [react, tailwind, ui, compliance]
    category: ui
---

# Cookie Consent

## When to Use
Trigger this skill when modifying compliance, tracking, or local storage policies.

## Procedure
1. Modify `src/components/CookieConsent.tsx`.
2. Ensure the consent state is saved to `localStorage` so the banner doesn't repeatedly show.
3. Integrate the consent state with any analytics or tracking scripts.

## Pitfalls
- Blocking essential site functionality before consent is given (unless required by law).

## Verification
Clear local storage, refresh the page, and verify the banner appears. Accept cookies and verify it does not appear on subsequent reloads.
