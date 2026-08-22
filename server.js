import { extname, resolve } from "node:path";

const root = import.meta.dir;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

Bun.serve({
  hostname: "127.0.0.1",
  port: 4173,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = resolve(root, `.${pathname}`);

    if (!filePath.startsWith(root)) return new Response("Not found", { status: 404 });

    const file = Bun.file(filePath);
    if (!(await file.exists())) return new Response("Not found", { status: 404 });

    return new Response(file, {
      headers: { "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream" },
    });
  },
});

console.log("Post-exam instructions: http://127.0.0.1:4173");
