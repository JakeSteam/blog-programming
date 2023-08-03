---
title: Different approaches to conversation transcript formatting in Markdown
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - Markdown
---

I'm currently trying to write a bit of fiction, and conversation transcripts are a key part of this. However, there doesn't seem to be any standard way of displaying a conversation transcript in Markdown. Here's a few approaches, and my recommendation.

## Context

* Sample conversation, something interesting
* My typical length (~6-7 lines each)
* Need it to be easy to work with, but also look good, AND be formattable into something else if needed

## Traditional

First up, let's try formatting the conversation as if we were using a traditional editor like Microsoft Word.

* --? How do people do it...

Pros & cons
* Con: Hard to work with?

## Minimal

So, the entire reason we're even using Markdown instead of HTML or writing a Google Doc is for the ease of typing. We can make text *italic* or **bold** without taking hands off the keyboard, same with lists etc.

With this in mind, however we format conversations must be easy to work with, with minimal wasted keystrokes / clicks. Here's a few approaches.

### Extremely basic

What about the obvious approach: One line per message, and a blank line between messages so that Markdown adds a space?

Well, it's definitely easy to use (besides having to press enter twice for a new line), but personally I think this might be too much vertical spacing. The spacing is suitable for paragraphs, for a short message it seems like overkill. The line height can be adjusted, but no matter what size is picked there'll still be a big space!

This also has the disadvantage of making the markdown file about twice as long as it needs to be, a fact that will probably become pretty annoying when editing hundreds of lines of conversation.

---

```
Example: Hello this is a message

Example 2: Hello this is another

Example 3: Hello this is yet another
```

Example: Hello this is a message

Example 2: Hello this is another

Example 3: Hello this is yet another

---

### List & prefix

```
* Example: Hello this is a message
* Example 2: Hello this is another
* Example 3: Hello this is yet another
```

## Marked up

* br

## Styled

* Using CSS to prettify it, alternating sides etc.

## Recommendation

## Conclusion