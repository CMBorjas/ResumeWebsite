# Visitor Telemetry Subsystem

## What is it?
The Visitor Telemetry Subsystem comprises [`src/lib/telemetry.ts`](file:///mnt/Alsafi/Documents/Repositories/Projects/ResumeWebsite/src/lib/telemetry.ts), [`src/hooks/useVisitorTelemetry.ts`](file:///mnt/Alsafi/Documents/Repositories/Projects/ResumeWebsite/src/hooks/useVisitorTelemetry.ts), and diagnostics controls inside [`src/app/settings/page.tsx`](file:///mnt/Alsafi/Documents/Repositories/Projects/ResumeWebsite/src/app/settings/page.tsx). It monitors incoming landing page visits and dispatches formatted webhook alerts (Discord embeds or JSON payloads) to notify the portfolio owner of new visitors.

## Why was it modified/created?
Created to fulfill the requirement for real-time visibility into portfolio traffic on a statically exported Next.js site (`output: 'export'`) hosted on GitHub Pages. Because GitHub Pages does not run an active Node.js server, standard server-side request logging or backend analytics are unavailable. This subsystem runs purely client-side, ethically extracting visitor system metrics and dispatching an alert without leaking secret webhook tokens into public GitHub repositories.

## How it works?
1. **Metadata Collection**:
   - `collectVisitorMetadata()` extracts user agent information, browser name, operating system, and device classification (Desktop, Mobile, Tablet).
   - Captures screen resolution (`window.screen.width x height`), active viewport size (`window.innerWidth x height`), local timestamp, visitor timezone (`Intl.DateTimeFormat`), and `document.referrer`.
   - Executes an optional, fast client-side lookup via `ipapi.co` with an automatic 2.5-second timeout and fallback mechanism to gather approximate city/country network data without blocking UI rendering or crashing if blocked by ad-blockers.
2. **Session Deduplication & Spam Protection**:
   - Uses `sessionStorage.getItem('telemetry_visitor_notified')` to ensure only the first landing page view of a browser session triggers a webhook. Consecutive page navigations or refreshes within the same tab are suppressed.
   - Respects user preference toggles stored in `localStorage.getItem('visitor_telemetry_enabled')`.
3. **Dual Configuration Strategy**:
   - **Environment Variable**: Reads `process.env.NEXT_PUBLIC_VISITOR_WEBHOOK_URL` at build time if provided.
   - **Local Storage Admin Console**: Allows Christian to enter, update, or clear a Discord webhook URL directly via the `/settings` UI (`visitor_webhook_url`). This keeps webhook URLs completely private and prevents GitHub bot scanners from revoking Discord webhooks committed to public source code.
4. **Discord Webhook Formatting**:
   - Detects whether the destination URL is a Discord webhook (`discord.com/api/webhooks`).
   - Automatically structures a Cyberpunk-themed Discord Embed with neon cyan accent (`#00ffe1` for live visits, `#ff007f` for manual diagnostics), organized field grids, and timestamp.
5. **Interactive Diagnostics (`/settings`)**:
   - Provides a "Send Test Ping" trigger to test webhook delivery instantly.
   - Includes a "View Diagnostic Payload" viewer displaying live JSON metadata captured from the current browser session.

## Requirements
- Next.js Client Component environment (`"use client"`).
- `sessionStorage` and `localStorage` browser APIs.
- Discord Webhook URL or HTTP POST receiver endpoint.
- Tailwind CSS for the `/settings` diagnostics dashboard.

## Outbound Data Flow
- **Trigger**: Landing page mount ([`src/app/page.tsx`](file:///mnt/Alsafi/Documents/Repositories/Projects/ResumeWebsite/src/app/page.tsx)) triggers `useVisitorTelemetry()`.
- **Transmission**: Asynchronous `fetch` request with `keepalive: true` sent directly to the configured webhook URL (e.g., Discord API).
- **Fallback**: In development mode or when no webhook URL is configured, structured diagnostic payloads are logged to the browser console.
