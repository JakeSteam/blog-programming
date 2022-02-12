---
id: 2803
title: 'Exploring pull requests with GitHub&#8217;s rich diff functionality'
date: '2020-08-12T15:15:52+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2803'
permalink: /exploring-pull-requests-with-githubs-rich-diff-functionality/
image: /wp-content/uploads/2020/08/3qjoZ8A.png
categories:
    - Development
tags:
    - git
    - GitHub
---

Like many developers, I spend a surprisingly large amount of time reviewing other people’s code. In fact, according to GitHub that’s around 20% of my day![  
![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/A7EFN1q.png?resize=300%2C251&ssl=1)](https://blog.jakelee.co.uk/wp-content/uploads/2020/08/A7EFN1q.png)

When reviewing pull requests, code changes are very easy to review and approve. However, comparing images can be much harder to check, since by default GitHub only shows an unintuitive “Binary file not shown” message. Luckily, I recently discovered the rarely mentioned “rich diff” feature that makes this so, so much easier. I’ll briefly run through the functionality it offers, all screenshots in this post are from [my Rich Diff repo](https://github.com/JakeSteam/RichDiffExperiments).

## Overall

First of all, how do you access rich diff? Simple, click the “page” icon next to many file types! Once clicked, this will compare the two files in a much more helpful way. If no “page” icon is visible, rich diff is not available.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/dCv3J6o.png?resize=700%2C91&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/dCv3J6o.png?ssl=1)

## Image rich diff

Images are probably the best use cases for rich diff. I created a collection of test images (SVG, PNG, JPG, GIF, BMP), committed them, and [then committed](https://github.com/JakeSteam/RichDiffExperiments/commit/2fff7598b7ddc2b58bacc0e6e6860c8d5c5b4656) new versions of each.

I found SVGs, PNGs, JPGs, and GIFs can use rich diff, but BMPs cannot. For the compatible file types, there are 3 options for the rich diff:

### 2-up[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/3qjoZ8A.png?resize=150%2C150&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/3qjoZ8A.png?ssl=1)

This mode displays the images side by side, as well as their width, height, and file size. This is a great way to notice an image has slightly changed dimensions, since this might not be noticeable with the naked eye.

Unfortunately, this mode does not help when identifying small visual changes within the image itself, the other modes are better for that.

### Swipe[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/Rjf3nY8.png?resize=150%2C150&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/Rjf3nY8.png?ssl=1)

This mode displays the two versions of the image with a left to right slider over the top.

This is an excellent way of noticing small changes within an image, whilst still keeping track of the overall image.

### Onion Skin[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/u2wqvqB.png?resize=150%2C150&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/u2wqvqB.png?ssl=1)

This mode overlays the new image over the old one, and lets you control the transparency.

Just like “Swipe”, this lets you easily see small changes, whilst also being able to see the entirety of both images at all times.

## Document rich diff

Whilst images performed well, I was curious if common document types would work. In a word… no.

As before, I created &amp; [updated a selection of common formats](https://github.com/JakeSteam/RichDiffExperiments/commit/33ea6257db94e9f41d4ce4754fe99b1140bff5e1) (DOC, DOCX, HTML, PDF, RTF, MD), and only MD (markdown) had rich diff. The RTF and HTML files *did* show the code changes, but this isn’t particularly helpful for a verbose format like RTF!

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/KUBjqor.png?resize=700%2C225&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/KUBjqor.png?ssl=1)

The Markdown file fared much better, showing a very helpful visual indicator of what has been added and removed.

The coloured bars on the left indicate the line status (first line changed, second line added). The coloured highlights in the changed line indicate the removed and added sections, in an easy to understand format.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/FOya3Dn.png?resize=700%2C213&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/FOya3Dn.png?ssl=1)

Whilst this indicator usually works well, [in some commits](https://github.com/Aircoookie/WLED/commit/35098c474cecaff316bccab7e6bf925a03ef8fbe#diff-0730bb7c2e8f9ea2438b52e419dd86c9) it instead shows an entire section as changed instead of only the specific lines.

## Summary

In summary, rich diff is an extremely powerful feature that is nowhere near as well known as it should be. However, the inability to enable it by default, or to set a default image comparison type both make it a bit awkward to use.

One likely reason for the feature not being heavily promoted is the extra processing time on GitHub’s side required for a rich diff. At least in 2016, larger Markdown files could [take up to 5 seconds](https://github.com/cabforum/documents/issues/27), which is GitHub’s rich diff timeout.

Hopefully this post helps you next time you need to compare changed images in a GitHub pull request. It was a lifesaver when I recently needed to look at [a colleague](https://github.com/chris-sloan)‘s PR containing 180 JPGs!

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/Z5uYxKj.png?resize=501%2C215&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/08/Z5uYxKj.png?ssl=1)