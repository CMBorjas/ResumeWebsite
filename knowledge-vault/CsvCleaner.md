# CsvCleaner Component

## What is it?
The `CsvCleaner.tsx` is a powerful, fully client-side React utility that parses, cleans, and exports CSV datasets directly in the browser using the `papaparse` library. It lives on its own dedicated route at `src/app/projects/csv-cleaner/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "Tool to Clean Csv files" objective from the backlog. It demonstrates the ability to handle medium-complexity data processing tasks efficiently on the client side, bypassing the need to transmit potentially massive or sensitive data payloads to a backend server.

## How it works?
1. **File Ingestion**: Users drag-and-drop a `.csv` file. The component uses `Papa.parse` to rapidly stream and convert the raw text into a 2D array of strings in memory.
2. **Data Pipeline**: The `processData` function runs the dataset through a series of conditional filters based on the user's settings:
   - `removeEmptyRows`: Filters out any row where every cell is an empty string.
   - `trimWhitespace`: Iterates over every cell and applies `.trim()`.
   - `removeDuplicates`: Uses a `Set` combined with `JSON.stringify` to track and drop duplicate row arrays.
3. **Live Preview**: The first 20 rows of the cleaned data are rendered into a responsive HTML table to provide immediate visual feedback.
4. **Export**: The `handleDownload` function uses `Papa.unparse` to convert the cleaned 2D array back into a CSV string, creates a Blob URL, and triggers a programmatic download.

## Requirements
- `papaparse` package for ultra-fast CSV streaming and conversion.
- `framer-motion` for table row entrance animations.
- React hooks (`useState`, `useRef`).

## Outbound Data Flow
- **Input**: Local user file selection.
- **Output**: Programmatic local file download (`Blob`). The data **never leaves the browser**.
