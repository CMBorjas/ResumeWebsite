# MarketAnalysis Component & API Route

## What is it?
The `MarketAnalysis.tsx` component is a client-side React dashboard that visualizes historical stock and cryptocurrency market data using `recharts`. It is supported by a Next.js API Route (`src/app/api/markets/[ticker]/route.ts`).

## Why was it modified/created?
It was created to fulfill the "Stock Price Analysis" and "Crypto Price Analysis" goals on the deployment roadmap. It demonstrates full-stack capabilities, API key management, robust fallback strategies (Proof-of-Concept patterns), and complex data visualization using SVGs.

## How it works?
1. **Server API (`/api/markets/[ticker]/route.ts`)**: The backend endpoint accepts a dynamic ticker parameter. It checks for a `STOCK_API_KEY` environment variable. If present, it makes an outbound HTTP request to a real financial API (like Alpha Vantage).
2. **Proof-of-Concept Fallback**: If the key is missing or the external API rate-limits the server, the endpoint seamlessly falls back to a deterministic, randomized `generateMockData` function to ensure the frontend never breaks. This fallback has different volatility models depending on if the ticker is a crypto or stock.
3. **Frontend Fetching**: The `MarketAnalysis.tsx` component fetches this internal endpoint inside a `useEffect`.
4. **Data Visualization**: Uses the `AreaChart` component from `recharts` to map the returned array of objects (`{ date, close }`) into an SVG gradient graph.
5. **Analytics**: A `useMemo` hook instantly calculates the 30-Day High, 30-Day Low, and percent trend relative to the dataset.

## Requirements
- `recharts` for charting.
- `framer-motion` and `lucide-react` for UI polishing.
- Server-side environment variables (`.env.local`) for paid-tier API integration.

## Outbound Data Flow
- **Input**: User clicks on a ticker button.
- **Output**: The Next.js API route can make an outbound HTTP GET request to external financial servers (if configured). The component receives the JSON and emits SVG rendering to the DOM.
