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

---

# Thank you for visiting my resume website repository!
