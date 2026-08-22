import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import QRCode from "qrcode";

import { PUBLIC_SITE_URL } from "../config/site.js";

const outputDirectory = resolve(import.meta.dirname, "../assets/qr-code");
const sharedOptions = {
  errorCorrectionLevel: "H",
  margin: 4,
  color: {
    dark: "#074f64",
    light: "#ffffff",
  },
};

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  QRCode.toFile(resolve(outputDirectory, "post-exam-instructions.svg"), PUBLIC_SITE_URL, {
    ...sharedOptions,
    type: "svg",
    width: 1200,
  }),
  QRCode.toFile(resolve(outputDirectory, "post-exam-instructions.png"), PUBLIC_SITE_URL, {
    ...sharedOptions,
    type: "png",
    width: 1200,
  }),
]);

console.log(`QR code generated for ${PUBLIC_SITE_URL}`);
