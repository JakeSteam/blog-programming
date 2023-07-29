---
title: Experimenting with GitHub's "alert" markdown syntax
author: Jake Lee
layout: post
image: /assets/images/2023/alerts-banner.png
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

As these (obviously!) will only render correctly on GitHub itself, here's a screenshot from each theme:

| Variant | Light | Dark |
| --- | --- | --- |
| Default | [![](/assets/images/2023/alerts-lightdefault.png)](/assets/images/2023/alerts-lightdefault.png) | [![](/assets/images/2023/alerts-darkdefault.png)](/assets/images/2023/alerts-darkdefault.png) |
| High contrast | [![](/assets/images/2023/alerts-lightcontrast.png)](/assets/images/2023/alerts-lightcontrast.png) | [![](/assets/images/2023/alerts-darkcontrast.png)](/assets/images/2023/alerts-darkcontrast.png) | 

All the colourblind themes seem to have no effect on the appearance of these alerts, although I'm glad to see high contrast variants have been added.

## When to use

Luckily, these alert categories are (for now) pretty self-explanatory. The descriptions within [the original post](https://github.com/orgs/community/discussions/16925) are perfect in my opinion, so they're restated here:
* `Note`: Highlights information that users should take into account, even when skimming.
* `Important`: Crucial information necessary for users to succeed.
* `Warning`: Critical content demanding immediate user attention due to potential risks.

## Syntax

Originally, these alerts used a weird combination of block quotes and bold text:

```markdown
> **Note**
> This is a note
```

However, it's easy to see how someone could accidentally trigger this, which explains why the new bracket based syntax was added on the 21st July:

```markdown
> [!NOTE]
> This is a note
```

Both syntaxes render identically, however the second "will gradually replace the old one". Personally I find it a bit unusual that the feature hijacks the existing blockquote functionality, and isn't built as a brand new piece of syntax. The `[!NOTE]` syntax reminds me of [BBCode](https://en.wikipedia.org/wiki/BBCode), which I thought died years ago!

Whilst I do have my issues with the blockquote hijacking syntax, it does have the advantage of having a well defined set of rules to follow. For example, adding spaces after the `[!NOTE]` does nothing, whilst spaces before also does nothing... until there are enough to trigger a code block.

I was intending to try and break this syntax by combining it with other elements, nesting the notes etc, but it looks like other users got there first! Within [this comment thread](https://github.com/orgs/community/discussions/16925#discussioncomment-6509347), a few users do... quite impressive things to the syntax. Whilst it generally holds up well, there are inevitably a few quirks.

[![](/assets/images/2023/alerts-experiments.png)](/assets/images/2023/alerts-experiments.png)

## Conclusion

Writing this post was tricky, since I had to write it directly on GitHub! Additionally, the alerts only appeared to preview correctly when *creating* a new file, and not when editing an existing one. This is perhaps to be expected for a beta feature, but still made it all feel a bit hacky.

Despite my complaints, I do like the feature. I like that GitHub is trying to add new bits and pieces to Markdown (such as [Mermaid last year](/using-mermaid-for-diagrams-on-github/)), they are in the unique position to make a syntax standard by just implementing it. I also like the openness with the community, and seemingly exchanging views with both supporters and those with... surprisingly strong negative opinions. The development seems a little unusual, with silence since May 2022, then 3 updates at the end of July 2023! However, I hope there are more bits and pieces to come.

For example, [eduardogerentklein suggested](https://github.com/orgs/community/discussions/16925#discussioncomment-2791747) a `✅ Check` syntax, which seems a simple yet useful addition, and would be great for confirming processes have been completed.

Within [the original discussion](https://github.com/orgs/community/discussions/16925), an excellent point is raised about localisation, and how this is currently only useful for English documents. I'm not sure if this can be solved easily, besides splitting out the appearance modifying term and the text displayed. Otherwise, every language's variation will have to be defined as a keyword, and it'll be unmanageable. A syntax like `[!NOTE Nota]` (for Spanish) would let the author customise the appearance.

If you'd like to contribute your opinions on GitHub's alert feature, [the original discussion](https://github.com/orgs/community/discussions/16925) is the best place.
