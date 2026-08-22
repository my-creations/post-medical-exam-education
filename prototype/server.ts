// PROTOTYPE ONLY: tiny Bun static server for the throwaway UI route.
import { resolve, extname } from "node:path";

const root = resolve(import.meta.dir, "..");
const mimeTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

Bun.serve({
  port: 4173,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/prototype/" : url.pathname;
    const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const filePath = resolve(root, `.${relativePath}`);

    if (!filePath.startsWith(root)) {
      return new Response("Not found", { status: 404 });
    }

    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(file, {
      headers: {
        "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
      },
    });
  },
});

console.log("Prototype: http://localhost:4173/prototype/?variant=A");
