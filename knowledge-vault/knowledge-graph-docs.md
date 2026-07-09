# Knowledge Graph & Documentation Updates

## What is it?
This documents the recent structural changes to the core documentation files of the project: `.agents/knowledge_graph.md` and `README.md`. These files provide an explicit mapping of component hierarchies and feature tracking.

## Why was it modified/created?
The documentation was updated to eliminate ambiguity for both human developers and autonomous AI agents. The graph actively tracks the topology of the Next.js application, ensuring that any new feature (like the recent additions of Data Visualization, Flash Cards, CSV Cleaner, etc.) is visually represented in the architectural flow.

## How it works?
1. **Mermaid.js**: The `.agents/knowledge_graph.md` utilizes Mermaid.js syntax (`graph TD`) to render a visual node-based representation of the Next.js App Router structure, linking pages to their respective UI components.
2. **README.md**: Uses standard GitHub Flavored Markdown (GFM) and `<details>` tags to present a clean overview of completed, active, and upcoming features.
3. Agents are strictly instructed (via `AGENTS.md`) to append newly created components and routes to these documents upon task completion.

## Requirements
- Standard Markdown and GitHub Flavored Markdown (GFM) parser.
- Mermaid.js support for visualizing the code block node graph.
- Strict adherence to the `AGENTS.md` ruleset when modifying system topography.

## Outbound Data Flow
- **Input**: Human or Agent text edits to track system state.
- **Output**: Static documentation rendering. These files inform the workflow and contextual understanding of developers and AI agents but do not emit programmatic data to the codebase.
