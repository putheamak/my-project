<!--
OWNER CHECKLIST (delete before publishing) — Part Two draft v18, 25 Oct 2026
1. Claude API is written as "about $10 a month" (owner's estimate). Replace with the real figure from
   console.anthropic.com → Billing once you have one or two months of bills.
2. The chapter now says Khmer Parcel's Facebook ad spend is a business cost, separate from the $31 toolkit
   (your notes show paid ads at $5–10/day). Check you are happy to mention it.
3. Chapter 6 is built from the project notes and this chat. Check every example happened as written,
   especially: (a) AI suggesting promises you had not confirmed (same-day COD payout), (b) the ad results
   (2,546 views, 57 clicks, 0 bookings) — OK to publish these real numbers? (c) your quoted chat messages.
4. Chapter 6: engineer = "he"; "expert" replaced. Chapter 8: voice-message double work and the habit-change
   challenge added; "first ninety days" section removed for now (add results in a later edition).
5. Chapter 9 (blog): numbers are as of mid-October 2026 (19 posts, 75 products, almost no outside visitors,
   0 sales). Update them from the tracker before publishing, and confirm you are happy to publish them.
   Also confirm: gift-card payments, Pinterest ads not available, Reddit rule, deadline 30 Mar 2027.
6. Quotes now have notes: Kettering (attribution unconfirmed), Buffett 1991, Jobs WWDC 16 May 1997, Bezos 1997 letter, Google E-E-A-T 2022.
7. Chapter 9 additions (24 Oct): "Why I finally tried" (Western audience, encouraging Cambodians, top marketplaces,
   robots and drones) and "Is it written for humans?" (1–10 scoring + traffic check). Check the robot/drone
   examples are current before publishing.
8. Chapter 10 (video ads): uses the real ad results from your notes (2,546 views, 605 3-second views, 4 s average,
   57 clicks, 0 bookings, 4 rider applicants, mostly men 25–44). Confirm OK to publish. Add (⭐) how many
   calendar videos are made so far. Ogilvy quote added (note 6).
9. Chapter 11 (ebook machine): written from this chat (the reels, the three ideas, the Amazon screenshots,
   how the book is written). Check it matches your memory. ⭐ Add launch details after publication.
   Zinsser quote added (note 7). MLK 1968 quote and the owner's motivation paragraphs added (note 8).
-->

# Part Two: Building

> **How to read Part Two.** Each chapter tells the story behind a project: the problem, the decisions, and the reasons behind them. Practical step-by-step instructions are kept in boxes marked **Builder's Notes** at the end of each chapter. If you simply want the ideas, skip the boxes. If you want to build, they are there for you.

---

## Chapter 5: The Toolkit, and What It Really Costs

When I started building with AI, I thought the technology would be the hardest part. It wasn't. The hardest part was believing that tools this powerful could cost so little.

Many books and videos say AI lets you build a business "for free". That is not really true, and I promised myself this book would be honest. So in this chapter, I will show you every tool I use, explain in plain language what each one does, and tell you exactly what I pay for it.

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

For about $31 a month, the price of a few coffees a week, one person who is not a programmer can run a booking system, a blog engine, a video ad studio and a book project.

That figure covers the tools only. Running a real business has other costs. Khmer Parcel, for example, pays to promote some of its video ads on Facebook. But building and running the technology itself costs about $31 a month.

### What I don't pay for, yet

Knowing what you *don't* need at the start is just as valuable as knowing what you do.

I don't pay **developers or agencies**: the AI builds, while I direct and check its work. I don't rent **servers**: free plans comfortably handle the traffic of a small business. And I don't buy **design or video-editing software**: my video ads are built from simple web pages and assembled automatically.

### When the costs will grow

Free plans have limits, and that is fair. If my projects succeed, some costs will rise. A busier blog or more books will mean more API requests. Much higher traffic could eventually require paid plans on Cloudflare or GitHub, though that point lies far beyond the needs of a small business. And there will come a time to invest in growth, through design tools, advertising or email marketing.

My rule is simple: **pay for growth only after the free version has proved itself.**

### Getting set up

The projects in Part Two were built with **Claude Code**, not the ordinary Claude chat. If you have never used it, these few pages will save you a lot of confusion. The menus and names may have changed slightly by the time you read this; the ideas will not.

**Where Claude Code runs.** There are three common ways to open it:

- **In a web browser** (claude.ai/code). This is how I built most of my projects. Nothing needs to be installed on your computer: Claude Code works on a computer in the cloud, connected to your project files on GitHub.
- **In the Claude desktop app**, for Windows or Mac.
- **In a terminal**, the black text window programmers use. This gives the most control, but it is not where a beginner needs to start.

If you are new, start in the browser. Sign in with your Claude Pro account and connect your GitHub account when it asks.

**What a repository is.** A **repository** (or "repo") is simply a project folder stored on GitHub, together with the full history of every change. Each of my projects lives in one. You can create an empty repository on GitHub in a minute, then tell Claude Code to work in it. You do not need to understand the files inside; you need to know that everything is saved, and that any change can be undone.

**Let the AI install what it needs.** My projects needed tools I had never heard of: **Node.js** to run JavaScript programs, **ffmpeg** to join video frames together, and a **headless browser**, a web browser with no screen, to record my video ads. I did not install any of them myself. I asked Claude Code, *"Install whatever this project needs, and explain each step in one sentence."* In the browser version, it installs them on its own cloud computer. On your own computer, it will ask your permission before each command. Read the question, and say yes only when you understand what it is for.

**Keep secrets out of the files.** Some projects need passwords, such as a Telegram **bot token** or a **Claude API key**. These must never be typed into a chat or saved in your project files. GitHub and Cloudflare each have a special place for them, called **secrets**, where your project can use them without anyone being able to read them. When a project needs one, ask Claude Code, *"Where exactly do I paste this secret, and what should I call it?"* and follow its steps yourself.

**Build before you upload.** Some projects are written as several files and then **built**, or combined, into the final version with one command. My booking app, for example, is put together by a small build script before it goes online. If a Builder's Note says "upload the file", first ask Claude Code, *"Is there a build step before I upload?"*

**When you get stuck,** copy the exact error message, paste it into Claude Code and ask, *"What does this mean, and what should I do next? I am a beginner."* That one sentence solved most of my problems.

### Everything you need to begin

If you would like to follow the projects in this book, here is all you need:

1. A computer with a web browser and an internet connection
2. A Claude Pro plan, at $20 a month, which you can cancel at any time
3. Free accounts on GitHub and Cloudflare
4. A domain name, but only once you have something worth showing the world

That is all. The next chapter is about the most important skill of all, and it costs nothing: how to talk to AI so it builds what you really need.

---

## Chapter 6: How to Talk to AI So It Builds What You Need

### Two halves of one solution

Long before I built anything with AI on my own, I worked with a young colleague on a problem. It taught me more than I understood at the time.

He was a newly graduated engineer, trained in data and artificial intelligence at one of the leading private universities in Phnom Penh. He wrote code with confidence, particularly in Python and JavaScript, and he worked comfortably alongside AI tools. When the AI made a mistake, he could usually trace the faulty line and correct it himself, saving the hours a beginner would have spent going round in circles. On paper, he was exactly the kind of person every company wants in the age of AI.

Yet when he was asked to build an automated call plan for the sales team, a system to decide which customers each salesperson should call and when, he struggled. The difficulty was not the code; it was the work itself. He had never been a salesperson. He did not know how plans were made in practice, which customers mattered most, or why a schedule that looked perfect on a screen would collapse on a real Monday morning.

In many ways, I was his opposite. I had spent years close to the field and understood the operation in detail, from the way data was collected to the way decisions were actually made. But I could not write the code myself, and at that time my experience with AI was still limited.

Neither of us could have solved the problem alone. Together, we could. I explained what really happened on the ground: where plans broke down, what salespeople needed, which exceptions mattered. He turned what I explained into instructions that he and the AI could use. Over several weeks, as we exchanged knowledge, frustrations and lessons, the system began to work.

Only later, when I started building with AI on my own, did I see what we had been doing. Large AI models are trained on vast quantities of human experience, gathered and processed in data centres around the world. My colleague and I had been doing the same thing on a human scale: translating one person's practical experience into a form that a machine could use.

That is the central lesson of this chapter, and perhaps of this entire book:

When you know a problem from real experience, and can explain it in a way the AI understands, the solution is usually close.

Today, I no longer need an engineer at my side for projects like those in this book. I can be the one who understands the problem, and let the AI take the engineer's role. First, however, I had to learn how to explain. The lessons that follow show how I learned, through mistakes and small discoveries in my own projects.

### Lesson 1: Describe the problem, not the solution

The American inventor Charles Kettering is often credited with the observation that "a problem well stated is a problem half solved."[]{#ref-6-1}^[1](#note-6-1)^ My very first project proved how true it is.

When I began work on a booking system for Khmer Parcel, I had never heard of a "Telegram mini app", and I did not need to. Rather than naming a solution, I described the problem exactly as I experienced it: online sellers were sending bookings in long chat messages, details were going missing, prices were being confused, and someone in the office had to type everything out a second time.

From that description alone, the AI proposed a solution I would never have imagined: a button inside our Telegram bot that opens a short booking form and delivers every booking to our office in the same clear format. Had I simply asked for "a website with a form", I would have received exactly that, and it would have been the wrong tool.

You understand your customers; the AI understands the technology. When you prescribe the solution yourself, you confine the AI to what you already know. When you describe the problem, you invite it to contribute everything it knows.

### Lesson 2: Give the AI a memory

In my first weeks, I found myself repeating the same information again and again. Each new conversation with the AI began almost from nothing; it did not remember our prices, our phone numbers or the decisions we had made the day before. It felt like training a new employee every morning.

So I did what any good manager does when someone new joins the team: I wrote a **handover note**. Every project now has a simple text file that opens with the words *"Read this first in a new chat."* It records the facts that must never change, including the launch date, the official contact numbers, the prices and the brand colours, together with a record of what has been built and what has been decided. At the start of each session, the AI reads it, and within seconds it knows as much about the project as I do.

This is exactly what my colleague and I did for each other, only now it is written down. The AI can work only with the experience you give it. A handover note is your experience, stored where the AI can always find it.

### Lesson 3: Set the rules before the work begins

AI wants to be helpful, and sometimes it tries too hard. Its first advertising ideas for Khmer Parcel promised things I had never decided to offer, as Chapter 10 describes.

That moment changed the way I work. I wrote a short set of rules that the AI now reads in every session: never invent prices, offers or promises without asking me first; use only the official phone numbers, exactly as recorded; write every customer message in Khmer first, with short English beneath; and address only one type of customer in each advertisement.

A single broken promise can cost a small business its reputation within a week. Rules written once protect you every day after that, even on the days when you are too busy to check every word.

### Lesson 4: Work in small steps, and approve before it acts

An AI agent can change dozens of files in a few seconds. At first, I loved it. Then it scared me, because whenever something went wrong, I could not tell which change had caused it.

So I slowed the AI down. Now it reports first, waits while I decide, and changes nothing until I approve. Chapter 9 shows this rhythm on the blog.

In my research career, every survey passed through checkpoints before its findings reached management, because an error caught early costs almost nothing, while an error caught late can cost everything. The same holds true with AI. Small steps are not slow; they are how you stay in control.

### Lesson 5: Show it real data, not just your opinion

When our first paid video ads brought thousands of views but no bookings, my first instinct was to guess at the cause. Instead, I showed the AI the numbers, and together we found exactly where viewers left, as Chapter 10 explains. The same habit saved me from writing the wrong book (Chapter 11).

This was the hardest lesson of my former job, and it applies just as strongly to AI. Leaders who trust their opinions over their data miss the turning points. AI is very good at reading data, but only if you show it, and only if you listen to what it finds.

### Lesson 6: Tell it how you want to work

English is not my first language. In the beginning, I was worried the AI would not understand my simple English, often mixed with Khmer. It always did. I was really surprised.

What made the greatest difference was telling the AI how *I* wanted to work: *"I am a beginner. Explain each step simply, and tell me exactly what to click."* *"Give me search ideas as plain text; I will choose the products myself."* *"Give me short points rather than finished text; I will write it in my own words."*

A good colleague adapts to the way you work, and so does a good AI, provided you tell it how. You do not need perfect words. You need clear intentions.

### Lesson 7: Check everything it makes

The old saying "trust, but verify" is more true with AI than ever.

Some of the mistakes in our video ads were invisible to the AI but obvious to anyone who watched the finished video, from broken symbols to a wrong digit in a phone number. Chapter 10 tells the story. I caught them only because I watched every video myself.

AI works quickly, but it does not care about your business the way you do. The final check must always be yours.

### Lesson 8: Let it say no

The most valuable colleagues are not those who agree with everything. They are the ones who tell you the truth, even when you would rather not hear it.

When a shortcut on Pinterest would have meant giving false details about my country, the AI advised against it (Chapter 9). And when I first saw videos promising that AI and Kindle publishing work "like an ATM", its first answer was a reality check, not a sales pitch (Chapter 11).

An AI that only flatters you is dangerous. Ask it about the risks, and value it most when it says no.

### The real skill

When people ask me which skill matters most for working with AI, they usually expect a technical answer. My experience with that young engineer taught me otherwise.

He brought the technical skill. I brought the understanding. What made our project work was the conversation between us. With today's AI, you can have that conversation yourself: explain your real problem clearly, check what you get honestly, and keep the decisions in your hands. Managers, teachers, shop owners and researchers practise these skills every day. With AI, they become the skills that allow you to build.

> **Builder's Notes: Your prompt toolkit**
>
> *For readers who want to start building. Feel free to skip this box.*
>
> | Situation | What to say |
> |---|---|
> | Starting a project | "Here is my problem: [describe it as your customer would]. What would you build, and why? Please explain it simply." |
> | Starting a new chat | "Read my handover note first, then tell me what you understand before doing anything." |
> | Setting rules | "Never invent prices, offers or promises. Ask me first." |
> | Staying in control | "Show me your plan in small steps, and wait for my 'go' before changing anything." |
> | Using data | "Here is a screenshot of my results. What do you notice, and what single change would you make?" |
> | Learning as you go | "I am a beginner. Explain each step and tell me exactly what to click." |
> | Checking the work | "Before we finish, list anything that could be wrong, or that I should check myself." |
> | Asking for honesty | "Is this a good idea? Tell me the risks, even if the answer is no." |

---

## Chapter 7: Your First Small Win

### A quiet beginning

My first real success with AI was not a business, an app or a website. It was a short piece of Python code running on my own computer.

At my former job, I regularly analysed customer satisfaction surveys in SPSS, calculating averages, standard deviations and the **Net Promoter Score**, a widely used measure of how likely customers are to recommend a brand. It was careful, repetitive work, and I wanted to know whether it could be automated.

So I asked an AI to write a Python program that would carry out the same analysis. I ran it offline, from the Command Prompt on my own computer, and compared its results with those I had produced by hand in SPSS. When the two sets of figures matched, something shifted in me. Work I had always done step by step could now be completed in seconds, and I had built the tool that did it.

Nobody else was impressed. Nobody in the company even noticed. But every bigger project I built after that grew from that small moment.

I believe most people should start with AI this way: not with a big plan, but with a small, useful win that you can finish in an afternoon, check with your own eyes, and trust because you tested it yourself.

### The line I would not cross

One detail of that first success matters more than the code itself: **I never gave the AI our real data.**

That data belonged to the company and to the customers who had trusted us with their answers, in a highly competitive market. I also understood that an AI shown real data can recognise the patterns within it, and those patterns describe a business. So I took a simple precaution. I created a **test dataset** of my own, with invented responses in exactly the same format as the real survey. The AI wrote the program using only that test data. I then ran the finished program on the real data offline, on my own computer, where it never left the company.

I share this because you will face the same question sooner than you think. Some time later, I was invited to speak at an event at the Cambodiana Hotel in Phnom Penh about automating monitoring and evaluation systems for civil society organisations. After my presentation, a man who introduced himself as a monitoring and evaluation specialist with many years of experience asked me: *Are there AI tools that can clean the data, analyse it and produce a preliminary report for a research project?*

The honest answer is yes, a great many. But a more important question lies behind it, one that each of us must answer for ourselves: **how much of our real data are we willing to expose for the sake of convenience?** Survey responses, health information, family circumstances and business figures are all entrusted to us. Uploading them to a tool just to save a few hours is not a technical decision. It is an ethical one.

This matters particularly in countries like mine. In Cambodia, digital literacy is still developing, and many of us use the internet every day without fully understanding the risks it poses to our security and safety. At the same time, AI is fast becoming as ordinary as electricity, the internet and the smartphone. We cannot avoid it, nor should we try. But we can learn to use it with discipline.

This discipline is not natural. People like comfort and convenience, and when the rules are not clear, convenience usually wins. That is why I set the rules before the work begins.

The investor Warren Buffett said it well. In 1991, after a scandal at the investment bank Salomon Brothers, he took charge of the firm and told its staff: "Lose money for the firm and I will be understanding; lose a shred of reputation for the firm and I will be ruthless."[]{#ref-7-1}^[1](#note-7-1)^

Buffett understood that money can be earned back, but trust, once lost, may never return. The same is true of data. A slow week of manual work costs you a little time. Leaking the private answers of people who trusted you can cost your organisation its reputation, and the people themselves a great deal more.

So my rule is this: **work with AI on almost everything, but never hand it what is not yours to give.** Use test data to build the tool, and keep real data under your own control. We can work with AI, but we should not ask it to do everything just for our own comfort and convenience. Once you know what to do yourself, what to give to the AI, and where to stop, you can work with it fully, safely and honestly.

### The question every customer asks

Now it is your turn to build. If you run a small business, consider the question your customers ask most often. For almost every business I know, it is the same: **"How much will it cost?"**

At Khmer Parcel, we answer that question many times a day. A tailor, a tutor, a caterer or a printing shop answers it just as often. Each reply takes a few minutes: asking for details, doing the calculation, writing the response. And each reply is an opportunity for a small mistake.

A **price calculator**, a simple web page on which customers enter a few details and immediately see the price, solves that problem. It is small enough to build in about thirty minutes, yet useful enough to share with real customers. That is why I recommend it as a first project: it is quick, it is really useful, and it teaches the whole process of building with AI.

### The most important five minutes

The most important step happens before you open the AI at all: **write down, in plain words, exactly how you calculate your prices.** For example: *"A delivery costs $1, plus $0.25 for every kilometre after the first three. Large parcels cost an extra $0.50."*

This step matters for every reason discussed in Chapter 6. The AI does not know your business. If you do not supply your pricing rules, it will either have to ask you or, worse, invent them. Your experience is the raw material. The AI only gives it shape.

### Describe, build, test, improve

Building the calculator involves four steps, and they are the same four steps behind every project in this book.

**Describe.** Tell the AI what your customers need and how your pricing works, just as you would brief a new assistant.

**Build.** The AI writes the page, and often shows a live preview immediately, so you can try it at once.

**Test.** Use the page as a customer would, and compare every price with your own calculation on paper. If even one answer is wrong, say so.

**Improve.** Request one change at a time: a larger total for phone screens, prices in two currencies, a button that opens your Telegram. After each change, test again.

Your first version will almost never be perfect, and that is fine. Fixing it is how you learn to direct an AI. When something does not work, you do not need to understand the code. Just describe what you see, like you would to a colleague, and ask the AI to explain and fix it.

### What you are really learning

The calculator is not the real win. The real win is that you will have gone through the whole cycle once: describe, build, test, improve.

Every project in the rest of this book, the booking app, the blog, the video advertisements and the ebook machine, follows that same cycle, repeated with greater patience. If you can build a price calculator, you have already mastered the most important part.

> **Builder's Notes: Build your price calculator in thirty minutes**
>
> *For readers who want to try it now. Feel free to skip this box.*
>
> **You need:** a computer with a web browser, a Claude account, and your pricing written in plain words.
>
> **1. Describe (5 minutes).** Open a new chat with Claude and adapt this message:
>
> > I run a small [type of business], and customers often ask how much something will cost. I would like a simple one-page price calculator that they can open on their phone. This is how I calculate prices: [your pricing rules]. The page should ask for [the details you need] and show the total clearly. Please write everything in [your language], with short English underneath. I am a beginner, so please make it a single HTML file I can open in my browser, and explain each step simply.
>
> **2. Build (5 minutes).** If Claude shows a live preview, try it straight away. If not, copy the code into a plain text file, save it as `calculator.html`, and double-click it to open it in your browser.
>
> **3. Test and improve (15 minutes).** Check several prices against your own calculation, then ask for one change at a time, for example:
> - "The total is hard to see on a phone. Please make it larger and place it at the top."
> - "Show the price in both my currency and US dollars."
> - "Add a button that opens my Telegram, so customers can book straight away."
> - "When I enter zero kilometres, the price looks wrong. Please check the calculation and explain it to me."
>
> **4. Decide what comes next (5 minutes).** Keep it for yourself, or ask Claude, "How can I put this page online for free?", and follow its steps.

---

## Chapter 8: Project One — A Telegram Booking App for My Delivery Business

### Where our customers already live

Khmer Parcel opened in Phnom Penh on the 1st of October, 2026. From the very beginning, I knew that our most important customers would be **online sellers**: people selling clothing, cosmetics and food through Facebook, TikTok and Telegram. A single regular seller may send five, ten or even twenty parcels a day. For a young delivery business, ten loyal sellers can be the difference between surviving and growing.

Online sellers spend their entire day on their phones, answering customers in chat. So when they need a delivery, their natural instinct is to send a quick message to the delivery company too, most often a short voice message on Telegram or Facebook Messenger.

That is still how most delivery bookings in Phnom Penh are made, and it creates a hidden cost: double work. The seller has already described the parcel once, by voice. Someone at the delivery company must then listen to each message, ask follow-up questions and enter every booking into the company's system by hand, one at a time. At Khmer Parcel, we work this way too. Each booking is handled twice, and every time a detail is retyped, a wrong address or a missing phone number becomes a little more likely.

My goal was twofold. Sellers should be able to book in seconds without leaving the app they already use, and every booking should reach our office in the same clear and complete format, ready to act on.

### Why Telegram, and not a new app

My first thought was simple: build our own app. The AI and I quickly agreed this was the wrong choice. The reasons apply to almost any small business.

A new app must be discovered, downloaded, installed and trusted, and every one of those steps loses customers. Our sellers already had Telegram open from morning to night. So rather than asking them to come to us, we went to them. A **Telegram mini app** is a small application that opens *inside* Telegram with a single tap, with nothing to install.

**Meet your customers where they already are.** Every additional step you ask of them is another reason for them to say no.

### Why a form, and not a conversation

Chat feels friendly, but it is a bad way to collect information, because nothing in a chat makes sure the details are complete. A short form does. It asks for the shop's name, phone number and pickup address, together with the details of each parcel, and it will not accept a booking until the essential details are present. It also remembers each shop's information for next time.

When the seller confirms, the booking appears in our office Telegram group within seconds, neatly formatted and labelled with a booking code. The seller receives the same code as confirmation.

The form is written in **Khmer first**, with short English beneath. For me, this was about respect, not design. Most of our sellers think and work in Khmer. A form in their own language feels like it was made for them, because it was.

The app also manages our launch offer automatically. Each seller's first three deliveries cost 2,000 riel, about $0.50, instead of the standard 3,000 riel, about $0.75, and the app keeps count for every Telegram account.

### Why free, and why simple

In Chapter 5, I described my rule: pay for growth only once the free version has proved itself. The booking app follows that rule completely. It runs on Cloudflare's free plan, with no server to rent and nothing to maintain. Its running cost is zero.

I also made one request that shaped the whole project: *I am not a programmer, so I must be able to update this myself.* The AI built everything around that sentence. When I need to change a price or a word, I ask Claude Code to make the change and rebuild the app into one file, and I paste that file into Cloudflare. No technical team, no waiting.

Build something you can look after yourself. A tool that only a specialist can update will, sooner or later, stop being updated.

### Why it checks every booking

There was one feature I would never have thought to ask for, and it may be the most important one.

Anything you put on the internet can be misused. Someone could try to send fake bookings into our office group, wasting our riders' time or damaging our reputation. The AI raised this risk by itself and built a safeguard: every booking carries a digital signature from Telegram, a kind of tamper-proof seal, and the app verifies that seal before accepting anything. A booking that does not come from a genuine Telegram user is quietly rejected.

Whenever you build something public, ask the AI: *"How could someone misuse this, and how do we stop it?"*

### Why it does less than it could

In May 1997, answering questions from software developers at Apple's Worldwide Developers Conference, Steve Jobs said that "focusing is about saying no."[]{#ref-8-1}^[1](#note-8-1)^ I thought of those words often while building this app.

We could have added many more features. We chose not to. Door-to-door customers continue to book through our website, so that the app can remain focused on online sellers. Our office still confirms each booking by hand, because the app is not yet connected to our website's delivery system. And because the offer is counted per Telegram account, our staff still check phone numbers for repeated use.

Writing these limits down stopped me from promising more than the app could do, to my customers and to myself.

### The moment it worked

Setting up the app took about twenty minutes, following a step-by-step guide the AI had written for me in plain language. Then came the test. I opened our bot, tapped the button, completed a booking and pressed confirm.

A few seconds later, the booking appeared in our office group: complete, clear and carrying its own booking code. I was really surprised. Something I had described in plain words only days earlier was now working in front of me, inside the very app our customers use every day.

### What the journey has taught me

The finished app looks simple, and that is the point. But building it taught me lessons that go far beyond this one project.

**Small details can halt everything.** Some setup steps failed for reasons that had nothing to do with the app itself, such as a single space in a password where spaces were not allowed. None of these problems was hard once I understood it, but each one could easily cost an hour. Every one of them now has its own line in the setup guide, so that it never happens twice.

**Your secrets are the keys to your shop.** The bot has a secret key, and whoever holds it controls the bot. I never share it in any chat or message, not even with an AI. It lives only in the protected settings of the service that uses it.

**Test before you trust.** The AI wrote automatic tests that verify the most important behaviour every time something changes: genuine bookings are accepted, fake ones are rejected, and the offer is counted correctly. I cannot read most of the code, but I can read a result confirming that every test has passed.

**Build once, use many times.** Because the app keeps its wording, prices and form fields in one place, it can be adapted for other businesses. A salon could use it for appointments, a café for orders, a tutor for class bookings.

**Technology is the easy part; habits are the hard part.** For the seller and for our office, a booking in the mini app takes much less time than a booking by chat. But speed alone rarely changes behaviour. Sellers have sent voice messages for years, and that habit will not disappear just because a better tool exists. Getting them to try the app, and then to keep using it, will take patience, clear explanation and time. This is the first real challenge of the project, and it is a human one, not a technical one.

### Looking ahead

The booking app has only just launched. Its real test is still ahead. Real customers will reveal challenges I have not yet imagined, and I intend to share them honestly in a future edition of this book.

What I can already say is this: a small business owner who is not a programmer described a daily problem in plain words, and within days had a working, secure and free tool that addresses it. Whether sellers embrace it is now a question of trust and habit, the oldest questions in business, and ones no AI can answer on our behalf.

> **Where things stand: 28 October 2026**
>
> - **Live since:** October 2026. The first test booking reached our office Telegram group.
> - **Bookings received through the app:** ⭐ [number]
> - **Online sellers using it:** ⭐ [number] (our goal is about 25 regular sellers)
> - **Running cost:** $0 a month
>
> I will update these numbers in every new edition, including the zeros.


> **Builder's Notes: Build your own booking mini app**
>
> *For readers who want to build their own version. Feel free to skip this box. If you are a complete beginner, start by pasting this note into Claude Code and asking it to walk you through each step (see "Getting set up" in Chapter 5).*
>
> **Start with this message to Claude:**
>
> > My customers book [your service] by sending Telegram messages, and the details are often incomplete. I would like a Telegram mini app with a short form in [your language] that asks for [the details you need] and sends each booking to my staff group with a booking code. It should be free to run, easy for a beginner to update, and protected against fake bookings. Please explain each step simply, and write me a setup guide.
>
> **The six setup steps to expect** (about twenty minutes):
> 1. **Create the bot** with Telegram's official @BotFather account. It gives you a secret *token*; never paste it into any chat.
> 2. **Create a staff group**, and add the bot and your staff.
> 3. **Create a free Cloudflare Worker**, ask Claude Code to run the build step that combines the app into a single file, paste in that file, and store the token and other secret values under Cloudflare's *Variables and Secrets*.
> 4. **Connect the bot to the app** by opening the setup address from the guide, once, in your browser.
> 5. **Find your group's ID.** In a group, a bot hears only commands addressed to it by name, so include the bot's username, for example `/chatid@YourBotName`.
> 6. **Test it** by making a booking yourself.
>
> **Common traps:**
> - The secret password linking Telegram to your app may contain only letters, numbers, dashes and underscores; no spaces.
> - Any feature that must remember the past, such as "first three orders discounted", needs a small storage space. Cloudflare offers one free of charge (called *KV*); ask the AI to set it up.
> - Ask the AI to write automatic tests, and run them before every update.

---

## Chapter 9: Project Two — A Blog That Drafts Itself, and the Truth About "Passive Income"

### The promise everyone is selling

Spend a few minutes on social media and you will see the same promise again and again: let AI write your content, add a few affiliate links, and money will arrive while you sleep. The videos feature laptops on beaches and screenshots of earnings, and the message never changes: *passive income*.

I wanted to find out how much of that promise was true. Not by reading about it, but by testing it myself, honestly, with my own time and money, and then reporting exactly what happened. This chapter is that report.

In Chapter 4, I explained why I chose **affiliate marketing** and a blog about **kitchen gadgets under $30**: no stock, no shipping, free to join, a subject that never goes out of date, and products people buy without thinking for long. The blog is called **Home Picks Under 30**. What follows is the story of how it was built, the reasoning behind each decision, and the results so far, including the uncomfortable ones.

### Why I finally tried

Many years ago, I first heard of people earning money online by selling on Amazon, or by becoming **affiliate marketers**: recommending products through articles or videos, and earning a small commission whenever a reader makes a purchase. Each commission is modest. Yet added together, month after month, such earnings can offer something valuable: an income that does not depend on a single employer, and with it a degree of independence.

For years, I never tried. It looked too hard for someone like me. I would have needed to write fluent articles in English, understand links and search engine optimisation, protect my privacy and security online, navigate the registration process and, above all, comply with Amazon's demanding rules. Each one was a separate skill, and together they kept the idea out of reach.

AI changed that. An AI agent can now help with almost every one of those obstacles: drafting the articles, building the website, explaining search engines in plain language, guiding the registration step by step, and checking every post against the rules. Things that stopped me for years are now easy enough for a beginner.

I want to be clear about one point. This blog is **not** aimed at customers in Cambodia. It is written in English for readers in Western countries, chiefly the United States, where millions of people shop on Amazon every day, and the commissions come from their purchases. In other words, a person in Phnom Penh can now build a small online business that serves customers on the other side of the world.

That is why I encourage more Cambodians to explore affiliate marketing, with their eyes open. As this chapter will show, the path holds real obstacles for people in our country, from receiving payments to advertising. But the opportunity is real, and AI has made it more accessible than ever before.

I also see this work as a window into the future. The world's largest online marketplaces, among them **Amazon**, **Alibaba** (through its Taobao and Tmall platforms), **JD.com**, **Walmart** and **eBay**, are already transforming the way goods are stored, packed and delivered. Amazon has tested humanoid robots in its warehouses and delivers some parcels by drone, while Walmart and JD.com have also operated drone delivery services. As robots and AI take on more of the physical work of commerce, the human roles that remain will increasingly involve understanding customers, creating trustworthy content and directing intelligent tools. Learning those skills today, even through a small blog, is one way of preparing for that future.

### What the machine does

Together with Claude, I built what I call a **content engine**. Three times a week, on Monday, Wednesday and Friday mornings, it starts on its own and performs the work of a small editorial team.

It selects a topic guided by the calendar: Halloween snacks in October, Thanksgiving cooking in November, gift ideas before Christmas. It writes a complete draft article in clear, helpful English. It prepares a "posting pack" on the same topic, with social media captions, short video scripts and a Pinterest description. And before I see a single word, it checks the draft against Amazon's rules and lists everything that needs correcting.

Once a post has been approved, the system goes further still. It builds the web page, compresses the photographs so that the site loads quickly on a phone, designs three different Pinterest images, and produces a short vertical video ready for TikTok, YouTube Shorts and Pinterest.

By mid-October 2026, the blog had **19 published posts** featuring **75 products**. Doing all that by hand would have taken me weeks. The engine did most of it in the background.

That part of the promise is true: AI can produce content faster than any one person. But, as I was about to learn, producing content was never the hard part.

### Is it written for humans?

But speed raises an uncomfortable question: is content written by a machine really **written for humans**? Does it come from real experience and speak to the reader's needs, or does it only sound correct?

The question matters commercially as much as ethically. Google, which directs a large share of the world's web traffic, has stated publicly that it rewards helpful content written for people, and in 2022 it added **experience** to the qualities it looks for, alongside expertise, authoritativeness and trustworthiness.[]{#ref-9-1}^[1](#note-9-1)^ A blog filled with smooth but empty articles may be cheap to produce, but readers and search engines alike will eventually notice.

So I recommend a simple habit: **score every AI-written post before you publish it.** Read it as your reader would, and award a mark from 1 to 10 for each of the following questions:

| Question | What a high score looks like |
|---|---|
| Does it solve a real problem for the reader? | The reader knows exactly what to buy, or not to buy, and why |
| Does it sound like a person rather than a machine? | Natural, specific and warm, free of empty phrases |
| Does it reflect real experience? | Practical details a real cook would notice, and honesty about what has not been tested |
| Does it respect the reader's feelings and budget? | No pressure, no exaggeration, and a choice for every budget |
| Would I trust it if I were the reader? | Clear disclosure, and no claims that cannot be supported |

Any post that scores below 7 on any question goes back for rewriting, together with my notes. Over time, these scores reveal where the AI is strong and where it needs more of my own experience and voice.

But my scores are only half the test. The other half is what readers do. A good article should attract visitors, hold their attention and lead some of them to click through to Amazon and buy. Comparing my own scores with the real traffic between the blog and Amazon, from visits and clicks to, eventually, sales, shows whether my judgement matches what readers actually value. When the two disagree, the readers are right.

AI can write quickly, but only people can judge whether writing really helps. Measure both.

### Why nothing goes live without me

The most important decision in this project was not technical at all. It was this: **the engine writes drafts, but only I can publish them.**

Every draft waits for my review. I read it, choose the products myself on Amazon, and send them to the AI one at a time. Only when I type "go" does it update the post. I then add a cover photograph and approve publication.

Why not let it publish automatically? Because a blog that recommends products makes a promise to its readers, and I am the one responsible for that promise. An AI can write a persuasive paragraph about a garlic press it has never touched. I can prevent it from pretending otherwise.

That is why every product note in my system says the same thing: *"Haven't used it yet."* The articles never claim that I have tested a product or that it has transformed my kitchen. They describe what the product is designed to do and what its listing states. It is less exciting to read, and much more honest. A machine can do the work, but it cannot carry the responsibility.

### Why the rules are built into the machine

Amazon's affiliate programme has strict rules, and breaking them can cost you your account. You must disclose that you earn from qualifying purchases. You must not copy prices, star ratings, review counts or product images onto your site; they may appear only through Amazon's official tools, which keep them up to date.

I could have tried to remember every rule every time. Instead, I asked the AI to build the rules into the engine itself. Every draft is checked automatically, and the report at the top of each posting pack tells me exactly what to correct: a missing disclosure, a price that has slipped into the text, or a word like "best" that I cannot prove.

The checker is not perfect. For a time, it accepted "under $30" yet flagged "under-$30", written with a hyphen, as an error. Even so, it catches far more than I would on a tired evening, and it never forgets a rule.

When the rules matter, don't trust your memory. Turn them into a checklist the machine applies every time.

### Why the calendar matters

One of the most valuable ideas in the project came from understanding how people use Pinterest. Many users plan well ahead, saving gift ideas and holiday recipes weeks or even months before the occasion. So the engine does not write about Halloween on Halloween. It writes about it in early October, and about Christmas gifts from mid-October onwards.

When I understood this, I brought our gift guide forward by more than two weeks, and the AI adjusted the publishing plan so that every new draft until mid-December would focus on gifts.

The lesson: publish when your reader starts searching, not when the holiday arrives.

### The honest results

This is the part the videos about passive income never show.

By mid-October 2026, the blog had received almost no visitors from outside. The few early visits were largely my own, until I set the visitor counter to ignore my connection. Amazon's dashboard recorded a few dozen clicks on product links in the first month, many of them my own tests. **The number of sales was zero.** The box at the end of this chapter has the latest numbers.

The project also hit problems that no AI could solve, because they had nothing to do with technology.

**Getting paid.** Cambodia is not on Amazon's list of countries eligible for bank payments to affiliates, so any earnings can be paid only as Amazon gift cards until I have a working international payment account.

**Advertising.** I planned a small paid test on Pinterest to bring the first visitors to the gift guide. Pinterest's advertising platform, however, does not accept advertisers based in Cambodia. One shortcut would have been to register under another country. The AI advised against it, and it was right: that would have been dishonest, and a business built on false details can be closed overnight. We dropped the idea.

**Community rules.** Some of the online communities where people ask cooking questions, including Reddit's large cooking forum, prohibit AI-written posts. So the AI gives me short ideas, and I write any answers myself, in my own words.

**A deadline.** Amazon requires new affiliates to make three qualifying sales within 180 days, or the account is closed. My deadline is the 30th of March, 2027.

None of this means the project has failed. It means the project is young. I am not giving up. Pinterest can take weeks or months to deliver steady traffic, and search engines often take three to six months to trust a new website. Meanwhile, the strongest shopping season of the year, from Thanksgiving to Christmas, still lies ahead.

### What "passive income" really means

After two months, this is my honest conclusion.

The *production* can mostly be automated. The *audience* cannot. No engine, however clever, can make strangers trust a website they have never heard of. That trust is earned slowly: by publishing useful posts consistently, by sharing them where people are searching, and by never misleading the reader.

The work, then, did not disappear; it changed. Instead of writing every article myself, I now spend my time reviewing drafts, choosing products, pinning posts by hand and sharing short videos. It is much less work than doing everything by hand. But it is not passive, and anyone who says it is, is usually selling something.

In his first letter to Amazon's shareholders, in 1997, Jeff Bezos placed one idea at the heart of the company's thinking, under the heading "It's All About the Long Term."[]{#ref-9-2}^[2](#note-9-2)^ It is a good thought for anyone building an affiliate website for Amazon. The engine allows me to keep showing up, three times a week, at very little cost. Whether that consistency becomes income is a question only time, and readers, can answer.

### Looking ahead

I will keep the engine running, keep publishing honestly, and keep recording the numbers every Monday. If the first sales arrive, I will explain how they came. If they do not, I will say so, together with everything I learned along the way.

> **Where things stand: 28 October 2026**
>
> - **Posts published:** 19 (26 September to 16 October 2026), featuring 75 products
> - **Visitors:** 22 visits in the week of 5–12 October, most of them my own; real outside traffic was close to zero. ⭐ [latest weekly visits]
> - **Clicks to Amazon:** 69 in the 30 days to 16 October, about 50 of them my own link tests
> - **Sales:** 0. Amazon needs 3 qualifying sales by 30 March 2027, or the account closes.
> - **Income so far:** $0


> **Builder's Notes: Build your own content engine**
>
> *For readers who want to build their own version. Feel free to skip this box. If you are a complete beginner, start by pasting this note into Claude Code and asking it to walk you through each step (see "Getting set up" in Chapter 5).*
>
> **Start with this message to Claude:**
>
> > I want to start a small affiliate blog about [your niche] for [your audience]. Please build me a system that, three times a week, suggests a topic, writes a draft article, prepares social media captions, and checks the draft against [the affiliate programme]'s rules. Nothing should be published until I approve it. I am a beginner, so please use free tools where possible, explain each step simply, and write me a setup guide.
>
> **What the setup usually involves:**
> 1. **A free GitHub account**, to store the project, run the schedule and host the blog (through GitHub Pages).
> 2. **A Claude API key**, added to GitHub as a *secret*, so that the engine can call Claude. It is billed by usage, separately from your Claude subscription (see Chapter 5). Never paste the key into a chat.
> 3. **A settings file**, in which you record your niche, your audience, your language and your real affiliate links.
> 4. **A free visitor counter**, such as GoatCounter, to measure real traffic.
>
> **Common traps:**
> - Exclude your own visits from the visitor counter, or your figures will look better than they are.
> - Place the affiliate disclosure in every post and every social media description, before the first link.
> - Never use the store's product photographs, and never copy its prices or star ratings. Use your own photographs or free stock images.
> - Never claim to have used a product unless you genuinely have.
> - Check your country's situation early: payment methods, advertising platforms and programme deadlines may differ where you live.
>
> **Scoring prompt** (use it before you publish):
>
> > Please act as a demanding reader. Score this draft from 1 to 10 on each question: Does it solve a real problem? Does it sound human? Does it reflect real experience? Does it respect the reader's feelings and budget? Would you trust it? Explain each score, then suggest three changes that would raise the lowest one.
>
> Treat the AI's scores as a second opinion, never the final verdict. Your own reading, and your readers' behaviour, decide.

---

## Chapter 10: Project Three — Video Ads Without a Video Editor

### A business nobody has heard of

On the day Khmer Parcel opened, almost nobody knew it existed. We had a website, a Facebook page, clear prices, riders and a booking system. What we did not have was attention.

In Cambodia, as in much of the world, attention now lives in short vertical videos on Facebook Reels and TikTok. Businesses that post regularly are seen; those that do not are soon forgotten. Yet video production is expensive. A professional editor or agency was far beyond the budget of a business in its first month, and I had never edited a video in my life.

So I asked a different question: *could AI help one person produce a steady stream of short video advertisements, in Khmer, without a video editor?*

### Why build a video factory rather than use an app

There are free video-editing apps, and many are very good. So why build my own?

The answer is in what a small business needs from its ads. Every video must show **the same correct facts**: the same phone numbers, the same prices, the same offer and the same closing date. It must use **the same brand colours and fonts**, so that customers gradually learn to recognise us. And it must display **the Khmer script** properly, something many tools still struggle to do.

With an editing app, every new video means typing those details again by hand, and every time is a new chance for a mistake. So, together with Claude, I built a small **video factory** instead. Each advertisement is designed like a simple web page, composed of scenes containing text, shapes and movement. A web browser then plays each scene and records it frame by frame, and the frames are assembled into a vertical video of between thirty seconds and a minute, ready for Reels and TikTok. Every video carries a silent soundtrack, so that a voice-over or music can be added afterwards in the app where it is posted.

To create a new advertisement, I copy an earlier design, change the words and images, review a quick preview of each scene and render the final video. The facts, colours and fonts carry over automatically.

When the facts must always be the same, build a template once and let every new video reuse it.

### What the first numbers told us

Our first paid ads ran for two days, at $5 a day, when we launched. Facebook's report was hard to read:

- **2,546 views**, yet only **605** viewers watched for three seconds or longer
- An average viewing time of **four seconds**
- **57 clicks** through to our website
- **No bookings at all**
- And, unexpectedly, **four applications from people wanting to become riders**

There was more. Most viewers were **men aged 25 to 44**, but the online sellers we most wanted to reach are often **women aged 20 to 40**. And in our longer advertisement, viewers left in large numbers at the seventeenth second, exactly when the video switched from addressing door-to-door customers to addressing online sellers.

I was disappointed. But then I treated the results as research findings, which is what they were, and each number taught us something.

**An average of four seconds means the first frame is everything.** Most viewers decide almost instantly whether to keep watching. Every video now opens with its hook already on screen, with no empty first second.

**A drop at the seventeenth second means one message per video.** A video that tries to speak to two audiences loses both. We produced a shorter, 29-second version for door-to-door customers alone, and adopted a firm rule: one audience per advertisement.

**Four rider applications mean people were paying attention, just not the people we expected.** The advertisement reached job seekers more effectively than customers. That was not a failure. It told us who was watching, and reminded us to target future ads more carefully.

In the language of his time, the advertising pioneer David Ogilvy wrote, "The consumer isn't a moron; she is your wife."[]{#ref-10-1}^[1](#note-10-1)^ His point was that advertising succeeds only when it respects the intelligence of its audience. Our numbers taught the same lesson in a modern form: people grant you a few seconds of their attention, and in return they expect a clear, honest message intended for them.

### Rules learned the hard way

Several of our most important rules came from small mistakes. I caught each one by watching the finished videos myself.

**Emoji appeared as empty boxes.** The computer producing the videos had no means of displaying them, and the AI could not see the problem. Simple drawn icons now replace emoji in every video.

**Khmer must look right, not just be there.** Khmer characters combine in complex ways, and the wrong font can break them apart. The factory now uses carefully chosen Khmer fonts, and I check every new video at full size.

**The screen is not all yours.** On Reels and TikTok, the app's own buttons and captions cover the bottom of the screen and part of its right edge. Important words and prices are now kept within a safe area in the centre.

**A single wrong digit can cost customers.** Our printed poster contained a wrong digit in one of our phone numbers. The poster is now always cropped, and the correct numbers are kept in one place, from which every video draws them.

**Never promise what the business has not decided.** Early ideas for advertisements included attractive promises we had not confirmed, such as same-day payouts for cash-on-delivery orders. The rule is now written into the instructions the AI follows: if I have not confirmed it, it does not appear.

AI makes production fast. But only a person watching carefully can catch what the machine cannot see.

### A video a day

Social media rewards consistency, so I set a big goal: about one short ad every day. With the AI, I drew up a **thirty-day video calendar**, with a different idea for each day and each aimed at a single audience: a day in the life of an online seller, an explanation of how cash-on-delivery works, a light-hearted story about a rider searching for a house "near the pagoda", deliveries in the rainy season, packing tips for sellers, and a countdown to the end of our launch offer.

The honest truth is that the calendar is ahead of me. A plan for thirty videos is easy to write. Making, checking and posting them while running a new business takes real time. So far, I have made two of the thirty.

### A plan, not a promise

One video in our collection differs from all the others. It sells no delivery. Instead, it shares our vision: how AI is growing more capable, what AI cannot replace, such as human trust, care and local knowledge, and the stages through which we hope Khmer Parcel will grow.

We chose its words with care. The video presents **a plan, not promises**: it describes where we intend to go without claiming that we will certainly arrive. That distinction runs through every part of this book. Be ambitious in your plans, and honest in your claims.

### Looking ahead

The video factory gives a one-person business something that once needed a team: clear, consistent, Khmer-first ads, made quickly and almost for free. What it cannot do is decide what to say, or guarantee that anyone will watch.

Those remain human tasks: understanding the customer, choosing one clear message, respecting the viewer's time and learning from every number. The machine makes the videos. The thinking remains ours.

> **Where things stand: 28 October 2026**
>
> - **Paid ad test (30 September – 1 October, $5 a day):** 2,546 views, 57 clicks, **0 bookings**, 4 rider applicants
> - **Videos made:** 5 (a launch ad, the 6,000-riel ad, a seller-story ad, a big-screen reel and an AI-era vision video), several in two or three versions
> - **30-day video calendar:** 2 of 30 done
> - **Videos posted:** ⭐ [number]
> - **Extra cost:** $0 beyond the tools in Chapter 5


> **Builder's Notes: Build your own video ad factory**
>
> *For readers who want to build their own version. Feel free to skip this box. If you are a complete beginner, start by pasting this note into Claude Code and asking it to walk you through each step (see "Getting set up" in Chapter 5).*
>
> **Start with this message to Claude:**
>
> > I run a small [type of business] and want to make short vertical video ads (1080 × 1920) for Facebook Reels and TikTok, in [your language] with short English. I am not a video editor. Please build me a simple system in which each ad is made from editable scenes, uses my brand colours and fonts, and takes my correct contact details from one place. Give each video a silent soundtrack so that I can add a voice-over in the app. Please explain each step simply.
>
> **Rules worth giving the AI from the start:**
> - Show the hook in the very first frame.
> - Speak to one audience per video.
> - Keep important text away from the bottom quarter and the right edge, where app buttons appear.
> - Never use emoji; draw simple icons instead.
> - Never state a price, offer or promise that is not recorded in your facts file.
>
> **After posting:** review the average viewing time, the point where viewers leave, who is watching and what they do next. Share those figures with the AI and ask: "What single change would you make to the next video?"

---

## Chapter 11: Project Four — The Ebook Machine, and the Story of This Book

### An advertisement on my phone

This book began with an advertisement.

One afternoon in October 2026, while scrolling through Facebook Reels, I came across two short videos. The first showed a woman gazing thoughtfully at her laptop beneath an orange banner that read "AI + KDP = ATM". Behind her was a screenshot of royalties from Amazon's Kindle Direct Publishing, known as KDP: more than $121,000 in a single month, from 232 books. The second video promoted a tool that promised to write non-fiction books for Amazon automatically, complete with outlines, chapters, titles and descriptions.

The message was hard to resist: let AI write the books, publish them on Amazon, and collect the money.

I saved screenshots of both videos and put a simple question to Claude: *how could I build an automated ebook system that would earn me an income?*

### The first answer was a warning

I expected a step-by-step plan. I got one, but it started with a reality check.

The video, the AI pointed out, was an advertisement for a product. A royalty screenshot drawn from a catalogue of 232 books reveals very little about what a typical book earns, and most AI-written books earn very little. Amazon requires authors to disclose AI-generated content, allows only three new titles a day, and removes books of poor quality. A machine that only produces many books is not a business; it is a liability.

Only then came the plan. The AI outlined a pipeline of eight stages, from choosing a topic to publication, and marked clearly which stages a machine could handle and which required a person: **choosing the topic, editing every chapter, checking every fact and designing the cover**. It estimated that the AI writing for a single book would cost only a few dollars, and that a realistic monthly budget, covers included, would fall between $25 and $50. And when I asked how much I might earn, it offered scenarios rather than promises: a few dollars a month for weak books, perhaps a few hundred for a well-chosen, carefully edited series.

It was not the exciting answer I wanted. It was the answer I needed.

### Three ideas, two failures

The most valuable lesson of this project came before I wrote a single chapter.

**The first idea was a Phnom Penh travel guide.** It seemed ideal. I live here, I know the city, and Cambodia welcomes many visitors each year. The AI drafted an outline of fourteen chapters. Before writing a word, however, it asked me to test the demand: to search Amazon for "Phnom Penh travel guide 2026" and send it a screenshot of the results.

The results were disappointing. There were only eleven books, most of them years out of date and each with a handful of reviews. When I sorted them by sales, it became clear that very few people buy guides to Phnom Penh on Kindle. The competition was weak, but so was the demand. As I wrote to the AI at the time, in my own words: "very small demand".

**The second idea was a guide to living in Phnom Penh.** The same search held a clue. A book about moving to the city, published in 2013, had attracted more reviews and commanded a higher price than the tourist guides. Perhaps expatriates were the better audience? Perhaps, but it remained a small market, likely to earn very little.

**The third idea was a book about AI, for readers everywhere.** Then I asked a different question: *why not write about AI itself, for readers all over the world?*

The next search told a very different story. There were dozens of books about AI for beginners and small businesses, some belonging to series of eleven or even twenty-one titles, with hundreds of reviews and "#1 Best Seller" badges. The demand was clear. So was the competition: many of the books looked alike, promising "bibles", "secrets" and easy money.

Yet within that crowded market, the AI identified a gap. Almost every book taught general tips and prompts. Almost none was written by a real small-business owner sharing **real projects, real costs and real mistakes**. I had four such projects.

That was how this book was born.

Never fall in love with an idea before you check that someone wants it. Five minutes of searching can save months of writing.

### A difficulty with my own story

One uncomfortable truth remained. My four projects had only just been built. The booking app had barely launched, the blog had made no sales, and the video calendar was only beginning. How could I write a book about results I did not yet have?

The answer reshaped the book. It would not be a book about income; it would be a **build journal**, recording how each tool was created, why each decision was made, what it cost, what went wrong and, honestly, what has and has not happened since. I began recording the figures every Monday in a simple tracking sheet, so that future editions can report real results rather than hopes.

Results, however, were never my only reason for building. I began these projects because I had come to understand where my real strength lies: in using the technology within my reach to improve communication, and to give the social and commercial ventures I hope to create in the future a stronger foundation. I also believe that AI will reshape the way we live on this earth, sooner or later. I would rather learn to work alongside that change today than be overtaken by it tomorrow.

My working life has known its share of highs and lows, some of which you read about in Part One: the difficult years inside an organisation I could not change, the decision to leave, and the uncertain months that followed. This book exists because of those experiences, not in spite of them. I want to share them truthfully, the hard times included, because I believe that anyone who holds on to their belief in themselves through a difficult period will, in time, see the way forward more clearly than ever before. In my own words: if your belief in overcoming hard times stays strong, the light ahead will only grow brighter.

On the 3rd of April 1968, in Memphis, Tennessee, Martin Luther King Jr. delivered what would be his final speech, at one of the darkest moments of the struggle for civil rights. Aware of the threats against his life, he told his audience: "Only when it is dark enough can you see the stars."[]{#ref-11-1}^[1](#note-11-1)^ He was assassinated the following day, yet his words continue to give courage to people throughout the world. For me, his words mean that hope does not come after the hard times. Hard times are when we can see it.

My own projects remain at an early and uncertain stage: an app that customers are only beginning to try, a blog still awaiting its first sale, a calendar of videos still in production. It would be easy to call this darkness. I prefer to see it as the moment when the first stars appear, when the lessons are clearest and the decision to keep going matters most.

If you cannot show results yet, show your process honestly. Readers forgive missing results much more easily than they forgive exaggeration.

### How this book is actually written

I should explain how these chapters were made, because the method is part of the lesson.

English is not my first language, so we found a simple way to work. I send the AI my thoughts for each chapter as rough notes: memories, opinions, a story from my former job, sometimes in imperfect English and sometimes with a few words of Khmer. The AI turns them into clear prose. It uses only what I have given it, together with facts it can verify from my project notes and public sources. It is instructed never to invent results, quotations or experiences (when it slipped, as Chapter 12 shows, our checks caught it), and wherever information is missing, it leaves a marked gap for me to complete rather than guessing.

I then read every chapter and correct it. Some corrections are small: a name, a date, a single word that did not feel right to me. Others are big. After reading the first draft of Part Two, I told the AI it was too technical and too blunt, and that readers would not understand *why* any of it mattered. Together we rebuilt those chapters around stories and the reasoning behind each decision, and moved the step-by-step instructions into the Builder's Notes boxes at the end of each chapter.

The AI also protected me from my own first drafts. It kept my former employer anonymous, softened sentences that might have been unfair to real people, checked the source of every quotation, and told me whenever a well-known saying could not be traced to the person usually credited with it.

The American writer William Zinsser wrote that "rewriting is the essence of writing well."[]{#ref-11-2}^[2](#note-11-2)^ This book has been rewritten many times, and every round was a conversation between my experience and the AI's language. The AI helps with the words. The experience, the judgement and the final decision are mine.

### The machine I planned, and the machine I needed

My original plan was an automated system: a program that would generate outlines and chapters on its own, ready for publication. I never built it, and I no longer wish to.

The machine I really needed was much simpler: **a conversation with an AI, supported by a few well-organised files**. One file holds the outline and the rules. Each part of the book is a draft that grows and improves with every round. A tracking sheet gathers the real figures, and a short note lists everything that must be checked before publication. Everything is saved, so that nothing is lost between sessions and every earlier version can be recovered.

Could a fully automated machine make books faster? Of course. But its books would be exactly the kind I described earlier: fast, cheap and the same as hundreds of others. The value of this book is in what a machine cannot give: my experience, my mistakes and my judgement.

### What remains to be done

As I write this, the book is not finished yet. Still ahead: a full edit, updated numbers from my projects, the cover, formatting for Kindle and the upload to Amazon, where, as Amazon requires, I will declare that AI was used to create the content.

Whether the book will sell, I can't say yet. But it has already done something the advertisement on my phone never promised: it has turned a few weeks of real experience into something that may help others to begin.

> **Where things stand: 28 October 2026**
>
> - **Writing started:** 18 October 2026
> - **Draft:** 13 chapters, about 26,000 words, checked by two independent AI editorial reviews
> - **Hours spent so far:** ⭐ [from the weekly tracker]
> - **Planned launch:** mid-December 2026, at $4.99
> - **Copies sold:** 0, as the book is not yet published


> **Builder's Notes: Write your own book with AI**
>
> *For readers who want to write a book of their own. Feel free to skip this box.*
>
> **1. Check the demand before you write.** Search the Kindle Store for your topic and note the number of results, the review counts, the publication dates and the prices. Open the leading books and record their *Best Sellers Rank* from the product details. Send screenshots to the AI and ask: "Is there real demand here, and is there a gap I could fill?"
>
> **2. Choose a topic in which you have real experience.** Your experience is the one thing competitors cannot copy.
>
> **3. Write from notes, not from nothing.** For each chapter, send the AI your own notes and stories, together with this instruction:
>
> > Please turn my notes into a clear book chapter. Use only the facts and experiences I have given you. Never invent results, quotations or stories. Where something is missing, leave a marked gap for me to fill. Check the source of any quotation you suggest.
>
> **4. Read and correct every chapter yourself**, and ask for a final polish only once the content is right.
>
> **5. Keep a list of everything to update before publishing**, such as figures, dates and examples, so that nothing is forgotten.
>
> **6. Before uploading to Amazon KDP**, confirm how you will be paid in your country, prepare a professional cover, and answer KDP's question about AI-generated content honestly.


