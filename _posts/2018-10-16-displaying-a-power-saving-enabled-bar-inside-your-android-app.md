---
id: 1766
title: 'Displaying a "Power Saving Enabled" Bar Inside Your Android App'
date: '2018-10-16T17:56:59+01:00'
permalink: /displaying-a-power-saving-enabled-bar-inside-your-android-app/
image: /wp-content/uploads/2018/10/5xtlk5x.png
categories:
    - 'Android Dev'
tags:
    - BroadcastReceiver
    - PowerSaving
---

If your app uses Android hardware features or otherwise needs to be running most of the time, tools such as power saving mode can limit your app’s freedom. Whilst the mode is great for users, the inconsistent implementation (much better now that Doze mode exists, and power saving is more standardised) often leads to unreliable performance on certain devices. Making users aware of this can prevent giving users a negative impression of your app.

In this tutorial, a simple animated “Power saving mode enabled” bar will be displayed inside the app whilst there any power saving mode is enabled, and disappear when it is disabled. An [example power saving bar project](https://github.com/JakeSteam/PowerSavingBarDemo) is available, as well as a [video of the finished implementation](https://www.youtube.com/watch?v=AbYpf-pjPxI).

Please note that this **only works on Lollipop and above**, the APIs needed to safely get power saving status are not available before then.

This tutorial also shares most of it’s code with [an earlier post about displaying a “No Internet” bar](/displaying-a-no-internet-bar-inside-your-android-app/) in a similar way.

## Add bar to layout

First, the bar has to actually be added to the layout. This can of course be customised easily, the demo project uses a bright orange bar to alert the user.

```
<TextView
    android:id="@+id/power_saving_bar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="#F28200"
    android:gravity="center_horizontal"
    android:padding="5dp"
    android:text="Power saving mode is on, this app's super duper features may not work correctly!"
    android:textColor="#FFFFFF"
    android:visibility="gone"
    app:layout_constraintBottom_toBottomOf="parent" />
```

## Setup power saving listener

Next, a `BroadcastReceiver` needs to be created to catch the power saving toggle events broadcast by the operating system. The `IntentFilter` ensures that only the correct events are received.

```java
@RequiresApi(Build.VERSION_CODES.LOLLIPOP)
private fun setupPowerSavingReceiver() {
    togglePowerSavingBar((getSystemService(Context.POWER_SERVICE) as PowerManager).isPowerSaveMode)
    powerSavingReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val powerManager: PowerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
            togglePowerSavingBar(powerManager.isPowerSaveMode)
            Log.e("PowerSaving", "Enabled: ${powerManager.isPowerSaveMode}")
        }
    }
    registerReceiver(
        powerSavingReceiver,
        IntentFilter("android.os.action.POWER_SAVE_MODE_CHANGED")
    )
}
```

## Hook into Android lifecycle events

Next, we need to make sure receivers are only registered whilst our activity is, otherwise we may continue listening to power saving events even after the app is closed. `onStart` and `onStop` should be used for registering and unregistering the receiver.

```
private var powerSavingReceiver: BroadcastReceiver? = null

override fun onStart() {
    super.onStart()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        setupPowerSavingReceiver()
    }
}

override fun onStop() {
    super.onStop()
    powerSavingReceiver?.let { unregisterReceiver(it) }
}
```

## Display bar

Finally, and most importantly, we need to actually show the bar! `togglePowerSavingMode` is called when the power saving mode is enabled or disabled, and accepts a boolean determining if the bar should be shown or hidden. Two simple animations are used to improve appearances:

1. `enter_from_bottom.xml` is used for the bar appearing: 
```
    <?xml version="1.0" encoding="utf-8"?>
    <set xmlns:android="http://schemas.android.com/apk/res/android"
        android:shareInterpolator="false">
        <translate
            android:duration="400"
            android:fromXDelta="0%"
            android:fromYDelta="100%"
            android:toXDelta="0%"
            android:toYDelta="0%" />
    </set>
```
2. `exit_to_bottom.xml` is used for the bar disappearing: 
```
    <?xml version="1.0" encoding="utf-8"?>
    <set xmlns:android="http://schemas.android.com/apk/res/android"
        android:shareInterpolator="false">
        <translate
            android:duration="400"
            android:fromXDelta="0%"
            android:fromYDelta="0%"
            android:toXDelta="0%"
            android:toYDelta="100%" />
    </set>
```

Finally, these animations are used to toggle visibility:

```
private fun togglePowerSavingBar(display: Boolean) {
    if (display && power_saving_bar.visibility != View.VISIBLE) {
        val enterAnim = AnimationUtils.loadAnimation(this, R.anim.enter_from_bottom)
        power_saving_bar.startAnimation(enterAnim)
    } else if (!display && power_saving_bar.visibility != View.GONE) {
        val exitAnim = AnimationUtils.loadAnimation(this, R.anim.exit_to_bottom)
        power_saving_bar.startAnimation(exitAnim)
    }
    power_saving_bar.visibility = if (display) View.VISIBLE else View.GONE
}
```

## Conclusion

The main drawback of this simple solution is the requirement for Android Lollipop. Luckily, on older devices the functionality simply won’t be enabled, so users won’t actually be aware they are missing out.

Additionally, during testing I discovered Sony’s “STAMINA MODE” isn’t implemented in the same standardised way as other manufacturers, meaning it cannot be listened to in the same way. A partial workaround is available, by checking Sony device’s settings when the app starts (or `onResume`):

```
private fun performSonyPowerSavingCheck() {
    if (Build.MANUFACTURER.toUpperCase() == "SONY") {
        togglePowerSavingBar(
            Settings.Secure.getInt(contentResolver, "somc.stamina_mode", 0) == 1
        )
    }
}
```

This workaround isn’t perfect, as it only tells you if the user has STAMINA MODE enabled, not whether it is currently active. For example, the user may have it set to activate at 20% battery, and currently be at 100%, yet the check will still return true. As such, consider whether it is worth implementing for Sony devices.

An [example power saving bar project](https://github.com/JakeSteam/PowerSavingBarDemo) has also been created for this tutorial.