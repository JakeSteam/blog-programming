---
title: Removing (or customising) the "This site is open source. Improve this page." footer on GitHub Pages
author: Jake Lee
layout: post
image: /assets/images/2023/ghp-banner.png
tags:
    - GitHub Pages
    - Jekyll
    - Web
---

I use GitHub Pages to display Markdown files a lot. I use it for [notes](https://notes.jakelee.co.uk), [game tracking](https://forza.jakelee.co.uk), [YouTube tracking](https://channels.jerma.io), and plenty of other projects. Seemingly at random, *some* of these projects have an open source footer at the bottom. What is it, what controls it, and how can it be removed?

Since there's [multiple](https://www.reddit.com/r/HTML/comments/jg3r9g/github_pages_show_this_site_is_open_source/) [people](https://webapps.stackexchange.com/q/111500/1404390) asking the same questions as me, explaining it in a short article seemed sensible! 

## What is it 

Obviously, it's a way to encourage visitors to improve your open source projects!

Clicking the "Improve this page" link opens up the current page directly on GitHub, letting any changes be suggested. For example, on [forza.jakelee.co.uk](https://forza.jakelee.co.uk) the link goes to `https://github.com/JakeSteam/ForzaUpdate/edit/master/README.md`. This URL cleverly includes the repository (`JakeSteam/ForzaUpdate`), the current branch (`/master/`), *and* the current file (`README.md`)!

## What controls it

Okay, so the link can be helpful, but... what makes it appear?

### Jekyll & Primer

When simple Markdown files are served via GitHub Pages, the ["Primer" Jekyll theme](https://github.com/pages-themes/primer) ([official example site](https://pages-themes.github.io/primer/)) is automatically used. This is what causes the Markdown to be converted into HTML, although both remain accessible. 

For example, my Markdown note [tech.md](https://notes.jakelee.co.uk/tech.md) gets rendered as [tech.html](https://notes.jakelee.co.uk/tech.html) by Jekyll using Primer.

### The footer's logic

OK, so our Markdown file is displayed using Primer. That doesn't explain where the footer comes from! 

As Primer is open source, we can [look at the `default.html`](https://github.com/pages-themes/primer/blob/master/_layouts/default.html#L20-L24) source code. At lines 20-24, it all becomes clear:

{% raw %}
```
      {% if site.github.private != true and site.github.license %}
      <div class="footer border-top border-gray-light mt-5 pt-3 text-right text-gray">
        This site is open source. {% github_edit_link "Improve this page" %}.
      </div>
      {% endif %}
```
{% endraw %}

The footer shows if:
1. The GitHub repo is not private (`site.github.private != true`).
2. The GitHub repo has a license set (`site.github.license`).

## How can it be removed

The easiest solution, if your site does not actually need a license, is to just delete the `LICENSE` file you may have accidentally created when starting the repository.

However, if you *do* need to keep your license, we can easily remove the footer by overriding the Jekyll layout. To do that we:

1. Create `/_layouts/default.html` inside the repository. This can be done via the "Add file" dialog on GitHub.com by just typing the folder name too.
2. Copy across the contents of [Primer's default.html](https://github.com/pages-themes/primer/blob/master/_layouts/default.html).
3. Remove (or customise) the footer (lines 20-24).
4. Save your new file, GitHub pages will redeploy your site, and the footer will be gone!

## Conclusion