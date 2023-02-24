---
id: 2315
title: Accessing a deep link intent's data / URL in a fragment with AndroidX
date: '2019-01-04T18:00:51+00:00'
author: 'Jake Lee'
layout: post
permalink: /accessing-a-deep-link-intents-data-url-in-a-fragment-with-androidx/
image: /wp-content/uploads/2019/01/1mahzi3.png
categories:
    - 'Android Dev'
tags:
    - Androidx
    - Kotlin
    - 'Deep Link'
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

[![](/wp-content/uploads/2019/01/1mahzi3.png)](/wp-content/uploads/2019/01/1mahzi3.png)

If you want to access this ArrayMap (for example to access the URL in the deep link), you can just call `arguments?.get(yourKey)`. However, what if you don’t know the key, since there’s no obvious way of looking it up?

In that case you need to call `arguments?.keySet()`, to receive an array of the **keys** the main ArrayMap uses. For example, my intent only had the deep link intent as a key:

[![](/wp-content/uploads/2019/01/2.png)](/wp-content/uploads/2019/01/2.png)

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