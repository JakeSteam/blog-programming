---
title: "Please don't dox me Google: How to verify your Google Play account without exposing ALL of your information"
image: /assets/images/banners/gpc-warning.png
tags:
  - Google Play
  - Company
  - Payments
  - Privacy
---

In 2023, Google began requiring verification for Google Play, especially if earning any money. Unfortunately, this required publicly exposing your **home address** and **phone number**! Here's how to earn money without revealing this info.

Before we get started, **this will require setting up a company and a forwarding address**. Whilst there is a cost, in the UK neither of them are too tricky. I'd recommend [Rapid Formations](https://www.rapidformations.co.uk/) which offer this for around £67/yr, more on that later in "[Solution](#solution)".

## Tl;dr

Don't want to read the full post? No worries! Here's the entire thing:

1. You'll need to **form a company** in your country using a **forwarding address**.
2. You'll then make a **new "Organisation" Google Play profile**, and verify it with your company's info.
3. Finally, you'll **transfer your apps** and all associated services, and delete your old profile.

That's it! If any of it seems at all unclear, time to get into lots of detail as I document this process I _never_ want to go through again! There's also lots of tips around verification [in this r/androiddev post](https://www.reddit.com/r/androiddev/comments/1emalfy/useful_information_about_gp_account_verification/).

## Scenario

In July 2023, Google announced [a controversial policy](https://android-developers.googleblog.com/2023/07/boosting-trust-and-transparency-in-google-play.html) requiring all developers to verify this information. This sounded fairly innocent and easy, until [looking at the detailed requirements](https://support.google.com/googleplay/android-developer/answer/14177239) for **personal accounts**. Specifically, if you're earning money the following will be public:

1. Your legal name
2. Your phone number
3. Your legal address

Whilst I'm happy sharing my legal name (it's Jake Lee, could you tell?), my phone number and address are extremely private information! My phone number is both a way to contact me 24/7 and used for 2FA SMS in services that don't support app-based, whilst my address is... literally where my family and I live. This should not be public, ever.

If you want to earn money, the only official options are:

1. Reveal all your information publicly.
2. Let Google close your account and remove all your apps.

Luckily, there is a way to solve this in a Google- and privacy-friendly way by creating a new Google Play Console account. More details [in "Solution"](#solution) after information on / ranting about my personal scenario!

## Personal scenario

I've been earning money on Google Play since 2016, and once upon a time it earned more than my (low!) salary, encouraging me to [become an Android developer](/7-lessons-from-a-decade-in-tech/#why-did-i-leave), a job I love.

Whilst [my apps](https://play.google.com/store/apps/dev?id=5592731197904864672) (e.g. Pixel Blacksmith) no longer earn significant amounts (typically £10-50/month), it's still a nice bit of bonus money to fund other projects. Similarly, players are clearly still enjoying the apps, so the apps should stay available as long as possible!

I did some work last year to get my old games running, conforming to Google Play's latest requirements, and sorting out any policy paperwork that needed solving. There was still the developer verification, but that wasn't required until 2025 so I left it. Now it's time to solve it!

## Failed attempts

Before solving the issue, I failed multiple times. I'll condense these multi-week stressful struggles into 2 summaries, and spare too many details.

### Attempt 1, Apr '24

Since I already had a registered company with a forwarding address, I assumed I could use this as my personal address. However, proof of me as an _individual_ at this address was required, such as a utility bill. This was impossible (I don't live in an office!), and I went through multiple rounds of my company documents & personal documents being rejected.

Throughout this, I was sent various intimidating emails about Google Services being suspended, and when combined with unhelpful slow & vague answers from Google Support, this was a pretty stressful experience.

For example, my Google One (extra storage) subscription was expiring. My Google Pay had been suspended, so it was impossible to renew (with any payment method whatsoever, including Google Play credit). If I hadn't managed to resolve it in time, I would have had to deleted tens of GBs of photos / data to ensure my storage was within the free limit, otherwise I would have **lost the ability to receive emails**.

Luckily, I managed to verify my personal address, and delay verification, allowing my payment profile to be unsuspended and pay for Google Pay. Problem not solved, but delayed.

|                                               Failed payment                                                |                                              Consequences                                               |
| :---------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2025/gpc-payment-declined-thumbnail.png)](/assets/images/2025/gpc-payment-declined.png) | [![](/assets/images/2025/gpc-payment-action-thumbnail.png)](/assets/images/2025/gpc-payment-action.png) |

### Attempt 2, Dec '24

I had some time over Christmas, so time to try again!

Since verifying as an individual failed, using the lessons learned from hours of Reddit thread reading, I decided to create a Google Play Console account with a new Google account (the one used for my company) as an organisation. I started the process, entered my company details, and was immediately suspended due to the details not being verified.

Specifically, I was told:

> Because we've been unable to verify information for one or more users on your Google payments profile, your Google payments account has been suspended. Your Google services will continue temporarily, but some transactions may be suspended.
>
> **If action is not taken on this issue within 10 days, your Google services will be suspended.**

No problem, it asks for a "Certificate of Incorporation" and I have that. I immediately submitted the files requested, a review time of 24-48 hours was mentioned, easily within the 10-day warning.

And then I waited. And waited.

Whilst waiting, I tried registering again, stating I _didn't_ want to earn money, to see if this made a difference. It did not.

A week later, I received a 3-day warning, and nothing had changed. Well, it has been Christmas day, lots of holidays, so don't need to panic quite yet.

Then I received my 1-day warning. I don't know what "Google services will be suspended" means, but it doesn't sound good. In fact, since this email address is paying for Google Workspace and controls all my `@jakelee.co.uk` emails, this sounds very bad indeed.

Contacting support was, yet again, not particularly helpful. The agent couldn't directly review documents, but did at least confirm my emails would not stop working due to the suspension. Hopefully there's some sort of manual review required before a suspension, or they're paused when there's a large review backlog.

Either way, the final 24 hours expired and... I didn't receive any updates, but my email still worked. Okay, panic slightly over. Later on I received a casual email that my documents had been verified and all was now OK. Right. What a lot of pointless stress.

|                                     Emails received                                     |                                         1 day left                                          |                                     Pending cases                                     |
| :-------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| [![](/assets/images/2025/gpc-emails-thumbnail.png)](/assets/images/2025/gpc-emails.png) | [![](/assets/images/2025/gpc-1dayleft-thumbnail.png)](/assets/images/2025/gpc-1dayleft.png) | [![](/assets/images/2025/gpc-cases-thumbnail.png)](/assets/images/2025/gpc-cases.png) |

## Solution

So, how can this be solved properly, and we can continue earning money whilst keeping private information private?

### Part 1: Preparing your details

#### Setting up a company

To earn money, you will need to share a legal address, this is absolutely required. However, if you're an organisation this can be your _office_ address, which can be done with a virtual office address, since the government (at least in the UK) accepts them.

So, to set up a company without revealing your home address:

1. Set up a company (I already have [Jake Lee Ltd](https://find-and-update.company-information.service.gov.uk/company/10660441)).
2. Set up a forwarding address for your company (I pay [£39/yr](https://www.rapidformations.co.uk/additional-services/london-registered-office/)).
3. Set up a forwarding address for your personal correspondence (I pay [£26/yr](https://www.rapidformations.co.uk/additional-services/service-address/)).
4. Request your D-U-N-S number ([this is free](https://www.dnb.co.uk/duns-number/lookup/request-a-duns-number.html)).

Rapid Formations [offer an all-in-one package](https://www.rapidformations.co.uk/package/privacy-package/) that seems to do pretty much everything (including business bank account, domain name, and more). I only began using a virtual office after establishing my company, so cannot personally vouch for this service, only confirm that the virtual office service has been perfect.

Okay, so you now have a legal company with a legal address. That's the biggest hurdle overcome!

#### Setting up contact details

Next, you need to give Google some other information to list publicly:

**Email**: Google requires a public-facing & Google-only email address. These can be the same, and don't have any specific requirements besides being able to verify them. I've had a Google Play specific email address for years and only receive spam (usually about buying apps) once every few months.

**Phone**: Similarly, Google will want a phone number to contact you, and a number for users to contact you. This is trickier, since you likely don't want to give away your phone number. Whilst there are various ways to pay for a virtual number, the easiest way is just to request a free SIM card (e.g. [from giffgaff](https://www.giffgaff.com/free-sim-cards)), pop it in your phone to verify, then take it out or put in a spare phone.

This is a privacy trade-off (since a phone network now has your address), but I'm only concerned about _public_ sharing of this information so it's fine. I've changed networks enough that most of them know where I live!

**Website**: You'll need some sort of public website, verified via Google Search Console. There aren't any specific requirements here.

Finally, you'll have an email address, phone number, and website you can use.

### Part 2: Creating a Google Play Console profile

Now, you need to use your business' information to form a Google Play Console profile, and a payments profile.

#### Setting up an organisation

Next up, you need to create a Google Play Console organisation. Organisations have [a simpler verification process](https://static.googleusercontent.com/media/play.google.com/en//console/about/static/pdf/Verifying_your_Play_Console_developer_account_for_organizations.pdf) (presumably since they rely on existing company verification), which we can use.

This process is straightforward if you have [all the prerequisites](https://support.google.com/googleplay/android-developer/answer/13628312?hl=en-GB), specifically:

1. D-U-N-S number.
2. Certificate of incorporation for your company (available on Companies House under Filing History).
3. Contact information (phone, email, address).
4. $25 to pay the registration fee.

During this process, you will be asked to set up a payments profile.

#### Setting up a payment profile

Whilst setting up an organisation will appear to succeed, it will actually fail, causing the fee payment at the very end to be rejected. At this point you will need to submit your Certificate of Incorporation.

Once you've submitted this, and it's been reviewed (this can take a while, see "[Attempt #2](#attempt-2-dec-24)"), the "Settings" tab of [your payment profile](https://pay.google.com/gp/w/home/settings) will finally show as verified:

[![](/assets/images/2025/gpc-verified.png)](/assets/images/2025/gpc-verified.png)

#### Putting it all together

Once your payment profile has been verified, and you have no outstanding alerts, you will need to register for a Google Play Console account _again_, select this payment profile, and attempt the fee payment again.

This time, it should succeed, and you'll finally have a Google Play Console organisation account!

Of course, as soon as you open it you'll be told you need to verify it. Well, that's easy now, we have our Certificate of Incorporation and other information from the payments profile. This only took a day or so for me, and didn't require any new information.

#### Tidying up

There are various settings here you'll likely want to fix. For example:

1. You'll need to verify and link a bank account (Settings -> Payments profile).
2. You'll need to check your public information (email, description etc) are correct.
3. You'll need to add a developer profile picture, and banner.
4. You'll need to verify tax information for the USA and other countries. My payments got temporarily suspended (again) whilst doing this!

Once these changes and verifications have all gone through, you'll have a _verified_ Google Play Console organisation account! Phew, we're getting closer.

### Part 3: Transferring apps

Great, now you've got a new, verified account, you need to transfer your apps! Luckily, this step [actually has some official documentation](https://support.google.com/googleplay/android-developer/answer/6230247) containing the required steps.

#### Account group

First, you'll need to invite your new account to an "Account Group" ([more info](https://support.google.com/googleplay/android-developer/answer/10627869?hl=en-GB)), accept the invite on the new account, and then make it the primary developer account.

This just lets Google knows your 2 profiles are related, and I suspect it makes the app transfer process a bit easier. Since the current profile is owned by **you**, and the new profile is owned by a company where **you** are the only shareholder... they're linked pretty closely!

#### Sharing access

Next, you need to make sure any Google-related services you're using in your apps keep working once the apps have transferred.

For me this required giving my new account access to my apps' Google Analytics, Google Cloud (for Google Play Games, and Maps API), and Firebase (for crash logs). You might also need to do the same for AdMob. The instructions vary by service, however this should be a simple process since it's just adding a new user.

|                                                  Firebase                                                   |                                                   Google Cloud                                                    |
| :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2025/gpc-firebasetransfer-thumbnail.png)](/assets/images/2025/gpc-firebasetransfer.png) | [![](/assets/images/2025/gpc-googlecloudtransfer-thumbnail.png)](/assets/images/2025/gpc-googlecloudtransfer.png) |

#### Requesting transfer

Okay, it's time to finally transfer your apps! This is surprisingly easy, with [official documentation](https://support.google.com/googleplay/android-developer/answer/6230247) walking you through the process.

One complexity is you'll need a "registration transaction ID" for your old and new developer account. This is the payment reference for your Google Play registration fee, created when you opened your account. For my old account I had to scroll through all my Google Play transactions back to 2016, for my new account it was in a recent email.

Pay close attention to Google's (vague) advice here about the transaction ID. You need to remove placeholder-y prefixes from the ID, or the transfer will be rejected:

> Important: When providing your transaction ID during the app transfer request process, remove the first part of the Order ID (for example, discard '0.G.' or the digits before the words 'token' or 'Registration'):

|                                                  Old account                                                  |                                                  New account                                                  |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2025/gpc-developertokenold-thumbnail.png)](/assets/images/2025/gpc-developertokenold.png) | [![](/assets/images/2025/gpc-developertokennew-thumbnail.png)](/assets/images/2025/gpc-developertokennew.png) |

#### Transferring

Once you've got your ID ready, and entered all the new account's details, you can submit a request. I transferred an unused app first to check it worked, and then did the rest in one big go. You'll receive a quite helpful email before the transfer, and one confirming the transfer has been successful.

This part was surprisingly easy after all the headaches of payment profiles and addresses. Both my transfers went smoothly, and it seemed like a well-oiled process!

|                                           Transfer confirmation                                           |                                           Pre-transfer email                                            |                                           Post-transfer email                                           |
| :-------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2025/gpc-transferconfirm-thumbnail.png)](/assets/images/2025/gpc-transferconfirm.png) | [![](/assets/images/2025/gpc-transferemail1-thumbnail.png)](/assets/images/2025/gpc-transferemail1.png) | [![](/assets/images/2025/gpc-transferemail2-thumbnail.png)](/assets/images/2025/gpc-transferemail2.png) |

You're done! A few hours / days / weeks of paperwork, and you're finally done!

Well, there's a tiny bit of tidyup of course...

### Part 4: Tidying up

Whilst your old Google Play profile now has no apps, it still has a verification deadline. To avoid any action being taken against your account (and to get $25 back!), you can submit a request to close your Google Play profile and get a registration refund.

For me this was 8 years after registering, and was done by [submitting a request to their cancellation form](https://support.google.com/googleplay/android-developer/contact/dev_registration?extra.IssueType=cancel). I received an email asking me to confirm the deletion, and which added card the money should be refunded to. Again, this went through smoothly, and the $25 was a nice surprise.

I had a few extra payment profiles made during my various earlier attempts to resolve my verification issues, so these had to be closed too. They can only be closed if there's no linked payments or accounts, including Google Play Console:

[![](/assets/images/2025/gpc-payments-close-thumbnail.png)](/assets/images/2025/gpc-payments-close.png)

If your info was previously listed on the store, you may want to [request its removal from Archive.org](https://help.archive.org/help/how-do-i-request-to-remove-something-from-archive-org/). Finally, you _might_ want to remove access to Firebase / Google Cloud etc from your old account. I didn't bother since it makes accessing the data a bit easier.

### Conclusion

This was probably the most painful yet stressful experience I've gone through since buying my house, made significantly worse due to vague wording everywhere, nobody to talk to, and unknown consequences.

Whilst it all ended well, and [my apps are now listed](https://play.google.com/store/apps/dev?id=5592731197904864672) with my business name & address, the solution wasn't obvious. Instead, on my personal account, I essentially just got threats and impossible requests. It took lots and lots of Googling to find the "create new account and transfer" solution, since it isn't at all intuitive.

I'd also like to give a massive shoutout to [u/yiotro on r/androiddev](https://www.reddit.com/r/androiddev/comments/1emalfy/useful_information_about_gp_account_verification/) for compiling a list of extremely helpful bits of advice about verification. The most helpful ones for me were:

> - Individual accounts are not allowed to use anything other than a home address
> - Google doesn't say this directly anywhere, but it is believed that account types must match, otherwise there will be problems.
> - If the payment profile is linked to a developer account, it is impossible to unlink it. You can only create new account from scratch and transfer your apps there.

This process likely wouldn't have had such a positive outcome if I hadn't:

1. Had a career as an Android Developer, and therefore having any action taken against my account being a worst case scenario.
2. Had spare time and money to pay for the various services required to protect my privacy.

For a new Android engineer, or one with limited resources (e.g. a student), it seems impossible to actually publish apps earning any revenue without revealing all of their information to the world, forever. I understand the Google Play Store is primarily made for businesses (the verification process was painless when I did it for my employer), but you know how you get good Android engineers? By letting them experiment and try building their own apps, and maybe even making money from it.

If these rules had been in place back in 2016 when I published my first Android game, I'm not sure whether it would have ever been published. Without it, my career & life would have taken a different, likely much less fulfilling and enjoyable, path.

It's worth mentioning if you don't make _any_ money from your apps only your country and name is revealed, but for some people even this can be too much. For me personally, I have no idea why a customer in another continent considering playing my free game needs the ability to visit my home address! I guarantee they're not going to get any technical support on the doorstep...
