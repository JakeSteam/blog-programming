---
title: How to force update (& test) your Android app using Google's in-app update library
image: /assets/images/2024/
tags:
  - Android
  - Kotlin
---

Earlier this year, I needed to add the ability to force update users of an app. Whilst I've used custom solutions in the past, Google has a standardised "[in-app updates](https://developer.android.com/guide/playcore/in-app-updates)" library that does all the essentials for you!

This article will assume Kotlin is used, if you require Java just remove the `ktx` dependency and adjust the provided code. All code used in this article is [available as a GitHub gist](https://gist.github.com/JakeSteam/437b1085b9639061955157776911697a).

## Scenario

The ability to force a user to update their app is something that seems pointless... until it's suddenly essential. This might be due to shutting down an outdated or insecure endpoint, a particularly bad bug in older versions, or even just the desire for customers to experience new features.

Regardless of the exact reason for a future force update, it's a core piece of functionality for any app from the very beginning.

Whilst the in-app library [does support optional ("Flexible") updates](https://developer.android.com/guide/playcore/in-app-updates#flexible), this article will just cover [required ("Immediate") updates](https://developer.android.com/guide/playcore/in-app-updates#immediate). They're self-explanatory, below are Google's representative images:

|                                   Flexible / Optional update                                    |                                    Immediate / Required update                                    |
| :---------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/inapp-flexible-thumbnail.png)](/assets/images/2024/inapp-flexible.png) | [![](/assets/images/2024/inapp-immediate-thumbnail.png)](/assets/images/2024/inapp-immediate.png) |

## Preparing your app

Unsurprisingly, the library needs to be added to your app! I'm using [version catalogs](https://developer.android.com/build/migrate-to-catalogs) and [Kotlin DSL](https://developer.android.com/build/migrate-to-kotlin-dsl) for Gradle, if you're using Groovy or defining dependencies in a more classic way that works fine too:

### Defining the dependency

Inside my `libs.versions.toml`, I add the latest version of the library & `ktx` version ([2.1.0 at time of writing](https://developer.android.com/guide/playcore#java-kotlin-in-app-update)):

```toml
[versions]
android-playAppUpdate = '2.1.0'

[libraries]
android-playAppUpdate = { module = "com.google.android.play:app-update", version.ref = "android-playAppUpdate" }
android-playAppUpdateKtx = { module = "com.google.android.play:app-update-ktx", version.ref = "android-playAppUpdate" }
```

### Using the dependency

Inside any module that you want to be able to force an update from, add the dependencies:

```kts
dependencies {
    implementation(libs.android.playAppUpdate)
    implementation(libs.android.playAppUpdateKtx)
}
```

## Preparing a wrapper

Whilst [there is documentation](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#update-availability) on calling the library, I found it painful to follow. All you're actually doing is:

1. Checking if an update is available.
2. If it is, display the force update dialog.

That's it! There's complexity added due to the messy callback structure of the library, but this can all be abstracted away.

My wrapper is essentially the same as the official documentation, with a bit of function extracting etc for readability and simplicity. I'll break down the components, feel free [to just look at the full code](https://gist.github.com/JakeSteam/437b1085b9639061955157776911697a#file-forceupdatehandler-kt).

### Handling the upgrade dialog's result

Somewhat counterintuitively, we'll look at the _final_ step first.

Once the force update dialog has been shown, our app [will receive a callback](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#status-callback). We'll just do basic logging for now in most scenarios, except if the user somehow cancels / closes our dialog. This is a mandatory update, so we'll pass in `activity.finish()` as a callback to close our app if this happens!

```kotlin
    handleUpdateResult(result) {
        activity.finish()
    }

    ...

    private fun handleUpdateResult(result: ActivityResult, onUpdateDialogClose: () -> Unit) {
        when (result.resultCode) {
            Activity.RESULT_OK -> Timber.i("User has started mandatory update")
            Activity.RESULT_CANCELED -> onUpdateDialogClose.invoke()
            RESULT_IN_APP_UPDATE_FAILED -> Timber.i("Mandatory update failed")
            else -> Timber.i("Error whilst updating (${result.resultCode}): ${result.data?.data}")
        }
    }
```

### Displaying the force update dialog

Again, working backwards, we need to actually display the dialog assuming all conditions have been met.

We can just use a wrapper around the library's `startUpdateFlowForResult` function, where `activityResultLauncher` is essentially a container with our `handleUpdateResult` from earlier.

```kotlin
    private fun startForceUpdateFlow(
        appUpdateInfo: AppUpdateInfo,
        activityResultLauncher: ActivityResultLauncher<IntentSenderRequest>,
        appUpdateManager: AppUpdateManager
    ) {
        appUpdateManager.startUpdateFlowForResult(
            appUpdateInfo,
            activityResultLauncher,
            AppUpdateOptions.newBuilder(IMMEDIATE).build()
        )
    }
```

### Deciding if dialog should be shown

Finally we come to the first step, determining whether the dialog actually needs displaying!

This is where the library really shines, boiling down all the complexity of checking if an update is required into a single function that returns a `AppUpdateInfo`. There's a couple of helper functions to simplify the logic, and you should recognise our `handleUpdateResult` and `startForceUpdateFlow` functions.

The final core logic is very readable, simply "if update is in progress or an update is required, display the force update dialog". Note that resuming an in progress update [is the recommended behaviour](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#status-callback).

```kotlin

    fun forceUpdateIfNeeded(activity: ComponentActivity) {
        // Must be declared before activity is resumed: https://stackoverflow.com/a/67582633/608312
        val activityResult = activity.registerForActivityResult(ActivityResultContracts.StartIntentSenderForResult()) { result ->
            handleUpdateResult(result) {
                activity.finish()
            }
        }
        val appUpdateManager = AppUpdateManagerFactory.create(activity)
        val appUpdateInfoTask = appUpdateManager.appUpdateInfo

        appUpdateInfoTask.addOnSuccessListener { updateInfo ->
            if (updateInfo.isUpdateInProgress() || updateInfo.isForceUpdateRequired()) {
                startForceUpdateFlow(updateInfo, activityResult, appUpdateManager)
            }
        }
    }

    private fun AppUpdateInfo.isUpdateInProgress() =
        updateAvailability() == DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS

    private fun AppUpdateInfo.isForceUpdateRequired() =
        updateAvailability() == UPDATE_AVAILABLE && isUpdateTypeAllowed(IMMEDIATE)
```

### Remotely control the minimum version

The force update flow now works!

However, we need the ability to remotely control which versions should be force updated. There are two built-in methods for controlling this, but **we'll use Firebase Remote Config instead** (any remote value system works fine). The built-in options are:

1. Determine update behaviour based on [how old the user's app version is](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#update-staleness). This wasn't suitable for me as I only wanted to force update in specific circumstances.
2. Set `inAppUpdatePriority` via the Google Play Developer API, then determine update behaviour in-app based on [the priority value](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#update-priority). This wasn't suitable for me as I wanted a simpler way of setting the version to upgrade from, and for all the logic to be remote. Additionally, the value can only be set [on initial rollout](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#update-staleness:~:text=Priority%20can%20only%20be%20set%20when%20rolling%20out%20a%20new%20release%20and%20cannot%20be%20changed%20later.).

So, what will we use? [Firebase Remote Config](https://firebase.google.com/docs/remote-config)! Any system that lets you remotely serve a number will work, even if that's something like checking a text file on your server. Remote Config is useful since it also lets us target specific values to subsets of our audience, for example only forcing users on bad version `100` to update to `101` whilst leaving users on good version `99` alone.

In this example, `abTestManager` is a wrapper within my app's codebase, and not relevant or required.

We fetch a minimum allowed version code (e.g. `1000`), and if the current app version (`BuildConfig.VERSION_CODE`) is higher or equal, none of the in-app update library code is called. This also adds a layer of safety from bugs in the library, as we can easily remotely disable the library's ability to lock the user out.

```kotlin
    fun forceUpdateIfNeeded(activity: ComponentActivity) {
        val minimumAllowedVersion = abTestManager.remoteConfigLong(FirebaseRemoteConfigKeys.minimum_version)
        if (BuildConfig.VERSION_CODE >= minimumAllowedVersion) {
            return
        }

        ...
    }
```

### Putting it all together

We're done!

We've checked the current version requires updating, we've used the library to check the update is available, then used the library to display a force update dialog, and listen to callbacks about the result.

Again, all code in this article is [available as a GitHub Gist](https://gist.github.com/JakeSteam/437b1085b9639061955157776911697a).

## Triggering the library

Once you've obtained an instance of your `ForceUpdateHandler` (I used dependency injection), the whole checking and updating process can be kicked off by calling it with an `Activity` or similar class (I used `ComponentActivity`):

```
updateHandler.forceUpdateIfNeeded(this)
```

This should be done as soon as possible in your app's main / launcher Activity, wherever users start when opening the app. It's also fine to call this from multiple Activities, e.g. if deep linked users go via a different Activity.

## Testing

To quote myself when raising the PR to implement this feature:

> Oh god. This took as long as the implementation!

It's one of the hardest features I've ever had to test, due to the strict requirements on seeing the dialog, namely:

1. The app must be installed from the store.
2. A newer version of the app must be available to you on the store.
3. You must be using the device's primary email (in my testing at least).
4. There are various device & server caches that take hours to invisibly clear.
5. You cannot use an emulator (again, in my testing at least).

Since we don't want to actually deploy multiple new versions of our app to the store just to test a feature, we'll be using the "Internal testing" track to give ourselves access to pre-release builds.

This internal sharing requirement is likely the cause of most of the complexity, since it requires bypassing all usual build preparation steps. In this scenario our live version code is `100`, and we will be using `101` -> `102` to test our updating.

Note that whilst Google [does have documentation for this process](https://developer.android.com/guide/playcore/in-app-updates/test), it's very limited and misses many of the steps / requirements.

### Preparing "old" app version

First, a candidate to be force updated _from_ needs to end up in Internal sharing!

1. Update your build with a higher version code (e.g. `101`) than your current live version (e.g. `100`).
2. Prepare a production keystore signed version of your app, it's fine if you use Google Play Key Signing so long as your signing matches your usual production app process.
3. Upload this to the "Internal sharing" release track on Google Play Console, and make sure it is "released".

### Preparing your device

Next, we need to get this version onto our phone.

On your desktop:

1. Update the list of "Internal sharing" users to include your physical device's primary email.
2. Find the internal testing opt-in link (will look something like `https://play.google.com/apps/internaltest/123456`).

On your phone:

1. Open this opt-in link in a browser with this same primary email logged in, and join internal testing (I had to use a desktop browser for this).
2. Go to the store listing for your app, and check it says "You're an internal tester".
3. Check the app version matches your test version (`101`), download and install the app.
4. Turn off automatic updates for this app ([guide](https://support.google.com/pixelphone/thread/218843690?hl=en&msgid=218845943)).

If that all went smoothly, you now have a test version on your device! There may be small delays at any stage whilst various caches update, techniques like restarting your phone may help.

### Preparing "new" app version

Now we need a newer version to force update to.

1. Repeat all the steps in "[Preparing old app version](#preparing-old-app-version)", except with a higher version code (e.g. `102`).
2. Open the system you're using to control the minimum version (Firebase Remote Config in this example), and set the minimum version to the newly uploaded version (`102`).

### Triggering the force update

So, we now have version `101` on our device, version `102` on the store, and version `102` set as the minimum. Opening our now outdated app, we can see... nothing happens. Huh!?

You'll now need to wait at least an hour or two for Firebase Remote Config cache to clear, Google Play cache to clear, and countless other delays along the way! It took around 4 hours of waiting for me, very painful when you're trying to find out if a new feature works.

It's fine to reopen the app during this wait, I didn't find any way to "force" the latest version information to be updated. Whilst I tried closing my app, restarting the device, clearing the cache of Google Play Store and various other techniques they didn't make any difference. I presume this is due to the delay being server side.

Anyway, eventually you'll open your app and... be prompted to update!

[![](/assets/images/2024/inapp-forced-update.png)](/assets/images/2024/inapp-forced-update.png)

## Next steps

Our app now has the ability to force update on demand, but that's all. It can't gently nudge to update, it can't automatically prompt a user to update if their version is too old, or anything else more advanced. It also doesn't

### Flexible updates

This is the obvious next step, prompting the user to update before we force them.

Flexible updates [seem more complex](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#flexible), with the app itself being responsible for (optionally) restarting once the update is downloaded, and an expectation that the update prompting dialog does not show too frequently.

The optional update feature will likely work well with `clientVersionStalenessDays`, as simple logic such as prompting users when their version is >7 days out of date would drastically reduce the users lingering on outdated versions. Performing a force update after another fixed interval is also an attractive proposition, especially as the risk of users getting "stuck" due to minimum SDK requirements etc is very minimal.

## Conclusion
