---
id: 2896
title: 'Programmatically creating and scheduling animations for Android drawable layers with ObjectAnimator'
date: '2020-10-05T17:00:06+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2896'
permalink: /programmatically-creating-and-scheduling-animations-for-android-drawable-layers-with-objectanimator/
enclosure:
    - "https://blog.jakelee.co.uk/wp-content/uploads/2020/10/ezgif.com-gif-maker.webm\n335846\nvideo/webm\n"
image: /wp-content/uploads/2020/10/818vMSe.png
categories:
    - 'Android Dev'
tags:
    - animations
    - drawables
    - objectanimator
    - xml
---

Recently I needed to perform a pretty complex animation on an image button. The button needed to move, whilst different parts of it also needed to rotate, fade in and out, and disappear!

To implement this I combined the animating parts into a single layer list, where they could then be animated without requiring new views. The end result was very smooth, with a very small amount of code written.

In this post we’ll perform similar effects on a layer list drawable without any XML animations:

<div class="wp-video" style="width: 640px;"><video class="wp-video-shortcode" controls="controls" height="384" id="video-2896-1" preload="metadata" width="640"><source src="https://blog.jakelee.co.uk/wp-content/uploads/2020/10/ezgif.com-gif-maker.webm?_=1" type="video/webm"></source><https://blog.jakelee.co.uk/wp-content/uploads/2020/10/ezgif.com-gif-maker.webm></video></div>This post is available as a [proof of concept repository](https://github.com/JakeSteam/animating-layerlists), and as [a GitHub gist](https://gist.github.com/JakeSteam/c610598867b80fde6fedfc74ce282dd0).

## Preparing the drawable

The drawable needs to be a `layer-list`, with each animation layer having a unique ID. Any sort of `item` should work, this example will use a shape and a vector drawable.

Since the icon needs to rotate, it needs to be inside a `<rotate>` tag:

```
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@+id/red_circle">
        <shape android:shape="oval" >
            <solid android:color="@android:color/holo_red_dark" />
        </shape>
    </item>
    <item android:id="@+id/icon">
        <rotate android:drawable="@drawable/ic_launcher_foreground" />
    </item>
</layer-list>
```

## Selecting layers to animate

To select a layer of the `ImageView` for animation, we first extract the `LayerDrawable`, then find the layer we want by ID:

```
val target = findViewById<ImageView>(R.id.imageview)
val animationLayers = target.drawable as LayerDrawable    
val redCircle = animationLayers.findDrawableByLayerId(R.id.red_circle) as GradientDrawable
```

The type of `Drawable` required varies depending on how the layer-list is defined. For this example, we only need `GradientDrawable` for our simple shape, and `RotateDrawable` for the icon we want to rotate.

There are 40 subclasses of `Drawable`, but these 2 will do for now!

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/10/eVGhPpe.png?resize=700%2C205&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/10/eVGhPpe.png?ssl=1)

Looking at these `.class` files will tell you what animations are supported. For example, `RotateDrawable` has `onLevelChange` for rotation, but `GradientDrawable` has `setAlpha` for changing transparency.

## Preparing animations

All of our animation is going to happen inside a `startAnimation(target: ImageView)` function, and use `ObjectAnimator`. Since we’re going to be animating both `ImageView`s and layer list layers, an important note is needed:

- If an `ImageView` is being used, a **float** value of the target will be used. For example, the alpha is between 1.0f (fully visible) and 0.0f (fully invisible).
- If a `Drawable` is being used (e.g. `GradientDrawable` / `RotateDrawable`), an **int** value of the target will be used. For example, the alpha is instead between 255 (fully visible) and 0 (fully invisible).

`ObjectAnimator` provides a simple syntax for creating animations. If we want the red circle layer to fade from fully visible to invisible in 1000ms, we just need:

```
val redCircleFadeOut = ObjectAnimator.ofInt(redCircle, "alpha", 255, 0).setDuration(1000)
```

Simple!

We need 6 animations in total to move our `ImageView` left, partially fade out our red circle, rotate our icon left, and then reverse all 3. Note that rotation uses 0-10000, whilst alpha uses 0-255:

```
val moveImageViewLeft = ObjectAnimator.ofFloat(target, View.TRANSLATION_X, -200f).setDuration(6000)
val moveImageViewRight = ObjectAnimator.ofFloat(target, View.TRANSLATION_X, 0f).setDuration(6000)
val redCircleFadeOut = ObjectAnimator.ofInt(redCircle, "alpha", 255, 100).setDuration(1000)
val redCircleFadeIn = ObjectAnimator.ofInt(redCircle, "alpha", 100, 255).setDuration(100)
val iconRotateLeft = ObjectAnimator.ofInt(icon, "level", 10000, 1000).setDuration(3000)
val iconRotateRight = ObjectAnimator.ofInt(icon, "level", 1000, 10000).setDuration(300)
```

## Scheduling animations

Using `AnimatorSet`‘s very simple `play(x).with(y).after(z)` syntax, complex scheduling becomes very readable.

In our animation, we want to:

1. Move our `ImageView` left, fade out our red circle, rotate our icon left.
2. After the icon has finished rotating, rotate it back again and fade the circle back in.
3. After the `ImageView` has finished moving, move it back.

Using `AnimatorSet` this can be written as:

```
AnimatorSet().apply {
  play(moveImageViewLeft)
    .with(redCircleFadeOut)
    .with(iconRotateLeft)
  play(redCircleFadeIn)
    .with(iconRotateRight)
    .after(iconRotateLeft)
  play(moveImageViewRight)
    .after(moveImageViewLeft)
  start()
}
```

## Handling multiple animations

In the real world, when performing an animation it may be triggered again. When this situation is not handled, all sorts of odd visual effects happen and look awful!

### Avoiding overlapping animations

A simple way to avoid overlapping animations is keeping track of the `AnimatorSet` and cancelling it when a new animation is started:

```
private var animatorSet: AnimatorSet? = null
private fun startAnimation(target: ImageView) {
  animatorSet?.cancel()
  animatorSet = AnimatorSet().apply {
    ...
    start()
  }
}
```

### Resetting view positions

Whilst most of the layer effects automatically reset when cancelled, the view’s movement is not. As such, we need to create a “reset” function:

```
val animationReset = { target.translationX = 0f }
```

This should be triggered when the animation is cancelled (due to a new animation starting), so `doOnCancel()` should be used. If your animation does not leave views in the same place as they started, `doOnEnd()` should also be used:

```
AnimatorSet().apply {
    ...
    doOnCancel { animationReset.invoke() }
    start()
  }
}
```

## Resources

- A [proof of concept repository](https://github.com/JakeSteam/animating-layerlists) is available
- A [GitHub gist](https://gist.github.com/JakeSteam/c610598867b80fde6fedfc74ce282dd0) is available
- [ObjectAnimator on developer docs](https://developer.android.com/reference/android/animation/ObjectAnimator)
- [AnimationSet on developer docs](https://developer.android.com/reference/android/view/animation/AnimationSet)