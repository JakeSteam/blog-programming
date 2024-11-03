---
title: 'This blog has migrated to Jekyll!'
image: /assets/images/2022/jekyll.png
tags:
    - Wordpress
    - Jekyll
    - Migration
---

You are now reading these words from a Jekyll-powered site, not Wordpress! But what does that actually mean?

Well, I'll be covering *Why I Switched*, *How I Switched*, and a few more detailed topics soon, but essentially the site is now:
* Much faster
* Much cleaner
* Much easier to work with
* Free to run!

## Speed

I compared some "before" and "after" scenarios, to see how much faster the speedy new site is:

| Page | Wordpress | Jekyll | Comment |
| -- | -- | -- | -- |
| Homepage | [![](/assets/images/2022/old-home-thumbnailsmall.png)](/assets/images/2022/old-home.png)<br>3.58s to load, 44 requests | [![](/assets/images/2022/new-home-thumbnailsmall.png)](/assets/images/2022/new-home.png)<br>0.07s to load, 16 requests | A 98% decrease in load times(!), and 64% decrease in requests! The downside is larger images, discussed below. |
| Image heavy post | [![](/assets/images/2022/old-img-thumbnailsmall.png)](/assets/images/2022/old-img.png)<br>3.47s to load, 76 requests | [![](/assets/images/2022/new-img-thumbnailsmall.png)](/assets/images/2022/new-img.png)<br>0.08s to load, 21 requests | Another 98% load time decrease, and 72% request decrease. The image downside is very noticeable here, with over 4x as much data transferred. |
| Code heavy post | [![](/assets/images/2022/old-text-thumbnailsmall.png)](/assets/images/2022/old-text.png)<br>4.43s to load, 70 requests | [![](/assets/images/2022/new-text-thumbnailsmall.png)](/assets/images/2022/new-text.png)<br>0.08s to load, 13 requests | 98% load decrease and 81% request decrease. The "image scaling" handicap isn't relevant here, and the real speed difference comes into play! |

*All requests are from the live site, via Cloudflare, skipping local cache. Repeated 3x, middle value taken.*

Since the newer site is essentially all prerendered pages displayed when requested, it's **drastically** faster. It's also much, much simpler. However, you might have noticed in the above screenshots that the new site actually often transfers *more* data. For a streamlined, simple site, this would seem bizarre, until you look at the requests being made.

The new site only has 1 copy of every image. If I've been silly and used a giant screenshot as the post header, that's the only size available! Previously, Wordpress would have a few copies of every image, and show the appropriate size. Once I've implemented this to the new site, speeds should improve slightly, and page size too.

***2022-02-16 update: Thumbnails are now implemented, we're no longer loading the full image!***

## Appearance

| Page | Wordpress | Jekyll | Comment |
| -- | -- | -- | -- |
| Homepage | [![](/assets/images/2022/screenshot-old-home-thumbnailsmall.png)](/assets/images/2022/screenshot-old-home.png) | [![](/assets/images/2022/screenshot-new-home-thumbnailsmall.png)](/assets/images/2022/screenshot-new-home.png) | The Wordpress site had far too much going on. Whilst I do like the compact post previews, I prefer the visually striking banners on Jekyll.<br><br>Since my blog is all about content, stripping everything else away seemed the best approach! |
| Post | [![](/assets/images/2022/screenshot-old-post-thumbnailsmall.png)](/assets/images/2022/screenshot-old-post.png) | [![](/assets/images/2022/screenshot-new-post-thumbnailsmall.png)](/assets/images/2022/screenshot-new-post.png) | The post page has improved more than the homepage. Code samples are now far more readable (they're the point of the blog...), and the content of articles is the focus.<br><br>For less code-based articles ([example](/a-quirk-of-strings-xml-for-multiple-regions-per-language-in-android/)), the differences are even more noticeable. That being said, there's still some tidying to do. |

## Writing & Maintaining

Previously when writing a post I had to stay online, and use the Wordpress WYSIWYG editor. This was OK for simple formatting like bold text, but I would often need to preview the actual post. This preview took up to 10 seconds to load.

Now, I can write posts anywhere, using the syntax I'm most comfortable with, and can pick from a variety of offline clients with live preview etc (currently VSCode). I'm still figuring out the "drafts" process (hence this post!), but since it all runs on Git it should be fine!

Additionally, since the posts and site files are all essentially plain text, I can search & update them all very easily. This is so, so much nicer than trying to navigate a clunky web interface, especially when making changes to the site's structure / code. For comparison, just loading my Wordpress dashboard took 6-7 seconds. A full rebuild of the Jekyll site takes ~5 seconds, with subsequent builds taking 1-2 seconds.

## Cost

Previously I was paying $8.99/mo to host this site via [BlueHost](https://www.bluehost.com/). 

I am now paying $0, thanks to [GitHub Pages](https://pages.github.com/). A tiny bit cheaper.

## Conclusion

Whilst the blog is now migrated, there's a TON of cool things I now have the ability to do! Keep an eye out for future Jekyll-related posts...