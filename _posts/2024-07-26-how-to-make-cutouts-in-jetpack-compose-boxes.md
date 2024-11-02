---
title: How to make cutouts or transparent sections in Jetpack Compose
author: Jake Lee
layout: post
image: /assets/images/2024/compose-cutouts-banner.png
tags:
  - Compose
  - Android
  - Graphics
last_modified_at: 2024-08-24
---

At work recently we needed to have a semi-circular "cutout" from a rectangular box containing content. This was surprisingly tricky, so here's an easy way to cut out arbitrary shapes from a Jetpack Compose `Box`!

All code in this post is available [as a GitHub repo](https://github.com/JakeSteam/ComposeCutoutsPOC/blob/main/app/src/main/java/uk/co/jakelee/composetestbed/ComposeIndents.kt).

## How does a cutout work

Stripping away all the boilerplate code, the actually useful bit is:

```
Box(modifier = Modifier
    .graphicsLayer {
        compositingStrategy = CompositingStrategy.Offscreen
    }
    .drawWithContent {
        drawContent()
        drawCircle(
            color = Color(0xFFFFFFFF),
            center = Offset(x = 0f, y = 0f),
            radius = 100f,
            blendMode = BlendMode.DstOut
        )
    }
)
```

There are 3 key parts to this:

1. `drawWithContent` lets you customise how your `Box` (or other `@Composable`) content is drawn to screen, so that a circle (or any other shape) can be drawn on top of the content.
   - The colour doesn't matter, only the shape / position does.
2. As this new shape is being drawn on top, a `blendMode` of `BlendMode.DstOut` (a Porter/Duff blend mode[^porterduff]) states that the new shape should be subtracted from the original content[^dstout].
3. Setting the `compositingStrategy` to `Offscreen` forces the content & any shapes to be drawn to a buffer then placed on screen at once[^compositing]. This is required to allow the `blendMode` to function.
   - Available since 1.4.0, previous versions can use `alpha = 0.99f` instead to force the behaviour.

That's it! Draw the content, then draw a shape to cut away from the content.

[^porterduff]: <https://ssp.impulsetrain.com/porterduff.html>
[^dstout]: <https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/BlendMode#DstOut()>
[^compositing]: <https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/CompositingStrategy#Offscreen()>

## Examples

[![](/assets/images/2024/compose-cutouts-all.png)](/assets/images/2024/compose-cutouts-all.png)

_Note: My [background photo](https://github.com/JakeSteam/ComposeCutoutsPOC/blob/main/app/src/main/res/drawable/sample.jpg) is a photo I took in Uetliberg, Zurich, Switzerland, [in December 2023](https://jakelee.co.uk/zurich-reviews/#uetliberg-lookout-tower-)._

Whilst [the repo itself](https://github.com/JakeSteam/ComposeCutoutsPOC/blob/main/app/src/main/java/uk/co/jakelee/composetestbed/ComposeIndents.kt) provides all of these examples in one large preview, standalone examples may be helpful.

Obviously the colours, shapes, background and contents are completely up to you, these are just simple samples!

<table>
  <tr>
    <th>Code</th>
    <th>Output</th>
  </tr>
  <tr>
    <td markdown="1">
```
@Composable
fun TopLeftCircle() {
    Box(modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            compositingStrategy = CompositingStrategy.Offscreen
        }
        .drawWithContent {
            drawContent()
            drawCircle(
                color = Color(0xFFFFFFFF),
                center = Offset(x = 0f, y = 0f),
                radius = 100f,
                blendMode = BlendMode.DstOut
            )
        }
        .background(color = Color(0xFFFFFFFF))
    ) {
        Text("There is text and other content here!")
    }
}
```
</td>
    <td>
      <a href="/assets/images/2024/compose-cutouts-topleft.png"><img src="/assets/images/2024/compose-cutouts-topleft.png" alt="Top left circle cutout"></a>
    </td>
  </tr>
  <tr>
    <td markdown="1">
```
@Composable
fun MiddleLeftCircle() {
    Box(modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            compositingStrategy = CompositingStrategy.Offscreen
        }
        .drawWithContent {
            drawContent()
            drawCircle(
                color = Color(0xFFFFFFFF),
                center = Offset(x = 0f, y = size.height / 2),
                radius = 50f,
                blendMode = BlendMode.DstOut
            )
        }
        .background(color = Color(0xFFFFFFFF))
    ) {
        Text("There is text and other content here!")
    }
}
```
</td>
    <td>
      <a href="/assets/images/2024/compose-cutouts-middleleft.png"><img src="/assets/images/2024/compose-cutouts-middleleft.png" alt="Middle left circle cutout"></a>
    </td>
  </tr>

  <tr>
    <td markdown="1">
```
@Composable
fun MultipleCircles() {
    Box(modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            compositingStrategy = CompositingStrategy.Offscreen
        }
        .drawWithContent {
            drawContent()
            drawCircle(
                color = Color(0xFFFFFFFF),
                center = Offset(x = 50f, y = 30f),
                radius = 70f,
                blendMode = BlendMode.DstOut
            )
            drawCircle(
                color = Color(0xFFFFFFFF),
                center = Offset(x = size.width, y = size.height),
                radius = 70f,
                blendMode = BlendMode.DstOut
            )
            drawCircle(
                color = Color(0xFFFFFFFF),
                center = Offset(x = size.width / 2, y = size.height / 2),
                radius = 45f,
                blendMode = BlendMode.DstOut
            )
        }
        .background(color = Color(0xFFFFFFFF))
    ) {
        Text("There is text and other content here!")
    }
}
```
</td>
    <td>
      <a href="/assets/images/2024/compose-cutouts-multiple.png"><img src="/assets/images/2024/compose-cutouts-multiple.png" alt="Multiple circles as cutouts"></a>
    </td>
  </tr>

  <tr>
    <td markdown="1">
```
@Composable
fun ArbitraryShapes() {
    Box(modifier = Modifier
        .size(100.dp)
        .graphicsLayer {
            compositingStrategy = CompositingStrategy.Offscreen
        }
        .drawWithContent {
            drawContent()
            drawArc(
                color = Color(0xFFFFFFFF),
                startAngle = 0f,
                sweepAngle = 300f,
                useCenter = true,
                topLeft = Offset(x = 30f, y = 30f),
                size = size / 3f,
                blendMode = BlendMode.DstOut
            )
            drawLine(
                color = Color(0xFFFFFFFF),
                start = Offset(x = 0f, y = 0f),
                end = Offset(x = size.width, y = size.height),
                strokeWidth = 30f,
                blendMode = BlendMode.DstOut
            )
            drawPoints(
                points = listOf(Offset(size.width, 0f), Offset(150f, 30f), Offset(170f, 100f)),
                pointMode = androidx.compose.ui.graphics.PointMode.Points,
                color = Color(0xFFFFFFFF),
                strokeWidth = 30f,
                cap = androidx.compose.ui.graphics.StrokeCap.Butt,
                blendMode = BlendMode.DstOut
            )
        }
        .background(color = Color(0xFFFFFFFF))
    ) {
        Text("There is text and other content here!")
    }
}
```
</td>
    <td>
      <a href="/assets/images/2024/compose-cutouts-arbitrary.png"><img src="/assets/images/2024/compose-cutouts-arbitrary.png" alt="Arbitrary shapes as cutouts"></a>
    </td>
  </tr>
  
</table>

## References
