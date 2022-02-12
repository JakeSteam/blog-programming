---
id: 1689
title: 'Recolouring / modifying multi-layer drawables dynamically in Android'
date: '2018-09-14T10:00:32+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk//?p=1689'
permalink: /recolouring-modifying-multi-layer-drawables-dynamically-in-android/
timeline_notification:
    - '1536920881'
image: /wp-content/uploads/2018/09/dfe6ohk.png
categories:
    - 'Android Dev'
tags:
    - Drawable
    - Kotlin
    - LayerList
    - UI
    - Vector
---

Often when creating interfaces in Android, it can be more efficient to have a single `.xml` drawable and recolouring it according to requirements, instead of trying to include all possible colours in advance. Similarly, it can be more efficient to replace the drawable used inside another drawable dynamically. However, if this needs to be done multiple times within one drawable it becomes a bit more complex, as any modifications will affect the entire drawable.

This post is also [available as a Gist](https://gist.github.com/JakeSteam/1113e35ab13d4998f94d2d4a14c720f8).

### Creating the drawable XML

For this example, a simple drawable with a coloured circle background (ID `background_circle`) and a vector image (ID `foreground_icon`) will be used. The following `.xml` should be placed at `/res/drawable/dynamic_drawable.xml`:

```

<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/background_circle">
        <shape android:shape="oval">
            <solid android:color="@color/orange" />
        </shape>
    </item>
    <item android:id="@+id/foreground_icon">
        <shape>
            <solid android:color="@android:color/transparent" />
        </shape>
    </item>
</layer-list>
```

### Recolouring part of the drawable

The first half of the changes to be made are changing the background colour of our drawable.

First, get a reference to your target ImageView (either in a layout or inflated dynamically), and retrieve its drawable as a LayerDrawable (as we need to handle layers):

```

val layerDrawable = findViewById(R.id.my_drawable).drawable as LayerDrawable
```

Next, get the background layer specifically using the `background_circle` ID from earlier:

```

val backgroundDrawable = layerDrawable.findDrawableByLayerId(R.id.background_circle) as GradientDrawable
```

The colour can now be set using the normal `setColor()` method:

```

backgroundDrawable.setColor(ContextCompat.getColor(context, R.color.my_colour))
```

### Changing part of the drawable

The second half of the changes is changing the foreground drawable.

Using the `layerDrawable` from earlier, set the `foreground_icon` to an existing drawable resource:

```

layerDrawable.setDrawableByLayerId(R.id.foreground_icon, ContextCompat.getDrawable(context, R.drawable.new_foreground_icon))
```

That’s it! Both the composite drawable and background color have been changed, and this technique can be used for as many layers as required.

### Conclusion

The ability to create complex dynamic drawables using layer-lists is extremely beneficial when attempting to minimise app size, as it means large areas of an app can use the same base layout, and just customise the small parts that are different.

For example, in the real world example this post is based on, a total of 5 foreground icons and 7 background colours were possible, meaning a total of 35 different icons were required. Using drawable layer modification, this could all be done within a few lines of code, instead of tens of resources! Much more advanced layer modifications are also possible, to create more complex differences.

All code used in this post is [available as a Gist](https://gist.github.com/JakeSteam/1113e35ab13d4998f94d2d4a14c720f8).