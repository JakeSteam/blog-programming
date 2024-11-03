---
id: 2074
title: "Growing Your Android App With Firebase Invites"
date: "2018-11-28T22:06:13+00:00"
permalink: /growing-your-android-app-with-firebase-invites/
image: /wp-content/uploads/2018/11/zBBxqzi-1.png
categories:
  - "Android Dev"
tags:
  - Firebase
  - Invites
  - Kotlin
  - Sharing
---

Firebase Invites provide a simple way to add user referral schemes to your app for free, without any additional resources. The system runs on top of Firebase Dynamic Links, and supports both email and SMS referrals.

Invite messages can be customised, and they can include custom data / deep links. This custom information works even if the user doesn’t have the app installed when they initially click the referral link, making Invites an excellent way to build your app’s user base.

This post is part of [The Complete Guide to Firebase](https://blog.jakelee.co.uk/search/?q=firebase/). Throughout this tutorial, the [official documentation](https://firebase.google.com/docs/invites/android) may be useful:

## Implementation

As always, the entire [Firebase Reference Project is open source](https://github.com/JakeSteam/FirebaseReference), and there is a [pull request for adding Firebase Invites](https://github.com/JakeSteam/FirebaseReference/pull/10) if you just want to see the code changes required. This tutorial assumes you already have [Firebase added to your project](/adding-firebase-to-an-android-project/).

In this tutorial, you’ll learn how to add the ability for users to send out invite links, and identify if a user has come from an invite link.

### Adding Firebase Invites to your project

First, visit the Dynamic Links tab in the [Firebase console](https://console.firebase.google.com/u/0/), and agree to the terms of service (if necessary). Don’t worry if there’s no terms of service to agree, it only occurs in some situations!

Next, add Firebase Invites by adding the following to your dependencies in your app-level `build.gradle` file, then perform a Gradle sync:

```groovy
implementation 'com.google.firebase:firebase-invites:16.0.5'
```

### Sending invites

#### Displaying invite screen

The invite screen allows the user to customise the invite message, and select one or more email / SMS contacts. In the image below, you can see a user with SMS only (chat icon), email only (envelope icon), and both (envelope icon with arrow). Email addresses and phone numbers can also be manually entered.

To actually display this dialog, pass an `AppInviteInvitation` to `startActivityForResult()`, which can be customised using the builder. Only the dialog title and invitation message must be defined, the rest are optional.

```
private fun sendInviteOnClick() = activity!!
        .startActivityForResult(
                AppInviteInvitation.IntentBuilder("Share an invite!")
                        .setMessage("Here is the custom message inside the invitation!")
                        .setDeepLink(Uri.parse("https://firebasereference.jakelee.co.uk/deeplink"))
                        .setCustomImage(Uri.parse("https://via.placeholder.com/600x600/4286f4/000000?text=Invite+image!"))
                        .setCallToActionText("Accept invite")
                        .build(), INVITE_REQUEST_CODE)
```

- `setMessage` defines the text at the top of the invite dialog.
- `setDeepLink` defines the deep link that should be retrieve when an invited user opens the app.
- `setCustomImage` allows you to specify an image that should be sent along with email invites.
- `setCallToActionText` allows you to specify the text on the invite button in the email. Note that during my implementation, this didn’t seem to have any effect.
- `setEmailHtmlContent` and `setEmailSubject` can also be used to completely replace the email invitation.

`INVITE_REQUEST_CODE` must be under ~32k, and identifies the result returned when the user closes the dialog.

#### Alerting user to sent invites

When the user closes the dialog, either due to successfully inviting other users or pressing back, `onActivityResult` is called. This is called on your activity, even if you started the dialog from a fragment!

Once the `requestCode` and `resultCode` have been checked, the `data` object can be passed to `AppInviteInvitations` to get a list of invitation IDs. These IDs are useful for keeping track of which invites have been accepted, since they are also available when opening an invite link.

```
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    if (requestCode == InvitesFragment.INVITE_REQUEST_CODE) {
        if (resultCode == Activity.RESULT_OK) {
            val ids = AppInviteInvitation.getInvitationIds(resultCode, data!!)
            val idsString = ids.joinToString()
            Toast.makeText(this, "Invited: $idsString", Toast.LENGTH_LONG).show()
        } else {
            Toast.makeText(this, "Invite sending failed / cancelled: $resultCode", Toast.LENGTH_LONG).show()
        }
    }
}
```

### Receiving invites

| Text                                                                                        | Email                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [![](/wp-content/uploads/2018/11/zBBxqzi-1.png)](/wp-content/uploads/2018/11/zBBxqzi-1.png) | [![](/wp-content/uploads/2018/11/invite.png)](/wp-content/uploads/2018/11/invite.png) |

When a user clicks the dynamic invite link from an email or text, they are taken directly to your app (or to the Play Store to install your app). When this happens, you need to check with Firebase Dynamic Links if there are any unprocessed invitations. Note that this function returns success even if there are no new invites, the difference is in whether `data` is null or not.

This logic should be included on every activity / fragment in your app where you want to check the user’s invite status, which is likely to be almost all.

```
private fun processPendingInvite() = FirebaseDynamicLinks.getInstance()
        .getDynamicLink(activity!!.intent)
        .addOnSuccessListener { data ->
            if (data == null) {
                Log.d("Invites", "getInvitation: no data")
            } else {
                val deepLink = data.link
                val inviteId = FirebaseAppInvite.getInvitation(data).invitationId
                Toast.makeText(activity!!, "Retrieved deep link of $deepLink and an inviteId of $inviteId", Toast.LENGTH_LONG).show()
            }
        }
        .addOnFailureListener { Log.e("Invites", "Failed") }
```

Despite the documentation’s claims, invitations do not reset themselves once used! Once `getDynamicLink` has returned an invitation, calling it again will return the same information. It is unknown if this is intentional, or a bug (version 16.0.5).

### Additional notes

All SMS and Email invites use the user’s Google Play details. Whilst this is fine for SMS, emails are often sent to spam folders. Additionally, the partially customised email invites don’t seem to format very well. As such, using `setEmailHtmlContent` and `setEmailSubject` is recommended, to fully customise the invitation link.

## Conclusion

Firebase Invites is a relatively simple to implement referral system, and whilst it does have a very limited feature set, it performs those features reliably. The [best practices article](https://firebase.google.com/docs/invites/best-practices) provides a few useful tips, and there are [two excellent simple implementations on the case studies page](https://firebase.google.com/docs/invites/case-studies).

The basic referral system may be useful for simple apps, especially those where a user is likely to download &amp; register for an app just to view a specific piece of content. However, a server should be used for management of these invite links, such as checking if an invite has been accepted. Surprisingly few games also use the feature, despite their dependence on referral &amp; invite mechanics.

It’s also worth noting that for opening a related iOS app, [`setOtherPlatformsTargetApplication`](<https://firebase.google.com/docs/reference/android/com/google/android/gms/appinvite/AppInviteInvitation.IntentBuilder#setOtherPlatformsTargetApplication(int,%20java.lang.String)>)must be used when displaying the invite dialog.
