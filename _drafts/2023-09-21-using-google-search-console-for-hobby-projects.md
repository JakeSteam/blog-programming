---
title: Using Google Search Console to effortlessly monitor small hobby projects
author: Jake Lee
layout: post
image: /assets/images/2023/google-search-console.png
tags:
    - Google Search Console
    - Web
---

Like a lot of developers, I've somehow ended up with a collection of mini-projects online that require no maintenance, are missing a few features, but still get some Google traffic. I used to use Google Analytics for this, but I've been really, really impressed by Google Search Console!

## What is Google Search Console?

Google Search Console is a simple (and free) service to track how a site is doing from Google's perspective. This obviously includes how highly ranked the site appears in results, but it also includes a lot more!

For example, are there any errors found following links? Are any pages giving conflicting metadata around canonical URLs? Are any pages loading too slowly?

All of these factors factor into Google's search algorithm, as they are symptoms of a high quality site. As such, following recommendations to improve your site's Google listing... also improves the quality in general!

## Why use it?

There are a *lot* of reasons to try out Google Search Console, even before getting into the actual [features](#what-features-does-it-have)!

### Simple

I don't get on with Google Analytics. I get lost, I find it impossible to manage multiple sites, and get lost in trying to filter... dimensions... audiences... funnels. Google Search Console has drastically less data, but surfaces it in an extremely usable and helpful way.

Usability can be somewhat subjective, but given the drastically smaller userbase of this platform, I get the feeling that Google's designers have been more "free" to make changes. Below is the main overview, it instantly surfaces the 3 things I likely care about most:
1. How many users are visiting my site?
2. How many of my pages is Google listing?
3. How high quality are my pages?

I'll dive into each page in [the features section](#what-features-does-it-have):

[![](/assets/images/2023/googlesearchconsole-overview-thumbnail.png)](/assets/images/2023/googlesearchconsole-overview.png)

### Automatic subdomain verification

If you have verified a domain property (by adding a DNS record), adding a new subdomain requires no additional work. Just adding the subdomain sets it up, ready for tracking, since Google knows you own the entire domain.

[![](/assets/images/2023/googlesearchconsole-verification-thumbnail.png)](/assets/images/2023/googlesearchconsole-verification.png)

This means the overall site stats are visible, whilst individual project sites can be dived into easily. I have ended up adding every domain I'm actively working on to Google Search Console, it's very satisfying seeing random old projects experience traffic surges (due to [proactive emails](#proactive-emails)).

[![](/assets/images/2023/googlesearchconsole-sites-thumbnail.png)](/assets/images/2023/googlesearchconsole-sites.png)

### No code needed

Yep, no JavaScript needed. Your site's code is completely untouched, there's no security risks, there's no increase in page load time, none of the downsides of other tracking solutions.

Since Google owns Google Search (obviously...) and the Google indexing bot, Google Search Console is merely surfacing some of the data they have already collected. 

As such, the only technical work needed is adding the DNS record to prove domain ownership, so that Google is comfortable sharing the data with you (see [how to set it up](#how-to-set-it-up)).

### Proactive emails & achievements

I am very confident that Google Analytics etc has the ability to set up emails for spikes in traffic. With Google Search Console however, it's all already there. 

For example, I recently added [my settlers manual](https://settlers.jakelee.co.uk), then a few weeks later received an email letting me know it had received 80 users from Google Search! Obviously these aren't big numbers, but as it's a small project I haven't touched in years, I would never have thought to check the analytics without this achievement notification.

[![](/assets/images/2023/googlesearchconsole-email-thumbnail.png)](/assets/images/2023/googlesearchconsole-email.png)

Clicking the link in this email also lets you view historical achievements, useful for an instant look at how consistent the site's growth it.

[![](/assets/images/2023/googlesearchconsole-achievements-thumbnail.png)](/assets/images/2023/googlesearchconsole-achievements.png)

### Monthly summaries

If your project is your main source of income, or you spend a lot of time on it, then you'll probably be checking the analytics daily. However, for a small project you did in a weekend a few years ago? It's unnecessary.

This is where Google Search Console's monthly emails are such a helpful feature. They provide a very high level view of how your site is doing, and I always give them a quick skimread when they arrive.

I won't show all the detail (the screenshot will be very long!), but the monthly emails include:
1. The number of clicks, views, and pages with first impressions this month.
2. The top growing & performing pages this month (and how many clicks they received).
3. The top growing & performing queries used to find your site.
4. What type of device, country, and type of Google search the user found your site via.

This is extremely helpful data, all without any code being added to your site! I find the information on growing & performing pages to be a nice snapshot into what people are interested in.

[![](/assets/images/2023/googlesearchconsole-content-thumbnail.png)](/assets/images/2023/googlesearchconsole-content.png)

### Quality monitoring

### No limitations / upselling

## What features does it have?

## How to set it up?


## Downsides of Google Search Console
- Obviously only Google traffic
- Very limited reporting

## Conclusion

[![](/assets/images/2023/example-thumbnail.png)](/assets/images/2023/example.png)