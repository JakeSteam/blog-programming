---
title: "How to add a new programming language to GitHub: an introduction to Linguist"
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  -
---

When writing or viewing code on GitHub, have you ever noticed how syntax is almost always highlighted, and repositories have an accurate breakdown of the languages used? That's due to Linguist, here's how to add a new language!

Before we dive into [how to add a language](#how-do-i-add-a-new-language), we first need to cover [what Linguist is](#what-is-linguist), how it works, and [what is needed](#what-are-the-new-language-requirements) before adding a new language.

Throughout this post, I'll be using the example language of "[Lingo](<https://en.wikipedia.org/wiki/Lingo_(programming_language)>)", which I have [raised a Linguist PR](https://github.com/github-linguist/linguist/pull/6746) for. Feel free to refer to that PR if something seems unclear.

## What is Linguist?

[Linguist](https://github.com/github-linguist/linguist) is an open source project run by & usd on GitHub itself (a "[production dependency](https://github.com/github-linguist/linguist/blob/master/CONTRIBUTING.md#:~:text=production%20dependency)"), and watched over very attentively by at least one of the senior engineers there.

In its own words:

> This library is used on GitHub.com to detect blob languages, ignore binary or vendored files, suppress generated files in diffs, and generate language breakdown graphs.

The most obvious usage of Linguist for me personally is this sidebar feature on every repository, helping indicate roughly what kind of code it contains:

[![](/assets/images/2024/linguist-example.png)](/assets/images/2024/linguist-example.png)

Less obviously, but far more significant for developer experience, is the ability of GitHub to identify and syntax highlight almost any file it is given. Whilst this seems simple for files like `.js`, what about if a [file has no extension](https://github.com/github-linguist/linguist/blob/master/Dockerfile)? Or, even worse, when multiple files share an extension (currently [_seven_ languages](https://github.com/github-linguist/linguist/blob/master/lib/linguist/heuristics.yml#L416) have a claim to `.m`).

Linguist solves all of this behind the scenes, with the help of contributors like you and me. Importantly, it (mostly) isn't a team focused on parsing languages, instead it coordinates the use of appropriately licensed existing language parsers.

## What are the new language requirements?

So, you have a programming language that isn't detected by Linguist. Congratulations, it must be a pretty rare language!

Linguist only adds languages once they have a minimum level of usage, otherwise there would be thousands of languages that have only been used once for a hobby project. The guideline for adding a language (or a new file extension to a language) is **200 unique `user/repo` repositories**.

As GitHub's search doesn't necessarily display _all_ files, there is a little leeway here. For example, if there are > 2000 results for a language across a wide distribution of repositories, it's likely to be accepted even if 200 unique repositories aren't found ([source](https://github.com/github-linguist/linguist/issues/5756)).

_Note: Adding a new file extension for an existing language has the same requirements, to avoid a single language "claiming" too many extensions._

## How do I add a new language?

Linguist's [contributing guide](https://github.com/github-linguist/linguist/blob/master/CONTRIBUTING.md) is the source for most of this information, but hopefully the step-by-step detail here will make it a bit more beginner-friendly.

### Information required

Here's everything you need to submit a request for a new language to be added. I'd recommend gathering all this before actually [implementing the new language](#implementing-the-new-language), since it's all required and can take time!

As a reminder, I'll be using [my "Lingo" PR](https://github.com/github-linguist/linguist/pull/6746) as a concrete example for all of these.

#### Syntax highlighter

For your language's syntax to be highlighted on GitHub, you need a syntax highlighter!

This is also known as a "grammar". Luckily, it seems most text editors (e.g. TextMate, Sublime Text, Atom, VSCode) use the same format for syntax highlighting! This means if you already have a syntax highlighter installed to your preferred text editor, you can probably reuse it.

Additionally, make sure the repository has one of the [accepted licenses](https://github.com/github-linguist/linguist/blob/9b1023ed5d308cb3363a882531dea1e272b59977/vendor/licenses/config.yml#L4-L15)

For my language, I was using an MIT-licensed [VSCode syntax highlighter](https://github.com/markhughes/vscode-lingo-director) that contained the necessary [`.tmLanguage.json` file](https://github.com/markhughes/vscode-lingo-director/blob/main/syntaxes/lingo.tmLanguage.json).

#### Real-world samples

To help Linguist "learn" what your language looks like, as well as ensuring appropriate tests can be written, 2-3 samples of your language are needed. These should be real world code, that does something useful, and not short "hello world" style examples.

As before, these samples should be from a source with an [accepted license](https://github.com/github-linguist/linguist/blob/9b1023ed5d308cb3363a882531dea1e272b59977/vendor/licenses/config.yml#L4-L15).

For my language, I used 2 files I'd looked at recently when extracting `.ls` files from Adobe Director: [`AutoDismisser.ls`](https://github.com/n0samu/DirectorCastRipper/blob/main/AutoDismisser.ls) and [`Progress.ls`](https://github.com/n0samu/DirectorCastRipper/blob/main/Progress.ls).

#### Prove usage

This can either be the easier or the hardest step!

If your file extension is unique, just search for your file extension (excluding forks) using `PATH:*.abc -IS:FORK`. This (fictional) extension [returns 130k results](https://github.com/search?q=PATH%3A*.abc+-IS%3Afork&type=code), which would of course be enough.

However, if your language shares an extension with an existing language, you need to use some sort of filter. This is typically done by including mandatory parts of your language's files if possible, or more typically defining a regular expression to "catch" most of your language's files. This is known as a "heuristic", read on if you need one!

#### Heuristic (optional)

### Implementing the new language

### Raising a PR

### Next steps

## Conclusion

## Todo

- Set up GitHub Codespace to work in https://github.com/github-linguist/linguist/blob/master/CONTRIBUTING.md

- REQUIREMENTS
  - Find a "grammar"(?) (maybe just VSCode repo? Look at existing)
  - Find real-world samples
  - Create a "heuristic": https://github.com/github-linguist/linguist/blob/master/lib/linguist/heuristics.yml
    - "on x" events work well, a few options: https://github.com/JakeSteam/junkbot-code/blob/main/files/editor/parent_edit%20manager.ls
    - Can also skim: https://github.com/search?q=repo%3AJakeSteam%2Fjunkbot-code++language%3ALiveScript&type=code
  - Show "in the wild usage": Ideally 200 user/repos, or 2k instances
