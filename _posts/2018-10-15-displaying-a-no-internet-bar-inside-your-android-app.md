---
id: 1763
title: 'Displaying a "No Internet" Bar Inside Your Android App'
date: '2018-10-15T19:20:18+01:00'
permalink: /displaying-a-no-internet-bar-inside-your-android-app/
image: /wp-content/uploads/2018/10/vqosc2n.png
categories:
    - 'Android Dev'
tags:
    - BroadcastReceiver
    - Connectivity
    - 'No Internet'
---

Whilst developing an app, you’re likely to have a strong, reliable data connection at all times. In the real world however, users often will be without connectivity, and your app should react appropriately.

In this tutorial, a simple animated “No internet is available” bar will be displayed inside the app whilst there is no internet, and disappear when connectivity returns. An [example no internet bar project](https://github.com/JakeSteam/WarningBarDemo) is available, as well as a [video of the finished implementation](https://www.youtube.com/watch?v=refrQSsaiyc).

## Add network state permission

First, permission to access the network state is needed. This permission doesn’t need to be requested at runtime, and just being included in the `AndroidManifest.xml` is sufficient:

```
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Add bar to layout

Next, the bar has to actually be added to the layout. This can of course be customised easily, I’ve gone for a solid bright pink bar to grab attention!

```
    <TextView
        android:id="@+id/no_internet_bar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FF4081"
        android:gravity="center_horizontal"
        android:padding="5dp"
        android:text="There is no internet connection available!"
        android:textColor="#FFFFFF"
        android:visibility="gone"
        app:layout_constraintBottom_toBottomOf="parent" />
```

## Create network receiver

`NetworkReceiver.kt` is a small class that serves 3 functions:

1. Checking the current internet status on demand: 
```
        private fun hasInternet(context: Context): Boolean {
            val connectMgr = (context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager)
            val activeNetworkInfo = connectMgr.activeNetworkInfo
            return activeNetworkInfo != null &amp;amp;&amp;amp; activeNetworkInfo.isConnected
        }
```
2. Providing an interface for activities to implement, so that it can broadcast network state change events: 
```
        interface NetworkReceiverListener {
            fun onNetworkConnectionChanged(isConnected: Boolean)
        }
    
        companion object {
            var networkReceiverListener: NetworkReceiverListener? = null
        }
```
3. Actually broadcasting the events as they are received: 
```
        override fun onReceive(context: Context, arg1: Intent) {
            if (networkReceiverListener != null) {
                networkReceiverListener!!.onNetworkConnectionChanged(hasInternet(context))
            }
        }
```

## Setup network listener

Initialising the `NetworkReceiver`‘s `networkReceiverListener` hooks the activity into the broadcast receiver we just created. This should be done during `onCreate()` or as early as possible:

```java
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupNetworkListener()
    }

    private fun setupNetworkListener() {
        NetworkReceiver.networkReceiverListener = object : NetworkReceiver.NetworkReceiverListener {
            override fun onNetworkConnectionChanged(isConnected: Boolean) {
                toggleNoInternetBar(!isConnected)
            }
        }
    }
```

## Hook into Android lifecycle events

Next, we need to make sure receivers are only registered whilst our activity is, otherwise we may continue listening to network events even after the app is closed. `onStart` and `onStop` should be used for registering and unregistering the receiver.

```
    private var networkReceiver: NetworkReceiver? = null

    override fun onStart() {
        super.onStart()
        networkReceiver = NetworkReceiver()
        registerReceiver(networkReceiver, IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION))
    }

    override fun onStop() {
        super.onStop()
        networkReceiver?.let { unregisterReceiver(it) }
    }
```

## Display bar

Finally, and most importantly, we need to actually show the bar! `toggleNoInternetBar` is called when the network state changes, and accepts a boolean determining if the bar should be shown or hidden. Two simple animations are used to improve appearances:

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
    private fun toggleNoInternetBar(display: Boolean) {
        if (display) {
            val enterAnim = AnimationUtils.loadAnimation(this, R.anim.enter_from_bottom)
            no_internet_bar.startAnimation(enterAnim)
        } else {
            val exitAnim = AnimationUtils.loadAnimation(this, R.anim.exit_to_bottom)
            no_internet_bar.startAnimation(exitAnim)
        }
        no_internet_bar.visibility = if (display) View.VISIBLE else View.GONE
    }
```

## Conclusion

For an internet-dependent app, the ability to show users a warning that the displayed data may not be up to date is an easy way to improve the user experience. Small features like this really add up, and can help persuade a user to feel positively towards your app / service.

One potentially unexpected quirk of the implementation in this tutorial that can cause issues during testing is the delay when disabling Airplane Mode. Once Airplane Mode is disabled, it can take 5-10 seconds until connectivity returns and the bar disappears.

An [example no internet bar project](https://github.com/JakeSteam/WarningBarDemo) has also been created for this tutorial.