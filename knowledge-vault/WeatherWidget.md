# WeatherWidget Component

## What is it?
The `WeatherWidget.tsx` is an environmental UI component that displays current weather conditions for a specific location. It is located at `src/components/WeatherWidget.tsx`.

## Why was it modified/created?
Created to fulfill the "Weather Widget" goal. It provides a humanizing, localized touch to the portfolio, often displaying the weather at the developer's current location (e.g., "Currently 72° in San Francisco"). 

## How it works?
1. **API Integration**: Makes a server-side fetch request to a free tier weather API (like OpenWeatherMap or WeatherAPI).
2. **Data Mapping**: Extracts the `temperature`, `condition` (e.g., cloudy, rain, clear), and location name from the JSON response.
3. **Caching**: Uses ISR (`next: { revalidate: 1800 }`) to fetch new data every 30 minutes, keeping it accurate without exhausting API limits.
4. **Visuals**: Uses conditional rendering based on the `condition` string to display an appropriate `lucide-react` icon (e.g., `<CloudRain>`, `<Sun>`) alongside the temperature data inside a cyberpunk-styled badge.

## Requirements
- Valid API Key for the chosen weather service stored in `.env.local`.
- `lucide-react` for weather icons.
- Internet access on the deployment server.

## Outbound Data Flow
- **Input**: None from the client.
- **Output**: The server makes an outbound HTTP GET request to the weather API using a secure backend token. Renders the data to the DOM.
