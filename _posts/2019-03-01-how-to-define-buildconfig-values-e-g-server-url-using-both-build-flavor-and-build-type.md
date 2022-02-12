---
id: 2405
title: 'How to define BuildConfig values (e.g. server URL) using both build flavor and build type'
date: '2019-03-01T14:58:31+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2405'
permalink: /how-to-define-buildconfig-values-e-g-server-url-using-both-build-flavor-and-build-type/
snap_isAutoPosted:
    - '1551452312'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapMD:
    - "s:215:\"a:1:{i:0;a:6:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;}}\";"
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1101497216991219712";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1101497216991219712";s:5:"pDate";s:19:"2019-03-01 14:59:36";}}";'
image: /wp-content/uploads/2019/03/569B2579-60F8-48F6-AB63-C3725ACE4074.png-150x150.jpg
categories:
    - 'Android Dev'
tags:
    - BuildVariants
    - Gradle
---

When creating an app, build variants are almost always used to some degree. For example, working on a `debug` build during development but publishing a `release` build. These `buildTypes` are a good way of distinguishing between multiple environments your app may run in. You’ll often have a QA `buildType` that talks to a different server than your live app. Setting server URLs for each `buildType` is a very common practice, and is usually enough.

However, some apps have multiple flavours, such as an app that is [branded with different colours](https://blog.jakelee.co.uk/how-to-handle-colours-logically-in-a-multi-flavour-android-app/) for multiple clients. The problem arises when these two approaches are combined, and a wildly different server URL is needed for every combination of flavour and `buildType`.

## Approach

There are a few different solutions to this problem, some more elegant than others. This post will cover an implementation of Alex Kucherenko’s excellent [StackOverflow answer](https://stackoverflow.com/a/47199250). An example implementation project is [available on GitHub](https://github.com/JakeSteam/CombinedBuildConfigVariables).

The core idea of the approach is to define a dictionary of key-value pairs called `serverUrl` inside each product flavour. This will contain every `buildType` as a key, and the appropriate server URL as the value. Then, a function will determine the correct URL to use during the build.

In this example, there are 4 environments (`debug`, `qa`, `staging`, `release`), and 3 client company flavours (`companyA`, `companyB`, `companyC`) to build for.

## Defining values

First, for each product flavour the `serverUrl` dictionary needs to be defined, containing a value for every possible build type. This should go inside the `android {` part of your app-level `build.gradle`.

```
flavorDimensions "company"
productFlavors {
    companyA {
        ext.serverUrl = [
                debug: "https://internal.companya-dev.com",
                qa: "https://testing.companya.com",
                staging: "https://beta.companya.com",
                release: "https://api.companya.com"
        ]
    }
    companyB {
        ext.serverUrl = [
                debug: "https://alpha.test.companyb.net",
                qa: "https://test.companyb.net",
                staging: "https://api.companyb.net",
                release: "https://api.companyb.net"
        ]
    }
    companyC {
        ext.serverUrl = [
                debug: "http://192.168.0.1:29",
                qa: "http://192.168.0.1:45",
                staging: "http://192.168.0.1:77",
                release: "https://api.companyc.com"
        ]
    }
}
```

## Parsing values

Next, a function loops through every possible build variant, and looks up the appropriate value based on the flavour and build type. The BuildConfig constant `SERVER_URL` is then assigned this value, and can be accessed with `BuildConfig.SERVER_URL`. The function also goes inside `android {`:

```
applicationVariants.all { variant ->
    def flavor = variant.productFlavors[0]
    variant.buildConfigField "String", "SERVER_URL", "\"${flavor.serverUrl[variant.buildType.name]}\""
}
```

## Next steps

This approach can be used for much more than just server URLs, and the BuildConfig setting function is generic enough that new build variant specific variables can be added just by adding a new line.

Note that [some alternative approaches](https://stackoverflow.com/a/30486355) use large if / else trees, by checking what the final build name starts with or contains. An issue with this is if you assume any build with “qa” in should get a QA url, what happens if you make a version for a client called “Kwiqapps”? They’re always going to get QA builds! The approach in this post is safe to use, regardless of the flavour or build type name.

*Shoutout to David Medenjak, who posted [a very similar approach](https://blog.davidmedenjak.com/android/2016/11/09/build-variants.html) I came across just as I was finishing this article!*