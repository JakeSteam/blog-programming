---
title: "Investigating the structure of URLs, or: What even IS a URL?"
author: Jake Lee
layout: post
image: /assets/images/2022/
tags:
    - Deep Dive
    - URL
---

Like most people, I spend a significant portion of every day looking at websites. Nothing unusual there. Every page has a URL, and we all understand their rough structure but… what actually counts as a valid URL? Are there weird exceptions? What even IS a URL!? Out of sheer curiosity I went down the rabbit hole, and managed to scribble a few notes.

## What is a URL?

**A URL (Uniform Resource Locator) is a unique identifier for a piece of internet content that is used to locate it.** This was my immediate response to the question, and is accurate enough for almost all contexts.

After a little research (well, Wikipedia reading), it turns out to be a reasonable answer, but misses a few key points:
* A URL doesn't necessarily have to be an internet address. For example, `mailto:jake@example.com` is a URL for email instead of internet.
* The URL Living Standard[^living-standard] is an open source document[^open-source] that defines a valid URL, domain, and IP address, and is constantly being maintained and updated (more on *who by* later).

[^living-standard]: [https://url.spec.whatwg.org/](https://url.spec.whatwg.org/)
[^open-source]: [https://github.com/whatwg/url](https://github.com/whatwg/url)

## What components are in a URL?

The easiest way to think of a URL is as 3 parts stuck together. The **Scheme** is everything before the `//`, the **Authority** is everything after the Scheme before a `/`, and the **Path** is everything left. Each of these has optional extra parts, but these are the core requirements.

For example, in `https://blog.jakelee.co.uk/what-even-is-a-url` we have:
* Scheme: `https`
* Authority: `blog.jakelee.co.uk`
* Path: `what-even-is-a-url`

The Wikipedia diagram is more detailed, but perhaps harder to interpret:

[![](/assets/images/2022/url_wikipedia_diagram.png)](/assets/images/2022/url_wikipedia_diagram.png)
<sub><sup>*[Alhadis](https://commons.wikimedia.org/wiki/User:Alhadis), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons*</sup></sub>

### Scheme

The scheme is the simplest part of a URL, and defines which protocol we're going to use to find our resource. For example the usual `https` means secure internet, whilst `mailto` means email. 

Programs / apps can define their own schemes, however it isn't possible to "own" a scheme. For example, `https` only "means" secure internet scheme because all browsers, servers, and users understand it as that. 

### Authority

The authority part of a URL is everything before the first `/` (excluding the first `//`). Whilst this is usually easily to determine, the complexity of TLDs (top level domains, e.g. `.co.uk`) and subdomains (e.g. `blog.`) mean this is a topic it's easy to spend weeks on! For our use case, our definition works.

I find it easiest to think of domains as working from least-strict to most-strict in terms of what they can be set to. For example, as an individual it'll either be impossible or extremely expensive to own an entire TLD (e.g., all of `.co.uk`). However, it will be affordable to own an entire domain (e.g., `jakelee.co.uk`), and completely free to make subdomain(s) thereafter (e.g., `my.blog.subdomain.jakelee.co.uk`). This basic idea illustrates why `mybank.com.freewebsites.biz` is not at all trustworthy!

#### Optional parts

Whilst the vast majority of sites look like the above, there are 2 optional parts that some services use:
1. **userinfo**: Your username & password for the service, allowing you to access `jake:abc123@example.com` instead of loading the page then logging in.
2. 

## What defines a valid URL?

## What's the history of URLs?

* Combination of domain names, and file paths (wiki)

https://en.wikipedia.org/wiki/Uniform_Resource_Identifier

## Who is involved in URL definition?

* Whatwg, tim bernerslee, living doc maintainer anne 
