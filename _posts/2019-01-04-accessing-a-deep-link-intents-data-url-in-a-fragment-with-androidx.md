---
id: 2315
title: 'Accessing a deep link intent&#8217;s data / URL in a fragment with AndroidX'
date: '2019-01-04T18:00:51+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2315'
permalink: /accessing-a-deep-link-intents-data-url-in-a-fragment-with-androidx/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6487015582263844864";s:5:"pDate";s:19:"2019-01-04 18:03:57";}}";'
snapMD:
    - "s:441:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"8844a9d8a545\";s:7:\"postURL\";s:109:\"https://medium.com/@JakeSteam/accessing-a-deep-link-intents-data-url-in-a-fragment-with-androidx-8844a9d8a545\";s:5:\"pDate\";s:19:\"2019-01-04 18:03:58\";}}\";"
snap_isAutoPosted:
    - '1546625038'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1081249898790559749";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1081249898790559749";s:5:"pDate";s:19:"2019-01-04 18:03:59";}}";'
categories:
    - 'Android Dev'
tags:
    - androidx
    - Kotlin
---

Usually, accessing the data associated with a deep link intent in an Activity is just a case of calling `intent.data`. Easy!

However when this intent is forwarded to a fragment (using the [AndroidX navigation](https://developer.android.com/topic/libraries/architecture/navigation/navigation-implementing) code below), the intent suddenly becomes much harder to deal with. In the fragment there is no `onNewIntent`, or even any intent at all. This tutorial will cover how to retrieve the intent’s data, including deep link URL.

```
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    my_nav_host_fragment.findNavController().onHandleDeepLink(intent)
}
```

When the intent was forwarded to the fragment, it was significantly changed. It has now been packaged into `arguments`, which contains an ArrayMap called `mMap`, as well as a few other properties.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/1mahzi3.png?resize=540%2C324&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/1mahzi3.png?ssl=1)

If you want to access this ArrayMap (for example to access the URL in the deep link), you can just call `arguments?.get(yourKey)`. However, what if you don’t know the key, since there’s no obvious way of looking it up?

In that case you need to call `arguments?.keySet()`, to receive an array of the **keys** the main ArrayMap uses. For example, my intent only had the deep link intent as a key:

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/2.png?resize=426%2C238&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/2.png?ssl=1)

Now that you’ve got your key, you can call `arguments?.get(yourKey) as Intent`, to get your original intent back! This intent can then be queried as usual, such as `.data.encodedPath` to get the URL’s path.

Here’s a useful function that can be called in a fragment to determine if the current arguments are from a deep link for your target path:

```
fun isTargetPath(): Boolean {
    val deepLinkKey = arguments?.keySet()?.firstOrNull() ?: ""
    if (deepLinkKey.isNotEmpty() && arguments?.get(deepLinkKey) is Intent) {
        val targetPath = "/mytargetpath"
        return (arguments?.get(deepLinkKey) as Intent).data.encodedPath == targetPath
    }
    return false
}
```

This should go in your onViewCreated, to avoid it being called repeatedly if the use pauses / resumes your fragment.