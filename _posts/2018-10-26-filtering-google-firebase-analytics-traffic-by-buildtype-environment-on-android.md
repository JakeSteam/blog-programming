---
id: 1795
title: 'Filtering Google / Firebase Analytics Traffic By BuildType / Environment On Android'
date: '2018-10-26T17:00:56+01:00'
permalink: /filtering-google-firebase-analytics-traffic-by-buildtype-environment-on-android/
image: /wp-content/uploads/2018/10/fcc5jc7.png
categories:
    - 'Android Dev'
tags:
    - 'Custom Build Type'
    - 'Firebase Analytics'
    - 'Google Analytics'
    - Kotlin
    - Marketing
---

Firebase Analytics / Google Analytics is the most widely used service for analysing traffic, and can be used to track detailed information about how users use your app. However, by default it will track **all** information, including any logged during development or QA. This may mean that the new page you're working on seems to have a massive spike in traffic, potentially misleading any marketing efforts.

Whilst this tutorial covers Firebase Analytics especially, the steps are identical for Google Analytics. Note that only apps added as a "Mobile app" (e.g. using Firebase) can use user properties.

## Creating the user property

First, go to the "User Properties" link in the sidebar of the Firebase dashboard, and click the "New User Property" button.  
![user properties](/wp-content/uploads/2018/10/alnvs2o.png)

Enter "Environment" as your user property name, and an optional description, then press "Create", and your new user property will be in the list. Please note that User Properties **cannot be deleted or renamed**, so type them carefully!  
![environment]/wp-content/uploads/2018/10/zzqo4b4.png)

## Setting the user property

Now the user property has been created, values can be set for it. This tutorial assumes you've already [added Firebase Analytics for Android](https://firebase.google.com/docs/analytics/android/start/).

The easiest way to do this is to just send the current `BuildConfig.BUILD_TYPE`, as this ensures any future custom build types (e.g. "QA" or "Preprod") will be sent automatically. However, custom logic can of course be used instead.

This should be placed inside the `onCreate` or `onStart` of your application, with the rest of your initialisations.

```
FirebaseAnalytics.getInstance(this)
    .setUserProperty("Environment", BuildConfig.BUILD_TYPE)
```

## Filtering by user property

Once the app has been run with a user property set, the new value will be automatically added to Analytics to be filtered on. To apply the filter, click the grey dotted "Add Filter" button in the top left of Analytics, select "User Property", and select the Environment values you'd like to view data for. In the example below, only data from preprod and release environments will be shown, omitting all development or testing data.  
![user property](/wp-content/uploads/2018/10/ty3mwzp.png)

Now that Analytics data is filtered to only include your real customers, the more accurate representation should help give a better idea of a user's experience inside your app, and how to improve it.