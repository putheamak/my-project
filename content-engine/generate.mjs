// Daily content generator: writes one "posting pack" (article + video scripts +
// captions) per day to output/YYYY-MM-DD.md. You review it and post it yourself.
//
//   node generate.mjs            generate today's pack (needs ANTHROPIC_API_KEY)
//   node generate.mjs --dry-run  print the prompt without calling the API
//   node generate.mjs --force    regenerate even if today's pack exists

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { checkCompliance, formatReport } from "./compliance.mjs";
import { postFromPack, serializePost } from "./lib/post.mjs";
import { loadTopics } from "./lib/topics.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(here, "output");
const historyPath = path.join(outputDir, "history.json");
const args = new Set(process.argv.slice(2));

const config = JSON.parse(fs.readFileSync(path.join(here, "config.json"), "utf8"));
const today = new Date().toISOString().slice(0, 10);
const outPath = path.join(outputDir, `${today}.md`);

if (fs.existsSync(outPath) && !args.has("--force") && !args.has("--dry-run")) {
  console.log(`Already generated: ${path.relative(here, outPath)} (use --force to redo)`);
  process.exit(0);
}

const history = fs.existsSync(historyPath)
  ? JSON.parse(fs.readFileSync(historyPath, "utf8"))
  : [];
const recentTitles = history.slice(-30).map((h) => `- ${h.title}`).join("\n") || "- (none yet)";

const products = (config.products ?? [])
  .filter((p) => p.name && !p.name.startsWith("EXAMPLE"))
  .map((p) => `- ${p.name} | link: ${p.link} | owner's notes: ${p.notes || "none"}`)
  .join("\n");

const disclosure = config.disclosure;

// Pinterest users plan 4-8 weeks ahead, so steer topics toward the occasions
// whose window (month-day, may wrap past New Year) includes today.
const md = today.slice(5);
const inWindow = ({ from, to }) => (from <= to ? md >= from && md <= to : md >= from || md <= to);
const seasons = (config.seasons ?? []).filter(inWindow);
const seasonal = seasons.length
  ? `Upcoming occasions people are planning for now (today is ${today}):
${seasons.map((s) => `- ${s.occasion}: ${s.ideas}`).join("\n")}
Make today's topic fit one of these occasions, choosing the one the topics already covered (below) cover least, and name the occasion in the title, the pin title and the pin description.`
  : `Today is ${today}. No special occasion is coming up, so pick an everyday topic.`;

// Board names match the blog's topic pages, so new posts land on the right topic.
const boards = loadTopics(here).map((t) => t.board).filter(Boolean);

const system = `You write daily affiliate-marketing content for a solo creator who reviews it and posts it by hand. Every pack must be findable in search (SEO) and must comply with the Amazon Associates Program Operating Agreement.

Amazon Associates rules - never break these:
- Include this disclosure verbatim, word for word: ${disclosure}
  Put it in the article before the first link, and in every caption, description, or pin that has a link.
- Never state or estimate prices, price ranges for a specific product, discounts, sales, or deals ("on sale", "% off", "lowest price"). Amazon prices change and static prices are not allowed. Write "check the current price on Amazon" instead.
- Never show star ratings or review counts, and never quote or paraphrase Amazon customer reviews.
- Never mention Amazon badges such as "Best Seller" or "Amazon's Choice".
- Never imply Amazon sponsors or endorses the creator. "Available on Amazon" is fine.
- Only use the links from the product list (amazon.com or amzn.to). Never use other link shorteners or disguise where a link goes. Never suggest putting links in emails, PDFs, ebooks, or printed material.
- Never offer or imply a reward for clicking or buying (no giveaways tied to purchases, no "use my link to support me").
- For images, tell the creator to use their own photos or video. Never suggest downloading images from Amazon product pages.

Honesty rules:
- Never invent specs or fake first-person experiences ("I tested this for 3 weeks"). Only describe personal use when it appears in the owner's notes.
- Never make health or medical claims.
${config.affiliateLinksReady
  ? `- When the product list is empty or doesn't fit the topic, describe the product type and insert a placeholder like [LINK: search Amazon for "silicone spatula set"] for the creator to fill in.`
  : `- The creator has no affiliate links yet. Don't insert any links or [LINK: ...] placeholders; name product types in plain text. In the posting checklist, list the Amazon search terms to use once links are ready.`}
- You have no search-volume data. Choose keywords by likely buyer intent and label them as ideas to verify.

Write in ${config.language}, but keep the disclosure sentence exactly as given. Keep it practical, friendly, and skimmable.`;

const prompt = `Niche: ${config.niche}
Audience: ${config.audience}
Affiliate program: ${config.affiliateProgram}
Platforms: ${config.platforms.join(", ")}
Keyword ideas from the creator: ${(config.targetKeywords ?? []).join(", ") || "(none - suggest your own)"}

${seasonal}

Products the creator can link:
${products || "- (none yet - use placeholders)"}

Topics already covered (pick a clearly different angle today, and use them for internal-link suggestions):
${recentTitles}

Produce today's posting pack as Markdown with exactly these sections:

# <Today's topic title>

## SEO brief
- Primary keyword: one long-tail phrase with buying intent (for example "best ... for ...", "... vs ...", "how to ... without ...").
- Secondary keywords: 3-5 related phrases.
- How to verify: one line telling the creator to type the primary keyword into Google, YouTube and Pinterest search and check the autocomplete suggestions before posting.
- SEO title: at most 60 characters, primary keyword near the start. Write only the title, without a character count.
- Meta description: at most 155 characters, includes the primary keyword. Write only the description, without a character count.
- URL slug: short, lowercase, hyphens.
- Image alt text: 3 descriptive alt texts for the creator's own photos.
- Internal links: 1-3 earlier topics from the list above to link to, if any fit.

## Article
600-900 words. It is published to the blog as-is, under the title above:
- Start with the disclosure on its own line, before any link.
- Don't repeat the title. Use the primary keyword in the first 100 words.
- Use only ### subheadings (never # or ##), phrased as the questions buyers search for.
- Short paragraphs and bullet lists.
- A comparison table of features and use cases (no prices, no ratings).
- A "### Frequently asked questions" section with 3-4 real buyer questions, each as a #### heading followed by a short answer paragraph.
- A closing call to action.
- Write links as Markdown: [product name](link).

## Short video scripts
${config.videoScriptsPerDay} scripts for TikTok / YouTube Shorts / Reels, 30-45 seconds each. For each:
- Title (at most 70 characters, primary or secondary keyword included).
- A 3-second hook that says the keyword out loud, because TikTok and YouTube search read speech and on-screen text.
- Scene-by-scene lines with what to film (the creator's own footage) and the on-screen text.
- Description with the disclosure, a call to action sending viewers to the full list on the blog ("full list on my blog - link in bio"), and 3-5 relevant hashtags. Video descriptions never contain Amazon links: links in TikTok captions and YouTube Shorts descriptions aren't clickable.

## Captions
One caption per platform (${config.platforms.join(", ")}), with the keyword in the first line, 3-5 relevant hashtags, and the disclosure.

## Pinterest pin
Keyword-rich pin title (under 100 characters), description (under 500 characters, with the disclosure), and a suggested board name${boards.length ? ` - use one of these existing boards when one fits: ${boards.join("; ")}` : ""}.

## Posting checklist
3-5 short reminders specific to today's content (for example which placeholder links to fill in).`;

if (args.has("--dry-run")) {
  console.log("=== SYSTEM ===\n" + system + "\n\n=== PROMPT ===\n" + prompt);
  process.exit(0);
}

const client = new Anthropic();

let message;
try {
  const stream = client.beta.messages.stream({
    model: config.model,
    max_tokens: 32000,
    // Haiku 4.5 doesn't support adaptive thinking or effort.
    ...(config.model.startsWith("claude-haiku")
      ? {}
      : { thinking: { type: "adaptive" }, output_config: { effort: config.effort ?? "medium" } }),
    // If the primary model declines, the API retries on a fallback model.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system,
    messages: [{ role: "user", content: prompt }],
  });
  message = await stream.finalMessage();
} catch (error) {
  if (error instanceof Anthropic.AuthenticationError) {
    console.error("Invalid or missing ANTHROPIC_API_KEY.");
  } else if (error instanceof Anthropic.RateLimitError) {
    console.error("Rate limited - try again later.");
  } else if (error instanceof Anthropic.APIError) {
    console.error(`API error ${error.status}: ${error.message}`);
  } else {
    console.error(error);
  }
  process.exit(1);
}

if (message.stop_reason === "refusal") {
  console.error("The model declined this request:", message.stop_details?.explanation ?? "");
  process.exit(1);
}

const text = message.content
  .filter((b) => b.type === "text")
  .map((b) => b.text)
  .join("\n")
  .trim();

if (message.stop_reason === "max_tokens" || !text) {
  console.error(`Incomplete output (stop_reason: ${message.stop_reason}).`);
  process.exit(1);
}

const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? `Posting pack ${today}`;

fs.mkdirSync(outputDir, { recursive: true });
const issues = checkCompliance(text, disclosure);
fs.writeFileSync(outPath, `<!-- generated ${today} -->\n${formatReport(issues)}\n\n${text}\n`);
// Save the article as a blog post. It stays a draft until you change its
// status to "published" (or site.json has autoPublish and the post is clean).
const site = JSON.parse(fs.readFileSync(path.join(here, "site.json"), "utf8"));
const post = postFromPack(text, today);
const postIssues = checkCompliance(post.body, disclosure);
const clean = !postIssues.some((i) => i.level === "FIX" || i.found.includes("placeholder"));
post.status = site.autoPublish && clean ? "published" : "draft";
const postPath = path.join(here, "posts", `${today}-${post.slug}.md`);
fs.mkdirSync(path.dirname(postPath), { recursive: true });
fs.writeFileSync(postPath, serializePost(post));
console.log(`Blog post: ${path.relative(here, postPath)} (${post.status})`);

history.push({ date: today, title });
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");

const { input_tokens, output_tokens } = message.usage;
console.log(`Wrote ${path.relative(here, outPath)}: "${title}"`);
console.log(`Compliance: ${issues.filter((i) => i.level === "FIX").length} to fix, ${issues.filter((i) => i.level === "CHECK").length} to check`);
console.log(`Tokens: ${input_tokens} in / ${output_tokens} out`);
