---
title: How to disable Cloudflare proxying with GitHub pages on a custom subdomain
author: Jake Lee
layout: post
image: /assets/images/2022/cloudflare.png
tags:
    - Cloudflare
    - GitHub
    - DNS
    - HTTPS
---

When creating a new GitHub pages site with Cloudflare's DNS, the default setting is having proxying all data via Cloudflare. This is OK, but Cloudflare can slow down GitHub pages somewhat, and GitHub pages have no bandwidth limits so might as well serve directly.

## Problem!
However, turning off proxying will... break things. Here's an example from [my settlers site](https://settlers.jakelee.co.uk), where Cloudflare was increasing load times from ~100ms to ~300ms:

[![](/assets/images/2022/cloudflareoff-thumbnail.png)](/assets/images/2022/cloudflare.png)

[![](/assets/images/2022/hsts-thumbnail.png)](/assets/images/2022/hsts.png)

Uh oh. This happens because the site previously worked over HTTPS, and now doesn't, as shown:

| | Old |  | New |  | Target |
| -- | -- | -- | -- | -- | -- |
| Cloudflare handles HTTPS | Yes | -> | No | -> | No |
| GitHub handles HTTPS | No | -> | No | -> | Yes |

So, we obviously need to get GitHub to provision a certificate for us, and handle it all. Unfortunately, it still thinks Cloudflare is handling it all, so won't provide a certificate. We'll have to force it.

[![](/assets/images/2022/githubunavailable.png)](/assets/images/2022/githubunavailable.png)

*Note the misleading "Unavailable for your site because your domain is not properly configured to support HTTPS" error.*


## Solution!

The solution is luckily not too tricky, but not at all obvious:

1. Remove your custom domain ([screenshot](/assets/images/2022/domainremoved.png)).
2. Wait a few minutes, refresh the page, and add your custom domain back in.
3. Wait a few more minutes, refresh it a few more times, you should see messages about a certificate being provisioned.
4. Wait yet again, and eventually the HTTPS checkbox will be tickable again.
5. After 5-10m, the DNS changes should propagate and your site will be back up again.

If you're doing this for a custom domain, not subdomain, you'll also need to:
1. Disable proxying for ALL the `A` records.
2. Add a `CNAME` record for `www` and `<yourusername>.github.io` to force a certificate to be created.

[![](/assets/images/2022/githubworking.png)](/assets/images/2022/githubworking.png)

If these steps don't seem to solve it, and [troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages) doesn't help, nor [the tips in this thread](https://github.community/t/how-to-enable-https-support-on-custom-domains/10351/6), you'll need to raise a support ticket!