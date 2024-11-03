---
title: 'Why I moved from WordPress to Jekyll'
image: /assets/images/2022/wordpress_to_jekyll.png
tags:
    - Wordpress
    - Jekyll
    - Blogging
---

As mentioned in [a previous post](/blog-has-moved-from-wordpress-to-jekyll), I finally took the time last weekend to migrate this blog across to a simpler, free solution. 
This decision wasn't taken lightly, so I wanted to expand on some of the reasons behind the move, in case others are on the fence. Heads up, this is a rant post!

First I want to briefly summarise the WordPress.org vs WordPress.com situation. 
Essentially, .org is the blogging software itself, .com is a platform selling access to hosted versions of the software, domains, email services, everything to actually run a site.

In this post "WordPress" usually refers to both of them, or can be determined from context.

## History of this blog's migrations
For context, here's this blog's adventures since 2016:
1. **Started off as the free `gamedevalgorithms.wordpress.com`**, obviously via WordPress.com.
2. **Moved to `gamedevalgorithms.com`** on a paid plan, still via WordPress.com.
3. **Moved to `blog.jakelee.co.uk`**, as I was moving away from game development.
4. **Replaced WordPress.com with BlueHost**, as I wanted a bit more control and to not have to pay more for minor changes.
5. **Left WordPress entirely for Jekyll**, for the reasons detailed in this post!

Without any further ado, in descending order of "how much they annoyed me", here's my complaints about WordPress:

## Security
WordPress is famous for suffering from security exploits, even on a fresh install. As an example, a [patch 5 weeks ago](https://wordpress.org/news/2022/01/wordpress-5-8-3-security-release/) fixed multiple SQL injection vulnerabilities in the core code, a terrifying threat when considering [43% of sites](https://wordpress.org/) use WordPress!

This also doesn't cover the many, many, many vulnerable plugins, with almost every large plugin having vulnerabilities at some point. From the very few plugins I used, Yoast SEO with 5m+ installs has [18 on record](https://wpscan.com/search?text=yoast), and Updraft with 3m+ [has 8](https://wpscan.com/search?text=updraft).

As a site owner, it feels like an impossible task trying to keep your site secure. I intentionally went for a managed WordPress install, so I *wouldn't* have to constantly update WordPress, but plugins aren't included in this. 
Do you enable plugin autoupdates, potentially introducing vulnerabilities but fixing known ones, or disable them, leaving your site open to the known vulnerabilities? Not a great choice!

This often meant that useful plugins (like the one to backup posts to GitHub) would simply die on later versions of WordPress, and there was no way to fix them. After a few dead plugins, you become a bit bitter.

The cherry on the security cake? I had to install a third party plugin to protect my site behind 2FA. Would a hacker be able to get through? Probably! Did it ever feel truly secure? Nope!

## Speed
Whilst WordPress can presumably load relatively quickly in other scenarios, my experience on BlueHost was painfully slow. 

Of course I was on the cheapest plan, paying a not-insignificant $8.99/mo, but 3-4 seconds loading any page (even via Cloudflare caching) is madness. The internal dashboard took 10 seconds to load, and saving a draft took about as long.

I'm sure the blame is shared between the platform, the hosting, the plugins, and maybe something misconfigured, but it was awful. I actively dreaded opening up the editor, which... isn't conducive to writing good blog posts.

## Comfort
Related to the previous point, I wasn't particularly comfortable with using the fancy editor, then switching to the raw HTML to occasionally fix things.

All the documentation, PRs, and even my to-do list is in markdown, why not blog in it too? I can still put little bits of HTML if they're more convenient, but using a much more concise syntax like markdown feels natural.

The same applies for data storage and deployment; I use GitHub all day, why not run my site from it too? 

## Unnecessary
As you can probably tell from the new site, I've always just wanted to do write-ups of technical subjects to help others. I'm not interested in advertising, in guest posts, in fancy features, I just want to share some technical knowledge.

In retrospect, WordPress is probably the wrong platform for that. In the past I'd used Google's Blogger, because it was *so* simple, and just made for blogging. WordPress meanwhile can be used for pretty much anything, and that unfocused potential can be a drawback.

I didn't need advanced analytics, or multiple users, or a complex editor, or a shop, or anything. I needed a place to put text and images. 

## Control
I like to think of myself as relatively tech-savvy. I'm a software engineer, I've been on the internet for 20 years, I "get" it.

At least, I thought I did until I used WordPress. Even after 5(?) years of using the platform, I still don't really understand where the design comes from, where the data comes from, what components make up my site, etc. For those that work on WordPress for a living, I'm sure it makes perfect sense. As someone who knows a bit of PHP / JS / CSS, but hasn't dived deeply, it's... a complete mystery. 

I suspect if someone is at the "WordPress dev" or "Non programmer" ends of the spectrum, it makes sense, but not for those inbetween (or maybe I'm an idiot).

Additionally, as I tried to find a solution for just *showing code blocks*, I went through a few code syntax highlighters. As part of the migration process, I discovered some of my older posts had been completely mangled, with random HTML tags throughout. This kind of thing reinforces my problems with actually owning and controlling my own content! By contrast nobody / nothing can touch this post, even Jekyll will just transform it leaving the original file alone and safe.

## Ecosystem 
This is probably a "me" issue. As the majority of WordPress users seem to be non-technical (e.g. marketing, bloggers), looking for technical solutions felt very "wild west"-y. 

Most of the solutions were a snippet of code via a blog post, with no indication of side effects, risks, etc. Whilst StackOverflow has its issues, the voting and reputation systems at least give some reassurance that running a line of code won't cause anything to explode. 

Similarly, most of the WordPress blogs understandably cater to this large audience, which means wading through tens of marketing / SEO posts to find out how to change a setting. It ended up feeling like I was very much out of place.

## Reliability
Finally, this is undoubtedly just a BlueHost issue, but once or twice a year my site would silently go offline. I would have no idea it had happened, would just go to check something and discover it was down. I'd then have to contact support, and get them to... fix whatever they had broken.

## Conclusion
So, rant over! 

In summary, I can't recommend WordPress(.org or .com) to anyone just trying to start a simple blog. Jekyll is worth the time investment if you're a developer, or [Ghost](https://ghost.org/) if you're trying to get paid from posts.

This [quickstart guide for Windows](https://www.kiltandcode.com/2020/04/30/how-to-create-a-blog-using-jekyll-and-github-pages-on-windows/) was astonishingly easy to follow, and got me up and running in under 5 minutes, whereas my last attempt resulted in a confusion of Ruby dependencies and package managers! 

I'd love to see a company really support and champion Jekyll, perhaps by providing an all-in-one tool for configuring & migrating. Maybe the WordPress.com business model can be applied to Jekyll, with easy access to the nuts and bolts for advanced users..?
