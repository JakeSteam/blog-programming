---
title: Introducing "diet.co.ke", a silly mini-project
author: Jake Lee
layout: post
image: /assets/images/2023/coke-header.png
tags:
    - Project
    - Domains
---

This weekend I discovered [Kenya sells "co.ke" domains](https://www.webhostkenya.co.ke/ke-domains-name-registration/). Obviously the only thing to do was register "[diet.co.ke](https://diet.co.ke)", and put up a fun little landing page!

## diet.co.ke

[diet.co.ke](https://diet.co.ke)'s code is [open source](https://github.com/JakeSteam/diet.co.ke), and someone has already submitted a PR fixing a few UI bugs. I'm not intending to make it anything more than the current little animation, short and sweet:

![](https://raw.githubusercontent.com/JakeSteam/diet.co.ke/main/dietcoke.gif)

## Warnings 
For anyone else starting a similar project, a few warnings:

### Buy directly

Most registrars will charge unreasonable amounts for a .co.ke domain. For example, [OnlyDomains](https://www.onlydomains.com/domains/Kenya/.co.ke) charges $35 to purchase, and $70 to renew. [101Domain](https://www.101domain.com/domain-availability-search.htm) charges $58 to purchase, and $72 to renew. So, it must be an expensive domain to buy right?

Nope. It's 1200 Kenyan shillings [from a Kenyan registrar](https://www.webhostkenya.co.ke/ke-domains-name-registration/), this is around $9. After taxes etc the domain cost me $11, I have no idea how registrars can justify charging 5x the actual cost!

### Kenyan registrar

The .co.ke registrar (at least, the "webhost kenya" one I found) is... not perfect. It took 18 hours after paying for the domain to actually gain access to it, and nameservers / DNS changes have been extremely slow. I'm still waiting for some final propagations 48 hours later, although that isn't entirely the registrar's fault! 

Updating nameservers and other changes were a little confusing, with things like success messages showing where they shouldn't:

[![](/assets/images/2023/coke-nameserver_thumbnail.png)](/assets/images/2023/coke-nameserver.png)

Whilst writing this article the management site also appears to have gone down completely for a bit, not what you want from the place that controls your domain:

[![](/assets/images/2023/coke-registrar_thumbnail.png)](/assets//images/2023/coke-registrar.png)

### Cloudflare

Cloudflare don't support .co.ke domain registrations. You can still use Cloudflare, but the domain can't be transferred to them:

[![](/assets/images/2023/coke-cloudflare_thumbnail.png)](/assets/images/2023/coke-cloudflare.png)

## Conclusion

No real conclusion, except I hope you like [diet.co.ke](https://diet.co.ke)!