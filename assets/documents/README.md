# Post-exam documents

The PDF files in `pt/` and `en/` are generated from the same structured content used by the web reader.

```bash
bun run documents
```

Expected structure:

```text
assets/documents/
├── pt/
│   └── <exam-id>.pdf
└── en/
    └── <exam-id>.pdf
```

The source is `js/documents.js`. Do not edit the generated PDFs by hand. Source-page mapping is recorded in [`docs/source-extraction.md`](../../docs/source-extraction.md).
