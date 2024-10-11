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

|                                             Dark                                              |                                              Light                                              |                                              Mobile                                               |
| :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/calendar_dark-thumbnail.png)](/assets/images/2024/calendar_dark.png) | [![](/assets/images/2024/calendar_light-thumbnail.png)](/assets/images/2024/calendar_light.png) | [![](/assets/images/2024/calendar_mobile-thumbnail.png)](/assets/images/2024/calendar_mobile.png) |

## How can I add it to my Jekyll site?

The calendar is just a Liquid script with a little CSS / HTML / JavaScript to improve functionality / UI, so:

1. Copy [`calendar.html`](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9#file-calendar-html) into any HTML or Markdown page on your Jekyll site.
   - _Note: I added it to `_includes/custom/calendar.html` and used {% raw %}`{% include custom/calendar.html %}`{% endraw %} on a page._
2. Copy [`styles.css`](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9#file-styles-scss) to your site's CSS file, replacing `#ca644e` with your site's accent colour.
3. Add a `dates` list to a post ([example](https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9#file-example-post-or-page-html)), containing objects with a `YYYY-MM-DD` `date` and a `title`.
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
2. Changing both `event.date` to `post.date`.

## How does it work?

These details are mostly to stop me forgetting in a few months, but they may help you make changes to the code too!

As a reminder, all the code is in a GitHub Gist: <https://gist.github.com/JakeSteam/d7f7c681412989bb3c173cc850b756f9>

### Displaying a month

Displaying all the days in a month correctly aligned to the days of the week grid is easily the hardest part of a calendar, and luckily someone already solved it for me!

Specifically, [this post (in Russian)](https://mikhail-yudin.ru/blog/frontend/jekyll-calendar-css-grid). Essentially, to ensure we output placeholder days from the previous month, we:

1. Start 7 days before the start of the month (`-7..30`), and loop through each day by building a `day_timestamp` using the `month_start_timestamp` and current day (`i`).
2. For each day, if we haven't found the first relevant day yet (`first_day_found`), skip days without outputting (`continue`) until the current day is Monday.
3. Now we need to output placeholder days for the row until the month actually starts, this is done with `if month_str == month_number` ... output day `span` ... `else` ... output empty `span`.
4. To output a day's events, we loop through every object in every post's `dates` object.
5. For each event, we add the HTML output to `events`, which is added to the page's HTML itself as a `data-events` attribute on the day's `span`.

**Styling with CSS:**

1. Using CSS, lay out all the days in `calendar-grid` in a grid with 7 columns and some spacing (`display: grid; grid-template-columns: repeat(7, 2rem);`).
2. Similarly, lay out the months themselves in a grid that reacts to screen width (`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`).
3. Finally, add some nice touches like `border`s, a `pointer` for clickable days, colours, padding, etc.

Done!

Looping through every event on every post for every day is absurdly inefficient (e.g. 10 posts with 10 events each calculated for every day = 10\*10\*365 = 36,500 checks total), however since this is all done once at compile time... I don't really mind.

The page will always load in milliseconds even with thousands of events / posts. I had a brief try at implementing some sort of events hashmap to optimise the lookups, but Liquid really isn't made for this kind of programming! The dumb, simple solution is good enough.

### Displaying all months

Literally just {% raw %}`{% for month in (1..12) %}`{% endraw %}, plus outputting the month name (`%B`)!

### Displaying a dialog

Shoutout to HTML for now including a native `dialog` element! This element does all the hard work of fading the background, displaying a dialog in the middle of the screen, and even has a special syntax to close it without any JavaScript:

```
  <form method="dialog">
    <button autofocus>Close</button>
  </form>
```

Some JavaScript is still needed however, to dynamically populate this dialog. When the page loads, we:

1. Select all days with events (`const eventDays = document.querySelectorAll('.calendar-event');`)
2. For each one, add a click listener.
3. On click, set the dialog's `eventContent` to the contents of the clicked day's `data-events` attribute, and `showModal()` to display it.

### Displaying years since

Another simple one, just subtract the event's year (`%Y`) from the current year, and display "This year" if this is 0, otherwise "\_ years ago".

## Conclusion
