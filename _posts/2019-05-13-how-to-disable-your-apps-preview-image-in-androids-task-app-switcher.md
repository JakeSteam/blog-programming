---
id: 2488
title: 'How to disable your app&#8217;s preview image in Android&#8217;s task / app switcher'
date: '2019-05-13T15:00:42+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2488'
permalink: /how-to-disable-your-apps-preview-image-in-androids-task-app-switcher/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6533703276981026816";s:5:"pDate";s:19:"2019-05-13 14:04:11";}}";'
snap_isAutoPosted:
    - '1557756251'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1127937589569257472";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1127937589569257472";s:5:"pDate";s:19:"2019-05-13 14:04:12";}}";'
image: /wp-content/uploads/2019/05/0TMKpKg-150x150.png
categories:
    - 'Android Dev'
tags:
    - Preview
    - TaskSwitcher
---

The easiest way to disable your app’s preview when your app is shown in task switcher is `FLAG_SECURE`.

When this is enabled, your app won’t display any previews, and instead shows a blank screen for most devices.

This can be done by creating a base `Activity` class that all activities extend, containing this in the `onCreate`:

```
protected void onCreate(@Nullable Bundle savedInstanceState) {
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    super.onCreate(savedInstanceState);
}
```

Alternatively, you can selectively enable it on pause / resume (although the first approach is better):

```
override fun onPause() {
    super.onPause()
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE)
}

override fun onResume() {
    super.onResume()
    getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
}
```

Originally from [my (ultimately unhelpful) StackOverflow answer](https://stackoverflow.com/a/56043235/608312).