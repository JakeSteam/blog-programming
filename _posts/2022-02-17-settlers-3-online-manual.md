---
title: Announcing an online version of the Settlers 3 game manual
author: Jake Lee
layout: post
image: /assets/images/2022/settlers.png
tags:
    - 'Settlers 3'
    - 'HTML'
    - 'GitHub Pages'
---

Settlers 3 is a PC strategy game from the late 90s that I spent countless hours in. It included a very detailed manual on the disc, full of images, tips, and stats. I've begun playing the game's [2018 remaster](https://store.ubi.com/uk/game?pid=5be2b34288a7e3b8170265cf), and discovered the manual's original site format was not available anywhere online... until now!

**[https://settlers.jakelee.co.uk](https://settlers.jakelee.co.uk)**

First of all, the manual is available in [English](https://settlers.jakelee.co.uk/en/fr_start.htm), [French](https://settlers.jakelee.co.uk/fr/fr_start.htm), and the original [German](https://settlers.jakelee.co.uk/de/fr_start.htm). All the images and content should work perfectly, if there's any problems please [raise an issue](https://github.com/JakeSteam/settlers). 

Here's a few sample pages:

| Getting Started | Buildings | Military |
| -- | -- | -- |
| [![](/assets/images/2022/settlers-starting-thumbnailsmall.png)](/assets/images/2022/settlers-starting.png) | [![](/assets/images/2022/settlers-buildings-thumbnailsmall.png)](/assets/images/2022/settlers-buildings.png) | [![](/assets/images/2022/settlers-military-thumbnailsmall.png)](/assets/images/2022/settlers-military.png) |

As with this blog and my portfolio, the manual is hosted on GitHub pages. I had to make a few changes to get the site working, and documenting them here might help similar projects.

## Case sensitive file names
The manual was originally created to run on Windows, and as such had a mixture of uppercase and lowercase filenames. When running on a server, this suddenly became an issue, as one page might link to the incorrect casing of a page!

### File names
Luckily I've used [Ant Renamer](https://antp.be/software/renamer) many, many times before and it can handle bulk renaming of a thousand or so files easily:

[![](/assets/images/2022/antrenamer.png)](/assets/images/2022/antrenamer.png)

### Link paths
Now the files were all consistent, the links needed to be fixed! I had a bit of trouble with this, but got there eventually with VS Code's regex find and replace. 

I wrote a regex to find every string between `href=` and `.htm` (e.g. `a href="/EXAMPLE/example.htm`) using `(?<=href=)(.*?)(?=\.htm)`. I then replaced all of these with a lowercased version (`\L$1`). In most cases this didn't change anything, but it fixed 60-70 links that were broken. I then repeated this process with `.gif` suffixes.

[![](/assets/images/2022/vscode_lowercase.png)](/assets/images/2022/vscode_lowercase.png)

### Link extensions
Finally, I did a simple find and replace for `.GIF` with `.gif` and `.HTM` with `.htm`, to make sure all the links went to the correct extension.

## File encoding
Now that navigation was sorted, and the sites looked good, I uploaded them. I sorted out GitHub pages, the DNS records etc, thinking I was done, and checked it in the browser. Only to be greeted by... question marks sprinkled liberally over the sites, especially the German one!

[![](/assets/images/2022/missing_characters.png)](/assets/images/2022/missing_characters.png)

It worked perfectly on my machine, but got filled with question marks when served from GitHub pages. Hmmm...

This ended up taking far too long to diagnose, but I eventually discovered the sites were encoded in `iso-8859-2`, NOT `utf-8`. Detecting encoding is much trickier than filetype, as a file can be valid in multiple encodings at once, there's no guaranteed way to tell. My local files were ambiguous, and Windows / Chrome was figuring it out, but my remote files were explicitly UTF-8 like almost every other page on the internet.

VS Code and Notepad++ both have "convert encoding" functionality, but neither seemed able to actually do the job, and certainly not in bulk. Luckily, [File Encoding Checker](https://github.com/amrali-eg/EncodingChecker) can do it easily:

[![](/assets/images/2022/file_encoding_checker.png)](/assets/images/2022/file_encoding_checker.png)

## Landing page

Finally, I added a quick and dirty language selector linking to the 3 manuals. Done!

**[https://settlers.jakelee.co.uk](https://settlers.jakelee.co.uk)**

[![](/assets/images/2022/settlers_landing.png)](https://settlers.jakelee.co.uk)

