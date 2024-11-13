---
id: 1686
title: 'Using multi-weighted custom fonts on Android'
date: '2018-09-10T18:33:37+01:00'
permalink: /using-multi-weighted-custom-fonts-on-android/
image: /wp-content/uploads/2018/09/dribbpj.png
categories:
    - 'Android Dev'
tags:
    - Fonts
    - Styles
---

Many apps can use the default Android font, Roboto. However, often clients will have a branded font that must be used that is not included in Android. Luckily, [XML fonts](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml) (API 16+) solve this issue very neatly. However, these fonts can only be bold, or not bold, yet many fonts have semibold / semilight variants that need to be supported.

### Prerequisites

For this example, the following 4 weights (and 4 italic versions) of [The Sans C4s](https://www.lucasfonts.com/fonts/thesans/thesans/overview/) will be used, but of course any custom font can be used:

1. Semilight (+italic)
2. Regular (+italic)
3. Semibold (+italic)
4. Bold (+italic)

`.otf` versions of each variant were placed in `app/src/main/res/font`, the same place the XML descriptors will be placed.

### Font XMLs

The core idea is to have two XML fonts defined; one for "semi" weights (semilight and semibold), and one for "regular" weights (regular and bold).

The first file, `the_sans_c4s.xml` is for "regular" weights:

```
<font-family
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <font
        app:fontStyle="normal"
        app:fontWeight="400"
        app:font="@font/the_sans_c4s_regular"/>

    <font
        app:fontStyle="italic"
        app:fontWeight="400"
        app:font="@font/the_sans_c4s_regular_italic"/>

    <font
        app:fontStyle="normal"
        app:fontWeight="700"
        app:font="@font/the_sans_c4s_bold"/>

    <font
        app:fontStyle="italic"
        app:fontWeight="700"
        app:font="@font/the_sans_c4s_bold_italic"/>
</font-family>
```

The second, `the_sans_c4s_semi.xml` is for "semi" weights:

```
<font-family
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <font
        app:fontStyle="normal"
        app:fontWeight="400"
        app:font="@font/the_sans_c4s_semilight"/>

    <font
        app:fontStyle="italic"
        app:fontWeight="400"
        app:font="@font/the_sans_c4s_semilight_italic"/>

    <font
        app:fontStyle="normal"
        app:fontWeight="700"
        app:font="@font/the_sans_c4s_semibold"/>

    <font
        app:fontStyle="italic"
        app:fontWeight="700"
        app:font="@font/the_sans_c4s_semibold_italic"/>
</font-family>
```

### Styles

Now that the basic fonts are ready to use (via `android:fontFamily`), a very convenient addition is a style for each variant. This allows easily setting a font variant on any element using `style="Font_SemiBold_Italic"`, instead of remembering the right combination of `textStyle` and `fontFamily`.

The full styleset is included below:

```
<style name="Font_Regular" tools:keep="@style/Font_Regular">
<item name="android:fontFamily">@font/the_sans_c4s</item>
</style>

<style name="Font_Regular_Italic" parent="Font_Regular" tools:keep="@style/Font_Regular_Italic">
<item name="android:textStyle">italic</item>
</style>

<style name="Font_Bold" parent="Font_Regular" tools:keep="@style/Font_Bold">
<item name="android:textStyle">bold</item>
</style>

<style name="Font_Bold_Italic" parent="Font_Regular" tools:keep="@style/Font_Bold_Italic">
<item name="android:textStyle">bold|italic</item>
</style>

<style name="Font_SemiLight">
<item name="android:fontFamily">@font/the_sans_c4s_semi</item>
</style>

<style name="Font_SemiLight_Italic" parent="Font_SemiLight" tools:keep="@style/Font_SemiLight_Italic">
<item name="android:textStyle">italic</item>
</style>

<style name="Font_SemiBold" parent="Font_SemiLight" tools:keep="@style/Font_SemiBold">
<item name="android:textStyle">bold</item>
</style>

<style name="Font_SemiBold_Italic" parent="Font_SemiLight">
<item name="android:textStyle">bold|italic</item>
</style>
```

Additionally, as these are just simple styles, any existing styles can just set them as a parent to easily customise the font used.

### Conclusion

Whilst the vast majority of this article is about implementing the [existing fonts functionality](https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml), extending this to support multiple weights can initially be daunting, since Android only supports `bold` and/or `italic`. Hopefully this brief write-up helps others with similar issues.

A [Gist of this post](https://gist.github.com/JakeSteam/d9ae8eb85e2c37da8d4648f118609418) is also available.