---
id: 2488
title: How to disable your app's preview image in Android's task / app switcher
date: '2019-05-13T15:00:42+01:00'
permalink: /how-to-disable-your-apps-preview-image-in-androids-task-app-switcher/
image: /wp-content/uploads/2019/05/0TMKpKg.png
categories:
    - 'Android Dev'
tags:
    - Preview
    - TaskSwitcher
---

The easiest way to disable your app's preview when your app is shown in task switcher is `FLAG_SECURE`.

When this is enabled, your app won't display any previews, and instead shows a blank screen for most devices.

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