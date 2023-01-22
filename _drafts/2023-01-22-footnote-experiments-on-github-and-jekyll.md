---
title: Experiments with GitHub & Jekyll's footnote functionality
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - GitHub
    - Jekyll
---

TEST[^ ]

Way back in September 2021, [GitHub added support for "footnotes"](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/), an intuitive way to add footnotes or references to a page. The "Kramdown" parser on Jekyll has also [supported footnotes for a decade](https://github.com/muan/scribble/issues/14#issuecomment-20422760). But... what are they actually capable of?

Jekyll's Kramdown parser has [excellent documentation](https://kramdown.gettalong.org/syntax.html#footnotes) for the permitted rules. My experimentation suggested that this documentation is 100% accurate.

## Basic footnotes

How to use them

"Markers" and "Definitions"

## URL additions

The footnote marker and definition both work by adding an identifier to the URL when clicked. 

On Jekyll these are `#fn:[footnote]` for the marker, and `#fnref:[footnote]` for the definition. 

On GitHub these are `#user-content-fn-[footnote]-[id]` for the marker, and `#user-content-fnref-[footnote]-[id]` for the definition. This ID appears to randomly generated for each footnote.

## Supported characters

Whilst most examples use basic numerical footnotes (e.g. `[^1]`), text footnotes (e.g. `[^example]`) also work! What about other characters?

| Test | Example | Supported on GitHub | Supported on Jekyll |
| --- | --- | --- | --- |
| Alphanumeric | `[^abc]` | All letters & numbers | All letters and numbers|
| Long text | `[^abc` ... `abc]` | Up to 1000 characters | At least up to 16,000 characters |
| Punctuation | `[^!"£$%^&*()_+-=]` | All are valid | Only `-`, and only after an alphanumeric character |
| Meta punctuation | `[^\[]` | Escaped `[` is OK, but escaped `]` or `:` are not | None are permitted |
| Spaces | ` ` / ` ` | Non-breaking spaces can go at start / middle / end (or be the only content), regular spaces cannot go anywhere | |
| Non-latin characters | `Приветこんにちはأهلا` | Russian, Japanese, and Arabic all work | No non-latin characters work, even `é` |

## Supported contents

## Misc


[^ ]: sssd


https://jayrobwilliams.com/posts/2020/10/jeykll-footnotes