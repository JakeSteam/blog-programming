---
title: How and why the RuneScape Archive project scours old hard drives to preserve MMORPG history and restore lost media
image: /assets/images/2023/rsarchive-banner.png
tags:
    - RuneScape
    - Gaming
    - Archiving
---

Like a lot of people my age, I got *really* into RuneScape in the 2000s-2010s (maxed acc!), and nostalgia for it is why I originally got into Android development. Unfortunately, Jagex did not keep backups until 2012, so all versions of the game before then are lost… except for old caches on player's computers! The [RuneScape Archive project](https://rs-archive.github.io/index.html) helps coordinate the recovery effort, and you can help.

## What are the caches?

So what are these caches? Well, they contain most of the game's resources (sounds, textures, models, etc) but none of the player's data or anything sensitive. They are used to reduce loading screens within the game, and are automatically replaced over time as the game updates.

This means that anyone who regularly plays the game won't have all of these old caches, only a copy from just before the 5-6 times the location / format has changed over the years, and from their most recent version played.

## Why preserve the caches?

* **Nostalgia**: For many people (myself included) RuneScape is a massive part of their childhood. Being able to preserve the version of the game that has some specific sentimental value is a noble goal.
* **Old School Runescape**: This alternate version of the game (AKA 2007scape) is more popular than the main game, and comes almost entirely from a 2007 game backup that was restored in 2013. Having access to caches from a similar time period opens up the possibility of Jagex reusing these assets for future updates.
* **Accessing lost content**: In the past, [secret items](https://oldschool.runescape.wiki/w/Hex_edit_detected) and [music](https://www.youtube.com/watch?v=z5thjrZ2Gck) were hidden or lost, but they still exist in old game caches.
* **Future uses**: Who knows what possibilities hundreds of similar-but-different low-poly game worlds might have in the future! Animating map changes over time? Analysing graphical asset changes over time? The possiblities are endless, but only if these caches are preserved.

## The RuneScape Archive

So, these caches should be saved. But how are [The RuneScape Archive](https://rs-archive.github.io/index.html) planning to make that happen?

Well, it requires a small amount of effort from as many people as possible, to look on old hard drives and try to form a complete archive of these caches for every version of RuneScape. As might be expected, the older versions of the game cache are much more incomplete, with < 6% of 2003's caches preserved, whilst 75% of 2011's are.

Interestingly, The RuneScape Archive are *also* preserving all versions of Old School Runescape, which itself came from an old backup! Luckily these are all pretty much complete, with 80-95% of all 2013-2018 updates preserved, and 100% of all newer caches. Each time the main organiser **Hlwys** (Hlwys#0641 / u/Hlwys) posts to Reddit (e.g. [2021](https://www.reddit.com/r/2007scape/comments/r8uy5j/psa_do_you_have_old_computerslaptopshard/), [2022](https://www.reddit.com/r/2007scape/comments/yzeg6n/do_you_have_any_old_computers_or_hard_drives_you/), [2023](https://www.reddit.com/r/pcgaming/comments/105r0pd/remember_runescape_every_original_version_of_the/)) these numbers improve slightly due to new contributors.

The current progress is tracked [on this Google Sheet](https://docs.google.com/spreadsheets/d/1NSCUuFWP8gIFZnpwbjxb8n4DFy6IxK8v1SZ8BXVHFr0/edit#gid=0), with live updates provided on [their Discord server](https://discord.gg/tAeAsBDeHA).

 [![](/assets/images/2023/rsarchive-tracking-740w.png)](https://docs.google.com/spreadsheets/d/1NSCUuFWP8gIFZnpwbjxb8n4DFy6IxK8v1SZ8BXVHFr0/edit#gid=0)

Of course, storing hundreds of cache files full of game assets can get big. Really big. In fact, over 5TB of space is needed to store this ever-growing archive. Or at least, it would be if another project wasn't helping with storage…

## OpenRS2

**Graham** (Graham#5361) helps organise "OpenRS2 Archive", a sister project that optimises this 5TB of data into just 125GB. In their own [project page](https://archive.openrs2.org/)'s words:

> The archive uses content-addressable storage, converting caches to the client's native `.dat2`/`.idx` format on demand. This provides several benefits: the disk space required to store all available caches is reduced, and groups or XTEA keys missing from one copy of the cache can be sourced automatically from other copies - provided the checksums and version numbers match.

In plain English, this means instead of storing many copies of the same file, OpenRS2 isolates each asset and stores a single copy of it. This also makes checking new caches for missing content much easier!

You can [view the pending cache import queue](https://docs.google.com/spreadsheets/d/1vLMgnzQqcGv830UTDzYKD8tfPEYGrktAZTE76XHblPU/edit#gid=0) and the [status of each cache](https://archive.openrs2.org/caches/runescape/1), which helps provide an insight into the "behind the scenes" magic that allows this project to exist. 

## How can you help?

You can look on your hard drive for these old caches, and [submit them](https://docs.google.com/forms/d/e/1FAIpQLScQqv-P3DKjVEe8NirljRSePaOKYNZlnyIkdmdoqWLTB_DAKQ/viewform)! Even if a copy of your cache already exists, additional copies can sometimes preserve content missing from another copy.

These caches contain no personal info, just game files.

### Automatically finding

There is [an open source automatic scanning tool](https://github.com/edward4096/rscachefinder/releases) that will look for these caches in any version of Windows from 95 to 10. After downloading `RunescapeCacheFinder.exe` and starting the scan, it will search your disk for any matching caches:

![](/assets/images/2023/rsarchive-scan.png)

For me, this tool outputted a `RSCaches.dat` file. Opening this up in a text editor and searching for "jagex" revealed I had a 120mb cache in `C:\Users\Jake\jagexcache\runescape\LIVE` from June 2015! Whilst this cache isn't as important as earlier ones (since Jagex likely have a copy), I still [submitted it to the project](https://docs.google.com/forms/d/e/1FAIpQLScQqv-P3DKjVEe8NirljRSePaOKYNZlnyIkdmdoqWLTB_DAKQ/viewform).


### Manually finding

Of course, you can also look in the usual directories yourself if you don't want to run the finder `.exe`. The cache's common locations are known, and vary according to the version of RuneScape, however looking manually may miss unusual cache locations (or backups). Additional information on these typical paths can be found on the "[Game Data Preservation Project](https://runescape.wiki/w/User:Manpaint55/T:CHD-main)" on RS wiki.

Here are the locations for the highest priority caches:

#### RuneScape Classic

* `C:\.file_store_32`
* `C:\WINDOWS\.file_store_32`
* `C:\Documents and Settings\<USERNAME>\Local Settings\Temporary Internet Files`
* `C:\WINNT\Temporary Internet Files`
* `C:\WINDOWS\cache-93423-17382-59373-28323`

*Note: Before December 2002 RSC caches can be in many places, but always contain `mudclient` and have the extension `.jag`. I recommend using the automatic finding tool instead of manually looking.*

#### RuneScape 2 (2003-2006)

* `C:\WINDOWS\.file_store_32`

#### Other versions / betas

* `C:\WINDOWS\.jagex_cache_32`
* `C:\Users\[USERNAME]\jagexcache`

*Note: The `jagexcache` folder may be called `jagexcache1`, `jagexcache2`, etc.*

## Conclusion

Overall, this project is an excellent example of how previously lost content can sometimes eventually be restored if enough people help out. Whilst the bulk of the archiving and organising work appears to be done by a few key individuals, there are many more helping with various areas, and hundreds if not thousands contributing their caches. 

"Completing" the archive is technically possible, but personally I'm unsure that every single version will be found, especially considering hotfixes and other minor updates. However, this is no reason not to try: every cache submitted helps. The organisers are more optimistic, and with almost 50% of caches found, only 150 currently missing caches need to be found! Take a look on your old PCs / laptops for caches, and maybe you can help the archive get one step closer.

If you have any further questions, [RuneScape Archive's FAQ page](https://rs-archive.github.io/faq.html) might have the answer. Alternatively, the [RuneScape Archive Discord](https://discord.gg/UTCE5EfzSg) is quite active, and the [OpenRS2 Discord](https://discord.gg/WqTmUPMMMm) can help with storage-related questions.
