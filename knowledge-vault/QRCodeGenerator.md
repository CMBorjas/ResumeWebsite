# QRCodeGenerator Component

## What is it?
The `QRCodeGenerator.tsx` is a utility widget that takes a user-provided string or URL and dynamically renders a scannable QR code. It is located at `src/components/QRCodeGenerator.tsx`.

## Why was it modified/created?
Created to fulfill the "QR Code Generator" objective. It acts as a shareable widget, allowing users (or recruiters) to quickly scan links to GitHub repositories, live deployments, or contact information directly from their mobile devices.

## How it works?
1. **State**: Manages an `inputValue` string state via an `<input type="url">` field.
2. **Generation**: Relies on a third-party React QR code library (like `react-qr-code` or `qrcode.react`).
3. **Rendering**: The library takes the `inputValue` prop and uses HTML5 `<canvas>` or `<svg>` to mathematically render the QR matrix on the fly.
4. **Export**: (Optional feature) Users can click a button to trigger a canvas `.toDataURL()` call, allowing them to download the generated QR code as a PNG.

## Requirements
- A QR code rendering dependency (e.g., `react-qr-code`).
- React hooks (`useState`).

## Outbound Data Flow
- **Input**: User string/URL input.
- **Output**: Visual QR representation. Does not send data externally.
