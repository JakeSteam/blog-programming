---
title: How to force update (& test) your Android app using Google's in-app update library
image: /assets/images/2024/
tags:
  - Android
  - Kotlin
---

Earlier this year, I needed to add the ability to force update users of an app. Whilst I've used custom solutions in the past, Google has a standardised "[in-app updates](https://developer.android.com/guide/playcore/in-app-updates)" library that does it all for you!

This article will assume Kotlin is used, if you require Java just remove the `ktx` dependency and adjust the provided code.

All code used in this article is [available as a GitHub gist](https://gist.github.com/JakeSteam/437b1085b9639061955157776911697a).

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
2. Set `inAppUpdatePriority` via the Google Play Developer API, then determine update behaviour in-app based on [the priority value](https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#update-priority). This wasn't suitable for me as I wanted a simpler way of setting the version to upgrade from, and for all the logic to be remote.

So, what will we use? [Firebase Remote Config](https://firebase.google.com/docs/remote-config)! Any system that lets you remotely serve a number will work, even if that's something like checking a text file on your server.

```kotlin
    fun forceUpdateIfNeeded(activity: ComponentActivity) {

        // Optional, an optimisation / safety check
        val minimumAllowedVersion = abTestManager.remoteConfigLong(FirebaseRemoteConfigKeys.minimum_version)
        if (BuildConfig.VERSION_CODE >= minimumAllowedVersion) {
            return
        }

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

### Checking force update is required

## Triggering the library

## Testing

## Next steps

- Flexible updates
