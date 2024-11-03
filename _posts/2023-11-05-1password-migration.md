---
title: "First impressions migrating from LastPass to 1Password"
image: /assets/images/2023/1password-banner.jpeg
tags:
    - Security
    - Passwords
    - LastPass
    - 1Password
---

Almost exactly a year ago, [I migrated from Chrome's password manager to LastPass](/migrating-to-lastpass-and-tidying-up/). Whilst this was luckily *after* the breach, the constant "oops, bad news" headlines destroyed my trust in LastPass. My renewal was coming up, but I migrated to 1Password instead: here's how it went.

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

### LastPass category import

Considering [how much effort](/migrating-to-lastpass-and-tidying-up/#tidying-up-lastpass) I put into deduplicating and organising my 1000+ passwords into ~10 categories with ~400 passwords total, losing my folders was a big concern. 

Luckily, this data migrated across perfectly (well, except for an odd missing character tag)! 1Password converted the categories into tags, and even took the extra step of adding a "LastPass" "LastPass Import [date]" tags.

[![](/assets/images/2023/1password-tags.png)](/assets/images/2023/1password-tags.png)

Whilst I appreciated this great password transfer, I was a little startled how it was done. Instead of requesting some sort of integration, or transferring a CSV, 1Password directly asked for my email, password, and 2FA code! 

Since these 3 things are information you should *never* give to a third party... I was pretty hesitant. I double & triple checked that everything was legitimate before proceeding, and reasoned that 1Password were about to have all my passwords anyway, so they can have my LastPass account too! It was still a very disconcerting experience though, and I've never experienced it elsewhere.

It also normalises giving other companies your password and even 2FA codes, which in my opinion should absolutely never be required. Very risky behaviour.

### Free trial with no credit card

Free trials are pretty standard with services like a password manager, but I was impressed that I could have a fully featured 14-day trial (including import) without providing any payment information. The signup form does ask for this information, but makes the "Skip" button nice and obvious, not relying on dark patterns to hide it.

This let me get my account set up, be confident it would suit my needs, and *then* pay without feeling any risk of dissatisfaction. This was definitely a great user experience. 

### Extremely user-friendly

Overall, the onboarding was really, really smooth. Despite actually needing quite a lot of things from me (download a desktop app, install an extension, back up a PDF, verify email, understand the actual product), it was done so smoothly that I felt very little friction. 

I was perhaps a little jaded by my experience with LastPass' site, and was actually somewhat surprised when pages actually loaded quickly, kept me logged in, and didn't have UI elements in weird places.

### Watchtower is great

1Password's "Watchtower" is their version of LastPass' "Security score". It doesn't suffer from the same odd negative points (LastPass removed points for allowing mobile access, and for caching my vault offline), and I love the clear HaveIBeenPwned integration.

[![](/assets/images/2023/1password-watchtower.png)](/assets/images/2023/1password-watchtower.png)
*Note: The 1 weak password is a temporary unchangeable one.*

However, it isn't perfect. The app shows a score with no definition of the maximum, and is influenced by factors I'm not sure are correct. For example, it flags that I don't have 2FA setup on 71 of the websites (I do, 1Password just doesn't know about it). My score is 1029, yet "Fantastic", implying this score goes up to 1100? 1200? Who knows! 

Additionally, I wanted to share a screenshot of my security score for this post, and couldn't. Instead, I'd have to Tweet this rather marketing-y message:
> My Watchtower security score in @1Password is 1029 (Fantastic) 🤩 🏖️ ✅  
> https://watchtower.1password.com/score/1029/

This link doesn't seem to go anywhere, and just redirects to the homepage. I'll skip Tweeting an advert, thanks!

### App is very modern

I can't share any screenshots of the app (boo, security policy), and weirdly enough the Play Store & documentation images don't seem to match what I can see in front of me. 

[The app (v8.10.18)](https://play.google.com/store/apps/details?id=com.onepassword.android&hl=en&gl=US) implements an excellent dark mode, and looks more like a digital bank than just a password manager. It's got plenty of options (e.g. changing how autofill functions), and clearly shows that they're technically competent, a stark contrast to the LastPass app.

## 1Password not-so-good bits

### Logged out during payment

Whilst on the screen to enter my card details, I got distracted looking in a banking app to use a different card to usual. I can only assume this somehow took more than 10 minutes, since when I finally found my card and entered the details, upon clicking "Submit" I was told my session had expired, and I needed to login again (and re-enter my card details).

I do understand the security benefits of this, but I really wish I'd been told my session had expired *before* I typed in all my details and clicked submit! Not a big deal, but a minor annoyance.

After creating an account, I noticed that this timer can be sent to any value, a nice quality of life feature.

### Doesn't understand Android logins

This may just be a quirk of transferring from LastPass with Android logins, but 1Password doesn't seem to understand their format. These URIs are in the format `android://abc123` yet 1Password saves them as `http://android://abc123`, and then complains that they aren't `https`!

[![](/assets/images/2023/1password-android.png)](/assets/images/2023/1password-android.png)

### Doesn't understand local IP logins

Similarly, it treats local IPs like URLs. This technically makes sense, but if I'm logging onto a local server only accessible from my PC, it's only on HTTP. It would have been good if local IPs could be excluded from this check.

[![](/assets/images/2023/1password-ip.png)](/assets/images/2023/1password-ip.png)

### Multidomain logins

LastPass had a feature where it understood that multiple subdomains of the same domain might use the same details. For example, `login.example.com` might use the same authentication as `account.example.com`, and they can be treated as the same site.

Unfortunately it looks like this didn't transfer across properly, since some passwords got duplicated (and flagged as such). For example, `auth3.uber.com` and `auth.uber.com` are clearly the same site, yet I've ended up with 2 records. This wasn't a big problem, I just went through and deleted the less useful copy of the ~40 duplicates.

A minor annoyance at this stage was when deleting a duplicate login, the now unduplicated login would remain in this list. A small bug, but one that made deleting duplicates a bit more awkward.

[![](/assets/images/2023/1password-duplicate1.png)](/assets/images/2023/1password-duplicate1.png)[![](/assets/images/2023/1password-duplicate2.png)](/assets/images/2023/1password-duplicate2.png)

### Checkout is in USD

Finally, 1Password uses dollars for all payments and doesn't include tax until the end. This obviously simplifies things from their end, but for a British customer used to prices including VAT, it was an unpleasant 20% price hike at the end of the checkout process. However, this was countered by all prices being in dollars, so the real price being less than I subconsciously expected!

The price went $35.88/yr to $43.05 when I selected my country (20% VAT), but this is £34.79 so... almost the same number we started with.

## Conclusion

[1Password](https://1password.com) is good, use it! 

I'm *really* hoping I don't have to make another of these posts in a year, migrating to yet another password manager because 1Password has had some catastrophic issue. Really really really hoping.

So far it's been an improvement across all fronts, and has stopped password storage being a niggling "uh oh, might be an issue eventually" thought in the back of my mind. I'm also interested in their [developer tools](https://1password.com/developers), hopefully I'll have some time to play with their GitHub Actions / VSCode / git integrations at some point.

There's also a [Fastmail](https://support.1password.com/fastmail/) integration that I might try. I currently use a unique email per service (all automatically routing to my real email via a catch-all), but another way to achieve this is always appreciated.

It's a great feeling being interested in what my password manager is developing, instead of desperately hoping they don't have a problem!