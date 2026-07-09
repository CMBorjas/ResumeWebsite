---
name: changelog-component
description: Displays a list of project updates from a JSON file.
version: 1.0.0
metadata:
  hermes:
    tags: [react, data, ui]
    category: ui
---

# Changelog Component

## When to Use
Trigger this skill when updating the project's release notes or modifying how changelogs are presented.

## Procedure
1. Update the JSON data source with new changelog entries.
2. Modify `src/components/ChangelogComponent.tsx` to adjust the card layout or date formatting.
3. Ensure chronological sorting is applied.

## Pitfalls
- Invalid JSON formatting when adding new entries will break the component.

## Verification
Add a test entry to the JSON file and verify it renders correctly in the changelog list.
