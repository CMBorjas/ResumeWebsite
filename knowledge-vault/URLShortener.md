# URLShortener Component

## What is it?
The `URLShortener.tsx` is a client interface (and corresponding API route) for compressing long URLs into compact hashes. Located at `src/components/URLShortener.tsx`.

## Why was it modified/created?
Created to fulfill the "URL Shortener" objective. This is a classic full-stack portfolio piece that demonstrates knowledge of hashing algorithms, database mutations, routing, and Next.js API endpoints.

## How it works?
1. **Client UI**: A controlled `<input>` accepts a valid URL and submits it via a `POST` request to an internal Next.js API route (`/api/shorten`).
2. **Server Logic**: The API route validates the URL format, generates a unique short hash (using standard cryptography or a library like `nanoid`), and stores the mapping (Hash -> Original URL) in a database or KV store.
3. **Routing**: A Next.js dynamic route (e.g., `src/app/s/[hash]/route.ts`) acts as a middleware redirector. When a user visits `/s/abc12`, the server queries the database for `abc12`, finds the original URL, and issues a 301/302 Redirect response.
4. **Clipboard**: The UI component uses the `navigator.clipboard` API to easily copy the resulting short link.

## Requirements
- Next.js API routes (`route.ts`).
- Some form of persistence (Vercel KV, Postgres, Firebase, or an external API like Bitly if a database isn't provisioned).
- Hash generation utility.

## Outbound Data Flow
- **Input**: User submits a URL string.
- **Output**: 
  1. Makes a `POST` request to the internal API route.
  2. The API route makes a mutation request to a database.
  3. UI returns the shortened URL to the DOM and optionally to the user's clipboard.
