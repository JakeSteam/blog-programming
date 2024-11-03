---
id: 2357
title: 'Using StickyLayoutManager to give your RecyclerView sticky headers'
date: '2019-01-30T18:00:15+00:00'
permalink: /using-stickylayoutmanager-to-give-your-recyclerview-sticky-headers/
image: /wp-content/uploads/2019/01/fAcq0T0.png
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

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Next, add the Sticky Layout Manager library to your app-level `build.gradle`:

```groovy
dependencies {
    implementation 'com.github.qiujayen:sticky-layoutmanager:1.0.1'
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

[![](/wp-content/uploads/2019/01/Screenshot_20190128-232345.png)](/wp-content/uploads/2019/01/Screenshot_20190128-232345.png)