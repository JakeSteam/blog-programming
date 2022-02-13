---
id: 1719
title: 'Creating A New Firebase Project'
date: '2018-09-23T20:18:10+01:00'
author:
    - 'Jake Lee'
layout: post
permalink: /creating-a-new-firebase-project/
image: /wp-content/uploads/2018/09/mky2ltg1.png
categories:
    - Development
tags:
    - Firebase
    - Tutorial
---

The first step towards integrating any of the 25+ features included in Firebase is creating a new Firebase project. The same project can be used across for multiple apps, but only one per platform. For example, a web app, Android app, and iOS app can all use the same project. This post is part of the [Firebase tutorial series](https://blog.jakelee.co.uk//firebase/).

### Firebase console

Visiting the [Firebase console page](https://console.firebase.google.com/u/0/) displays an overview of all existing projects, a link to a demo project (requires log-in), as well as a large button to create a new project.

### Create project form

Clicking the new project button displays the following screen:  
![create-firebase-project](/wp-content/uploads/2018/09/create-firebase-project.png)

1. **Project name**: This can be anything you want, and will never be seen by the user. There’s no need to include the platform in this name, as the same project can be used across Android, iOS, and web.
2. **Project ID**: This is a globally unique identifier for this project, so many common identifiers will already be taken. Firebase will automatically suggest a reasonable name for you, but you can override this if desired. Again, it will never be seen by the user. This cannot be changed later.
3. **Analytics location**: This defaults to US, but should be changed to your actual country as it affects the currency revenues are displayed in.
4. **Cloud Firestore location**: This (unsurprisingly) sets where Cloud Firestore stores data. Note that there are only 3 regions available as of this article’s publication, 2 of which are in the US. The only non-US location (west europe) doesn’t support some features (e.g. Cloud Functions).
5. **Default settings**: This setting toggles sharing Analytics data with Google. This is recommended, as it improves the service in general, and also allows Google’s technical support to diagnose any potential issues.
6. **Controller-controller terms**: This setting is only available when **Default settings** are enabled, and confirms that data should be shared according to the [Data Protection Terms](https://support.google.com/analytics/answer/9012600).

### Submitting form

Once “Create project” is clicked, it may take up to 30 seconds to actually create your project, during which you will see the screen on the left, followed eventually by the screen on the right:  
![creating-firebase-project](/wp-content/uploads/2018/09/creating-firebase-project.png)

When “Continue” is clicked, project setup is complete! You’ll then be taken to the Firebase dashboard, and prompted to integrate Firebase into your app. This topic will be covered in the next post. For help with implementing a specific Firebase feature, please view the [other Firebase posts](/search/?q=firebase).

Next: [Adding Firebase to an Android Project](/adding-firebase-to-an-android-project/)