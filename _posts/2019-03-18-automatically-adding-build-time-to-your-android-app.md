---
id: 2431
title: 'Automatically adding build time to your Android app'
date: '2019-03-18T22:12:06+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2431'
permalink: /automatically-adding-build-time-to-your-android-app/
snap_isAutoPosted:
    - '1552947127'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapMD:
    - "s:215:\"a:1:{i:0;a:6:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;}}\";"
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1107766763524116485";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1107766763524116485";s:5:"pDate";s:19:"2019-03-18 22:12:32";}}";'
image: /wp-content/uploads/2019/03/0I3501n-150x150.png
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