---
id: 1802
title: 'Centralising Firebase / Google Analytics Screen Tracking Using Android Fragments'
date: '2018-10-27T07:00:02+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk//?p=1802'
permalink: /centralising-firebase-google-analytics-screen-tracking-using-android-fragments/
timeline_notification:
    - '1540624349'
image: /wp-content/uploads/2018/10/axtxt2h.png
categories:
    - 'Android Dev'
tags:
    - 'Firebase Analytics'
    - 'Google Analytics'
    - Kotlin
    - Marketing
---

Whilst tracking user’s screen views with Firebase / Google Analytics can be very simple to setup, it can easily result in a very messy codebase, with hardcoded strings all over the place. Keeping all of the tracking logic in one place allows an instant overview of all tracked screens, as well as easily checking where a screen is reporting a view. Note that this tutorial is for fragments, activities can already be tracked easily automatically.

This guide on how to create a `TrackingUtil()` class is also [available as a Gist](https://gist.github.com/JakeSteam/19c4d4869001b41c81de9c5b91dfd4c3). It also assumes Analytics has already been setup!

In our `TrackingUtil` class, we’re going to achieve two goals. Centralise all screen name definitions, and provide a simple interface to report views via.

## Centralised screen name definition

An enum is perfect for this, as it can easily be referenced in other classes, whilst maintaining a static name without needing to use strings.

```
class TrackingUtil(val context: Context) {
    enum class Screens {
        ChangePassword,
        Contact,
        Dashboard,
        DashboardInfo,
        ForgottenPassword,
        Info,
        Login,
        Registration
    }
```

Now, the login fragment / activity can use `TrackingUtil.Login` if it wishes to log a screen view.

## Reporting interface

A simple wrapper will be used for this, without any modification to the incoming screen views. In this example of filtering reported screen views, no data is sent when in debug mode.

```

    fun track(screen: Screens) {
        if (!BuildConfig.DEBUG) {
            FirebaseAnalytics.getInstance(context.applicationContext)
                .setCurrentScreen(context, screen.name, null)
            Timber.d("Sending screen view of ${screen.name}")
        }
    }
```

Alternatively, [user properties can be used to filter environment data](https://blog.jakelee.co.uk//filtering-google-firebase-analytics-traffic-by-buildtype-environment-on-android).

## Using TrackingUtil

Now, just call `.track` on an instance of `TrackingUtil` and pass a screen from our earlier enum to send a screen view. If using fragments, the best place is inside `onCreateView`:

```

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        TrackingUtil(activity!!).track(TrackingUtil.Screens.Login)
        return inflater.inflate(R.layout.fragment_login, container, false)
    }
```

Whilst this solution does require access to a context, the core Firebase Analytics call does too, so this is no more trouble than using the original reporting method.

Performing “Find Usages” on any screen in the enum provides a quick way to check the correct places are calling each screen, and any unused screen name will be immediately obvious due to the grey colour caused by an unused resource.

## Viewing screen view data

On the main Analytics dashboard, the user engagement widget provides a link to “View screen\_view event details”, which will take you to an overview of where users have been in your app.

Next, selecting “Screen name” in the “User engagement” widget will show where users have been in your app, broken down by percentage and average time.  
![axtxt2h](https://i2.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/10/axtxt2h.png?resize=506%2C342&ssl=1)

This data on a per-screen basis should help analyse and improve user’s experiences in your app, and tell you the areas people care most about. Even if there is no current goal to track and analyse this data, it’s worth tracking in case it’s needed in the future.