// Small Markdown-to-HTML converter for the subset the engine writes:
// headings, paragraphs, lists, tables, blockquotes, rules, bold/italic,
// inline code and links. Input is escaped, so raw HTML never passes through.

export function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const AMAZON = /^https?:\/\/(?:[\w-]+\.)*(?:amazon\.[a-z.]+|amzn\.to)\//i;

function inline(text, opts = {}) {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // ![alt text](images/photo.jpg) - relative paths are relative to the blog root.
  s = s.replace(/!\[([^\]]*)\]\(([^\s)]+)\)/g, (_, alt, src) => {
    const url = /^https?:\/\//.test(src) ? src : `${opts.imageBase ?? ""}${src.replace(/^\.?\//, "")}`;
    return `<img src="${url}" alt="${alt}" loading="lazy" decoding="async">`;
  });
  s = s.replace(/(?<!!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, href) => {
    // Google asks for affiliate links to be marked rel="sponsored".
    const rel = AMAZON.test(href.replace(/&amp;/g, "&"))
      ? "sponsored nofollow noopener"
      : "noopener";
    return `<a href="${href}" rel="${rel}" target="_blank">${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  return s;
}

const splitRow = (line) =>
  line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

// headingShift: 1 turns ### into <h2>, #### into <h3>, and so on.
export function markdownToHtml(md, opts = {}) {
  const { headingShift = 0 } = opts;
  const inl = (t) => inline(t, opts);
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let para = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inl(para.join(" "))}</p>`);
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);

    if (!line.trim()) {
      flush();
    } else if (heading) {
      flush();
      const level = Math.min(6, Math.max(1, heading[1].length - headingShift));
      out.push(`<h${level}>${inl(heading[2])}</h${level}>`);
    } else if (/^(\s*[-*_]){3,}\s*$/.test(line)) {
      flush();
      out.push("<hr>");
    } else if (/^\s*\|.*\|\s*$/.test(line) && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1] ?? "")) {
      flush();
      const head = splitRow(line);
      const rows = [];
      i += 2;
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) rows.push(splitRow(lines[i++]));
      i--;
      out.push(
        `<div class="table-wrap"><table><thead><tr>${head.map((c) => `<th>${inl(c)}</th>`).join("")}</tr></thead>` +
          `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inl(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
      );
    } else if (/^\s*([-*+]|\d+[.)])\s+/.test(line)) {
      flush();
      const ordered = /^\s*\d/.test(line);
      const items = [];
      while (i < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[i])) {
        items.push(lines[i++].replace(/^\s*([-*+]|\d+[.)])\s+/, ""));
      }
      i--;
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((it) => `<li>${inl(it)}</li>`).join("")}</${tag}>`);
    } else if (/^\s*>/.test(line)) {
      flush();
      const quote = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ""));
      i--;
      out.push(`<blockquote>${markdownToHtml(quote.join("\n"), opts)}</blockquote>`);
    } else {
      para.push(line.trim());
    }
  }
  flush();
  return out.join("\n");
}

// Plain text for meta descriptions, JSON-LD and RSS.
export function stripMarkdown(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
