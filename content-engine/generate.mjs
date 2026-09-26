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

const system = `You write daily affiliate-marketing content for a solo creator who reviews it and posts it by hand.

Honesty rules - these protect the creator's accounts and their audience's trust:
- Never invent prices, ratings, review counts, specs, or discounts. Say "check the current price" instead.
- Never write fake first-person experiences ("I tested this for 3 weeks"). Only describe personal use when it appears in the owner's notes.
- Never make health or medical claims.
- Only link products from the provided product list. When the list is empty or does not fit the topic, describe the product type and insert a placeholder like [LINK: search Amazon for "silicone spatula set"] for the creator to fill in.
- Include a short affiliate disclosure in the article and in every caption.

Write in ${config.language}. Keep it practical, friendly, and skimmable.`;

const prompt = `Niche: ${config.niche}
Audience: ${config.audience}
Affiliate program: ${config.affiliateProgram}
Platforms: ${config.platforms.join(", ")}

Products the creator can link:
${products || "- (none yet - use placeholders)"}

Topics already covered (pick a clearly different angle today):
${recentTitles}

Produce today's posting pack as Markdown with exactly these sections:

# <Today's topic title>

## Article
A 600-900 word blog/Facebook article with a hook, useful tips, the product mentions with links or placeholders, and a closing call to action. Include the affiliate disclosure.

## Short video scripts
${config.videoScriptsPerDay} scripts for TikTok / YouTube Shorts, 30-45 seconds each. For each: a 3-second hook, scene-by-scene lines with what to show on screen, and the on-screen text.

## Captions
One caption per platform (${config.platforms.join(", ")}), each with hashtags and the disclosure.

## Pinterest pin
Pin title (under 100 characters) and description.

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
fs.writeFileSync(outPath, `<!-- generated ${today} -->\n${text}\n`);
history.push({ date: today, title });
fs.writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");

const { input_tokens, output_tokens } = message.usage;
console.log(`Wrote ${path.relative(here, outPath)}: "${title}"`);
console.log(`Tokens: ${input_tokens} in / ${output_tokens} out`);
