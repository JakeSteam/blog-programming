---
id: 2546
title: 'How to create (and test) an app update listener'
date: '2019-06-10T12:55:33+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2546'
permalink: /how-to-create-and-test-an-app-update-listener/
snap_isAutoPosted:
    - '1560167734'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1138052142323908608";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1138052142323908608";s:5:"pDate";s:19:"2019-06-10 11:55:49";}}";'
snapLI:
    - 's:421:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:32:"urn:li:share:6543817835750268928";s:7:"postURL";s:69:"https://www.linkedin.com/feed/update/urn:li:share:6543817835750268928";s:5:"pDate";s:19:"2019-06-10 11:55:50";}}";'
image: /wp-content/uploads/2019/06/Untitled-1-150x150.png
categories:
    - 'Android Dev'
tags:
    - adb
    - Intents
    - update
---

Running code when your app updates can be a useful marketing tool, and a reliable way of enabling new functionality only when the user updates.

For example, your app may send a message to your server when it updates, so your server knows it can now return more types of content. Similarly, you may want to send a notification to the user (from the app) when it updates, informing them of new content.

Whilst there’s plenty of existing documentation on registering an update listener, much of it is outdated, unsafe, or doesn’t include any information on how to test your implementation. This article will hopefully address these shortcomings, and is also available [as a repository](https://github.com/JakeSteam/UpdateListener) and [a Gist](https://gist.github.com/JakeSteam/4561f0f46a7b08be50785a72559f8fef).

The approach is very simple; we’re just registering an app update listener in the manifest, and then displaying a toast message inside this listener.

## Registering receiver

The `MY_PACKAGE_REPLACED` intent action is only fired when your app is updated. It is only available on APIs 12+ (which should be fine for almost all apps), and replaces the existing `PACKAGE_REPLACED`. The drawback of the previous technique is it would often be called when **any** app updates, causing your app to be woken up extremely frequently.

This receiver (`.AppUpgradeReceiver` in this case) is registered in your `AndroidManifest.xml`, within the `application` tag:

```
<receiver android:name=".AppUpgradeReceiver">
    <intent-filter>
        <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
    </intent-filter>
</receiver>
```

## Handling update intent

Now we need to create the `AppUpgradeReceiver` receiver we just defined. This class extends `BroadcastReceiver`, which has an `onReceive` that needs overriding:

```
class AppUpgradeReceiver : BroadcastReceiver() {

    @SuppressLint("UnsafeProtectedBroadcastReceiver")
    override fun onReceive(context: Context?, intent: Intent?) {
        if (context == null) {
            return
        }
        Toast.makeText(context, "Updated to version #${BuildConfig.VERSION_CODE}!", Toast.LENGTH_LONG).show()
    }

}
```

Note that lint complains that we’re not filtering the incoming intent (to make sure it’s for our package), but this is not needed as we are using the `MY_PACKAGE_REPLACED` intent. The `SuppressLint` annotation should only be used when you are intentionally disagreeing with lint’s analysis, as in this situation!

And that’s it! Your listener is registered, and will show a Toast message of the new version code whenever your app updates.

## Testing

Testing this functionality initially seems intimidating, as uploading a new version to the Play Store every time would be very time consuming; luckily, we can update apps yourselves!

Previously, testing just required running the new version of your app from Android Studio. Now however, the `MY_PACKAGE_REPLACED` intent can only be sent by the OS, so is not triggered during normal development.

The solution is to actually install the app manually:

1. Increasing the `versionCode` in your app-level `build.gradle` (so it counts as an update).
2. Clicking `Build` -&gt; `Build Bundle(s) / APK(s)` -&gt; `Build APK(s)`, and selecting a debug APK.
3. Entering the following command into the `Terminal` tab at the bottom of Android Studio:

```
adb install -r <path to your apk>
```

For example, the command on a Windows machine to update [this tutorial’s app](https://github.com/JakeSteam/UpdateListener) may look like:

```
adb install -r C:\Repositories\updatelistener\app\build\outputs\apk\debug\app-debug.apk
```

You should see “Success” underneath your command in the terminal.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/06/Annotation-2019-06-10-125106.jpg?resize=700%2C128&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/06/Annotation-2019-06-10-125106.jpg?ssl=1)

The app is then updated like normal, and your listener called. In [the sample repo](https://github.com/JakeSteam/UpdateListener), an update will cause the new version code to be displayed in a Toast.