---
id: 2466
title: 'How to check if a Sony Android device has "Stamina mode" enabled'
date: '2019-04-17T20:59:55+01:00'
permalink: /how-to-check-if-a-sony-android-device-has-stamina-mode-enabled/
image: /wp-content/uploads/2019/04/q4fwvWP.png
categories:
    - 'Android Dev'
tags:
    - Kotlin
    - 'power saving'
    - Sony
---

Whilst detecting power saving mode (at least on Lollipop+) is [very easy](/displaying-a-power-saving-enabled-bar-inside-your-android-app/), some manufacturers implement their own battery saving systems. One of the least standards-conforming of these is [Sony's Stamina Mode](https://support.sonymobile.com/gb/xperiam2/faq/battery,-power-&-charging/023101886c027a68013a30335ef3007772/). Luckily this is easily detected, albeit in an unofficial way.

It's important to note that this method only detects if the mode is *enabled in general*, not whether it is currently in use. For example, if a user has the mode set to activate on &lt;15% battery, this method will return true even if the battery is currently 100%. Regardless, since the only official response is ["there is no official way" from 5 years ago](https://stackoverflow.com/a/19823306/608312), this is the best available for now!

First, check the device is a Sony device. If it's not, stamina mode definitely won't be on!

```
if (Build.MANUFACTURER.toUpperCase() == "SONY") {
```

Next, check if the `somc.stamina_mode` settings value is set to 1. This is done by using `android.provider.Settings`, you may need to replace `contentResolver` with `context.getContentResolver()`:

```
Settings.Secure.getInt(contentResolver, "somc.stamina_mode", 0) == 1
```

For example, a Kotlin function to display a bar if Sony's Stamina Mode is on may look like:

```
private fun performSonyPowerSavingCheck() {
    if (Build.MANUFACTURER.toUpperCase() == "SONY") {
        togglePowerSavingBar(
            Settings.Secure.getInt(contentResolver, "somc.stamina_mode", 0) == 1
        )
    }
}
```