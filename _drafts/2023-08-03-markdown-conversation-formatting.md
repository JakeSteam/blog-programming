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

## Minimal

One of the main reasons I write in Markdown instead of HTML or writing a Google Doc is for the ease of minor styling. I can make text *italic* or **bold** without taking my hands off the keyboard, or make a list etc.

With this in mind, however conversations are formatted must be easy to work with, with minimal wasted keystrokes / clicks. Here's a few approaches.

### Extremely basic

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

### List & prefix

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

How about improving on another issue with the basic approach: No way to distinguish character names from the words they've said. Just making the character's names bold should help with this, and putting them inside a block quote makes a bit more sense semantically (since the conversation *is* a quote).

Using the appropriate tools (blockquote) for it also means any automated tools can understand the messages a chat transcript. For example on this site, a solid indent is placed on the left, and all words are made italics. These small stylistic additions are included by default, and make it look much more like a quote! 

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

## Traditional

First up, let's try formatting the conversation as if we were using a traditional editor like Microsoft Word.

* --? How do people do it...

Pros & cons
* Con: Hard to work with?

## Marked up

* br

## Styled

* Using CSS to prettify it, alternating sides etc.

## Recommendation

## Conclusion