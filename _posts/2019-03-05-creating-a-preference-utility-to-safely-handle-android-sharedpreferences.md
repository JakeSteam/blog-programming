---
id: 2420
title: 'Creating a preference utility to safely handle Android SharedPreferences'
date: '2019-03-05T16:30:18+00:00'
permalink: /creating-a-preference-utility-to-safely-handle-android-sharedpreferences/
image: /wp-content/uploads/2019/03/A47FE5AC-6298-49CD-9B69-FB44751D1A33.png.jpg
categories:
    - 'Android Dev'
tags:
    - Kotlin
    - Settings
    - SharedPreferences
---

Saving and retrieving shared preference values in Android is relatively straightforward, but doing it safely can be problematic. For example, you may set a default value, then accidentally use a different default value when retrieving!

This post will cover creating `PreferenceHelper`, a class to safely access preferences of any type. There is also a related post covering [creating a preferences screen in your app](/using-preferencefragment-to-effortlessly-handle-user-settings/).

This entire post is [available as a Gist](https://gist.github.com/JakeSteam/0dd41b8ffeedbc8d0d21b182f9e60357), and as an [example preferences project](https://github.com/JakeSteam/PreferencesExample).

## Creating strings

For the `PreferenceHelper` class, every preference must have both a key, and a default value. These should be stored in an `xml` file so they can be referenced easily (e.g. by the UI). For example, two boolean preferences may result in the following inside `strings.xml`:

```
<string name="pref_boolean1">boolean1</string>
<bool name="pref_boolean1_default">false</bool>
<string name="pref_boolean2">boolean2</string>
<bool name="pref_boolean2_default">false</bool>
```

## Creating preference utility

The `PreferenceHelper` class needs to be constructed with a context, as preferences cannot be saved / retrieved without one. This is due to the looking up of strings which takes place, as well as context being needed for the `SharedPreferences` themselves. The class also keeps a reference to the shared preferences to be used for all actions.

For each data type (just `boolean`, `string`, and `integer` in this example), 3 things are needed:

1. An enum of all preferences of this type, defining both the preference’s key and default value.
2. A getter, which can be passed an enum to return either the saved value or the predetermined default value.
3. A setter, which can be passed an enum as well as a value, to then save that value.

For example, if an app has just 2 boolean options (called `boolean1` and `boolean2`), this will be the code for `PreferenceHelper`:

```
class PreferenceHelper(val context: Context) {
    val prefs = PreferenceManager.getDefaultSharedPreferences(context)

    enum class BooleanPref(val prefId: Int, val defaultId: Int) {
        setting1(R.string.pref_boolean1, R.bool.pref_boolean1_default),
        setting2(R.string.pref_boolean2, R.bool.pref_boolean2_default)
    }

    fun getBooleanPref(pref: BooleanPref) =
        prefs.getBoolean(context.getString(pref.prefId), context.resources.getBoolean(pref.defaultId))

    fun setBooleanPref(pref: BooleanPref, value: Boolean) =
        prefs.edit().putBoolean(context.getString(pref.prefId), value).commit()
}
```

This can of course be easily extended to cover strings and integers, as in [this article’s Gist](https://gist.github.com/JakeSteam/0dd41b8ffeedbc8d0d21b182f9e60357#file-preferenceshelper-kt).

## Using utility

All of that work ends up in a utility that is very, very simple to use, whilst never having any risk of using the wrong default value, wrong data type, etc.

A simple use case where you want to get the value of a boolean, and then change it, then repeat the process with a string, would look like:

```
val prefHelper = PreferenceHelper(this)

val myBoolean = prefHelper.getBooleanPref(PreferenceHelper.BooleanPref.setting1)
prefHelper.setBooleanPref(PreferenceHelper.BooleanPref.setting1, false)

val myString = prefHelper.getStringPref(PreferenceHelper.StringPref.setting1)
prefHelper.setStringPref(PreferenceHelper.StringPref.setting1, "abc")
```

As enums are used for the preferences, it’s impossible to pass a string reference to `getBooleanPref`, and vice versa. This means preferences can be saved and accessed with complete certainty of their datatype and default value.