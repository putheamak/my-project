# Built with AI, No Coding (book project)

A planned Kindle ebook: real business tools a non-programmer built with AI (Telegram booking app,
auto-blog, video ads, ebook machine). Target (owner, 3 Nov 2026): publish by mid-November 2026 at the latest (earlier aim was mid-December); add fuller results in a later edition.

## Files
| File | What it is |
|---|---|
| `front-matter-draft.md` | Title page, copyright and disclaimers, "How This Book Was Written" (AI-use statement), dedication, contents. v2 polished 26 Oct 2026. Author photo in images/author-photo.jpg.. |
| `introduction-draft.md` | Introduction (goes before Part One): who the book is for, what's inside, how to read it, the honesty promise and AI-use statement. v2 polished 26 Oct 2026. |
| `part-1-draft.md` | Part One (chapters 1–4) as book narrative. v4 27 Oct 2026: Ch 2 forecast simplified with sourced facts (IMF, WEF, Stanford, AI-researcher survey); Ch 3 rewritten with six sourced gaps, garment-sector risk, "sooner or later" consequences; notes 6–22. v4.1 28 Oct: Ch 2–3 polished. Open points are in the checklist comment at the top. |
| `part-2-draft.md` | Part Two drafts. Chapter 5 (toolkit and costs, polished) and Chapter 6 (how to talk to AI), Chapter 7 (first 30-minute win), Chapter 8 (Project 1: Telegram booking app), Chapter 9 (Project 2: the blog), Chapter 10 (Project 3: video ads), Chapter 11 (Project 4: the ebook machine). v16 (25 Oct): chapters 6–11 story-led and polished, owner's colleague, first-win and data-privacy stories added, how-to moved into "Builder's Notes" boxes. Open points in the checklist comment at the top. |
| `part-3-draft.md` | Part Three (chapters 12–13): lessons learned, "Your turn" 7-day plan, closing, About the Author (written), glossary, A Request to the Reader. v4 polished 26 Oct 2026 (AI mistakes, insecurity in the age of AI, free courses). |
| `launch-kit-draft.md` | Title, Amazon description, 7 keywords, categories, price, cover brief, tax and payment, AI disclosure. v3 1 Nov 2026 (third-review advice: Part One bullet, "Where things stand" line, $2.99 for 2–3 weeks then $4.99, new keywords, 30% US withholding). |
| `cover-canva-steps.md` | Step-by-step Canva instructions for the cover (1600 × 2560, colours, fonts, icons, download). |
| `cover/cover-kdp-1600x2560.jpg` | **Upload this cover to KDP.** The final cover enlarged to 1600 × 2560 (4 Nov 2026), RGB JPG; thumbnail test passed. Enlarging adds size, not detail. |
| `kdp-upload-guide.md` | Step-by-step guide for upload day: what to type or choose on each KDP page. |
| `cover/cover-final.jpg` | **Final cover** (owner's enhanced version, approved 27 Oct 2026). Current file is 1244 × 2000; replace with a 1600 × 2560 export before upload. If made with an AI image tool, answer "yes" to AI-generated images in KDP and check the tool allows commercial use. |
| `cover/cover-draft.jpg` | Earlier draft cover (kept for reference), 1600 × 2560, from `cover/cover-draft.html`. |
| `editorial-review-2026-11-01.md` | Third independent AI review of the final version: ready after small fixes, 7.5/10 (8.5 after fixes); 7 must-fix items with exact replacements, fact-check (no invented facts), EPUB links all OK, launch-kit advice. |
| `editorial-review-2026-10-28.md` | Second independent AI editorial review (after the Ch 2–3 rewrite): 6.5/10 (about 8 with top fixes), fact-check table for Ch 2–3, top 10 issues, 30 language fixes, launch-kit advice. |
| `editorial-review-2026-10-27.md` | Independent AI editorial review (fresh reviewer, no prior context): 6.5/10, top 10 issues, chapter notes, 40 language fixes, revised Amazon description. |
| `assessment-2026-10-26.md` | Draft assessment: scores, top fixes, tools to assess the book. Owner review pending. |
| `build-ebook.sh` | `bash build-ebook.sh` makes the Kindle-ready EPUB in `build/`: removes owner checklists and the typed title/Contents, adds a linked Contents, starts each chapter on a new page, and checks every link (must say 0 broken). Open the result in Kindle Previewer before uploading. |
| `check-before-export.sh` | Run `bash check-before-export.sh` before exporting for KDP: lists any ⭐ placeholders, `<!-- -->` owner checklists, unlinked note numbers and [Update…]/[confirm] notes. Must say READY. |
| `next-book-ideas.md` | Research for the next ebook (4 Nov 2026): world concerns, ranked shortlist, demand-check steps. |
| `weekly-tracker.xlsx` | Every Monday: last week's numbers per project + story notes. Open in Excel or Google Sheets. |

## How we write it
1. The owner sends short notes or brainstorm points per section (simple English or Khmer is fine).
2. Claude turns them into chapter text, using only what the owner gave plus facts from this repo
   (READMEs, notes files, git history). Nothing invented: no results, quotes or income that didn't happen.
3. The owner reads every chapter and corrects it before publishing.

## Rules
- Only real numbers from the tracker. Empty = unknown, never guessed.
- No income claims. No customer names, phone numbers, tokens or passwords in the book or screenshots.
- Disclose AI-generated content on KDP.

## Final checks before upload (moved from the chapter checklists, 1 Nov 2026)
The owner checklists were removed from the chapter files (they are in git history). Still open:
- [ ] Ch 3: is the National AI Strategy 2025–2030 now adopted? If yes, update "What our own draft strategy admits" and its note.
- [ ] Ch 2–3: confirm the Stanford AI Index 2026 figures ($582bn, +130%; US $286bn vs China $12.4bn) in the report itself.
- [ ] Ch 3: cite the original Oxford data-centre study instead of TechRepublic if possible.
- [ ] Ch 3: refresh the Microsoft AI-use figures just before upload.
- [ ] Ch 5: replace "about $10 a month" for the Claude API with the real bill.
- [ ] Ch 9: robot and drone examples still current; Ch 12: free course list still current.
- [ ] Ch 1: decide on the employer passage ("ethics and professionalism", "pushed out") flagged by the second review as a legal risk.
- [x] Cover: 1600 × 2560 made from the final cover (4 Nov). KDP: check payment from Cambodia (Account → Getting Paid).
- [ ] Run `bash check-before-export.sh` (must say READY) and `bash build-ebook.sh`, then open the EPUB in Kindle Previewer.

## Update before publishing (owner decided 25 Oct 2026: keep as is for now, update later)
- Ch 8: add the booking app's real results (bookings, sellers, challenges) in a later edition.
- Ch 9: update the blog numbers (posts, products, visits, clicks, sales). Mid-October figures: 19 posts, 75 products, 0 sales.
- Ch 10: add how many 30-day calendar videos were made and posted.
- Throughout: owner to confirm the real numbers (ad results, blog sales) are OK to publish.
- Ch 5: replace the Claude API estimate (~$10/month) with the real bill.
- Ch 9: check the robot and drone examples are still current.
- Cover: replace `cover/cover-final.jpg` with the full-size 1600 × 2560 export.

## Owner review
- 4 Nov 2026: owner will upload to KDP on **10 November 2026** (files: EPUB, cover-kdp-1600x2560.jpg, kdp-upload-guide, launch kit v3).
- 4 Nov 2026: KDP account setup finished: identity, payment by cheque for now (switch to Payoneer US receiving account in about 60 days), tax interview complete (W-8BEN, individual, no treaty → 30% on US royalties, no TIN: "could not/have not obtained"). Next: upload on 10–11 Nov with `kdp-upload-guide.md`.
- 4 Nov 2026: KDP account created; identity filled. **Cambodia is not in KDP's bank-country list.** Plan: finish the tax interview and publish anyway (royalties are held until a bank is added); get paid through a USD receiving account in the owner's own name (Payoneer once its review is cleared, or Wise if it accepts Cambodian residents); never use a bank country that is not the account's real country.
- 4 Nov 2026: owner finished the review ("no more comments"). Cover enlarged to 1600 × 2560 (`cover/cover-kdp-1600x2560.jpg`) and used in the EPUB; KDP upload guide written (`kdp-upload-guide.md`).
- 3 Nov 2026: owner: survival target = about 25 parcel orders a day (Ch 8 box); 32 app bookings linked to the ads, which promoted both services (Ch 10 text + box); launch moved to mid-November 2026 at the latest (Ch 11 box, $2.99 first weeks then $4.99).
- 1 Nov 2026: owner checked the ITU press release and saw 96%: restored in Ch 3 with soft wording ("according to the ITU, about 96%").
- 1 Nov 2026: third-review should-fix items applied: AI statement matches Ch 11 (AI drafted chapters from owner notes → answer "AI-generated: text" at KDP upload); one post a day in the first two weeks; calendar wording; video length "up to about a minute"; paid Reel wording; "three" AI reviews; Middle East paragraph dated October 2026; Grantham "In 2026"; "programme"; notes: Grantham source → GMO, unconfirmed TIME 15 Sept link removed and WSJ interview mentioned, Microsoft UAE/Singapore note fixed. ITU "96%": could not open itu.int from this session (blocked), so text now says "almost all of them"; owner can check the ITU press release and restore 96% if it is there.
- 1 Nov 2026: third-review must-fix M2–M7 applied (Ch 9 clicks "about 70 by mid-October", "first five weeks", Ch 4 cross-reference removed, Ch 12 videos line, note 3-4 → Chapter 2 note 5, blog name "Home Picks Under $30"). M1 (Ch 1 employer) NOT applied: owner chose to keep the original wording.
- 1 Nov 2026: third independent AI review of the final version done (`editorial-review-2026-11-01.md`). Owner to decide which fixes to apply.
- 1 Nov 2026: final data filled (Ch 8 32 bookings; Ch 9 Amazon October 0 orders/120 clicks; Ch 10 17 Reels; Ch 11–12 hours; Ch 12 "30 to 60 seconds" = video length, the AI guessed right). Owner checklists removed; check-before-export says READY.
- 1 Nov 2026: owner hours: almost 2 months after resigning, 4–8 h a day, on the four projects (Ch 11 box, Ch 12 "The real cost is time"). Time saved per week not measured yet (said so in the text). Ch 8 sellers line replaced with "online sellers only".
- 1 Nov 2026: Facebook page screenshot: 17 Reels posted by 31 Oct (views about 167–404, one 2.6K) and 8 image posts; Ch 10 box and text updated (calendar count "2 of 30" removed).
- 1 Nov 2026: Amazon Associates, October: 0 ordered, 0 shipped, $0, 120 clicks (spikes 2 Oct and 30 Oct), conversion 0% (Ch 9 box). Owner to confirm whether the 30 Oct spike was their own link tests.
- 1 Nov 2026: owner: 32 bookings through the Telegram mini app in October (Ch 8 box). Still waiting: sellers using the app, Amazon sales, videos posted, hours, "30 to 60 seconds".
- 1 Nov 2026: Ch 9 box and text updated to 31 Oct from the blog notes on main (27 posts, 117 products, 58 visits in 12 days, Google 52 impressions/0 clicks, Pinterest 3.42k views/1 click, 2 Amazon clicks). All boxes dated 31 Oct. Waiting for the owner: app bookings, sellers using the app, Khmer Parcel videos posted, hours (Ch 11 and 12), Amazon sales to 31 Oct, and the "30 to 60 seconds" meaning (Ch 12).
- 28 Oct 2026: the first EPUB failed in Kindle Previewer (E24010/E24001: Contents links not resolved — duplicate title heading and leftover checklists). Fixed with `build-ebook.sh`; new EPUB has 23 Contents entries, one file per chapter, 0 broken links. Owner to re-test in Kindle Previewer.
- 28 Oct 2026: same simple voice applied to Part One (Ch 1–4), Part Three (Ch 12–13) and the AI-use statement in the front matter. Facts and quotes unchanged.
- 28 Oct 2026: review fixes 6 and 8 + draft AI strategy (Word + EPUB sent; owner will review later):
  - Voice pass on the Introduction and Part Two: simpler, shorter sentences; formal words removed (whereas, precisely, genuinely, a matter of, merely…); about two thirds of bold one-line lessons turned into plain sentences; "The principle:" labels gone from Part Two; owner phrases kept (I was really surprised, very small demand, the light ahead…).
  - Ch 3: new section "What our own draft strategy admits" from the draft National AI Strategy 2025–2030 (MPTC, June 2025, via Open Development Cambodia). Owner to check whether the final version has been adopted.
  - Notes: one "Notes" section before the Glossary, grouped by chapter, numbering restarts per chapter, note numbers are links (tap to the note, ↩ to go back; checked in the EPUB: 75 links, 0 broken). "Notes" added to Contents.
  - Before export: run `check-before-export.sh`. Still open: 6 ⭐ numbers (bookings, sellers, latest visits, videos posted, hours ×2), the Ch 12 "[… / confirm]" line, and deleting the 5 owner checklists.
- 28 Oct 2026: review fix 7 applied: "Getting set up" section in Ch 5 (where Claude Code runs, repository, letting the AI install Node.js/ffmpeg/headless browser, secrets, build step, getting unstuck); beginner line in the 3 project Builder's Notes; Ch 4 softened ("see how each was built, with starter prompts"); glossary + Repository, Secret, Terminal. Owner to confirm: most projects were built in Claude Code in the browser.
- 28 Oct 2026: applied the owner's 23 fixes from the second review (facts in Ch 2–3, Ch 6 "Why it matters" labels removed, Ch 9–12 wording); added "Where things stand: 28 Oct 2026" boxes to Ch 8–11 (⭐ = numbers the owner must add: bookings, sellers, latest blog visits, videos posted, hours); each repeated story now told once (Ch 8–11) with cross-references in Ch 4, 6 and 12; Ch 4 project descriptions cut to 2–3 sentences. Ch 12: confirm what "30 to 60 seconds" meant.
- 28 Oct 2026: second independent AI review done (`editorial-review-2026-10-28.md`). Owner to decide which changes to apply.
- 27 Oct 2026: Ch 2–3 rewritten with sourced facts (Part One v4) and sent (Word). Owner will review later. Still to check: Stanford AI Index figures, Oxford data-centre study original, refresh Microsoft AI-use figures before publishing.
- 27 Oct 2026: independent AI editorial review done (`editorial-review-2026-10-27.md`). Owner to decide which changes to apply.
- 27 Oct 2026: review copy with the new cover sent (Word + EPUB). Owner will review later.
- 27 Oct 2026: owner asked about an outside editor / another AI to check the book. Options: independent fresh-context AI review (Claude can run it), another AI (e.g. ChatGPT, Gemini), human editor (Reedsy, Fiverr/Upwork, local English teacher), 3–5 beta readers.
- 26 Oct 2026: full review copy sent (all 13 chapters). Owner will review later; see `assessment-2026-10-26.md`.
- 26 Oct 2026: owner's voice pass: fewer formal words (precisely, genuinely, therefore), "The principle:" labels cut from 13 to 3, Part One "Why it matters" labels removed, owner's own phrases restored (peaceful than ever; I am a believer; comfort and convenience; the light ahead will grow brighter).

## Plan to publish by mid-November 2026 (updated 3 Nov 2026)
| Step | Dates (2026) | Task | Who |
|---|---|---|---|
| 1 | 3 – 7 Nov | Read the final Word copy and send corrections; set up KDP payment and tax interview (Account → Getting Paid) | Owner |
| 2 | 3 – 7 Nov | Export the cover at 1600 × 2560 and send it for checking; check whether the National AI Strategy is adopted | Owner |
| 3 | 8 – 9 Nov | Apply corrections, rebuild EPUB, final checks (`check-before-export.sh`, `build-ebook.sh`) | Claude |
| 4 | 9 – 10 Nov | Open the EPUB in Kindle Previewer; click each link in the Notes once | Owner |
| 5 | **10 Nov** (owner's date) | Upload to KDP with the launch kit (AI disclosure: text; KDP Select; $2.99) — Amazon review takes up to 72 hours | Owner, with Claude's step-by-step guide |
| 6 | about 14 Nov | Live on Amazon; share with your network; ask early readers for honest reviews; raise price to $4.99 after 2–3 weeks | Owner |
