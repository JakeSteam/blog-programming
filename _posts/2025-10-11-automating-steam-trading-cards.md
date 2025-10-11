---
title: A detailed guide to automated farming & selling of Steam Trading Cards 🧑‍🌾🎴
image: /assets/images/banners/steam-cards-banner.png
tags:
  - Steam
  - Automation
---

Steam Trading Cards have been out for a _long_ time, but you probably didn't realise you likely have tens of games with earning potential just sitting in your library. Here's how to earn and sell the cards quickly.

## What are cards?

In case you haven't used them much, [Steam Trading Cards](https://steamcommunity.com/tradingcards/) (launched in 2011) are Steam inventory items earned by having eligible games open (e.g. paid games that have opted in). The cards have a few possible uses:

1. Sold on the Steam Market (what we'll be doing).
2. Crafted into cosmetic badges for your profile (this is why people will be buying your cards).
3. Turned into gems for card booster packs (not worth it).

Ultimately though, all that matters is that they only require time to earn and can be sold for Steam Wallet currency. This is directly spendable on games or other inventory items, so is pretty close to just earning cash.

## Farming cards

First, it's worth checking that you have unearned cards. If you only play free games, or own very few games, you may not. Since I've purchased a few game bundles over the years, I had almost 1000 unearned cards!

### Eligibility

You can check your eligibility by visiting [the "Badges" page](https://steamcommunity.com/my/badges) of your Steam Community profile whilst logged in, and searching for the word "PLAY" that is shown next to eligible games:

[![Steam Trading Cards eligibility](/assets/images/2025/steam_badges_eligibility.png)](/assets/images/2025/steam_badges_eligibility.png)

### Automation overview

So, assuming you are eligible for card drops, let's automate earning them. Whilst you _could_ install every eligible game and run them until the cards are earned, this is a complete waste of both your time and your machine's processing power!

By using automation software, we can instead _report_ to Steam that the appropriate game is running. This allows you to just press start and leave your machine, using almost no system resources (12MB RAM for me) and skipping the arduous game downloading process.

Additionally, the automated process is optimised to factor in the variable per-game minimum time, utilising a somewhat complicated process of cycling between single and multi game idling called "[Fast Mode](https://github.com/JonasNilson/idle_master_extended/wiki/Fast-mode)" that would be very hard to perform manually.

### Idle Master Extended

There are a few automation tools available, I personally chose [Idle Master Extended](https://github.com/JonasNilson/idle_master_extended). Installing any software, especially one gaming-related, is always a risk. However, here's why I decided this was safe:

1. **The repository has 3k stars**, plus an appropriate number of forks, watchers, issues, and pull requests for a project of this size. Malware will typically just have stars.
2. **The project is stable**, with no releases in 2.5 years. Considering Steam hasn't changed much in that time, this is actually a good thing!
3. **The project is mentioned often** on Reddit and other places, with all the natural [tech support questions](https://www.reddit.com/r/Steam/comments/1hpo3za/steam_idle_master_still_working/m4j7543/) and [comparison between similar tools](https://www.reddit.com/r/Steam/comments/qloexq/is_idle_master_still_safe/ki3lql9/) you would expect from real software.
4. **It looks like a developer's tool**. Completely showing my bias here, the simple nature of the UI (screenshot below) clearly indicates a utility tool, exactly what we need. It's also only 1MB big!

[![Idle Master Extended running](/assets/images/2025/steam_running.png)](/assets/images/2025/steam_running.png)

_Note: [ArchiSteamFarm](https://github.com/JustArchiNET/ArchiSteamFarm) is far more popular (12k stars), however the regular releases, [more complex setup process](https://github.com/JustArchiNET/ArchiSteamFarm/wiki/Setting-up), request for your [username and password(!)](https://github.com/JustArchiNET/ArchiSteamFarm/wiki/Setting-up#:~:text=next%3A%20SteamLogin%20and-,SteamPassword,-.%20You%20can%20make) and serious complexity / feature set made it unappealing. We just need a simple tool!_

### Setup

Idle Master Extended [has a nice and simple guide](https://github.com/JonasNilson/idle_master_extended/wiki/Get-started) to getting started, but I'll summarise here:

1. Download the latest `idle_master_extended_vX.XX.X.zip` file [from the GitHub Releases](https://github.com/JonasNilson/idle_master_extended/releases), it'll be just over 1MB.
2. Extract the zip somewhere.
3. Run the `.exe`, it'll check Steam is running, then ask you to login.

### Logging in

Since Idle Master Extended needs to join games and monitor card drops on your behalf, it needs to use your login token. This is obviously a risk, consider your own risk tolerance before proceeding. For me, it's worth it, due to the reasons listed previously.

To find these details:

1. Go to <https://steamcommunity.com>.
2. Open the developer console (`F12`, or "More tools" -> "Developer tools" in Chrome).
3. Select the "Application" tab at the top.
4. Select "Cookies" under the "Storage" categories on the left, and click `https://steamcommunity.com`.
5. Look for your `sessionId` and `steamLoginSecure`.
6. Double click each in turn, and copy then paste into Idle Master Extended.

Once submitted, Idle Master Extended will log in, show "Idle Master is connected to Steam", look up your card eligibility, and start farming cards.

[![Steam Community session cookies](/assets/images/2025/steam_cookies.png)](/assets/images/2025/steam_cookies.png)

### Running

Idle Master Extended's default settings are typically exactly what you want, and it will try to automatically begin optimised idling on program startup. However, you can also configure features like shutting down Windows when done, or dark theme, in the "File" -> "Settings" menu.

[![Idle Master Extended settings](/assets/images/2025/steam_settings.png)](/assets/images/2025/steam_settings.png)

Whilst running, your friends will receive lots of game open and close notifications, so you may want to turn these off! This can be done by setting your "Game details" to "Private" in [your privacy settings](https://steamcommunity.com/my/edit/settings).

[![Steam game visibility](/assets/images/2025/steam_visibility.png)](/assets/images/2025/steam_visibility.png)

And now... you wait!

Cards drop at random intervals, so it's hard to gain detailed estimates for the number of cards per hour. For me personally, I've used the tool for 6 days at around 12-16 hours a day (autorunning whenever my laptop is on), and have gone from 867 cards remaining to 488. If we estimate running for 14 hours a day, so 84 hours total, we get an **average 4.2 cards earned per hour**!

|                                                        4th October                                                        |                                                          10th October                                                          |
| :-----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| [![Idle Master Extended running initially](/assets/images/2025/steam_running.png)](/assets/images/2025/steam_running.png) | [![Idle Master Extended running a week later](/assets/images/2025/steam_running2.png)](/assets/images/2025/steam_running2.png) |

## Selling cards

Okay, so we've got some free cards, what do we do with them? Sell them!

Whilst you can do this step automatically, it's fairly slow to manually set an appropriate price for a few hundred items. Instead, we're again going to rely on a "userscript" to do the heavy lifting for us.

### Preparing to sell

Unfortunately, the tool we want to use can't be run on Chrome. Instead, you'll need to use Firefox, Brave, or whatever other browser you want to use. I used Firefox.

1. Install a _userscript manager_, I used [Tampermonkey](https://addons.mozilla.org/en-GB/firefox/addon/tampermonkey/) since it's been widely used for a _very_ long time. "[Violentmonkey](https://violentmonkey.github.io/)" is an alternative.
2. Install [Steam Economy Enhancer](https://github.com/Nuklon/Steam-Economy-Enhancer) by tapping "Install Steam Economy Enhancer", then "Install" (next to Cancel).
3. Open up [your Steam inventory](https://steamcommunity.com/my/inventory), and you should see a new "Sell All Cards" button among others!
4. Additionally, market prices for your cards will start loading and being displayed:

[![Steam inventory](/assets/images/2025/steam_inventory.png)](/assets/images/2025/steam_inventory.png)

_Note: There is also an extension "Steam Inventory Helper" with more advanced functionality, however it is full of shady adverts, wants quite extensive permissions, and has [overgathered data before](https://www.reddit.com/r/GlobalOffensive/comments/70xofs/warning_trusted_steam_inventory_helper_now/). I don't recommend it!_

### Selling

Tap "Sell All Cards" and... it'll start! There's also a "Sell All Items" option, but obviously don't tap this if you have things you don't want to sell (backgrounds, emotes, etc).

Once tapped, it'll run through every marketable item you own, and tell you the sale price and your earnings after Valve & the game's commission (typically 1-2 pennies / cents per item). These cards won't sell immediately, as most already have thousands listed. Instead, a few sales will trickle through every day as older sales are processed and your listings move closer to the front.

[![Steam automated selling](/assets/images/2025/steam_selling.png)](/assets/images/2025/steam_selling.png)

_Note: Sometimes this process gets "stuck" due to a failed request. Refreshing the page and tapping "Sell All Cards" again continues from where it paused._

### Confirming

_However_, there might be another reason the cards don't sell: You haven't confirmed them yet! Depending on your Steam Guard settings, you may need to approve every marketplace listing on your phone, a feature implemented to protect expensive items but a bit silly for hundreds of cheap ones.

Open up Steam on your phone, go to your notifications, tap "X pending confirmations", and tap every single confirmation one at a time. Whilst there are ways to automate this (setting up your browser as a 2-factor device), for me personally this risked account security too much. As such, I just did it manually.

[![Steam mobile confirmations](/assets/images/2025/steam_mobile-thumbnail.jpg)](/assets/images/2025/steam_mobile.jpg)

_Note: The app lags quite significantly when accepting lots of confirmations at once. Be patient, it'll get there!_

## Profitability

So how much will you actually earn from this?

Each game will drop you half the cards needed for a badge (typically between 5 and 10), so 3-5 cards per game is a reasonable estimate. Cards for popular games will usually sell for between £0.04 and £0.07 depending on the game and number of cards in a set, resulting in a post-commission amount of £0.02 to £0.05. So, around £0.05-£0.15 per eligible game, which sounds pretty bad until you consider...

1. **Foil cards**: In addition to regular cards, you will sometimes find foil cards. These are usually worth 3-10x as much, with some obscure games having zero listed so you can name your own price in case someone is desperate to complete a collection!
2. **Obscure games**: For games with few players, the card price will be much higher (although liquidity will be lower). For example, in "Arcade Spirits", my [regular card](https://steamcommunity.com/market/listings/753/910630-QueenBee) is worth £0.12, whilst [my foil card](<https://steamcommunity.com/market/listings/753/910630-Teo%20(Foil)>) has no accepted price.
3. **Booster packs**: Once you have collected all the cards for a game, you are eligible for a [booster pack](https://steamtradingcards.fandom.com/wiki/Booster_Packs). These are essentially blind boxes with 3 cards in, however they can be sold directly too (and this is usually slightly better profit than opening).

The random nature of foil cards and booster packs makes getting an average profit essentially impossible. However, I would personally **estimate around £0.13 per game** once all lucky drops are factored in.

So, for my 250 eligible games, I'd expect to receive around **£30**. Not bad for running some automated tools!

## Is it allowed?

I guess technically not? However, is it enforced? Definitely not.

Valve have historically been very, very lenient with automation around the Steam platform (hence [Team Fortress 2 trading bots](https://scrap.tf/about), [Steam Achievement Manager](https://github.com/gibbed/SteamAchievementManager) operating since 2008, and many more examples!), only stepping in when automation is _disadvantaging_ other users (or Valve). In this case, we're adding more cards into the economy, helping supply cards for rarely played games, and of course making Valve & the game companies at least £0.01 per sale!

Additionally, the card drops are part of the perks of purchasing on Steam, so you've already paid for them. The automation just makes the farming much easier.

Whilst it's obviously impossible to say the tools recommended in this post are _safe_, it's worth observing how their subreddits / discussions / GitHub issues don't include [any mentions of bans](https://github.com/JonasNilson/idle_master_extended/issues?q=is%3Aissue%20ban) whatsoever despite tens of thousands of users.

## Conclusion

With both the farming and selling stages requiring ~2 minutes setup work each, then just letting them run, getting the most out of your purchased games seems like a win-win for everyone (you, badge hunters, Valve, game publishers). I'd highly recommend this process to anyone with a substantial library, however obviously assess the risks yourself before starting.

Happy farming! 🧑‍🌾🎴
