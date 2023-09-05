---
title: Identifying and fixing a DisplayListCanvas crash (too large bitmap) with none of my Android code in the stacktrace
author: Jake Lee
layout: post
image: /assets/images/2023/densities-banner.png
tags:
    - Android
    - Drawable
    - Crashes
---

A project recently had a crash that had been reported in low numbers for the lifetime of the app. Interestingly, the stack trace was unchanging, but only displayed "`android.`" code, nothing from my codebase! Here's how I debugged it and found a fix (hint: it's caused by drawables).

This article is going to be as much about the bug hunting process as the fix, so if you just want to fix your codebase [jump straight to the solution](#the-solution)!

## Bug hunting

The first thing to look at with an unusual crash is the stack trace, to see if there are any clues.

### Stack trace 

My crash's stack trace did not reference any lines of my code. It consisted of a lot of `view` related code eventually calling some sort of image displaying logic:

```java
Fatal Exception: java.lang.RuntimeException: Canvas: trying to draw too large(177707520bytes) bitmap.
       at android.view.DisplayListCanvas.throwIfCannotDraw(DisplayListCanvas.java:229)
       at android.view.RecordingCanvas.drawBitmap(RecordingCanvas.java:97)
       at android.graphics.drawable.BitmapDrawable.draw(BitmapDrawable.java:529)
       at android.widget.ImageView.onDraw(ImageView.java:1367)
       at android.view.View.draw(View.java:20373)
       at android.view.View.updateDisplayListIfDirty(View.java:19318)
       at android.view.View.draw(View.java:20096)
       at android.view.ViewGroup.drawChild(ViewGroup.java:4421)
       at android.view.ViewGroup.dispatchDraw(ViewGroup.java:4207)
       at androidx.constraintlayout.widget.ConstraintLayout.dispatchDraw(ConstraintLayout.java:1975)
       at android.view.View.draw(View.java:20376)
       at android.view.View.updateDisplayListIfDirty(View.java:19318)
... 50+ lines of view related code removed ...
       at android.os.Looper.loop(Looper.java:164)
       at android.app.ActivityThread.main(ActivityThread.java:6944)
       at java.lang.reflect.Method.invoke(Method.java)
       at com.android.internal.os.Zygote$MethodAndArgsCaller.run(Zygote.java:327)
       at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1374)
```

Alright, so it's... a massive image somewhere in the app. This is not particularly helpful.

What other information do we have available?

### Gathering clues

#### Is it repeatable? 

First up, does it seem repeatable or a bizarre edge case? Looking at Crashlytics (other platforms will show similar data), we can see 40 users affected in the past 3 months, with a total of 169 crashes:

[![](/assets/images/2023/densities-total-crashes.png)](/assets/images/2023/densities-total-crashes.png)

Whilst these are relatively low numbers, ~4.2 crashes per user suggests these users are in a permanently broken state, and restarting the app is not fixing the problem. This is obviously bad for the user, but good for us trying to reproduce and fix it!

#### Who is affected? 

Next up, who is it affecting? 

[![](/assets/images/2023/densities-version.png)](/assets/images/2023/densities-version.png)

Ah! Everyone is on Android 8! This is definitely a useful clue, but we will hang onto it for now.

#### What were the users doing?

Due to the stack trace not mentioning our code, we don't know where the crash happens. However, even with basic log events being sent to Crashlytics (e.g. screen opened), we can find out! 

[![](/assets/images/2023/densities-screenviews.png)](/assets/images/2023/densities-screenviews.png)

Alright, I now know the approximate screen the user was on, and what they had done beforehand. I also looked at various crashes, and they all had different paths to the same destination, telling me the screen itself is likely the issue.

#### Any other information?

So, we now know which screen causes the crash for Android 8 users. Just so we don't forget, we also have a consistent image size between all the crashes (`177707520 bytes`), telling us it's something constant (e.g. not a profile picture).

That number will be important later!

### Reproducing the bug

First thing to do is open up an Android 8 emulator, and go to that screen! As expected, it didn't crash. However, that screen has multiple states, and after trying a few I found the exact scenario that crashed. Every single time I tried to open a specific type of receipt, the app would crash, leaving only that mysterious stack trace in Logcat.

Usually with a bug, reproducing it is over half the battle. However this time, I could *not* work out why the app crashed! I commented out all image loading code, set breakpoints all over the place, tried drastic steps like detaching ViewModels, and no luck. It would always crash when opened.

### Isolating the bug 

Then I realised... the crash mentions views. So... what's in the XML? Initially I tried removing the logos, header images, anything dynamic. Still crashed. Then I noticed this section:

```
<ImageView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:scaleType="centerCrop"
            android:src="@drawable/ic_gradient_white_circles"
```

Huh, I don't remember a white circles icon, and certainly not one with a gradient. I wonder what the file looks like?

[![](/assets/images/2023/densities-icon.png)](/assets/images/2023/densities-icon.png)

Uh oh. There's 3 relatively minor issues here, which combine to make a big issue:

1. This decorative background gradient should be XML. 
2. If it has to be a PNG, it should not be 485 KB!
3. If it has to be a big PNG, it should *definitely* not be in the `drawable` folder! That's for XML!

Replacing this image in the XML stops the crash, confirming our theory that it is problematic. However, we can also confirm it through maths...

### Confirming the cause

Remember the number `177707520` from our stack trace? Time to see where that comes from:

1. Our image has a resolution of `1440*3428`. This is `4,936,320` pixels.
2. Our test device is XXHDPI density, and since the image is placed in the `drawable` folder, it gets scaled up 3x ([source](https://stackoverflow.com/a/28507826/608312)) to fit the screen (despite the already large size!)
3. This gives us a resolution of `(1440*3)*(3428*3)`, or `78,981,120` pixels. This is a lot.
4. Our lossless, transparency-supporting PNG needs 4 bytes per pixel (alpha, red, green blue). `78,981,120*4` = 177,707,520 bytes needed. 
5. That's the number we started with! So yes, this image is 100% the cause of the crash.

## The solution

The problem can be solved in many ways, as it is a combination of multiple minor issues:

1. **Replace the PNG with XML**: The correct fix, but may be high effort.
2. **Replace the PNG with multiple scaled versions**: Also a good fix, if XML isn't possible.
3. **Replace the PNG with a JPG / GIF**: This might stop the crash occurring, but would still use up extra memory unnecessarily.
4. **Move the PNG out of `drawable` into `drawable-nodpi`**: Will stop the image being scaled absurdly, but will also result in some devices loading larger images than necessary.

I ended up going for solution 4 as an immediate fix, with solutions 1 & 2 planned for this & other currently unscaled drawables. I also discovered we have a couple of hundred country flags in our `drawable` folder, so they got moved too!

[![](/assets/images/2023/densities-pr.png)](/assets/images/2023/densities-pr.png)

### Drawable folders 

The `drawable` folders are a constant source of confusion for Android devs, even experienced ones. This isn't helped by [the official docs](https://developer.android.com/develop/ui/views/graphics/drawables) stating the oddly misleading:

> To use an image resource, add your file to the `res/drawable/` directory of your project. 

In reality, any PNG / JPG / GIFs put in `/drawable/` get treated as `drawable-mdpi`, which is almost certainly not what a developer intends ([more info](https://stackoverflow.com/a/33632112/608312)).

The core rules for real-world usage are simple:

* XML files are put in `/drawable/`.
* PNG files get scaled to multiple sizes and put in `/drawable-xhdpi/`, `/drawable-xxhdpi/`, etc.
* Anything that shouldn't be scaled (rare!) goes in `/drawable-nodpi/`.

## Conclusion

1. Use all the clues available when investigating a crash. Repeat occurrences, actions beforehand, OS used, as well as of course the stack trace.
2. If your stack trace only seems to mention views and layouts, the problem is in your views and layouts!
3. PNG / JPG should *never* be in the `drawable` folder. Ever.
