---
title: Showing your latest posts (from multiple sources) on your GitHub profile
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - GitHub
---

[GitHub profile READMEs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme) are a relatively new addition, letting devs add a little description of themselves, and even display dynamic content like latest blog posts or current Spotify track. Whilst [I've had a basic README](https://github.com/JakeSteam) for over a year, I recently added a combined list of recent articles from all my sites using a GitHub Action.

Whilst there are quite a few GitHub Actions available to display an RSS feed, most of them don't support multiple sources. I found a few ways to solve the problem by writing my own RSS poller and parsing the data myself, but I wanted something much easier! 

Luckily, I found [Sarisia's `actions-readme-feed`](https://github.com/sarisia/actions-readme-feed), here's how to use it:

## Creating a profile repository

Before we add any complex content, you need to create a profile repository.

[GitHub has a detailed guide](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme), essentially:
1. Create a public repository with the same name as your username.
2. Create a `README.md` file inside.
3. Done!

## Preparing repository

First, add placeholder tags inside your `README.md` to be replaced by the dynamic content. This can be any text, but the default is good enough:

```
<!-- feed start -->
<!-- feed end -->
```

Next, inside your profile repository, add a new file at `.github/workflows/blog-post-workflow.yml`. If adding this via GitHub's web interface, just type `/` when creating a new file to also create the directories:

[![](/assets/images/2023/profile-newfile.png)](/assets/images/2023/profile-newfile.png)

## Adding automation

Now the actual GitHub Action that lives in `blog-post-workflow.yml` needs to be written! The [action's repository](https://github.com/sarisia/actions-readme-feed) has detailed instructions, here's my config:

```yml
name: All recent posts
on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

jobs:
  readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: sarisia/actions-readme-feed@v1
        id: feed
        with:
          file: 'README.md'
          format: '- ${day} ${monthlong} - [${title}](${url})'
          url: |
            https://jakelee.co.uk/feed.xml
            https://blog.jakelee.co.uk/feed.xml
            https://history.jakelee.co.uk/feed.xml
            https://minima.jakelee.co.uk/feed.xml
      - if: ${{ steps.feed.outputs.changed == true }}
        uses: sarisia/actions-commit@master
```

And the output:

[![](/assets/images/2023/profile-result.png)](/assets/images/2023/profile-result.png)

## Customisation

This config works perfectly for me! 

However, you'll undoubtedly want to make some changes, so here are the parts to change:
* **`schedule:cron`**: Sets this action to run every 6 hours. I recommend using [a cron helper](https://crontab.guru/) if you want a different time.
* **`workflow_dispatch`**: Allows this action to be run manually, great for testing.
* **`format`**: Defines a slightly different format for each post, [as per docs](https://github.com/sarisia/actions-readme-feed#formatting).
* **`url`**: Defines a list of RSS URLs to pull from, in this case all my sites.

## Final notes

### Performance

Whilst the time taken to retrieve the RSS feed obviously depends on your site, as mine are cached heavily the GitHub Action is very, very fast! It takes ~7 seconds total, with around half of that setting up the job and checking out the repository:

[![](/assets/images/2023/profile-time.png)](/assets/images/2023/profile-time.png)

Given this, it's relatively safe to add more complex logic into the GitHub Action without worrying about using up too much server time. 

### Potential improvements

The [`actions-readme-feed` action](https://github.com/sarisia/actions-readme-feed#formatting) we're using for this is good for the basics, but I'd love to see a couple of things added to it. [It's open source](https://github.com/sarisia/actions-readme-feed/tree/main/src) so it might be a good opportunity for me to improve my TypeScript skills... eventually.

* A way to indicate where articles come from when there are multiple sources (e.g. `Jun 24: [Programming] My article about code`).
* An option to only show the first X characters / words of a post.
* The ability to pull a thumbnail for each post.
* The ability to "prettify" dates, e.g. "24th June" instead of "24 June".