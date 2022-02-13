---
id: 2244
title: 'How to get a &#8220;Verified&#8221; tag on your GitHub organization&#8217;s page'
date: '2018-12-21T17:00:32+00:00'
author: 'Jake Lee'
layout: post
permalink: /how-to-get-a-verified-tag-on-your-github-organizations-page/
image: /wp-content/uploads/2018/12/HwlROGP.png
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

[![](/wp-content/uploads/2018/12/settings.png)](/wp-content/uploads/2018/12/settings.png)

Your URL will now be shown on your organization’s profile, but without the pretty verified tag!

## Verifying domain

Now go to the “Verified domains” section on the Settings sidebar. We have to verify that we own the domains we listed on our profile in the earlier step.

1. Click “Add a domain”.
2. Enter your URL. Note that `www.example.com` and `example.com` are different, so use the raw domain (`example.com`).
3. You’ll be taken to a page with information on the DNS record you need to add. The verification code is unique and expires in 7 days.

[![](/wp-content/uploads/2018/12/new.png)](/wp-content/uploads/2018/12/new.png)

Note that the TXT record format is: `_github-challenge-<your organization name>.<your domain>`.

## Adding DNS record

Next, in a new tab you need to go to whoever handles your DNS, in my case Cloudflare. Under the DNS tab, add the TXT record from the previous step.

[![](/wp-content/uploads/2018/12/cloudflare.png)](/wp-content/uploads/2018/12/cloudflare.png)

Note that once the TXT domain is added your domain suffix will disappear, this is normal!

[![](/wp-content/uploads/2018/12/cloudflare2.png)](/wp-content/uploads/2018/12/cloudflare2.png)

## Verifying

Go back to your GitHub domain verification tab (or renavigate to it), and click the “Verify” button. Whilst DNS propagation can take up to 72 hours, with a service like Cloudflare this is almost instant.

Congratulations, your domain is now verified! Developers using your libraries are now certain that they are yours.

In addition to the verified tag, you can now view your member’s email addresses (so long as they are at your domain). For example, if a user has multiple emails registered, and one of them is at your domain, you’ll now be able to see that email!

Note that all members with “Owner” role are emailed to notify them of this change:

[![](/wp-content/uploads/2018/12/email.png)](/wp-content/uploads/2018/12/email.png)