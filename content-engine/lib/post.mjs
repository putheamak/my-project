// Turns a daily posting pack into a blog post file, and reads post files back.
//
// Post files live in posts/ as Markdown with a small front-matter header:
//
//   ---
//   title: Best Garlic Press for Small Kitchens
//   status: "draft"        <- change to "published" to put it on the blog
//   ---

export function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "");
}

function section(text, name) {
  const re = new RegExp(`^## ${name}\\s*$`, "im");
  const m = re.exec(text);
  if (!m) return "";
  const rest = text.slice(m.index + m[0].length);
  const next = rest.search(/^## /m);
  return (next === -1 ? rest : rest.slice(0, next)).trim();
}

function field(brief, label) {
  const m = brief.match(new RegExp(`^\\s*[-*]?\\s*\\**${label}\\**\\s*:\\s*(.+)$`, "im"));
  if (!m) return "";
  return m[1]
    .replace(/\*\*/g, "")
    .replace(/\s*\(\d+\s*(?:characters?|chars?)\)\s*$/i, "") // drop "(56 characters)" notes
    .replace(/^["'`]|["'`]$/g, "")
    .trim();
}

export function postFromPack(pack, date) {
  const title = pack.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? `Post ${date}`;
  const brief = section(pack, "SEO brief");
  const body = section(pack, "Article");
  const seoTitle = field(brief, "SEO title") || title;
  const description = field(brief, "Meta description");
  const slug = slugify(field(brief, "URL slug") || seoTitle) || date;
  const keyword = field(brief, "Primary keyword");
  return { title, seoTitle, description, slug, keyword, date, body };
}

const FIELDS = ["title", "seoTitle", "description", "slug", "keyword", "date", "image", "status"];

export function serializePost(post) {
  // Values are written as quoted strings so titles containing ":" stay valid YAML.
  const header = FIELDS.map((k) => `${k}: ${JSON.stringify(String(post[k] ?? "").replace(/\n/g, " "))}`);
  return `---\n${header.join("\n")}\n---\n\n${post.body.trim()}\n`;
}

export function parsePost(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const post = { body: m[2].trim() };
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i <= 0) continue;
    let value = line.slice(i + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1);
      }
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    post[line.slice(0, i).trim()] = value;
  }
  return post;
}
