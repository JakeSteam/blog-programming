---
id: 2244
title: 'How to get a &#8220;Verified&#8221; tag on your GitHub organization&#8217;s page'
date: '2018-12-21T17:00:32+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2244'
permalink: /how-to-get-a-verified-tag-on-your-github-organizations-page/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6481926564299837440";s:5:"pDate";s:19:"2018-12-21 17:02:01";}}";'
snapMD:
    - "s:434:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"5f60806a5985\";s:7:\"postURL\";s:102:\"https://medium.com/@JakeSteam/how-to-get-a-verified-tag-on-your-github-organizations-page-5f60806a5985\";s:5:\"pDate\";s:19:\"2018-12-21 17:02:02\";}}\";"
snap_isAutoPosted:
    - '1545411722'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1076160880939798528";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1076160880939798528";s:5:"pDate";s:19:"2018-12-21 17:02:02";}}";'
image: /wp-content/uploads/2018/12/HwlROGP-150x150.png
categories:
    - Development
tags:
    - Cloudflare
    - GitHub
    - verification
---

Your company’s GitHub profile is a great way to show off some of the high quality work produced internally, and attract new potential developers. Additionally, all the usual benefits of sharing your code with others apply, and you’ll be helping the open source community!

However without a verified domain there’s no way for any visitors to know that you are who you say you are. To resolve this issue, GitHub [recently introduced](https://blog.github.com/changelog/2018-08-07-domain-verification/) organization domain verification. The verification process only takes a few minutes, so is definitely worth doing if your organization has an associated domain!

To complete this tutorial you’ll need Owner permissions for the GitHub organization, and access to your company’s DNS records. Note that completing domain verification will notify all other Owners of the organization. There is also an [official GitHub tutorial](https://help.github.com/articles/verifying-your-organization-s-domain/).

## Adding organization email / domain

1. First, go to your organization’s page.
2. Next, click the “Settings” tab.
3. You can now add a public email and a URL, these must both be verified so use the same domain if possible.
4. Save the changes.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/settings.png?resize=700%2C491&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/settings.png?ssl=1)

Your URL will now be shown on your organization’s profile, but without the pretty verified tag!

## Verifying domain

Now go to the “Verified domains” section on the Settings sidebar. We have to verify that we own the domains we listed on our profile in the earlier step.

1. Click “Add a domain”.
2. Enter your URL. Note that `www.example.com` and `example.com` are different, so use the raw domain (`example.com`).
3. You’ll be taken to a page with information on the DNS record you need to add. The verification code is unique and expires in 7 days.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/new.png?resize=700%2C381&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/new.png?ssl=1)

Note that the TXT record format is: `_github-challenge-<your organization name>.<your domain>`.

## Adding DNS record

Next, in a new tab you need to go to whoever handles your DNS, in my case Cloudflare. Under the DNS tab, add the TXT record from the previous step.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/cloudflare.png?resize=700%2C188&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/cloudflare.png?ssl=1)Note that once the TXT domain is added your domain suffix will disappear, this is normal!

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/cloudflare2.png?resize=700%2C77&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/cloudflare2.png?ssl=1)

## Verifying

Go back to your GitHub domain verification tab (or renavigate to it), and click the “Verify” button. Whilst DNS propagation can take up to 72 hours, with a service like Cloudflare this is almost instant.

Congratulations, your domain is now verified! Developers using your libraries are now certain that they are yours.

In addition to the verified tag, you can now view your member’s email addresses (so long as they are at your domain). For example, if a user has multiple emails registered, and one of them is at your domain, you’ll now be able to see that email!

Note that all members with “Owner” role are emailed to notify them of this change:

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/email.png?resize=594%2C495&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/email.png?ssl=1)