# Resume Website Project Knowledge Graph
**Purpose:** This documentation and knowledge graph are explicitly made to explain what the code does and how data and control flow through the set of operations across the application.

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
        LiveProjects[live-projects/page.tsx]
        DataViz[projects/data-visualization/page.tsx]
        ServerStatsPage[projects/server-stats/page.tsx]
        CinemaNexusPage[projects/cinema-nexus/page.tsx]
        Settings[settings/page.tsx]
        Skills[skills/page.tsx]
        Socials[socials/page.tsx]
        WorkExp[work-experience/page.tsx]
        QRCode[qr-code/page.tsx]
        Pricing[pricing/page.tsx]
        Converters[projects/converters/page.tsx]
        FileIntegrity[projects/file-integrity/page.tsx]
        TerminalLink[projects/number-guessing-game/page.tsx]
        CsvCleanerPage[projects/csv-cleaner/page.tsx]
        FlashCardsPage[projects/flash-cards/page.tsx]
        FlashCardEditorPage[projects/flash-cards/editor/page.tsx]
        PhotoShowcasePage[projects/photo-showcase/page.tsx]
        JobScraperPage[projects/job-scraper/page.tsx]
        LeaderboardPage[projects/leaderboard/page.tsx]
        MarketAnalysisPage[projects/market-analysis/page.tsx]
        QuizAppPage[projects/quiz-app/page.tsx]
        BlogFeedPage[blog/page.tsx]
        BlogPostReaderPage[blog/[slug]/page.tsx]
    end
    
    %% Components
    subgraph Components
        HexMenu[HexagonMenu.tsx]
        ProjectCard[ProjectCard.tsx]
        ProjectCarousel[ProjectCarousel.tsx]
        ProjectFeed[ProjectFeedClient.tsx]
        TechStack[TechStackPanel.tsx]
        TestimonialCards[TestimonialCards.tsx]
        ProfileStats[ProfileStatsPanel.tsx]
        ServerStats[ServerStats.tsx]
        GithubFeed[GithubActivityFeed.tsx]
        CurrencyConv[CurrencyConverter.tsx]
        UnitConv[UnitConverter.tsx]
        FileChecker[FileIntegrityChecker.tsx]
        NumGame[NumberGuessingGame.tsx]
        CsvSanitizer[CsvCleaner.tsx]
        FlashCard[FlashCard.tsx]
        FlashCardDeck[FlashCardDeck.tsx]
        FlashCardEditor[FlashCardEditor.tsx]
        PhotoMasonry[PhotoMasonry.tsx]
        JobFeed[JobFeed.tsx]
        LiveLeaderboard[LiveLeaderboard.tsx]
        MarketAnalysis[MarketAnalysis.tsx]
        QuizInterface[QuizInterface.tsx]
        ScoreScreen[ScoreScreen.tsx]
        MyGoals[MyGoals.tsx]
        ServicesSection[ServicesSection.tsx]
    end
    
    %% Connections
    Layout --> HexMenu
    Projects --> ProjectFeed
    Projects --> ProjectCarousel
    Projects --> ProfileStats
    Projects --> GithubFeed
    LiveProjects --> ProjectFeed
    ProjectFeed --> ProjectCard
    ProjectCarousel --> ProjectCard
    Converters --> CurrencyConv
    Converters --> UnitConv
    FileIntegrity --> FileChecker
    TerminalLink --> NumGame
    CsvCleanerPage --> CsvSanitizer
    FlashCardsPage --> FlashCardDeck
    FlashCardEditorPage --> FlashCardEditor
    FlashCardDeck --> FlashCard
    PhotoShowcasePage --> PhotoMasonry
    JobScraperPage --> JobFeed
    LeaderboardPage --> LiveLeaderboard
    MarketAnalysisPage --> MarketAnalysis
    QuizAppPage --> QuizInterface
    QuizAppPage --> ScoreScreen
    BlogFeedPage --> BlogFeed
    BlogPostReaderPage --> BlogPostReader
    BlogFeedPage --> BlogRegistry
    BlogPostReaderPage --> BlogRegistry
    Skills --> TechStack
    
    %% Data & State
    subgraph Data & State
        ThemeEngine[Dynamic Theme Engine Context]
        ProjectData[lib/projects.ts]
        LocalStorage[(localStorage)]
        BlogRegistry[lib/blog.ts]
        QuizData[lib/quiz-data.ts]
    end

    %% Project Management
    subgraph Project Management
        TODO[TODO.md - Roadmap & Backlog]
        README[README.md - Main Docs]
    end
    
    ThemeEngine -.-> Layout
    ProjectData -.-> ProjectFeed
    ThemeEngine -.-> LocalStorage
    QuizData -.-> QuizAppPage
    
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
- Scroll-driven reveal animations and distinct full-viewport Hero sections via `framer-motion`.
