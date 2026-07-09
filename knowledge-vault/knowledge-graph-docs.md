---
file: .agents/knowledge_graph.md (and README.md)
type: documentation
tags: [docs, architecture, mermaid]
---

# Knowledge Graph & Documentation Updates

## Overview
This file documents the recent updates applied to the core documentation files of the project, primarily `.agents/knowledge_graph.md` and `README.md`.

## What Was Modified
1. **Explicit Purpose Statement**: Both the `README.md` and `.agents/knowledge_graph.md` files were updated to explicitly state their purpose: "This documentation and knowledge graph are explicitly made to explain what the code does and how data and control flow through the set of operations across the application."
2. **Architecture Updates**: Added the `Data Visualization` page to the `Pages` subgraph in the Mermaid.js diagram and added `Recharts` to the Component Breakdown section.

## Why It Was Modified
- **Explicit Purpose**: To eliminate ambiguity for both human developers and autonomous AI agents reading the repository. It firmly establishes that these docs are the source of truth for understanding the operational flow and intent behind the codebase.
- **Architecture Updates**: To keep the knowledge graph accurately synchronized with the latest deployed features.

## How It Works
- The Knowledge Graph utilizes Mermaid.js syntax (`graph TD`) to render a visual node-based representation of the Next.js app router structure, component hierarchy, and global state (like the Theme Engine and LocalStorage).
- The `README.md` leverages standard GitHub Flavored Markdown (GFM) and collapsible `<details>` tags to present a clean, easily navigable project overview.

## Requirements
- **Mermaid.js**: Markdown viewers must support Mermaid.js code block rendering to display the architecture graph.
- **Maintenance Discipline**: The `maintain-project-docs` skill mandates that developers/agents *must* update this graph whenever architectural changes (like adding new pages or features) occur.

## Data Flow (Outbound)
**None.** 
These are static Markdown documents. They do not send or receive data programmatically, but they *inform* the workflow of developers and AI agents operating within the workspace.
