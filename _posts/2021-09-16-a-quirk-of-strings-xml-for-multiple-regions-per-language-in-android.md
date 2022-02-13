---
id: 3042
title: 'A quirk of strings.xml for multiple regions per language in Android'
date: '2021-09-16T22:26:34+01:00'
author: 'Jake Lee'
layout: post
permalink: /a-quirk-of-strings-xml-for-multiple-regions-per-language-in-android/
image: /wp-content/uploads/2021/09/h8FxRJu.png
categories:
    - 'Android Dev'
tags:
    - Android
    - Locale
    - Localisation
    - Strings
---

Recently a colleague and I worked on an issue where a displayed URL was intended for another region entirely, but all the strings were seemingly in the correct XMLs. This was… very odd, yet the eventual solution does make sense!

Here’s the full scenario, see if you can spot the problem: ([screenshot](/wp-content/uploads/2021/09/Screenshot_1631826229.png))

1. The app exists in a single market, e.g. the UK, which has all URLs etc in `values/strings.xml`. They display fine.
2. The app expands into a non-English market, e.g. France, and has all new strings in `/values-fr/strings.xml`. They display fine.
3. The app expands into another English market, e.g. Ireland, and has a few new strings in `/values-en-rIE/strings.xml`. They display fine.
4. Uh oh, the app’s URLs in the original market, the UK, have been replaced by Irish strings (see screenshot)!

Our first clue was the issue didn’t occur on our emulators (set to default `en-US`), but did apply on our physical devices. Our next clue was strings in `/values-en-rGB/strings.xml` that duplicated `/values/strings.xml`.

The problem was the physical device’s locale being `en-rGB`. When Android tried to find the most relevant strings, it found `en-rIE`. This was the correct language, so it used those! This highlighted a faulty assumption: That a strings file for a specific region will only be used for that region. Instead, if Android cannot find a better match, a region’s strings it will be used for **any region in that language**.

The solution was that second clue from earlier: If defining region-specific strings, make sure they are all defined for all regions, or there is one for the language itself!

Below is a screenshot of the final setup, there’s also a [proof of concept repository](https://github.com/JakeSteam/LocalisationQuirkPoC):

[![](/wp-content/uploads/2021/09/lgOb80d.png)](/wp-content/uploads/2021/09/lgOb80d.png)

### Further reading / resources:

- “[Language and locale resolution overview](https://developer.android.com/guide/topics/resources/multilingual-support)” on Android Developers
- “[How Android finds the best-matching resource](https://developer.android.com/guide/topics/resources/providing-resources#BestMatch)” on Android Developers