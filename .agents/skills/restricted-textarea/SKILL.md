---
name: restricted-textarea
description: Reusable textarea component with character counting and limits.
version: 1.0.0
metadata:
  hermes:
    tags: [react, forms, ui]
    category: ui
---

# Restricted Textarea

## When to Use
Trigger this skill when adding form inputs that require multi-line text with a strict character limit.

## Procedure
1. Use `RestrictedTextarea` from `src/components/RestrictedTextarea.tsx`.
2. Pass the `maxLength` prop.
3. Handle the `onChange` event to capture user input.

## Pitfalls
- Not displaying the current character count can frustrate users. The component should handle this internally.

## Verification
Type into the textarea and verify it prevents input beyond the limit, and the character counter updates correctly.
