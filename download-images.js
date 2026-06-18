#!/usr/bin/env node
/*
 * Interact District 3220 — Bulk image downloader (Node.js)
 * --------------------------------------------------------
 * Downloads every ORIGINAL full-resolution image listed in
 * images-manifest.js into ./images/<category>/<friendly-name>.
 *
 * Usage:
 *   node download-images.js
 *
 * Requirements: Node.js 18+ (uses the built-in global fetch).
 * No npm install needed.
 */

const fs = require("fs");
const path = require("path");
const { IMAGE_MANIFEST, originalUrl } = require("./images-manifest.js");

const OUT_DIR = path.join(__dirname, "images");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadOne(item) {
  const url = originalUrl(item.id);
  const dir = path.join(OUT_DIR, item.category);
  ensureDir(dir);
  const dest = path.join(dir, item.name);

  if (fs.existsSync(dest)) {
    return { status: "skip", name: item.name };
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "Referer": "https://www.interactdistrict3220.org/",
      "Accept": "image/avif,image/webp,image/png,image/jpeg,*/*",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { status: "ok", name: item.name, bytes: buf.length };
}

(async () => {
  console.log(`\nInteract District 3220 — downloading ${IMAGE_MANIFEST.length} images\n`);
  ensureDir(OUT_DIR);

  let ok = 0, skip = 0, fail = 0;
  const failures = [];

  // Small concurrency to be polite to the CDN.
  const CONCURRENCY = 6;
  let i = 0;

  async function worker() {
    while (i < IMAGE_MANIFEST.length) {
      const item = IMAGE_MANIFEST[i++];
      try {
        const r = await downloadOne(item);
        if (r.status === "ok") {
          ok++;
          console.log(`  ✓ ${item.category}/${item.name}  (${(r.bytes / 1024).toFixed(0)} KB)`);
        } else {
          skip++;
          console.log(`  • ${item.category}/${item.name}  (already exists)`);
        }
      } catch (err) {
        fail++;
        failures.push({ name: item.name, error: err.message });
        console.log(`  ✗ ${item.category}/${item.name}  — ${err.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`\nDone. Downloaded ${ok}, skipped ${skip}, failed ${fail}.`);
  console.log(`Saved to: ${OUT_DIR}\n`);
  if (failures.length) {
    console.log("Failures:");
    failures.forEach((f) => console.log(`  - ${f.name}: ${f.error}`));
  }
})();
