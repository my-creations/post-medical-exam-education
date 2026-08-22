# Post-exam documents

Only add PDF files approved by the clinical team.

Expected structure:

```text
assets/documents/
├── pt/
│   └── <exam-id>.pdf
└── en/
    └── <exam-id>.pdf
```

After adding a PDF, set its path in `js/catalog.js`. The view and download controls become active when the corresponding path is no longer `null`.
