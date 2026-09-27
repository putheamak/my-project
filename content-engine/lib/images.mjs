// Finds a local image under images/, forgiving the most common upload mistakes:
// a doubled extension ("photo.jpg.jpg", from Windows hiding extensions),
// .jpg vs .jpeg, and upper/lower case. Returns the path to use (relative to
// the content-engine root, e.g. "images/photo.jpg"), or the original path
// with a warning when nothing matches.

import fs from "node:fs";
import path from "node:path";

export function resolveImage(imagesDir, src, slug) {
  const rel = src.replace(/^\.?\//, "");
  if (!rel || !rel.startsWith("images/")) return rel;
  if (fs.existsSync(path.join(imagesDir, path.basename(rel)))) return rel;
  const wanted = path.basename(rel).toLowerCase().replace(/\.jpeg$/, ".jpg");
  const stem = wanted.replace(/\.(jpg|png|webp|gif)$/, "");
  const files = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];
  const match = files.find((f) => {
    const name = f.toLowerCase().replace(/\.jpeg/g, ".jpg");
    return name === wanted || name.startsWith(`${wanted}.`) || name.replace(/(\.(jpg|png|webp|gif))+$/, "") === stem;
  });
  if (match) {
    console.warn(`post ${slug}: using images/${match} for "${src}"`);
    return `images/${match}`;
  }
  console.warn(`post ${slug}: image "${src}" not found in content-engine/images/`);
  return rel;
}
