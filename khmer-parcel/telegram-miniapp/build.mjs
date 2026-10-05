// Builds dist/worker.js: one file you can paste into the Cloudflare dashboard.
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const html = readFileSync(new URL("./src/app.html", import.meta.url), "utf8");
const src = readFileSync(new URL("./src/worker.src.js", import.meta.url), "utf8");
if (!src.includes("__APP_HTML__")) throw new Error("placeholder __APP_HTML__ missing");

mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("./dist/worker.js", import.meta.url), src.replace("__APP_HTML__", () => JSON.stringify(html)));
console.log("wrote dist/worker.js");
