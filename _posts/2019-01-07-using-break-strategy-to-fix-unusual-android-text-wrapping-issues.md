---
id: 2322
title: 'Using break strategy to fix unusual Android TableRow text wrapping issues'
date: '2019-01-07T18:00:20+00:00'
permalink: /using-break-strategy-to-fix-unusual-android-text-wrapping-issues/
image: /wp-content/uploads/2019/01/n4irBTC.png
categories:
    - 'Android Dev'
tags:
    - Styles
    - TextView
    - UI
---

An easy way of creating simple, aligned layouts in XML is using a TableLayout and TableRows. This works excellently for most situations, but unfortunately has a few quirks when it comes to handling TextView text wrapping. Recently a bug report was received where very long emails addresses weren't displayed correctly, and flowed offscreen.

This post will cover how to fix the text flowing off screen, and the subsequent wrapping issue encountered. Just for reference, this is how the TextView in a TableRow looked when populated with a long word (in this case an email address):

[![](/wp-content/uploads/2019/01/Screenshot_20190106-004708.png)](/wp-content/uploads/2019/01/Screenshot_20190106-004708.png)

A [GitHub gist of the solution](https://gist.github.com/JakeSteam/46b0bd81d50d390a3bf6ddd1db8aacde) is also available.

## Fixing text escaping row

Fixing the text flowing off-screen was a simple matter of setting `android:layout_weight="1"` on the TextView I wanted to wrap, e.g.:

```
<TableRow
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/Label_Email" />

    <TextView
        android:id="@+id/customer_email"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_weight="1" />
</TableRow>
```

The TableLayout itself should also have `android:stretchColumns="*"` (or your specific column index), otherwise this fix is less likely to work.

[![](/wp-content/uploads/2019/01/Screenshot_20190106-005308.png)](/wp-content/uploads/2019/01/Screenshot_20190106-005308.png)

## Fixing text not filling TextView

Our text is now wrapping correctly but.. not in the way we'd expect! Despite how it looks, the TextView is correctly taking up all available space (this can be verified by viewing bounds or setting a background colour), it's the text itself misbehaving.

This is caused by Android's default [break strategy](https://developer.android.com/reference/android/widget/TextView.html#attr_android:breakStrategy) handling long words poorly. The break strategy determines how a word should be broken if it cannot fit all in one line, and can be `simple`, `balanced` (default) or `high_quality`. `balanced` is trying to make all lines the same length, which is not really what we want. Instead we want `simple`, to just start a new line when it's needed.

So, just adding `android:breakStrategy="simple"` to your TextView will make the text wrap as expected. However, this is only available on API levels 23+, so you may want to create a style of this in your `styles.xml` and apply it to your TextView for API levels &gt; M, so at least those versions wrap correctly:

[![](/wp-content/uploads/2019/01/Screenshot_20190106-010215.png)](/wp-content/uploads/2019/01/Screenshot_20190106-010215.png)

Here's the final XML, for completeness' sake:

```
<TableRow
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/Label_Email" />

    <TextView
        android:id="@+id/customer_email"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        style="@style/SimpleBreakStrategy"/>
</TableRow>
```

And the associated `styles.xml` entry:

```
<style name="SimpleBreakStrategy">
    <item name="android:breakStrategy" tools:targetApi="m">simple</item>
</style>
```