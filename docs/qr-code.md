# Static QR code

The QR code contains this address:

```text
https://my-creations.github.io/post-medical-exam-education/
```

The QR code does not contain a PDF or the examination catalogue. It contains only the page address. The application and its documents can therefore change without reprinting the QR code.

## Files

- `assets/qr-code/post-exam-instructions.svg` for print and design software;
- `assets/qr-code/post-exam-instructions.png` for software that does not accept SVG.

The generator uses error correction level H and a four-module margin.

## Printing rule

Do not crop the white margin. Test a printed proof with both iOS and Android before producing every copy.

Do not change the organization name, repository name, or page address after displaying the QR code. Any address change requires a new QR code.
