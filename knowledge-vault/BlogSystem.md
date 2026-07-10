# Personal Blog System

## What is it?
The Personal Blog System is a fully static markdown rendering engine. It powers the `/blog` route, offering a feed of articles and a dynamic reader for individual posts (`/blog/[slug]`).

## Why was it modified/created?
It was created to fulfill the "Personal Blog page" roadmap goal and to provide a home for detailed write-ups on the various custom components built throughout the project (e.g., Tooltip UI, Accordion, Cookie Consent).

## How it works?
1. **Data Layer (`src/lib/blog.ts`)**: Rather than relying on a complex CMS or filesystem parsing (which can conflict with static exports), the blog data is stored in a static TypeScript registry containing raw Markdown strings and metadata.
2. **Blog Feed (`/blog/page.tsx`)**: The main page maps over the `BLOG_POSTS` registry, generating interactive cards with `framer-motion` entrance animations.
3. **Blog Reader (`/blog/[slug]/page.tsx`)**: Next.js `generateStaticParams()` pre-compiles a static route for every slug in the registry. When visited, the route uses `react-markdown` and `remark-gfm` to parse the raw markdown. 
4. **Styling**: Standard Tailwind arbitrary variant selectors (`[&>h1]`, `[&>p]`) are utilized on the parent wrapper to inject the project's cyberpunk aesthetic into the raw markdown elements without needing the `@tailwindcss/typography` plugin.
5. **Navigation Integration**: The route is globally accessible via the `HexagonMenu` and the footer in `layout.tsx`.

## Requirements
- `react-markdown` and `remark-gfm` for parsing.
- `framer-motion` for feed animations.
- `lucide-react` for iconography.

## Outbound Data Flow
- **Input**: The blog feed routes the user to a static URL slug.
- **Output**: The reader matches the slug, pulls the string from `blog.ts`, and recursively emits styled DOM nodes representing the markdown.
