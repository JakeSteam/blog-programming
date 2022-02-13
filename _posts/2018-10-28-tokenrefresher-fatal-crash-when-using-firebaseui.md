---
id: 1817
title: 'TokenRefresher Fatal Crash When Using FirebaseUI'
date: '2018-10-28T15:02:24+00:00'
author: 'Jake Lee'
layout: post
permalink: /tokenrefresher-fatal-crash-when-using-firebaseui/
image: /wp-content/uploads/2018/10/yis68te.png
categories:
    - 'Android Dev'
tags:
    - Dependency
    - Firebase
    - FirebaseUI
---

[FirebaseUI](https://github.com/firebase/FirebaseUI-Android) is a very useful collection of UI components for Firebase. It removes some of the complexity of implementing Firebase components by providing ready made UI components that your code can hook into. The [FirebaseUI-auth library](https://github.com/firebase/FirebaseUI-Android/blob/master/auth/README.md) is used for Firebase Authentication in the [Firebase series](/search/?q=firebase)‘ reference app, as well as various other Firebase dependencies.

However, when first running the app, occasionally it would crash with a somewhat cryptic error:

```
10-24 21:42:00.247 17892-17941/uk.co.jakelee.firebasereference E/AndroidRuntime: FATAL EXCEPTION: TokenRefresher
Process: uk.co.jakelee.firebasereference, PID: 17892
java.lang.NoSuchFieldError: No field PREFER_HIGHEST_OR_REMOTE_VERSION_NO_FORCE_STAGING of type Lcom/google/android/gms/dynamite/DynamiteModule$VersionPolicy; in class Lcom/google/android/gms/dynamite/DynamiteModule; or its superclasses (declaration of 'com.google.android.gms.dynamite.DynamiteModule' appears in /data/app/uk.co.jakelee.firebasereference-2/base.apk:classes3.dex)
    at com.google.android.gms.flags.FlagValueProvider.initialize(Unknown Source)
    at com.google.android.gms.flags.FlagRegistry.initialize(Unknown Source)
    at com.google.firebase.auth.internal.zzx.initialize(Unknown Source)
    at com.google.firebase.auth.internal.zzt.run(Unknown Source)
```

After looking through my commit history, I realised the problem started appearing when I previously attempted to fix a mismatched libraries error:

```text
The library com.google.android.gms:play-services-basement is being requested by various other libraries at [[15.0.1,15.0.1]], but resolves to 16.0.1. Disable the plugin and check your dependencies tree using ./gradlew :app:dependencies.
```

To resolve this, I’d added a temporary workaround in my `build.gradle`, which I completely forget to fix properly:

```
GoogleServicesPlugin.config.disableVersionCheck = true
```

Removing this version check disabler, and actually dealing with the root cause (mismatched libraries) led to the realisation that the FirebaseUI auth dependency was using an older version of `play-services-basement`.

Updating the `com.firebaseui:firebase-ui-auth` dependency to 4.2.1 from 4.1.0 fixed the problem instantly. The “quick fix” was no quicker or easier than actually fixing it properly!