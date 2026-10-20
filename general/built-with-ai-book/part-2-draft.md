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

The first time I asked an AI to build something for me, I expected magic. What I received was closer to a gifted new employee on their first day: fast, tireless and eager to help, yet entirely unaware of how my business worked, what I had already decided, or what I meant whenever I left something unsaid.

Over the weeks that followed, I came to understand that the quality of what AI builds depends less on the AI itself than on **how clearly the job is explained**. This chapter gathers the lessons I learned along the way, each drawn from my own projects. None of them requires technical knowledge. What they require is clear thinking, a skill you already possess.

### Lesson 1: Describe the problem, not the solution

When I began work on the booking app, I had never heard of a "Telegram mini app" or a "Cloudflare Worker". Fortunately, I did not need to. Instead of naming a solution, I described the problem: online sellers were sending us bookings in long chat messages, details were being lost, prices were being confused, and someone in the office had to type everything out a second time.

From that description, the AI proposed something I would never have imagined on my own: a button inside our Telegram bot that opens a short booking form, delivers each completed booking directly to our office group, and remembers every shop's details for next time.

Had I simply asked for "a website with a form", I would have received exactly that, and it would have been the wrong tool for the job. **You are the expert on the problem; let the AI be the expert on the solution.** Then weigh its proposal against everything you know about your customers.

### Lesson 2: Give the AI a memory

Many beginners are surprised to learn that every new conversation with an AI begins almost from nothing. It does not recall yesterday's decisions, your prices or your phone numbers unless you provide them again.

My answer was to keep a **handover note** for every project: a plain text file that opens with the words *"Read this first in a new chat."* It contains the facts that must never change, including the business name, the launch date, the correct contact numbers, the prices and the brand colours, together with a record of what has been built and what has been decided. At the start of each session, the AI reads the note, and within seconds it knows as much about the project as I do. Above these sits a single master instruction file for the entire workspace, which tells the AI which notes to read, and in what order.

No habit has saved me more time. If you remember only one lesson from this chapter, let it be this: **write things down for your AI exactly as you would for a new member of staff.**

### Lesson 3: Set the rules before the work begins

AI is designed to be helpful, and occasionally it tries too hard. When I asked for advertising ideas, the early drafts were filled with appealing selling points, such as same-day delivery and same-day cash-on-delivery payouts, that I had not yet decided to offer. They sounded excellent. They were also promises my business might not have been able to keep.

So I wrote a set of rules into my instruction file, and the AI now applies them in every session. It must never invent prices, offers or promises without asking me first. It must use only the official contact numbers, written exactly as recorded. All customer-facing text must be written in Khmer first, with short English beneath it. And each advertisement must speak to a single audience, so that door-to-door customers and online sellers are addressed in separate videos.

The blog follows the same principle. Amazon applies strict rules to its affiliates, so the blog engine checks every draft for anything prohibited, from prices and star ratings to unsupported "best" claims and missing disclosures. **A rule written once protects you every day after.**

### Lesson 4: Work in small steps, and approve before it acts

An AI agent can change dozens of files in a matter of seconds. That is a remarkable capability, and precisely the reason to slow it down.

For the blog, I established a simple routine. I write *"Review the October 14 draft"*, and the AI reads the draft, checks it against the rules and reports what needs attention. I then search Amazon myself and send the products I have chosen, one per message, in a fixed format: the date, the product name and the link. The AI waits. Only when I type **"go"** does it edit the post.

This gives me a checkpoint at every important moment. Nothing happens that I have not seen first, and when something goes wrong, I know exactly which step was responsible. **Small steps are not slow; they are how you remain in control.**

### Lesson 5: Show it real data, not just your opinion

Our first paid video ads for Khmer Parcel ran for two days at $5 a day. Facebook reported 2,546 views and 57 link clicks. The number of bookings was zero.

Rather than guess at the reason, I gave the AI the actual figures from the advertising dashboard. It noticed that viewers were leaving at the 17-second mark, at precisely the moment the ad switched from one audience to another. Its recommendation was to produce a shorter version aimed at a single audience, and that insight became our standing rule of one audience per ad.

I followed the same approach while planning this book. I shared screenshots of Amazon search results, and the AI analysed the review counts, prices and publication dates. My first idea, a Phnom Penh travel guide, revealed very little demand. My second, a guide for expatriates, was only slightly stronger. When I asked, *"Why not a book about AI, for readers all over the world?"*, the screenshots told a very different story: strong demand, heavy competition, and a clear gap for genuine first-hand experience. The result is the book you are now reading.

**Your opinion is the starting point; your data is the answer.** AI excels at reading data, but only when you show it.

### Lesson 6: Tell it how you want to work

You can, and should, tell an AI how you would like it to communicate with you. My own notes include instructions such as: *"I am a beginner. Explain each step simply and tell me exactly what to click."* For the blog: *"Give me Amazon search keywords as plain text only, with no links. I will search for and choose the products myself."* And for online forums: *"Give me short idea points rather than finished text. I will write the answer in my own words."* Many online communities prohibit AI-written posts, and they are right to do so.

English is not my first language, and the AI has never once made that an obstacle. I often write in simple, imperfect English, sometimes mixed with Khmer, and it understands me. **You do not need perfect words. You need clear intentions.**

### Lesson 7: Check everything it makes

AI makes mistakes, and some of them remain invisible until a person looks closely.

When we built the video ads, small symbols known as emoji appeared as empty boxes in the finished videos, because the computer rendering them had no emoji font installed. The AI could not see the problem; I could. The rule now reads: *no emoji in videos; draw simple icons instead.*

We also discovered that our printed poster carried a wrong digit in one of our phone numbers. A single incorrect digit means lost customers. The poster is now cropped in every video so that the error never appears again, and the correct numbers live in the handover note, where nothing can alter them.

Even the blog engine's own checker had a blind spot: it accepted "under $30" but flagged "under-$30", written with a hyphen, as an error. Details like these are the reason I read every draft before it goes live.

My principle is simple: **trust the AI to do the work, but never rely on it alone to check that work.**

### Lesson 8: Let it say no

The best AI partner is not one that agrees with everything you say. It is one that tells you the truth.

When I planned a modest Pinterest advertising test for the blog, we found that Pinterest's advertising platform did not accept Cambodia as an advertiser's country. One shortcut would have been to register under another country. The AI advised against it, and it was right: a business built on false details can be shut down overnight. We abandoned the ads and continued to grow our traffic honestly.

Something similar happened when I first came across the online videos promising that "AI plus Kindle publishing equals an ATM". The AI's first response was a reality check rather than a sales pitch. That honesty is precisely why I trust the rest of its advice.

### Your prompt toolkit

The patterns in this chapter can be adapted to almost any project:

| Situation | What to say |
|---|---|
| Starting a project | "Here is my problem: [describe it as your customer would]. What would you build, and why? Please explain it simply." |
| Starting a new chat | "Read my handover note first, then tell me what you understand before doing anything." |
| Setting rules | "Never invent prices, offers or promises. Ask me first." |
| Staying in control | "Show me your plan in small steps, and wait for my 'go' before changing anything." |
| Using data | "Here is a screenshot of my results. What do you notice, and what single change would you make?" |
| Learning as you go | "I am a beginner. Explain each step and tell me exactly what to click." |
| Checking the work | "Before we finish, list anything that could be wrong or that I should check myself." |
| Asking for honesty | "Is this a good idea? Tell me the risks, even if the answer is no." |

### The real skill

When people ask me which skill matters most when working with AI, they usually expect a technical answer. It is not a technical skill at all.

It is the ability to **explain what you want clearly, examine what you receive honestly, and remain in charge of the decisions**. Managers, teachers, shop owners and researchers practise these skills every day. With AI, they become the skills that allow you to build.

In the next chapter, you will put them to work on your first small project, and see the result in about thirty minutes.
