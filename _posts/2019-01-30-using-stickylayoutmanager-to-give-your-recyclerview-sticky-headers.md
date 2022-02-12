---
id: 2357
title: 'Using StickyLayoutManager to give your RecyclerView sticky headers'
date: '2019-01-30T18:00:15+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2357'
permalink: /using-stickylayoutmanager-to-give-your-recyclerview-sticky-headers/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapMD:
    - "s:215:\"a:1:{i:0;a:6:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;}}\";"
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6496438125613715456";s:5:"pDate";s:19:"2019-01-30 18:05:47";}}";'
snap_isAutoPosted:
    - '1548871547'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1090672440869572608";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1090672440869572608";s:5:"pDate";s:19:"2019-01-30 18:05:48";}}";'
image: /wp-content/uploads/2019/01/fAcq0T0-150x150.png
categories:
    - 'Android Dev'
tags:
    - RecyclerView
    - 'Sticky Headers'
    - ViewHolder
---

Once you’ve created a RecyclerView with headers and content, it’s often useful to have the headers “sticky”. Sticky headers will display over the top of your content, and help your app’s users keep track of which section they are currently in.

This tutorial will cover adding sticky headers to your existing implementation in just a few lines using [qiujayen’s Sticky-LayoutManager library](https://github.com/qiujayen/sticky-layoutmanager). If you haven’t yet created a RecyclerView, I’ve [previously written a tutorial on creating RecyclerViews](https://blog.jakelee.co.uk/creating-a-recyclerview-with-multiple-content-types-and-layouts-in-kotlin) with multiple content types which may be useful.

## Adding StickyLayoutManager library

First, add jitpack to your project-level `build.gradle`:

```
allprojects {
	repositories {
		<span class="pl-k">..</span>.
		maven { url <span class="pl-s"><span class="pl-pds">'</span>https://jitpack.io<span class="pl-pds">'</span></span> }
	}
}
```

Next, add the Sticky Layout Manager library to your app-level `build.gradle`:

```
dependencies {
	implementation <span class="pl-s"><span class="pl-pds">'</span>com.github.qiujayen:sticky-layoutmanager:1.0.1<span class="pl-pds">'</span></span>
}
```

## Adding stickiness based on type

First, make your RecyclerView adapter (e.g. `ContentAdapter` in the [previous tutorial](https://blog.jakelee.co.uk/creating-a-recyclerview-with-multiple-content-types-and-layouts-in-kotlin)) implement `StickyHeaders`:

```
class ContentAdapter() : RecyclerView.Adapter<RecyclerView.ViewHolder>(), StickyHeaders {
```

Next, implement the required `isStickyHeader(position: Int)` function. In this case, if a row is a `HeaderRow`, it should be sticky:

```
override fun isStickyHeader(position: Int) = rows[position] is HeaderRow
```

Finally, actually set the `RecyclerView`‘s layout manager to `StickyHeadersLinearLayoutManager`, with a type of your adapter, and a context:

```
recyclerView.adapter = ContentAdapter()
recyclerView.layoutManager = StickyHeadersLinearLayoutManager<ContentAdapter>(this)
```

That’s it! This tutorial is [available as a GitHub repo](https://github.com/JakeSteam/StickyHeaders).

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/Screenshot_20190128-232345.png?resize=300%2C257&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/01/Screenshot_20190128-232345.png?ssl=1)