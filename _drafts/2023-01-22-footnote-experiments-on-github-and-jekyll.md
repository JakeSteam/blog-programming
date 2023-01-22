---
title: An introduction to GitHub & Jekyll's footnote functionality, and finding its limits
author: Jake Lee
layout: post
image: /assets/images/2023/footnotes-header.png
tags:
    - GitHub
    - Jekyll
---

Way back in September 2021, [GitHub added support for footnotes](https://github.blog/changelog/2021-09-30-footnotes-now-supported-in-markdown-fields/), an intuitive way to add footnotes or references to a page. The "Kramdown" parser on Jekyll has also [supported footnotes for a decade](https://github.com/muan/scribble/issues/14#issuecomment-20422760). But... what are they actually capable of?

Jekyll's Kramdown parser has [excellent documentation](https://kramdown.gettalong.org/syntax.html#footnotes) for the permitted uses. My experimentation suggests that this documentation is 100% accurate. GitHub's [documentation is much simpler](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#footnotes), but also describes the essentials accurately. 

## Intro to footnotes

Footnotes in markdown are an extremely useful yet niche functionality that almost nobody actually uses. Whilst they are usually used to provide additional non-essential information[^footnote-definition], in a more academic context they can be used to cite sources. For example, on [my Internet History blog](https://history.jakelee.co.uk/) I always provide links to source material, causing articles to easily have 20+ sources. Any non-automated solution would be painful to maintain, so Markdown footnotes are a lifesaver.

To use a footnote, you need two components:

1. **The marker**: This looks `[^like-this]`, and is placed within the main text where the footnote should be linked from. This will be converted into a small auto-numbered link looking similar to: [[1]](#).
2. **The definition**: This looks `[^like-this]: Abc def`, and can be placed anywhere within the document. It defines the contents of the footnote, and automatically links back to any parts of the text that reference it.

All of a page's footnotes are merged together & numbered automatically during the publishing process. For more complex posts, I usually use named footnotes, and place the definitions at the end of the section containing the marker. 

If you'd like a more detailed & step-by-step explanation of the basics of footnotes in Markdown, Linux Hint has [an excellent guide](https://linuxhint.com/markdown-footnotes/).

[^footnote-definition]: Non-essential information such as the fact that Grammarly describes footnotes as 
    > Footnotes are small notations at the bottom of a page that provide additional information or cite the source of a passage in the page’s text.
    [^grammarly]

[^grammarly]: <https://www.grammarly.com/blog/footnotes/>

## Footnote functionality

So, footnotes are easy to use, and improve Markdown articles. What are their limits?

### URL additions

The footnote marker and definition both work by adding an identifier to the URL when clicked. 

On Jekyll these are `#fn:[footnote]` for the marker, and `#fnref:[footnote]` for the definition. 

On GitHub these are `#user-content-fn-[footnote]-[id]` for the marker, and `#user-content-fnref-[footnote]-[id]` for the definition. This ID appears to be randomly generated for each footnote.

### Supported characters

Whilst many online examples use basic numerical footnotes (e.g. `[^1]`), text footnotes (e.g. `[^example]`) also work! What else is allowed as part of a footnote identifier?

| Characters | Example | Supported on GitHub | Supported on Jekyll |
| --- | --- | --- | --- |
| Alphanumeric | `[^abc]` | All letters & numbers | All letters and numbers|
| Long text | `[^abc` ... `abc]` | Up to 1000 characters | Above 16,000 characters, no limit found |
| Punctuation | `[^!"£$%^&*()_+-=]` | All are valid | Only `-`, and only after an alphanumeric character |
| Meta punctuation | `[^\[]` | Escaped `[` is OK, but escaped `]` or `:` are not | None are permitted |
| Spaces | `[^ ]` | Non-breaking spaces can go at start / middle / end (or be the only content), regular spaces cannot go anywhere | None are permitted |
| Non-latin characters | `[^Приветこんにちはأهلا]` | Russian, Japanese, and Arabic all work | No non-latin characters work, even `é` |

### Supported contents

Okay, so now we know what can go in a footnote identifier, but what can go into the footnote itself?

It turns out... pretty much anything works, so long as it is after the footnote definition and preceded by 4 spaces! 

Jekyll requires some types of content to have an empty line before they will render correctly, but ultimately seems to support all functionality.

| Test | Supported on GitHub | Supported on Jekyll |
| --- | --- | --- |
| Multiline | Yes | Yes |
| Table | Yes | Yes |
| List | Yes | Yes |
| Quote | Yes | Yes |
| Code block | Yes | Yes |

### Self-referential

Admittedly this section is me intentionally trying to "trick" the footnote generator, but here we go! Footnotes can reference footnotes (e.g. `[^example]: some text[^example2]`) and function correctly. They can even reference themselves, although GitHub (left) and Jekyll (right) treat this edge case slightly differently:

[![](/assets/images/2023/footnotes-self.png)](/assets/images/2023/footnotes-self.png)

Footnotes can also be defined before or after they are used.

### Autolinking

Whilst writing this post I discovered a feature I wish I'd known months ago, especially whilst writing my [reference-heavy internet history posts](https://history.jakelee.co.uk/million-dollar-homepage/#references). Markdown [supports URL auto-linking](https://daringfireball.net/projects/markdown/syntax#autolink), to do this just add `<` and `>` around a URL. This will turn https://example.com into <https://example.com>.

This autolinking syntax is only required for Jekyll, as GitHub automatically makes all links clickable by default.

## Conclusion

Ultimately, I didn't discover anything particularly shocking about footnotes, except that GitHub is way more lenient with the identifiers than Jekyll! That being said, the discovery of [autolinking](#autolinking) is a good example of why reading the documentation is often helpful, even if it doesn't help the immediate problem.

Perhaps there's no greater indicator of how underutilised footnotes are than a Google search for "jekyll footnotes" returning... 114 results. "footnotes in jekyll" similarly returns just 10. Most of these results are for now unnecessary third party plugins[^unnecessary], or simplistic / broken guides[^broken-guide], but at least "markdown footnotes" returns 2.5k results! 

[^unnecessary]: <https://github.com/orangejulius/jekyll-footnotes>
[^broken-guide]: <https://www.kylealwyn.com/blog/how-to-add-footnotes-markdown>


## References