---
id: 2349
title: 'Adding a variable to both the Android Manifest and Build Config'
date: '2019-01-22T17:00:51+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2349'
permalink: /adding-a-variable-to-both-the-android-manifest-and-build-config/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6493522707072851968";s:5:"pDate";s:19:"2019-01-22 17:00:57";}}";'
snapMD:
    - "s:438:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"df40354966af\";s:7:\"postURL\";s:106:\"https://medium.com/@JakeSteam/adding-a-variable-to-both-the-android-manifest-and-build-config-df40354966af\";s:5:\"pDate\";s:19:\"2019-01-22 17:00:58\";}}\";"
snap_isAutoPosted:
    - '1548176458'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1087757024627183616";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1087757024627183616";s:5:"pDate";s:19:"2019-01-22 17:00:59";}}";'
image: /wp-content/uploads/2019/01/hSQQnfU-150x150.png
categories:
    - 'Android Dev'
tags:
    - BuildConfig
    - Gradle
    - Manifest
---

Whilst it is possible to set a variable in your `AndroidManifest.xml` using `manifestPlaceholders` and setting the value in your `build.gradle`, it can often be useful to access these values in your code too. For example, I recently used this post’s technique to define a deep link path (defined in the manifest) and check the url’s path at runtime (checked in the code).

Defining these variables twice is likely to cause future discrepancies, a much more reliable approach is to set them in the manifest and the code at the same time. Luckily, your build config can store custom values just as well as your manifest!

## Adding a new variable

The main idea behind this approach is creating a function in `build.gradle` to perform two tasks at once for us at the same time. This `addConstantTo` function should go inside your `defaultConfig { }`, and takes 2 parameters; the variable name and variable values:

```
<pre class="default prettyprint prettyprinted">```
<span class="pln">android </span><span class="pun">{</span><span class="pln">
    defaultConfig </span><span class="pun">{</span>
        <span class="kwd">def</span><span class="pln"> addConstant </span><span class="pun">=</span> <span class="pun">{</span><span class="pln">constantName</span><span class="pun">,</span><span class="pln"> constantValue </span><span class="pun">-></span><span class="pln">
            manifestPlaceholders </span><span class="pun">+=</span> <span class="pun">[</span> <span class="pun">(</span><span class="pln">constantName</span><span class="pun">):</span><span class="pln">constantValue</span><span class="pun">]</span><span class="pln">
            buildConfigField </span><span class="str">"String"</span><span class="pun">,</span> <span class="str">"${constantName}"</span><span class="pun">,</span> <span class="str">"\"${constantValue}\""</span>
        <span class="pun">}</span><span class="pln">
        addConstant<span class="pun">(</span><span class="str">"DEEPLINK_HOST"</span><span class="pun">,</span> <span class="str">"https://blog.jakelee.co.uk"</span><span class="pun">)</span>
        addConstant</span><span class="pun">(</span><span class="str">"DEEPLINK_PATH"</span><span class="pun">,</span> <span class="str">"/deeplink/myprofile"</span><span class="pun">)</span>
    <span class="pun">}</span>
```
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

This approach unfortunately won’t work by default if you utilise flavors or build types in your app. For this you need to add a `target` parameter to your function, inside `buildTypes { }` or `productFlavors { }`:

```
def addConstantTo = {target, constantName, constantValue ->
    target.manifestPlaceholders += [ (constantName):constantValue]
    target.buildConfigField "String", "${constantName}", "\"${constantValue}\""
}
```

This new `target` parameter should always be set to `owner`, the behaviour of other two parameters is unchanged. For example, here’s a usage within product flavors:

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

Hopefully this makes it a bit easier to use flavor / build type specific variables in your apps. A common use is safely setting debug and release remote server URLs. Since the function just performs the same two actions as setting them manually, it’s unlikely to cause any side effects. Note that if you want to store anything besides a `String` inside your `BuildConfig` using this you’ll need to further modify the function.

Many thanks to [TmTron on StackOverflow for this solution](https://stackoverflow.com/a/40592469/608312), it’s definitely an underappreciated and elegant solution!