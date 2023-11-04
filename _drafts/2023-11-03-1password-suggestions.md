---
title: "Migrating from LastPass to 1Password: Initial pros & cons"
author: Jake Lee
layout: post
image: /assets/images/2023/1password.png
tags:
    - Security
    - Passwords
---

Almost exactly a year ago, [I migrated from Chrome's password manager to LastPass](/migrating-to-lastpass-and-tidying-up/). Whilst this was luckily *after* the breach, the constant "oops, worse than stated" updates destroyed my trust in LastPass. Since my renewal date was coming up, I migrated to 1Password instead. Here's my initial thoughts!

## Why leave LastPass?

So yes, I don't trust LastPass any more. Whilst my vault data wasn't stolen, given the startling amount of data that was stolen (vaults, notes, website URLs) and how it was taken ([keylogging a DevOps engineer via a Plex exploit](https://arstechnica.com/information-technology/2023/02/lastpass-hackers-infected-employees-home-computer-and-stole-corporate-vault/)), it's pretty scary.

Additionally, their communications weren't good enough for a cybersecurity company. When compared to Cloudflare's [extremely detailed writeups](https://blog.cloudflare.com/) of even minor issues, almost radio silence about an absolute massive hack isn't enough.

Finally, the general "jank" around their website and app isn't confidence inspiring. I ignored it before since, y'know, frontend design and cybersecurity have different scopes. However, a year of the Android login not always working, the extension interfering with website UI fields, the website never knowing if I'm logged in or not, and I've had enough. 

The final straw was when I went to export my vault as a backup before temporarily trying 1Password, it downloaded a CSV with a few of the passwords, and displayed the rest of them in the browser. If they can't even handle an export, are my passwords actually secure?

## 1Password first impressions

Whilst I've used 1Password at work before, I've not actually customised it or used half of it's features.

Of course, the main selling point of 1Password was... it being recognised as one of the best password managers. Since I wanted a cloud solution that worked on both mobile and desktop, it was a very easy choice.

Whilst I was initially put off by the very "Apple-y" UI, it presents information in a simple, reliable, and fast way, which is what actually matters!

[![](/assets/images/2023/1password-ui.png)](/assets/images/2023/1password-ui.png)

The timeline of my transfer process is a testament to how eager I was to leave LastPass, and how much 1Password impressed me throughout onboarding. A total of 25 minutes passed between my initial 1Password signup, and my LastPass account being permanently deleted! Considering I usually take multiple days to dwell on a decision, their positive word of mouth marketing had me mostly convinced before I touched the product.

[![](/assets/images/2023/1password-speedy.png)](/assets/images/2023/1password-speedy.png)


## 1Password good bits

### Import from LastPass includes categories, and even tags the import date

Considering [how much effort](/migrating-to-lastpass-and-tidying-up/#tidying-up-lastpass) I put into deduplicating and organising my 1000+ password into ~10 categories with ~400 total, losing my folders was a big concern. 

Luckily, this data migrated across perfectly! 1Password converted the categories into tags, and even took the extra step of adding a "LastPass" "LastPass Import [date]" tags.

[![](/assets/images/2023/1password-tags.png)](/assets/images/2023/1password-tags.png)

Whilst I appreciated this great password transfer, I was a little startled how it was done. Instead of requesting some sort of integration, or transferring a CSV, 1Password directly asked for my email, password, and 2FA code! 

Since these 3 things are information you should *never* give to a third party... I was pretty hesitant. I double & triple checked that everything was legitimate before proceeding, and reasoned that 1Password were about to have all my passwords anyway, so they can have my LastPass account too! It was still a very disconcerting experience though, and I've never experienced it elsewhere.

It also normalises giving other companies your password and even 2FA codes, which in my opinion should absolutely never be required. Very risky behaviour.

### Free trial with no credit card

Free trials are pretty standard with services like a password manager, but I was impressed that I could have a fully featured 14-day trial (including import) without providing any payment information. The signup form does ask for this information, but makes the "Skip" button nice and obvious, not relying on dark patterns to hide it.

This let me get my account set up, be confident it would suit my needs, and *then* pay without feeling any risk of dissatisfaction. This was definitely a great user experience. 

### Extremely user-friendly

Overall, the onboarding was really, really smooth. Despite actually needing quite a lot of things from me (download a desktop app, install an extension, back up a PDF, verify email, understand the actual product), it was done so smoothly that I felt very little friction. 

I was perhaps a little jaded by my experience with 1Password's site, and was actually somewhat surprised when pages actually loaded quickly, kept me logged in, and didn't have UI elements in weird places.

### Watchtower is great

1Password's "Watchtower" is their version of LastPass' "Security score". It doesn't suffer from the same odd negative points (LastPass removed points for allowing mobile access, and for caching my vault offline), and I love the clear HaveIBeenPwned integration.

[![](/assets/images/2023/1password-watchtower.png)](/assets/images/2023/1password-watchtower.png)

However, it isn't perfect. The app shows a score with no definition of the maximum, and is influenced by factors I'm not sure are correct. For example, it flags that I don't have 2FA setup on 71 of the websites (I do, 1Password just doesn't know about it).

### App is very modern

## 1Password not-so-good bits

### Logged out during payment

### Doesn't understand Android logins

### Doesn't understand local IP logins

### Reused passwords

* Doesn't understand "safe" reuse across multiple domains
* Deleting a duplicate keeps one of them

### Charges in dollars, and doesn't show tax until country selected

[![](/assets/images/2023/example-thumbnail.png)](/assets/images/2023/example.png)