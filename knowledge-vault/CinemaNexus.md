# Cinema Nexus (Movie Scraper & Reservation)

## What is it?
Cinema_Nexus is a simulated frontend for a movie scraping and reservation system. It provides a cyberpunk-styled terminal interface where users can browse newly "scraped" movies (with IMDb-style data), filter by genre, select a showtime, and reserve seats using an interactive CSS Grid with Framer Motion.

## Why was it modified/created?
It was created to fulfill the "Movie Scraper and Reservation system" backlog goal. Because the Next.js portfolio uses a static export (`output: 'export'`), a true backend scraper or reservation database could not be deployed. Therefore, this component acts as a highly realistic proof of concept built entirely on the client side.

## How it works?
1. **MovieFeed**: Renders the `movies.ts` database. Users can search and filter by genre. When a movie is selected, it passes the selection up to the parent `page.tsx`. It uses glowing borders colored dynamically by the movie's `neonColor` property.
2. **SeatSelector**: A deterministic hash algorithm generates pre-booked seats based on the movie ID and showtime. It integrates with `localStorage` to identify locally reserved seats.
3. **CheckoutTerminal**: Calculates the subtotal and network fees based on the selected nodes (seats). Upon confirmation, it writes a composite key (`movieID-showtime-seatID`) to the `cinema_nexus_reservations` array in `localStorage`.

## Requirements
- `lucide-react` for terminal icons.
- `framer-motion` for micro-interactions (seat popping, checkout modal).
- `localStorage` availability in the browser.

## Outbound Data Flow
Data flows strictly from the client UI into the browser's `localStorage` via the `cinema_nexus_reservations` key. This allows the reservations to persist across page reloads without a real backend database.
