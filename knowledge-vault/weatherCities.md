# weatherCities.ts Data Configuration

## What is it?
`weatherCities.ts` is a configuration file that defines the TypeScript interfaces and hardcoded default locations for the Global Telemetry dashboard (Weather Widget). It is located at `src/lib/weatherCities.ts`.

## Why was it modified/created?
Created to cleanly separate the default, hardcoded starting selections from the `WeatherWidget.tsx` component logic. This makes it easier for developers to manage default cities without diving into complex React component state logic.

## How it works?
1. **Data Structure**: Exports the `City` interface, enforcing a strict schema (`id`, `name`, `latitude`, `longitude`, `country`, `admin1`) for weather locations.
2. **Constant Array**: Exports `DEFAULT_CITIES`, an array of pre-configured `City` objects (e.g., Denver).
3. **Importing**: The `WeatherWidget` component imports this constant and combines it with any dynamically added cities retrieved from the user's `localStorage`. The default cities imported from this file are computationally locked and cannot be deleted by the user via the UI.

## Requirements
- TypeScript for strong typing.

## Outbound Data Flow
- **Input**: None.
- **Output**: Provides a statically typed data array to `WeatherWidget.tsx`.
