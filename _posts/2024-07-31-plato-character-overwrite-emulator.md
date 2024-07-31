---
title: Introducing a PLATO character overwriting emulator
author: Jake Lee
layout: post
image: /assets/images/2024/plato.png
tags:
  - Emulation
  - Text
  - Retro
---

I recently had a GREAT idea to overlap pixel art letters to form artwork... then discovered it had been done in the 1970s by [PLATO system](<https://en.wikipedia.org/wiki/PLATO_(computer_system)>) users. Well, fine, I'll build a basic emulator instead!

## Emulator

Available at **[plato.jakelee.co.uk](https://plato.jakelee.co.uk/)**, the core concept is you type letters, and they get overlapped. For example `o` and `l` would draw a circle with a vertical line through it, and so on. Sounds simple, but it's surprising how complex the images can get!

[![](/assets/images/2024/plato.png)](https://plato.jakelee.co.uk)

My emulator uses the original PLATO font "PlatoAscii.ttf", available from the PLATO preservation group [cyber1](https://www.cyber1.org/keyboard.asp). Whilst I did install their full "Pterm" emulator and connect to their mainframe, it's a little unintuitive for beginners!

## Examples

Experimenting is most of the fun, but here's a few examples courtesy of "[Plato People](http://www.platopeople.com/emoticons.html)" in 2002:

[![](/assets/images/2024/plato-examples.gif)](/assets/images/2024/plato-examples.gif)

## Features

The emulator is very basic, and only supports full size characters (e.g. not superscript or subscript) included in the font file. This means some PLATO-specific symbols such as arrows are not available yet.

Whilst a to-do list of features is [available in the source code](https://github.com/jakesteam/PLATO-overwrite-emulator/?tab=readme-ov-file#capabilities), possible future features include:

- [ ] Ability to link to a prefilled creation (e.g. `?q=WOBTAX`).
- [ ] Support every character the real PLATO system can display.
- [ ] Create a large library of example artwork.
- [ ] Support multiple characters in a row for more complex artwork.
- [ ] A way to view (3D?) how each character contributes to the final creation.

## Technical details

The full source code [is available in a GitHub repo](https://github.com/jakesteam/PLATO-overwrite-emulator/).

The emulator is very simple, and not really an emulator! All it's doing is layering each letter on top of each other, adding the ability to append / replace the text, and a bit of CSS styling on top. It's hosted on GitHub Pages and runs entirely in the browser (obviously!).

Since my JavaScript and CSS are pretty rusty, GitHub Copilot did a lot of the heavy lifting, especially around clicking to add / edit text. Thanks GitHub!

## Links

- To find out more about PLATO, and try the real thing, visit [cyber1.org](https://cyber1.org/).
- For more example emoticons, there are short articles [from 2002](http://www.platopeople.com/emoticons.html) and [2012](http://www.platohistory.org/blog/2012/09/plato-emoticons-revisited.html).
