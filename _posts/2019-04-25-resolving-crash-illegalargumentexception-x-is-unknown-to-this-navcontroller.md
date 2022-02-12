---
id: 2470
title: 'Resolving crash &#8220;IllegalArgumentException x is unknown to this NavController&#8221;'
date: '2019-04-25T14:54:27+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2470'
permalink: /resolving-crash-illegalargumentexception-x-is-unknown-to-this-navcontroller/
snap_isAutoPosted:
    - '1556204511'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6527195018074165248";s:5:"pDate";s:19:"2019-04-25 15:02:41";}}";'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1121429319996329984";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1121429319996329984";s:5:"pDate";s:19:"2019-04-25 15:02:39";}}";'
image: /wp-content/uploads/2019/04/kmzKg1F-150x150.png
categories:
    - 'Android Dev'
tags:
    - androidx
    - Kotlin
    - Navigation
---

Google’s [AndroidX navigation libraries](https://developer.android.com/guide/navigation/navigation-getting-started) are undoubtedly extremely useful, however they have a few quirks. For example, the following stack trace recently started showing up in my [Crashlytics crash logs](https://blog.jakelee.co.uk/ensuring-your-android-apps-quality-with-firebase-crashlytics/):

```
Fatal Exception: java.lang.IllegalArgumentException
navigation destination com.example.myapp:id/myActionId is unknown to this NavController
```

I couldn’t figure out how it was happening, as all other logging seemed normal. It was happening very rarely on a wide variety of devices, and the root cause was a little surprising. When navigating to another fragment using `myNavController.navigate(<span class="pl-en">R</span>.id.myFragment, bundle)`, a crash happens if two navigation events are triggered close together. This often happens if you have a list of links, and the user (accidentally) presses on two at once.

This is caused by the navigation controller changing the user’s location in the app to the destination immediately. This means the second navigation click can’t find the navigation action, as the action is not available on the destination fragment. For example, if a fragment has nav graph actions to go to SubFragmentA and SubFragmentB, pressing both links at once will result in:

1. First, NavController receives SubFragmentA navigation event whilst on Fragment1.
2. The NavController looks up navigation event on Fragment1, and finds it.
3. Then the NavController recognizes that the new location is SubFragmentA and starts playing any transitions.
4. Next, NavController receives SubFragmentB navigation event whilst on SubFragmentA.
5. Then the NavController tries to look up navigation event on SubFragmentA, and fails to find it.
6. Crash!

There are 2 easy solutions to this. The first is preferred, but not always possible.

## Checking current location

The first solution is to check the current location is correct before acting on an action. This will stop the above process before #4. The downside of this is needing to always know the layout of your app, and being unable to reuse navigation actions easily from other fragments. However, for a simple app / use case this will instantly resolve the issue:

```
if (it.findNavController().currentDestination?.id == R.id.fragment_dashboard) {
    it.findNavController().navigate(R.id.fragment_detail)
}
```

Note that `R.id.fragment_dashboard` is the nav graph ID of the current fragment, and `R.id.fragment_detail` is the nav graph ID of the target fragment.

## Catching exception

The second solution is a lot less attractive, and involves simply catching the thrown exception. This lets the first navigation continue as expected, and ignores the second navigation.

```
try { 
    it.findNavController().navigate(R.id.toDetails)
} catch (e: IllegalArgumentException) {
    // User tried tapping 2 links at once!
    Timber.e("Can't open 2 links at once!")
}
```