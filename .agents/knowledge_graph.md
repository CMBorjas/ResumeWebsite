# Resume Website Project Knowledge Graph

This document provides a high-level overview of the project architecture using a Mermaid.js diagram and component breakdown.

## Architecture Diagram

```mermaid
graph TD
    %% Core Framework
    NextJS[Next.js App Router] --> Pages
    
    %% Pages
    subgraph Pages
        Layout[layout.tsx - Global Nav]
        Home[page.tsx - About Me]
        Contact[contact/page.tsx]
        Education[education/page.tsx]
        Projects[projects/page.tsx]
        DataViz[projects/data-visualization/page.tsx]
        Resume[resume/page.tsx]
        Settings[settings/page.tsx]
        Skills[skills/page.tsx]
        Socials[socials/page.tsx]
        WorkExp[work-experience/page.tsx]
        QRCode[qr-code/page.tsx]
        Pricing[pricing/page.tsx]
    end
    
    %% Components
    subgraph Components
        HexMenu[HexagonMenu.tsx]
        ProjectCard[ProjectCard.tsx]
        ProjectFeed[ProjectFeedClient.tsx]
        TechStack[TechStackPanel.tsx]
    end
    
    %% Connections
    Layout --> HexMenu
    Projects --> ProjectFeed
    ProjectFeed --> ProjectCard
    Skills --> TechStack
    
    %% Data & State
    subgraph Data & State
        ThemeEngine[Dynamic Theme Engine Context]
        ProjectData[lib/projects.ts]
        LocalStorage[(localStorage)]
    end

    %% Project Management
    subgraph Project Management
        TODO[TODO.md - Roadmap & Backlog]
        README[README.md - Main Docs]
    end
    
    ThemeEngine -.-> Layout
    ProjectData -.-> ProjectFeed
    ThemeEngine -.-> LocalStorage
    
    %% Deployment
    subgraph Deployment
        Docker[Dockerfile / Nginx]
        GHPages[GitHub Pages / Static Export]
    end
    
    NextJS -- "npm run build (out/)" --> Docker
    NextJS -- "npm run build (out/)" --> GHPages
```

## Component Breakdown
- **Frontend Framework**: Next.js 16 (App Router), React 19.
- **Styling & Animations**: Tailwind CSS 4, framer-motion, Recharts (Data Visualization).
- **Layout Approach**: Bento Box layout (CSS Grid), responsive, glassmorphic UI.
- **State Management**: React Context (Theme Engine) and `localStorage`.
- **Infrastructure**: Hosted on GitHub Pages via static export. Local development supported by Docker + Nginx.

## Key Design Principles
- Cyberpunk aesthetic, neon accents, dark mode base.
- HTML5 Canvas for interactive backgrounds (particles/grids).
- Fluid route transitions via `AnimatePresence`.
