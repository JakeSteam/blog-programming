---
id: 2546
title: 'How to create (and test) an app update listener'
date: '2019-06-10T12:55:33+01:00'
permalink: /how-to-create-and-test-an-app-update-listener/
image: /wp-content/uploads/2019/06/Untitled-1.png
categories:
    - 'Android Dev'
tags:
    - adb
    - Intents
    - Update
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

And that’s it! Your listener is registered and will show a Toast message of the new version code whenever your app updates.

*Update (2022-10-06): A helpful commenter (see bottom of post) mentioned that instead of suppressing the lint warning, you can use replace the check with `if (context == null || intent?.action != "android.intent.action.MY_PACKAGE_REPLACED") {`. This is likely a better solution!*

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

```text
adb install -r C:\\Repositories\\updatelistener\\app\\build\\outputs\\apk\\debug\\app-debug.apk
```

You should see “Success” underneath your command in the terminal.

[![](/wp-content/uploads/2019/06/Annotation-2019-06-10-125106.jpg)](/wp-content/uploads/2019/06/Annotation-2019-06-10-125106.jpg)

The app is then updated like normal, and your listener called. In [the sample repo](https://github.com/JakeSteam/UpdateListener), an update will cause the new version code to be displayed in a Toast.