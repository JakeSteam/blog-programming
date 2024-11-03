---
title: Introducing "Forza Update", a minisite automatically tracking the next Forza Horizon 5 season & series
image: /assets/images/2023/fh5minisite-header.png
tags:
    - Forza Horizon 5
    - Gaming
    - JavaScript
---

As you might have realised from [my](https://jakelee.co.uk/forza-horizon-5-creative-accolades/) [many](https://jakelee.co.uk/complete-guide-to-fh5-secret-dlc-cars/) [previous](https://jakelee.co.uk/complete-guide-to-forza-horizon-5-badges/) Forza Horizon 5 posts, I play it a lot! Each week we get a new content drop, and I often got confused about update times due to timezones. To solve this, I created a new minisite.

The site is available at [forza.jakelee.co.uk](https://forza.jakelee.co.uk/).

It is very intentionally functionality-first, so don't expect any fancy design ideas here! Here's how it looks:

[![](/assets/images/2023/fh5minisite.png)](/assets/images/2023/fh5minisite.png)

## How it works

[All the code used for the site](https://github.com/jakesteam/forzaupdate) is public ([forza.js specifically](https://forza.jakelee.co.uk/js/forza.js)), and it is honestly mostly from StackOverflow.

Every function that is adapted from a StackOverflow answer is credited, but here is a complete list:

* [Creating a date for a specific day each week](https://stackoverflow.com/a/65869347/608312).
* [Displaying a countdown to a date](https://stackoverflow.com/a/9335296/608312).
* [Calculating weeks between 2 dates](https://stackoverflow.com/a/22859920/608312).
* [Adding days to a date]( https://stackoverflow.com/a/19691491/608312)

The functions are self-explanatory, and even a not-very-good JavaScript programmer like myself can eventually figure out how they work! For example, this function ([from StackOverflow](https://stackoverflow.com/a/65869347/608312)) works out when the next season starts (next Thursday at 14:30 GMT):

```
function getNextSeasonStart(d = new Date()) {
    let thursday = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + (4 - d.getDay()), 14, 30, 0, 0));
    thursday <= d ? thursday.setDate(thursday.getDate() + 7) : null;
    return thursday;
}
```

## Plans 

I'd like to expand on the site eventually to have an actual design besides GitHub Pages' default. For now though, it's "good enough".

Additionally, currently I have to manually update the new series' title once per month. Ideally this would be automated, but I am not particularly interested in parsing the Forza team's news posts!

It would be interesting to incorporate new car unlocks & purchasable DLC into the site, but since they're so unpredictable I'm unsure how to do it efficiently. For now, the useful links to other resources will have to be enough.

## Conclusion

Overall I'm happy enough with the site, and I'll likely use it each week to check when I'll receive an update due to shifting timezones. I was surprised how easy timezones were to work with in Javascript (once I discovered `Date.UTC`), and this was a good chance to play with basic math and date functionality.

One last time, the site is at [forza.jakelee.co.uk](https://forza.jakelee.co.uk/).
