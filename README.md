# Post-medical exam education prototype

Throwaway UI prototype used to choose the design for the post-exam instructions page.

## Run the prototype

```bash
bun run prototype
```

Open <http://localhost:4173/prototype/?variant=A>.

Variants A, B, and C use the CUF Prepara colour palette but propose different page structures. The floating switcher exists only on the `/prototype/` route.

## Decision

Variant B, "Clinical directory", was approved as the application design on August 22, 2026. This branch preserves the alternatives behind that decision. The production implementation lives on `main`.

The examinations and documents are demonstration data. This prototype contains no clinical guidance.
