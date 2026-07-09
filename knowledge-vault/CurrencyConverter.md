# CurrencyConverter Component & Converters Route

## What is it?
The `CurrencyConverter.tsx` is a client-side React component that calculates and displays real-time currency exchange rates. It is housed in a newly created dedicated page (`src/app/projects/converters/page.tsx`), which serves as a hub for modular conversion utilities (eventually including the Unit Converter).

## Why was it modified/created?
It was created to fulfill the "Currency converter" task from the `TODO.md` roadmap. By building it as a dedicated utility page, we keep the main `/projects` feed clean while providing an expandable space for future tools like the Unit Converter and potentially others.

## How it works?
1. **Server-side Fetching**: The `page.tsx` for the `/projects/converters` route operates as a Server Component. It fetches the latest exchange rates (relative to USD) from the public ER-API (`https://open.er-api.com/v6/latest/USD`).
2. **Caching Strategy**: To ensure speed and avoid unnecessary API polling, the `fetch` uses Next.js Incremental Static Regeneration (ISR) with `next: { revalidate: 86400 }`. This caches the data on the server for 24 hours since the free ER-API only updates daily. If the API fails, it gracefully falls back to mock rates.
3. **Client-side Computation**: The cached rates are passed to the `CurrencyConverter.tsx` Client Component. The component filters for a subset of common global currencies and uses React's `useMemo` to instantly and accurately compute conversions on the client side without needing to ping an API for every keystroke.
4. **UI**: Styled to perfectly match the site's glassmorphic, cyberpunk aesthetic with glowing inputs and a sleek swap button.

## Requirements
- Internet connectivity on the server for the daily ISR revalidation.
- React and standard modern browser APIs.
- Next.js 13+ App Router for Server Component data fetching.

## Outbound Data Flow
- **Input**: The component receives `rates` (a key-value object of currency codes to exchange rates) and `lastUpdated` timestamp from its parent.
- **Output**: Purely presentational. It handles internal state for the conversion form but does not export data to external services.
