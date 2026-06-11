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

<details>
<summary><b>Past Goals</b></summary>

-~~[x]**Dynamic Theme Engine**: Build a robust React Context provider to hot-swap CSS variables, instantly switching between Cyberpunk, Forestpunk, and Corporate themes without reloading.~~
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      To support the planned Cyberpunk, furthur in the future we will add more themes such as Forestpunk, and Corporate, a robust `<ThemeProvider>` needs to be implemented to hold the current, future theme colors, styles and animations for each theme. This engine will allow the user to switch between themes on the client side, in order to switch between themes we will use React Context and CSS custom properties (variables) to control the entire color palette, typography, and border styles. This approach will ensure that the application can instantly switch between themes on the client side without any performance penalty or page reloads. Hopefully it shows an understanding of modern CSS architecture and React state management.
      </details>

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
</details>
<details>
<summary><b>Current Goals</b></summary>


- [] **Photo showcase** - In this project, you are required to create a photo showcase using only HTML and CSS. The photo showcase should display a grid of photos that can be clicked to view a larger version of the photo. 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      Photo showcases are a common UI pattern used on marketing and SaaS websites to display photos in a grid layout. The photo showcase should display a grid of photos that can be clicked to view a larger version of the photo. We try to source these from the social media pages of the owner of the website, so that the photos are relevant to the website.
      </details>
- [] **Testimonial Cards** - Testimonials are quotes or statements from satisfied customers or users, often used on websites to build credibility and trust.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement the testimonials of the website, which are currently stored in a JSON file. These testimonials should be displayed in a carousel or grid format, with each testimonial having its own card.
      </details>

- [] **Personal Blog page** - A blog page is a page that displays a list of blog posts.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a blog page for the website, which will display a list of blog posts.
      </details>
- [] **Random github repo shoutout** - Random github repo shoutout is a section that displays a list of random github repositories.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a random github repo shoutout section for the website, which will display a list of random github repositories.
      </details>
- [] **Weather widget** - Weather widget is a widget that displays the current weather conditions for a specific location.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a weather widget for the website, which will display the current weather conditions for a specific location.
      </details>
- [] **Photo gallery 24hr story feature** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a photo gallery 24hr story feature for the website, which will display a list of photos.
      </details>
- [] **Pomodoro timer** - A pomodoro timer is a timer that is used to keep track of time while working on a task.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a pomodoro timer for the website, which will keep track of time while working on a task.
      </details>
- [] **URL Shortener** - A URL shortener is a tool that shortens long URLs to shorter, more manageable ones.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a URL shortener for the website, which will shorten long URLs to shorter, more manageable ones.
      </details>
- [] **QR Code Generator** - A QR code generator is a tool that generates QR codes for a given URL or text.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a QR code generator for the website, which will generate QR codes for a given URL or text.
      </details>
- [] **Markdown Note taking app** - A markdown note taking app is a app that allows users to take notes in markdown format.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a markdown note taking app for the website, which will allow users to take notes in markdown format.
      </details>
- [] **Currency converter** - A currency converter is a tool that converts currencies from one currency to another.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a currency converter for the website, which will convert currencies from one currency to another.
      </details>
- [] **Unit Converter** - A unit converter is a tool that converts units from one unit to another.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a unit converter for the website, which will convert units from one unit to another.
      </details>
- [] **Numberguessing game** - A numberguessing game is a game that allows users to guess a random number.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a numberguessing game for the website, which will allow users to guess a random number.
      </details>
- [] **Github user activity** - A github user activity is a section that displays a list of github user activities.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a github user activity section for the website, which will display a list of github user activities.
      </details>
- [] **Job list scraper** - A job list scraper is a tool that scrapes job listings from a website.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a job list scraper for the website, which will scrape job listings from a website.
      </details>
- [] **Data Visualization** - Data visualization is the representation of data in a graphical format.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement data visualization for the website, which will display data in a graphical format.
      </details>
- [] **Stock Price Analysis** - Stock price analysis is the process of analyzing stock prices to determine their value.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement stock price analysis for the website, which will analyze stock prices to determine their value.
      </details>
- [] **Crypto Price Analysis** - Crypto price analysis is the process of analyzing crypto prices to determine their value.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement crypto price analysis for the website, which will analyze crypto prices to determine their value.
      </details>
- [] **File integretiy Checker** - A file integretiy checker is a tool that checks the integrity of a file.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a file integretiy checker for the website, which will check the integrity of a file.
      </details>
- [] **Image processing services** - Image processing services are a set of tools that allow users to process images.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement image processing services for the website, which will allow users to process images.
      </details>
- [] **Real-time leaderboard** - Real-time leaderboard is a leaderboard that displays the scores of users in real-time.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a real-time leaderboard for the website, which will display the scores of users in real-time.
      </details>
- [] **Movie Scraper and Resevation system** - Movie scraper and reservation system is a system that allows users to reserve movies.
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a movie scraper and reservation system for the website, which will allow users to reserve movies.
      </details>
- [] **Server performance statistics** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a server performance statistics system for the website, which will display the performance statistics of a server.
      </details>
- [] **Tool to Clean Csv files** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a tool to clean csv files for the website, which will clean csv files.
      </details>
- [] **Flash Cards** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a flash card system for the website, which will display flash cards.
      </details>
- [] **Flash Card Editor** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a flash card editor for the website, which will allow users to edit flash cards.
      </details>
- [] **Quiz App** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a quiz app for the website, which will allow users to take quizzes.
      </details>
- [] **Markdown Editor** - 
   - <details>
      <summary><b>Detailed Explanation</b></summary>
      We will need to implement a markdown editor for the website, which will allow users to edit markdown.
      </details>

</details>

---
### Prioritized Goal Roadmap:
---
* [x] 1. Tool Tip UI
* [x] 2. Restricted Textarea
* [x] 3. Accordion
* [x] 4. Cookie Consent Banner
* [x] 5. Contact Page Reform
* [x] 6. Homescreen Three Dots Menu
* [x] 7. Pricing Cards
* [x] 8. Changelog Component
* [ ] 9. Testimonial Cards
* [ ] 10. Photo Showcase 
* [ ] 11. QR Code Generator 
* [ ] 12. Random GitHub Repo Shoutout 
* [ ] 13. Weather Widget 
* [ ] 14. Pomodoro Timer 
* [ ] 15. Personal Blog Page 
* [ ] 16. Markdown Note Taking App 
* [ ] 17. Photo Gallery 24hr Story Feature 
* [ ] 18. URL Shortener 
---

# Thank you for your time and consideration! 