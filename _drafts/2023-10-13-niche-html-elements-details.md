---
title: Using niche but powerful built-in HTML elements to avoid reinventing wheels with JS & CSS (e.g. collapsible areas)
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - HTML 
    - Web Development
---

A [recent update to this site](https://minima.jakelee.co.uk/v1.0.9/) added a collapsable table of contents. After looking at a few JS / CSS solutions, I discovered there's a `details` built-in HTML element that does everything! Here's how to use it, and a few other unknown HTML elements.

I'll include a live preview for each element (which will inherit the site's styling), as well as screenshots & a link to a default version.

## {% raw %}`<details>` & `<summary>` expanding content{% endraw %}

These 2 are why I'm writing this post! The `details` element creates a hidden section of text that can be toggled by clicking the `summary`. This is very common functionality, and even the default usage looks acceptable:

[![](/assets/images/2023/html-details.png)](/assets/images/2023/html-details.png)

The arrow to the side behaves as you'd expect, and since it's a unique HTML element it can easily be styled. Here is how it looks with my site's styling, followed by the source HTML:

---
<details>
  <summary>Details</summary>
  Something small enough to escape casual notice.
</details>

---

{% raw %}
```html
<details>
  <summary>Details</summary>
  Something small enough to escape casual notice.
</details>
```
{% endraw %}

---

Tips:

* The `details` tag can have `open` added to it, making the content appear expanded initially.
* When toggled, content around the `details` element will rearrange.
* [Mozilla developer docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).

## {% raw %}`<datalist>` suggested input values{% endraw %}

Everyone knows about `select` and `option` for dropdown lists... but what if you only want to recommend specific answers, not insist? Introducing `datalist`.

Datalist is essentially a way to provide `input` with a list of recommended or suggested values, whilst still letting the user enter anything they want.

[![](/assets/images/2023/html-datalist.png)](/assets/images/2023/html-datalist.png)

This could be useful for a search field displaying the user's last few searches, common search terms, or a thousand other uses. It works by defining the `datalist` separately from the `input` element itself, connecting them with a `list` parameter.

Here's how it looks with my site's styling, and the source HTML:

---

<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>

---

{% raw %}
```html
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>
```
{% endraw %}

---

Tips:
* The `datalist` / `list` attribute also works on non-text inputs, e.g. numbers, times, ranges, and even colours!
* It can be tricky-to-impossible to style the "popover" options, so it's not ideal for sites with strong branding.
* The accessibility isn't ideal, with some screen readers not interpreting it correctly.

## {% raw %}`<del>` & `<ans>` change tracking{% endraw %}

<blockquote>
  There is <del>nothing</del> <ins>no code</ins> either good or bad, but <del>thinking</del> <ins>running it</ins> makes
  it so.
</blockquote>

## {% raw %}`<wbr>` word break suggestions{% endraw %}

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr

<div style="width:170px">

ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
<br><br>
ABCDEFGHIJKLMN<wbr />OPQRSTUVWXYZ<wbr />ABCDEFGHIJKLMN<wbr />OPQRSTUVWXYZ
<br><br>
ABCDEFGHIJKLMN&shy;OPQRSTUVWXYZ&shy;ABCDEFGHIJKLMN&shy;OPQRSTUVWXYZ
</div>

## {% raw %}`<ruby>` annotations above text {% endraw %}

<ruby> 明日 <rp>(</rp><rt>Ashita</rt><rp>)</rp> </ruby>