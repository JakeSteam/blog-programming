---
id: 1381
title: 'Auto-detecting Device Orientation Whilst Allowing User to Override'
date: '2017-06-13T11:20:01+01:00'
author: 'Jake Lee'
layout: post
permalink: /auto-detecting-device-orientation-whilst-allowing-user-to-override/
image: /wp-content/uploads/2017/06/09ggcwp.png
categories:
    - 'Android Dev'
tags:
    - Landscape
    - Orientation
    - Portrait
    - 'User Options'
---

When creating games (and other apps), screen orientation is very important. In general, more casual games use portrait, whilst more hardcore / intense games use landscape. However, some games may be inbetween these two categories, or may wish to reach a wider audience by supporting both. Automatically rotating to match device orientation is easy, but allowing the user to “lock” one orientation is a little trickier.

## The Solution

First, we’re going to store the user’s current preference (auto, landscape, or portrait), then this is going to be applied whenever an activity resumes. It is applied on resume instead of on create, to ensure reusing / reentering activities does not cause the app to switch between orientations.

Now, ensure all the activities you want to be rotatable (almost certainly all) are not specifying `orientation` under `configChanges`. If it is specified, it tells the device that the app will handle orientation changes, when we actually want the device to do the hard work for us.

Next, implement the following into a BaseActivity and ensure all activities extend is (recommended), or implement it into each activity. `setRequestedOrientation()` informs the device which orientation we want to use, then the user’s preference is loaded. The actual implementation of preference saving could just as easily be a [shared preference](https://developer.android.com/reference/android/content/SharedPreferences.html), this implementation uses an ORM object.

```
@Override
protected void onResume() {
    super.onResume();

    //noinspection ResourceType
    setRequestedOrientation(Setting.get(Enums.Setting.Orientation).getIntValue());
}
```

Note that the `//noinspection ResourceType` is required as we are passing an integer value directly, instead of using a constant. Suppressing errors is generally bad practice, but in this case [it’s unavoidable](https://stackoverflow.com/questions/28557696/how-to-use-activityinfo-screenorientation) due to the programmatic nature of the orientation.

The integers to use for orientations are available directly from [the Android source](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/content/pm/ActivityInfo.java) (line 395+), but we only care about 3 in particular, which are specified as internal constants for simplicity. They’re self explanatory, with 4 (auto) being the default.

```
public final static int ORIENTATION_AUTO = 4;
public final static int ORIENTATION_LANDSCAPE = 6;
public final static int ORIENTATION_PORTRAIT = 7;
```

Adding a dropdown or other selector to actually allow the user to pick whether they want auto / landscape / portrait is outside the scope of this article. However, very similar code was used in the “Selecting a Language” section of [the previous “Implementing A Locale / Language Selector” article](https://blog.jakelee.co.uk//implementing-a-locale-language-selector/).

As a starting point, the code used to return the constant to save from the position picked on a dropdown consisting of Auto, Portrait, and Landscape, is as follows:

```
private int getOrientationValue(int position) {
    switch (position) {
        case 1: return Constants.ORIENTATION_LANDSCAPE;
        case 2: return Constants.ORIENTATION_PORTRAIT;
        default: return Constants.ORIENTATION_AUTO;
    }
}
```

## The Conclusion

Whilst the actual code used in this article is very minimal, the overall effect is very user-friendly and powerful. An optional extension to this work would be adding orientation locks for all 4 possible screen orientations, but in this use case just landscape or portrait was sufficient. Note that the constant values still obey the device sensor, meaning if the device is turned upside down whilst landscape locked, it will flip 180° so that it is correctly orientated.

The majority of apps will likely be able to settle on just one target orientation depending on their audience, but for apps that require targeting both, adding a user override is extremely important. For games in particular, the user may want to play the game in portrait whilst lying on their side, something that would be impossible without an orientation lock as the game would rotate to match gravity.

The code used in this article is from the [upcoming Blacksmith Slots game](https://www.reddit.com/r/BlacksmithSlots/), and as always the (albeit minimal) code for this article is [available as a Gist](https://gist.github.com/JakeSteam/b9503c46e65088e0e651dc75d9782979).