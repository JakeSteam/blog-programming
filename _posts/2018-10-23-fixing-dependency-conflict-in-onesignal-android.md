---
id: 1786
title: 'Fixing Dependency Conflict In OneSignal Android'
date: '2018-10-23T15:00:04+01:00'
author: 'Jake Lee'
layout: post
permalink: /fixing-dependency-conflict-in-onesignal-android/
image: /wp-content/uploads/2018/10/89dfggs.png
categories:
    - 'Android Dev'
tags:
    - CI
    - 'Custom Flavours'
    - Dependency
    - Gradle
    - Notifications
    - OneSignal
---

Whilst following OneSignal’s [setup guide](https://documentation.onesignal.com/docs/android-sdk-setup) for their [Android SDK](https://github.com/OneSignal/OneSignal-Android-SDK), everything went smoothly until attempting to run the build past our CI (continuous integration) server, [CircleCI](https://circleci.com/). I’ve [encountered various issues](/getting-onesignal-working-on-a-multi-module-project/) when using custom build flavours with OneSignal before, and expect that was the cause of this issue too.

The build failed, due to the following exception:

```groovy
Execution failed for task ':app:preCustomflavourQaAndroidTestBuild'.
> Conflict with dependency 'com.google.firebase:firebase-messaging' in project ':app'. Resolved versions for app (17.0.0) and test app (12.0.1) differ. See https://d.android.com/r/tools/test-apk-dependency-conflicts.html for details.
```

As Firebase messaging was not used in any modules inside the project, only by OneSignal, the conflict was a little confusing. Was it… conflicting with itself!? Regardless, the solution was relatively straightforward, simply forcing Firebase Messaging to **always** resolve to the correct version (17.0.0) fixed the test build.

Inside the app-level `build.gradle`, add:

```
configurations.all {
    resolutionStrategy {
        force "com.google.firebase:firebase-messaging:17.0.0"
    }
}
```

This change fixed the test build, and our CI was back to a lovely sea of green success messages!