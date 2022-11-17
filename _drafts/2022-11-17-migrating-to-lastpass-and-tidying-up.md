---
title: Migrating from Chrome's Password Manager to LastPass, and tidying up 10+ years of password clutter
author: Jake Lee
layout: post
image: /assets/images/2022/lastpass-header.png
tags:
    - LastPass
    - Chrome
    - Security
---

I've been using Chrome since its 2008 release, and rely on the password manager daily. As you might expect, after 14 years I built up a lot of saved passwords (1000+)! However, migration to a proper solution is long overdue, here's how I did it and tidied up my passwords at the same time.

## Backstory

Considering how much of my life is online, and how security conscious I am, using Chrome's Password Manager was always a guilty secret. I almost always use unique passwords, always use 2FA, and even use a unique email per service (so the source of any spam emails can be identified). However, a lot of sites still don't support 2FA, so all it would take to compromise an unknown number of my accounts is one bit of malware. Uh oh.

Whilst my Google account is secure, can I really be as confident in my personal machine / phone, both of which have access to all those passwords at any time? Probably not. As such, I decided it was time to finally migrate to a "proper" solution. I went for LastPass as it was very highly rated, easy to use, and supported all operating systems I work on. It might not be the cheapest, but $3 vs $5 per month really isn't much for a comfortable password management experience!

However, I need to get my 1000+ Chrome passwords over there…

## Migrating to LastPass

### Initial setup

To start with, I installed LastPass' Chrome extension[^chrome-extension] and Android app[^android-app]. I generally used the default settings, and whilst I would have appreciated a little more guidance on which options were more secure, nothing was impossible to Google.

[^chrome-extension]: [https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)
[^android-app]: [https://play.google.com/store/apps/details?id=com.lastpass.lpandroid](https://play.google.com/store/apps/details?id=com.lastpass.lpandroid)

### Import & export

Luckily, LastPass is ready for Chrome's password file format, so this process is very simple:

1. Go to [Google Password Manager's options](https://passwords.google.com/options?ep=1).
2. Click "Export", `Chrome Passwords.csv` will download.
3. Open LastPass → Advanced Options → Import → Chrome.
4. Upload the `.csv`.

LastPass handles this pretty smoothly, even with 1000 passwords. I encountered a few "broken" passwords, where an Android app's package name & password had been transferred, but this isn't LastPass' fault!


### Post-import state

Now all the passwords have been imported, we can use LastPass' "Security score" to determine roughly how secure we are. 74.4% is pretty low, however I was pretty confident this was actually due to duplicated / bad data. So, the next step is tidying up the passwords into something more useful.

| Password list | Security check |
| --- | --- |
| [![](/assets/images/2022/lastpass-passwordcount-thumbnail.png)](/assets/images/2022/lastpass-passwordcount.png) | [![](/assets/images/2022/lastpass-initial-thumbnail.png)](/assets/images/2022/lastpass-initial.png) |

## Tidying up LastPass

### Organising

First, I wanted to group all my passwords by category. This way the list will become more manageable, easier to maintain, and I can clear out duplicates as I go.

I went for the following fairly generic categories:

* **Android**: Logins for apps, these are in a format unlike all other logins and were deleted later.
* **Financial**: Banking, investment, property purchases, etc.
* **Gaming**: Steam, Epic Games, various sites with unique logins.
* **Media**: Videos, music, artwork, etc.
* **Online**: Services that you "need" a login to when using the internet. Samsung, Google, Apple, etc.
* **Personal**: Healthcare services, pet care services, piracy sites(!).
* **Shopping**: Amazon, eBay, supermarkets, hardware, etc.
* **Social**: Slack, Reddit, Twitter, etc.
* **Travel**: All the hotel / airline / train accounts that end up being created during travelling.
* **Utility**: Electricity, gas, water, phone, internet, etc. 
* **Work**: Anything "professional". So domain management, programming resources, university, etc.

Grouping these into categories took MUCH longer than it should have (multiple hours), due to LastPass' somewhat unresponsive site. Luckily this is only a one-time process, as having to repeat this process regularly would be impossible!

| Password list | Security check |
| --- | --- |
| [![](/assets/images/2022/lastpass-passwordorganised-thumbnail.png)](/assets/images/2022/lastpass-passwordorganised.png) | [![](/assets/images/2022/lastpass-organised-thumbnail.png)](/assets/images/2022/lastpass-organised.png) |

### Tidying

The deletion of obviously outdated / irrelevant accounts in the previous step helped quite a lot, bumping the security score up to 82.1%! However, we can do much better than that…

Again I found myself fighting with LastPass' interface a bit here. I wanted to view all logins with warnings, which was only accessible via the "Security Dashboard". However, for each of these I then wanted to search my passwords (to find duplicates, a common issue). Opening 2 tabs of the extension didn't work reliably, so I had to keep renavigating between the 2 screens! Very frustrating.

LastPass has 3 categories of "bad" passwords: 
1. **Weak**: Whilst I randomly generated the vast majority of my unique passwords, I had used a "throwaway" password for a few services I didn't care about. Some of these have since become more important (e.g., Nintendo!), so I had ~20 passwords to actually change.
2. **Missing**: These were all accidental saves, so could be deleted safely.
3. **Reused**: These were mostly caused by services having multiple subdomains / domains over time that are used for logging in. For each of these, the duplicates could be safely removed once I worked out the current URL.

| Password list | Security check |
| --- | --- |
| [![](/assets/images/2022/lastpass-passwordsecured-thumbnail.png)](/assets/images/2022/lastpass-passwordsecured.png) | [![](/assets/images/2022/lastpass-secured-thumbnail.png)](/assets/images/2022/lastpass-secured.png) |

### Securing

After clearing up all the flagged passwords, I ended up at 97.6%. Why not higher? Well, some passwords had 50% / 75% strength. This isn't low enough to be flagged as weak, but still affects the score! Fixing these few didn't taking long, ending up on 98%:

[![](/assets/images/2022/lastpass-strengthened.png)](/assets/images/2022/lastpass-strengthened.png)

Why not 100%? Well, on the web it's tricky to find out. Luckily, the mobile app provides a more detailed breakdown:

[![](/assets/images/2022/lastpass-app-thumbnail.png)](/assets/images/2022/lastpass-app.png)

Ah, so 1% is due to accessing LastPass from mobile(?), and 1% is because I initially had offline access turned on. The documentation is a little unclear on what precisely deducts these final few points, but it looks like 98% is the highest I can go. 

It's a shame 100% doesn't appear possible, but it'll have to do! Especially as "the security challenge is just a tool and aiming for a 100% score isn't totally necessary"[^not-necessary].

[^not-necessary]: [https://community.logmein.com/t5/LastPass-Support-Discussions/Lastpass-Security-Score-of-100/m-p/255418/highlight/true#M24981](https://community.logmein.com/t5/LastPass-Support-Discussions/Lastpass-Security-Score-of-100/m-p/255418/highlight/true#M24981)

### Final steps

To finish up my migration, I took the scary step of deleting all my saved Chrome passwords! This can be done in "Privacy and security" → "Clear browsing data" → "Advanced", and make sure "Passwords and other sign-in data" is selected, along with the "All time" time frame.

Next, I made sure to properly delete the `.csv` file used for the import, since that file has all the passwords without *any* protection! Finally, in Chrome I turned off autofill prompts under the "Auto-fill" tab.

Finally, my passwords actually feel secure for the first time!

## References