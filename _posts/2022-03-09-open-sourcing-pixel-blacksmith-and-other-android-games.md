---
title: Open sourcing Pixel Blacksmith and my other old Android games
author: Jake Lee
layout: post
image: /assets/images/2022/opensourceheader.png
tags:
    - 'Open Source'
    - Gaming
    - Android
---

I originally got into Android development by making a game in my spare time, Pixel Blacksmith. This game ended up becoming *way* more popular than I could have imagined, and persuaded me to follow app development as a career! Now, I'm open sourcing this and other game codebases.

These codebases are mostly 5-6 years old, so actually compiling them may be tricky. However, they'll have a lot of functionality that will still be useful today, so feel free to lift out any useful sections!

The only excluded game is BocaBase from 6-7 months ago, since I *might* come back to it.

## The games

| Game | Screenshot | Notes |
| :--: | :--: | :-- |
| Pixel Blacksmith<br><br>[Play Store](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmith)<br><br>[GitHub Repo](https://github.com/JakeSteam/PixelBlacksmith) | [![](/assets/images/2022/opensource-blacksmith-thumbnail.png)](/assets/images/2022/opensource-blacksmith.png) | My first app, and by far my most successful! With 250k downloads, 1400 commits, and 56 releases, the app still has players despite the awful codebase! |
| Blacksmith Slots<br><br>[Play Store](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmithslots)<br><br>[GitHub Repo](https://github.com/JakeSteam/BlacksmithSlots)<br><br>[Trailer](https://www.youtube.com/watch?v=d1J1LDp8vps) | [![](/assets/images/2022/opensource-slots-thumbnail.png)](/assets/images/2022/opensource-slots.png) | A spin-off to Pixel Blacksmith, trying to merge 2 of my favourite categories: slots & RPGs.<br><br>Unfortunately not very successful, but it's still the only game I've made with an actual storyline and opening cutscene! |
| Connect Quest<br><br>[Play Store](https://play.google.com/store/apps/details?id=uk.co.jakelee.cityflow)<br><br>[GitHub Repo](https://github.com/JakeSteam/ConnectQuest) | [![](/assets/images/2022/opensource-connect-thumbnail.png)](/assets/images/2022/opensource-connect.png) | Inspired by various "zen loop" games, this expanded the concept to include many "flow" types, a complex puzzle generator, and the ability to share levels by QR code. |
| Pixel Bookshop<br><br>[GitHub Repo](https://github.com/JakeSteam/PixelBookshop) | [![](/assets/images/2022/opensource-bookshop-thumbnail.png)](/assets/images/2022/opensource-bookshop.png) | An unfinished project that would have been the true sequel to Pixel Blacksmith.<br><br>Basic functionality was implemented, but I never got round to it! |

## Licensing

All of the repositories use the [MIT License](https://choosealicense.com/licenses/mit/), essentially giving complete freedom for anyone to use any part of them for any reason. 

The only exception is some of the graphics for the games, which have been removed (see next section) to avoid accidentally violating copyright!

## Redacting images

To redact the images whilst keeping their dimensions and adding the filename on top for identification, I originally asked [SuperUser StackExchange](https://superuser.com/a/1708721/722280) but ultimately ended up figuring out my own solution:

Using [IrfanView](https://www.irfanview.com/)'s `File` -> `Batch Conversion/Rename` on all images that needed removing, and selecting `Advanced options`:

* Set the image's brightness to -255 (all black).
* Add the image's filename on top:
    * Position the text in the `Center`.
    * Set the text to `$F` to use the filename.
* Overwrite the original image.
* Modifying the `Custom processing order` to make sure the text is added last.

[![](/assets/images/2022/opensource-irfan-740w.png)](/assets/images/2022/opensource-irfan.png)

*This very confusing screen is also [available as a `settings.ini` file](https://gist.github.com/JakeSteam/6cf2c38fd1a6612d5e26f655f5aa1343)!*

| Before | After |
| -- | -- |
| ![](/assets/images/2022/opensource-before.png) | ![](/assets/images/2022/opensource-after.png) |
