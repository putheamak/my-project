<!--
OWNER CHECKLIST (delete before publishing) — Part Two draft v3, 20 Oct 2026
1. Claude API is written as "about $10 a month" (owner's estimate). Replace with the real figure from
   console.anthropic.com → Billing once you have one or two months of bills.
2. The chapter now says Khmer Parcel's Facebook ad spend is a business cost, separate from the $31 toolkit
   (your notes show paid ads at $5–10/day). Check you are happy to mention it.
3. Chapter 6 is built from the project notes and this chat. Check every example happened as written,
   especially: (a) AI suggesting promises you had not confirmed (same-day COD payout), (b) the ad results
   (2,546 views, 57 clicks, 0 bookings) — OK to publish these real numbers? (c) your quoted chat messages.
4. Chapter 7: the example prices (4,000 riel base, 1,000/km) are made up for readers. Fine, or use your real ones?
5. Chapter 8: fill in the ⭐ marks (a real chat-booking problem, your feelings at the first test booking,
   which challenges you personally hit) and the 90-day results later.
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

---

## Chapter 7: Your First Thirty-Minute Win

Reading about AI will only take you so far. Confidence comes from building something, however small, and watching it work. So before we look at my four projects in detail, I would like you to build one of your own.

In this chapter, you will create a **price calculator**: a simple web page where a customer enters a few details and instantly sees a price. It is small enough to finish in about thirty minutes, yet useful enough to share with real customers. Almost every business can use one, whether it is a delivery service charging by distance, a tailor charging by garment, a tutor charging by the hour, or a caterer charging by the guest.

You will not write a single line of code yourself.

### What you need

- A computer with a web browser
- Your Claude account
- Your own pricing, written down in plain words

That last item matters most. Before you open Claude, take five minutes to write down how you actually calculate a price. For example: *"A delivery costs a base fee of 4,000 riel, plus 1,000 riel for every kilometre after the first three. Large parcels cost 2,000 riel extra."* Use your real numbers. If your pricing is not yet decided, invent simple example figures and label them clearly as examples. As we saw in Chapter 6, the AI will not know your prices unless you tell it, and it must never guess them.

### Step 1: Describe the problem (about 5 minutes)

Open a new chat with Claude and describe what you need, as you would to a capable assistant. Here is a message you can adapt:

> I run a small [type of business] and customers often ask me how much something will cost. I'd like a simple one-page price calculator they can open on their phone.
>
> Here is how I calculate prices: [your pricing rules, in plain words].
>
> The page should ask for [the details you need, such as distance and parcel size], then show the total price clearly. Please write everything in [your language], with short English underneath. I am a beginner, so please make it a single HTML file I can open in my browser, and explain each step simply.

Notice what this message does. It describes the **problem** before the solution, states the **rules** explicitly, says **how you want to work**, and asks for the result in the simplest possible form: a single file.

### Step 2: Look at the result (about 5 minutes)

Claude will reply with the code for your page and, in many cases, a live preview you can try directly in the chat. If a preview appears, test it straight away. If not, copy the code into a plain text file, save it as `calculator.html`, and double-click it. It will open in your web browser like any other website.

Now test it the way a customer would. Enter a short distance, then a long one. Choose a large parcel. **Check every result against your own calculation on paper.** This is the habit from Chapter 6 in action: trust the AI to do the work, but check the work yourself.

### Step 3: Improve it in conversation (about 15 minutes)

Your first version will rarely be perfect, and that is exactly the point. Improving it is where you learn to direct an AI. Ask for one change at a time:

- *"The total is hard to see on a phone. Make it much larger and put it at the top."*
- *"Show the price in both riel and US dollars."*
- *"Add a button that opens my Telegram so customers can book straight away."*
- *"Use my brand colours: [your colours]."*
- *"When I enter 0 kilometres, the price looks wrong. Please check the calculation and explain it to me."*

After each change, test again. If something breaks, describe what you see in plain words, or paste the error message, and ask Claude to explain it and fix it. You do not need to understand the code; you need to describe the problem clearly.

### Step 4: Decide what's next (about 5 minutes)

You now have a working tool, built in conversation, in about half an hour. From here, you have three options:

1. **Keep it for yourself**, as a quick way to quote prices accurately.
2. **Share it with customers.** Ask Claude: *"How can I put this page online for free?"* It will guide you through a free hosting service step by step.
3. **Build on it.** A calculator is the first step towards a booking form, which is exactly how my next project began.

### What you have really learned

The calculator is not the real achievement. The real achievement is that you have now completed the full cycle that every project in this book follows: **describe, build, test, improve.** Every project you take on from here, however large, is simply that cycle repeated.

---

## Chapter 8: Project One — A Telegram Booking App for My Delivery Business

### The problem

Khmer Parcel launched in Phnom Penh on the 1st of October, 2026. From the beginning, I knew that our most valuable customers would be **online sellers**, people selling clothes, cosmetics and food through Facebook and Telegram. One regular seller can send five, ten or twenty parcels a day.

Online sellers live in Telegram. So, naturally, they wanted to book by sending us a message. But bookings arriving as chat messages are difficult to manage. Each seller writes differently. Addresses are incomplete, phone numbers are missing, and parcels are listed in a single long paragraph. Someone in the office has to read every message, ask follow-up questions, and type the details out again. As the number of sellers grows, so does the chance of a mistake. ⭐ [Add a real example: a booking that went wrong, or how long it took to handle one by chat.]

I wanted sellers to book in seconds, without leaving Telegram, and I wanted every booking to arrive in the same clear format.

### The solution

I described this problem to Claude, and together we arrived at a **Telegram mini app**: a small app that opens inside Telegram itself.

Here is how it works for a seller. They open our bot and tap the **Book now** button. A short form opens, in Khmer, asking for the shop name, phone number, pickup address and details of each parcel; several parcels can be booked in one pickup. When the seller presses the button to confirm, the booking appears in our office Telegram group within seconds, neatly formatted, with a booking code. The seller receives the same code as confirmation. The next time they book, the app already remembers their shop's details.

The app also handles our launch offer automatically. Each seller's first three deliveries cost 2,000 riel instead of the usual 3,000, and the app counts them for every Telegram account.

### How it runs, and what it costs

The app runs on **Cloudflare Workers**, using the free plan. There is no server to rent, no computer to keep switched on, and nothing to maintain. The entire app is built into **one file**, which I copy and paste into Cloudflare whenever something changes.

That single-file design was deliberate. As a non-programmer, I did not want a complicated installation process. I asked for something I could update by copying and pasting, and the AI organised the project around that requirement: the parts it works on are kept separately, and a small build step combines them into the one file I need.

Monthly cost of running the booking app: **nothing**.

### Setting it up

The setup took about twenty minutes, following a step-by-step guide the AI wrote for me in plain language:

1. **Create the bot** by talking to Telegram's official @BotFather account, which issues a secret key, called a *token*, for the bot.
2. **Create the office group** and add the bot and the staff to it.
3. **Create the app on Cloudflare**, paste in the single file, and store the secret values in Cloudflare's settings.
4. **Connect the bot to the app** by opening a special setup address once in the browser.
5. **Find the group's ID**, a number Telegram uses to identify the office group, so the app knows where to send bookings.
6. **Test it** by making a booking myself.

The first test booking arrived in our office group within seconds. ⭐ [Add how you felt at that moment, and who you showed it to.]

### Challenges and lessons learned

The finished app looks simple. The path to it taught me several lessons that apply far beyond this project. ⭐ [Please mark which of these you personally ran into, and add any others.]

**Lesson 1: Guard your secrets.** The bot's token is like the key to your shop. Anyone who has it can control your bot. The rule I follow now: never paste a token into a chat, a group, or a message to anyone, including an AI. Secrets belong only in the secure settings of the service that uses them, in my case Cloudflare.

**Lesson 2: Assume someone will try to cheat.** A booking form on the internet can, in principle, be filled in by anyone, including someone trying to post fake orders into the office group. The AI built in a safeguard I would never have thought to request: every booking carries a digital signature from Telegram, and the app checks that signature before accepting anything. A booking that does not come from a genuine Telegram user is simply rejected. The app also cleans up anything a user types before it reaches the office group. The lesson: when you build something public, ask the AI directly, *"How could someone misuse this, and how do we prevent it?"*

**Lesson 3: Small details can stop everything.** Some steps failed for reasons that had nothing to do with the app itself. In a Telegram group, for example, a bot only receives commands that are addressed to it by name, so the command to find the group's ID has to include the bot's username. The secret password used to connect Telegram to the app may only contain letters, numbers, dashes and underscores; a single space breaks it. Neither problem is difficult once you know, but either can waste an hour if you don't. Each one now has its own line in the setup guide, written so I never face it twice.

**Lesson 4: An offer needs a memory.** To count each seller's first three discounted deliveries, the app has to remember who has already booked. That requires a small storage space, which Cloudflare also provides free of charge. Without it, every customer would see the discounted price forever. The lesson: whenever a feature depends on *what happened before*, ask where that history will be kept.

**Lesson 5: Test before every change.** The AI wrote a set of automatic tests that pretend to be Telegram and check the important behaviour: genuine bookings are accepted, fake ones are rejected, and the offer is counted correctly. Before any updated version goes live, the tests run first. I cannot read most of the code, but I can read a test result that says everything passed.

**Lesson 6: Be clear about what it does not do yet.** The first version is deliberately limited. Our office still confirms each booking by hand, because the app is not yet connected to the website's delivery system, so automatic tracking codes will come later. Because the offer is counted per Telegram account, staff still check phone numbers for repeated use. And door-to-door customers continue to book on our website, a decision we made on purpose to keep the app focused on online sellers. Writing these limits down protected me from promising more than the app could deliver.

**Lesson 7: Build once, reuse many times.** Because the app is a single file with its text, prices and fields kept in one place, it can be reused. A salon could turn it into an appointment form, a café into an order form, a tutor into a class booking form. Each needs only a new bot, a new Cloudflare app and a new group.

### The first ninety days

⭐ [To be completed from the weekly tracker: bookings per week, number of sellers using the app, problems reported, and time saved in the office.]

### Build your own version

If your customers already talk to you on Telegram, a booking mini app may be the most valuable tool you ever build. Start with the conversation pattern from Chapter 6:

> My customers book [your service] by sending Telegram messages, and the details are often incomplete. I'd like a Telegram mini app with a short form in [your language] that asks for [the details you need] and sends each booking to my staff group with a booking code. It should be free to run, easy for a beginner to update, and protected against fake bookings. Please explain each step simply, and write me a setup guide.

Then follow the cycle you practised in Chapter 7: describe, build, test, improve.
