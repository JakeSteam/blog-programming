---
id: 1772
title: 'Reducing The Size Of TextView DrawableStart / DrawableEnds Using Styles'
date: '2018-10-17T18:14:10+01:00'
permalink: /reducing-the-size-of-textview-drawablestart-drawableends-using-styles/
image: /wp-content/uploads/2018/10/exba22y.png
categories:
    - 'Android Dev'
tags:
    - Drawable
    - Resize
    - Styles
    - Vector
---

Using image files or SVGs at the start / end of a `TextView` can be an easy way to add icons to menu items, or indicators that clicking the `TextView` will trigger an action. That being said, it can be tricky to position the drawable correctly, and it may not be possible to easily resize it (especially if it was created by someone else).

Luckily, there is a partial workaround.

## Implementation

Scaling the entire `TextView` smaller will decrease the size of both the text and the drawable, however the text size can then be increased to counteract this change. For example, a text size of 16 is equal to a text size of 20, when scaled to 0.8 (80%). This is because `20 = 16 / 0.8`.

This super simple formula can be expressed as:

```
newTextSize = originalTextSize / scale
```

## Example

The image below shows a `TextView` with text size 16, modified using styles to have a larger and smaller `drawableEnd` than default:  
![scaled drawables](/wp-content/uploads/2018/10/exba22y.png)

This was created by extracting the scaling to 3 self explanatory styles, used to scale the `drawableEnd` to 1.6x and 0.8x original size:

```
<style name="Larger_Drawable">
    <item name="android:textSize">10sp</item>
    <item name="android:scaleX">1.6</item>
    <item name="android:scaleY">1.6</item>
</style>

<style name="Normal_Drawable">
    <item name="android:textSize">16sp</item>
</style>

<style name="Smaller_Drawable">
    <item name="android:textSize">20sp</item>
    <item name="android:scaleX">0.8</item>
    <item name="android:scaleY">0.8</item>
</style>
```

In case it helps, the exact layout xml used is similarly self explanatory:

```
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Large"
    android:layout_margin="10dp"
    android:drawableEnd="@drawable/ic_smiley"
    style="@style/Larger_Drawable"/>

<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Normal"
    android:layout_margin="10dp"
    android:drawableEnd="@drawable/ic_smiley"
    style="@style/Normal_Drawable"/>

<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Small"
    android:layout_margin="10dp"
    android:drawableEnd="@drawable/ic_smiley"
    style="@style/Smaller_Drawable"/>
```

## Conclusion

While this workaround does work, it definitely isn't ideal! If at all possible, the original drawable should be resized to fit in the target area. That being said, the example above is relatively clean, allowing a style to resize the drawable instead of multiple modifiers.