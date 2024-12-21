---
title: Rapidly improving Play Store rating with an Android in-app review prompt helper (from 2.0 to 4.3 in 9 days!)
image: /assets/images/banners/rating-browser.png
tags:
  - Android
  - Play Store
  - Kotlin
---

I recently worked on an app that had been rated between 1 and 2 stars for months, despite no major issues. The solution? In-app rating prompts!

All code in this article [is available as a GitHub Gist](https://gist.github.com/JakeSteam/c09c7bd980095a8a26649419d49d393e).

## Play Store Rating

Like a lot of people, I rely on an app's Play Store rating as a rough indicator of quality / trustworthiness. Typically, anything below 4 stars needs a closer look, but above is probably fine. Despite this, the app I spend most of my time on was rated 2.0! Time to fix that.

### Why was the rating so low?

Historically, the app had a number of pretty severe problems. This included features not working, instability, unresponsive UI, etc. All of this resulted in an abysmal **rating of 1.4 in February 2024**.

Since the app typically received just 2 - 5 reviews a week, almost all were from unhappy customers!

By steadily working through hundreds of raised bugs, aggressively improving stability by fixing _every_ identified crash (currently 99.97% crash-free users!), and constantly improving overall quality, this slowly started improving. 9 months later, the app had steadily increased to a **rating of 2.0 in November 2024**, primarily by reducing the quantity of 1-star reviews.

On Google Play Console, under Monitor and Improve -> Ratings and Reviews -> Ratings, the number of ratings and rating distribution can be seen.

[![](/assets/images/2024/rating-perdayearly.png)](/assets/images/2024/rating-perdayearly.png)

Whilst this was a big improvement (the minimum is 1 star, so the number of non-1-star reviews was actually 4x higher!), it was nowhere near my acceptable level: 4.0+.

### What happened to the rating?

Reducing the number of 1-star reviews helped, but you know what would help even more? A flood of 5-star reviews! Continuing to receive feedback from unhappy customers is expected, and appreciated, so long as the thousands of satisfied customers are heard too.

Looking at a chart of number of ratings over the past 3 months explains what happened. Instead of an occasional rating, literally hundreds of 4 and 5-star reviews flooded in, solving the problem within a couple of weeks:

[![](/assets/images/2024/rating-perday.png)](/assets/images/2024/rating-perday.png)

With a regular release schedule, the per-version average rating can also be used to check which is responsible for the flood of reviews. It might be the version with at least 30x as many reviews as any other!

[![](/assets/images/2024/rating-perversion.png)](/assets/images/2024/rating-perversion.png)

### How was the rating improved?

With [Google's In-App Review Prompt library](https://developer.android.com/guide/playcore/in-app-review)!

By prompting _happy_ users with a very low-friction way to express their satisfaction, gathering high volumes of positive reviews was surprisingly painless. Google's diagram describes the flow well:

[![](/assets/images/2024/rating-googleflow.jpg)](/assets/images/2024/rating-googleflow.jpg)

The app itself has _no direct control or observability_ of this rating prompt. Instead, it asks Google's library to show the prompt if possible, and receives a callback when the prompt is finished. There are many, many, many reasons the callback might be called, all intentionally hidden from the app:

1. Rating prompt not shown because app was not installed from the store.
2. Rating prompt not shown because the user has already rated the app.
3. Rating prompt shown, user dismissed.
4. Rating prompt shown, user rated and submitted.

All of this is to ensure apps can't reward (or punish!) the user based on their rating, or whether they rated at all. This is a good thing, and also means the app doesn't need to worry about all the various outcomes!

Instead, the app just needs to _ask to show_ the prompt, and _receive the callback_ when it's finished. This [isn't too complicated](https://developer.android.com/guide/playcore/in-app-review/kotlin-java), but I created a `ReviewPromptHandler` wrapper to drastically simplify usage.

I defined a few specific triggers where the prompt would be shown if possible, specifically at moments where customers are engaged and have positive sentiment (e.g. clicking "Look at upgrade" after winning an auction).

## Review Prompt Handler

So, why add complexity to a fairly simple to use library? Well, there are a few requirements in my use case to keep customers, Google, and other developers in the codebase happy!

### Requirements

1. **Simple to use**: Any ViewModel that wants to display a review prompt shouldn't need to keep track of the request status, handle errors etc. It should just be able to request the prompt's appearance, and optionally pre-load.
2. **Remotely configurable triggers**: I want to be able to remotely control where this prompt appears. For example, I may want to disable it appearing after a successful bud due to some unrelated technical issue.
3. **Triggered on button click or without specific interaction**: The review prompt should be triggerable by a variety of trigger types`^`.
4. **Able to remotely disable**: In case there's some catastrophic issue in Google's library, I want the ability to ensure it isn't relied upon at all if there's no enabled triggers.
5. **Requests aren't spammed**: Whilst Google [doesn't explicitly state quotas](https://developer.android.com/guide/playcore/in-app-review#quotas), they do say:
   1. "_To provide a great user experience, Google Play enforces a time-bound quota on how often a user can be shown the review dialog._"
   2. "_Because the quota is subject to change, it's important to apply your own logic and target the best possible moment to request a review._"

`^`: Note that Google advises "_you should not have a call-to-action option (such as a button) to trigger the API, as a user might have already hit their quota and the flow won’t be shown_", this is **not applicable** here since we're using a callback to still perform the button's usual function, not a dedicated CTA button!

Okay, pretty sensible requirements. How can they be all be implemented?

### Handler flow

This is a quite technical diagram (it's taken from my PR for the feature!), however it does show the main paths through the handler and prompt.

To clarify the 3 coloured sections:

- **Yellow**: The rest of the app, usually the calling `ViewModel`. It knows almost nothing, and just calls functions.
- **Green**: The `ReviewPromptHandler.kt` described in the next section. This abstracts all the complexity way, and is the only class that interfaces with the in-app review prompt library.
- **Blue**: Google's in-app review prompt library, where all decision-making is intentionally obfuscated from the calling codebase.

[![](/assets/images/2024/rating-flow.png)](/assets/images/2024/rating-flow.png)

As shown, the review prompt handler is going to have 2 callable functions (ignoring any initialisation), where `ReviewPromptTrigger` is a simple enum:

```
fun prepareReviewPrompt(trigger: ReviewPromptTrigger)
fun showReviewPrompt(trigger: ReviewPromptTrigger, callback: () -> Unit = {})
```

### Handler code

The full code [is available as a GitHub Gist](https://gist.github.com/JakeSteam/c09c7bd980095a8a26649419d49d393e), read on for an explanation.

#### Initialisation

Unfortunately, the library requires a `Context` to initialise (I used `Application`), and an `Activity` to display the prompt (I used my `MainActivity`).

This means a bit of non-ideal boilerplate and references to `Activity`:

```
@Singleton
class ReviewPromptHandler @Inject constructor(
    application: Application,
    private val remoteConfigManager: RemoteConfigManager
) {
    private val reviewManager = ReviewManagerFactory.create(application)
    private var activity: Activity? = null
    ...
    fun setActivity(activity: Activity) {
      this.activity = activity
    }
```

#### Remote triggers

As mentioned, I want to be able to remotely configure my triggers. To implement this, I have a local enum of possible trigger points:

```
enum class ReviewPromptTrigger(val remoteName: String) {
    BID_MADE("BID_MADE"),
    BUN_PURCHASED("BUN_PURCHASED"),
    TICKET_PURCHASED("TICKET_PURCHASED")
}
```

Then, I'm using Firebase Remote Config (any other remote value fetcher is fine) with a comma-separated `review_prompt_triggers` (e.g. `BID_MADE,TICKET_PURCHASED`). By checking the passed `ReviewPromptTrigger` is in the list of enabled triggers, remote control over the prompt is supported.

Additionally, I only want to prompt for the same trigger _once per session_, so I have a list of triggers that have fired.

```
private val triggersThisSession = mutableListOf<ReviewPromptTrigger>()

private fun shouldShow(trigger: ReviewPromptTrigger): Boolean {
    if (triggersThisSession.contains(trigger)) {
        return false
    }
    return remoteConfigManager.getString(review_prompt_triggers)
        .split(",")
        .map { it.trim() }
        .contains(trigger.remoteName)
}
```

#### Pre-caching review prompt

Google's advice on when to prepare a review prompt object is a little vague. Essentially you should request it before you ask the user, but it expires eventually:

> Note: The `ReviewInfo` object is only valid for a limited amount of time. Your app should request a `ReviewInfo` object ahead of time (pre-cache) but only once you are certain that your app will launch the in-app review flow.

In my scenario, I pre-cache when the checkout flow starts, since this will typically result in a successful checkout (where the prompt will be used).

Using our `shouldShow` function from earlier, we request a review flow object and store the result in memory:

```
fun prepareReviewPrompt(trigger: ReviewPromptTrigger) {
    preparedReviewPrompt = null
    if (!shouldShow(trigger)) {
        return
    }

    reviewManager.requestReviewFlow().addOnCompleteListener { request ->
        if (request.isSuccessful) {
            preparedReviewPrompt = request.result
        }
    }
}
```

#### Displaying review prompt

Finally, we can put this all together and actually show a prompt! I also decided to support the scenario where the caller didn't have an opportunity to call `prepareReviewPrompt`.

This means there's 2 flows (one with pre-caching (`launchReviewPrompt`), one without (`prepareAndLaunchReviewPrompt`)). If there's no pre-caching, we fetch the review prompt object now instead, then display it once fetched. The trigger should also be added to the in-memory blacklist to avoid excessive requests.

We also _must_ call the passed in `callback` no matter what happens, otherwise the user will get stuck on their current screen!

```
fun showReviewPrompt(trigger: ReviewPromptTrigger, callback: () -> Unit = {}) {
    val activity = activity
    if (!shouldShow(trigger) || activity == null) {
        callback()
        return
    }

    triggersThisSession.add(trigger)
    preparedReviewPrompt?.let {
        launchReviewPrompt(activity, it, callback)
    } ?: prepareAndLaunchReviewPrompt(activity, callback)
}

private fun prepareAndLaunchReviewPrompt(activity: Activity, callback: () -> Unit) {
    reviewManager.requestReviewFlow().addOnCompleteListener { request ->
        if (request.isSuccessful) {
            launchReviewPrompt(activity, request.result, callback)
        } else {
            Log.i("ReviewPromptHandler", "Failed to prepareAndLaunchReviewPrompt")
            callback()
        }
    }
}

private fun launchReviewPrompt(activity: Activity, reviewInfo: ReviewInfo, callback: () -> Unit) {
    reviewManager.launchReviewFlow(activity, reviewInfo).addOnCompleteListener {
        if (!it.isSuccessful) {
            Log.i("ReviewPromptHandler", "Failed to launchReviewPrompt")
        }
        callback()
    }
}
```

#### Calling the handler

Finally, our handler is ready to use!

Assuming `ReviewPromptHandler` has been injected or initialised, the `TicketPurchaseViewModel` prepares the prompt when checkout flow starts:

```
reviewPromptHandler.prepareReviewPrompt(ReviewPromptTrigger.TICKET_PURCHASED)
```

Then, when a prompt should be shown if possible (e.g. on button click), the `Fragment` passes in the normal post-button press action into the `ViewModel`:

```
val navToBookings: () -> Unit = {
    findNavController().navigate(TicketFragmentDirections.toBookings())
}
...
when (event) {
    is TicketConfirmationEvents.OnLookAtMyTicket -> {
        viewModel.onLookAtMyTicket(navToBookings)
    }
```

Where the `ViewModel`'s `onLookAtMyTicket` just calls `ReviewPromptHandler` with the correct `ReviewPromptTrigger`:

```
fun onLookAtMyTicket(navigation: () -> Unit) {
    reviewPromptHandler.showReviewPrompt(ReviewPromptTrigger.TICKET_PURCHASED, navigation)
}
```

### How to test

Similar to testing whilst [implementing Google's force upgrade library](/googles-force-update-android-app-library/), this can't be tested easily on your local machine, and must be obtained via the Google Play Store.

Thankfully, it's far easier to test than force upgrade! Note that due to the "black box" of the library, you might not see the prompt despite following all the steps. Additionally, once you've seen _one_ prompt, you likely won't see any others.

1. Prepare a build, and upload it to Google Play Console internal app sharing.
2. Uninstall your app from your device.
3. Add your device's primary email address to the "In-app review testing" list on Google Play Console.
4. Open Google Play Console's internal app sharing link on your device.
5. Install the app from this link.
6. Click your triggers, and make sure your `callback` actually happens (far more important than the review prompt appearing).

You'll see slightly different messages when testing via internal app sharing vs a production app:

|                                  Internal app sharing                                   |                                   Production                                    |
| :-------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| [![](/assets/images/2024/rating-internal.png)](/assets/images/2024/rating-internal.png) | [![](/assets/images/2024/rating-prod.png)](/assets/images/2024/rating-prod.png) |

_Note: The oddly zoomed-in app icon happens on my device for all prod apps, presumably it's a Google / Samsung issue!_

## Extra notes

### Monitoring store rating

To keep an eye on my app's rating, I checked into the console once or twice a day.

Whilst [there is a Google Play Console app](https://play.google.com/store/apps/details?id=com.google.android.apps.playconsole) (which is rated 2.8!), and it has attractive data visualisations, the data updates are painfully slow. The data was typically 12 hours _behind_ Google Play Console web, which is _itself_ 12-24 hours behind!

The main number is the "Default Google Play rating" on the "Ratings" screen:

[![](/assets/images/2024/rating-ratingsummary.png)](/assets/images/2024/rating-ratingsummary.png)

However, the app is the only way to see charts of Google Play rating and many other KPIs (Key Performance Indicators) over time:

|                                                Overview                                                 |                                             Specific metric                                             |                                                KPI list                                                 |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/rating-screenshot1-thumbnail.jpg)](/assets/images/2024/rating-screenshot1.jpg) | [![](/assets/images/2024/rating-screenshot2-thumbnail.jpg)](/assets/images/2024/rating-screenshot2.jpg) | [![](/assets/images/2024/rating-screenshot3-thumbnail.jpg)](/assets/images/2024/rating-screenshot3.jpg) |

### Speed of increase

Whilst Google Play Console does have an "Average rating over time" chart, this won't match up with your displayed store rating due to how Google weights reviews based on time.

As such, I had to manually keep a note each day of the rating! Once the version with review prompting was rolled out to 100% (12th December), the rating improved by 0.1 to 0.5 per day(!):

- 19/11/24: **2.088**
- 09/12/24: **2.187**
- 11/12/24: **2.249**
- 12/12/24: **2.327**
- 13/12/24: **2.719**
- 14/12/24: **2.819**
- 15/12/24: **3.335**
- 16/12/24: **3.796**
- 17/12/24: **3.922**
- 18/12/24: **4.082**
- 19/12/24: **4.145**
- 20/12/24: **4.317**

An increase from 2.2 to 4.3 in just 9 days is absolutely amazing, and far exceeded my expectations for this project!

### Cached rating

A rapid rise in rating for a well-established app is pretty unusual, so other services will take multiple weeks to notice this rating has changed.

For example, whilst the store itself currently shows 4.3 for Seatfrog, Google Search shows a rating from around July!

[![](/assets/images/2024/rating-googleresults.png)](/assets/images/2024/rating-googleresults.png)

## Conclusion

Adding an in-app review rating prompt had an unbelievably rapid improvement to my app's rating.

I'd absolutely recommend adding a prompt to pretty much any app, with the resulting rating essentially depending on how well you pick your triggers. If you prompt whilst the user is frustrated, putting a pop-up in their face is going to make things even worse!

I see in-app review prompts pretty regularly for other apps, however they are usually implemented in a seemingly untargeted way. For example, 2 I saw recently were obviously triggered by the number of times the app has been opened, when I didn't have a particular positive sentiment and was trying to complete a task.

Whilst I did begin working on an "after X days" prompt, I eventually decided a smarter implementation was prompting _less often_ but in a _more targeted_ way. It seems to have been the correct call, with almost every review being 5-star.

As I write the first draft of this article, the app is sitting around 4.3. However, the rise is so rapid that I'm going to hold off until it reaches the expected final value (based on average rating) of 4.8. Fingers crossed!

One last time, all code used is available on GitHub: <https://gist.github.com/JakeSteam/c09c7bd980095a8a26649419d49d393e>
