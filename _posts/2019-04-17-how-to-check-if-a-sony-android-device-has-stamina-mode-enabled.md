---
id: 2466
title: 'How to check if a Sony Android device has &#8220;Stamina mode&#8221; enabled'
date: '2019-04-17T20:59:55+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2466'
permalink: /how-to-check-if-a-sony-android-device-has-stamina-mode-enabled/
snap_isAutoPosted:
    - '1555534796'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1118620329042161665";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1118620329042161665";s:5:"pDate";s:19:"2019-04-17 21:00:44";}}";'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6524386024196448256";s:5:"pDate";s:19:"2019-04-17 21:00:45";}}";'
image: /wp-content/uploads/2019/04/q4fwvWP-150x150.png
categories:
    - 'Android Dev'
tags:
    - Kotlin
    - 'power saving'
    - sony
---

Whilst detecting power saving mode (at least on Lollipop+) is [very easy](https://blog.jakelee.co.uk/displaying-a-power-saving-enabled-bar-inside-your-android-app/), some manufacturers implement their own battery saving systems. One of the least standards-conforming of these is [Sony’s Stamina Mode](https://support.sonymobile.com/gb/xperiam2/faq/battery,-power-&-charging/023101886c027a68013a30335ef3007772/). Luckily this is easily detected, albeit in an unofficial way.

It’s important to note that this method only detects if the mode is *enabled in general*, not whether it is currently in use. For example, if a user has the mode set to activate on &lt;15% battery, this method will return true even if the battery is currently 100%. Regardless, since the only official response is [“there is no official way” from 5 years ago](https://stackoverflow.com/a/19823306/608312), this is the best available for now!

First, check the device is a Sony device. If it’s not, stamina mode definitely won’t be on!

```
<span class="pl-k">if</span> (<span class="pl-en">Build</span>.<span class="pl-en">MANUFACTURER</span>.toUpperCase() <span class="pl-k">==</span> <span class="pl-s"><span class="pl-pds">"</span>SONY<span class="pl-pds">"</span></span>) {
```

Next, check if the `somc.stamina_mode` settings value is set to 1. This is done by using `android.provider.Settings`, you may need to replace `contentResolver` with `context.getContentResolver()`:

```
<span class="pl-en">Settings</span>.<span class="pl-en">Secure</span>.getInt(contentResolver, <span class="pl-s"><span class="pl-pds">"</span>somc.stamina_mode<span class="pl-pds">"</span></span>, <span class="pl-c1">0</span>) <span class="pl-k">==</span> <span class="pl-c1">1</span>
```

For example, a Kotlin function to display a bar if Sony’s Stamina Mode is on may look like:

```
private fun performSonyPowerSavingCheck() {
    if (Build.MANUFACTURER.toUpperCase() == "SONY") {
        togglePowerSavingBar(
            Settings.Secure.getInt(contentResolver, "somc.stamina_mode", 0) == 1
        )
    }
}
```