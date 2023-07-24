---
title: Showing your latest posts (from multiple sources) on your GitHub profile
author: Jake Lee
layout: post
image: /assets/images/2023/profile-header.png
tags:
    - GitHub Actions
    - Automation
---

[GitHub profile READMEs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme) are a relatively new addition (2020), letting devs add a little description of themselves, and even display dynamic content like latest blog posts or current Spotify track. Whilst [I've had a basic README](https://github.com/JakeSteam) for over a year, I recently added a combined list of recent articles from all my sites using a GitHub Action.

Whilst there are quite a few GitHub Actions available to display an RSS feed, most of them don't support multiple sources. I found a few ways to solve the problem by writing my own RSS poller and parsing the data myself, but I wanted something much easier! 

Luckily, I found [Sarisia's `actions-readme-feed`](https://github.com/sarisia/actions-readme-feed), and used it to [create my profile](https://github.com/JakeSteam/JakeSteam). Here's how to use it:

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

Finally, you'll also need to [give the GitHub action the ability to commit code](https://stackoverflow.com/a/75308228), so that it can actually update! This is done in the repository's settings, under `Actions`, `General`, `Workflow permissions`:

[![](/assets/images/2023/profile-permissions.png)](/assets/images/2023/profile-permissions.png)

## Adding automation

Now the actual GitHub Action that lives in `blog-post-workflow.yml` needs to be written! The [action's repository](https://github.com/sarisia/actions-readme-feed) has detailed instructions, here's my config:

{% raw %}
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
{% endraw %}

And the output:

[![](/assets/images/2023/profile-result.png)](/assets/images/2023/profile-result.png)

## Customisation

This config works perfectly for me! 

However, you'll undoubtedly want to make some changes, so here are the parts to change:
* **`schedule:cron`**: Sets this action to run every 6 hours. I recommend using [a cron helper](https://crontab.guru/) if you want a different time.
* **`workflow_dispatch`**: Allows this action to be run manually, great for testing.
* **`format`**: Defines a slightly different format for each post, [as per docs](https://github.com/sarisia/actions-readme-feed#formatting).
* **`url`**: Defines a list of RSS URLs to pull from, in this case all my sites.

## Notes

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
* The ability to set the user-agent for the polling, so that it can be distinguished in server logs from other robots (e.g. for whitelisting).

### Conclusion

So, [my profile](https://github.com/JakeSteam) now has recent posts showing, nice! It would probably look a bit nicer if my titles were shorter, but old habits die hard.

I'm still unsure what I actually want my GitHub profile to look like. A short personal description and these recent posts is good enough for now, but one day I'd love to have an actually aesthetic profile. Perhaps a banner with nice typography, along with some very subtle automatic statistics around commits, languages used, activity elsewhere online, etc.

However, it's very easy to take this too far. There is a [showcase site](https://zzetao.github.io/awesome-github-profile/) of GitHub profiles, and some of them... are an absolute mess. Personally, I feel the `README.md` has to be as short as possible, to make the more useful content (recent activity, pinned repos) easier to access. The only exception to this is the intentionally ridiculous ones, like [playable Chess](https://github.com/timburgan) or [playable tic-tac-toe (with no automation!)](https://github.com/kylepls). 

