---
title: Introducing "OSRS Ironmen", a list of 150+ OSRS Ironmen YouTube Series ⚒️
image: /assets/images/2023/osrs-header.png
tags:
    - YouTube
    - GitHub Actions
    - OSRS
    - RuneScape
---

RuneScape is a game that creates & fosters obsessive people: I was one of them! Nowadays, many create "ironman" accounts, with obscure and restrictive limitations. To keep track, I created "[OSRS Ironmen](https://ironmen.jakelee.co.uk/)" collating over 150 of these accounts and their progress videos.

Similar to [the RuneScape Archive Project](/the-runescape-archives-mission-to-rescue-old-runescape-caches/), this is intended as a "I'll start it, then the community maintains it" kind of project. To that end, I used a [2 year old list](https://www.reddit.com/r/UniqueIronmen/comments/lh5k2m/restricted_account_content_creator_compendium/) as a starting point. As with my [Jerma](https://channels.jerma.io) and [Yogscast](https://yogscast.jakelee.co.uk) projects, GitHub Actions and YouTube's API provide the core functionality, however this time there are a few changes. As usual, the codebase is [open source on GitHub](https://github.com/jakesteam/osrs-ironmen).

Before I describe the changes, the OSRS ironmen project is at: **[https://ironmen.jakelee.co.uk](https://ironmen.jakelee.co.uk)**

## Overview

I have [previously written](/fetching-youtube-metadata-in-github-actions-and-persisting/) an in-depth technical write-up about my similar projects. Essentially:
1. There is [a list](https://github.com/JakeSteam/osrs-ironmen/blob/main/automation/playlists.txt) of categorised playlist IDs & their names.
2. Once a day (or whenever the list changes), a script runs that reads this list.
3. The script asks YouTube's API for metadata about each playlist ID, formats the data, and displays it.
4. This list also includes category headers, which are used to manage table headers too.
5. All of this data is merged with [a template](https://github.com/JakeSteam/osrs-ironmen/blob/main/automation/template.md) into [README.md](https://github.com/JakeSteam/osrs-ironmen/blob/main/README.md), served to [the site](https://ironmen.jakelee.co.uk) via GitHub Pages.

[![](/assets/images/2023/osrs-overview.png)](/assets/images/2023/osrs-overview.png)

## Changes

### Playlists not channels

As this project is about series not channels (and a single channel can have multiple series), it needs to make a different API call. 

Luckily YouTube's API is pretty simple, and I needed to use [`/youtube/v3/playlistItems`](https://developers.google.com/youtube/v3/docs/playlistItems/list) instead of [`/youtube/v3/channels`](https://developers.google.com/youtube/v3/docs/channels/list). Whilst there is a [`/playlists`](https://developers.google.com/youtube/v3/docs/playlists) call, it essentially provides the same response with less information!

I also needed to collect quite different information from the API. Instead of view counts or subscriber counts, I wanted the title, publish date, and thumbnail of the first and last videos in the playlist. YouTube's API has excellent documentation, and even an online playground, so this was pretty easy to work out.

Additionally, I discovered `jq` can use `[-1]` to refer to the last item in an array, which is very cool. For example, `.items[0].snippet.title` provides the first video's title, and `.items[-1].snippet.title` provides the last video's title. Simple!

### Subcategories

Whilst past projects have had a few categories, this project needed a total of 5 categories with 17 subcategories! This required a few minor changes around how headers were handled, to ensure tables were only created for subcategories.

[![](/assets/images/2023/osrs-categories.png)](/assets/images/2023/osrs-categories.png)

### Toggling image visibility

Originally, displaying thumbnails was a nice visual feature. However, as the list grew, they made the page far too long and hard to parse. 

To solve this, I wanted a way to hide all images by default, then let the user press a button to make them appear again. I tried a few different approaches, but I had somewhat unusual requirements:
1. All images should be invisible initially, with no brief visibility.
2. Images shouldn't require any special CSS / classes, since then I wouldn't be able to use simple Markdown.
3. It should be as simple and concise as possible.

Luckily, I found [this solution](https://stackoverflow.com/a/30212168/608312) that uses an ingenious approach:
* A CSS rule hides all image elements inside any element with the class `hide`.
* The `body` element of the entire page has the `hide` class by default.
* Pressing the toggle button will remove or add the `hide` class from `body`.

This solution was very efficient, and meant minimal code: [3 lines of CSS](https://github.com/JakeSteam/osrs-ironmen/blob/main/css/tweaks.css#L5), [3 lines of JS](https://github.com/JakeSteam/osrs-ironmen/blob/main/js/image_hiding.js), and a tiny change to [the layout HTML](https://github.com/JakeSteam/osrs-ironmen/blob/main/_layouts/default.html#L13). 

| Images visible | Images hidden |
| --- | --- |
| [![](/assets/images/2023/osrs-images-shown-thumbnail.png)](/assets/images/2023/osrs-images-shown.png) | [![](/assets/images/2023/osrs-images-hidden-thumbnail.png)](/assets/images/2023/osrs-images-hidden.png) |

## Future improvements

Whilst I'm happy with the project so far, it definitely has a lot of improvements that could be made. Most aren't impossible, but would require a fair bit of work to get working smoothly! 

Luckily, as the project is open source, there's always a chance someone else with more JS / Shell experience might contribute. Here are the main categories of possible improvements:

### Data presentation

* **Sort all**: Whilst the categorisation is good, there's no way to view the most recent video overall, or the longest playlists. Fixing this would require some sort of "alternate view", perhaps built up at the same time and hidden, like thumbnails are.
* **Sort by # videos**: Currently, the playlist's nickname is shown before the number of videos. This makes it impossible to sort by number of videos, which might be a desired feature.
* **"Controls"**: The controls section is pretty messy, and the actual options (sorting columns, toggling thumbnails) aren't intuitive. Fixing this requires some thinking about user experience, a weak area of mine!

[![](/assets/images/2023/osrs-controls.png)](/assets/images/2023/osrs-controls.png)

### Data availability

* **View count**: Currently, there is no information on the views of a playlist / video, making popularity hard to guess. Fixing this would require making an additional API call either to the video endpoint for the first video, or the channel itself. The playlist views themself do not seem available via the API whatsoever.
* **Video length**: Currently, only video title, date, URL, and thumbnail are available. Fetching *any* additional information (such as length) would require an additional API call per video.

### Other

* **Easier playlist submission**: Whilst I'm very happy that one PR has already been raised & merged, so far most submissions have come via reddit ([r/ironscape](https://www.reddit.com/r/ironscape/comments/1734ixb/hello_snowfl_ironmen_ive_created_an_adfree_open/) & [r/uniqueironmen](https://www.reddit.com/r/UniqueIronmen/comments/17341oa/hello_snowflakes_ive_created_an_adfree_open/)) or email. This is fine, but not scalable. There should be some sort of publicly editable list of "pending" playlists.
* **Automatic table of contents**: Currently, the list of subcategories is manually updated. It should be generated, just as the table of contents in this article is. 
* **Private video handling**: Currently, private videos don't *break*, but they don't show a title or thumbnail so look weird. Fixing this would require looking back through previous playlist videos to find a public one.
* **50 video maximum**: Currently, only the first 50 videos of a playlist are loaded (and a warning shown), since that's the most YouTube's API returns in one call. Fixing this would require implementing pagination:

[![](/assets/images/2023/osrs-too-many.png)](/assets/images/2023/osrs-too-many.png)

## Conclusion

Overall this has been a fun little project, and I'm optimistic others will find it useful!

I learnt a couple of new JavaScript tricks (e.g. [toggling image visibility](#toggling-image-visibility)), and am so, so pleased with how positive the feedback on Reddit was. Eventually I'll post it on the bigger r/2007scape subreddit, maybe after a bit more polish.

The next steps are:
1. Figure out a way to stop being a bottleneck for new playlist discovery. Becoming a pinned / word-of-mouth recommended post in ironmen communities would help.
2. Implement the higher priority improvements. To me, these are:
    1. Alternate "uncategorised" view to allow sorting all.
    2. Pagination, removing the 50 video limit.
    3. Adding subscriber or view counts, to get an idea of popularity. 
3. Get other technical people to make improvements, to let the project evolve without me. 

It's been perhaps 10 years since I've logged onto RuneScape, surely my interest in it will fade soon, right?!
