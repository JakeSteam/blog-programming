---
title: Open sourcing LEGO Junkbot, and tips for Macromedia/Adobe Director asset extracting 🕵️
author: Jake Lee
layout: post
image: /assets/images/2024/junkbot-open.png
tags:
  - Digital preservation
  - LEGO
  - Adobe Director
---

As part of a larger project, I recently extracted all code & assets from a 20+ year old unplayable Adobe Director game: [LEGO Junkbot](https://web.archive.org/web/20020803205407/http://www.lego.com:80/build/junkbot/junkbot.asp?x=x&login=0). Here are the files, a discord, and some tips!

## LEGO Junkbot source code

[The GitHub repo](https://github.com/JakeSteam/junkbot-code) contains all code, assets, and text files in unmodified format where possible. Adobe Director is pretty painful to use 20 years later, and searching for code and assets within VSCode or similar is much easier!

The [project's readme](https://github.com/JakeSteam/junkbot-code/blob/main/README.md) contains plenty more information, but a few highlights are:

- **All game sounds / music**: [`/files/sound/`](https://github.com/JakeSteam/junkbot-code/tree/main/files/sound/)
- **All level data**: [`/files/levels/`](https://github.com/JakeSteam/junkbot-code/tree/main/files/levels/)
- **All bricks**: [`/files/legoparts/`](https://github.com/JakeSteam/junkbot-code/tree/main/files/legoparts/)
- **Secret in-dev names of levels**: [`/files/catalog/catalog text.txt`](https://github.com/JakeSteam/junkbot-code/tree/main/files/catalog/catalog%20text.txt)
  - Shoutout to `Shit Stormsof Floaters by Eric (exciting!!! )`!
- **Animation components**: [`/files/dynamic/`](https://github.com/JakeSteam/junkbot-code/tree/main/files/dynamic/), filenames constructed by [`behaviour_legoparts manager.ls`](https://github.com/JakeSteam/junkbot-code/tree/main/files/Internal/behavior_legoparts%20manager.ls).

Now, on with some tips for similar projects.

## Tips

### Preparing project

Before you can extract your assets, you need a `.dir` file and a version of Director.

I wrote [a detailed guide](/decompiling-adobe-director-files/) to this, but the core steps are:

1. Download your `.dcr` file. You might need to hunt in the site's source code.
2. [Install the Director version](<https://www.adobe.com/support/director/downloads.html#:~:text=English%20Windows%20Installer%20(EXE%2C%2037.1%20MB)>) closest to your project's release date (Chrome will try to block the download). I chose "Director MX 2004 10.1.0" because it's free.
3. Run the installer, using [a legal free license](https://web.archive.org/web/20130101115113/https://helpx.adobe.com/x-productkb/policy-pricing/macromedia-legacy-activation-error.html).
4. Download [ProjectorRays](https://github.com/ProjectorRays/ProjectorRays) (again, Chrome will block the download).
5. Drag your `.dcr` file onto ProjectorRays, it'll give you a `.dir` file 🎉

_Note: ProjectorRays can also be used via the command line._

### Understanding Director

Macromedia/Adobe Director can be pretty confusing when opening a complex project, especially if you haven't created Flash projects before.

There's plenty of very detailed guides available elsewhere, but here's the core things you'll need to know:

#### Film metaphor

Director uses a film director metaphor throughout, so has some odd naming scattered throughout:

- "cast" = a package or directory.
- "cast member" = a file.
- "score" = timeline of the movie / game.

#### Viewing assets

If you're just trying to view assets, the "Cast" window will be your best friend. Pick a tab, switch to list view (horizontal lines button beneath cast tabs), and sort by type:

[![](/assets/images/2024/junkbot-open-cast.png)](/assets/images/2024/junkbot-open-cast.png)

When an asset is open, there will be appropriate controls for that time of content. This works pretty well, however you may prefer using an external editor.

|                                                   Code                                                    |                                                  Text                                                   |                                                  Image                                                  |
| :-------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/junkbot-open-script-thumbnail.png)](/assets/images/2024/junkbot-open-script.png) | [![](/assets/images/2024/junkbot-open-text-thumbnail.png)](/assets/images/2024/junkbot-text-script.png) | [![](/assets/images/2024/junkbot-open-image-thumbnail.png)](/assets/images/2024/junkbot-open-image.png) |

#### Editors

External editors work by temporarily copying a file to your `%TEMP%` directory, then passing it to an external program.

An editor can be set in `Edit` -> `Preferences` -> `Editors`, editing a content type, then either finding your editor's executable or scanning for a list of suggestions.

I was pretty surprised how well this feature worked, allowing Director to work in harmony with software released 20 years later!

### Extracting files

Whilst you _can_ extract all the assets manually, by just opening them all in an external editor and resaving (like I did), there is a better way!

[n0samu's DirectorCastRipper](https://github.com/n0samu/DirectorCastRipper) is an excellent tool that automatically extracts all common assets from a `.dir` and gives them appropriate names. Make sure you close Director before using it.

The supported types of data it can export, and output formats, are:

- Bitmap, Picture: `PNG`, `BMP`
- Sound: `WAV`
- Flash, Vector shape: `SWF`
- Shockwave 3D: `W3D`
- Text: `HTML`, `RTF`, `TXT`
- Field: `TXT`
- Lingo code: `LS`

I recommend checking `Include member names in filenames` so files have more useful names, otherwise just their numeric IDs will be used.

|                                                              Options                                                              |                                                             In progress                                                             |
| :-------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/junkbot-open-directorcastripper-thumbnail.png)](/assets/images/2024/junkbot-open-directorcastripper.png) | [![](/assets/images/2024/junkbot-open-directorcastripper2-thumbnail.png)](/assets/images/2024/junkbot-open-directorcastripper2.png) |

### Fixing files

#### SWA files

Some Director sounds will be stored as `.SWA`, which most media players / browsers can't handle. Luckily, this is just an `.MP3` with metadata, so renaming the file makes it fully playable ([source](https://board.flashkit.com/board/showthread.php?368011-SWA-to-WAV&s=8ddbd4570a8a14ad3138caa3912c99d0&p=3051963&viewfull=1#post3051963)).

#### Bitmap bit depths

Some of the bitmaps within a project might look very broken when they get exported. This happens when they have a "bit depth" of 1 (monochrome), a file format that isn't widely supported.

This can be fixed by double-clicking the "1 bit" in the bottom left of the Director image editor, and selecting 8 bits instead.

|                                               Original                                                |                                               Exported                                                |                                                 Fixed                                                 |
| :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/junkbot-open-bit1-thumbnail.png)](/assets/images/2024/junkbot-open-bit1.png) | [![](/assets/images/2024/junkbot-open-bit2-thumbnail.png)](/assets/images/2024/junkbot-open-bit2.png) | [![](/assets/images/2024/junkbot-open-bit3-thumbnail.png)](/assets/images/2024/junkbot-open-bit3.png) |

#### Bulk renaming

This isn't specific to Director, but I wanted my source code files to be organised into their Casts (packages) as folders for easier navigation.

Whilst DirectorCastRipper can export with names (see [Extracting files](#extracting-files)), this also includes the cast name. For example, `backgrounds_1_bkg1.bmp` means:

- Package / cast: `backgrounds`
- ID: `1`
- Name: `bkg1.bmp`

Once the files were in their appropriate folder (e.g. `backgrounds`), I needed to strip the prefix from them. There are plenty of tools to do this, but I've always used [Ant Renamer](https://antp.be/software/renamer). Here's the regular expression I used to remove all `package_123_` prefixes:

[![](/assets/images/2024/junkbot-open-ant-thumbnail.png)](/assets/images/2024/junkbot-open-ant.png)

### Secret hunting

Whilst this could be a whole article (or series of articles!), there's a few techniques for finding hidden info within an old project. Most importantly, get the data out _first_. Once you're browsing your files in VS Code (or similar), searching will become infinitely easier.

1. **Search for developer names**. For example, I know a "Peter" worked on my project, so [searching for his name](https://github.com/search?q=repo%3AJakeSteam%2Fjunkbot-code+peter&type=code) finds lots of files / text involving him, like draft levels.
2. **Search for expletives / emotion words**. Words like "[shit](https://github.com/search?q=repo%3AJakeSteam%2Fjunkbot-code+shit&type=code)", "hate", "awful", "sucks" might find hidden text buried away in game files. It's how I found the internal level name "Shit Stormsof Floaters"!
3. **Search for comments**. Searching for your language's comment syntax (e.g. `--` or `#comment` for Lingo) might find clues like [debugging log text](https://github.com/search?q=repo%3AJakeSteam%2Fjunkbot-code+%23comment&type=code).
4. **Skim the assets**. You'll almost certainly find unused audio and image assets within the game files, and these can be easy to identify since you won't recognise them from gameplay.
5. **Look out of bounds**. Sometimes assets are hidden outside the window boundaries during development, but will appear within Adobe Director's stage.
6. **Actually reading the code**. The final step! Skimming over the code will help you find any disabled functionality (e.g. Junkbot has a hidden level editor).

## Community

As with any niche project, I learned a _lot_ along the way. Perhaps most importantly, I learned that there's a community of devs working on tools related to preserving Adobe Director projects. The developers of both [ProjectorRays](https://github.com/ProjectorRays/ProjectorRays) and [DirectorCastRipper](https://github.com/n0samu/DirectorCastRipper) can be found in [ProjectorRays' cosy Discord server](https://discord.gg/yCfAraZx5E), and there's plenty of Director-y discussion happening there.

If you find other Adobe Director resources from the last few years (e.g. [a deep-dive into file formats](https://nosamu.medium.com/a-tour-of-the-adobe-director-file-format-e375d1e063c0)) there's a decent chance the author will be in that Discord server! For broader Shockwave discussions (with lots of FAQs), there's also the larger [Shockwave Discord server](https://discord.gg/5FDHp8MRma).
