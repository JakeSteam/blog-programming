---
title: A writeup of a very convincing 2017 Gmail phishing scam
image: /assets/images/2022/googledocsheader.png
tags:
    - Google
    - Security
    - Phishing
---

Waaaaay back in 2017, I experienced the most convincing phishing attack I've ever seen. I didn't fall for it, but it was too close for comfort! I [published my notes on Reddit](https://www.reddit.com/r/google/comments/692cr4/new_google_docs_phishing_scam_almost_undetectable/) and it got a *lot* of attention, and ended up in a few news articles. 

Currently if the images or post are deleted, all the info will be gone forever, so I wanted to write it up permanently here. To summarise the phish: A fake app called "Google Docs" was created. If given access to your account, it emailed all your contacts asking for access to their accounts too.

## Original writeup

Here's the steps, as I experienced them & described them on the day:

1. I [received an email](/assets/images/2022/googledoc1.png) that a Google Doc had been shared with me. Looked reasonably legit, and I recognized the sender.
2. The [button's URL](/assets/images/2022/googledoc2.png) was somewhat suspicious, but still reasonably Google based.
3. I then got taken to a [*real* Google account selection screen](/assets/images/2022/googledoc3.png). It already knew about my 4 accounts, so it's really signing me into Google.
4. Upon selecting an account, no password was needed, I just needed to [allow "Google Docs" to access my account](/assets/images/2022/googledoc4.png).
5. If I click "Google Docs", it shows me it's actually published by [a random gmail account](/assets/images/2022/googledoc5.png), so that user would receive full access to my emails (and could presumably therefore perform password resets etc).
6. Shortly afterwards I received a [followup real email from my contact](/assets/images/2022/googledoc6.png), informing me: "Delete this it's a spam email that spreads to your contacts."

To summarise, this spam email:

* Uses the existing Google login system
* Uses the name "Google Docs"
* Is only detectable as fake if you happen to click "Google Docs" whilst granting permission
* Replicates itself by sending itself to all your contacts
* Bypasses any 2 factor authentication / login alerts
* Will send scam emails to everyone you have ever emailed

## General notes

So, pretty scary. Whilst it's easy to notice mini red flags when investigating the above images now *knowing* they're a scam, when it's a trusted contact inviting you to a document, it's a lot more convincing. 

I'd worked with this contact before on a shared Google doc, they'd been testing one of my games for me. As such, an invite to a document was not at all unusual, and there's usually no risk in opening a Google Doc anyway.

For many people, myself included, my gmail account is pretty much the centre of my online life. I use it to login to all services, all password resets go there, it has years of payment records. Due to 2FA (which Google is [very wisely beginning to force](https://arstechnica.com/gadgets/2021/11/google-wants-every-account-to-use-2fa-starts-auto-enrolling-users/)), my account always felt "safe", but this phish would have bypassed it completely. 

## Red flags

I consider myself pretty security-savvy online, but I can absolutely see myself falling for this phish if I was in a hurry or distracted. 

The excellent YouTuber [Atomic Shrimp](https://www.youtube.com/channel/UCSl5Uxu2LyaoAoMMGp6oTJA) speaks about scams quite often, and [his recent video](https://www.youtube.com/watch?v=R1wH0TDpmYQ) contained a diagram that prompted this post. He discusses the idea that when analysing an email's trustworthiness, lots of little red flags can add up to make you suspicious. Using it, we can see our phishing scam... doesn't have any of the flags his scam email did:

[![](/assets/images/2022/googledocatomicshrimp.png)](/assets/images/2022/googledocatomicshrimp.png)

*Screenshot from ["Nikon Scam Targeting YouTubers - How To Recognise a Scam"](https://www.youtube.com/watch?v=R1wH0TDpmYQ?t=684).*

In fact, it's a genuine email from a trusted contact, with believable content, and a seemingly safe URL (no redirects, weird domains, etc). Atomic Shrimp has [spoken](https://www.youtube.com/watch?v=Z2tDAqifAXw) [many](https://www.youtube.com/watch?v=gqhPkeXMeh0) [times](https://www.youtube.com/watch?v=LnxKpQRW2jU) about the risks in ending up clicking a malicious link, so the fact that this phishing scam nearly tricked me is humbling!

Here's what I *should* have picked up on in my case, but didn't, possibly because I was predisposed to trust the sender:
1. The initial email was actually addressed to a `hhhhhhhhhhhh` email, and I was bcc'd. I dismissed this as my contact accidentally entering my email in the wrong field.
2. No information about the Google Doc was included in the email. I dismissed this because it doesn't seem unusual if the document is private.
3. The concept of "Google Docs wants access to my Google account". This is actually where I *did* catch it, and was probably my last chance. This isn't particularly unusual in a company with as many products as Google, but since I used Google Docs regularly it raised the lucky red flag.

## What happened next

My post got a *lot* of attention, since the phishing spread itself extremely quickly (emailed to every contact), and hit at a time when the US was waking up, and the EU was still awake. 

It got the attention of a few Googlers lurking on the subreddit, who raised it internally, and got the initial worm fixed within the hour. Lots of people also contributed ways for G Suite sysadmins to resolve the issue immediately.

The short term fix was disabling the malicious app that was spreading like wildfire, and long term fixes were being investigated:

> We have taken action to protect users against an e-mail impersonating Google Docs & have disabled offending accounts. We've removed the fake pages [and] pushed updates through Safe Browsing, and our abuse team is working to prevent this kind of spoofing from happening again. We encourage users to report phishing e-mails in Gmail.

*Quote from [@googledocs on Twitter](https://twitter.com/googledocs/status/859878989250215937).*

## Final comments

Some alleged [source code of the worm](https://pastebin.com/EKdKamFq) was published on the day, and amazingly seems to do nothing malicious beyond spreading itself. Considering the attacker had access to every email in thousands of inboxes, it's shocking that there were no negative impacts besides a bit of spam. Dodged a bullet!

Considering the `to: hhhhhhhhh@mailinator.com`, this worm gave the appearances of a half-finished attack that escaped quarantine. Perhaps a test run of the attack accidentally escaped to a real user, and then couldn't be contained. However, it used multiple domains and a seemingly fake creator email (in the format `first.last@gmail.com`), so it's a mystery who was behind it and why.

Considering the simplicity of the attack, it's somewhat surprising that it hadn't happened before. The attack's server also slowed down massively from the intense load, so it's possible the widespread success is what actually stopped the spread!

## Links

* The [original Reddit post](https://old.reddit.com/r/google/comments/692cr4/new_google_docs_phishing_scam_almost_undetectable/) has over 1000 comments, so is worth a read if you're interested in this tiny bit of internet history. 
* [Ars Technica](https://arstechnica.com/information-technology/2017/05/dont-trust-oauth-why-the-google-docs-worm-was-so-convincing/) and [The Verge](https://www.theverge.com/2017/5/3/15534768/google-docs-phishing-attack-share-this-document-with-you-spam) did great summaries of the worm on the day.