---
id: 2066
title: 'How To Display App Version Inside a Submodule'
date: '2018-11-26T18:00:09+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2066'
permalink: /how-to-display-app-version-inside-a-submodule/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6472881908278792192";s:5:"pDate";s:19:"2018-11-26 18:01:47";}}";'
snapMD:
    - "s:420:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:66:\"%ANNOUNCE%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"77c9e8956f6e\";s:7:\"postURL\";s:88:\"https://medium.com/@JakeSteam/how-to-display-app-version-inside-a-submodule-77c9e8956f6e\";s:5:\"pDate\";s:19:\"2018-11-26 18:01:49\";}}\";"
snap_isAutoPosted:
    - '1543255309'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1067116230723727361";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1067116230723727361";s:5:"pDate";s:19:"2018-11-26 18:01:50";}}";'
categories:
    - 'Android Dev'
tags:
    - Kotlin
    - Modules
---

Usually, getting the current version code of your app is as simple as `BuildConfig.VERSION_CODE`. Easy! However, this doesn’t work if you want to retrieve your app’s version code whilst inside a submodule. Instead, the *submodule*‘s version code is returned.

The solution is to use the package manager to get your application’s `PackageInfo`. Next, the `versionCode` and `versionName` can be retrieved (if in a fragment, replace `this` with `activity?`):

```
try {
    val info = this.packageManager?.getPackageInfo(this.packageName, 0)
    val versionName = info?.versionName
    val versionCode = info?.versionCode
} catch (e: PackageManager.NameNotFoundException) {
    Timber.e(e)
}
```

Note that whilst technically a `NameNotFoundException` can be thrown, since you’re looking up your own app it’s a safe bet that it exists on the device! Additionally, there is a lot of other information available from the `PackageInfo` object returned, with no extra permissions required.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/info.png?resize=502%2C524&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/info.png?ssl=1)