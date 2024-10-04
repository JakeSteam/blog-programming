---
title: Post-mortem of "BountyHour", an unfinished microcontracting marketplace
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  - Post-mortem
  - Next.js
  - Web
---

intro

## Links

- [Planning documents](https://github.com/BountyHour/bounty-hour-docs) (cited frequently in this article)
- [Codebase](https://github.com/BountyHour/BountyHour)

## What was BountyHour?

To quote the now public planning docs:

> Bounty Hour is a micro-contracting marketplace, loosely based on the "bug bounty" system. Development teams who are unable to solve an issue (bug / issue / feature) and require a specialist can submit a bounty, that specialists can pick up. The bounty is only paid out when (or if) the work is completed, and may be attempted by multiple specialists. Each specialist only has 24hr to complete a bounty, after which it is freed up for another.

Essentially, it was intended to be a way for specialised software engineers to use some of their spare time to pick up time-sensitive, extremely challenging bounties.

### Target audience

A key question for any new project is "who is it for?". Luckily, since I could potentially be both a bounty hunter & poster, writing the pitch was easy!

#### Bounty hunters

As a software engineer myself, making a service that _I_ wish existed was essential. I want to challenge myself, and getting paid for it is a nice bonus! As such, the "sales pitch" for bounty-hunting developers was simple:

> The vast majority of your job is probably building large new features or tidying up code. You might go entire weeks without actually doing anything new or challenging yourself.
>
> Why not spend an hour of your time to do something challenging, and get paid extra for it?

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
- **Bounty failing**, e.g. expiry, extension requesting, ability to add notes to failed bounties for the next attempter
- **Bonuses**, e.g. a 20% bonus payment if completed within 3 hours.
- **Feedback**, similar to eBay, e.g. communication, code quality, etc.

## How much progress was made?

Essentially:

- **Authentication**: The ability to signup, login (email, LinkedIn, or GitHub).
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

### Profile

I spent absurdly long on the profile editing, in pursuit of a _perfect_ form. Realistically this obsession to detail might have contributed to the project's demise, but I'm still extremely proud of all the features included in my 2nd-ever form!

- Client-side data validation, using the same schema definition(!) as the server, via "Zod".
- Monitoring of form "dirtiness", and only enabling the save button if there is new data. Additionally, only changed data is submitted.
- Per-field error handling, both client and server-side.
- Dynamically populated fields & tooltips.

All of this isn't ground-breaking, but it is above the usual standard you'd expect in a web form. It's definitely far above the MVP standard it perhaps should have been built to!

Dark mode was also implemented "perfectly" (well, in my eyes), with defaulting to system and the ability to override from any page. This page was of course as responsive as all others.

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

## Why was it abandoned?

### Scope

BountyHour is too big. Realistically it requires a whole team to even get started (especially due to the legal, financial, and customer support resources required), with no possibility of "scaling up" a single person idea.

Whilst I do still think the idea has massive potential, an Android engineer with a passing interest in web who just about knows the basics is not the guy to realise it! A better match would be an experienced web engineer who specifically has worked with payments, chat, and code management before.

### Expertise

### Interest

## What did I learn?

Well, the primary learning was the vast amounts of information around modern web development I gained!

Considering I went from zero knowledge, gaining hands-on experience creating new things with Next.js, Node.js, Prisma, TypeScript, Tailwind, tRPC, authentication, and Shadcn UI is so, so valuable. It now means I have some sort of reference point when looking at web-related libraries / projects.

Before starting I didn't really _get_ the Node stack, and utilities like [Theo's T3 Stack](https://blog.jakelee.co.uk/decision-paralysis-and-opinionated-guidance/) really helped jumpstart the learning experience. This was also my first time relying heavily on GitHub Copilot to help me with new topics, and it was absurdly powerful!

This was also my first time using Linear for project management, and it was good to experience it from a broader perspective than I experience in my day job. The project was small enough that a text file probably would have sufficed, but trying out new tools is always good!

[![BountyHour Linear](/assets/images/2024/bountyhour-linear.png)](/assets/images/2024/bountyhour-linear.png)

## Conclusion
