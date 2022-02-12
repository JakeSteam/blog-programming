---
id: 2478
title: 'How to programmatically change your Android app icon and name'
date: '2019-04-29T15:00:21+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2478'
permalink: /programmatically-changing-app-icon/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6528629307923927041";s:5:"pDate";s:19:"2019-04-29 14:02:03";}}";'
snap_isAutoPosted:
    - '1556546523'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1122863620910669826";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1122863620910669826";s:5:"pDate";s:19:"2019-04-29 14:02:03";}}";'
image: /wp-content/uploads/2019/04/TJEufHF-150x150.png
categories:
    - 'Android Dev'
tags:
    - icon
    - Kotlin
    - Manifest
---

In Android, your app’s icon is a crucial part of your project. It’s what grabs the user’s attention first, identifies your app amongst the sea of competitors, and is the most important piece of visual branding. However, usually this icon is defined in your manifest, then never changes except through update.

Recently, out of curiosity, I discovered it was possible to change the app icon / name whenever you want, without an update. Luckily, it’s pretty straightforward! Whilst this article is a detailed explanation of the solution, it is also available [as a Gist](https://gist.github.com/JakeSteam/5efffeee23097d8141a69e3c74649a2f), and [an example project](https://github.com/JakeSteam/DynamicIconChanging).

## Approach

The `android.intent.action.MAIN` action (which usually exists on your default activity) tells Android which activity should be used to start your app. However, we can define multiple aliases for our single activity, with the end result of multiple configurations of icon + title for our app.

All of our activity aliases will define themselves as **the** starting point to the app, so we’ll need to disable all the ones not currently in use. This will result in the OS only showing the remaining activated alias on the app launcher. Note that this can take a few seconds to take effect, and almost certainly has strange side effects!

## Registering aliases in manifest

First, **remove** the `MAIN` action (`<action android:name="android.intent.action.MAIN" />`) from your app’s launcher activity (by default `MainActivity`). This is so our aliases can use it instead. Your activity should end up something like this:

```
<activity android:name=".MainActivity">
    <intent-filter>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

Next, add an `<activity-alias>` for every different icon / name you want your app to use. There are a few required fields:

- `label` for the app’s display name
- `icon` for the app’s icon. This can be a drawable or mipmap, with mipmap recommended.
- `name` can be any valid string (no special characters, spaces, etc), and is used to reference this alias later on. In this example I’ve used the colour of the icon.
- `targetActivity` must be your existing launcher activity.
- `enabled` must be set to true for at least one of your `activity-alias`. Otherwise, your app will not be able to launch.

```
<activity-alias
        android:label="Red app"
        android:icon="@mipmap/icon_red"
        android:name=".RED"
        android:enabled="true"
        android:targetActivity=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity-alias>
```

## Icon switching

To enable one of our aliases, we also need to disable all others. The core piece of code used for this is below, with `PackageManager.COMPONENT_ENABLED_STATE_ENABLED` changed to `...STATE_DISABLED` for the unwanted aliases:

```
getPackageManager().setComponentEnabledSetting(
    new ComponentName(BuildConfig.APPLICATION_ID, "com.example.package.RED"), 
    PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP
);
```

The `BuildConfig.APPLICATION_ID` is used to tell the package manager which package you want to modify a component of. `"com.example.package.RED"` should be your package name, then the `activity-alias`‘ `name` defined in the previous step. If you’re using Kotlin, the easiest way to set this is using inline string formatting, e.g:

```
"${BuildConfig.APPLICATION_ID}.$aliasName"
```

## Further usage

A good way to ensure all other activity aliases are disabled when one is enabled is to use a helper function along with an enum. This enum should contain every possible activity alias. Then, loop over this enum and set all values to the necessary state:

```
enum class ICON_COLOUR { RED, GREEN, BLUE }

private fun setIcon(targetColour: ICON_COLOUR) {
    for (value in ICON_COLOUR.values()) {
        val action = if (value == targetColour) {
            PackageManager.COMPONENT_ENABLED_STATE_ENABLED
        } else {
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED
        }
        packageManager.setComponentEnabledSetting(
            ComponentName(BuildConfig.APPLICATION_ID, "${BuildConfig.APPLICATION_ID}.${value.name}"),
            action, PackageManager.DONT_KILL_APP
        )
    }
}
```

App icons can then be changed with just `setIcon(ICON_COLOUR.RED)`. Easy!

## Notes

I noticed a few quirks during my experimenting with this, and I’d be hesitant to use it in a production app without extensive testing. A couple of notable issues:

- If you programmatically change your alias, it can take a few seconds for the launcher to update.
- Related to the previous issue, if you try to open the app via the icon during these few seconds, there will be a mismatch between the launcher shortcut and the manifest. The OS will then be unable to open your app, and display an `App not found` toast.
- If you are trying to deploy an app that has had it’s alias changed since install, Android Studio will fail to launch it. It will need to be uninstalled or reset back to the default.
- The original title and icon will show in many places throughout the OS. For example: 
    - Task switcher
    - Applications list
- Non-default launchers may not display this changed icon.

Special thanks to this [StackOverflow answer by P-A](https://stackoverflow.com/a/15249542/608312) for the core code. Note that the accepted answer on that question will not work from Marshmallow onwards, as it requires dangerous permissions (add / remove shortcuts), and doesn’t perform as reliably anyway. As such, the answer linked to is the one used for this post.

## Conclusion

In conclusion, yes it is possible to change the app icon. However, I wouldn’t rely on this at all, and would personally stick to just changing it with an app update in almost all cases.

That being said, there’s definitely a lot of potential to this very underused technique. For example, a game where the app icon changes colour whilst it’s the player’s turn, or during a timed event. In this context, it’s like a very limited notification, that the user can’t even turn off! I’d be interested to see which games / apps use this feature in the wild, and if they’ve experienced any side effects.