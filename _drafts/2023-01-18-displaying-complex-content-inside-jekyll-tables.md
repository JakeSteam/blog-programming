---
title: How to display complex content (lists, code) inside a table in GitHub / Jekyll
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - Jekyll
    - GitHub
    - Markdown
---

## Summary of results

|  | Markdown | GitHub | Jekyll |
| --- | --- | --- | --- |
| Using no technique | X |  | X |
| Using entirely HTML table | Y |  | Y |
| Using HTML content | Y |  | X |
| `{::nomarkdown}` | X | | Y |

## No technique

Unsurprisingly, using regular markdown inside a table causes impressively bad formatting issues, with code formatting especially bad.

| Content | Example |
| --- | --- |
| List | * aaa
* bbb |

| Content | Example |
| --- | --- |
| Code block | ```
ccc 
``` | ```

| Content | Example |
| --- | --- |
| Image | ![](/assets/images/2023/tables-example.png) |

## HTML table

This works almost perfectly! Lists are easy to work with, code blocks can be as complex as they need to be, and everything is nice and readable. 

The downside is using horrifically verbose HTML tables, and having to negotiate HTML's awareness of whitespace.

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

## HTML content

Converting the markdown content into HTML works well on GitHub (besides the mess of having complex HTML all on one line). However, on Jekyll it falls apart, showing the raw HTML instead for most content types.

| Content | Example |
| --- | --- |
| List | <ul><li>aaa</li><li>bbb</li><ul> |
| Code block | <pre><code>ccc</code></pre> |
| Image | <img src="/assets/images/2023/tables-example.png"> |

## ::nomarkdown

| Content | Example |
| --- | --- |
| List | {::nomarkdown}<ul><li>aaa</li><li>bbb</li><ul>{:/} |
| Code block | {::nomarkdown}<pre><code>ccc</code></pre>{:/} |
| Image | {::nomarkdown}<img src="/assets/images/2023/tables-example.png">{:/} |
