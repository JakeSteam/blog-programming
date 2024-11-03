---
id: 2069
title: 'Adding A Splash Screen To An Android App'
date: '2018-11-27T18:00:23+00:00'
image: /assets/images/2022/splashscreen.png
permalink: /adding-a-splash-screen-to-an-android-app/

categories:
    - 'Android Dev'
tags:
    - Design
    - 'Splash Screen'
    - UX
---

Often, an app may take a few seconds to start-up, especially the first time. A plain white screen is shown by default, luckily this can be customised relatively easily! The solution is to add a splash screen to your app, whilst being careful to avoid increasing the app’s load time.

Many naïve splash screens actually make the app take longer to load by introducing an artificial delay. The approach in this tutorial doesn’t increase load time, and only displays as long as the app loads. An [example implementation is available](https://github.com/JakeSteam/SplashScreenDemo).

First, add a design for the splash screen and name it `splash_screen_background.xml` inside `/drawable/`. For this example, a new drawable `ic_time` was created and layered on top of the default `colorPrimary`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android" android:opacity="opaque">
    <item android:drawable="@color/colorPrimary" />
    <item>
        <bitmap
                android:gravity="center"
                android:scaleType="centerInside"
                android:src="@drawable/ic_time" />
    </item>
</layer-list>
```

Unfortunately, this can’t be a normal XML layout, and must instead be an XML drawable. Layer lists are used for the most common splash screens; coloured background with an icon in the middle. This may take some experimentation, as scaling the image correctly can be tricky.

Next, add a new style `SplashScreen` to your `styles.xml`, this is the style for the splash screen and uses your newly created background:

```xml
<style name="SplashScreen" parent="Theme.AppCompat.NoActionBar">
    <item name="android:windowBackground">@drawable/splash_screen_background</item>
</style>
```

Now set your starting activity (e.g. `MainActivity`) to use your `SplashScreen` style inside `AndroidManifest.xml`:

```
<activity
        android:name=".MainActivity"
        android:theme="@style/SplashScreen">
```

Finally, call `setTheme(R.style.AppTheme)` at the start of your `MainActivity`‘s `onCreate`, e.g.:

```
override fun onCreate(savedInstanceState: Bundle?) {
    setTheme(R.style.AppTheme)
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
}
```

Your application will now use the activity’s default splash screen theme until `onCreate` is called, when it will load the normal theme!

For testing, it’s often handy to add a `sleep(5000)` before setting the theme on `onCreate`, otherwise the app loads too quickly to get a long look at the splash screen. Drawables inside your splash screen background should also be non-vector images, as parsing the vectors often causes unexpected effects.

Full implementation source code: <https://github.com/JakeSteam/SplashScreenDemo>