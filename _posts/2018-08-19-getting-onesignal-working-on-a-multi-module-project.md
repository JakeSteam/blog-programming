---
id: 1596
title: 'Getting OneSignal Working On A Multi-Module Project'
date: '2018-08-19T19:12:41+01:00'
author: 'Jake Lee'
layout: post
permalink: /getting-onesignal-working-on-a-multi-module-project/
image: /wp-content/uploads/2018/08/1_7xHdCFeYfD8zrIivMiQcCQ.png
categories:
    - 'Android Dev'
tags:
    - 'Google Play Services'
    - Gradle
    - Modules
    - OneSignal
---

Recently, upon attempting to implement OneSignal for user notifications (and following [their installation instructions](https://documentation.onesignal.com/docs/android-sdk-setup)), a wide variety of intriguing and mysterious build errors were encountered.

The root cause of these seemed to be their gradle plugin (ironically intended to simplify the dependency process, and solve any Google Play Services issues) causing issues when attempting to be applied to a project with 10+ modules inside it. Luckily, the fix was pretty straight forward.

First, a few of the errors encountered:

- `com.google.android.gms:play-services-measurement-base is being requested by various other libraries`
- `Android dependency is set to compileOnly/provided which is not supported`
- `Error: Program type already present: com.google.android.gms.internal.measurement.zzwo`
- `java.lang.NoClassDefFoundError: com.google.android.gms.gcm.GoogleCloudMessaging`
- `Duplicate key com.android.build.gradle.internal.api.artifact.BuildableArtifactImpl@7c139f68`

The reason behind these issues ultimately boiled down to:

1. The Gradle plugin being useful in an ideal situation, but just muddying the waters if trying to resolve an issue manually.
2. The [library’s `build.gradle`](https://github.com/OneSignal/OneSignal-Android-SDK/blob/master/OneSignalSDK/onesignal/build.gradle) containing a few old Google Play Services dependencies (e.g. 12.0.1), and some unusual syntax.
3. The OneSignal library not being designed for a project with many modules.

The solution settled on was unfortunately not at all ideal, but it *did* get notifications working perfectly:

1. Remove all code to do with the Gradle plugin, it’s not necessary.
2. Download the module as a `.zip` and import it into your project manually.
3. Update the Google Play Services version to the same as the rest of your project.
4. Add `implementation ‘com.google.android.gms:play-services-ads:15.0.1’` to the new submodule’s `build.gradle`, or a few files within won’t compile.
5. Fix a couple of files that have missing imports.
6. Resync Gradle, and skip to [Step 2 of the OneSignal setup docs](https://documentation.onesignal.com/docs/android-sdk-setup).
7. *Note: If you’re using build flavours, make sure you change those in the new submodule to match your own.*

Whilst the solution did work, unfortunately it’s a very hacky approach, just downloading the library and manually messing the the gradle files. Hopefully in the future the OneSignal library’s multi module support improves.