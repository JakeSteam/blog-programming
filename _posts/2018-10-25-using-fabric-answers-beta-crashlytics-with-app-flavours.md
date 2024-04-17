---
id: 1792
title: "Using Fabric (Answers / Beta / Crashlytics) With App Flavours"
date: "2018-10-25T15:00:07+01:00"
author: "Jake Lee"
layout: post
guid: "https://blog.jakelee.co.uk/?p=1792"
permalink: /using-fabric-answers-beta-crashlytics-with-app-flavours/
timeline_notification:
  - "1540479777"
image: /wp-content/uploads/2018/10/xnvbcdh.png
categories:
  - "Android Dev"
tags:
  - Beta
  - Crashlytics
  - "Custom Flavours"
  - Fabric
---

Setting up Fabric is usually pretty straightforward, especially as they have a [step by step guide](https://fabric.io/kits/android/crashlytics/install), and even an [Android Studio plugin](https://fabric.io/downloads/android-studio) that can do it all for you.

Initialising Fabric is also just a simple one-liner in your application class’ `onCreate()`:

```
Fabric.with(this, new Crashlytics());
```

Easy, run the app and we’re done! Except.. not if we’re using more than one flavour. The package names of the alternate flavours won’t register, uh oh…

Since Fabric automatically picks up the app identifier from the manifest, it isn’t possible to manually add an alternate flavour, and even running the alternate flavour doesn’t force Fabric to add it.

To get around this, the app identifier has to be manually set when Fabric is initialised, based on the current `BuildConfig`:

```
Fabric.with(
    Fabric.Builder(this)
        .kits(Crashlytics())
        .appIdentifier(BuildConfig.APPLICATION_ID)
        .build()
)
```

Now, the **current** application ID will be registered, instead of the package used in `AndroidManifest.xml`. The different flavours will be treated as completely independent apps in Fabric, so will have different crash reports, Beta release groups, etc.
