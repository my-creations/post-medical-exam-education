import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await Promise.all([
  cp(resolve(root, "index.html"), resolve(dist, "index.html")),
  cp(resolve(root, "css"), resolve(dist, "css"), { recursive: true }),
  cp(resolve(root, "js"), resolve(dist, "js"), { recursive: true }),
  cp(resolve(root, "assets"), resolve(dist, "assets"), { recursive: true }),
]);

await writeFile(resolve(dist, ".nojekyll"), "");

console.log(`Built static site in ${dist}`);
