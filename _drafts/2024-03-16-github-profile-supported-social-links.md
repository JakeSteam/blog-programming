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

[![](/assets/images/2024/githubprofile-invalid-social.png)](/assets/images/2024/gthubprofile-invalid-social.png)

## Checking for yourself

```JavaScript
(() => {
  const elements = document.querySelectorAll('span[data-targets="social-account-editor.iconOptions"]');
  let dataPairs = {};

  elements.forEach(element => {
    let titleElement = element.querySelector('svg title');
    if (!titleElement) return;

    let title = titleElement.textContent;
    let patternElements = element.querySelectorAll('span[data-provider-pattern], span[data-try-nodeinfo-pattern]');

    patternElements.forEach(patternElement => {
      let patternValue = patternElement.getAttribute('data-provider-pattern') || patternElement.getAttribute('data-try-nodeinfo-pattern');
      if (patternElement.hasAttribute('data-try-nodeinfo-pattern')) {
        title = '*' + title;
      }

      dataPairs[title] = dataPairs[title] || [];
      if (!dataPairs[title].includes(patternValue)) dataPairs[title].push(patternValue);
    });
  });

  return dataPairs;
})();
```

https://nodeinfo.diaspora.software/protocol.html

https://github.com/jhass/nodeinfo

https://github.com/settings/nodeinfo_software?host=masto.kkoyung.dev
