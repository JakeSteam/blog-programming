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

Essentially, it was intended to be a way for specialised software engineers to use some of their spare time to pick up time-sensitive, very challenging bug bounties.

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

## How much progress was made?

## What tech did it use?

## Why was it abandoned?

### Scope

### Expertise

### Interest

## What did I learn?

Well, the primary learning was the vast amounts around modern web development I learned! Considering I went from zero knowledge, gaining hands-on experience creating new things with Next.js, Node.js, Prisma, TypeScript, Tailwind, tRPC, and Shadcn UI is so, so valuable. It now means I have some sort of

## Conclusion
