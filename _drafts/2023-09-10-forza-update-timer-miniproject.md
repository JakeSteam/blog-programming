---
title: Introducing "Forza Update", a minisite automatically tracking the next Forza Horizon 5 season & series
author: Jake Lee
layout: post
image: /assets/images/2023/fh5minisite.png
tags:
    - Forza Horizon 5
    - Gaming
    - Javascript
---

As you might have realised from my previous Forza Horizon 5 posts, I play it a lot! Each week we get a new content drop, and I often got confused about update times due to timezones. To solve this, I created a new minisite.

The site is available at [forza.jakelee.co.uk](https://forza.jakelee.co.uk/).

[![](/assets/images/2023/fh5minisite.png)](/assets/images/2023/fh5minisite.png)

## Functionality

Although the site has limited functionality, *hopefully* it is a useful resource. The site tracks the next series & season dates, whilst also providing information on them where possible. 

## Plans 

I'd like to expand on the site eventually to have an actual design besides GitHub Pages' default. For now though, it's "good enough".

## How it works

[All the code used for the site](https://github.com/jakesteam/forzaupdate) is public ([forza.js specifically](https://forza.jakelee.co.uk/js/forza.js)), and it is honestly mostly from StackOverflow.

Every function that is adapted from a StackOverflow answer is credited, but here is a complete list:

* [Creating a date for a specific day each week](https://stackoverflow.com/a/65869347/608312).
* [Displaying a countdown to a date](https://stackoverflow.com/a/9335296/608312).
* [Calculating weeks between 2 dates](https://stackoverflow.com/a/22859920/608312).
* [Adding days to a date]( https://stackoverflow.com/a/19691491/608312)

## Conclusion

Overall I'm happy enough with the site, and I'll likely use it each week to check when I'll receive an update due to shifting timezones.