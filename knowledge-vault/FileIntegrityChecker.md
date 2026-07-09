# FileIntegrityChecker Component

## What is it?
The `FileIntegrityChecker.tsx` is a fully client-side React component that calculates cryptographic hashes (SHA-1, SHA-256, SHA-384, SHA-512) for any uploaded file. It operates within its own dedicated route at `src/app/projects/file-integrity/page.tsx`.

## Why was it modified/created?
It was created to fulfill the "File integrity Checker" roadmap goal. It demonstrates the ability to securely handle and process files directly within the browser using native APIs, providing a practical utility for verifying downloaded software, iso images, or document tampering.

## How it works?
1. **File Ingestion**: Users drag-and-drop or click to select a file via a hidden `<input type="file" />`.
2. **Buffer Conversion**: The component reads the selected file into an `ArrayBuffer` using `file.arrayBuffer()`.
3. **Cryptographic Hashing**: It calls `crypto.subtle.digest(algorithm, arrayBuffer)` which utilizes the browser's native Web Crypto API to securely and rapidly compute the hash.
4. **Formatting & UI**: The resulting hash is converted to a hexadecimal string and rendered on screen. Users can paste an expected hash into an input field, and the component will conditionally render a match/mismatch state.
5. **Styling**: It uses a `brand-green` cyberpunk color scheme to differentiate it from the other utilities.

## Requirements
- A modern browser that supports the `Web Crypto API` (`window.crypto.subtle`).
- React state management (`useState`, `useRef`).

## Outbound Data Flow
- **Input**: Local user file selection.
- **Output**: Purely presentational. The file and its computed hash **never leave the user's device**; no network requests are made, ensuring complete zero-trust privacy.
