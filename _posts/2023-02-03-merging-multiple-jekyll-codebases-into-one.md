---
title: How I merged my 3 Jekyll site codebases into 1, as a public theme
image: /assets/images/2023/merge-original-situation.png
tags:
    - Jekyll
    - Minima
---

Up until last week I had 3 blogs, each with their own GitHub repositories, copies of code, CSS modifications, and overall configuration. Whilst this *worked*, it was impossible to maintain or scale up. In this post I'll describe how I merged all of these into 1, whilst also updating to the latest Minima version and making future improvements much easier to implement.

## The situation

So how did I end up with 3 almost identical codebases? Well, I had my programming blog (this one!), then added my [personal blog](https://jakelee.co.uk/), and more recent an [internet history blog](https://history.jakelee.co.uk/). Both of these spin-off projects were initially just little experiments, so weren't worth creating an elegant solution for. 

To summarise, currently each blog has:

* **Posts / images**. All the actual blog content, displayed according to the:
* **Custom code / CSS**. Features like search, in addition to custom site colours, all built on top of:
* **Minima theme**. The 2.5.1 Minima theme code.

[![](/assets/images/2023/merge-original-situation.png)](/assets/images/2023/merge-original-situation.png)

However, since I am now considering a 4th blog, it was time to bite the bullet and actually fix the duplication problem!

## The problem

You might be asking since the blogs were thriving in their own codebases, what's the issue?

### Duplicate work 

Well, day to day it was fine. I could write a new post, add images, do whatever I needed to nice and easily. The problem came when I wanted to make a CSS fix, or add a new feature to the site. I'd have to manually copy blocks of code between the 3 sites, which is a recipe for disaster. 

Even with the very limited feature disparity between sites (e.g. one site has a donation button, the rest don't), the few additional lines of code cause line numbers to differ, making future copy & pasting error-prone. 

### Hard to migrate

Additionally, I wanted to migrate to the unreleased Minima 3.0.0 theme. It includes a few quality-of-life changes, as well as built-in automatic dark mode functionality. This would require quite a few changes to the site, and doing that 3 times with slightly different codebases would undoubtedly have introduced issues.

## The solution

My target end state is no duplication. This is likely to be achieved by merging the Minima theme & custom code blocks from the diagram earlier, leaving just a per-site config and any posts. I also want to:

1. Be able to configure my blogs (accent colour, title, features, etc) in one file each.
2. Only need to add new functionality in one place. 
3. Be able to easily "update" to the latest shared codebase version on a per-blog basis at the time I choose.
4. Be able to push changes to the core codebase without any risk of them ending up on a real site.

Since I was making significant changes and merging codebases, I also decided to update to the unreleased Minima 3!

### What didn't work 

Whilst I knew whatever approach I used would need some sort of "config" file per site (instead of the current custom code on every side), I wasn't quite sure how to apply that config.

#### Forks 

One of my first thoughts was to restructure my repositories to logically represent the code inheritance. So, my "core" codebase would be a GitHub fork off the actual Minima repo, and each blog would be a fork off my "core" codebase.

Initially this seemed promising, as it would mean each repository clearly shows what it is based on, and newly contributed changes could be pulled from the upstream Minima repo into my blogs directly.

Unfortunately, it would have required recreating all of my repositories as forks, allowing them to be "linked" to each other on GitHub. This would have required reconfiguring all the GitHub pages setup, whilst also forcing me to regularly merge between repositories. Finally, whilst not a dealbreaker, none of my commits would have "counted" as a contribution, since GitHub [doesn't count commits in a fork](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile#commit-was-made-in-a-fork). Ultimately I realised a chain of forks maybe wasn't what I wanted.

[![](/assets/images/2023/merge-forks.png)](/assets/images/2023/merge-forks.png)

#### Submodules

Next, I considered pulling all the shared code into one repository, then including this as a git submodule within my blog repositories. This was perhaps a more accurate logical mapping, since the shared code was a "part" of the overall blog. Additionally, updating would be easy, just update the submodule commit.

Again, this idea didn't end up working. The shared files (e.g. `_includes`) are in the same directory level as the posts themselves, whereas a submodule needs to be inside a dedicated folder. Whilst I *could* have reconfigured the build system to look for the posts somewhere else, I've worked in a project that depended on submodules before, and it wasn't very fun!

[![](/assets/images/2023/merge-submodule.png)](/assets/images/2023/merge-submodule.png)

### What did work

So, I'd tried a couple of git features I knew, and neither of them had been quite right. I put the project aside for a day or two, and tried to come at it from a new angle. Whilst researching how to use the "new" unreleased version of Minima, I discovered Jekyll had the ability to load the theme from a GitHub repository using [`remote_theme`](https://github.com/benbalter/jekyll-remote-theme). This gives a similar effect to a submodule.

In my original architecture, I'm layering all my custom code and config on top of the Minima theme. What if... my custom code is included in a theme? What if, instead of using the default theme and layering changes on top, I just used my own customised copy of it to begin with?

Well, that works perfectly! I've [called it minimaJake](https://github.com/JakeSteam/minimaJake), and I'll write about it properly in a future post.

[![](/assets/images/2023/merge-solution.png)](/assets/images/2023/merge-solution.png)

Now, my (and anyone else's) sites can use the shared theme and all its features just by adding `remote_theme: JakeSteam/minimaJake` to their `_config.yml`.

This has a number of advantages:

1. The solution uses built-in Jekyll features (well, with a supported plugin), avoiding any weird configuration hacking.
2. Each blog's repository (e.g. [programming blog](https://github.com/JakeSteam/blog-programming)) only contains the assets it needs (posts, images, configuration, any static pages).
3. The "merged" theme is available to the public, in case anyone wants to use features from my blogs. There's also a chance others might want to help add new features.
4. The remote theme system is aware of GitHub releases. This means I can peg all my sites to v1.0.0 of minimaJake, safely make & push changes to the repository, and eventually release v1.0.1 when it is stable.

## Conclusion

Overall, the migration went much more smoothly than I expected. Once I had the first site configured, the other sites took almost no effort at all, showing the flexibility of the theme system. I'm very, very appreciative of how open the Jekyll theming and configuration system is, whereby it takes almost no effort to add new feature toggles, design changes, or config variables. 

In some ways, this migration reminds me of my move from Wordpress to Jekyll [almost a year ago](https://blog.jakelee.co.uk/blog-has-moved-from-wordpress-to-jekyll/). Whilst I previously avoided improving the codebase due to the messy nature of the duplicated code, recently I've had endless ideas about improvements all the sites would benefit from.

Due to this, there's plenty of next steps I'm excited for! First, I want to write proper documentation for minimaJake and all the blogs that use it. Right now they just have basic documentation from when I was learning Jekyll, not particularly helpful for anyone who has spent 5 minutes with Jekyll! Next, some way to navigate easily between my growing collection of sites...

PS: This is my first post using [Excalidraw](https://excalidraw.com/) for diagrams, it's great!

## Notes

### Actions taken

To summarise, here's the actual changes I made:

1. Checked out the official [Minima repo](https://github.com/jekyll/minima).
2. Deleted everything I didn't need (e.g. GitHub Actions scripts).
3. Pushed to a new repository.
4. Copied across every feature & CSS change from my current sites, in a config-controlled way.
5. For each site repository, deleted everything except posts & related assets, then set up the `_config.yml` file.
6. Checked this local site matched the current live site, and published.

### Differences to Minima

There will be a follow-up post with all the changes minimaJake includes, here's a high-level overview:

Native (liquid) features:

* Table of contents
* Linkable headers
* Tag system
* End of post call to action
* Social & meta link system in footer

Third party features:

* Search (via lunr.js)
* Giscus comments
* Configurable Ko-fi donation button & floating prompt

Design changes:

* Banner images
* Accent colour system

### Simple config

In my [programming blog's config file](https://github.com/JakeSteam/blog-programming/blob/main/_config.yml) for example, all the commonly configured options are at the very top:

```yaml
# Basic site setup
remote_theme: JakeSteam/minimaJake@1.0.1
title: Jake Lee on Software
description: In-depth ad-free articles about software development, Android, and the internet
accent_colour: "#2a7ae2"

# Optional native feature customisation (delete to turn off)
table_of_contents_header: "Jump to:"
post_end_promo: <i><b>Enjoyed this article? You'll like "<a href="https://jakeweeklee.substack.com">Jake Week Lee</a>", a weekly newsletter of articles & found media!</b></i>
google_analytics: G-99X0QYL39T

# Third party feature customisation (delete to turn off)
giscus_repo: JakeSteam/blog-programming
giscus_repo_id: MDEwOlJlcG9zaXRvcnkzNTk5Mzc1OTM=
giscus_category: Comments
giscus_category_id: DIC_kwDOFXQ2Oc4CQ06o
```

To start up an instance of a "minimaJake" blog, all that needs changing are the title, description, and accent colour, as well as deleting any unwanted features. This makes it super flexible, for both myself and any third party users.
