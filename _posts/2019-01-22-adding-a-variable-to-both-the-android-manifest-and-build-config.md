---
id: 2349
title: 'Adding a variable to both the Android Manifest and Build Config'
date: '2019-01-22T17:00:51+00:00'
permalink: /adding-a-variable-to-both-the-android-manifest-and-build-config/
image: /wp-content/uploads/2019/01/hSQQnfU.png
categories:
    - 'Android Dev'
tags:
    - BuildConfig
    - Gradle
    - Manifest
---

Whilst it is possible to set a variable in your `AndroidManifest.xml` using `manifestPlaceholders` and setting the value in your `build.gradle`, it can often be useful to access these values in your code too. For example, I recently used this post's technique to define a deep link path (defined in the manifest) and check the url's path at runtime (checked in the code).

Defining these variables twice is likely to cause future discrepancies, a much more reliable approach is to set them in the manifest and the code at the same time. Luckily, your build config can store custom values just as well as your manifest!

## Adding a new variable

The main idea behind this approach is creating a function in `build.gradle` to perform two tasks at once for us at the same time. This `addConstantTo` function should go inside your `defaultConfig { }`, and takes 2 parameters; the variable name and variable values:

```
android {
    defaultConfig {
        def addConstant = {constantName, constantValue ->
            manifestPlaceholders += [ (constantName):constantValue]
            buildConfigField <span class="str">"String", <span class="str">"${constantName}", <span class="str">"\"${constantValue}\""
        }
        addConstant(<span class="str">"DEEPLINK_HOST", <span class="str">"https://blog.jakelee.co.uk")
        addConstant(<span class="str">"DEEPLINK_PATH", <span class="str">"/deeplink/myprofile")
    }
```

This can then be accessed in your manifest with `${NAME}`:

```
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:host="${DEEPLINK_HOST}"
        android:pathPrefix="${DEEPLINK_PATH}"
        android:scheme="https" />
</intent-filter>
```

It can also be accessed in your runtime code at anytime (Kotlin example):

```
fun isDeeplink() = arguments.data.encodedPath == BuildConfig.DEEPLINK_PATH
```

## Adding a flavor / build type dependant variable

This approach unfortunately won't work by default if you utilise flavors or build types in your app. For this you need to add a `target` parameter to your function, inside `buildTypes { }` or `productFlavors { }`:

```
def addConstantTo = {target, constantName, constantValue ->
    target.manifestPlaceholders += [ (constantName):constantValue]
    target.buildConfigField "String", "${constantName}", "\"${constantValue}\""
}
```

This new `target` parameter should always be set to `owner`, the behaviour of other two parameters is unchanged. For example, here's a usage within product flavors:

```
productFlavors {
    def addConstantTo = {target, constantName, constantValue ->
        target.manifestPlaceholders += [ (constantName):constantValue]
        target.buildConfigField "String", "${constantName}", "\"${constantValue}\""
    }
    flavorone{
        addConstantTo(owner, "DEEPLINK_HOST", "one.example.com")
    }
    flavortwo{
        addConstantTo(owner, "DEEPLINK_HOST", "two.example.com")
    }
```

Hopefully this makes it a bit easier to use flavor / build type specific variables in your apps. A common use is safely setting debug and release remote server URLs. Since the function just performs the same two actions as setting them manually, it's unlikely to cause any side effects. Note that if you want to store anything besides a `String` inside your `BuildConfig` using this you'll need to further modify the function.

Many thanks to [TmTron on StackOverflow for this solution](https://stackoverflow.com/a/40592469/608312), it's definitely an underappreciated and elegant solution!