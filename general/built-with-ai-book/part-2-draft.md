<!--
OWNER CHECKLIST (delete before publishing) — Part Two draft v4, 21 Oct 2026
1. Claude API is written as "about $10 a month" (owner's estimate). Replace with the real figure from
   console.anthropic.com → Billing once you have one or two months of bills.
2. The chapter now says Khmer Parcel's Facebook ad spend is a business cost, separate from the $31 toolkit
   (your notes show paid ads at $5–10/day). Check you are happy to mention it.
3. Chapter 6 is built from the project notes and this chat. Check every example happened as written,
   especially: (a) AI suggesting promises you had not confirmed (same-day COD payout), (b) the ad results
   (2,546 views, 57 clicks, 0 bookings) — OK to publish these real numbers? (c) your quoted chat messages.
4. Chapter 6: check the colleague story (⭐ marks: the engineer's languages; the second colleague's gender, and
   whether it was you). Chapter 7: add your first small Python win (⭐). Chapter 8: add the ⭐ parts
   (a real chat-booking problem, your feelings at the first test booking, which challenges you hit).
5. Quotes used: Kettering ("a problem well stated...", marked as "often credited"), Steve Jobs 1997 WWDC
   ("focusing is about saying no"), "trust, but verify" (a well-known saying).
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

### The engineer and the expert

Before I ever built anything of my own, I watched two former colleagues solve a problem together, and I did not fully understand what I was seeing until much later.

The first was a young engineer, freshly graduated in data and artificial intelligence from one of the leading private universities in Phnom Penh. He could write code, particularly in Python, and he worked side by side with AI tools. When the AI made a mistake, he could often find the broken line and repair it himself, which saved time and money that a beginner would have spent going around in circles. On paper, he was exactly the person a company needs for the age of AI. ⭐ [Check: Python and JavaScript, or Python and Java?]

Yet when he was asked to build an automated call plan for the sales team, a system to organise which customers each salesperson should call and when, he struggled. Not with the code, but with the work itself. He had never been a salesperson. He did not know how routes were planned in practice, which customers mattered most, or why a plan that looked perfect on a screen would fail on a real Monday morning.

The second colleague was the opposite. She had years of hands-on experience and understood the sales operation in every detail, but she had no coding skills and had never worked with AI. ⭐ [Check: was the second colleague a man or a woman, and was it perhaps you?]

Neither of them could solve the problem alone. Together, they could. The experienced colleague explained the real problems from the ground: what happens in the field, where plans break down, what the salespeople actually need. The engineer turned those explanations into instructions that he and the AI could act on. Over several weeks, as they shared their knowledge, their challenges and their lessons, the system began to work.

When I later began building with AI myself, I realised that I had been watching a small version of how AI itself learns. Large AI models are trained on enormous amounts of human experience, gathered and processed in data centres around the world. My colleagues were doing the same thing on a human scale: one person's experience was being translated into a form a machine could use.

That is the central lesson of this chapter, and perhaps of this book:

**Once you understand a problem from real experience, and can explain it in a way the AI understands, the solution is usually within reach.**

You do not need to be the engineer. With today's AI, you can be the expert, and let the AI play the engineer's role. But you must learn to explain. The rest of this chapter shows how I learned to do that, through mistakes and small discoveries in my own projects.

### Lesson 1: Describe the problem, not the solution

The American inventor Charles Kettering is often credited with saying that "a problem well stated is a problem half solved." I learned how true that is on my very first project.

When I began work on a booking system for Khmer Parcel, I had never heard of a "Telegram mini app". I didn't need to. Instead of naming a solution, I described the problem as I lived it: online sellers were sending us bookings in long chat messages, details were going missing, prices were being confused, and someone in the office had to type everything out a second time.

From that description alone, the AI proposed a solution I would never have imagined: a button inside our Telegram bot that opens a short booking form and delivers every booking to our office in the same clear format. Had I simply asked for "a website with a form", I would have received exactly that, and it would have been the wrong tool.

**Why it matters:** you know your customers; the AI knows the technology. When you describe the solution yourself, you limit the AI to what you already know. When you describe the problem, you invite it to bring everything it knows.

### Lesson 2: Give the AI a memory

In my first weeks, I kept repeating myself. Every new conversation with the AI started almost from nothing: it did not remember our prices, our phone numbers or the decisions we had made the day before. It felt like training a new employee every morning.

So I began doing what any good manager does when a new person joins the team: I wrote a **handover note**. Each project now has a simple text file that begins with the words *"Read this first in a new chat."* It records the facts that must never change, such as the launch date, the official contact numbers, the prices and the brand colours, together with what has been built and what has been decided. At the start of each session, the AI reads it, and within seconds it knows as much about the project as I do.

**Why it matters:** this is exactly what my two colleagues were doing for each other, only written down. The AI can only work with the experience you give it. A handover note is your experience, stored where the AI can always find it.

### Lesson 3: Set the rules before the work begins

AI is built to be helpful, and sometimes it tries too hard. When I asked for advertising ideas for Khmer Parcel, the first drafts were full of attractive promises, such as same-day delivery and same-day cash-on-delivery payouts, that I had not yet decided to offer. They sounded wonderful. They were also promises my young business might not have been able to keep.

That moment changed how I work. I wrote a short list of rules that the AI now reads in every session: never invent prices, offers or promises without asking me first; use only the official phone numbers, exactly as written; write all customer messages in Khmer first, with short English beneath; and speak to only one type of customer in each advertisement.

**Why it matters:** a broken promise can cost a small business its reputation in a single week. Rules written once protect you every day after, even on the days you are too busy to check every word.

### Lesson 4: Work in small steps, and approve before it acts

An AI agent can change dozens of files in seconds. At first, I found that exciting. Then I found it frightening, because when something went wrong, I could not tell which change had caused it.

So I slowed the AI down. For the blog, every draft now follows the same rhythm. I ask the AI to review the draft, and it reports what needs fixing. I choose the products myself and send them, one message at a time. The AI waits. Only when I type a single word, **"go"**, does it make the changes.

**Why it matters:** in my research career, every survey passed through checkpoints before its results reached management, because a mistake caught early costs almost nothing, while a mistake caught late can cost everything. The same is true with AI. Small steps are not slow; they are how you stay in control.

### Lesson 5: Show it real data, not just your opinion

Our first paid video ads for Khmer Parcel ran for two days at $5 a day. Facebook reported 2,546 views and 57 link clicks. The number of bookings was zero.

My first instinct was to guess: the price, the colours, the music. Instead, I did what my research training had taught me and looked at the data, this time together with the AI. It noticed that viewers were leaving at the seventeenth second, at exactly the moment the ad switched from one type of customer to another. The fix was simple: shorter ads, each speaking to one audience.

I followed the same discipline when choosing the subject of this book. My first idea, a Phnom Penh travel guide, felt like a sure thing. The Amazon search results I shared with the AI said otherwise: almost no demand. The data led me, step by step, to the book you are reading now.

**Why it matters:** this was the hardest lesson of my old job, and it applies just as much to AI. When leaders trust their opinions over their data, they miss the turn. AI is very good at reading data, but only if you are willing to show it, and willing to listen.

### Lesson 6: Tell it how you want to work

English is not my first language. In the beginning, I worried that the AI would not understand my simple, imperfect sentences, sometimes mixed with Khmer. It always did.

What made the biggest difference was telling the AI how *I* wanted to work. *"I am a beginner. Explain each step simply, and tell me exactly what to click."* *"Give me search ideas as plain text. I will choose the products myself."* *"Give me short points, not finished text. I will write it in my own words."*

**Why it matters:** a good colleague adapts to the way you work. So does a good AI, but only if you tell it. You do not need perfect words. You need clear intentions.

### Lesson 7: Check everything it makes

The old saying "trust, but verify" has never been more useful than it is with AI.

In our video ads, small picture symbols called emoji appeared as empty boxes, because the computer that produced the videos had no way to display them. The AI could not see the problem. I could, because I watched every video myself. On another occasion, we found a wrong digit in one of the phone numbers on our printed poster. One wrong digit means customers who cannot reach you. Since then, the correct numbers live in the handover note, and that poster never appears in our videos uncropped.

**Why it matters:** AI does the work quickly, but it does not care about your business the way you do. The final check must always be yours.

### Lesson 8: Let it say no

The best colleagues are not the ones who agree with everything. They are the ones who tell you the truth, even when you would rather not hear it.

When I planned a small advertising test on Pinterest, we discovered that its advertising platform did not accept businesses from Cambodia. One shortcut would have been to register under another country. The AI advised against it, and it was right: a business built on false details can be shut down overnight. And when I first saw the online videos promising that AI and Kindle publishing would work "like an ATM", the AI's first answer was a reality check, not a sales pitch.

**Why it matters:** an AI that only flatters you is dangerous. Ask it for the risks, and value it most when it says no.

### The real skill

When people ask me which skill matters most for working with AI, they expect a technical answer. My two former colleagues taught me otherwise.

The engineer had the technical skills. The experienced colleague had the understanding. What made their project work was the conversation between them. With today's AI, you can have that conversation yourself: **explain your real problems clearly, check what you receive honestly, and stay in charge of the decisions.** Managers, teachers, shop owners and researchers practise these skills every day. With AI, they become the skills that let you build.

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

### Why small comes first

When I was teaching myself data tools in my old job, I did not begin by automating the whole research process. I began with something tiny: a short piece of Python code, written by an AI, that did one small task I used to do by hand. ⭐ [Add: what was that first small script, and how did you feel when it worked?]

It was not impressive. Nobody in the company noticed. But it changed how I saw myself. For the first time, I had *built* something, and it worked. Every larger project I have attempted since grew from that moment of quiet confidence.

I believe this is how most people should begin with AI. Not with a grand plan, but with a small, useful win that you can finish in an afternoon, see working with your own eyes, and show to someone the same day.

### Why a price calculator

If you run a small business, think about the question your customers ask most often. For almost every business I know, it is the same: **"How much will it cost?"**

At Khmer Parcel, we answer that question many times a day. A tailor, a tutor, a caterer or a printing shop answers it just as often. Each answer takes a few minutes: asking for details, doing the calculation, writing a reply. And each answer is a chance to make a small mistake.

A **price calculator**, a simple web page where customers enter a few details and immediately see the price, solves that problem. It is small enough to build in about thirty minutes, yet useful enough to share with real customers. That is why I recommend it as your first project: it is quick, it is genuinely useful, and it teaches you the whole process of building with AI.

### The most important five minutes

The most important step happens before you open the AI at all: **write down how you actually calculate your prices**, in plain words. For example: *"A delivery costs $1, plus $0.25 for every kilometre after the first three. Large parcels cost $0.50 extra."*

This step matters because of everything we discussed in Chapter 6. The AI does not know your business. If you do not give it your pricing rules, it will either ask you, or worse, make something up. Your experience is the raw material; the AI only shapes it.

### The four-step cycle

Building the calculator follows four steps, and they are the same four steps behind every project in this book:

**Describe.** You tell the AI what your customers need and how your pricing works, just as you would brief a new assistant.

**Build.** The AI writes the page. Often it shows you a live preview straight away, so you can try it immediately.

**Test.** You use it the way a customer would, and compare every price with your own calculation on paper. If even one answer is wrong, you say so.

**Improve.** You ask for one change at a time: a bigger total for phone screens, prices in two currencies, a button that opens your Telegram. After each change, you test again.

The first version will rarely be perfect, and that is exactly the point. Improving it is where you learn to direct an AI. When something does not work, you do not need to understand the code. You simply describe what you see, as you would to a colleague, and ask the AI to explain and fix it.

### What you are really building

The calculator is not the real achievement. The real achievement is that you will have completed, from start to finish, the cycle of **describe, build, test, improve.**

Every project in the rest of this book, the booking app, the blog, the video ads and the ebook machine, is that same cycle, repeated with more patience. If you can build a price calculator, you have already learned the most important part.

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
> **3. Test and improve (15 minutes).** Check several prices against your own calculation. Then ask for one change at a time, for example:
> - "The total is hard to see on a phone. Please make it larger and place it at the top."
> - "Show the price in both my currency and US dollars."
> - "Add a button that opens my Telegram so customers can book straight away."
> - "When I enter zero kilometres, the price looks wrong. Please check the calculation and explain it to me."
>
> **4. Decide what's next (5 minutes).** Keep it for yourself, or ask Claude: "How can I put this page online for free?" and follow its steps.

---

## Chapter 8: Project One — A Telegram Booking App for My Delivery Business

### Where our customers already live

Khmer Parcel opened in Phnom Penh on the 1st of October, 2026. From the very beginning, I knew that our most important customers would be **online sellers**: people selling clothes, cosmetics and food through Facebook, TikTok and Telegram. A single regular seller may send five, ten or even twenty parcels a day. For a young delivery business, ten loyal sellers can mean the difference between surviving and growing.

Online sellers spend their whole day in their phones, answering customers in chat. So when they need a delivery, the natural thing is to send us a message too. And that is where the trouble begins.

Every seller writes differently. One sends the address but forgets the phone number. Another lists five parcels in a single long paragraph. A third sends a voice message from a noisy market. Someone in our office has to read every message, ask follow-up questions, and type the details out again. On a quiet day, that is manageable. On a busy day, it is where mistakes happen: a wrong address, a missed parcel, a disappointed customer. ⭐ [Add a real example: a booking that went wrong, or how long one booking took to handle by chat.]

I wanted two things. Sellers should be able to book in seconds, without leaving the app they already use. And every booking should reach our office in the same clear, complete format.

### Why Telegram, and not a new app

My first thought was the obvious one: build our own app. The AI and I quickly agreed it would be the wrong choice, and the reasons are worth sharing because they apply to almost any small business.

A new app has to be found, downloaded, installed and trusted. Every one of those steps loses customers. Our sellers already had Telegram open all day long. So instead of asking them to come to us, we went to them. A **Telegram mini app** is a small app that opens *inside* Telegram, with one tap, with nothing to install.

**The principle:** meet your customers where they already are. Every extra step you ask of them is a reason for them to say no.

### Why a form, and not a conversation

Chat feels friendly, but it is a poor way to collect information, because nothing in a chat makes sure the details are complete. A short form does. It asks for the shop's name, phone number and pickup address, and the details of each parcel. It does not let a booking through until the important details are there. And it remembers each shop's details for the next time.

When the seller presses the button to confirm, the booking appears in our office Telegram group within seconds, neatly formatted and labelled with a booking code. The seller receives the same code as confirmation.

The form is written in **Khmer first**, with short English. That was not a design detail; it was a decision about respect. Most of our sellers think and work in Khmer, and a form in their own language feels like it was made for them, because it was.

The app also handles our launch offer automatically. Each seller's first three deliveries cost 2,000 riel, about $0.50, instead of the usual 3,000 riel, about $0.75, and the app keeps count for each Telegram account.

### Why free, and why simple

In Chapter 5, I explained my rule: pay for growth only after the free version has proved itself. The booking app follows that rule completely. It runs on Cloudflare's free plan, so there is no server to rent and nothing to maintain. Its running cost is zero.

I also made one request that shaped the whole project: *I am not a programmer, so I must be able to update this myself.* The AI organised everything around that sentence. The finished app is a single file. When I need to change a price or a word, I make the change, and paste that one file into Cloudflare. No installation, no technical team, no waiting.

**The principle:** build something you can maintain yourself. A tool that only an expert can update will eventually stop being updated.

### Why it checks every booking

There was one feature I would never have thought to ask for, and it may be the most important one.

Anything placed on the internet can, in principle, be misused. Someone could try to send fake bookings into our office group, wasting our riders' time or damaging our reputation. The AI raised this risk itself and built a safeguard: every booking carries a digital signature from Telegram, a kind of tamper-proof stamp, and the app checks that stamp before accepting anything. A booking that does not come from a genuine Telegram user is quietly rejected.

**The principle:** whenever you build something public, ask the question that a careful business owner would ask, and that the AI can help you answer: *"How could someone misuse this, and how do we prevent it?"*

### Why it does less than it could

In 1997, Steve Jobs told a conference of software developers that "focusing is about saying no." I thought about that often while building this app.

We could have added many more features. We deliberately did not. Door-to-door customers continue to book on our website, so the app could stay focused on online sellers. Our office still confirms each booking by hand, because the app is not yet connected to our website's delivery system. And because the offer is counted per Telegram account, our staff still check phone numbers for repeated use.

Writing down these limits protected me from promising more than the app could deliver, to my customers and to myself.

### The moment it worked

Setting up the app took about twenty minutes, following a step-by-step guide the AI wrote for me in plain language. Then came the test. I opened our bot, tapped the button, filled in a booking, and pressed confirm.

A few seconds later, the booking appeared in our office group: complete, clear, with its own booking code. ⭐ [Add how you felt at that moment, and who you showed it to first.]

### What the journey taught me

The finished app looks simple, and that is the point. But the path to it taught me lessons that go far beyond this one project. ⭐ [Please mark which of these you experienced personally, and add any others.]

**Small details can stop everything.** Some of the setup steps failed for reasons that had nothing to do with the app itself, such as a single space in a password where spaces were not allowed. None of these problems was difficult once understood, but each could easily cost an hour. Every one of them now has its own line in the setup guide, so it can never happen twice.

**Your secrets are the keys to your shop.** The bot has a secret key, and whoever holds it controls the bot. I never share it in any chat or message, not even with an AI. It lives only in the protected settings of the service that uses it.

**Test before you trust.** The AI wrote automatic tests that check the most important behaviour every time something changes: genuine bookings are accepted, fake ones are rejected, and the offer is counted correctly. I cannot read most of the code. But I can read a result that says every test has passed.

**Build once, use many times.** Because the app keeps its words, prices and form fields in one place, it can be adapted for other businesses. A salon could use it for appointments, a café for orders, a tutor for class bookings.

### The first ninety days

⭐ [To be completed from the weekly tracker: bookings per week, number of sellers using the app, problems reported, and time saved in the office.]

> **Builder's Notes: Build your own booking mini app**
>
> *For readers who want to build their own version. Feel free to skip this box.*
>
> **Start with this message to Claude:**
>
> > My customers book [your service] by sending Telegram messages, and the details are often incomplete. I would like a Telegram mini app with a short form in [your language] that asks for [the details you need] and sends each booking to my staff group with a booking code. It should be free to run, easy for a beginner to update, and protected against fake bookings. Please explain each step simply, and write me a setup guide.
>
> **The six setup steps you can expect** (about twenty minutes):
> 1. **Create the bot** with Telegram's official @BotFather account. It gives you a secret *token*. Never paste it into any chat.
> 2. **Create a staff group** and add the bot and your staff.
> 3. **Create a free Cloudflare Worker**, paste in the app's single file, and store the token and other secret values in Cloudflare's *Variables and Secrets*.
> 4. **Connect the bot to the app** by opening the setup address the guide gives you, once, in your browser.
> 5. **Find your group's ID.** In a group, the bot only hears commands addressed to it by name, so type the command with the bot's username, for example `/chatid@YourBotName`.
> 6. **Test it** by making a booking yourself.
>
> **Common traps:**
> - The secret password linking Telegram to your app may contain only letters, numbers, dashes and underscores. No spaces.
> - Any feature that must remember the past, such as "first three orders discounted", needs a small storage space. Cloudflare offers one free (called *KV*); ask the AI to set it up.
> - Ask the AI for automatic tests, and run them before every update.
