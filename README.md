# Post-exam instructions

Public page for the Special Procedures nursing service. Patients can find and download post-exam instructions in European Portuguese or English. The application is static and is published with GitHub Pages.

## Permanent address

<https://my-creations.github.io/post-medical-exam-education/>

The QR code displayed in the service points to this address. The page content and PDF files can change without replacing the printed QR code.

## Examinations

- Upper GI Endoscopy
- Lower GI Endoscopy
- Fiberoptic Bronchoscopy
- High-resolution Anoscopy
- Flexible Sigmoidoscopy

The clinical PDF files are not included yet. See [`assets/documents/README.md`](./assets/documents/README.md) when the approved files are ready.

## Development

Requires [Bun](https://bun.sh/) 1.3.10.

```bash
bun install
bun run dev
```

Open <http://127.0.0.1:4173>.

## Checks

```bash
bun run lint
bun run format:check
bun run test:unit:coverage
bun run test:e2e
bun run build
```

## QR code

Print-ready files are stored in [`assets/qr-code`](./assets/qr-code). Regenerate them with:

```bash
bun run qr
```

The generator reads the address from [`config/site.js`](./config/site.js). Do not change this address after printing and displaying the QR code.

## CI and deployment

The [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) workflow uses Blacksmith runners to:

1. check ESLint and Prettier;
2. run unit tests with coverage;
3. run Playwright E2E tests in Chromium;
4. deploy `main` to GitHub Pages only after all checks pass.

## Design decision

Variant B, "Clinical directory", is the approved design. The three original variants remain available on the `prototype/ui-directions` branch.
