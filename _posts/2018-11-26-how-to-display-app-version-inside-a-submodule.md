---
id: 2066
title: 'How To Display App Version Inside a Submodule'
date: '2018-11-26T18:00:09+00:00'
author: 'Jake Lee'
layout: post
permalink: /how-to-display-app-version-inside-a-submodule/
image: /wp-content/uploads/2018/11/info.png
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

[![](/wp-content/uploads/2018/11/info.png)](/wp-content/uploads/2018/11/info.png)