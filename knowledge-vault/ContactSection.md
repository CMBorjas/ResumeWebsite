## What is it?
The `ContactSection` is a full-width React component designed to provide a visually striking contact form and footer area. It replaces the previous small "Quick Contact" Bento Box.

## Why was it modified/created?
It was created to fulfill the "Contact Page Reform" objective, matching the cyberpunk aesthetic of the site while drawing inspiration from a specific set of premium hybrid themes (screenshots 21-23). The design emphasizes a bold "LET'S WORK" ticker tape and a minimalist form.

## How it works?
- **Ticker Tape**: Uses `framer-motion` to infinitely scroll an array of duplicated text components (`animate={{ x: ["0%", "-50%"] }}`) from right to left, creating a continuous marquee effect.
- **Form Layout**: A responsive 2-column grid. The left column holds contact details (phone, email, location), and the right column holds a sleek input form.
- **Form Submission**: Instead of a backend, it intercepts the `onSubmit` event, URL-encodes the user's name, email, and message, and triggers a `mailto:` link utilizing the user's default email client.

## Requirements
- `framer-motion` for the marquee animations.
- `react-icons` for the social/button icons.

## Outbound Data Flow
Data flows from the component state directly to the user's local email client via the `mailto:` protocol. No backend server or API is mutated.
