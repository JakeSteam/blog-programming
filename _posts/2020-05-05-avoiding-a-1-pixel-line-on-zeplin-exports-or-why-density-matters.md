---
id: 2764
title: 'Avoiding a 1 pixel line on Zeplin exports, or why density matters'
date: '2020-05-05T17:30:22+01:00'
author: 'Jake Lee'
layout: post
permalink: /avoiding-a-1-pixel-line-on-zeplin-exports-or-why-density-matters/
image: /wp-content/uploads/2020/05/devices-density_2x.png
categories:
    - Development
tags:
    - density
    - dpi
    - UX
    - zeplin
---

Recently I needed to update some marketing images in an Android app, based on our designer’s Zeplin screens.

Exporting &amp; using these images is usually no problem, but this time our QA reported the images had an unusual white line at the bottom or right on some devices! I manually fixed them in PhotoShop, then hunted for the root cause…

[![](/wp-content/uploads/2020/05/FYR8IXi.png)](/wp-content/uploads/2020/05/FYR8IXi.png)

## Densities

To understand why this happens, we first need to quickly understand [Android’s densities](https://developer.android.com/training/multiscreen/screendensities). Different devices have differences in quality &amp; size of screen, so to make a 2cm wide image on one device might need 50 pixels, on another it might need 250. [![](/wp-content/uploads/2020/05/devices-density_2x.png)](/wp-content/uploads/2020/05/devices-density_2x.png)

This is why we package difference **densities** of every image, so we can display smaller images on smaller / lower resolution devices, and vice versa. On Android we primarily deal with the following 5 densities, which can all be expressed as multiples of each other: mdpi(1x), hdpi (1.5x), xhdpi (2x), xxhdpi (3x), and xxxhdpi (4x).

## The problem

The specific asset we were using had a resolution of 3072×444 pixels at the highest density, that is then downscaled for our various densities:

- xxxhdpi: 3072×444
- xxhdpi: 2304×333
- xhdpi: 1536×222
- **hdpi: 1152×166.5**
- mdpi: 768×111

Notice the non-whole number there? That’s a problem!

When Zeplin is generating this asset for export, it rounds the size up to 1152×167. However, it has no data for what to put in there so leaves it as a transparent pixel. This is usually fine, unless you’re exporting as as a JPG without transparency, in which case you’ll end up with… our white pixel row / column.

## The solution

Luckily, this is really, really easy to fix. If our xxxhdpi asset was instead 3072×440, we’d now have the much nicer:

- xxxhdpi: 3072×440
- xxhdpi: 2304×330
- xhdpi: 1536×220
- **hdpi: 1152×165**
- mdpi: 768×110

Now when we export our assets, we end up with the following (old on top, new on bottom), notice the lack of white pixel?

[![](/wp-content/uploads/2020/05/I7zOvZi.png)](/wp-content/uploads/2020/05/I7zOvZi.png)

There we go! So long as the mdpi asset has an even number of pixels in it’s width and height, there’ll be no problems.