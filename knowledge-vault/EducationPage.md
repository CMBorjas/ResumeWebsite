## What is it?
The `src/app/education/page.tsx` file is a top-level routing page within the Next.js App Router that displays the author's academic background and extracurricular involvement.

## Why was it modified/created?
It was created to fulfill the primary portfolio requirement of showcasing educational history. It was recently modified to include a "Clubs and School Activities" section (featuring the Artificial Intelligence Student Association and Lynx Robotics Club) to provide a more holistic view of the author's academic engagement and leadership.

## How it works?
It functions as a static Server Component. It renders a responsive layout utilizing standard Tailwind CSS utility classes (e.g., `max-w-4xl`, `bg-slate-800/95`) to format the information into distinct visual blocks or cards. The structure relies purely on semantic HTML (`<h2>`, `<p>`, `<ul>`, `<li>`) styled for readability and alignment with the site's cyberpunk/dark-mode aesthetic.

## Requirements
- Next.js 14+ App Router architecture.
- Global Tailwind CSS configurations for brand colors (e.g., `text-brand-pink`).

## Outbound Data Flow
The component does not mutate external state or export interactive data. It statically renders content to the DOM.
