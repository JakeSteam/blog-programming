---
id: 597
title: 'Converting Display Pixels (dp) To Real Pixels'
date: '2017-01-24T01:55:09+00:00'
permalink: /android-converting-display-pixels-dp-to-real-pixels/
image: /wp-content/uploads/2017/01/g1renjc.png
categories:
    - 'Android Dev'
tags:
    - 'Display Pixels'
    - DisplayMetrics
    - dp
    - Java
---

Occasionally whilst developing a UI in Android, padding will have to be set programmatically, this usually happens when padding varies according to the number of items on screen. These values must be set in pixels, but the size of a pixel will vary massively, according to the density of the screen (for example, 2 1920px by 1080px and 192px by 108px screens may be the same physical size, but the former will have 10 times more pixels in any given centimetre). As such, display pixels (essentially a unit that aims to avoid this issue) must be used, however these values need converting into real pixels.

## The Solution

First the density of the screen must be calculated, using the `densityDpi` in `DisplayMetrics`. Once we have that, we can work out how many real pixels one display pixel equals. To do this, the device's DPI is divided by the default density that all other densities are worked out from (160).

```
public int convertDpToPixel(float dp) {
    DisplayMetrics metrics = context.getResources().getDisplayMetrics();
    float px = dp * (metrics.densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    return (int) px;
}
```

Once we have the number of pixels for a single display pixel, it is multiplied by the number of display pixels that need converting, and the real pixel value is now known. This can then be assigned as padding.

```
int yPadding = convertDpToPixel(4);
int xPadding = convertDpToPixel(6.5f);
visitorImage.setPadding(xPadding, yPadding, xPadding, yPadding);
```

## The Conclusion

This is an excellent example of the occasional simple task that comes up during Android development with a somewhat counterintuitive solution. This utility method has been in most of my Android projects in some place or another, and has been extremely useful. Note that a contextless version is available by replacing line 564 with:

```
DisplayMetrics metrics = Resources.getSystem().getDisplayMetrics();
```

Further reading is available in the [same question as the original code](http://stackoverflow.com/questions/4605527/converting-pixels-to-dp).

*Note: Header image via [StackOverflow](http://stackoverflow.com/a/2025541/608312).*