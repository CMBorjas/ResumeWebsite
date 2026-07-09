export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'architecting-the-tooltip-ui',
    title: 'Architecting the Tooltip UI for Modern Cyberpunk Interfaces',
    date: '2026-07-01',
    excerpt: 'A deep dive into how I built a highly responsive, framer-motion powered tooltip component that feels native to the cyberpunk aesthetic.',
    tags: ['React', 'Framer Motion', 'UI/UX'],
    content: `
# Architecting the Tooltip UI

In modern web development, a tooltip is often an afterthought. However, in a highly stylized, **glassmorphic cyberpunk environment**, every micro-interaction matters. I set out to build a tooltip component that didn't just convey information, but felt like a piece of high-tech HUD telemetry.

## The Design Philosophy

The core requirement was that it needed to feel *alive*. Static CSS \`:hover\` states are sufficient for basic sites, but I wanted physics-based spring animations. 

### Why Framer Motion?
By utilizing \`framer-motion\`, I was able to inject physical properties like mass and stiffness into the entrance animation:

\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 10, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 5, scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {content}
</motion.div>
\`\`\`

## Edge Case Handling

One of the biggest challenges with tooltips is ensuring they don't render off-screen. I implemented dynamic spatial calculations using \`getBoundingClientRect()\` to flip the tooltip from top to bottom if it detects it is getting too close to the viewport boundaries.

This ensures the **Terminal HUD** experience remains uninterrupted, no matter where the user is hovering.
`
  },
  {
    slug: 'engineering-the-restricted-textarea',
    title: 'Engineering a Restricted Textarea with Visual Feedback',
    date: '2026-07-04',
    excerpt: 'Building a controlled input component that aggressively limits character counts while providing neon-tinged visual warnings to the user.',
    tags: ['React', 'Forms', 'Tailwind'],
    content: `
# The Restricted Textarea

Forms are usually the most boring part of any web application. But when you're building a terminal interface, input fields should feel like you're typing into a mainframe console. 

I needed a reusable \`RestrictedTextarea\` component that could rigidly enforce character limits, primarily for the **Contact Page** and **Hexagon Menus**.

## The Implementation

The state is managed via standard React \`useState\`, but the visual feedback is where the magic happens.

As the user approaches the character limit, the UI incrementally warns them by shifting the border and text colors from a calm cyan to an aggressive, pulsing neon pink.

\`\`\`tsx
const isNearLimit = value.length > maxLength * 0.8;
const isAtLimit = value.length >= maxLength;

<div className={\`border \\\${isAtLimit ? 'border-brand-pink' : isNearLimit ? 'border-yellow-500' : 'border-brand-cyan'}\`}>
  <textarea value={value} onChange={handleChange} />
</div>
\`\`\`

By coupling the state directly to Tailwind classes, the component remains entirely stateless regarding its styling, relying on declarative class injection to handle the aesthetic shifts.
`
  },
  {
    slug: 'designing-the-css-accordion',
    title: 'Designing a Physics-Based CSS Accordion',
    date: '2026-07-06',
    excerpt: 'How I built a collapsible accordion component for FAQs that utilizes CSS grid for butter-smooth height animations.',
    tags: ['CSS', 'React', 'Layout'],
    content: `
# Designing the CSS Accordion

Animating the \`height\` of an element from \`0\` to \`auto\` is notoriously difficult in CSS. Most developers resort to JavaScript to calculate scroll heights, but this can cause layout thrashing and performance bottlenecks.

I wanted a pure CSS solution for the ResumeWebsite's Accordion components.

## The CSS Grid Hack

Modern CSS Grid provides an incredibly elegant solution to the \`height: auto\` animation problem using the \`1fr\` fractional unit.

\`\`\`css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms ease-out;
}

.accordion-content.open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
}
\`\`\`

By wrapping the content in a child \`div\` that hides the overflow, and animating the parent's grid track from \`0fr\` to \`1fr\`, the browser interpolates the exact height perfectly without any JavaScript calculations.

The result is a highly performant, buttery-smooth collapse animation that perfectly fits the sleek aesthetic of the project.
`
  },
  {
    slug: 'engineering-cookie-consent',
    title: 'Engineering an Unobtrusive Cookie Consent Banner',
    date: '2026-07-08',
    excerpt: 'Implementing a stateful, persistent cookie consent banner that respects user preferences using localStorage and Framer Motion.',
    tags: ['Privacy', 'State Management', 'Framer Motion'],
    content: `
# Engineering Cookie Consent

Cookie consent banners are universally despised. They interrupt the user flow, block content, and are often deliberately confusing.

For this project, I wanted to build a consent banner that was **unobtrusive**, **clear**, and **visually integrated** into the cyberpunk theme.

## Architecture

The banner utilizes a custom \`useLocalStorage\` hook to persist the user's choice across sessions, ensuring we only prompt them once.

\`\`\`tsx
const [hasConsented, setHasConsented] = useLocalStorage('cookie-consent', false);
\`\`\`

### Visual Integration
Instead of a massive modal, the banner slides in smoothly from the bottom right corner of the screen using \`framer-motion\`. It utilizes backdrop filters (\`backdrop-blur-md\`) to ensure it doesn't completely obscure the content beneath it.

If the user accepts, the banner exits via an aggressive downward spring animation, getting out of the way instantly. If they decline, tracking logic is mathematically disabled at the root layout level.

Privacy and aesthetics can, and should, coexist.
`
  }
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug)
}
