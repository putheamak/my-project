// Scans a posting pack for things that commonly break the Amazon Associates
// Operating Agreement or FTC disclosure rules. It is a safety net, not legal
// advice: a clean report does not guarantee compliance.
//
//   node compliance.mjs output/2026-09-27.md   re-check a pack after editing it

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const START = "<!-- compliance:start -->";
const END = "<!-- compliance:end -->";
const SHORTENER = /^https?:\/\/(?:www\.)?(?:bit\.ly|tinyurl\.com|t\.co|ow\.ly|cutt\.ly|rebrand\.ly|is\.gd|shorturl\.at)\//i;

// FIX = very likely a policy violation. CHECK = a person should look at it.
const rules = [
  {
    level: "FIX",
    pattern: /(?:\$|USD\s?|US\$)\s?\d[\d,]*(?:\.\d{2})?/gi,
    exclude: /\b(?:under|below|less than|up to)\s*(?:\$|USD\s?|US\$)\s?\d/i,
    message: "Specific price. Amazon doesn't allow static prices; write \"check the current price on Amazon\".",
  },
  {
    level: "FIX",
    pattern: /\b\d(?:\.\d)?\s*(?:\/\s*5|out of (?:5|five)|-?stars?)\b|★/gi,
    message: "Star rating. Amazon doesn't allow displaying ratings.",
  },
  {
    level: "FIX",
    pattern: /\b\d[\d,.]*k?\+?\s*(?:customer\s+)?(?:reviews|ratings)\b/gi,
    message: "Review count. Amazon doesn't allow displaying review counts.",
  },
  {
    level: "FIX",
    pattern: /\b(?:best\s?seller|amazon'?s choice)\b/gi,
    message: "Amazon badge. These change constantly and can't be shown statically.",
  },
  {
    level: "FIX",
    pattern: new RegExp(SHORTENER.source.slice(1) + "\\S*", "gi"),
    message: "Non-Amazon link shortener. Amazon requires links that clearly go to Amazon; use amzn.to or the full link.",
  },
  {
    level: "CHECK",
    pattern: /\b(?:on sale|lowest price|cheapest price|\d+\s?% off|deal of the day|limited[- ]time|price drop)\b/gi,
    message: "Price or deal claim. It goes out of date quickly and Amazon doesn't allow static price info.",
  },
  {
    level: "CHECK",
    pattern: /\b(?:support (?:me|the channel|my channel) by (?:buying|using)|use my link|giveaway)\b/gi,
    message: "Possible incentive to click or buy. Amazon doesn't allow rewards for purchases.",
  },
  {
    level: "CHECK",
    pattern: /\b(?:cures?|heals?|treats?|detox|weight loss|burns? fat|clinically proven)\b/gi,
    message: "Possible health claim. Remove unless it's clearly not a medical claim.",
  },
  {
    level: "CHECK",
    pattern: /\b(?:endorsed by amazon|amazon recommends|official amazon)\b/gi,
    message: "Implies Amazon endorsement.",
  },
];

function sections(text) {
  const out = {};
  const parts = text.split(/^## /m);
  for (const part of parts.slice(1)) {
    const nl = part.indexOf("\n");
    out[part.slice(0, nl).trim().toLowerCase()] = part.slice(nl + 1);
  }
  return out;
}

export function checkCompliance(rawText, disclosure) {
  const text = stripReport(rawText);
  const issues = [];

  for (const rule of rules) {
    for (const match of text.matchAll(rule.pattern)) {
      const around = text.slice(Math.max(0, match.index - 12), match.index + match[0].length);
      if (rule.exclude?.test(around)) continue;
      issues.push({ level: rule.level, found: match[0].trim(), message: rule.message });
    }
  }

  for (const raw of text.match(/https?:\/\/[^\s)\]>"']+/gi) ?? []) {
    const url = raw.replace(/[.,;:!?]+$/, "");
    if (!/^https?:\/\/(?:[\w-]+\.)*(?:amazon\.[a-z.]+|amzn\.to)\//i.test(url) && !SHORTENER.test(url)) {
      issues.push({ level: "CHECK", found: url, message: "Non-Amazon link. Make sure it's yours and not disguising an affiliate link." });
    }
  }

  if (!text.includes(disclosure)) {
    issues.push({ level: "FIX", found: "(missing)", message: `The exact Amazon disclosure is missing: "${disclosure}"` });
  } else {
    const article = sections(text)["article"] ?? "";
    const firstLink = article.search(/https?:\/\/|\[LINK:/);
    const disclosureAt = article.indexOf(disclosure);
    if (firstLink !== -1 && (disclosureAt === -1 || disclosureAt > firstLink)) {
      issues.push({ level: "FIX", found: "Article", message: "The disclosure must appear before the first link in the article." });
    }
  }

  const placeholders = text.match(/\[LINK:[^\]]*\]/g) ?? [];
  if (placeholders.length) {
    issues.push({ level: "CHECK", found: `${placeholders.length} placeholder(s)`, message: "Replace every [LINK: ...] with your real Amazon link before posting." });
  }

  return issues;
}

export function formatReport(issues) {
  const lines = [START, "## Compliance check (delete this section before posting)", ""];
  if (!issues.length) {
    lines.push("No problems found. Still read the pack before you post it.");
  } else {
    lines.push("| Level | Found | What to do |", "|---|---|---|");
    for (const i of issues) {
      lines.push(`| ${i.level} | \`${i.found.replace(/\|/g, "\\|").replace(/`/g, "'")}\` | ${i.message} |`);
    }
  }
  lines.push("", END);
  return lines.join("\n");
}

function stripReport(text) {
  const s = text.indexOf(START);
  const e = text.indexOf(END);
  return s !== -1 && e > s ? text.slice(0, s) + text.slice(e + END.length) : text;
}

// CLI: re-check a pack after you've edited it, and refresh its report.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node compliance.mjs output/YYYY-MM-DD.md");
    process.exit(1);
  }
  const here = path.dirname(fileURLToPath(import.meta.url));
  const { disclosure } = JSON.parse(fs.readFileSync(path.join(here, "config.json"), "utf8"));
  const original = fs.readFileSync(file, "utf8");
  const issues = checkCompliance(original, disclosure);
  const report = formatReport(issues);
  const s = original.indexOf(START);
  const e = original.indexOf(END);
  const updated = s !== -1 && e > s
    ? original.slice(0, s) + report + original.slice(e + END.length)
    : report + "\n\n" + original;
  fs.writeFileSync(file, updated);
  const fix = issues.filter((i) => i.level === "FIX").length;
  console.log(`${fix} to fix, ${issues.length - fix} to check. Report updated in ${file}`);
  process.exit(fix ? 1 : 0);
}
