---
title: "Opinionated guidance defeats decision paralysis: How Google and T3 help jumpstart a new developer's learning"
image: /assets/images/2024/opinionated-frameworks.png
tags:
  - Next.js
  - t3.gg
  - Android
  - Learning
---

I recently dived into a world I knew nothing about, not even the language: Modern web development with Next.js. After completing the official tutorials, I was hit with decision paralysis when trying to start an actual project. The solution? Opinionated templates like [T3](https://create.t3.gg/).

## My decision paralysis

So, I wanted to learn Next.js. This required learning the underlying framework (React), a new language (TypeScript), and even an entire ecosystem (npm). I also needed to learn about hosting, databases, APIs, and a million other things I vaguely understood but not enough to actually implement. Sounds easy!

Of course Next.js has different versions. It also has completely different ways of architecting a project, each of which has an unconnected official tutorial ([pages router](https://nextjs.org/learn-pages-router/basics/create-nextjs-app) or [app router](https://nextjs.org/learn)). It also has 4 ways of displaying content. Do I want SSG? SSR? CSR? ISR? WTF!

Aaaand that's before we even get to the various SDKs and tools required, each of which has multiple alternatives. For an ORM do I want Drizzle, or Prisma? For authentication do I build it myself, use NextAuth.js, or a paid solution like Clerk? For the UI do I build it with CSS modules? Sass? Tailwind? A UI framework library?

I have no idea what on earth I'm doing.

## Initial attempts

I have 50 decisions to make, and no way of knowing which is an unchangeable commitment and which doesn't matter. OK, so I need a starter project to make some of these decisions for me.

Since my initial exploration into Next.js / React was via Vercel's official tutorials, their [templates gallery](https://vercel.com/templates/next.js) seemed a good place to start. I spent a few hours looking through the projects, and they always fell into one of four camps:

1. **Skeleton** ([example](https://vercel.com/templates/next.js/nextjs-boilerplate)): Templates that essentially gave me less than I ended up with at the end of the official tutorial. I'm a bit clueless on where to go first, and there's too little here to really help.
2. **Skeleton plus X** ([example](https://vercel.com/templates/next.js/liveblocks-starter-kit)): Almost all the third party templates follow this format. They provide a basic landing page _plus_ whatever feature the company happens to offer. No better than a basic skeleton.
3. **Cluttered** ([example](https://vercel.com/templates/next.js/precedent)): Templates that weren't from a company often suffered from the creator adding random utilities they wanted. These probably help an experienced developer, but for a beginner just add pointless complexity and confusion.
4. **The kitchen sink** ([example](https://vercel.com/templates/next.js/nextjs-enterprise-boilerplate)): Some templates tried to provide everything you could possibly need, and end up becoming word / code soup. The example provided has a "Features" list that is essentially gibberish for a new developer. Who needs "Automated ChatGPT Code Reviews" or whatever "CVA" might be, I just want a modern template to start with!

[![](/assets/images/2024/opinionated-template-gallery.png)](/assets/images/2024/opinionated-template-gallery.png)
_[Vercel's Next.js template gallery](https://vercel.com/templates)_

I committed some time to a couple of these templates (especially [Precedent](https://vercel.com/templates/next.js/precedent)), and left feeling a little burnt out and lost. I felt adrift in a sea of a thousand options, with only random opinions from companies and articles to guide me.

Whilst the scattered articles, GitHub repos, and tutorials are helpful for someone learning a specific feature or library, for someone trying to learn the entire thing from scratch a more complete solution is needed.

## Enter T3

Luckily, I'd long followed someone called [Theo AKA "T3"](https://twitter.com/t3dotgg) on Twitter / X. I followed for his general tweets about tech, and didn't know he was influential in Next.js / React, nor that he was primarily a video creator. When I was looking on Reddit for template recommendations, someone recommended him, and I discovered [he has a very popular template](https://create.t3.gg/)!

After being burned on the various Vercel templates, I was sceptical initially. However, T3 seemed to have a clear goal: providing the core functionality, and drawing a strict line about what you need to choose. More importantly, all of these decisions were [_documented_](https://create.t3.gg/en/why#why-trpcprismatailwindetc), instead of just "it's here because I want it to be".

Having these choices documented meant I could make an educated decision about whether I agreed with them. For example, ["Bleed Responsibly"](https://create.t3.gg/en/introduction#bleed-responsibly) discusses his approach to bleeding edge tech, and how it needs to be considered. It shouldn't be used for core functionality (e.g. database), but is fine to use if it's easy to migrate away (e.g. tRPC). Similarly, the non-negotiable stance on TypeScript and type safety provided some reassurance that this isn't a "wild west" template that will have unsafe or unnecessary code scattered around.

[![](/assets/images/2024/opinionated-t3-recommendations.png)](/assets/images/2024/opinionated-t3-recommendations.png)
_[T3's template rationale](https://create.t3.gg/)_

After some light customisation during the installation process (essentially "do you want to use feature X?", I chose yes for all), you have a mini-site! It has a database, can read and write data, and already feels like it can do something useful. From this, it's easy to imagine the first steps in creating your own project on top.

Finally, the documentation is absolutely excellent. Not only is the mindset and decision-making described in detail, there are sections that provide more information and help than I could ever ask for:

- [Folder structure](https://create.t3.gg/en/folder-structure): Describing the overall file structure in detail to avoid getting lost.
- [Library introductions](https://create.t3.gg/en/usage/trpc): Absolutely crucial in helping me understand the project, libraries like Prisma [are described](https://create.t3.gg/en/usage/prisma) in just enough detail. Code examples from the actual project are used, helping them make sense in context.
- [Recommendations](https://create.t3.gg/en/other-recs): Once T3 has gained your trust, it uses this to help guide your next steps. Importantly, it provides multiple options for each problem, and encourages you to avoid using things unless you actually need to. A breath of fresh air coming from "kitchen sink" style projects!
- [Community](https://t3.gg/discord): There's a Discord server with 20k members, and the discussions are [mirrored online](https://www.answeroverflow.com/c/966627436387266600) for easier searching.

All of these combined meant I went from completely lost and considering learning something else, to having a project that made sense, that I felt confident in, and I was ready to start building on. Wahoo!

## Comparisons to Android

All of this confusion without any real authoritative source felt somewhat familiar throughout. Finally, I realised... this is what it felt like to first learn Android 10 years ago!

In the earlier days of Android development, Google was far less opinionated than they are now. They didn't provide guidance on databases (Room), asynchronicity / threading (Coroutines), architecture (MVVM), or much besides the absolute basics of putting images and text on the screen.

With Android, a lot of the developers were coming from a Java perspective (like myself), so inevitably brought over a lot of the conventions. For example, RxJava and similar libraries became obvious choices due to the amount of existing knowledge. Whilst most of these libraries became somewhat standardised, they were all from different sources, so there was no guarantee they would work well together. Similarly, they didn't necessarily make sense in the context of Android.

After a few years, Android developers ended up essentially using Java libraries, with various fixes and workarounds glued on top. This was _fine_, but often ended up with far too many options for simple functionality like using a SQLite database. Some developers like myself ended up building their apps (e.g. Pixel Blacksmith) on top of total dead-end ORMs that are now abandoned like [Sugar ORM](https://github.com/chennaione/sugar) (don't use this!).

Once an authority, or in this case _the_ authority, steps in and makes recommendations, it's a massive relief. Developers don't need to learn 5 different ways to complete a simple task, they can just learn the Google-endorsed way and they'll be at home in most codebases.

Google is now very comfortable defining "modern Android development", including the language, libraries, IDE, and various project settings. Excellent.

[![](/assets/images/2024/opinionated-google-recommendations.png)](/assets/images/2024/opinionated-google-recommendations.png)
_[Google's definition of modern Android development](https://developer.android.com/modern-android-development)_

Discovering T3 and instantly wiping away the endless decision paralysis around Next.js felt like the same story, told in a few days not years and entirely within my own head.

## How do Google / T3 help?

By providing _an_ answer, with rationale, developers can actually get started on writing code. Whilst experienced developers can absolutely debate whether library X or Y is better, as a beginner you just want to be told which one to start with. You'll likely end up learning both eventually, and making this decision is far easier when you understand the other moving parts.

Both Google and T3 are very opinionated. This is completely intentional, and provides a "happy path" for getting basic functionality working. Sure, you might need to swap out libraries if you have a niche need, but realistically the vast majority of apps (web or mobile) have identical base requirements. You need to fetch data, you need to store data, you need to display data, and you need to update data.

I'm absolutely envious of developers who enter the Android ecosystem when it is already mature, as I did with Next.js. When a technology is new and exciting it's essentially chaos, with countless alternatives for every part of your app, and no way to tell which will become dominant in five years. Joining late lets you skip learning multiple similar approaches, and just learn the one that the community has embraced.

Once a baseline of understanding has been achieved, it's drastically easier to compare different options.

## Conclusion

T3 kept me interested in Next.js / React / Tailwind / Prisma. Google kept me from straying away from Android for long.

As you've probably realised from the contents of articles on here, I'm usually not particularly opinionated on choosing certain libraries over others. If it works, and is widely adopted, it's probably good enough. I'd much rather learn a whole new ability than learn how to store data in yet another ORM library!

However, publicly discussing & debating these opinions _is_ useful for the long term health of an ecosystem. It's just not what a beginner necessarily needs to read.

All the time saved comparing libraries and approaches on my current project is extra time to carry on developing within the T3 stack, and ignore (for now) all the alternatives!
