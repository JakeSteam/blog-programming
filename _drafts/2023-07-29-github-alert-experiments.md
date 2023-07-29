---
title: Experimenting with GitHub's "alert" markdown syntax
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - GitHub
    - Markdown
---

Back in May 2022, [GitHub announced the ability](https://github.com/orgs/community/discussions/16925) to display "alerts" within Markdown documents on the site, by using a new syntax. These alerts originally only supported `ℹ️ Notes` and `⚠️ Warnings`, however this week the `💬 Important` category was added. Here's how (and when) to use these alerts, and their limitations.

## Types of alert

First of all, there's 3 categories of alert: Note, Important, and Warning. Each uses a different text, icon, and quote indicator colour, but with the same syntax:

> [!NOTE]
> This alert uses `[!NOTE]` 

> [!IMPORTANT]
> This alert uses `[!IMPORTANT]`

> [!WARNING]
> This alert uses `[!WARNING]`

As these (obviously!) will only render correctly on GitHub itself, here's a screenshot for viewers elsewhere:

![image](https://github.com/JakeSteam/blog-programming/assets/12380876/63f0ef07-8b8f-4c1e-9119-431563475d55)

## When to use

Luckily, these alert categories are (for now) pretty self explanatory. The descriptions within [the original post](https://github.com/orgs/community/discussions/16925) are perfect in my opinion, so they're recreated here:
* `Note`: Highlights information that users should take into account, even when skimming.
* `Important`: Crucial information necessary for users to succeed.
* `Warning`: Critical content demanding immediate user attention due to potential risks.

## Syntax

Originally, these alerts used a weird combination of block quotes and bold text:

```
> **Note**
> This is a note
```

However, it's easy to see how someone could accidentally trigger this, which explains why the new bracket based syntax was added on the 21st July:

```
> [!NOTE]
> This is a note
```

Both syntaxes render identically, however the second "will gradually replace the old one". Personally I find it a bit unusual that the feature hijacks the existing blockquote functionality, and isn't built as a brand new piece of syntax. The `[!NOTE]` syntax reminds me of [BBCode](https://en.wikipedia.org/wiki/BBCode), which I thought died years ago!

Whilst I do have my issues with the blockquote hijacking syntax, it does have the advantage of having a well defined set of rules to follow. For example, adding spaces after the `[!NOTE]` does nothing, whilst spaces before also does nothing... until there are enough to trigger a code block.

## Conclusion
