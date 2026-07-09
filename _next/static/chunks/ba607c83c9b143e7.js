(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,96661,e=>{"use strict";let t=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim();e.s(["mergeClasses",()=>t])},71987,88973,e=>{"use strict";var t={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};e.s(["default",()=>t],71987);let a=e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1};e.s(["hasA11yProp",()=>a],88973)},5014,e=>{"use strict";var t=e.i(71645),a=e.i(71987),i=e.i(88973),n=e.i(96661);let r=(0,t.createContext)({}),s=(0,t.forwardRef)(({color:e,size:s,strokeWidth:o,absoluteStrokeWidth:l,className:c="",children:d,iconNode:h,...p},m)=>{let{size:u=24,strokeWidth:g=2,absoluteStrokeWidth:f=!1,color:y="currentColor",className:b=""}=(0,t.useContext)(r)??{},x=l??f?24*Number(o??g)/Number(s??u):o??g;return(0,t.createElement)("svg",{ref:m,...a.default,width:s??u??a.default.width,height:s??u??a.default.height,stroke:e??y,strokeWidth:x,className:(0,n.mergeClasses)("lucide",b,c),...!d&&!(0,i.hasA11yProp)(p)&&{"aria-hidden":"true"},...p},[...h.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(d)?d:[d]])});e.s(["default",()=>s],5014)},56420,e=>{"use strict";var t=e.i(71645),a=e.i(96661);let i=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var n=e.i(5014);let r=(e,r)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(n.default,{ref:l,iconNode:r,className:(0,a.mergeClasses)(`lucide-${i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=i(e),s};e.s(["default",()=>r],56420)},24414,e=>{"use strict";var t=e.i(18050),a=e.i(46932),i=e.i(22016),n=e.i(56420);let r=(0,n.default)("terminal",[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]),s=(0,n.default)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),o=(0,n.default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),l=[{slug:"architecting-the-tooltip-ui",title:"Architecting the Tooltip UI for Modern Cyberpunk Interfaces",date:"2026-07-01",excerpt:"A deep dive into how I built a highly responsive, framer-motion powered tooltip component that feels native to the cyberpunk aesthetic.",tags:["React","Framer Motion","UI/UX"],content:`
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
`},{slug:"engineering-the-restricted-textarea",title:"Engineering a Restricted Textarea with Visual Feedback",date:"2026-07-04",excerpt:"Building a controlled input component that aggressively limits character counts while providing neon-tinged visual warnings to the user.",tags:["React","Forms","Tailwind"],content:`
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
`},{slug:"designing-the-css-accordion",title:"Designing a Physics-Based CSS Accordion",date:"2026-07-06",excerpt:"How I built a collapsible accordion component for FAQs that utilizes CSS grid for butter-smooth height animations.",tags:["CSS","React","Layout"],content:`
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
`},{slug:"engineering-cookie-consent",title:"Engineering an Unobtrusive Cookie Consent Banner",date:"2026-07-08",excerpt:"Implementing a stateful, persistent cookie consent banner that respects user preferences using localStorage and Framer Motion.",tags:["Privacy","State Management","Framer Motion"],content:`
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
`}];function c(){let e=[...l].sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()),n={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{type:"spring",stiffness:300,damping:24}}};return(0,t.jsxs)("div",{className:"w-full max-w-4xl mx-auto px-4 py-12 min-h-[80vh]",children:[(0,t.jsxs)("div",{className:"mb-12 border-b border-slate-800 pb-8",children:[(0,t.jsxs)("h1",{className:"text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 flex items-center gap-4 uppercase tracking-widest",children:[(0,t.jsx)(r,{className:"w-10 h-10 text-brand-purple"}),"Neural_Logs"]}),(0,t.jsx)("p",{className:"text-slate-400 text-lg leading-relaxed max-w-2xl",children:"Architectural deep dives, telemetry reports, and engineering philosophies from the edge of the network."})]}),(0,t.jsx)(a.motion.div,{className:"flex flex-col gap-6",variants:{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1}}},initial:"hidden",animate:"show",children:e.map(e=>(0,t.jsx)(a.motion.div,{variants:n,children:(0,t.jsx)(i.default,{href:`/blog/${e.slug}`,children:(0,t.jsxs)("div",{className:"group bg-[#0a0f18]/80 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-brand-purple/50 p-6 md:p-8 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"}),(0,t.jsxs)("div",{className:"flex-1 flex flex-col gap-3 relative z-10",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-3 text-xs font-mono",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1 text-slate-400",children:[(0,t.jsx)(s,{className:"w-3 h-3"}),new Date(e.date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})]}),(0,t.jsx)("span",{className:"text-slate-600",children:"|"}),(0,t.jsx)("div",{className:"flex gap-2",children:e.tags.map(e=>(0,t.jsx)("span",{className:"text-brand-cyan/80 bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20",children:e},e))})]}),(0,t.jsx)("h2",{className:"text-2xl font-bold text-white group-hover:text-brand-purple transition-colors",children:e.title}),(0,t.jsx)("p",{className:"text-slate-400 text-sm leading-relaxed",children:e.excerpt})]}),(0,t.jsx)("div",{className:"hidden md:flex items-center justify-center p-4 bg-slate-900/50 rounded-full border border-slate-800 group-hover:border-brand-purple/50 group-hover:bg-brand-purple/10 transition-colors z-10",children:(0,t.jsx)(o,{className:"w-6 h-6 text-slate-500 group-hover:text-brand-purple transition-colors"})})]})})},e.slug))})]})}e.s(["default",()=>c],24414)}]);