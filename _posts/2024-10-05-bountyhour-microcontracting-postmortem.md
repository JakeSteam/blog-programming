---
title: A post-mortem of "BountyHour", an unfinished microcontracting marketplace using Next.js, tRPC, and Prisma
image: /assets/images/banners/bountyhour.png
tags:
  - Post-mortem
  - Next.js
  - Web
  - TypeScript
---

Like every developer, I have plenty of ideas, most of which never get beyond the planning stage! BountyHour was one of them that made it into proper development, and was then abandoned. So, what happened?

## Links

- [Planning documents](https://github.com/BountyHour/bounty-hour-docs) (cited frequently in this article)
- [Codebase](https://github.com/BountyHour/BountyHour)
- [Placeholder site](https://bountyhour.com) (expires soon, apologies if someone else reuses it!)

## What was BountyHour?

To quote the now public planning docs:

> Bounty Hour is a micro-contracting marketplace, loosely based on the "bug bounty" system.
>
> Development teams who are unable to solve an issue (bug / issue / feature) and require a specialist can submit a bounty, that specialists can pick up.
>
> The bounty is only paid out when (or if) the work is completed, and may be attempted by multiple specialists. Each specialist only has 24hr to complete a bounty, after which it is freed up for another.

Essentially, it was intended to be a way for highly skilled software engineers to use some of their spare time to pick up time-sensitive, extremely challenging bounties.

### Target audience

A key question for any new project is "who is it for?". Luckily, since I could potentially be both a bounty hunter & poster, writing the pitch was easy!

#### Bounty hunters

As a software engineer myself, making a service that _I_ wish existed was essential. I want to challenge myself in my spare time, and getting paid for it would be a nice bonus! As such, the "sales pitch" for bounty-hunting developers was simple:

> The vast majority of your job is probably building large new features or tidying up code. You might go entire weeks without actually doing anything new or challenging yourself.
>
> Why not spend an hour of your time to do something challenging, and get paid extra for it?

People already do this for internet points on StackOverflow, doing essentially the same for pay should be an easy sell.

#### Bounty posters

The other side of the equation is those posting the bounties. This was envisioned as software teams (or their managers) that are irredeemably stuck on a problem. I hadn't decided if I'd encourage employees to outsource their own work, as whilst this would drastically increase the number of bounties... it would likely break contracts!

> Got a problem that's been plaguing you for months, and nobody on the team seems able to solve it? Instead of hiring a contractor for a week and hoping you get lucky, put out a BountyHour. Review verified experts, choose your requirements, and post. No fix, no fee.

#### Investors / employees

Finally, assuming the original business plan takes off and bounties are being posted & solved, the eventual expansion was considered somewhat. As a "middleman", similar to eBay for sales, the overheads should be relatively low. Additionally, software engineers with time / money to spare are likely a very appealing advertising target!

> Low risk, as BH is just a middleman. Low overheads, high scalability. Ability to cross-sell / upsell easily to high-wealth individuals.

### Unique offering

Since almost every tech idea pitching for investment will be asked variations of "OK, but what makes this idea different?", I made a few initial notes:

> 1. **Scope**: BountyHour is only for solving bugs, crashes, and problems. It's not for general software development.
> 2. **Private**: Bounties have public metadata, but any detailed data is only shown to potential hunters, and code is only shown to an assigned hunter.
> 3. **All in one**: Code management, communications, and payments all within the platform.
> 4. **Hunters**: Instead of independent freelancers trying to earn a living, BountyHour mostly uses already employed people looking for an extra challenge.

### Features

As with any personal project, the potential scope creep was giant. In addition to the basic idea of listing & claiming bounties, BountyHour would have had:

- **Escrow payments**, e.g. taking payment upfront, handling tax implications for all involved, adding ability to donate bounties to charity.
- **Company verification**, e.g. BountyHunters connecting their LinkedIn with verified emails allowing them to be listed automatically as "Mobile Engineer with 3 years Meta experience" etc.
- **Bounty types**, e.g. a bounty might be a "snippet", a GitHub repo (fully integrated with BountyHour), Dropbox, or a plain old zip file.
- **Bounty failing**, e.g. expiry, extension requesting, ability to add notes to failed bounties for the next attempter.
- **Bonuses**, e.g. a 20% bonus payment if completed within 3 hours.
- **Feedback**, similar to eBay, e.g. communication, code quality, etc.

## How much progress was made?

Essentially:

- **Authentication**: The ability to signup & login (via email, LinkedIn, or GitHub).
- **Profile Settings**: The ability to customise your name, privacy settings, timezone, etc.
- **Appearance Settings**: Full light & dark theme support, plus full responsiveness on all pages.
- **View Bounties**: An absurdly customisable list of assigned / created bounties.

I'll go into these all briefly, as a reminder all the source code is [in the repo](https://github.com/BountyHour/BountyHour).

### Authentication

This uses [NextAuth.js](https://next-auth.js.org/) to handle authenticating via GitHub (useful for code management), LinkedIn (useful for employer information), or email. Magic links are used for email, with [Mailtrap](https://mailtrap.io/) suitable for my very limited dev usage.

Authentication is famously hard, and honestly I'm pretty happy with my final result. It did exactly what I wanted, for free, with minimal code to maintain. There were some... interesting headaches around the OAuth implementation, but it got there in the end!

|                                                Login                                                |                                                  Login (mobile)                                                   |                                                     Login (mobile, light)                                                     |
| :-------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/bountyhour-login-thumbnail.png)](/assets/images/2024/bountyhour-login.png) | [![](/assets/images/2024/bountyhour-login-mobile-thumbnail.png)](/assets/images/2024/bountyhour-login-mobile.png) | [![](/assets/images/2024/bountyhour-login-mobile-light-thumbnail.png)](/assets/images/2024/bountyhour-login-mobile-light.png) |

### Settings

I spent absurdly long on the profile editing, in pursuit of a _perfect_ form. Realistically this obsession to detail might have contributed to the project's demise, but I'm still extremely proud of all the features included in my 2nd-ever form!

- Client-side data validation, using the same schema definition(!) as the server, via "Zod".
- Monitoring of form "dirtiness", and only enabling the save button if there is new data. Additionally, only changed data is submitted.
- Per-field error handling, both client and server-side.
- Dynamically populated fields & tooltips.

All of this isn't ground-breaking, but it is above the usual standard you'd expect in a web form. It's definitely far above the MVP standard it perhaps should have been built to!

Dark mode was also implemented "perfectly" (well, in my eyes), with defaulting to system preferences and the ability to override from any page. This page was of course as responsive as all others.

|                                           Profile information                                           |                                                   Saving profile                                                    | Appearance                                                                                                                    |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------- |
| [![](/assets/images/2024/bountyhour-profile-thumbnail.png)](/assets/images/2024/bountyhour-profile.png) | [![](/assets/images/2024/bountyhour-profile-saved-thumbnail.png)](/assets/images/2024/bountyhour-profile-saved.png) | [![](/assets/images/2024/bountyhour-profile-appearance-thumbnail.png)](/assets/images/2024/bountyhour-profile-appearance.png) |

### Bounties

Another case of "pursuing perfection at all costs", this table listed all bounties created or assigned to the user. However, again, it had enough features to make it extremely high quality:

- Sort by any field
- Filter by any field, including Enum (status) or Date-based (updated, e.g. "in last week")
- Hide fields
- Fulltext search fields
- Pagination, including customisable rows per page.

Whilst these features were primarily implemented already by shadcn-ui, putting all the pieces together in a generic way, only requiring the data and headers to be passed in by the developer, was tricky!

[![](/assets/images/2024/bountyhour-profile-bounties.png)](/assets/images/2024/bountyhour-profile-bounties.png)

## What tech did it use?

Since BountyHour used T3 as a starting point, all the tech choices were pretty standard:

- [TypeScript (Language)](https://www.typescriptlang.org)
- [Next.js (Framework)](https://nextjs.org)
- [NextAuth.js (Authentication)](https://next-auth.js.org)
- [Prisma (ORM)](https://prisma.io)
- [Tailwind (CSS)](https://tailwindcss.com)
- [tRPC (API)](https://trpc.io)

This was my first time using _any_ of these, so it took a while to figure out exactly which bit did what! However, by the end of it I was relatively confident in at least understanding an implementation of these, and making minor changes.

I've [written about this in detail before](/decision-paralysis-and-opinionated-guidance/), but having someone more knowledgeable provide a solid starting point was the only way this project made any progress at all. The choices all seemed to align with my priorities, and if I'd had to pick each library by myself it would have taken months to even make the first commit!

## Why was it abandoned?

### Scope

BountyHour is too big. Realistically it requires a whole team to even get started (especially due to the legal, financial, and customer support resources required), with no possibility of starting small then "scaling up" (since the core functionality requires all the complexity).

Whilst I do still think the idea has massive potential, an Android engineer with a passing interest in web who just about knows the basics is not the guy to realise it! A better match would be an experienced web engineer who specifically has worked with payments, chat, and code management before.

There's also the consideration that all of the technical parts I struggle with (e.g. actually building messaging, payments, etc) aren't hard or novel, they're just new to me. As such, it's entirely possible another company (or individual) could have the same idea, and be up and running months before me, with a higher quality product.

### Expertise

I'm an Android software engineer who knows about a bit about the web, not an expert web developer! Building BountyHour would have required excellent implementations of payments, tax, code control, timing systems, authentication, and a whole collection of non-technical skills that I just don't have.

During development, I could envisage a world where I eventually finished a functioning site, but... would I be able to actually run it? If there were issues with payments, could I sort them? Probably not! There's also the fear of the site being used for money laundering, tax evasion, or countless other things that require an entire legal department to handle. Terrifying.

Also... security. I didn't feel confident enough in my code to be sure that any payments logic would be immune to attack, that exploits wouldn't exist all over the place, or even that private customer data (financial or personal) would be safe. The internet is a dangerous place, and it needs experienced people handling security, not tourists like myself.

Whilst I could just about get the expertise for a previous startup ([Creators.Direct](/7-lessons-from-a-decade-in-tech/#2017---2018-creatorsdirect)), that was primarily an app that also had a web component. BountyHour would be entirely web, with any app coming far later and being non-essential.

As mentioned in scope, a better web engineer / company could get this done far quicker, so it actually makes far more sense to just contract someone else to do... all the work. At that point though, what's my purpose, just the "ideas guy"!? Anyone can do that, without any technical experience.

### Interest

Unfortunately my interest in handling a project of this scale dwindled once I saw... the scale. If I had infinite free time I could probably keep going, but the opportunity cost of other potential projects was way too high.

I also essentially lost interest in most web development once I "got it", with Android dev being far more enjoyable, understandable, and logical for me personally. If I was coming from a background of not knowing much about software, web development could definitely have held my interest. However, coming from an expertise in a totally unrelated area, spending 6-7+ years learning web to the same level I know Android was not an appealing concept!

Despite _thinking_ about the project a lot, I only [actively committed to it on 14 days](https://github.com/BountyHour/BountyHour/commits/main/), across a 1 month span. That really isn't much, despite it still living on in my head 9 months later.

## What did I learn?

Well, the primary learning was the vast amounts of information around modern web development I gained!

Considering I went from zero knowledge, gaining hands-on experience creating new things with Next.js, Node.js, Prisma, TypeScript, Tailwind, tRPC, Next.js Authentication, and Shadcn UI is so, so valuable. It now means I have some sort of reference point when looking at web-related libraries / projects.

Before starting I didn't really _get_ the Node stack, and utilities like [Theo's T3 Stack](/decision-paralysis-and-opinionated-guidance/) really helped jumpstart the learning experience. This was also my first time relying heavily on GitHub Copilot to help me with new topics, and it was absurdly powerful!

Additionally, this was my first time using Linear for project management, and it was good to experience it from a broader perspective than I experience in my day job. The project was small enough that a text file probably would have sufficed, but trying out new tools is always good!

[![BountyHour Linear](/assets/images/2024/bountyhour-linear.png)](/assets/images/2024/bountyhour-linear.png)

Finall, this was my first time handling the project structure for a system with a site, API, components, developer tools, etc, and keeping track of the ~100 actively modified files required. I'm happy the repository seemed "tidy", without all the clutter and dead code that a first project typically includes. Everything felt logical, I understood what it all did, and felt confident in changing anything.

## Conclusion

Software development is hard. Starting a new company is hard. Doing both in an area you don't really have expertise is very very hard (and maybe foolish). Even with all the help possible (Copilot for learning, Shadcn UI for design), it's too much for one person.

Realistically I massively enjoyed the BountyHour building experience, and I'm extremely grateful I admitted defeat before spending multiple years building a doomed project. The now open-source code might help someone eventually, especially the form handling, most likely myself in a few years when I need to understand similar code!

I hope something like BountyHour exists eventually, since I strongly believe highly skilled software engineers solving seemingly unsolveable problems is mutually beneficial for both the problem haver and the problem solver. I could absolutely see myself on both sides of that relationship, if you know of anything similar on the market let me know!

Hopefully this short post-mortem was helpful in some vague way, despite essentially being a way for me to say goodnight to BountyHour just before the domain's expiry. Goodbye, BountyHour!
