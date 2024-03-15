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

In case you'd like to double-check this post's list is up-to-date, here's the JavaScript I used to extract all the networks and regular expressions.

Copy and pasting this into the browser's console on your GitHub profile will output a list of networks and regexes, with a `*` next to decentralised ones. The output will look like this:

[![](/assets/images/2024/githubprofile-js-output.png)](/assets/images/2024/githubprofile-js-output.png)

_Note: Always be careful what you paste into the console! Only copy and paste the snippet if you've read it and understood it._

```JS
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
