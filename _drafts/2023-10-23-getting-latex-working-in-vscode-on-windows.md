---
title: How to get LaTeX previews & autocomplete working in VSCode on Windows
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - VSCode
    - LaTeX
    - Windows
---

I recently decided to learn the basics of LaTeX, a way of formatting documents primarily used in STEM academia. Perhaps foolishly, I decided to only work within my beloved VSCode editor, as I do for almost all other work. This was not as smooth as I expected, here's a complete beginner's guide to getting LaTeX working in VSCode Windows!

## Installing LaTeX support

First up, we need LaTeX support. This is where it instantly can get a little confusing!

There are multiple "distributions" of LaTeX (e.g. TeX Live, MiKTeX), which themselves basically package up "TeX". These distributions have installers, then schemes, packages, it's all a bit overwhelming to a beginner.

Luckily, having just blundered through these mysteries, I can keep it nice and simple.

### Downloading the TeX Live installer

You need TeX Live, as it contains all the core components we're after.

Install it [from tug.org](https://www.tug.org/texlive/windows.html) by clicking **install-tl-windows.exe**.

Double-click the file once downloaded, and... Windows will likely flag it as from an unknown source. Choose "Proceed anyway".

As [this StackExchange answer](https://tex.stackexchange.com/questions/239199/latex-distributions-what-are-their-main-differences/239204#239204) states the same URL, and other search results reference it too, we trust the source.

### Running the TeX Live installer

The first screen we see has the "Install" option already selected, so click "Next".

[![](/assets/images/2023/latex-install1.png)](/assets/images/2023/latex-install1.png)

The second screen is more of the same, click "Install".

[![](/assets/images/2023/latex-install2.png)](/assets/images/2023/latex-install2.png)

This will pop up a scary looking window whilst it extracts the installer, this should only take a few seconds.

[![](/assets/images/2023/latex-install3.png)](/assets/images/2023/latex-install3.png)

When this has finished, a picture of a running cheetah will inexplicably appear for a few seconds whilst it finds a package server to connect to. This should disappear in a few seconds, replaced by the main installer.

[![](/assets/images/2023/latex-install4.png)](/assets/images/2023/latex-install4.png)

### Configuring the installation

Okay! We're ready to actually install LaTeX, or at least configure the installation.

By default, the installation will be 8GB, and includes every possible use of LaTeX. You are welcome to use that if you want, however it will take up to an hour(!) to install.

#### Reduce install size (optional)

Instead, I'd recommend changing the install scheme. To do this, click "Advanced", and you'll see a screen full of options.

Click "Change" next to "full scheme (everything)", and this dialog will pop up:

[![](/assets/images/2023/latex-install5.png)](/assets/images/2023/latex-install5.png)

Change the scheme to "basic scheme", then click "Install". 

This scheme is more reasonable, around 430MB, and will take around 5 minutes to install on an SSD. However, it does not include a crucial package we need ("latexmk").

####



