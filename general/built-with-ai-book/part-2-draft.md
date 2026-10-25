<!--
OWNER CHECKLIST (delete before publishing) — Part Two draft v16, 25 Oct 2026
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
   Zinsser quote added (note 7).
-->

# Part Two: Building

> **How to read Part Two.** Each chapter tells the story behind a project: the problem, the decisions, and the reasons behind them. Practical step-by-step instructions are kept in boxes marked **Builder's Notes** at the end of each chapter. If you simply want the ideas, skip the boxes. If you want to build, they are there for you.

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

### Two halves of one solution

Long before I built anything with AI on my own, I worked alongside a young colleague on a problem that taught me far more than I understood at the time.

He was a newly graduated engineer, trained in data and artificial intelligence at one of the leading private universities in Phnom Penh. He wrote code with confidence, particularly in Python and JavaScript, and he worked comfortably alongside AI tools. When the AI made a mistake, he could usually trace the faulty line and correct it himself, saving the hours a beginner would have spent going round in circles. On paper, he was precisely the kind of person every company wants in the age of AI.

Yet when he was asked to build an automated call plan for the sales team, a system to decide which customers each salesperson should call and when, he struggled. The difficulty was not the code; it was the work itself. He had never been a salesperson. He did not know how plans were made in practice, which customers mattered most, or why a schedule that looked perfect on a screen would collapse on a real Monday morning.

In many ways, I was his opposite. I had spent years close to the field and understood the operation in detail, from the way data was collected to the way decisions were actually made. But I could not write the code myself, and at that time my experience with AI was still limited.

Neither of us could have solved the problem alone. Together, we could. I explained what really happened on the ground: where plans broke down, what salespeople needed, which exceptions mattered. He translated those explanations into instructions that he and the AI could act upon. Over several weeks, as we exchanged knowledge, frustrations and lessons, the system began to work.

Only later, when I started building with AI on my own, did I recognise what we had been doing. Large AI models are trained on vast quantities of human experience, gathered and processed in data centres around the world. My colleague and I had been doing the same thing on a human scale: translating one person's practical experience into a form that a machine could use.

That is the central lesson of this chapter, and perhaps of this entire book:

**Once you understand a problem through real experience, and can explain it in a way the AI understands, the solution is usually within reach.**

Today, I no longer need an engineer at my side for projects like those in this book. I can be the one who understands the problem, and let the AI take the engineer's role. First, however, I had to learn how to explain. The lessons that follow show how I learned, through mistakes and small discoveries in my own projects.

### Lesson 1: Describe the problem, not the solution

The American inventor Charles Kettering is often credited with the observation that "a problem well stated is a problem half solved."¹ My very first project proved how true it is.

When I began work on a booking system for Khmer Parcel, I had never heard of a "Telegram mini app", and I did not need to. Rather than naming a solution, I described the problem exactly as I experienced it: online sellers were sending bookings in long chat messages, details were going missing, prices were being confused, and someone in the office had to type everything out a second time.

From that description alone, the AI proposed a solution I would never have imagined: a button inside our Telegram bot that opens a short booking form and delivers every booking to our office in the same clear format. Had I simply asked for "a website with a form", I would have received exactly that, and it would have been the wrong tool.

**Why it matters:** you understand your customers; the AI understands the technology. When you prescribe the solution yourself, you confine the AI to what you already know. When you describe the problem, you invite it to contribute everything it knows.

### Lesson 2: Give the AI a memory

In my first weeks, I found myself repeating the same information again and again. Each new conversation with the AI began almost from nothing; it did not remember our prices, our phone numbers or the decisions we had made the day before. It felt like training a new employee every morning.

So I did what any good manager does when someone new joins the team: I wrote a **handover note**. Every project now has a simple text file that opens with the words *"Read this first in a new chat."* It records the facts that must never change, including the launch date, the official contact numbers, the prices and the brand colours, together with a record of what has been built and what has been decided. At the start of each session, the AI reads it, and within seconds it knows as much about the project as I do.

**Why it matters:** this is exactly what my colleague and I did for each other, only now it is written down. The AI can work only with the experience you give it. A handover note is your experience, stored where the AI can always find it.

### Lesson 3: Set the rules before the work begins

AI is designed to be helpful, and at times it tries too hard. When I asked for advertising ideas for Khmer Parcel, the first drafts were filled with attractive promises, such as same-day delivery and same-day cash-on-delivery payouts, that I had not yet decided to offer. They sounded wonderful. They were also promises a young business might not be able to keep.

That moment changed the way I work. I wrote a short set of rules that the AI now reads in every session: never invent prices, offers or promises without asking me first; use only the official phone numbers, exactly as recorded; write every customer message in Khmer first, with short English beneath; and address only one type of customer in each advertisement.

**Why it matters:** a single broken promise can cost a small business its reputation within a week. Rules written once protect you every day thereafter, even on the days when you are too busy to check every word.

### Lesson 4: Work in small steps, and approve before it acts

An AI agent can change dozens of files in a matter of seconds. At first, I found that exhilarating. Then I found it alarming, because whenever something went wrong, I could not tell which change had caused it.

So I slowed the AI down. Every blog draft now follows the same rhythm. I ask the AI to review the draft, and it reports what needs attention. I select the products myself and send them one message at a time. The AI waits. Only when I type a single word, **"go"**, does it make any changes.

**Why it matters:** in my research career, every survey passed through checkpoints before its findings reached management, because an error caught early costs almost nothing, while an error caught late can cost everything. The same holds true with AI. Small steps are not slow; they are how you stay in control.

### Lesson 5: Show it real data, not just your opinion

Our first paid video advertisements for Khmer Parcel ran for two days at $5 a day. Facebook reported 2,546 views and 57 link clicks. The number of bookings was zero.

My first instinct was to guess at the cause: the price, the colours, the music. Instead, I did what my research training had taught me and turned to the data, this time together with the AI. It noticed that viewers were leaving at the seventeenth second, precisely when the advertisement switched from one type of customer to another. The remedy was simple: shorter advertisements, each speaking to a single audience.

I applied the same discipline when choosing the subject of this book. My first idea, a Phnom Penh travel guide, felt like a certainty. The Amazon search results I shared with the AI told a different story: almost no demand. Step by step, the data led me to the book you are reading now.

**Why it matters:** this was the hardest lesson of my former job, and it applies just as strongly to AI. Leaders who trust their opinions over their data miss the turning points. AI is remarkably good at reading data, but only if you are willing to show it, and willing to listen to what it finds.

### Lesson 6: Tell it how you want to work

English is not my first language. In the beginning, I worried that the AI would not understand my simple, imperfect sentences, often mixed with Khmer. It always did.

What made the greatest difference was telling the AI how *I* wanted to work: *"I am a beginner. Explain each step simply, and tell me exactly what to click."* *"Give me search ideas as plain text; I will choose the products myself."* *"Give me short points rather than finished text; I will write it in my own words."*

**Why it matters:** a good colleague adapts to the way you work, and so does a good AI, provided you tell it how. You do not need perfect words. You need clear intentions.

### Lesson 7: Check everything it makes

The old saying "trust, but verify" has never been more relevant than it is with AI.

In our video advertisements, small picture symbols known as emoji appeared as empty boxes, because the computer producing the videos could not display them. The AI could not see the problem; I could, because I watched every video myself. On another occasion, we discovered a wrong digit in one of the phone numbers on our printed poster. A single wrong digit means customers who cannot reach you. Since then, the correct numbers have lived in the handover note, and that poster never appears uncropped in our videos.

**Why it matters:** AI works quickly, but it does not care about your business the way you do. The final check must always be yours.

### Lesson 8: Let it say no

The most valuable colleagues are not those who agree with everything. They are the ones who tell you the truth, even when you would rather not hear it.

When I planned a small advertising test on Pinterest, we discovered that its advertising platform did not accept businesses based in Cambodia. One shortcut would have been to register under another country. The AI advised against it, and it was right: a business built on false details can be closed overnight. Likewise, when I first encountered online videos promising that AI and Kindle publishing would work "like an ATM", the AI's first response was a reality check, not a sales pitch.

**Why it matters:** an AI that only flatters you is dangerous. Ask it about the risks, and value it most when it says no.

### The real skill

When people ask me which skill matters most for working with AI, they usually expect a technical answer. My experience with that young engineer taught me otherwise.

He brought the technical skill. I brought the understanding. What made our project succeed was the conversation between us. With today's AI, you can hold that conversation yourself: **explain your real problems clearly, examine what you receive honestly, and remain in charge of the decisions.** Managers, teachers, shop owners and researchers practise these skills every day. With AI, they become the skills that allow you to build.

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

It impressed no one else; nobody in the company even noticed. Yet every larger project I have undertaken since grew from that moment of quiet confidence.

I believe this is how most people should begin with AI: not with a grand plan, but with a small, useful win that can be finished in an afternoon, checked with your own eyes, and trusted because you have tested it yourself.

### The line I would not cross

One detail of that first success matters more than the code itself: **I never gave the AI our real data.**

That data belonged to the company and to the customers who had trusted us with their answers, in a highly competitive market. I also understood that an AI shown real data can recognise the patterns within it, and those patterns describe a business. So I took a simple precaution. I created a **test dataset** of my own, with invented responses in exactly the same format as the real survey. The AI wrote the program using only that test data. I then ran the finished program on the real data offline, on my own computer, where it never left the company.

I share this because the same question will reach you sooner than you expect. Some time later, I was invited to speak at an event at the Cambodiana Hotel in Phnom Penh about automating monitoring and evaluation systems for civil society organisations. After my presentation, a man who introduced himself as a monitoring and evaluation specialist with many years of experience asked me: *Are there AI tools that can clean the data, analyse it and produce a preliminary report for a research project?*

The honest answer is yes, a great many. But a more important question lies behind it, one that each of us must answer for ourselves: **how much of our real data are we willing to expose for the sake of convenience?** Survey responses, health information, family circumstances and business figures are all entrusted to us. Uploading them to a tool simply because it saves a few hours is not a technical decision. It is an ethical one, and a test of our professionalism.

This matters particularly in countries like mine. In Cambodia, digital literacy is still developing, and many of us use the internet every day without fully understanding the risks it poses to our security and safety. At the same time, AI is fast becoming as ordinary as electricity, the internet and the smartphone. We cannot avoid it, nor should we try. But we can learn to use it with discipline.

That discipline does not come naturally. Human beings, quite understandably, seek comfort and convenience, and wherever the rules are unclear, convenience tends to win. That is precisely why the rules must be settled before the work begins.

The investor Warren Buffett expressed the underlying principle memorably. In 1991, after a scandal at the investment bank Salomon Brothers, he took charge of the firm and told its staff: "Lose money for the firm and I will be understanding; lose a shred of reputation for the firm and I will be ruthless."²

Buffett understood that money can be earned back, but trust, once lost, may never return. The same is true of data. A slow week of manual work costs you a little time. Leaking the private answers of people who trusted you can cost your organisation its reputation, and the people themselves a great deal more.

My rule, therefore, is this: **work with AI on almost everything, but never hand it what is not yours to give.** Use test data to build the tool, and keep real data under your own control. Once you understand how to use AI, what to do yourself, what to entrust to the AI, and where the limits of exposure lie, you can work with it fully: productively, safely, and with your integrity intact.

### The question every customer asks

Now it is your turn to build. If you run a small business, consider the question your customers ask most often. For almost every business I know, it is the same: **"How much will it cost?"**

At Khmer Parcel, we answer that question many times a day. A tailor, a tutor, a caterer or a printing shop answers it just as often. Each reply takes a few minutes: asking for details, doing the calculation, writing the response. And each reply is an opportunity for a small mistake.

A **price calculator**, a simple web page on which customers enter a few details and immediately see the price, solves that problem. It is small enough to build in about thirty minutes, yet useful enough to share with real customers. That is why I recommend it as a first project: it is quick, genuinely useful, and it teaches the entire process of building with AI.

### The most important five minutes

The most important step happens before you open the AI at all: **write down, in plain words, exactly how you calculate your prices.** For example: *"A delivery costs $1, plus $0.25 for every kilometre after the first three. Large parcels cost an extra $0.50."*

This step matters for every reason discussed in Chapter 6. The AI does not know your business. If you do not supply your pricing rules, it will either have to ask you or, worse, invent them. Your experience is the raw material; the AI merely gives it shape.

### Describe, build, test, improve

Building the calculator involves four steps, and they are the same four steps behind every project in this book.

**Describe.** Tell the AI what your customers need and how your pricing works, just as you would brief a new assistant.

**Build.** The AI writes the page, and often shows a live preview immediately, so you can try it at once.

**Test.** Use the page as a customer would, and compare every price with your own calculation on paper. If even one answer is wrong, say so.

**Improve.** Request one change at a time: a larger total for phone screens, prices in two currencies, a button that opens your Telegram. After each change, test again.

Your first version will rarely be perfect, and that is exactly the point. Refining it is how you learn to direct an AI. When something does not work, you do not need to understand the code. Simply describe what you see, as you would to a colleague, and ask the AI to explain and correct it.

### What you are really learning

The calculator is not the real achievement. The real achievement is that you will have completed, from start to finish, the cycle of **describe, build, test, improve.**

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

Khmer Parcel opened in Phnom Penh on the 1st of October, 2026. From the very beginning, I knew that our most important customers would be **online sellers**: people selling clothing, cosmetics and food through Facebook, TikTok and Telegram. A single regular seller may send five, ten or even twenty parcels a day. For a young delivery business, ten loyal sellers can mean the difference between merely surviving and genuinely growing.

Online sellers spend their entire day on their phones, answering customers in chat. So when they need a delivery, their natural instinct is to send a quick message to the delivery company too, most often a short voice message on Telegram or Facebook Messenger.

That is still how most delivery bookings in Phnom Penh are made, and it creates a hidden cost: double work. The seller has already described the parcel once, by voice. Someone at the delivery company must then listen to each message, ask follow-up questions and enter every booking into the company's system by hand, one at a time. At Khmer Parcel, we work this way too. Each booking is handled twice, and every time a detail is retyped, a wrong address or a missing phone number becomes a little more likely.

My goal was twofold. Sellers should be able to book in seconds without leaving the app they already use, and every booking should reach our office in the same clear and complete format, ready to act on.

### Why Telegram, and not a new app

My first thought was the obvious one: build our own app. The AI and I quickly agreed that this would be the wrong choice, and the reasons are worth sharing, because they apply to almost any small business.

A new app must be discovered, downloaded, installed and trusted, and every one of those steps loses customers. Our sellers already had Telegram open from morning to night. So rather than asking them to come to us, we went to them. A **Telegram mini app** is a small application that opens *inside* Telegram with a single tap, with nothing to install.

**The principle:** meet your customers where they already are. Every additional step you ask of them is another reason for them to say no.

### Why a form, and not a conversation

Chat feels friendly, but it is a poor way to collect information, because nothing in a conversation ensures the details are complete. A short form does. It asks for the shop's name, phone number and pickup address, together with the details of each parcel, and it will not accept a booking until the essential details are present. It also remembers each shop's information for next time.

When the seller confirms, the booking appears in our office Telegram group within seconds, neatly formatted and labelled with a booking code. The seller receives the same code as confirmation.

The form is written in **Khmer first**, with short English beneath. That was not a matter of design; it was a matter of respect. Most of our sellers think and work in Khmer, and a form in their own language feels as though it was made for them, because it was.

The app also manages our launch offer automatically. Each seller's first three deliveries cost 2,000 riel, about $0.50, instead of the standard 3,000 riel, about $0.75, and the app keeps count for every Telegram account.

### Why free, and why simple

In Chapter 5, I described my rule: pay for growth only once the free version has proved itself. The booking app follows that rule completely. It runs on Cloudflare's free plan, with no server to rent and nothing to maintain. Its running cost is zero.

I also made one request that shaped the entire project: *I am not a programmer, so I must be able to update this myself.* The AI organised everything around that sentence. The finished app is a single file. When I need to change a price or a word, I make the change and paste that one file into Cloudflare. No installation, no technical team, no waiting.

**The principle:** build something you can maintain yourself. A tool that only a specialist can update will, sooner or later, stop being updated.

### Why it checks every booking

There was one feature I would never have thought to request, and it may be the most important of all.

Anything placed on the internet can, in principle, be misused. Someone could try to send fake bookings into our office group, wasting our riders' time or damaging our reputation. The AI raised this risk on its own initiative and built a safeguard: every booking carries a digital signature from Telegram, a kind of tamper-proof seal, and the app verifies that seal before accepting anything. A booking that does not come from a genuine Telegram user is quietly rejected.

**The principle:** whenever you build something public, ask the question a careful business owner would ask, and let the AI help you answer it: *"How could someone misuse this, and how do we prevent it?"*

### Why it does less than it could

In May 1997, answering questions from software developers at Apple's Worldwide Developers Conference, Steve Jobs said that "focusing is about saying no."³ I thought of those words often while building this app.

We could have added many more features, and we deliberately chose not to. Door-to-door customers continue to book through our website, so that the app can remain focused on online sellers. Our office still confirms each booking by hand, because the app is not yet connected to our website's delivery system. And because the offer is counted per Telegram account, our staff still check phone numbers for repeated use.

Writing these limits down protected me from promising more than the app could deliver, both to my customers and to myself.

### The moment it worked

Setting up the app took about twenty minutes, following a step-by-step guide the AI had written for me in plain language. Then came the test. I opened our bot, tapped the button, completed a booking and pressed confirm.

A few seconds later, the booking appeared in our office group: complete, clear and carrying its own booking code. I was genuinely surprised. Something I had described in plain words only days earlier was now working in front of me, inside the very app our customers use every day.

### What the journey has taught me

The finished app looks simple, and that is precisely the point. Building it, however, has already taught me lessons that reach well beyond this one project.

**Small details can halt everything.** Some setup steps failed for reasons that had nothing to do with the app itself, such as a single space in a password where spaces were not allowed. None of these problems was difficult once understood, but each could easily cost an hour. Every one of them now has its own line in the setup guide, so that it never happens twice.

**Your secrets are the keys to your shop.** The bot has a secret key, and whoever holds it controls the bot. I never share it in any chat or message, not even with an AI. It lives only in the protected settings of the service that uses it.

**Test before you trust.** The AI wrote automatic tests that verify the most important behaviour every time something changes: genuine bookings are accepted, fake ones are rejected, and the offer is counted correctly. I cannot read most of the code, but I can read a result confirming that every test has passed.

**Build once, use many times.** Because the app keeps its wording, prices and form fields in one place, it can be adapted for other businesses. A salon could use it for appointments, a café for orders, a tutor for class bookings.

**Technology is the easy part; habits are the hard part.** For both the seller and our office, a booking through the mini app takes far less time than a booking by chat. Yet speed alone rarely changes behaviour. Sellers have sent voice messages for years, and a habit that has served them well will not disappear simply because a better tool exists. Persuading them to try the app, and then to keep using it, will require patience, clear explanation and time. This is the first genuine challenge of the project, and it is a human one, not a technical one.

### Looking ahead

The booking app has only just been launched, and its real test lies ahead. Real customers will reveal challenges I have not yet imagined, and I intend to share them honestly in a future edition of this book.

What I can already say is this: a small business owner with no programming background described a daily problem in plain words, and within days had a working, secure and free tool that addresses it. Whether sellers embrace it is now a question of trust and habit, the oldest questions in business, and ones no AI can answer on our behalf.

> **Builder's Notes: Build your own booking mini app**
>
> *For readers who want to build their own version. Feel free to skip this box.*
>
> **Start with this message to Claude:**
>
> > My customers book [your service] by sending Telegram messages, and the details are often incomplete. I would like a Telegram mini app with a short form in [your language] that asks for [the details you need] and sends each booking to my staff group with a booking code. It should be free to run, easy for a beginner to update, and protected against fake bookings. Please explain each step simply, and write me a setup guide.
>
> **The six setup steps to expect** (about twenty minutes):
> 1. **Create the bot** with Telegram's official @BotFather account. It gives you a secret *token*; never paste it into any chat.
> 2. **Create a staff group**, and add the bot and your staff.
> 3. **Create a free Cloudflare Worker**, paste in the app's single file, and store the token and other secret values under Cloudflare's *Variables and Secrets*.
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

Spend a few minutes on social media and you will encounter the same promise again and again: let AI write your content, add a few affiliate links, and money will arrive while you sleep. The videos feature laptops on beaches and screenshots of earnings, and the message never changes: *passive income*.

I wanted to find out how much of that promise was true. Not by reading about it, but by testing it myself, honestly, with my own time and money, and then reporting exactly what happened. This chapter is that report.

In Chapter 4, I explained why I chose **affiliate marketing** and a blog about **kitchen gadgets under $30**: no stock, no shipping, free to join, a subject that never goes out of date, and products people buy without lengthy deliberation. The blog is called **Home Picks Under 30**. What follows is the story of how it was built, the reasoning behind each decision, and the results so far, including the uncomfortable ones.

### Why I finally tried

Many years ago, I first heard of people earning money online by selling on Amazon, or by becoming **affiliate marketers**: recommending products through articles or videos, and earning a small commission whenever a reader makes a purchase. Each commission is modest. Yet added together, month after month, such earnings can offer something genuinely valuable: an income that does not depend on a single employer, and with it a degree of independence.

For years, I never tried. The obstacles seemed too high for someone like me. I would have needed to write fluent articles in English, understand links and search engine optimisation, protect my privacy and security online, navigate the registration process and, above all, comply with Amazon's demanding rules. Each was a separate skill, and together they kept the idea permanently out of reach.

AI changed that. An AI agent can now help with almost every one of those obstacles: drafting the articles, building the website, explaining search engines in plain language, guiding the registration step by step, and checking every post against the rules. Barriers that stopped me for years are now low enough for a beginner to cross.

One point deserves to be made clearly. This blog is **not** aimed at customers in Cambodia. It is written in English for readers in Western countries, chiefly the United States, where millions of people shop on Amazon every day, and the commissions come from their purchases. In other words, a person in Phnom Penh can now build a small online business that serves customers on the other side of the world.

That is why I encourage more Cambodians to explore affiliate marketing, with their eyes open. As this chapter will show, the path holds real obstacles for people in our country, from receiving payments to advertising. But the opportunity is real, and AI has made it more accessible than ever before.

I also see this work as a window into the future. The world's largest online marketplaces, among them **Amazon**, **Alibaba** (through its Taobao and Tmall platforms), **JD.com**, **Walmart** and **eBay**, are already transforming the way goods are stored, packed and delivered. Amazon has tested humanoid robots in its warehouses and delivers some parcels by drone, while Walmart and JD.com have also operated drone delivery services. As robots and AI take on more of the physical work of commerce, the human roles that remain will increasingly involve understanding customers, creating trustworthy content and directing intelligent tools. Learning those skills today, even through a small blog, is one way of preparing for that future.

### What the machine does

Together with Claude, I built what I call a **content engine**. Three times a week, on Monday, Wednesday and Friday mornings, it starts on its own and performs the work of a small editorial team.

It selects a topic guided by the calendar: Halloween snacks in October, Thanksgiving cooking in November, gift ideas before Christmas. It writes a complete draft article in clear, helpful English. It prepares a "posting pack" on the same topic, with social media captions, short video scripts and a Pinterest description. And before I see a single word, it checks the draft against Amazon's rules and lists everything that needs correcting.

Once a post has been approved, the system goes further still. It builds the web page, compresses the photographs so that the site loads quickly on a phone, designs three different Pinterest images, and produces a short vertical video ready for TikTok, YouTube Shorts and Pinterest.

By mid-October 2026, the blog had **19 published posts** featuring **75 products**. ⭐ [Update these numbers before publishing.] Doing all of that by hand would have taken me weeks; the engine handled most of it in the background.

That part of the promise is true. **AI can produce content at a pace no single person can match.** But, as I was about to learn, producing content was never the difficult part.

### Is it written for humans?

Speed, however, raises an uncomfortable question: is content written by a machine genuinely **human-centred**? Does it reflect real experience and speak to the feelings and needs of the person reading it, or does it merely sound correct?

The question matters commercially as much as ethically. Google, which directs a large share of the world's web traffic, has stated publicly that it rewards helpful content written for people, and in 2022 it added **experience** to the qualities it looks for, alongside expertise, authoritativeness and trustworthiness.⁵ A blog filled with smooth but empty articles may be cheap to produce, but readers and search engines alike will eventually notice.

I therefore recommend a simple discipline: **score every AI-written post before publishing it.** Read it as your reader would, and award a mark from 1 to 10 for each of the following questions:

| Question | What a high score looks like |
|---|---|
| Does it solve a real problem for the reader? | The reader knows exactly what to buy, or not to buy, and why |
| Does it sound like a person rather than a machine? | Natural, specific and warm, free of empty phrases |
| Does it reflect real experience? | Practical details a real cook would notice, and honesty about what has not been tested |
| Does it respect the reader's feelings and budget? | No pressure, no exaggeration, and a choice for every budget |
| Would I trust it if I were the reader? | Clear disclosure, and no claims that cannot be supported |

Any post that scores below 7 on any question goes back for rewriting, together with my notes. Over time, these scores reveal where the AI is strong and where it needs more of my own experience and voice.

Yet the scores are only half of the assessment. The other half is the market's verdict. A good article should attract visitors, hold their attention and lead some of them to click through to Amazon and buy. Comparing my own scores with the real traffic between the blog and Amazon, from visits and clicks to, eventually, sales, shows whether my judgement matches what readers actually value. When the two disagree, the readers are right.

**The principle:** AI can write quickly, but only people can judge whether writing is genuinely helpful. Measure both your own honest assessment and your readers' behaviour.

### Why nothing goes live without me

The most important decision in this project was not technical at all. It was this: **the engine writes drafts, but only I can publish them.**

Every draft waits for my review. I read it, choose the products myself on Amazon, and send them to the AI one at a time. Only when I type "go" does it update the post. I then add a cover photograph and approve publication.

Why not allow it to publish automatically? Because a blog that recommends products is making a promise to its readers, and I am the one accountable for that promise. An AI can write a persuasive paragraph about a garlic press it has never touched. I can prevent it from pretending otherwise.

That is why every product note in my system says the same thing: *"Haven't used it yet."* The articles never claim that I have tested a product or that it has transformed my kitchen. They describe what the product is designed to do and what its listing states. It makes for less exciting reading, and far more honest reading.

**The principle:** automation can do the work, but responsibility cannot be automated.

### Why the rules are built into the machine

Amazon's affiliate programme has strict rules, and breaking them can cost you your account. You must disclose that you earn from qualifying purchases. You must not display prices that may change, nor copy star ratings and review counts. And you must not use Amazon's product images.

I could have tried to remember every rule each time. Instead, I asked the AI to build the rules into the engine itself. Every draft is checked automatically, and the report at the top of each posting pack tells me precisely what to correct: a missing disclosure, a price that has crept into the text, or a word such as "best" that I cannot substantiate.

The checker is not flawless. For a time, it accepted "under $30" yet flagged "under-$30", written with a hyphen, as an error. Even so, it catches far more than I would on a tired evening, and it never forgets a rule.

**The principle:** when the rules matter, do not rely on memory. Turn them into a checklist that the machine applies every single time.

### Why the calendar matters

One of the most valuable ideas in the project came from understanding how people use Pinterest. Many users plan well ahead, saving gift ideas and holiday recipes weeks or even months before the occasion. The engine therefore does not write about Halloween on Halloween. It writes about it in early October, and about Christmas gifts from mid-October onwards.

When I understood this, I brought our gift guide forward by more than two weeks, and the AI adjusted the publishing plan so that every new draft until mid-December would focus on gifts.

**The principle:** publish for the moment your reader begins searching, not for the moment the occasion arrives.

### The honest results

This is the part the videos about passive income never show.

By mid-October 2026, the blog had received almost no visitors from outside. The few early visits were largely my own, until I set the visitor counter to ignore my connection. Amazon's dashboard recorded a few dozen clicks on product links during the first month, many of them from my own testing. **The number of sales was zero.** ⭐ [Update with the latest figures from the weekly tracker before publishing.]

The project also encountered obstacles that no AI could solve, because they had nothing to do with technology.

**Getting paid.** Cambodia is not on Amazon's list of countries eligible for bank payments to affiliates, so any earnings can be paid only as Amazon gift cards until I have a working international payment account.

**Advertising.** I planned a small paid test on Pinterest to bring the first visitors to the gift guide. Pinterest's advertising platform, however, does not accept advertisers based in Cambodia. Registering under another country would have been dishonest, so we abandoned the idea.

**Community rules.** Some of the online communities where people ask cooking questions, including Reddit's large cooking forum, prohibit AI-written posts. The AI therefore gives me short ideas, and I write any answers myself, in my own words.

**A deadline.** Amazon requires new affiliates to make three qualifying sales within 180 days, or the account is closed. My deadline is the 30th of March, 2027.

None of this means the project has failed. It means the project is young. Pinterest can take weeks or months to deliver steady traffic, and search engines often take three to six months to trust a new website. Meanwhile, the strongest shopping season of the year, from Thanksgiving to Christmas, still lies ahead.

### What "passive income" really means

After two months, this is my honest conclusion.

The *production* can largely be automated. The *audience* cannot. No engine, however clever, can persuade strangers to trust a website they have never heard of. That trust is earned slowly: by publishing useful posts consistently, by sharing them where people are searching, and by never misleading the reader.

The work, then, did not disappear; it changed. Instead of writing every article myself, I now spend my time reviewing drafts, choosing products, pinning posts by hand and sharing short videos. It is far less work than doing everything manually. But it is not passive, and anyone who claims otherwise is usually selling something.

In his first letter to Amazon's shareholders, in 1997, Jeff Bezos placed one idea at the heart of the company's thinking, under the heading "It's All About the Long Term."⁴ It is a fitting thought for anyone building an affiliate website for Amazon. The engine allows me to keep showing up, three times a week, at very little cost. Whether that consistency becomes income is a question only time, and readers, can answer.

### Looking ahead

I will keep the engine running, keep publishing honestly, and keep recording the numbers every Monday. If the first sales arrive, I will explain how they came. If they do not, I will say so, together with everything I learned along the way.

> **Builder's Notes: Build your own content engine**
>
> *For readers who want to build their own version. Feel free to skip this box.*
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

In Cambodia, as in much of the world, attention now lives in short vertical videos on Facebook Reels and TikTok. Businesses that post regularly are seen; those that do not are soon forgotten. Yet video production is expensive. A professional editor or agency lay far beyond the budget of a business in its first month, and I had never edited a video in my life.

So I asked a different question: *could AI help one person produce a steady stream of short video advertisements, in Khmer, without a video editor?*

### Why build a video factory rather than use an app

Free video-editing apps exist, and many of them are excellent. So why build something of my own?

The answer lies in what a small business needs from its advertising. Every video must show **the same correct facts**: the same phone numbers, the same prices, the same offer and the same closing date. It must use **the same brand colours and fonts**, so that customers gradually learn to recognise us. And it must display **the Khmer script** properly, something many tools still struggle to do.

With an editing app, every new video means rebuilding those details by hand, and every rebuild is a fresh opportunity for error. So, together with Claude, I built a small **video factory** instead. Each advertisement is designed like a simple web page, composed of scenes containing text, shapes and movement. A web browser then plays each scene and records it frame by frame, and the frames are assembled into a vertical video of between thirty seconds and a minute, ready for Reels and TikTok. Every video carries a silent soundtrack, so that a voice-over or music can be added afterwards in the app where it is posted.

To create a new advertisement, I copy an earlier design, change the words and images, review a quick preview of each scene and render the final video. The facts, colours and fonts carry over automatically.

**The principle:** when consistency matters, build a template once, and let every future piece inherit it.

### What the first numbers told us

Our first paid advertisements ran for two days, at $5 a day, as we launched. Facebook's report was humbling:

- **2,546 views**, yet only **605** viewers watched for three seconds or longer
- An average viewing time of **four seconds**
- **57 clicks** through to our website
- **No bookings at all**
- And, unexpectedly, **four applications from people wanting to become riders**

There was more. Most viewers were **men aged 25 to 44**, whereas the online sellers we most wanted to reach are often **women aged 20 to 40**. And in our longer advertisement, viewers left in large numbers at the seventeenth second, precisely when the video switched from addressing door-to-door customers to addressing online sellers.

It would have been easy to feel discouraged. Instead, I treated the results as research findings, which is exactly what they were, and each number taught us something.

**An average of four seconds means the first frame is everything.** Most viewers decide almost instantly whether to keep watching. Every video now opens with its hook already on screen, with no empty first second.

**A drop at the seventeenth second means one message per video.** A video that tries to speak to two audiences loses both. We produced a shorter, 29-second version for door-to-door customers alone, and adopted a firm rule: one audience per advertisement.

**Four rider applications mean people were paying attention, just not the people we expected.** The advertisement reached job seekers more effectively than customers. That was not a failure; it was information about who was watching, and a reminder to target future advertisements with greater care.

The advertising pioneer David Ogilvy once wrote, "The consumer isn't a moron; she is your wife."⁶ His point was that advertising succeeds only when it respects the intelligence of its audience. Our numbers taught the same lesson in a modern form: people grant you a few seconds of their attention, and in return they expect a clear, honest message intended for them.

### Rules learned the hard way

Several of our most important rules grew out of small mistakes, each one caught by watching the finished videos with my own eyes.

**Emoji appeared as empty boxes.** The computer producing the videos had no means of displaying them, and the AI could not see the problem. Simple drawn icons now replace emoji in every video.

**Khmer must look right, not merely be present.** Khmer characters combine in complex ways, and the wrong font can break them apart. The factory now uses carefully chosen Khmer fonts, and I check every new video at full size.

**The screen is not entirely yours.** On Reels and TikTok, the app's own buttons and captions cover the bottom of the screen and part of its right edge. Important words and prices are now kept within a safe area in the centre.

**A single wrong digit can cost customers.** Our printed poster contained a wrong digit in one of our phone numbers. The poster is now always cropped, and the correct numbers are kept in one place, from which every video draws them.

**Never promise what the business has not decided.** Early ideas for advertisements included attractive promises we had not confirmed, such as same-day payouts for cash-on-delivery orders. The rule is now written into the instructions the AI follows: if I have not confirmed it, it does not appear.

**The principle:** AI makes production fast, but only a person watching carefully can catch what the machine cannot see.

### A video a day

Social media rewards consistency, so I set an ambitious goal of roughly one short advertisement every day. With the AI, I drew up a **thirty-day video calendar**, with a different idea for each day and each aimed at a single audience: a day in the life of an online seller, an explanation of how cash-on-delivery works, a light-hearted story about a rider searching for a house "near the pagoda", deliveries in the rainy season, packing tips for sellers, and a countdown to the end of our launch offer.

The honest truth is that the calendar is ahead of me. A plan for thirty videos is easy to write; producing, checking and posting them while running a new business takes real time. ⭐ [Update: how many videos from the calendar have been made and posted so far, and what you have learned from them.]

### A plan, not a promise

One video in our collection differs from all the others. It sells no delivery. Instead, it shares our vision: how AI is growing more capable, what AI cannot replace, such as human trust, care and local knowledge, and the stages through which we hope Khmer Parcel will grow.

We chose its words with care. The video presents **a plan, not promises**: it describes where we intend to go without claiming that we will certainly arrive. That distinction runs through every part of this book. Be ambitious in your plans, and honest in your claims.

### Looking ahead

The video factory has given a one-person business a capability that once required a team: producing clear, consistent, Khmer-first advertisements quickly and at almost no cost. What it cannot do is decide what to say, or guarantee that anyone will watch.

Those remain human tasks: understanding the customer, choosing one clear message, respecting the viewer's time and learning from every number. The machine makes the videos. The thinking remains ours.

> **Builder's Notes: Build your own video ad factory**
>
> *For readers who want to build their own version. Feel free to skip this box.*
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

The message was difficult to resist: let AI write the books, publish them on Amazon, and collect the money.

I saved screenshots of both videos and put a simple question to Claude: *how could I build an automated ebook system that would earn me an income?*

### The first answer was a warning

I expected a step-by-step plan. I received one, but it opened with a reality check.

The video, the AI pointed out, was an advertisement for a product. A royalty screenshot drawn from a catalogue of 232 books reveals very little about what a typical book earns, and most AI-written books earn very little indeed. Amazon asks authors to disclose AI-generated content, limits how many titles may be published each day, and removes books of poor quality. A machine that merely produces many books is not a business; it is a liability.

Only then came the plan. The AI outlined a pipeline of eight stages, from choosing a topic to publication, and marked clearly which stages a machine could handle and which required a person: **choosing the topic, editing every chapter, checking every fact and designing the cover**. It estimated that the AI writing for a single book would cost only a few dollars, and that a realistic monthly budget, covers included, would fall between $25 and $50. And when I asked how much I might earn, it offered scenarios rather than promises: a few dollars a month for weak books, perhaps a few hundred for a well-chosen, carefully edited series.

It was the least exciting answer I could have received, and precisely the one I needed.

### Three ideas, two failures

The most valuable lesson of this project came before a single chapter had been written.

**The first idea was a Phnom Penh travel guide.** It seemed ideal. I live here, I know the city, and Cambodia welcomes many visitors each year. The AI drafted an outline of fourteen chapters. Before writing a word, however, it asked me to test the demand: to search Amazon for "Phnom Penh travel guide 2026" and send it a screenshot of the results.

The results were sobering. There were only eleven books, most of them years out of date and each with a handful of reviews. When I sorted them by sales, it became clear that very few people buy guides to Phnom Penh on Kindle. The competition was weak, but so was the demand. As I wrote to the AI at the time, in my own words: "very small demand".

**The second idea was a guide to living in Phnom Penh.** The same search held a clue. A book about moving to the city, published in 2013, had attracted more reviews and commanded a higher price than the tourist guides. Perhaps expatriates were the better audience? Perhaps, but it remained a small market, likely to earn very little.

**The third idea was a book about AI, for readers everywhere.** Then I asked a different question: *why not write about AI itself, for readers all over the world?*

The next search told a very different story. There were dozens of books about AI for beginners and small businesses, some belonging to series of eleven or even twenty-one titles, with hundreds of reviews and "#1 Best Seller" badges. The demand was undeniable. So was the competition: many of the books looked alike, promising "bibles", "secrets" and easy money.

Yet within that crowded market, the AI identified a gap. Almost every book taught general tips and prompts. Almost none was written by a genuine small-business owner sharing **real projects, real costs and real mistakes**. I had four such projects.

That was how this book was born.

**The principle:** never fall in love with an idea before confirming that someone wants it. Five minutes of searching can save months of writing.

### A difficulty with my own story

One uncomfortable truth remained. My four projects had only just been built. The booking app had barely launched, the blog had made no sales, and the video calendar was only beginning. How could I write a book about results I did not yet have?

The answer reshaped the book. It would not be a book about income; it would be a **build journal**, recording how each tool was created, why each decision was made, what it cost, what went wrong and, honestly, what has and has not happened since. I began recording the figures every Monday in a simple tracking sheet, so that future editions can report real results rather than hopes.

**The principle:** if you cannot yet show results, show your process honestly. Readers forgive an absence of results far more readily than they forgive exaggeration.

### How this book is actually written

I should explain how these chapters came to exist, because the method is itself part of the lesson.

English is not my first language, so we developed a simple way of working. I send the AI my thoughts for each chapter as rough notes: memories, opinions, a story from my former job, sometimes in imperfect English and sometimes with a few words of Khmer. The AI turns them into clear prose. It uses only what I have given it, together with facts it can verify from my project notes and public sources. It never invents results, quotations or experiences, and wherever information is missing, it leaves a marked gap for me to complete rather than guessing.

I then read every chapter and correct it. Some corrections are small: a name, a date, a single word that did not feel right to me. Others are fundamental. After reading the first draft of Part Two, I told the AI that it felt too technical and too blunt, and that readers would not understand *why* any of it mattered. Together we rebuilt those chapters around stories and the reasoning behind each decision, and moved the step-by-step instructions into the Builder's Notes boxes at the end of each chapter.

The AI also protected me from my own first drafts. It kept my former employer anonymous, softened sentences that might have been unfair to real people, verified the source of every quotation, and told me whenever a well-known saying could not be traced to the person usually credited with it.

The American writer William Zinsser observed that "rewriting is the essence of writing well."⁷ This book has been rewritten many times, and every round has been a conversation between my experience and the AI's command of language.

**The principle:** the AI writes the words, but the experience, the judgement and the final decision belong to the author.

### The machine I planned, and the machine I needed

My original plan was an automated system: a program that would generate outlines and chapters on its own, ready for publication. I never built it, and I no longer wish to.

The machine I actually needed proved far simpler: **a conversation with an AI, supported by a few well-organised files**. One file holds the outline and the rules. Each part of the book is a draft that grows and improves with every round. A tracking sheet gathers the real figures, and a short note lists everything that must be checked before publication. Everything is saved, so that nothing is lost between sessions and every earlier version can be recovered.

Could a fully automated machine produce books faster? Certainly. But its books would be exactly the kind described earlier in this chapter: fast, cheap and indistinguishable from hundreds of others. The value of this book lies precisely in what a machine cannot supply: my experience, my mistakes and my judgement.

### What remains to be done

At the time of writing, this book is not yet finished. Ahead lie the final chapters, a full edit, updated figures from my projects, a cover, formatting for Kindle and the upload to Amazon, where, as Amazon requires, I will declare that AI was used to create the content. ⭐ [Update after publication: launch date, price, and early sales and reviews.]

Whether the book will sell, I cannot yet say. But it has already achieved something the advertisement on my phone never promised: it has turned a few weeks of real experience into something that may help others to begin.

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

---

## Notes

1. Widely attributed to Charles F. Kettering (1876–1958), American inventor and head of research at General Motors; no original source has been confirmed, and the line is sometimes also attributed to the philosopher John Dewey. See, for example, https://wist.info/kettering-charles/31082/
2. Warren Buffett, speaking to Salomon Brothers staff and in testimony to the US Congress, 1991. The wording varies slightly between sources.
3. Steve Jobs, question-and-answer session with developers at Apple's Worldwide Developers Conference, San Jose, 16 May 1997, when he was serving as an adviser to Apple. See TIME, https://techland.time.com/?p=135666, and Kottke, "Focus means saying no", https://also.kottke.org/15/10/focus-means-saying-no
4. Jeff Bezos, "1997 Letter to Shareholders", Amazon.com, Inc., section headed "It's All About the Long Term".
5. Google Search Central, "Our latest update to the quality rater guidelines: E-A-T gets an extra E for Experience", December 2022; and Google's guidance on creating helpful, reliable, people-first content.
6. David Ogilvy, *Confessions of an Advertising Man* (1963).
7. William Zinsser, *On Writing Well* (first published 1976).
