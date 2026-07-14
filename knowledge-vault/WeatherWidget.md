# WeatherWidget Component

## What is it?
The `WeatherWidget.tsx` is an environmental UI component that displays current weather conditions for a specific location. It is located at `src/components/WeatherWidget.tsx`.

## Why was it modified/created?
Created to fulfill the "Weather Widget" goal. It provides a humanizing, localized touch to the portfolio, often displaying the weather at the developer's current location (e.g., "Currently 72° in San Francisco"). 

## How it works?
1. **API Integration**: Makes client-side fetch requests to the free tier `api.open-meteo.com` for weather data and `geocoding-api.open-meteo.com` for searching new cities.
2. **Data Model**: Iterates over a combined array of cities. The array consists of hardcoded `DEFAULT_CITIES` (imported from `src/lib/weatherCities.ts`) and custom cities retrieved from the browser's `localStorage`.
3. **State Management**: Uses React `useEffect` to poll for weather updates every 10 minutes. Custom cities added via the search bar are dynamically appended and persisted in `localStorage`. Default cities cannot be removed.
4. **Visuals**: Uses framer-motion for smooth list transitions and conditional rendering based on weather codes to display appropriate `lucide-react` icons and temperature data. The maximized view displays an interactive Global Telemetry dashboard.

## Requirements
- Access to the public `open-meteo` and `geocoding-api.open-meteo` APIs (no keys required).
- `lucide-react` for weather icons.
- `framer-motion` for animations.

## Outbound Data Flow
- **Input**: User can search for cities via the search bar input.
- **Output**: Makes outbound HTTP GET requests to Open-Meteo APIs. Saves custom city data to the client's `localStorage`.
