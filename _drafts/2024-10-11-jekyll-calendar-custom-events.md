---
title: Building a Jekyll / Liquid calendar with custom events
author: Jake Lee
layout: post
image: /assets/images/2024/calendar-header.png
tags:
  - Liquid
  - Jekyll
  - Web
---

I recently created a full-year calendar displaying custom events from Jekyll posts in the Liquid language, here's how it works and how to use it!

Before diving into how the calendar works, here's a few useful links:

1. A [live demo of the calendar](https://history.jakelee.co.uk/calendar/) on my Internet History site.
2. All code is available [as a GitHub Gist](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9), or [in a merge commit](https://github.com/JakeSteam/minimaJake/commit/1d9aced2b346cc13ff16b3b38889b061abecf1ff).
3. The [latest version](https://github.com/JakeSteam/minimaJake/blob/main/_includes/custom/calendar.md) of the calendar, which might have a few post-release improvements.

## What can the calendar do?

Well, all the basic features you'd expect of a calendar:

1. Display every day in an arbitrary year, with months / days of week.
2. Add multiple arbitrary events to days from any site post.
3. Clicking a day with events to view more information, e.g. how many years ago an event on that day happened, and linking to the post the event is defined on.

Here are some screenshots:

|                               Dark                                |                                Light                                |                                Mobile                                 |
| :---------------------------------------------------------------: | :-----------------------------------------------------------------: | :-------------------------------------------------------------------: |
| [![](/images/v1_1_0_dark-thumbnail.png)](/images/v1_1_0_dark.png) | [![](/images/v1_1_0_light-thumbnail.png)](/images/v1_1_0_light.png) | [![](/images/v1_1_0_mobile-thumbnail.png)](/images/v1_1_0_mobile.png) |

## How can I add it to my Jekyll site?

The calendar is just a Liquid script with a little CSS / HTML / JavaScript to improve functionality / UI, so:

1. Copy [`calendar.html`](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9#file-calendar-html) into any HTML or Markdown page on your Jekyll site.
   - _Note: I added it to `_includes/custom/calendar.html` and used {% raw %}`{% include custom/calendar.md %}`{% endraw %} on a page._
2. Copy [`styles.css`](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9#file-styles-scss) to your site's CSS file, replacing `#ca644e` with your site's accent colour.
3. Add a `dates` list to a post ([example](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9#file-example-post-or-page-html)), containing objects with a `YYYY-MM-DD` `date` and a text `title`.
4. Start your site, visit your new calendar!

## How can I customise the calendar?

Obviously basic stylistic changes can be made in the CSS, all the classes are self-explanatory so shouldn't be any issues. I'd recommend not changing the `display` or `grid-template-columns` to avoid chaos!

However, you're more likely to want to change the behaviour. Liquid can be unintuitive, and whilst I'll run through the code in detail, here's how to change common features:

### Only display current year

For my use case, I wanted to display events in _any_ year on a specified day, however a calendar is usually only for a specific year!

To change this:

1. Replace `assign current_year = 'now' | date: '%Y'` with `assign current_year = 2024` (or the year of your choice).
2. Change both instances of `%m-%d` to `%Y-%m-%d`, so the year is included when finding events.
3. The "Years ago" text logic is now meaningless, so you can remove lines 34-40, and remove `append: years_ago_text |`.

### Changing popup contents

- To change the per-event text, just modify line 41's `append`s with whatever text you want.
- To change what the popup dialog looks like, or it's behaviour, the browser's default styling is used so [you'll need new CSS rules / JavaScript](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#examples).

### Using post publish dates

Whilst I wanted to define custom events for my calendar, you might want to just use post dates. This can be done by:

1. Removing the lines with `for event in post.dates` (line 32) and `endfor` (line 44).
2. Changing `assign event_date = event.date | date: "%m-%d"` to `assign event_date = post.date | date: "%m-%d"`.
3. Changing `assign event_year = event.date | date: "%Y"` to `assign event_year = post.date | date: "%Y"`

## How does it work?
