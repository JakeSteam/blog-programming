---
title: Introducing "OSRS Ironmen", a list of 150+ OSRS Ironmen YouTube Series ⚒️
author: Jake Lee
layout: post
image: /assets/images/2023/osrs-header.png
tags:
    - YouTube
    - GitHub Actions
    - OSRS
    - RuneScape
---

RuneScape is a game that creates & fosters obsessive people. I was one of them. Nowadays, these people often create "ironman" accounts, with increasing obscure and restrictive limitations. I love watching other people work hundreds of hours for a pointless goal, so I created the project "[OSRS Ironmen](https://ironmen.jakelee.co.uk/)" collating over 150 of these accounts and their progress series!

Similar to [the RuneScape Archive Project](/the-runescape-archives-mission-to-rescue-old-runescape-caches/), this is very much a "I'll start it, then the community maintains it" kind of project. To that end, I used a [2 year old list](https://www.reddit.com/r/UniqueIronmen/comments/lh5k2m/restricted_account_content_creator_compendium/) as a starting point for mine. As with my [Jerma](https://channels.jerma.io) and [Yogscast](https://yogscast.jakelee.co.uk) projects, GitHub Actions and YouTube's API provide the core functionality, however this time there are a few additions.

Before I describe the changes, the OSRS ironmen project is at: **[https://ironmen.jakelee.co.uk](https://ironmen.jakelee.co.uk)**

As usual, the codebase is [open source on GitHub](https://github.com/jakesteam/osrs-ironmen).

## Playlists not channels

As this project is about series not channels (and a single channel can have multiple series), it needs to make a different API call. 

Luckily YouTube's API is pretty simple, and I needed to use [`/youtube/v3/playlistItems`](https://developers.google.com/youtube/v3/docs/playlistItems/list) instead of [`/youtube/v3/channels`](https://developers.google.com/youtube/v3/docs/channels/list). Whilst there is a [`/playlists`](https://developers.google.com/youtube/v3/docs/playlists) call, it essentially provides the same response with less information!

I also needed to collect quite different information from the API. Instead of view counts or subscriber counts, I wanted the title, publish dates, and thumbnails of the first and last videos in the playlist. YouTube's API has excellent documentation, and even an online playground, so this was pretty easy to work out.

Additionally, I discovered `jq` can use `[-1]` to refer to the last item in an array, which is very cool. For example, `.items[0].snippet.title` provides the first video's title, and `.items[-1].snippet.title` provides the last video's title. Simple!