# UnitConverter Component

## What is it?
The `UnitConverter.tsx` is a client-side React component that allows users to instantly convert values across various units of Length, Weight, and Temperature. It sits alongside the Currency Converter on the `/projects/converters` page.

## Why was it modified/created?
It was created to fulfill the "Unit Converter" milestone on the roadmap. It replaces the "Awaiting Deployment" placeholder on the converters page, completing the utility suite for that specific route.

## How it works?
1. **Zero-API Dependency**: Unlike the Currency Converter, unit conversions are mathematically constant. Therefore, it does not rely on any external APIs or Server Components for data fetching. All conversion rates (relative to a base unit like Meters or Kilograms) are hardcoded into the component.
2. **Client-Side Math**: It utilizes React state to track the active category (Length, Weight, Temperature) and updates the available unit dropdowns accordingly.
3. **Memoization**: `useMemo` is used to instantly calculate the conversion formula `(amount * baseRate) / targetRate` without re-rendering unnecessarily. Temperature conversions use custom formulas due to their non-zero baselines (e.g., Celsius to Fahrenheit).
4. **UI**: Styled with a distinct `brand-purple` cyberpunk aesthetic to contrast visually with the `brand-cyan` of the Currency Converter while maintaining the same glassmorphic Bento Box architecture.

## Requirements
- React hooks (`useState`, `useMemo`).
- Tailwind CSS for styling.

## Outbound Data Flow
- **Input**: User interaction only.
- **Output**: Purely presentational computation. No external data is exported or persisted.
