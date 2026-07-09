---
name: qr-code-generator
description: Generates QR codes for given URLs or text.
version: 1.0.0
metadata:
  hermes:
    tags: [react, utility]
    category: utility
---

# QR Code Generator

## When to Use
Trigger this skill when dealing with the QR code utility page or needing to embed QR codes elsewhere.

## Procedure
1. Import `QRCodeGenerator` from `src/components/QRCodeGenerator.tsx`.
2. Pass the `value` prop with the URL or text to encode.
3. Adjust sizing and styling as needed.

## Pitfalls
- Generating QR codes with too much text can make them too dense to scan easily.

## Verification
Enter text into the generator and scan the resulting QR code with a mobile device to ensure it resolves correctly.
