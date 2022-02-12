---
id: 2116
title: 'Ensuring Your Android App&#8217;s Quality With Firebase Performance Monitoring'
date: '2018-12-06T19:59:37+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2116'
permalink: /ensuring-your-android-apps-quality-with-firebase-performance-monitoring/
snap_isAutoPosted:
    - '1544126378'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapMD:
    - "s:447:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:66:\"%ANNOUNCE%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"b6d66ada0d50\";s:7:\"postURL\";s:114:\"https://medium.com/@JakeSteam/ensuring-your-android-apps-quality-with-firebase-performance-monitoring-b6d66ada0d50\";s:5:\"pDate\";s:19:\"2018-12-06 19:59:46\";}}\";"
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1070769991690129409";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1070769991690129409";s:5:"pDate";s:19:"2018-12-06 20:00:34";}}";'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6476535685653364736";s:5:"pDate";s:19:"2018-12-06 20:00:35";}}";'
image: /wp-content/uploads/2018/12/cover-150x150.png
categories:
    - 'Android Dev'
tags:
    - Firebase
    - Kotlin
    - Performance
    - Tutorial
---

Firebase Performance Monitoring allows you to gather automatic performance data about your app, as well as performing manual performance traces for later analysis. All of these contain aggregated information about user’s devices, meaning long-term issues can be quickly identified and resolved.

This post is part of [The Complete Guide to Firebase](https://blog.jakelee.co.uk//firebase/). Throughout this tutorial, you’ll need access to the [Firebase Performance Monitoring dashboard](https://console.firebase.google.com/u/0/project/_/performance), and the [official documentation](https://firebase.google.com/docs/perf-mon/get-started-android) may be useful.

## Implementation

As always, the entire [Firebase Reference Project is open source](https://github.com/JakeSteam/FirebaseReference), and there is a [pull request for adding Firebase Performance Monitoring](https://github.com/JakeSteam/FirebaseReference/pull/11) if you just want to see the code changes required. This tutorial assumes you already have [Firebase added to your project](https://blog.jakelee.co.uk//adding-firebase-to-an-android-project/).

In this tutorial, you’ll learn how to monitor the performance of your app, as well as benchmark specific scenarios across all users. You’ll also be able to track network requests, startup time, and how long your app was in the foreground.

### Adding Performance Monitoring to your project

First, in your app-level `build.gradle`, just below `apply plugin: 'com.android.application'` add:

```
apply <span class="pl-c1">plugin</span>: <span class="pl-s"><span class="pl-pds">'</span>com.google.firebase.firebase-perf<span class="pl-pds">'
</span></span>
```

Still in the same file, add `implementation 'com.google.firebase:firebase-perf:16.2.0'` <span class="pl-s"><span class="pl-pds">to your dependencies.</span></span>

Next, in your project-level `build.gradle`, in the `buildscript` -&gt; `repositories` section, make sure `jcenter()` is listed.

Finally, still in the same file, add the following inside `buildscript` -&gt; `repositories`:

```
classpath 'com.google.firebase:firebase-plugins:1.1.5'
```

Perform a Gradle Sync, and your app’s performance + network requests are now being monitored!

### Performing manual traces

Whilst app startup time, activity time, app background, and app foreground times are all measured automatically, you may wish to add your own time tracking.

This can be done in 2 ways:

First, specifying methods to always track via annotations. This is useful if you want to measure entire methods, don’t want to track custom metrics, and want to keep your actual functions short and clean. This is done by adding `@AddTrace(name = "yourTraceName")` before a method. For example, this function’s time is tracked under the trace name “automatic”:

```
@AddTrace(name = "automatic")
private fun performAutomaticTrace() {
    for (i in 1..(1..20).shuffled().last()) {
        Log.d("Performance", "Value is $i")
        sleep(100)
    }
}
```

The second method is manually starting a trace. This is used when you wish to modify the trace’s metadata whilst it is running, such as modifying custom attributes being tracked. These manual traces are started by creating a trace using `FirebasePerformance.getInstance().newTrace("yourTraceName")`, then starting it with `.start()`. The trace can then be stopped with `.stop()`. For example, this function’s time is tracked under the trace name “manual”:

```
private fun performManualTrace() {
    val trace = FirebasePerformance.getInstance().newTrace("manual")
    trace.start()
    for (i in 1..(1..10).shuffled().last()) {
        sleep(100)
    }
    trace.stop()
}
```

### Monitor custom attributes

In addition to monitoring overall performance, you can also set and modify up to 5 custom attributes per trace. This can be useful for logging which code version an A/B tester is on. It can also be useful if you want to track how many times a user performs a specific action during the trace.

You must use the second method listed above (`.newTrace()`) to use custom attributes, as you need a reference to a trace. Once you have your reference, you can set a value using `putAttribute(name, value)`:

```
trace.putAttribute("run_manual", true.toString())
```

This value can also be retrieved with `trace.getAttribute(name)` and removed with `trace.removeAttribute(name)`.

Note that attributes are always stored as strings. However, if you wish to store numerical values you can use `trace.incrementMetric(name, amount)`. This value can be retrieved with `trace.getLongMetric(name)`, but cannot be deleted.

## Web interface

### Dashboard

The dashboard provides an overview of any emerging issues that require attention, as well as any poorly performing screens and other important metrics.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-issue-list.png?resize=700%2C243&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-issue-list.png?ssl=1)

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-more.png?resize=700%2C532&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-more.png?ssl=1)

Clicking an issue will provide more information about it (similar to [Crashlytics](https://blog.jakelee.co.uk/ensuring-your-android-apps-quality-with-firebase-crashlytics/)), as well as the option to close or mute the issue.

### On device

The on device tab provides an overview of trace durations, both manual and automatic. Clicking any will provide a more detailed overview, as well as the option to view extremely detailed data for a specific session. This data is extremely useful when diagnosing issues like a memory leak or sluggish performance.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-sessions-further.png?resize=300%2C223&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-sessions-further.png?ssl=1)[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-sessions.png?resize=300%2C179&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-sessions.png?ssl=1)

### Network

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-network.png?resize=700%2C188&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/perf-mon-network.png?ssl=1)

This tab shows information about network requests included in your traces, and is covered in detail in the [official Firebase docs](https://firebase.google.com/docs/perf-mon/get-started-android#manual-network).

## Conclusion

Whilst there is a slight risk of a performance overhead being added (somewhat ironically) when performing traces, this is usually outweighed by the benefits gained from knowing exactly how your app is performing. For example, if the median app start time has doubled after an update, without Firebase Performance Monitoring there wouldn’t be any way to know this! You could then track individual session and identify exactly what has changed since an earlier version.

Note that there are a few limitations with this method of performance monitoring. Most notably, only the main process can be monitored, meaning apps that make heavy use of threads or RxJava may end up with inaccurate reporting. Despite this, the service is free for unlimited usage, so is definitely worth including from the start on all apps. The collected data is then useful when attempting to optimise performance at a later date.

Previous: [Ensuring Your Android App’s Quality With Firebase Crashlytics](https://blog.jakelee.co.uk/ensuring-your-android-apps-quality-with-firebase-crashlytics/)

<span style="font-size: 12pt;">*Thanks to [Firebase docs](https://firebase.google.com/docs/) for some of the images used in this article.*</span>