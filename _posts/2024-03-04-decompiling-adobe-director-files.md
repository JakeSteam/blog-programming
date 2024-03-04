---
title: How to decompile an Adobe Director DCR file
author: Jake Lee
layout: post
image: /assets/images/2024/director-banner.png
tags:
  - Adobe
  - Decompiling
---

Heard of Adobe Flash? Well, it has an unloved older brother: Adobe Director! I recently needed to access the raw files behind a compiled Director DCR file, here's how.

Since almost everything we'll be using is deprecated and abandoned, I can't guarantee the safety of any software mentioned here. I've used it all happily, but abandoned software can be a risk.

The plan is simple:

1. Install Adobe Director.
2. Decompile our DCR file.
3. Open it up.

If you're interested in doing the same for Flash files (e.g. `swf`), I've [previously written a guide](https://history.jakelee.co.uk/the-scary-maze-game-screamer-decompiled/#how-was-it-decompiled)!

## Installing Director

Adobe Director reached end of life in 2013(!), but luckily the installers are still available on [Adobe's site](https://www.adobe.com/support/director/downloads.html).

1. Scroll down to "[Director MX 2004 10.1.0](<https://www.adobe.com/support/director/downloads.html#:~:text=English%20Windows%20Installer%20(EXE%2C%2037.1%20MB)>)". Newer versions are available, but this is fine.
2. Click _"English Windows Installer"_ (or Macintosh if on MacOS). Your browser will almost certainly block the download, since it's an `.exe`! As such, we'll need to be insistent...
3. Right-click the link, select _"Copy link address"_.
4. Open a new tab, paste this link in.
5. Chrome will block it again! This time click "Keep", and you'll finally get your `dmx2004_101_update_en.exe`.

[![](/assets/images/2024/director-download.png)](/assets/images/2024/direct-download.png)

Once opened, this is a pretty typical Adobe installer. You'll be asked where you want to install it, what you want to install (I chose default settings), and offered a free trial. There might be a legal way to get a full version for free, but the trial was fine for my purposes.

|                                           Initial dialog                                            |                                                Installing                                                 |                                               License                                               |
| :-------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/director-initial-thumbnail.png)](/assets/images/2024/director-initial.png) | [![](/assets/images/2024/director-installing-thumbnail.png)](/assets/images/2024/director-installing.png) | [![](/assets/images/2024/director-license-thumbnail.png)](/assets/images/2024/director-license.png) |

Great, Adobe Director is now installed! Now for our file.

## Decompiling DCR file

My file in question was `junkbot2_13g_asp.dcr`, a web game from the early 2000s.

I used [ProjectorRays](https://github.com/ProjectorRays/ProjectorRays) for this, a very simple to use decompiler that can decompile `DCR`, `DXR`, `CCT`, and `CXT` files.

1. Download the `.exe` of the [latest release](https://github.com/ProjectorRays/ProjectorRays/releases), [0.2.0](https://github.com/ProjectorRays/ProjectorRays/releases/tag/v0.2.0) at the time of writing.
2. This download will also be blocked, and you'll need to confirm you wish to download it.
3. Once it's downloaded, drag your `.dcr` file onto the `.exe` and a `.dir` will be created in the same directory. Easy!

Here's how your working folder should now look:

[![](/assets/images/2024/director-output.png)](/assets/images/2024/director-output.png)

## Opening DCR files

You can now just double-click any `.dir` file you have, and Adobe Director will open (after confirming you wish to continue your free trial).

Note that I found opening Adobe Director for the first time required running the program as Administrator, presumably because it was automatically blocked by Windows.

Finally, here's our file open in Adobe Director:

[![](/assets/images/2024/director-open.png)](/assets/images/2024/director-open.png)

Enjoy!
