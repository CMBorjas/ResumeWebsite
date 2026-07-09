---
file: src/lib/projects.ts
type: data-registry
tags: [data, typescript, configuration]
---

# Projects Data Registry

## Overview
This file (`src/lib/projects.ts`) acts as the centralized data store for all projects featured on the ResumeWebsite. It defines the TypeScript types and exports an array of project objects.

## What Was Modified
The `Data Visualization` entry within the `projects` array was modified. 
- The `liveUrl` property was added (`'/projects/data-visualization'`).
- The `techStack` array was updated to reflect the new implementation (swapped `'D3.js'` for `'Recharts'`).

## Why It Was Modified
This change was necessary to link the global project feed (the cards displayed on the `/projects` page) directly to the newly created Data Visualization route. Without this update, the user would not be able to navigate to the new feature from the main feed.

## How It Works
It exports a static TypeScript array: `export const projects: Project[]`. 
When the Next.js application builds or renders, components import this array to map over the data and generate UI elements dynamically.

## Requirements
- **TypeScript**: Requires standard TypeScript typings (the `Project` type definition at the top of the file).
- **Data Integrity**: Must conform precisely to the `Project` type schema. All image URLs and Live URLs must point to valid internal or external routes.

## Data Flow (Outbound)
**Provides Data To:**
- `ProjectFeedClient.tsx`: Consumes this array to render the interactive, animated grid of project cards.
- The `Projects` page layout: Determines what tech stacks are available for filtering/display.
