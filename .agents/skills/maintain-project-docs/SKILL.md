---
name: maintain-project-docs
description: Triggers when modifying architectural components, adding new pages, or changing project goals to ensure the knowledge graph and README stay in sync.
---

# Maintain Project Documentation

Whenever you implement a major architectural change, add a new route, create a new core component, or fulfill a milestone in the ResumeWebsite project, you must ensure the documentation reflects these updates.

## Actions to Take
1. **Update `README.md`**: Update the "Goals" section by moving completed tasks to "Past Goals" or checking them off. Update the "File Structure" section if new directories or files were added.
2. **Update `knowledge_graph.md`**: Review `.agents/knowledge_graph.md`. If new pages, components, or state models were introduced, update the Mermaid diagram and Component Breakdown sections.
3. **Update Rules (`AGENTS.md`)**: If a new library or architectural pattern is established (e.g., adding a new database or state management library), append rules for its usage in `.agents/AGENTS.md`.

## Validation
Always ensure that the Mermaid syntax in `knowledge_graph.md` is valid and properly formats as a graph.
