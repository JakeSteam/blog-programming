---
title: What social accounts are supported on GitHub profiles?
author: Jake Lee
layout: post
image: /assets/images/2024/githubprofile-banner.png
tags:
  - GitHub
  - JavaScript
---

A somewhat hidden feature of GitHub profiles is the special treatment of profile links from 10 social networks. Here's a full list, how they are detected, and a way to check for yourself!

## Supported social networks

Putting profile links from any of the following websites as a link on GitHub should make the icon appear, and only your username shown. You've probably heard of most of them!

The supported networks are 8 traditional social networks:

1. [Facebook](https://www.facebook.com/)
2. [Instagram](https://www.instagram.com/)
3. [LinkedIn](https://www.instagram.com/)
4. [npm](https://www.npmjs.com/)
5. [Reddit](https://www.reddit.com/)
6. [Twitch](https://twitch.tv/)
7. [X (formerly Twitter)](https://twitter.com/)
8. [YouTube](https://www.youtube.com/)

Plus, 2 decentralised networks:

1. [Mastodon](https://joinmastodon.org/)
2. [Hometown (Mastodon fork)](https://github.com/hometown-fork/hometown)

## How are they detected?

### Traditional networks

Each network has 1 or more regular expressions to detect profile URLs, and that's it! Any URLs added to a profile are run through this, and a match triggers the special behaviour:

- Facebook
  - `^https://(?:[^.]+\\.)?facebook\\.com/(?:[^/?]+/?|profile\\.php\\?id=\\d+)$`
- Instagram
  - `^https://(www\\.)?instagram\\.com/[^/?]+/?$`
- LinkedIn
  - `^https://(?:www\\.)?linkedin\\.com/(?:in|company)/[^/?]+/?$`
- Reddit
  - `^https://(?:www\\.)?reddit\\.com/u(?:ser)?/([^/?]+)/?$`
- Twitch
  - `^https://(?:www\\.)?twitch\\.tv/[^/?]+/?$`
- X
  - `^https://(?:www\\.)?(?:twitter|x)\\.com/([^/?]+)/?$`
- YouTube
  - `^https://(?:www\\.)?youtube\\.com/(user|c)/[^/?]+/?$`
  - `^https://(?:www\\.)?youtube\\.com/channel/[a-zA-Z0-9_-]{24}/?$`
  - `^https://(?:www\\.)?youtube\\.com/@[^/?]+/?$`
- Npm
  - `^https://(?:www\\.)?npmjs\\.com/~([^/?]+)/?$`

I used a short JavaScript snippet to extract these, see ["Checking for yourself"](#checking-for-yourself) for more information.

### Decentralised networks

If your social link ends in `@Something` (specifically if it matches the regex `^https?://([^/]+)/@([^/?]+)/?$`), a completely different system is invoked!

To try and determine if the URL is a decentralised network, a call is made to `https://github.com/settings/nodeinfo_software?host=<domain>`, which returns the decentralised network software being used. For example, `https://mastodon.social/@Jake` returns `{"software_name":"mastodon"}`.

Since the regular expression and network name are stored in the HTML as `try-nodeinfo-pattern` and `nodeinfo-software`, it's safe to assume the "[NodeInfo](https://github.com/jhass/nodeinfo)" protocol is being used to determine if either of the two supported networks (Mastodon, Hometown) are in use.

## Checking for yourself

As mentioned, to fetch this information I wrote some JavaScript to look at the possible social link formats in a GitHub profile, and display their regular expression(s).

The output looks like this, with a `*` next to any decentralised networks:

[![](/assets/images/2024/githubprofile-js-output-thumbnail.png)](/assets/images/2024/githubprofile-js-output.png)

Copy and pasting the JavaScript below into the browser's console on your GitHub profile will output a list of networks and regexes.

_Always be careful what you paste into the console!_

```javascript
// Script to extract supported social platforms & regexes from GitHub profiles
(() => {
  const elements = document.querySelectorAll(
    'span[data-targets="social-account-editor.iconOptions"]'
  );
  const dataPairs = {};

  elements.forEach((element) => {
    const titleElement = element.querySelector("svg title");
    if (!titleElement) return;

    let title = titleElement.textContent;
    const patternElements = element.querySelectorAll(
      "span[data-provider-pattern], span[data-try-nodeinfo-pattern]"
    );

    patternElements.forEach((patternElement) => {
      const patternValue =
        patternElement.dataset.providerPattern ||
        patternElement.dataset.tryNodeinfoPattern;

      if (patternElement.dataset.tryNodeinfoPattern) {
        title = "*" + title;
      }

      dataPairs[title] = dataPairs[title] || [];
      if (!dataPairs[title].includes(patternValue)) {
        dataPairs[title].push(patternValue);
      }
    });
  });

  return dataPairs;
})();
```

## Conclusion

This simple but helpful feature is almost completely undocumented, with only [a vague mention](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/personalizing-your-profile#adding-links-to-your-social-accounts) in GitHub's docs [and release notes](https://github.blog/changelog/2023-02-02-add-more-social-links-to-your-user-profile/) as:

> You can now add up to 4 links to any social accounts to your user profile, with special support for popular platforms.

It's a shame GitHub don't seem to be actively adding new platforms, especially with platforms like Kick, TikTok, Pinterest, Discord, Threads etc all completely absent. Regardless, hopefully this article helps you improve your profile by including more aesthetic links!
