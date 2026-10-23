<!--
OWNER CHECKLIST (delete before publishing) — Part Two draft v9, 23 Oct 2026
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
6. Quotes now have notes: Kettering (attribution unconfirmed), Buffett 1991, Jobs WWDC 16 May 1997, Bezos 1997 letter.
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

Scroll through social media for a few minutes and you will meet the same promise again and again: let AI write your content, add a few affiliate links, and money will arrive while you sleep. The videos show laptops on beaches and screenshots of earnings. The message is always the same: *passive income*.

I wanted to know how much of that promise was true. Not by reading about it, but by testing it myself, honestly, with my own time and money, and then reporting exactly what happened. This chapter is that report.

In Chapter 4, I explained why I chose **affiliate marketing** and a blog about **kitchen gadgets under $30**: no stock, no shipping, free to join, a topic that never goes out of date, and products that people buy without long hesitation. The blog is called **Home Picks Under 30**. What follows is the story of how it was built, the decisions behind it, and the results so far, including the uncomfortable ones.

### What the machine does

With Claude, I built what I call a **content engine**. Three times a week, on Monday, Wednesday and Friday mornings, it wakes up on its own and does the work of a small editorial team.

It chooses a topic, guided by the calendar: Halloween snacks in October, Thanksgiving cooking in November, gift ideas before Christmas. It writes a full draft article in clear, helpful English. It prepares a "posting pack" for the same topic: captions for social media, short video scripts and a Pinterest description. And before I ever see the draft, it checks the text against Amazon's rules and lists anything that must be fixed.

When a post is approved and published, the system does even more. It builds the page, shrinks the photos so the site loads quickly on a phone, creates three different Pinterest images and produces a short vertical video, ready for TikTok, YouTube Shorts and Pinterest.

By mid-October 2026, the blog had **19 published posts** featuring **75 products**. ⭐ [Update these numbers before publishing.] Doing all of that by hand would have taken me weeks. The engine did most of it in the background.

That part of the promise is true. **AI can produce content at a speed no single person can match.** But as you will see, producing content was never the hard part.

### Why nothing goes live without me

The most important decision in this project was not technical. It was this: **the engine writes drafts, but only I can publish them.**

Every draft waits for my review. I read it, I choose the products myself on Amazon, and I send them to the AI one at a time. Only when I type "go" does it update the post. Then I add a cover photo and approve the publication.

Why not let it publish automatically? Because a blog that recommends products is making a promise to its readers, and I am the one responsible for that promise. An AI can write a convincing paragraph about a garlic press it has never touched. I can stop it from pretending otherwise.

That is why every product note in my system says the same thing: *"Haven't used it yet."* The articles never claim that I tested a product, or that it changed my life. They say what the product is designed for and what the listing says. It is less exciting to read, and far more honest.

**The principle:** automation can do the work, but responsibility cannot be automated.

### Why the rules are written into the machine

Amazon's affiliate programme has strict rules, and breaking them can close your account. You must disclose that you earn from purchases. You must not show prices that may change, or copy star ratings and review counts. You must not use Amazon's product images.

I could have tried to remember all of this every time. Instead, I asked the AI to build the rules into the engine itself. Every draft is checked automatically, and the report at the top of the posting pack tells me exactly what to fix: a missing disclosure, a price that slipped into the text, a word like "best" that I cannot support.

The checker is not perfect. For a while, it accepted "under $30" but flagged "under-$30", written with a hyphen, as an error. But it catches far more than I would on a tired evening, and it never forgets a rule.

**The principle:** when the rules matter, do not rely on memory. Turn them into a checklist the machine applies every single time.

### Why the calendar matters

One of the most useful ideas in the project came from studying how people use Pinterest. Many users plan ahead, saving gift ideas and holiday recipes weeks or even months before the event. So the engine does not write about Halloween on Halloween. It writes about it in early October, and about Christmas gifts from mid-October onwards.

When I learned this, I moved our gift guide forward by more than two weeks. The AI adjusted the publishing plan so that every new draft until mid-December would focus on gifts.

**The principle:** publish for the moment when your reader is searching, not for the moment the event arrives.

### The honest results

Here is the part that the videos about passive income never show.

By mid-October 2026, the blog had received almost no visitors from outside. The few early visits were mostly my own, until I set the visitor counter to ignore my connection. The Amazon dashboard recorded a few dozen clicks on product links in the first month, many of them from my own testing. **The number of sales was zero.** ⭐ [Update with the latest numbers from the weekly tracker before publishing.]

The project also ran into obstacles that no AI could solve, because they had nothing to do with technology:

- **Getting paid.** Cambodia is not on Amazon's list of countries for bank payments to affiliates, so my earnings can only be paid as Amazon gift cards until I have a working international payment account.
- **Advertising.** I planned a small paid test on Pinterest to bring the first visitors to the gift guide. Pinterest's advertising platform does not accept advertisers from Cambodia. Registering under another country would have been dishonest, so we dropped the idea.
- **Community rules.** Some of the online communities where people ask cooking questions, such as Reddit's large cooking forum, ban AI-written posts. So the AI gives me short ideas, and I write any answers myself, in my own words.
- **A deadline.** Amazon requires new affiliates to make three qualifying sales within 180 days, or the account is closed. My deadline is the 30th of March, 2027.

None of this means the project has failed. It means it is young. Pinterest can take weeks or months to send steady traffic, and search engines often take three to six months to trust a new website. The best sales season of the year, from Thanksgiving to Christmas, still lies ahead.

### What "passive income" really means

After two months, this is my honest conclusion.

The *production* can be largely automated. The *audience* cannot. No engine, however clever, can make strangers trust a website they have never heard of. That trust is earned slowly: by publishing useful posts consistently, by sharing them where people are searching, and by never misleading the reader.

So the work did not disappear; it changed. Instead of writing every article myself, I now spend my time reviewing, choosing products, pinning posts by hand and posting short videos. It is far less work than doing everything manually. But it is not passive, and anyone who tells you otherwise is usually selling something.

In his first letter to Amazon's shareholders, in 1997, Jeff Bezos placed one idea at the centre of the company's thinking, under the heading "It's All About the Long Term."⁴ It is a fitting thought for anyone building an affiliate website for Amazon. The engine gives me the ability to keep showing up, three times a week, at very low cost. Whether that consistency turns into income is a question that only time, and readers, can answer.

### Looking ahead

I will keep the engine running, keep publishing honestly, and keep recording the numbers every Monday. If the first sales arrive, I will tell you how. If they do not, I will tell you that too, and what I learned.

> **Builder's Notes: Build your own content engine**
>
> *For readers who want to build their own version. Feel free to skip this box.*
>
> **Start with this message to Claude:**
>
> > I want to start a small affiliate blog about [your niche] for [your audience]. Please build me a system that, three times a week, suggests a topic, writes a draft article, prepares social media captions, and checks the draft against [the affiliate programme]'s rules. Nothing should be published until I approve it. I am a beginner: please use free tools where possible, explain each step simply, and write me a setup guide.
>
> **What the setup usually involves:**
> 1. **A free GitHub account** to store the project, run the schedule and host the blog (GitHub Pages).
> 2. **A Claude API key**, added to GitHub as a *secret*, so the engine can call Claude. This is billed by use, separately from your Claude subscription (see Chapter 5). Never paste the key into a chat.
> 3. **A settings file** where you write your niche, your audience, your language and your real affiliate links.
> 4. **A free visitor counter**, such as GoatCounter, to see real traffic.
>
> **Common traps:**
> - Exclude your own visits from the visitor counter, or your numbers will look better than they are.
> - Write the affiliate disclosure into every post and every social media description, before the first link.
> - Never use the store's product photos or copy its prices and star ratings. Use your own photos or free stock photos.
> - Never claim you have used a product unless you have.
> - Check every country rule early: payment methods, advertising platforms and programme deadlines may be different where you live.

---

## Notes

1. Widely attributed to Charles F. Kettering (1876–1958), American inventor and head of research at General Motors; no original source has been confirmed, and the line is sometimes also attributed to the philosopher John Dewey. See, for example, https://wist.info/kettering-charles/31082/
2. Warren Buffett, speaking to Salomon Brothers staff and in testimony to the US Congress, 1991. The wording varies slightly between sources.
3. Steve Jobs, question-and-answer session with developers at Apple's Worldwide Developers Conference, San Jose, 16 May 1997, when he was serving as an adviser to Apple. See TIME, https://techland.time.com/?p=135666, and Kottke, "Focus means saying no", https://also.kottke.org/15/10/focus-means-saying-no
4. Jeff Bezos, "1997 Letter to Shareholders", Amazon.com, Inc., section headed "It's All About the Long Term".
