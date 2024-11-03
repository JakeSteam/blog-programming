---
id: 1901
title: 'How To Fix Nextscripts Social Networks Auto-Poster Not Using Correct Categories / Tags'
date: '2018-10-31T20:11:26+00:00'
permalink: /how-to-fix-nextscripts-social-networks-auto-poster-not-using-correct-categories-tags/
image: /wp-content/uploads/2018/10/twitter.png
categories:
    - Marketing
tags:
    - Gutenberg
    - SNAP
    - 'Social Media'
    - Wordpress
---

This blog uses [Nextscript’s SNAP](https://wordpress.org/plugins/social-networks-auto-poster-facebook-twitter-g/) to autopost new posts on LinkedIn, Twitter, and Medium. After installing and activating a few new plugins, I noticed that a scheduled post (“[How To View Trello Card Name / Description History](/how-to-view-trello-card-name-description-history)“) had been posted with the default category (Android Dev) instead of the correct category (Project Management). Additionally, none of the post’s tags were included in any of the automatic posts.

[![](/wp-content/uploads/2018/10/twitter.png)](https://twitter.com/JakeLeeLtd/status/1057354288425525250)

After a little trial and error, I discovered the cause: [Gutenberg Editor](https://wordpress.org/gutenberg/). Creating any posts in this new editor caused the issue, and just disabling the plugin resolved the issue instantly.

Whilst the plugin was useful, and had a lot of improvements over the default TinyMCE editor, it wasn’t worth ruining all social media posts!