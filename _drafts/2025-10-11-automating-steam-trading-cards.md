---
title: How to automate farming & selling of Steam Trading Cards
image: /assets/images/banners/
tags:
  - Steam
  - Automation
---

Steam Trading Cards have been out for a _long_ time (launched in 2011!), but you probably didn't realise you likely have tens of games with earning potential just sitting in your library! Here's how to earn the cards, and sell them.

## What are cards?

In case you haven't used them much, Steam Trading Cards are inventory items earned by having eligible games open (e.g. paid games that have opted in). The cards have a few possible uses:

1. Sold on the Steam Market (what we'll be doing).
2. Crafted into cosmetic badges for your profile (this is who will be buying your cards).
3. Turned into gems for card booster packs (not worth it).

Ultimately though, all that matters is that they only require time to earn and can be sold for Steam Wallet currency. This is directly spendable on games or other inventory items, so is pretty close to just earning cash.

## Farming cards

First, it's worth checking you have unearned cards. If you only play free games, or own very few games, you may not. Since I've purchased a few game bundles over the years, I had almost 1000 unearned cards!

### Eligibility

You can check by visiting [the "Badges" page](https://steamcommunity.com/my/badges) of your Steam Community profile whilst logged in, and searching for the word "PLAY" that is shown next to eligible games:

[![Steam Trading Cards eligibility](/assets/images/2025/steam_badges_eligibility.png)](/assets/images/2025/steam_badges_eligibility.png)

### Automation overview

So, assuming you are eligible for drops, let's automate earning them. Whilst you _could_ install every eligible game and run them until the cards are earned, this is a complete waste of both your time and your machine's processing power!

By using automation software, we can instead just _report_ to Steam that the appropriate game is running. This allows you to just press start and leave your machine, using almost no system resources (12MB RAM for me) and skipping the arduous game downloading process.

Additionally, the process is optimised to factor in the variable per-game minimum time, utilising a somewhat complicated process of cycling between single and multi game idling called "[Fast Mode](https://github.com/JonasNilson/idle_master_extended/wiki/Fast-mode)" that would be very hard to perform manually.

### Idle Master Extended

There are a few automation tools available, I personally chose [Idle Master Extended](https://github.com/JonasNilson/idle_master_extended). Installing any software, especially one gaming-related, is always a risk. However, here's why I decided this was safe:

1. **The repository has 3k stars**, plus an appropriate number of forks, watches, issues, and pull requests for a project of this side. Malware will typically just have stars.
2. **The project is stable**, with no releases in 2.5 years. Considering Steam hasn't changed much in that time, this is actually a good thing!
3. **The project is mentioned often** on Reddit and other places, with all the natural [tech support questions](https://www.reddit.com/r/Steam/comments/1hpo3za/steam_idle_master_still_working/m4j7543/) and [comparison between similar tools](https://www.reddit.com/r/Steam/comments/qloexq/is_idle_master_still_safe/ki3lql9/) you would expect from real software.
4. **It looks like a developer's tool**. Completely showing my bias here, the simple nature of the UI (screenshot below) clearly indicates a utility tool, exactly what we need. It's also only 1MB big!

[ArchiSteamFarm](https://github.com/JustArchiNET/ArchiSteamFarm) is far more popular (12k stars), however the regular releases, [more complex setup process](https://github.com/JustArchiNET/ArchiSteamFarm/wiki/Setting-up), request for your [username and password(!)](https://github.com/JustArchiNET/ArchiSteamFarm/wiki/Setting-up#:~:text=next%3A%20SteamLogin%20and-,SteamPassword,-.%20You%20can%20make) and serious complexity / feature set made it unappealing. We just need a simple tool!

### Setup

Idle Master Extended [has a nice and simple guide](https://github.com/JonasNilson/idle_master_extended/wiki/Get-started) to getting started, but I'll summarise here:

1. Download the latest `idle_master_extended_vX.XX.X.zip` file [from the GitHub Releases](https://github.com/JonasNilson/idle_master_extended/releases), it'll be just over 1MB.
2. Extract the zip somewhere.
3. Run the `.exe`, it'll check Steam is running, then ask you to login.

### Logging in

Since Idle Master Extended needs to join games and monitor cards on your behalf, it needs to use your login token. This is obviously a risk, consider your own risk tolerance before proceeding. For me, it's worth it, due to the reasons listed previously.

To find them:

1. Go to <https://steamcommunity.com>.
2. Open the developer console (`F12`, or "More tools" -> "Developer tools" in Chrome).
3. Select the "Application" tab at the top.
4. Select "Cookies" under the "Storage" categories on the left, and click `https://steamcommunity.com`.
5. Look for your `sessionId` and `steamLoginSecure`.
6. Double click each in turn, and copy then paste into Idle Master Extension.

Once submitted, Idle Master Extended will log in, and say "Idle Master is connected to Steam", and look up your card eligibility.

[![Steam Community session cookies](/assets/images/2025/steam_cookies.png)](/assets/images/2025/steam_cookies.png)

### Running automation

Idle Master Extended's default settings are typically exactly what you want, and it will try to automatically begin optimised idling on program startup. However, you can also configure features like shutting down Windows when done, or dark theme, in the "File" -> "Settings" menu.

Whilst running, your friends will receive lots of game open and close notifications, so you may want to turn these off! This can be done by setting your "Game details" to "Private" in [your privacy settings](https://steamcommunity.com/my/edit/settings).

[![Steam game visibility](/assets/images/2025/steam_visibility.png)](/assets/images/2025/steam_visibility.png)

## Selling cards

## Profits
