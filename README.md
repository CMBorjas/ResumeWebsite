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

This website serves as a digital resume and portfolio for Christian Mandujano Borjas. It includes pages for:

- **About Me**: Introduction and summary of professional background.
- **Education**: Academic background and qualifications.
- **Skills**: Technical skills and areas of expertise.
- **Work Experience**: Professional experience and roles held.
- **Projects**: Live GitHub repository feed with tech stack detection.
- **Resume**: Embedded PDF viewer with a downloadable resume.
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
│       └── Christian_manduano_borjas_Resume.pdf   # Downloadable resume PDF
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
│   │   ├── projects/
│   │   │   └── page.tsx                           # Projects / GitHub feed page
│   │   ├── resume/
│   │   │   └── page.tsx                           # Resume viewer page
│   │   ├── skills/
│   │   │   └── page.tsx                           # Skills page
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

- **Dynamic Theme Engine**: Build a robust React Context provider to hot-swap CSS variables, instantly switching between Cyberpunk, Forestpunk, and Corporate themes without reloading.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      To support the planned Cyberpunk, furthur in the future we will add more themes such as Forestpunk, and Corporate, a robust `<ThemeProvider>` needs to be implemented to hold the current, future theme colors, styles and animations for each theme. This engine will allow the user to switch between themes on the client side, in order to switch between themes we will use React Context and CSS custom properties (variables) to control the entire color palette, typography, and border styles. This approach will ensure that the application can instantly switch between themes on the client side without any performance penalty or page reloads.Hopefully it shows an understanding of modern CSS architecture and React state management.
      </details>

- **Fluid Page Transitions**: Integrate `framer-motion` to wrap the Next.js application in an `<AnimatePresence>`, creating seamless desktop-like fade and slide animations when navigating between routes.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Currently, Next.js performs hard cuts between route changes. By integrating `framer-motion`, the application should integrate a feature that will bring smooth, fluid page transitions. An `<AnimatePresence>` wrapper should orchestrate exit animations for the current page and entrance animations for the new page. Hopefully making the website feel more cohesive, native application like rather than a collection of static web pages, which should significantly enhance the user experience.
      </details>

- **Interactive Canvas Background**: Replace static backgrounds with a custom HTML5 `<canvas>` component that renders an interactive, subtle particle network or glowing grid that reacts to the user's cursor.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      To elevate the visual appeal beyond static dark mode backgrounds, a custom React component using the HTML5 <-canvas-> API will need to be developed. This background should likely feature a lightweight, interactive particle system or glowing geometry that subtly responds to mouse movement and clicks. Versions for website on a desktop and a mobile device will need to be considered, the implementation on a mobile device will likely be simpler than that on a desktop device. Hopefully this will demonstrate proficiency in graphics programming and performance optimization, ensuring the animation runs smoothly at 60 FPS without draining device batteries too much. We will need to use a library like `react-tsparticles` or `react-canvas-confetti` to achieve this effect, along with some custom styling to match the cyberpunk theme and future themes. We will need to come up with a way to show the cost of running the animation on different devices and how it will impact the battery life of mobile devices, and possibly come up with a way to optimize the animation for different devices. 

      </details>

- **The "Bento Box" Layout**: Restructure the 'About Me' and 'Skills' pages using advanced CSS Grid to create a responsive, glassmorphic "Bento Box" layout with sophisticated hover micro-interactions.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      The current linear layouts will be upgraded to the highly modern "Bento Box" design trend, popularised by top-tier tech companies. This involves creating a complex, responsive CSS Grid architecture where information is compartmentalized into glassmorphic cards of varying sizes. These cards will seamlessly reflow on mobile devices and feature advanced CSS hover states (such as magnetic borders or dynamic glows) to encourage user interaction and showcase high-level UI/UX implementation skills. The use of framer-motion will allow us to create these micro-interactions and animations. This should show our understanding of modern CSS and React state management.
      
      </details>

---

# Thank you for visiting my resume website repository!
