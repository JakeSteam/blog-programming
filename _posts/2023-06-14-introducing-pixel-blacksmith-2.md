---
title: "New project: Pixel Blacksmith 2 AKA Purple Blacksmith"
author: Jake Lee
layout: post
image: /assets/images/2023/pb2-banner.png
tags:
    - Pixel Blacksmith
    - Android
    - Project
---

8-9 years later, it's time for a sequel to a project I worked on obsessively, which taught me all the basics of Android development and publishing! Pixel Blacksmith's sequel has finally started development, here's all the info on the game, and some explanation for why it's happening now.

I first got into Android development close to a decade ago, and learned entirely through building my game [Pixel Blacksmith](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmith) in my spare time. Having a project like that *really* helped provide the motivation & direction for learning, and the fact that it became surprisingly successful (and profitable!) undoubtedly helped my career.

So, since I'm moving back into Android development (from management) in July, what better time to relearn modern Android than with a sequel?

## Game overview

So what is Pixel Blacksmith 2? Well, it's a layered idle / incremental game.

The vision is to end up with multiple layers of cohesive games, with each "layer" having multiple playthrough / automation "paths".

For example, the first layer "Machine" is a puzzle-solving layer. Whilst this can be manually completed by solving all the puzzles, it can also be automated via each "path". Unlocking additional solving options will require a specific manual action, so players will need to balance the ease of automation with the control of manual completion.

The overall goal will be to defeat, and ultimately control, the "purple", an all-encompassing alien virus introduced clumsily in [Blacksmith Slots](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmithslots).

### Layers

The easiest way to think of the game's structure is with an overview of all the layer & path combinations:

[![](/assets/images/2023/pb2-paths-thumbnail.png)](/assets/images/2023/pb2-paths.png)

Each layer will be a different genre of game, and almost unrecognisable from the layer before. For example one may be solving basic puzzles, one might be strategy, one might be an RPG, etc. I'm tackling the easiest one first...

### Layer 1: Machine

The first horizontal "layer" will be a fully contained game, all about fixing a machine. Whilst I haven't ironed out the details yet, this will likely be done by solving a multi-level collection of different puzzle types. For example, maybe a few "tap numbers in ascending order", "predict the coin toss 3x in a row", or countless others.

As this is the first playthrough, these puzzles will all have to be solved manually. This might take a while, especially if there are more difficult ones mixed in (e.g. "win a game of solitaire"). So where's the complexity?

### Paths

Once every puzzle on every part of the machine has been completed, the machine is fixed! However, this is only the "manual" path, the simplest but also most tap-intensive. 

As can be seen in the diagram above, there are likely to be 5 paths that control how a layer can be completed. Unlocking new paths will likely be done via completing feats whilst replaying layers (e.g. "Manually complete Machine in under 10 mins"). In-game, this will be explained as passing on the machine (/ shop / town etc) to your sibling / descendant / another family!

These paths will relate to each other constantly, and you'll end up needing to master all of them to progress. Using Machine as an example, here's the possible completion paths (note that they are very unbalanced currently!):

* *Tedious*: Manually completing every puzzle. Very click intensive and basic.
* *Training*: Hiring an assistant. Less click intensive, but takes breaks and is quite slow.
* *Technology*: Building a machine to complete the machine. Reliable, predictable, doesn't require breaks, but high up-front cost.
* *Taming*: Training a pet. Similar to *Training*, but less reliable and cheaper.
* *Turning*: Making the purple (the antagonistic alien goo) fix the machine. End-game content, requires mastery of all other paths.

### Upgrades

Upgrading will play a key part in the progression system. Whilst every layer will have an upgrade tree (for example to reduce the number of puzzles or their difficulty), there will also be upgrades for every possible path. For example the "Manual" path of "Machine" might let you upgrade attributes of every puzzle, or the chance to skip a puzzle step.

[![](/assets/images/2023/pb2-upgrades-thumbnail.png)](/assets/images/2023/pb2-upgrades.png)

## Project goals

Similar to Pixel Blacksmith 1, this project has a number of goals that luckily align with each other:

### Learning

Realistically I'm no longer on the "cutting edge" of Android development. I missed most of [Jetpack Compose](https://developer.android.com/jetpack/compose), I haven't tried [version catalogs](https://developer.android.com/build/migrate-to-catalogs), and I'm just generally behind the curve on most developments in the last few years.

By utilising all of the latest and greatest technology in this project, I can get myself back up to speed. I've always found Google's codelabs and tutorials miss a lot of the "real world" issues that will be encountered, hence the benefits of having an actual project.

### Testbed

When a new technology is announced, it's hard to find a use for it without a modern codebase. If you're working in an outdated codebase, there's no point paying attention to new libraries since... you won't be able to use them. 

Having a modern project means new libraries can be tried out, whilst the fact it's a personal project means unstable APIs can be deployed into production. Google IO etc will suddenly become a lot more relevant!

### Users

I haven't dealt with "real users" in a while. During Pixel Blacksmith's peak I was replying to (usually positive!) customer feedback most days, and it was honestly enjoyable. Having real people caring about what I did, minus all the "protections" you get in a larger company was extremely motivating. Fixing a bug became a thing people cared about, not just a ticket on JIRA.

As my new job is at a startup I'll likely be a bit closer to our userbase, and having recent experience with the positive & negative pressure this entails can't hurt. 

### Money

Realistically, Pixel Blacksmith never made *that* much money. However, it would be nice to have a side income, although it's unlikely to ever pay close to minimum wage for the hours worked!

### Writing

I've been trying to get into writing fiction, since I've always found it so much harder than non-fiction. This will be a good chance to give it a go, whilst also being constrained / guided by the necessities of the game. Translation will be an issue, but that can wait! 

## Technology

So, what technology is Purple Blacksmith going to use? Well, basically just a list of what Google currently recommends!

* Language: Kotlin
* Architecture: Modules, MVVM
* DI: Hilt
* UI: Compose
* Concurrency: Coroutines (Flows)
* Backend: Firebase
* Payments: Google Pay
* Database: Room
* Version management: Version catalogs

You get the idea! I'd also like to try Kotlin Multiplatform with it eventually, but that's much, much later. 

## Progress so far

Since this is my first real new project in a few years, it was a slow start. However, I've now got a basic project sorted with all the core Android technologies I want! I also needed to learn Compose, so even just having a navigatable app that can update database values & listen to them elsewhere is a major checkpoint. 

There's also a lot of work around data structure that has been a bit tricky. For example, how to store the game data of generated puzzles, be able to generate them on demand, load the saved data, etc. All of this is time-consuming, but a solid data structure will make adding a new puzzle or changing game rules significantly easier later on. 

As this is a private project for now, I won't be sharing day by day updates, but I'll likely make posts here when major checkpoints are reached. The following screenshot looks pretty dull, but is actually an implementation of generating, storing, and loading a "grid" (multi-dimensional array) of values, ready to be actioned in a puzzle screen.

[![](/assets/images/2023/pb2-progress.png)](/assets/images/2023/pb2-progress.png)

The values at the top are updating automatically, and a levelling mechanism is also implemented. Obviously, there's a lot left to do before the game is actually useful to anyone!

Some of the problems I solve along the way will end up being their own articles, for example how I end up implementing the complex upgrading system.

## Plan

Overall, I've got a 7 stage plan for Purple Blacksmith, where I'm currently around halfway through the 2nd stage:

* **Stage 1: Planning**: General prep of project, design, requirements. Completed.
* **Stage 2: Proof of concept**: Implementing core mechanisms, puzzle generation, upgrade buying, all desired technologies. In progress.
* **Stage 3: MVP**: Get the core gameplay loop working, and have something resembling a real game.
* **Stage 4: Tidying**: Code tidying, testing, organising, tidying UI, registering domains etc.
* **Stage 5: Features**: The fun bit! Adding cloud saves, notifications, offline progress, payments, all the features that make a game high quality.
* **Stage 6: Alpha**: Polish the finished parts, start prepping future work. Add instructions / tutorial.
* **Stage 7: Playtest**: Get some testers, see what they think! 

Anyone who has worked with me before knows I'll have much more in-depth notes than these, but they'll do for here! Here's my currently in progress notes, there's a *lot* to do:

[![](/assets/images/2023/pb2-progress2.png)](/assets/images/2023/pb2-progress2.png)

## Conclusion

So, what's the summary of this long, rambling post? Well, that Purple Blacksmith is a thing, it's very early in development, but it feels really, really good to be passionate about making a game again.

Hopefully more updates soon, thanks for reading!