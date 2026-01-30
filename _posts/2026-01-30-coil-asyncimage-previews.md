---
title: Adding accurate AsyncImage previews in Coil 3 with a Compose wrapper
image: /assets/images/banners/asyncimage-header.png
tags:
  - Android
  - Coil
  - Jetpack Compose
---

I recently migrated from Coil 2 to Coil 3, allowing remote image fetching to be overridden for better previews! Here's a simple wrapper implementation.

If you've built a UI with Coil and AsyncImage, you're probably used to large blank areas in your previews. This doesn't matter much if you have placeholders set, but this isn't always the case. Luckily, `LocalAsyncImagePreviewHandler` allows arbitrary drawables to be used in previews.

## Kotlin code

First, here's the entire utility function, in `PreviewAsyncImage.kt`:

```kotlin
@OptIn(ExperimentalCoilApi::class)
@Composable
fun PreviewAsyncImage(
    drawableResId: Int,
    content: @Composable () -> Unit
) {
    if (!LocalInspectionMode.current) {
        error("PreviewAsyncImage should only be used in @Preview functions")
    }

    val context = LocalContext.current
    val previewHandler = remember(drawableResId) {
        AsyncImagePreviewHandler {
            val drawable = ContextCompat.getDrawable(context, drawableResId)
            val bitmap = if (drawable is BitmapDrawable) {
                drawable.bitmap
            } else {
                // Convert vector/other drawables to bitmap
                val width = drawable?.intrinsicWidth?.takeIf { it > 0 } ?: 1
                val height = drawable?.intrinsicHeight?.takeIf { it > 0 } ?: 1
                val bitmap = createBitmap(width, height)
                val canvas = android.graphics.Canvas(bitmap)
                drawable?.setBounds(0, 0, canvas.width, canvas.height)
                drawable?.draw(canvas)
                bitmap
            }
            bitmap.asImage()
        }
    }

    CompositionLocalProvider(LocalAsyncImagePreviewHandler provides previewHandler) {
        content()
    }
}
```

And here's how to use it as a wrapper, where every `AsyncImage` will display `preview_image`:

```kotlin
@Preview
@Composable
fun ComposableWithAsyncImagePreview() {
    PreviewAsyncImage(R.drawable.preview_image) {
        ComposableWithAsyncImage()
    }
}
```

## Explanation

Coil does all the hard work for us in terms of overriding the preview, however we still need to actually obtain a bitmap. Since the drawable reference could be a bitmap (e.g. a `.png`) or vector (e.g. a `.xml`), we may need to place the drawable onto a canvas first.

We also have a guard at the start to ensure this is never run outside a `@Preview` context, since it's conceivable a preview function's contents could be copied without noticing the override.

The simple wrapper makes implementation easy across an entire codebase, helping improve preview accuracy and avoid accidental UI issues. Whilst it is also possible to directly map remote image calls to specific resources, that was not necessary for my use case.

Finally, here's the wrapper in action, as per the PR implementing it!

[![](/assets/images/2026/asyncimage-preview.png)](/assets/images/2026/asyncimage-preview.png)
