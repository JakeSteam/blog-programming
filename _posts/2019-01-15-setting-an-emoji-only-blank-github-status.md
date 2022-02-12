---
id: 2340
title: 'Setting an emoji only / blank GitHub status'
date: '2019-01-15T22:28:05+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2340'
permalink: /setting-an-emoji-only-blank-github-status/
snap_isAutoPosted:
    - '1547591286'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6491068470577500160";s:5:"pDate";s:19:"2019-01-15 22:28:41";}}";'
snapMD:
    - "s:415:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"ee887b458f1c\";s:7:\"postURL\";s:84:\"https://medium.com/@JakeSteam/setting-an-emoji-only-blank-github-status-ee887b458f1c\";s:5:\"pDate\";s:19:\"2019-01-15 22:28:40\";}}\";"
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1085302776886935552";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1085302776886935552";s:5:"pDate";s:19:"2019-01-15 22:28:40";}}";'
image: /wp-content/uploads/2019/01/4iZzDN8-150x150.png
categories:
    - Tips
tags:
    - GitHub
---

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/7x8Asov.png?resize=205%2C210&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/7x8Asov.png?ssl=1)Recently GitHub added user statuses, allowing you to add a little emoji and bit of text under your name on your profile. This is changed either on your profile or in the top right of GitHub, as seen in the screenshot.

As with other services (e.g. Slack), I wanted to just set an emoji as my status, without any unnecessary text. However, not entering any text (or just a space) in the status field isn’t possible as the “Set status” button is disabled!

To get around this, copy the character between these two arrows –&gt;⠀&lt;– and paste it into your status. Tada, empty status!

For example, here’s how it looks on my profile:

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/OvdQF5G.png?resize=300%2C245&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/OvdQF5G.png?ssl=1)

For those curious, this works because the character between the arrows *looks* like a space, but isn’t one. It’s actually the [braille character for “no dots”](https://en.wiktionary.org/wiki/%E2%A0%80), and since it’s part of unicode should work across all platforms that support multiple language sets.