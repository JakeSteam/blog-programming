---
title: Different approaches to conversation transcript formatting in Markdown
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - Markdown
---

I'm currently trying to write a bit of fiction, and conversation transcripts are a key part of this. However, there doesn't seem to be any standard way of displaying a conversation transcript in Markdown. Here's a few approaches, and my recommendation.

To compare approaches, I'll use a short exchange about stock trading from one of my favourite underrated films of all time: [Primer](https://www.imdb.com/title/tt0390384/). Here's the conversation in plain text, as you can see it doesn't stand out much, and is quite basic:

---

Aaron: What do they do?

Abe: What do you mean?

Aaron: What does it, what does this company do? Do they make things or...

Abe: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.

Aaron: You really don't know what they do?

---

## Markdown

One of the main reasons I write in Markdown instead of HTML or writing a Google Doc is for the ease of minor styling. I can make text *italic* or **bold** without taking my hands off the keyboard, or make a list etc.

With this in mind, however conversations are formatted must be easy to work with, with minimal wasted keystrokes / clicks. Here's a few approaches.

### Basic syntax

What about the obvious approach that was used at the start of this post? One line per message, and a blank line between messages so that Markdown adds a space.

Well, it's definitely easy to use (besides having to press enter twice for a new line), but personally I think this might be too much vertical spacing. The spacing is suitable for paragraphs, for a short message it seems like overkill. The line height can be adjusted, but at least with default spacing it's a bit too tall. Additionally, the character names aren't distinguished at all, nor is the fact that it's a quote.

This also has the disadvantage of making the markdown file about twice as long as it needs to be, a fact that will probably become pretty annoying when editing hundreds of lines of conversation.

```markdown
Aaron: What do they do?

Abe: What do you mean?

Aaron: What does it, what does this company do? Do they make things or...

Abe: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.

Aaron: You really don't know what they do?
```

### List of messages

We can reduce the vertical space between transcript messages by making them each list items. This also has the advantage of keeping one line per message in the markdown file, with the disadvantage of completely unnecessary bullet points taking up space.

* Aaron: What do they do?
* Abe: What do you mean?
* Aaron: What does it, what does this company do? Do they make things or...
* Abe: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.
* Aaron: You really don't know what they do?

```markdown
* Aaron: What do they do?
* Abe: What do you mean?
* Aaron: What does it, what does this company do? Do they make things or...
* Abe: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.
* Aaron: You really don't know what they do?
```

### Quote & bold

How about improving on an issue with the basic approach: No way to distinguish character names from the words they've said? Just making the character's names bold should help with this, and putting them inside a block quote makes a bit more sense semantically (since the conversation *is* essentially a quote).

Using the appropriate tools (blockquote) for the conversation also means any automated tools can understand the messages a chat transcript. For example on this site, a solid indent is placed on the left, and all words are put in italics. These small stylistic additions are included by default, and make it look much more like a quote! 

Additionally, the bold tags mean the names and messages will be displayed differently in most text editors, perhaps making the writing / editing process a little bit easier.

> **Aaron**: What do they do?
>
> **Abe**: What do you mean?
>
> **Aaron**: What does it, what does this company do? Do they make things or...
>
> **Abe**: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.
>
> **Aaron**: You really don't know what they do?

```markdown
> **Aaron**: What do they do?
>
> **Abe**: What do you mean?
>
> **Aaron**: What does it, what does this company do? Do they make things or...
>
> **Abe**: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.
>
> **Aaron**: You really don't know what they do?
```

### Manual line breaks

Whilst the block quotes work well, what about if we want our lines more compressed? We can manually add in HTML `<br>` at the end of each message. Turns out this really isn't enough space between lines! The end result is very cramped, and adding the manual line breaks is a lot of effort. Not a good solution.

**Aaron**: What do they do?<br>
**Abe**: What do you mean?<br>
**Aaron**: What does it, what does this company do? Do they make things or...<br>
**Abe**: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.<br>
**Aaron**: You really don't know what they do?<br>

```markdown
**Aaron**: What do they do?<br>
**Abe**: What do you mean?<br>
**Aaron**: What does it, what does this company do? Do they make things or...<br>
**Abe**: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.<br>
**Aaron**: You really don't know what they do?<br>
```

### 2-column table

Okay, I know this will be awful, but it's *an* option for two-person conversations. It has the advantage of clearly showing both parties, and avoids typing out character names repeatedly, however the raw text is very hard to read. I wouldn't recommend this whatsoever.

| Aaron | Abe |
| --- | --- |
| What do they do? | |
| | What do you mean? |
| What does it, what does this company do? Do they make things or... | |
| | I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price. |
| You really don't know what they do? | |

```markdown
| Aaron | Abe |
| --- | --- |
| What do they do? | |
| | What do you mean? |
| What does it, what does this company do? Do they make things or... | |
| | I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price. |
| You really don't know what they do? | |
```

## CSS styling

Alright, so I've tried a few ways of formatting text using basic Markdown syntax. What about using CSS to find a solution, or improve an existing one?

### Alternating sides

Whilst looking for a way to make the [list of messages](#list-of-messages) more conversation like, I found [this StackOverflow solution](https://stackoverflow.com/a/39286060/608312). 

For short messages this isn't too awful, and ends up looking like a [2-column table](#2-column-table) but with the ability to overlap. However, for longer messages it just becomes a mess.

Whilst this could be improved by improving padding etc, a CSS reliant approach isn't ideal. I actually couldn't immediately get this working within my site's style (hence the image), whereas a Markdown based solution will work far more reliably.

[![](/assets/images/2023/conversations-alternating.png)](/assets/images/2023/conversations-alternating.png)

### General avoidance

I found quite a few very over-complicated solutions to styling a transcript, and I found it amazing how willing people are to have their text cluttered with classes everywhere! If the raw text isn't readable, it's going to be very painful to work with, and there'll undoubtedly be styling errors here and there.

As such, I'm not sure any specific CSS should be used for displaying a conversation. Instead, the Markdown itself should be as simple yet semantically correct as possible, then the presentation can be changed all at once later on if desired.

## Recommendation

I'm not sure any of the approaches I've looked at have been perfect. I love the simplicity of the [basic syntax](#basic-syntax) or [list of messages](#list-of-messages), but the end result just isn't good enough.

Despite the slightly verbose syntax (`>` & `**x**`) of [quote and bold](#quote--bold), the aesthetically pleasing output seems better than any of the custom CSS heavy solutions I came across. Additionally, using HTML elements (`blockquote`) for their intended purposes can only have positive side effects in terms of SEO and accessibility!

Whilst I'll keep an eye out for syntax improvements, I think quoted and bold names is good enough. I'll add the `**bold**` asterisks as I type names, realistically it isn't much more effort. 

For adding the block quote & empty lines it's probably easier to wait until a section is done, and add them all at once, like so:

| Step | Instructions | Example |
| --- | --- | --- |
| 1 | Put the cursor at the start of the **first** line | [![](/assets/images/2023/conversations-step1.png)](/assets/images/2023/conversations-step1.png) |
| 2 | Hold `Alt` + `Shift`, then click the start of the **last** line | [![](/assets/images/2023/conversations-step2.png)](/assets/images/2023/conversations-step2.png) |
| 3 | Type `>`, press `enter`, type `>`, press `space` | [![](/assets/images/2023/conversations-step3.png)](/assets/images/2023/conversations-step3.png) |

Finally, here's a slightly longer version of the sample quote (following the instructions above), to check it looks OK in longer conversations:

>
> **Aaron**: What do they do?
>
> **Abe**: What do you mean?
>
> **Aaron**: What does it, what does this company do? Do they make things or...
>
> **Abe**: I don't know. It doesn't matter. All that matters is that the price goes up. You know, and the volume is so high that the number of shares we're trading is not going to affect the price.
>
> **Aaron**: You really don't know what they do?
>
> **Aaron**: That's why you were talking about a mid-cap fund, so the volume'd be high enough to hide us.
>
> **Abe**: Yeah, yeah. Do you think that's too cautious?
>
> **Aaron**: I don't know. I know there's a lot of stocks out there that do a lot more than double, but this is my first day.