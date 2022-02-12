---
id: 1916
title: 'How To Automatically Backup WordPress Posts To GitHub'
date: '2018-11-04T19:00:50+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=1916'
permalink: /how-to-automatically-backup-wordpress-posts-to-github/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6464925316589719552";s:5:"pDate";s:19:"2018-11-04 19:05:08";}}";'
snapMD:
    - "s:425:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:63:\"%EXCERPT%\r\n\r\n\r\n\r\n\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"b5504f059df1\";s:7:\"postURL\";s:96:\"https://medium.com/@JakeSteam/how-to-automatically-backup-wordpress-posts-to-github-b5504f059df1\";s:5:\"pDate\";s:19:\"2018-11-04 19:05:10\";}}\";"
snap_isAutoPosted:
    - '1541358310'
snapTW:
    - 's:396:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1059159639798046722";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1059159639798046722";s:5:"pDate";s:19:"2018-11-04 19:05:11";}}";'
categories:
    - 'Web Dev'
tags:
    - Automation
    - Backup
    - GitHub
    - Sync
    - Wordpress
---

When programming, most developers use GitHub (or another hosted git solution) to make sure all of their work is backed up in multiple places to ensure it is never lost. If you’re anything like me, when writing blog posts you want the same peace of mind you have with the rest of your work. This post will cover how to automatically export all WordPress posts to GitHub (and keep it updated), so that they can be imported later if necessary.

## Installing WordPress / GitHub Sync

First, install the syncing plugin from the WordPress.org directory. This can be done by going to the “Plugins” -&gt; “Add new” page, searching for “WordPress GitHub Sync”, pressing “Install Now” and then “Activate”. You can also download and upload it manually if you prefer from [the plugin’s page](https://en-gb.wordpress.org/plugins/wp-github-sync/). Note that the plugin is open source, and can be [viewed on GitHub](https://github.com/mAAdhaTTah/wordpress-github-sync).

## Configuring settings

A new option “GitHub Sync” will now appear under your Settings in the sidebar. Clicking this will take you to a somewhat complicated setup screen, here’s what goes in each field:

![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/sync.png?resize=700%2C546&ssl=1)

1. GitHub hostname: This should not need to be changed, unless you’re using a company-hosted GitHub.
2. Repository: The repository the exported posts will go into. This should be a public repository on your GitHub page, and should already have had the initialisation commit. GitHub [provides a step by step guide](https://help.github.com/articles/create-a-repo/) to creating a repository if you haven’t done it before.
3. Oauth Token: This is needed to allow the plugin to perform actions (syncing) on your behalf. To create one, just visit your tokens page, fill in a description, tick <span style="font-family: 'courier new', courier, monospace;">public\_repo</span>, and press “Generate token”. You’ll then be shown a secret 40-character string (with a green background), copy it into the plugin’s form.
4. Webhook Secret: A webhook is needed for the repository to communicate back to the plugin. Create a new one for your GitHub repository by going to Settings -&gt; Webhooks. Fill in the form as follows: 
    1. Payload URL: Use the Webhook callback from step 6.
    2. Content type: Change to “application/json”.
    3. Pick a secret password, this can be anything at all!
    4. All other settings can be left at default settings.
    5. Click “Add webhook”.
5. Default Import User: The user any posts imported *from* WordPress will post as. This defaults to your admin user.
6. Webhook callback: Already used for the Webhook secret.
7. Action buttons: 
    1. Export to GitHub: This will perform an initial backup of all posts, make sure to click it.
    2. Import from GitHub: This would be used when restoring a backup, it isn’t needed for this.

## Checking results

After pressing “Export to GitHub” in step 7.1 above, the plugin will begin working. After a few minutes (depending on the number of posts), you should see a repository filled up with all your posts and pages. The exported post contains a row of metadata (title, URL, author, publish date, etc), then the processed (HTML) version of your post, including all images and formatting. You can [see an example exported post here](https://github.com/JakeSteam/Wordpress/blob/master/_posts/2018-11-01-how-to-migrate-a-subdomain-site-from-wordpress-com-to-another-host.md), from [this post](https://blog.jakelee.co.uk/how-to-migrate-a-subdomain-site-from-wordpress-com-to-another-host/).

Now, whenever you make a new post it will be automatically exported here. Nothing private has been exposed, as all of the posts are already publicly viewable, and the plugin’s open-source nature (and limited permissions) means it’s relatively trustworthy. I’ve been using it myself on this blog, and [it’s successfully exported every post](https://github.com/JakeSteam/Wordpress/tree/master/_posts). Awesome!

![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/sync2.png?resize=700%2C424&ssl=1)