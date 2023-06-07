---
title: An example of onboarding process & documentation for remote developers joining a specialised team
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - Remote
    - Onboarding
---

Onboarding engineers to a project is hard. Especially if you're in a small team (e.g. Android developers) without a whole HR framework, and instead have to make up your own processes! I've onboarded tens of engineers (and been onboarded of course), so here's a few mistakes I've learned from, and my current preferred approach for onboarding new engineers.

Importantly, I am excluding all company-wide onboarding. For example, GDPR training, company history, all of that is completely out of scope. I'll only cover the onboarding into an actual software team, not the company itself.

## Previous approaches

Before I get into the approach I went for, there's been a few previous approaches that didn't work too well:

### Nothing structured

Although it wasn't exactly planned... I've been on both sides of an essentially non-existent onboarding process. Whilst this isn't the end of the world for more senior engineers who can hunt most information down themselves, more junior / quieter ones may struggle. A few months of drip-fed learning might transfer as much information as a week of planned onboarding.

This is probably the worst option possible, but the one most teams will fall into by default. Uh-oh!

### Too many meetings

Having multiple, multi-hour "onboarding" calls / screen shares in the first few days ensured the new joiner was exposed to everything they needed... but did they absorb any of it? Whilst this is undoubtedly better than having no onboarding at all, it has a few risks.

I found new joiners totally understood everything whilst in the calls, but didn't really retain much of it. A good example of this is technical onboarding: whilst having 1hr of general project architecture followed by 1hr of looking into the actual code is efficient, it's overwhelming. The key points at the start will be totally lost by the end, regardless of how many notes the new joiners is making.

It's also very hard for the new starter to refer back to missed bits and pieces later, besides asking someone to repeat themselves. This is a lot of wasted time and effort on both sides. Finally, new joiners are often focusing quite a bit on making sure their new employer / colleagues like them, so are socialising as much as learning. Not ideal!

### Too much documentation

An alternative approach to this fully synchronous approach of all meetings is fully asynchronous: all documentation.

All teams struggle with documentation, but almost all have at least a "semi-useful" knowledge base / wiki / notion / confluence / etc. This can be leaned on heavily for onboarding new starters, and will ensure they have access to all information at any time, and can easily refer back to it.

The trade-off with this approach is essentially the opposite of [too many meetings](#too-many-meetings). Whilst the starter will have all the information they could ever need, they won't know what they need to know. With a flood of hundreds of pages, how can the new starter know what they need? 

I typically provided 5-10 "starter" pages for them, but this changed over time, and the documentation base of course suffered all the usual issues of being out of date, unmaintained, misleading, etc. Additionally, this approach requires entirely on the joiner being very self-sufficient, finding out for themselves what they need to find out, etc.

## Priorities

Okay, so I know what didn't work. What should my approach have?

1. **Primarily (but not entirely) asynchronous**: The joiner should be able to refer to information whenever they need to, but also be guided through a "narrative" of the app, and advised where to look.
2. **Always up to date information**: The documentation should be useful for *everyone*, not just the new joiner. This way it's in everyone's best interests to maintain it.
3. **Guided, with flexibility**: The new starter should never feel lost, but should have the freedom to dive deeper into areas that interest them.

Here's what I went for:

* Async (with sync for catchups)
* Useful for all members
* Always up to date
* Time boxed (doing x per day)
* Clear, not overwhelming
* Mention docs for developers book!

maybe mention learning styles, how I massively prefer written info

## Day by day

The onboarding should be guided, with a clear set of goals and information for each of the first few days.

Information like team members, office information, company systems are split into a day-by-day basis, and this is the main source for this information. As such, these pages are useful to (and maintained by) all existing employees too!

I used Notion for this, but any documentation site works.

### Day 1: Product & Team

The first day isn't at all technical, it's all about the product itself and the team. As such, the goals are:

1. Have access to all required systems (e.g. Slack, Email, JIRA)
2. Know where & when to talk to people (e.g. team Slack channels, agile ceremonies)
3. Have introductory sessions with Product & Design representatives.

Whilst this may seem like almost nothing on a first day, that's by design! If the new joiner has capacity they can dive deeper into areas they want to get ahead on, or even just socialise more. There's a million new things to learn, there's no need to front-load all the information.

To that end, here's the documentation included in Day 1:

#### Team

Everyone in the team, where they are, what they do, any other relevant information. 

Emojis are great for making this a bit more friendly and compact, although be careful how many people you count as part of "the team". We're close to 20, and that's definitely a limit. For ours, I tried to use horizontal space to represent different "sub-teams", and vertical space to represent different "specialisms":

[![](/assets/images/2023/onboarding-team.png)](/assets/images/2023/onboarding-team.png)

Of course, this would be much tidier if everyone had similar length names, and I could figure out a clear emoji for "Product Design" or "Backend"! Linking to any official org chart also lets people "double check" the company's structure, whilst also finding out who manages the managers etc.

#### Locations

Depending on how in-person your team is, office information might be essential. This doesn't need to be a detailed history of the company offices etc, but each of 3 locations have a page containing this information:

* **Floor plan**: People forget where meeting rooms / bathrooms are!
* **Facilities**: If there is a gym, bike rack, shower, document them.
* **Meeting rooms**: How can a meeting room be booked? Where are they located?
* **Building-specific info**: If there's a smoke alarm test every other Monday, document it. If there's an entry door code, document it.

#### Systems

As mentioned, the new starter likely needs access to a surprising amount of company & team specific systems. Whilst many of these will be controlled by Single Sign-on or other in-house systems, they still likely need documentation on how they work.

Even though most people will have experience with common systems like Firebase and JIRA, there will be specific quirks that should be documented. This might be how to gain access, how to workaround a bug, etc. Note that this documentation can (and should) be reused whenever non-team members also need basic training in a system.

The new starter probably won't need these systems initially, but they should know what they are, what they do, and where they are. 

#### Communication channels

Finally, they also need to know the formal and informal discussions areas. Teams often have a subteam channel, a speciality channel, a formal discussion channel, a casual discussion channel, and many, many more. New starters will often need 100+ channels, so a brief description & categorisation of these will help the newcomer know what can be safely muted!

[![](/assets/images/2023/onboarding-slack-thumbnail.png)](/assets/images/2023/onboarding-slack.png)

### Day 2

### Day 3

## Meetings

* Product
* Design
* Software

## Improvements to make

* Overwhelming w/company onboarding, underwhelming if used alone