<!--
OWNER CHECKLIST (delete before publishing) — Part Two draft v3, 20 Oct 2026
1. Claude API is written as "about $10 a month" (owner's estimate). Replace with the real figure from
   console.anthropic.com → Billing once you have one or two months of bills.
2. The chapter now says Khmer Parcel's Facebook ad spend is a business cost, separate from the $31 toolkit
   (your notes show paid ads at $5–10/day). Check you are happy to mention it.
3. Chapter 6 is built from the project notes and this chat. Check every example happened as written,
   especially: (a) AI suggesting promises you had not confirmed (same-day COD payout), (b) the ad results
   (2,546 views, 57 clicks, 0 bookings) — OK to publish these real numbers? (c) your quoted chat messages.
-->

# Part Two: Building

---

## Chapter 5: The Toolkit, and What It Really Costs

When I began building with AI, I expected the technology to be the hardest part. It wasn't. The hardest part was believing that tools this powerful could cost so little.

Many books and videos promise that AI will let you build a business "for free". That is not quite true, and I promised myself that this book would be honest. So in this chapter, I will show you every tool I use, explain in plain language what each one does, and tell you exactly what I pay for it.

### Four tools behind four projects

Everything in this book was built with just four core tools.

**Claude: my AI partner.** Claude is the AI assistant made by Anthropic, and it sits at the centre of everything I do. I subscribe to the **Claude Pro** plan for **$20 a month**. It gives me an assistant I work with every day for planning, writing and solving problems. It also includes **Claude Code**, the AI agent that actually builds things. Claude Code can read my project files, write code, run it, test it and correct its own mistakes, while I watch, guide and decide. If there is one tool in this book you cannot do without, it is this one.

**GitHub: the filing cabinet.** GitHub stores all my project files online and keeps a complete history of every change, so nothing is ever truly lost. It can also run small jobs automatically on a schedule. My blog engine runs there three times a week, and the blog itself is hosted there free of charge through a feature called GitHub Pages. For everything I do, GitHub costs me **nothing**.

**Cloudflare: the server I never have to rent.** Cloudflare runs my Telegram booking app. Traditionally, an app needs a server, a computer that stays switched on day and night, which you rent every month and must maintain. Cloudflare Workers runs small apps like mine on its own global network instead, and its free plan is more than enough for a small business. Cost: **nothing**.

**A domain name: my address on the internet.** A domain is the name people type to find you, such as *homepicksunder30.com*. It is the only part of my setup with an annual bill: **$12 a year**, or about $1 a month.

### The free supporting cast

Around these four tools, I rely on a handful of free services, none of which asked for my credit card. **Telegram** is where my customers book deliveries and where my team receives the orders. **GoatCounter** is a simple, privacy-friendly counter that tells me how many people visit the blog. **Pinterest, TikTok and Facebook** are where I share content and video ads. **Amazon Associates**, the affiliate program behind the blog, is free to join. And **Amazon KDP** (Kindle Direct Publishing), where this book is published, charges nothing upfront; Amazon simply keeps its share when a copy is sold.

### The cost that is easy to miss

There is one more cost, and it caught me by surprise.

My blog engine does not use the Claude Pro chat at all. It communicates with Claude automatically through the **Claude API**, a separate service designed for software, which is billed by usage rather than by month. You add credit to your account, and each request uses a small amount of it. According to my project notes, one complete post pack, with an article, social media captions, video scripts and a compliance check, costs roughly **$0.10 to $0.30**. Once testing, mistakes and re-runs are included, I budget **about $10 a month** for the API.

The lesson is worth remembering: **a subscription and an API are not the same thing.** Whenever you build something that runs on its own, find out how it pays for its AI.

### My real monthly bill

| Tool | What it does | Cost |
|---|---|---|
| Claude Pro (with Claude Code) | AI assistant and AI builder | $20 / month |
| Claude API | Powers the automated blog engine | about $10 / month (estimate) |
| GitHub | Stores projects, runs scheduled jobs, hosts the blog | Free |
| Cloudflare Workers | Runs the Telegram booking app | Free |
| Domain name | The blog's web address | $12 / year (about $1 / month) |
| Telegram, GoatCounter, social media, Amazon Associates, KDP | Customers, analytics, marketing, publishing | Free |
| **Total** | | **about $31 / month** |

For about $31 a month, roughly the price of a few cups of coffee each week, one person with no programming background can run a booking system, a content engine, a video ad studio and a publishing pipeline.

That figure covers the tools only. Running a real business has other costs. Khmer Parcel, for example, pays to promote some of its video ads on Facebook. But building and running the technology itself costs about $31 a month.

### What I don't pay for, yet

Knowing what you *don't* need at the start is just as valuable as knowing what you do.

I don't pay **developers or agencies**: the AI builds, while I direct and check its work. I don't rent **servers**: free plans comfortably handle the traffic of a small business. And I don't buy **design or video-editing software**: my video ads are built from simple web pages and assembled automatically.

### When the costs will grow

Free plans have limits, and that is fair. If my projects succeed, some costs will rise. A busier blog or more books will mean more API requests. Much higher traffic could eventually require paid plans on Cloudflare or GitHub, though that point lies far beyond the needs of a small business. And there will come a time to invest in growth, through design tools, advertising or email marketing.

My rule is simple: **pay for growth only after the free version has proved itself.**

### Everything you need to begin

If you would like to follow the projects in this book, here is all you need:

1. A computer with a web browser and an internet connection
2. A Claude Pro plan, at $20 a month, which you can cancel at any time
3. Free accounts on GitHub and Cloudflare
4. A domain name, but only once you have something worth showing the world

That is all. In the next chapter, we turn to the most important skill of all, one that costs nothing: **how to talk to AI so that it builds what you actually need.**

---

## Chapter 6: How to Talk to AI So It Builds What You Need

The first time I asked an AI to build something for me, I expected magic. What I got was closer to a brilliant new employee on their first day: fast, tireless and eager to help, but with no idea how my business worked, what I had already decided, or what I meant when I left something out.

Over the following weeks, I learned that the quality of what AI builds depends less on the AI and more on **how I explain the job**. This chapter collects the lessons I learned the hard way, every one of them taken from my real projects. None of them requires technical knowledge. They require clear thinking, which is a skill you already have.

### 1. Describe the problem, not the solution

When I started on the booking app, I did not know what a "Telegram mini app" or a "Cloudflare Worker" was. I didn't need to. I described the problem instead: online sellers send us bookings in long chat messages; details get lost; prices get confused; and someone in the office has to type everything out again.

From that description, the AI proposed a solution I would never have thought of myself: a button inside our Telegram bot that opens a short booking form, sends the finished booking straight to our office group, and remembers each shop's details for next time.

If I had asked for "a website with a form", I would have received exactly that, and it would have been the wrong tool. **You are the expert on the problem. Let the AI be the expert on the solution.** Then judge its proposal against your real-world knowledge.

### 2. Give the AI a memory

Here is something many beginners don't realise: each new conversation with an AI starts almost from zero. It does not remember yesterday's decisions, your prices or your phone numbers unless you tell it again.

My solution was to keep a **handover note** for every project, a simple text file that begins with the words *"Read this first in a new chat."* It holds the facts that must never change: the business name, the launch date, the correct phone numbers, the prices, the brand colours, what has been built and what was decided. At the start of each session, the AI reads the note, and within seconds it knows as much as I do.

I also keep one master instruction file for the whole workspace, which tells the AI which notes to read first, and in what order.

This one habit saved me more time than any other. If you take only one lesson from this chapter, take this one: **write things down for your AI, exactly as you would for a new employee.**

### 3. Set the rules before the work begins

AI wants to be helpful, and sometimes that means it tries *too* hard. When I asked for advertising ideas, the drafts were full of attractive selling points, such as same-day delivery or same-day cash-on-delivery payouts, that I had not yet decided to promise my customers. They sounded wonderful. They were also promises my business might not be able to keep.

So I wrote rules into my instruction file, and the AI follows them in every session:

- **Never invent prices, offers or promises.** Ask me first.
- **Use only these contact numbers**, written out exactly.
- **Customer-facing text is Khmer first**, with short English.
- **One audience per ad**: door-to-door customers and online sellers get separate videos.

The same applies to the blog. Amazon has strict rules for affiliates, so the blog engine checks every draft for things that are not allowed: prices, star ratings, "best" claims, missing disclosures. A rule written once protects you every day after that.

### 4. Work in small steps, and approve before it acts

An AI agent can change many files in seconds. That is powerful, but it is also a reason to slow it down.

For the blog, I set up a simple routine. I say *"review the October 14 draft"*, and the AI reads the draft, checks it against the rules and tells me what needs fixing. Then I search Amazon myself and send the products I chose, one per message, in a fixed format: date, product name, link. The AI waits. Only when I type **"go"** does it edit the post.

This gives me a checkpoint at every important moment. Nothing happens that I did not see first, and when something goes wrong, I know exactly which step caused it. **Small steps are not slow. Small steps are how you stay in control.**

### 5. Show it real data, not just your opinion

My first paid video ads for Khmer Parcel ran for two days at $5 a day. Facebook reported 2,546 views and 57 link clicks. Bookings: zero.

Instead of guessing what went wrong, I gave the AI the real numbers from the ads dashboard. It noticed that viewers were dropping off at the 17-second mark, exactly where the ad switched from one audience to another. Its recommendation was to cut a shorter version for just one audience, which became our rule of "one audience per ad".

I used the same approach for this book. I sent screenshots of Amazon search results, and the AI read the review counts, prices and publication dates. My first idea, a Phnom Penh travel guide, turned out to have very little demand. My second, a guide for expatriates, was still small. When I asked, *"Why not a book about AI, for readers all over the world?"*, the screenshots told a different story: strong demand, crowded competition, and a gap for real experience. That is the book you are reading.

**Your opinion is a starting point. Your data is the answer.** AI is very good at reading data, but only if you show it.

### 6. Tell it how you want to work

You can, and should, tell an AI how to communicate with you. Some of the instructions in my notes:

- *"I am a beginner. Explain each step simply, and tell me exactly what to click."*
- *"Give me Amazon search keywords as plain text only. No links. I will search and choose the products myself."*
- *"For Reddit, give me short idea points, not finished text. I will write the answer in my own words."* (Many online communities ban AI-written posts, and they are right to.)

English is not my first language, and the AI never once made me feel that was a problem. I often write in simple, imperfect English, sometimes mixed with Khmer, and it understands. **You don't need perfect words. You need clear intentions.**

### 7. Check everything it makes

AI makes mistakes, and some of them are invisible until a real person looks closely.

When we built the video ads, small symbols called emoji appeared as empty boxes in the finished videos, because the computer that rendered them had no emoji font. The AI could not see the problem; I could. The rule now reads: *no emoji in videos; draw simple icons instead.*

We also discovered that our printed poster showed a wrong digit in one of our phone numbers. A single wrong digit means lost customers. That poster is now cropped in every video so the mistake never appears again, and the correct numbers live in the handover note where nothing can change them.

Even the blog engine's own checker had a blind spot: it accepted "under $30" but flagged "under-$30" with a hyphen as an error. Small things like this are why I read every draft before it goes live.

My rule: **trust the AI to do the work, but never trust it to check its own work alone.**

### 8. Let it say no

The best AI partner is not the one that agrees with everything. It is the one that tells you the truth.

When I planned a small Pinterest advertising test for the blog, we discovered that Pinterest's advertising platform did not accept Cambodia as an advertiser country. One shortcut would have been to register under a different country. The AI advised against it, and it was right: a business built on false details is a business that can be shut down overnight. We dropped the ads and kept growing traffic honestly.

The same happened when I first saw the reels promising that "AI plus Kindle publishing equals an ATM". The AI's first answer was a reality check, not a sales pitch. That honesty is the reason I trust its other advice.

### Your prompt toolkit

Here are the patterns from this chapter, ready to adapt to your own projects:

| Situation | What to say |
|---|---|
| Starting a project | "Here is my problem: [describe it as a customer would]. What would you build, and why? Explain it simply." |
| Starting a new chat | "Read my handover note first. Then tell me what you understand before doing anything." |
| Setting rules | "Never invent prices, offers or promises. Ask me first." |
| Staying in control | "Show me your plan in small steps. Wait for my 'go' before changing anything." |
| Using data | "Here is a screenshot of my results. What do you notice, and what one change would you make?" |
| Learning as you go | "I'm a beginner. Explain each step and tell me exactly what to click." |
| Checking work | "Before we finish, list anything that could be wrong or that I should check myself." |
| Asking for honesty | "Is this a good idea? Tell me the risks, even if the answer is no." |

### The real skill

When people ask me what the most important skill is for working with AI, they expect a technical answer. It isn't one.

It is the ability to **explain what you want clearly, check what you get honestly, and stay in charge of the decisions**. Managers, teachers, shop owners and researchers already use those skills every day. With AI, they become the skills that let you build.

In the next chapter, you will put them to work on your first small project, and see the result in about thirty minutes.
