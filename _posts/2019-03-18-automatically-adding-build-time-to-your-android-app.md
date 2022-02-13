---
id: 2431
title: 'Automatically adding build time to your Android app'
date: '2019-03-18T22:12:06+00:00'
author: 'Jake Lee'
layout: post
permalink: /automatically-adding-build-time-to-your-android-app/
image: /wp-content/uploads/2019/03/0I3501n.png
categories:
    - 'Android Dev'
tags:
    - Gradle
    - Settings
---

When releasing an Android app, it can be useful to show your users the current version name (`BuildConfig.VERSION_NAME`) or code (`BuildConfig.VERSION_CODE`). Another nice feature is showing when this version of the app was built, to reassure users that features / bug fixes are being released frequently.

Luckily, this can be done in 2 super simple steps:

First, add `BUILD_TIME` (of type `Date`) into your app-level `build.gradle`, with a value defined using the `Date` constructor with the current time. So, inside `defaultConfig`:

```
buildConfigField "java.util.Date", "BUILD_TIME", "new java.util.Date(" + System.currentTimeMillis() + "L)"
```

Next, just use `BuildConfig.BUILD_TIME` whenever you want to access this date object. Just like a normal `Date` object, it can be formatted (e.g. to “18 Mar 2019”):

```
SimpleDateFormat("dd MMM yyy", Locale.US).format(BuildConfig.BUILD_TIME)
```

That’s it!

This technique is used in [my open source APOD Wallpaper app](https://github.com/JakeSteam/APODWallpaper/blob/master/app/build.gradle#L15), and [available as a Gist](https://gist.github.com/JakeSteam/6052f0f3a7ac523649c4f05d1d1cb1fb).