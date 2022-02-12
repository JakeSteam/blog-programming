---
id: 1901
title: 'How To Fix Nextscripts&#8217; Social Networks Auto-Poster Not Using Correct Categories / Tags'
date: '2018-10-31T20:11:26+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=1901'
permalink: /how-to-fix-nextscripts-social-networks-auto-poster-not-using-correct-categories-tags/
snap_isAutoPosted:
    - '1541016687'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapMD:
    - "s:451:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:57:\"%EXCERPT%\r\n\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"eb3a6366822e\";s:7:\"postURL\";s:127:\"https://medium.com/@JakeSteam/how-to-fix-nextscripts-social-networks-auto-poster-not-using-correct-categories-tags-eb3a6366822e\";s:5:\"pDate\";s:19:\"2018-10-31 20:11:34\";}}\";"
snapTW:
    - 's:396:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1057727029800591363";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1057727029800591363";s:5:"pDate";s:19:"2018-10-31 20:12:30";}}";'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6463492723973464064";s:5:"pDate";s:19:"2018-10-31 20:12:31";}}";'
image: /wp-content/uploads/2018/10/twitter-150x150.png
categories:
    - Marketing
tags:
    - Gutenberg
    - SNAP
    - 'Social Media'
    - Wordpress
---

This blog uses [Nextscript’s SNAP](https://wordpress.org/plugins/social-networks-auto-poster-facebook-twitter-g/) to autopost new posts on LinkedIn, Twitter, and Medium. After installing and activating a few new plugins, I noticed that a scheduled post (“[How To View Trello Card Name / Description History](https://blog.jakelee.co.uk/how-to-view-trello-card-name-description-history/)“) had been posted with the default category (Android Dev) instead of the correct category (Project Management). Additionally, none of the post’s tags were included in any of the automatic posts.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/10/twitter.png?resize=592%2C165&ssl=1)](https://twitter.com/JakeLeeLtd/status/1057354288425525250)

After a little trial and error, I discovered the cause: [Gutenberg Editor](https://wordpress.org/gutenberg/). Creating any posts in this new editor caused the issue, and just disabling the plugin resolved the issue instantly.

Whilst the plugin was useful, and had a lot of improvements over the default TinyMCE editor, it wasn’t worth ruining all social media posts!