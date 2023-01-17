---
title: How to display complex content (lists, code, images) inside a table reliably in Markdown / GitHub / Jekyll
author: Jake Lee
layout: post
image: /assets/images/2023/tables-header.png
tags:
    - Jekyll
    - GitHub
    - Markdown
---

As anyone who writes in Markdown knows, it's a very concise and easy way to write almost all content. However, tables can be a little bit awkward, especially if it includes multi-line content like a list! Here's a quick comparison of techniques that can be used to solve this, and whether they work in plain Markdown, GitHub, and Jekyll blogs.

## Summary of results

The table below shows a results summary of which technique works where, unfortunately there's no "one solution works everywhere" answer! A one sentence summary would be:
> Either tolerate a fully HTML table, or use `{::nomarkdown}` on Jekyll & HTML content on GitHub.

| Technique | Markdown | GitHub | Jekyll |
| --- | --- | --- | --- |
| Using no technique | ❌ | ❌ | ❌ |
| Using HTML for entire table | ✅ | ✅ | ✅ |
| Using HTML for content only | ✅ | ✅ | ❌ |
| Using `{::nomarkdown}` and HTML | ❌ | ❌ | ✅ |

The following sections will show the code & detailed results of this testing along with a bit of commentary. The table's appearance was checked for accuracy in the following scenarios:

* **Markdown**: Whether the table renders correctly in my markdown editor: [Visual Studio Code](https://code.visualstudio.com/) with [GitHub styled markdown](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles).
* **GitHub**: Whether the table renders correctly [on GitHub](https://github.com/JakeSteam/blog-programming/blob/main/_drafts/2023-01-18-displaying-complex-content-inside-jekyll-tables.md).
* **Jekyll**: Whether the table renders correctly on Jekyll (this post!). 

## No technique

Unsurprisingly, using regular Markdown inside a table causes impressively bad formatting issues, with code and list formatting especially chaotic.

**Code**

{% raw %}
```
| Content | Example |
| --- | --- |
| List | * aaa
* bbb |
| Code block | \```
ccc 
\``` | 
| Image | ![](/assets/images/2023/tables-example.png) |
```
{% endraw %}

**Result**

| Content | Example |
| --- | --- |
| List | * aaa
* bbb |
| Code block | ```
ccc 
``` | 
```
| Image | ![](/assets/images/2023/tables-example.png) |

## Fully HTML table

This works almost perfectly! Lists are easy to work with, code blocks can be as complex as they need to be, and everything is nice and readable. 

The downside is using horrifically verbose HTML tables (24 lines vs 5 lines), and having to negotiate HTML's awareness of whitespace (notice the code block's odd formatting). 

**Code**

{% raw %}
```html
<table>
    <tr>
        <th>Content</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>List</td>
        <td><ul>
            <li>aaa</li>
            <li>bbb</li>
        </ul></td>
    </tr>
    <tr>
        <td>Code block</td>
        <td>
            <pre><code>
ccc
            </code></pre>
        </td>
    </tr>
    <tr>
        <td>Image</td>
        <td><img src="/assets/images/2023/tables-example.png"></td>
    </tr>
</table>
```
{% endraw %}

**Result**

<table>
    <tr>
        <th>Content</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>List</td>
        <td><ul>
            <li>aaa</li>
            <li>bbb</li>
        </ul></td>
    </tr>
    <tr>
        <td>Code block</td>
        <td>
            <pre><code>
ccc
            </code></pre>
        </td>
    </tr>
    <tr>
        <td>Image</td>
        <td><img src="/assets/images/2023/tables-example.png"></td>
    </tr>
</table>

## HTML content only

Converting the markdown content into HTML works well on GitHub (besides the mess of having complex HTML all on one line). However, on Jekyll it falls apart, showing the raw HTML instead for most content types. 

This tripped me up recently, when using a list of [video examples in a post](https://jakelee.co.uk/the-irresistible-allure-of-shitshow-comedy/) worked perfectly until I actually previewed the post. 

**Code**

{% raw %}
```
| Content | Example |
| --- | --- |
| List | <ul><li>aaa</li><li>bbb</li><ul> |
| Code block | <pre><code>ccc</code></pre> |
| Image | <img src="/assets/images/2023/tables-example.png"> |
```
{% endraw %}

**Result**

| Content | Example |
| --- | --- |
| List | <ul><li>aaa</li><li>bbb</li><ul> |
| Code block | <pre><code>ccc</code></pre> |
| Image | <img src="/assets/images/2023/tables-example.png"> |

## ::nomarkdown & HTML

Luckily, I found [this answer](https://stackoverflow.com/a/57904161/608312) showing how the `{::nomarkdown}` tag makes the HTML content be formatted correctly again. 

Whilst this does work perfectly, the raw code is pretty messy to look at!

**Code**

{% raw %}
```
| Content | Example |
| --- | --- |
| List | {::nomarkdown}<ul><li>aaa</li><li>bbb</li><ul>{:/} |
| Code block | {::nomarkdown}<pre><code>ccc</code></pre>{:/} |
| Image | {::nomarkdown}<img src="/assets/images/2023/tables-example.png">{:/} |
```
{% endraw %}

**Result**

| Content | Example |
| --- | --- |
| List | {::nomarkdown}<ul><li>aaa</li><li>bbb</li><ul>{:/} |
| Code block | {::nomarkdown}<pre><code>ccc</code></pre>{:/} |
| Image | {::nomarkdown}<img src="/assets/images/2023/tables-example.png">{:/} |
