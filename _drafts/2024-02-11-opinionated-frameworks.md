---
title: "Opinionated frameworks escape decision paralysis: How Google and T3 jumpstart a new developer's growth"
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  - Next.js
  - t3.gg
  - Android
---

I recently dived into a world I knew nothing about, not even the language: Modern web development. After completing the official tutorials, I was hit with decision paralysis when trying to start an actual project. The solution? Opinionated frameworks like [T3](https://create.t3.gg/).

## My decision paralysis

So, I wanted to learn Next.js. This required learning the underlying framework (React), a new language (TypeScript), and even an entire ecosystem (npm). I also needed to learn about hosting, databases, APIs, and a million other things I vaguely understood but not enough to actually implement. Sounds easy!

Of course Next.js has different versions. It also has completely different ways of architecting a project, of which has a completely different official tutorial ([pages router](https://nextjs.org/learn-pages-router/basics/create-nextjs-app) or [app router](https://nextjs.org/learn)). It also has 4 ways of displaying content. Do I want SSG? SSR? CSR? ISR? WTF!

Aaaand that's before we even get to the various SDKs and tools required, each of which has multiple alternatives. For an ORM do I want Drizzle, or Prisma? For authentication do I build it myself, use NextAuth.js, or a paid solution like Clerk? For the UI do I build it with CSS modules? Sass? Tailwind? A framework library?

I have no idea what on earth I'm doing.

## Initial attempts

I have 50 decisions to make, and no way of knowing which is an unchangeable commitment and which doesn't matter. OK, so I need a starter project to make some of these decisions for me.

Since my initial exploration into Next.js / React was via Vercel's official tutorials, their [templates gallery](https://vercel.com/templates/next.js) seemed a good place to start. I spent a few hours looking through the projects, and they always fell into one of four camps:

1. **Skeleton** ([example](https://vercel.com/templates/next.js/nextjs-boilerplate)): A template that essentially gave me less than I ended up with at the end of the tutorial. I'm a bit clueless on where to go first, and there's too little here to really help.
2. **Skeleton plus X** ([example](https://vercel.com/templates/next.js/liveblocks-starter-kit)): Almost all the third party templates follow this format. They provide a basic landing page _plus_ whatever feature the company happens to offer. No better than a basic skeleton.
3. **Cluttered** ([example](https://vercel.com/templates/next.js/precedent)): Templates that weren't from a company often suffered from the creator adding random utilities they wanted. These probably help an experienced developer, but for a beginner just add pointless complexity and confusion.
4. **The kitchen sink** ([example](https://vercel.com/templates/next.js/nextjs-enterprise-boilerplate)): Some templates tried to provide everything you could possibly need, and end up becoming word / code soup. The example provided has a "Features" list that is essentially gibberish for a new developer. Who needs "Automated ChatGPT Code Reviews" or whatever "CVA" might be, I just want a modern template to start with!

I committed some time to a couple of these templates (especially [Precedent](https://vercel.com/templates/next.js/precedent)), and left feeling a little burnt out and lost. I felt adrift in a sea of a thousand options, with only random opinions from companies and articles to guide me.

Whilst the scattered articles, GitHub repos, and tutorials are helpful for someone learning a specific feature or library, for someone trying to learn the entire thing from scratch a more complete solution is needed.

## Enter T3

Luckily, I'd long followed someone called [Theo AKA "T3"](https://twitter.com/t3dotgg) on Twitter / X. I followed for his general tweets about tech, and didn't know he was influential in Next.js / React, nor that he was primarily a video creator. When I was looking on Reddit for template recommendations, someone recommended him, and I discovered [he has a very popular template](https://create.t3.gg/)!

After being burned on the various Vercel templates, I was sceptical initially. However, T3 seemed to have a clear goal: providing the core functionality, and drawing a strict line about what you need to choose. More importantly, all of these decisions were _documented_, instead of just "it's here because I want it to be".

Having these choices documented meant I could make an educated decision about whether I agreed with them. For example, ["Bleed Responsibly"](https://create.t3.gg/en/introduction#bleed-responsibly) discusses his approach to bleeding edge tech, and how it needs to be considered. It shouldn't be used for core functionality (e.g. database), but is fine to use if it's easy to migrate away (e.g. tRPC). Similarly, the non-negotiable stance on TypeScript and type safety provided some reassurance that this isn't a "wild west" template that will have unsafe or unnecessary code scattered around.

Finally, the documentation is absolutely excellent. Not only is the mindset and decision-making documented, there are sections that provide more information and help than I could ever ask for:

- [Folder structure](https://create.t3.gg/en/folder-structure): Describing the overall file structure in detail to avoid getting lost.
- [Library introductions](https://create.t3.gg/en/usage/trpc): Absolutely crucial in helping me understand the project, libraries like Prisma [are described](https://create.t3.gg/en/usage/prisma) in just enough detail. Code examples from the actual project are used, helping them make sense in context.
- [Recommendations](https://create.t3.gg/en/other-recs): Once T3 has gained your trust, it uses this to help guide your next steps. Importantly, it provides multiple options for each problem, and encourages you to avoid using things unless you actually need to. A breath of fresh air coming from "kitchen sink" style projects!
- [Community](https://t3.gg/discord): There's a Discord server with 20k members, and the discussions are [mirrored online](https://www.answeroverflow.com/c/966627436387266600) for easier searching.

All of these combined meant I went from completely lost and considering learning something else, to having a project that made sense, that I felt confident in, and I was ready to start building on. Wahoo!

## Comparisons to Android

## How do Google / T3 solve this?

## Conclusion

[![](/assets/images/2024/example-thumbnail.png)](/assets/images/2024/example.png)
