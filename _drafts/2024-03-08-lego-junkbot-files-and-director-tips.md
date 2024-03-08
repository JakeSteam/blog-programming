---
title: Open sourcing LEGO Junkbot, and tips for Macromedia/Adobe Director asset extracting 🕵️
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  - Digital preservation
  - LEGO
  - Adobe Director
maxheader: 3
---

As part of a larger project, I recently needed to extract all code & assets from a 20+ year old Macromedia/Adobe Director game: LEGO Junkbot. Here are the files, a discord, and some tips!

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

/editor changing

### Extracting files

Whilst you _can_ extract all the assets manually, by just opening them all in an external editor and resaving (like I did), there is a better way!

[n0samu's DirectorCastRipper](https://github.com/n0samu/DirectorCastRipper) is an excellent tool that automatically extracts all assets from a `.dir` and gives them appropriate names.

### Fixing files

SWA to MP3
1 bit BMP to modern BMP
Ant renamer

### Secret hunting

Searching for names, expletives

## Community

As with any niche project, I learned a _lot_ along the way. Perhaps most importantly, I learned that there's a community of devs working on tools related to preserving Adobe Director projects. The developers of both [ProjectorRays](https://github.com/ProjectorRays/ProjectorRays) and [DirectorCastRipper](https://github.com/n0samu/DirectorCastRipper) can be found in [ProjectorRays' cosy Discord server](https://discord.gg/yCfAraZx5E), and there's plenty of Director-y discussion happening there.

If you find other Adobe Director resources from the last few years (e.g. [a deep-dive into file formats](https://nosamu.medium.com/a-tour-of-the-adobe-director-file-format-e375d1e063c0)) there's a decent chance the author will be in that Discord server!

[![](/assets/images/2024/example-thumbnail.png)](/assets/images/2024/example.png)
