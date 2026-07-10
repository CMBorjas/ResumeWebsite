# Resume Website

Welcome to the Resume Website of Christian Mandujano Borjas. This repository contains the source code for a cyberpunk-themed personal portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It showcases skills, education, work experience, and a live GitHub project feed.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Docker](#docker)
- [How to View the Website](#how-to-view-the-website)
- [Contributing](#contributing)
- [Contact](#contact)
- [Goals](#goals)

## Overview

> **Note on Documentation**: The documentation, including the project's knowledge graph and README, is explicitly made to explain what the code does and how it flows through the set of operations to provide a clear understanding of the application's architecture.

This website serves as a digital resume and portfolio for Christian Mandujano Borjas. It includes pages for:

- **About Me**: Introduction and summary of professional background.
- **Education**: Academic background and qualifications.
- **Skills**: Technical skills and areas of expertise.
- **Work Experience**: Professional experience and roles held.
- **Projects**: Live GitHub repository feed with tech stack detection.
- **Live Projects**: A dedicated feed highlighting only fully deployed and active projects.
- **Blog**: A static markdown rendering engine (Neural Logs) containing technical architecture breakdowns.
- **Resume**: Embedded PDF viewer with a downloadable resume.
- **Settings**: Configuration for theme preferences and navigation behavior.
- **Socials**: Future-facing registry of upcoming features and integrations.
- **Contact**: Contact details and links.

The site is statically exported and hosted on **GitHub Pages**.


## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | ^16.0.1 | React framework & App Router |
| [React](https://react.dev/) | ^19.2.0 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | ^5.0.4 | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.0.0 | Utility-first styling |
| [Node.js](https://nodejs.org/) | >=20.9.0 | Runtime environment |
| [Docker](https://www.docker.com/) | — | Containerised local serving via Nginx |
| [GitHub Pages](https://pages.github.com/) | — | Static site hosting |

## File Structure

```
ResumeWebsite/
├── public/                                        # Static assets served at root
│   ├── images/
│   │   ├── header/
│   │   │   └── skyscrapers-6990425.jpg            # Header background image
│   │   └── website.png                            # Website / brand logo
│   └── resume/
│       └── Christian_Mandujano_Borjas_Resume.pdf  # Downloadable resume PDF
├── src/
│   ├── app/                                       # Next.js App Router pages
│   │   ├── layout.tsx                             # Root layout & global nav
│   │   ├── page.tsx                               # Homepage (about me)
│   │   ├── page.module.css                        # Homepage styles
│   │   ├── footer.module.css                      # Footer styles
│   │   ├── contact/
│   │   │   └── page.tsx                           # Contact page
│   │   ├── education/
│   │   │   └── page.tsx                           # Education page
│   │   ├── pricing/
│   │   │   └── page.tsx                           # Contribute page
│   │   ├── projects/
│   │   │   └── page.tsx                           # Projects / GitHub feed page
│   │   ├── qr-code/
│   │   │   └── page.tsx                           # QR Code utility
│   │   ├── resume/
│   │   │   └── page.tsx                           # Resume viewer page
│   │   ├── settings/
│   │   │   └── page.tsx                           # Settings and config page
│   │   ├── skills/
│   │   │   └── page.tsx                           # Skills page
│   │   ├── socials/
│   │   │   └── page.tsx                           # Socials roadmap page
│   │   └── work-experience/
│   │       └── page.tsx                           # Work experience page
│   ├── components/                                # Reusable React components
│   │   ├── HexagonMenu.tsx                        # Animated hexagon navigation
│   │   ├── ProjectCard.tsx                        # GitHub project card
│   │   ├── ProjectFeedClient.tsx                  # Client-side project feed
│   │   └── TechStackPanel.tsx                     # Tech stack display panel
│   ├── lib/
│   │   └── projects.ts                            # Project data & types
│   └── styles/
│       └── globals.css                            # Global CSS & design tokens
├── Dockerfile                                     # Multi-stage Docker build (Node → Nginx)
├── docker-compose.yml                             # Docker Compose config (port 3000→80)
├── next.config.js                                 # Next.js config (static export, basePath)
├── tailwind.config.cjs                            # Tailwind CSS configuration
├── postcss.config.cjs                             # PostCSS configuration
├── tsconfig.json                                  # TypeScript configuration
├── package.json                                   # Dependencies & scripts
└── README.md                                      # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.9.0 or higher
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/CMBorjas/ResumeWebsite.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd ResumeWebsite
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

### Production Build

To generate the static export (outputs to the `out/` directory):
```bash
npm run build
```

## Docker

The project includes a multi-stage Dockerfile that builds the static site with Node.js and serves it with **Nginx**.

1. **Build and start the container**
   ```bash
   docker compose up --build
   ```

2. **Access the site**
   Open `http://localhost:3000` in your browser.

The container maps port `3000` on the host to port `80` inside the container and is configured to restart automatically.

## How to View the Website

The website is statically exported and hosted on **GitHub Pages**. You can view it live at:

**[https://cmborjas.github.io/ResumeWebsite/](https://cmborjas.github.io/ResumeWebsite/)**

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Contact

For questions, suggestions, or collaboration, please reach out:

- **Email**: [c.manduano.borjas@gmail.com](mailto:[EMAIL_ADDRESS])
- **LinkedIn**: [linkedin.com/in/christian-mandujano-borjas](https://www.linkedin.com/in/christian-mandujano-borjas)
- **GitHub**: [github.com/CMBorjas](https://github.com/CMBorjas)

## Goals

The next phase of development focuses on polishing the portfolio to showcase architecture, UX, and animations.


- ~~[x]**Fluid Page Transitions**: Integrate `framer-motion` to wrap the Next.js application in an `<AnimatePresence>`, creating seamless desktop-like fade and slide animations when navigating between routes.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Currently, Next.js performs hard cuts between route changes. By integrating `framer-motion`, the application should integrate a feature that will bring smooth, fluid page transitions. An `<AnimatePresence>` wrapper should orchestrate exit animations for the current page and entrance animations for the new page. Hopefully making the website feel more cohesive, native application like rather than a collection of static web pages, which should significantly enhance the user experience.
      </details>

- ~~[x]**Interactive Canvas Background**: Replace static backgrounds with a custom HTML5 `<canvas>` component that renders an interactive, subtle particle network or glowing grid that reacts to the user's cursor.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      To elevate the visual appeal beyond static dark mode backgrounds, a custom React component using the HTML5 <-canvas-> API will need to be developed. This background should likely feature a lightweight, interactive particle system or glowing geometry that subtly responds to mouse movement and clicks. Versions for website on a desktop and a mobile device will need to be considered, the implementation on a mobile device will likely be simpler than that on a desktop device. Hopefully this will demonstrate proficiency in graphics programming and performance optimization, ensuring the animation runs smoothly at 60 FPS without draining device batteries too much. We will need to use a library like `react-tsparticles` or `react-canvas-confetti` to achieve this effect, along with some custom styling to match the cyberpunk theme and future themes. We will need to come up with a way to show the cost of running the animation on different devices and how it will impact the battery life of mobile devices, and possibly come up with a way to optimize the animation for different devices. 

      </details>

- ~~[x]**The "Bento Box" Layout**: Restructure the 'About Me' and 'Skills' pages using advanced CSS Grid to create a responsive, glassmorphic "Bento Box" layout with sophisticated hover micro-interactions.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      The current linear layouts will be upgraded to the highly modern "Bento Box" design trend, popularised by top-tier tech companies. This involves creating a complex, responsive CSS Grid architecture where information is compartmentalized into glassmorphic cards of varying sizes. These cards will seamlessly reflow on mobile devices and feature advanced CSS hover states (such as magnetic borders or dynamic glows) to encourage user interaction and showcase high-level UI/UX implementation skills. The use of framer-motion will allow us to create these micro-interactions and animations. This should show our understanding of modern CSS and React state management.
      
      </details>

- ~~[x]**Tool tip ui**: Tool tips are used to display additional information about an element when the user hovers over it.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a dynamic tool tip UI for the website's project feed.
      </details>

- ~~[x]**Restricted textarea**: A textarea is a form element that allows users to enter multiple lines of text.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a reusable textarea component with character counting.
      </details>

- ~~[x]**Accordion**: An accordion is a UI component that allows users to display content in a collapsible format.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented an accordion for the website, used in the FAQ section.
      </details>

- ~~[x]**Cookie consent**: Cookie consent is a banner that is displayed on a website to inform users about the use of cookies and to obtain their consent.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a fully functional, animated cookie consent banner.
      </details>

- ~~[x]**Contact page reform**: A contact form is a crucial component of any website, providing a direct channel for users to communicate with the site owner.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Replaced the existing contact section with an interactive, validated React form, complete with simulated submission states.
      </details>
- ~~[x] **Homescreen Three Dots Menu** - Add functionality to the three dots on the homescreen.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We need to implement interactive functionality for the three dots menu on the homescreen, linking it to the newly integrated centralized Settings tab or other relevant options.
      </details>

- ~~[x]**Pricing cards for users to send money** - In this project, you are required to create a row of pricing cards using only HTML and CSS.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Pricing cards are a common UI pattern used on marketing and SaaS websites to compare plans side by side and guide users to the right tier. The pricing page should display three distinct pricing plans: Thumbs up, dollar, and 5 bucks. Each plan should have its own card with a clear title, price, list of features, and a call-to-action (CTA) button. The three cards should share a base style and the middle one should stand out as the recommended plan, slightly larger and visually emphasized. Each card has a plan name, a price, a short tagline, a list of included features, and a button.
      </details>
- ~~[x] **Changelog component** - Changelog are records of changes that have been made to a website or application.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement the changelog of the website, which is currently stored in a JSON file. These changelogs should be displayed in a list format, with each changelog having its own card.
      </details>
- ~~[x] **QR Code Generator** - A QR code generator is a tool that generates QR codes for a given URL or text.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a QR code generator for the website, which will generate QR codes for a given URL or text.
      </details>
- ~~[x] **Random GitHub Repo Shoutout** - A dynamic section that highlights one of the author's personal public repositories.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Developed a client component that interfaces with the GitHub REST API to fetch all public repositories for the profile. It intelligently filters out forks and the profile README, then randomly selects and elegantly displays one repository upon every page load, offering an interactive link to inspect the code.
      </details>
- ~~[x] **Trending GitHub Repo Shoutout** - A carousel widget showcasing the top trending repositories on GitHub.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a client-side component that queries the GitHub Search API for the highest-starred repositories created within the last 7 days. It features an automated, smooth carousel that cycles through the top 10 results every 6 seconds, complete with live indicators and beautiful framer-motion transitions, fully adhering to the cyberpunk aesthetic.
      </details>
- ~~[x] **Global Telemetry Weather Widget** - A dynamic widget that tracks live weather data for multiple global cities.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a robust weather widget utilizing the Open-Meteo API. The widget features a minimized view that intelligently carousels through saved cities with manual navigation arrows and smooth AnimatePresence transitions. When maximized, it expands into a full dashboard with an integrated geocoding search engine, allowing users to add and manage multiple cities worldwide with persistent state via localStorage.
      </details>
- ~~[x] **NeuroFocus Pomodoro Timer** - A cyberpunk-themed productivity timer.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Built a fully interactive Pomodoro timer in Next.js and Tailwind CSS featuring three distinct tracking states (Deep Work, Short Rest, Long Recovery). It includes glowing, animated SVG progress rings, customizable hover states, and seamless integration into the main project feed.
      </details>
- ~~[x] **Markdown.sys Editor** - A robust in-browser Markdown editor.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Engineered a cyberpunk-themed split-pane Markdown editor utilizing React-Markdown and remark-gfm. It features live compilation of Markdown into formatted HTML elements (with custom Tailwind typography), real-time syntax highlighting for code blocks, and persistent saving of drafts to `localStorage`.
      </details>
- ~~[x] **LinkCompressor URL Shortener** - A micro-utility for shortening web addresses.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Developed an interactive URL minimization tool that hooks into the free `is.gd` REST API to compress long URLs. Features include robust error handling, history tracking via `localStorage`, 1-click clipboard copying, and a visually engaging compression sequence.
      </details>
- ~~[x] **Navigation Condensation & Settings Hub** - Centralized auxiliary tools into a dedicated settings page and socials registry.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Optimized the global Hexagon Navigation Menu by relocating secondary modules (QR Code, Changelog) to a new centralized Settings page and future goals to a dedicated Socials roadmap page. This significantly reduced visual clutter and improved menu legibility through staggered animation delays.
      </details>
- ~~[x] **Data Visualization** - Data visualization is the representation of data in a graphical format. Built with Recharts.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Engineered an interactive, futuristic Data Visualization page utilizing Recharts. Features dynamic theme-responsive charts (Line, Bar, Radar) representing mock cyberpunk datasets.
      </details>
- ~~[x] **Testimonial Cards** - Quotes or statements from satisfied customers/users, displayed in a carousel/grid.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a client-side Testimonial Cards component using framer-motion for smooth carousel transitions, displaying quotes from satisfied colleagues or customers in a Bento Box on the home page.
      </details>
- ~~[x] **Github User Activity** - Displays a list of github user activities in a terminal-themed timeline UI.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Implemented a Github Activity Feed component that securely fetches real-time events from the GitHub REST API and displays them as a glowing timeline inside a glassmorphic Bento Box. It balances the layout of the Projects page while providing active proof-of-work.
      </details>
- ~~[x] **Currency Converter** - Real-time currency exchange utility.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Built a client-side Currency Converter that leverages a daily-cached Server Component to fetch the latest USD exchange rates from ER-API. The tool features instantaneous conversions between top global currencies, fully adhering to the site's neon, glassmorphic aesthetic.
      </details>
- ~~[x] **Unit Converter** - Multi-category unit conversion utility.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Engineered a highly responsive, client-side Unit Converter that handles instantaneous conversions across Length, Weight, and Temperature categories. The logic relies purely on React state and `useMemo` for zero-latency math, styled with a distinct purple cyberpunk aesthetic to contrast with the Currency Converter.
      </details>
- ~~[x] **File Integrity Checker** - Cryptographic file hashing utility.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Created a fully client-side file integrity checker using the native Web Crypto API (`crypto.subtle`). It allows users to drag-and-drop files to instantly compute SHA-1, SHA-256, SHA-384, or SHA-512 hashes entirely within the browser's memory, ensuring zero-trust privacy and maximum speed without uploading files to a server.
      </details>
- ~~[x] **Numberguessing Game** - Terminal_Link.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Developed a cyberpunk-themed number guessing mini-game called "Terminal_Link". Built natively with React hooks and `framer-motion` for fluid animations, it acts as a fun interactive piece that tasks the user with finding a randomly generated number between 1 and 100 via binary search logic, complete with a guess history feed.
      </details>
- ~~[x] **CSV Cleaner** - Client-side Data Sanitizer.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Built a powerful client-side utility using `papaparse` to instantly parse, clean, and export CSV files in the browser. It features toggles for removing empty rows, trimming whitespace, and dropping duplicates, complete with a virtualized live preview table and zero server communication.
      </details>
- ~~[x] **Flash Cards** - Neural_Imprint Study Tool.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Developed a 3D animated flash card system ("Neural_Imprint") utilizing `framer-motion` for fluid CSS flip transforms. The app comes preloaded with a Tech Interview deck and leverages the browser's `localStorage` to persistently track the user's memorization progress across sessions.
      </details>
- ~~[x] **Photo Showcase** - Dynamic Masonry Grid.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Built a responsive CSS masonry image grid powered by Unsplash. Integrated a custom `framer-motion` Lightbox modal to view full-resolution assets with seamless entrance and exit spring animations.
      </details>
- ~~[x] **Job Scraper** - Target Acquisition API.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Created a full-stack Next.js solution using API routes (`route.ts`) and `cheerio` to fetch and parse the Hacker News job board server-side. The client-side `JobFeed` component polls this internal endpoint, avoiding CORS issues and rendering the data with staggered animations.
      </details>
- ~~[x] **Real-Time Leaderboard** - Live Telemetry UI.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Developed a "Global Rankings" component simulating a live WebSocket stream. It leverages `framer-motion`'s `layout` property to automatically and smoothly reorder DOM nodes in real-time as player scores and ranks update asynchronously.
      </details>
- ~~[x] **Market Price Analysis** - Financial Dashboard.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Created a full-stack proof-of-concept analytical dashboard for both Stocks and Crypto. A Next.js API route (`/api/markets`) securely checks for an Alpha Vantage API key, falling back to a realistic random-walk algorithm to stream 30-day OHLC data. The client-side UI uses `recharts` to render a responsive, glassmorphic gradient `AreaChart` and calculates realtime metrics like 30D Highs and Lows.
      </details>
- ~~[x] **Personal Blog Engine** - Static Markdown Pipeline.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Developed a custom, fully static markdown rendering pipeline utilizing `react-markdown` and `generateStaticParams()`. It compiles raw markdown strings from a local registry (`blog.ts`) into fully styled DOM nodes matching the project's cyberpunk aesthetic. Included 4 pre-authored technical deep dives detailing the architecture of previously built components.
      </details>
- ~~[x] **Navigation Expansion** - Live Projects & Neural Logs.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Added a dedicated Live Projects route that wraps the existing project feed to only display deployed applications. Integrated both the Live Projects page and the Blog into the primary Hexagon Menu and global footer, expanding the portfolio's navigational footprint while maintaining seamless `framer-motion` page transitions.
      </details>
- ~~[x] **Server Performance Statistics** - Nexus Core.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Engineered and deployed a highly realistic client-side telemetry dashboard (Nexus_Core) since a real Node.js backend cannot run dynamically on GitHub Pages (`output: 'export'`). It uses a React `useEffect` interval to simulate real-time metrics (CPU Usage, Memory Allocation, Network I/O) every 1000ms. Integrated Recharts for fluid, neon-styled `AreaChart` visualizations and framer-motion for micro-interactions (progress bars, status alerts).
      </details>

- ~~[x] **Movie Scraper and Reservation System** - Cinema Nexus.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Built a client-side simulated movie scraping and point-of-sale reservation system. It utilizes `localStorage` to emulate a backend database, saving user seat selections persistently across sessions. The UI features a cyberpunk aesthetic with glowing borders based on movie themes, genre filtering, and an interactive CSS grid for seat selection.
      </details>

- ~~[x] **Neural Hacker Quiz** - Neural_Quiz.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      A cyberpunk-styled interactive quiz simulation designed to test knowledge of Data Structures and Algorithms. It features an interactive terminal interface that supports both multiple-choice options and strict string-matching for fill-in-the-blank code snippets. The application leverages `framer-motion` for fluid state transitions and includes an adjustable countdown timer ("Pressure Mode") to simulate high-pressure technical interviews.
      </details>
</details>

## Upcoming Features

For a complete list of upcoming features, pending integrations, and the prioritized roadmap, please refer to the [TODO.md](TODO.md) file.

# Thank you for your time and consideration! 
