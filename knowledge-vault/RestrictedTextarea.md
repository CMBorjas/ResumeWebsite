# RestrictedTextarea Component

## What is it?
The `RestrictedTextarea.tsx` is a specialized form input component located at `src/components/RestrictedTextarea.tsx`. It acts as a standard HTML `<textarea>` but enforces a strict character limit with visual feedback.

## Why was it modified/created?
Created to fulfill the "Restricted Textarea" objective. It's intended for use in forms (like the Contact page reform) where input bounds must be tightly controlled (e.g., limiting a message to 500 characters) to prevent abuse or database overflow.

## How it works?
1. **Props**: Accepts a `maxLength` prop alongside standard textarea props.
2. **State/Tracking**: Uses an `onChange` handler to update the internal (or passed) value state and synchronously calculates the remaining character count.
3. **Visual Feedback**: Renders a dynamic counter below the textarea. As the user approaches the limit, the counter text color transitions (e.g., from slate to a warning red or glowing neon color) to alert the user.
4. **Enforcement**: Once the limit is hit, the `onChange` handler prevents further string concatenation.

## Requirements
- React hooks (`useState`, `ChangeEvent`).
- Tailwind CSS for dynamic class conditional styling based on the character count ratio.

## Outbound Data Flow
- **Input**: User keystrokes.
- **Output**: Returns the controlled string value back up to parent form handlers via standard `onChange` callbacks.
