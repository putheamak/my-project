# Content engine

Every morning this generates one **posting pack** for your affiliate niche:

- a 600–900 word article (blog or Facebook post)
- 3 short video scripts (TikTok / YouTube Shorts)
- a caption for each platform, with hashtags
- a Pinterest pin
- a checklist of what to fill in before you post

The pack is saved to `output/YYYY-MM-DD.md`. **You read it, fix anything that's off, add your links, and post it yourself.** Nothing is posted automatically.

## One-time setup

1. **Get a Claude API key** at https://console.anthropic.com and add some credit. One pack costs roughly $0.10–0.30 with the default model.
2. **Add the key to GitHub.** In the repo, go to Settings → Secrets and variables → Actions → New repository secret. Name it `ANTHROPIC_API_KEY`.
3. **Edit `config.json`:**
   - `niche` and `audience`: what you post about and who it's for
   - `language`: for example `"English"` or `"Khmer"`
   - `products`: your real affiliate links, with short notes from your own experience. Delete the `EXAMPLE` entry. When there are no products, the packs use `[LINK: ...]` placeholders for you to fill in.
   - `model`: `claude-opus-5` by default. `claude-sonnet-5` is cheaper, and `claude-haiku-4-5` is the cheapest.
4. **Merge this into your default branch.** GitHub only runs scheduled workflows from the default branch.

The workflow in `.github/workflows/daily-content.yml` runs every day at 06:17 Cambodia time (23:17 UTC). To run it immediately, open the Actions tab → "Daily content pack" → Run workflow.

## Run it on your own computer

```bash
cd content-engine
npm install
node generate.mjs --dry-run   # show the prompt; no API call, no cost
ANTHROPIC_API_KEY=sk-ant-... node generate.mjs
```

Add `--force` to regenerate today's pack.

## Built-in guardrails

The engine is instructed never to invent prices, ratings, or "I tested this" stories, never to make health claims, and always to include an affiliate disclosure. These rules keep your accounts from being banned. Still, read every pack before you post it.
