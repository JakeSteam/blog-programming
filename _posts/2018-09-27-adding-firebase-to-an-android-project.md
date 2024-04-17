---
id: 1728
title: "Adding Firebase to an Android Project"
date: "2018-09-27T21:49:17+01:00"
author: "Jake Lee"
layout: post
permalink: /adding-firebase-to-an-android-project/
image: /wp-content/uploads/2018/09/dkl3twd.png
categories:
  - "Android Dev"
tags:
  - Firebase
  - Tutorial
---

Considering the vast array of features included in Firebase, adding it to your project is surprisingly easy. Later versions of Android Studio even include an assistant that analyses the current project and provides fixes for common integration mistakes.

This guide however, will focus on the very straightforward steps required to integrate Firebase manually.

## Prerequisites

1. An existing [Firebase project](/creating-a-new-firebase-project/)
2. An existing Android Studio project ([an example project is available](https://github.com/JakeSteam/FirebaseReference/releases/tag/no-integration))

## Google Services file

The next step is obtaining a `google-services.json` file, so that the app knows which Firebase project to talk to. This can be done by visiting [the project overview](https://console.firebase.google.com/project/_/overview) and clicking the Android icon.  
![getting started](/wp-content/uploads/2018/09/ylq8bsv.png)

This will bring up the “Add Firebase” wizard:  
![add firebase wizard](/wp-content/uploads/2018/09/gg9tpzq.png)

1. **Android package name**: The only required part of this form, this is the package name used when creating your app. It will be visible in the `AndroidManifest.xml` file as `package="com.example.test"`.
2. **App nickname**: This is an optional “friendly” name you can use to better summarise the app.
3. **Debug signing certificate**: This is not needed for most aspects of Firebase, but [a guide does exist](https://developers.google.com/android/guides/client-auth).

Once 1-3 of the fields have been filled in, the app can now be registered (4). Clicking this button will provide a download link for your `google-services.json` file, as well as instructions on where to put it. Switch to “Project” view in the left Android Studio sidebar, then put the downloaded file inside the “app” folder.

## Firebase SDK

Next, the Firebase library needs to be added to your project. Doing this is just 4 simple steps:

1. Add `classpath 'com.google.gms:google-services:4.0.1'` inside the `dependencies` section of your project level `build.gradle` (file will have “(Project: yourappname)” next to it).
2. Add `implementation 'com.google.firebase:firebase-core:16.0.3'` inside the `dependencies` section of your app level `build.gradle` (file will have “(Module: app)” next to it).
3. Also add `apply plugin: 'com.google.gms.google-services'` to the bottom of the app level `build.gradle`.
4. Finally, press “Sync now” in the yellow bar at the top.

_Note: As of writing, 16.0.3 is the latest Firebase version, and 4.0.1 the latest Google services version. If these are outdated, Android Studio will prompt you to update._

## Final steps

Finally, just run your app, and the “Add Firebase” wizard will confirm Firebase has been set up correctly:  
![complete](/wp-content/uploads/2018/09/dkl3twd.png)

That’s it, Firebase is fully set up! Your project settings (e.g. name) [can be changed later](https://console.firebase.google.com/project/_/settings/general/) if necessary.

Previous: [Creating A New Firebase Project](/creating-a-new-firebase-project/)  
Next: [Developing Android Apps With Firebase Authentication](/developing-android-apps-with-firebase-authentication/)
