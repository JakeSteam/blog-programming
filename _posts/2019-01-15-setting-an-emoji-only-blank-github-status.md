---
id: 2340
title: 'Setting an emoji only / blank GitHub status'
date: '2019-01-15T22:28:05+00:00'
permalink: /setting-an-emoji-only-blank-github-status/
image: /wp-content/uploads/2019/01/4iZzDN8.png
categories:
    - Tips
tags:
    - GitHub
---

[![](/wp-content/uploads/2019/01/7x8Asov.png)](/wp-content/uploads/2019/01/7x8Asov.png)

Recently GitHub added user statuses, allowing you to add a little emoji and bit of text under your name on your profile. This is changed either on your profile or in the top right of GitHub, as seen in the screenshot.

As with other services (e.g. Slack), I wanted to just set an emoji as my status, without any unnecessary text. However, not entering any text (or just a space) in the status field isn't possible as the "Set status" button is disabled!

To get around this, copy the character between these two arrows –&gt;⠀&lt;– and paste it into your status. Tada, empty status!

For example, here's how it looks on my profile:

[![](/wp-content/uploads/2019/01/OvdQF5G.png)](/wp-content/uploads/2019/01/OvdQF5G.png)

For those curious, this works because the character between the arrows *looks* like a space, but isn't one. It's actually the [braille character for "no dots"](https://en.wiktionary.org/wiki/%E2%A0%80), and since it's part of unicode should work across all platforms that support multiple language sets.