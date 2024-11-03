---
title: Fixing a BottomNavigationView that insists on being too tall
image: /assets/images/2022/bottombar-header.png
tags:
    - BottomNavigationView
    - UI
    - Android
---

At work, we've had a bug that has appeared intermittently since before I joined. The navigation bar at the bottom of our app would very rarely become absolutely massive. For seemingly no reason. Today, I finally freed us from this menace!

## Problem

To set the scene, we have an `activity_main.xml` with a `NavHostFragment` and a `BottomNavigationView`. Both Google components used to handle navigation around the app with no changes besides basic styling. These were defined perfectly sensibly inside a `ConstraintLayout`, yet occasionally we'd see this:

| Correct | Incorrect |
| :--: | :--: |
| [![](/assets/images/2022/bottombarcorrect-thumbnail.jpg)](/assets/images/2022/bottombarcorrect.jpg) | [![](/assets/images/2022/bottombarincorrect-thumbnail.jpg)](/assets/images/2022/bottombarincorrect.jpg) |

As you can imagine, this was pretty frustrating for the user, having just the tiny top area to actually use! The issue fixed itself when the app was restarted, but on smaller devices made the app almost unusable.

Googling around didn't turn up anything useful, mostly people having problems with the bar's size in general, not in certain situations! 

## Debugging

We experienced this rare bug during 2 filmed user sessions of our shopping app, so the videos could be compared to find out what happened. Here were the clues gained:

1. It only happens for users on their first order.
2. It only happens when a user changes their mind after entering their address, but before entering payment details.
3. The `BottomNavigationView` had a few hundred pixels of `bottomPadding` added, despite `paddingBottom="0dp"` in the XML. Calling `.invalidate()` / `.requestLayout()` didn't change the padding.

Through trial and error, I found our Address Picker screen was to blame. On this screen new users start typing their delivery address, pick it from a list of found addresses, then proceed to checkout.

Eventually I realised the empty space on screen... perfectly matched the space the keyboard would take up! So, the keyboard must be involved somehow, despite not being open. Here's what happened:

1. When the user is typing their address, the keyboard is obviously visible. 
2. When they select an address, our app navigates away from the screen via a slightly convoluted method involving MVVM and a `RecyclerView` adapter.
3. This navigation action doesn't explicitly dismiss the keyboard.
4. If the user gets to the homepage without opening the keyboard again, the `BottomNavigationView` tries to fit above this (invisible) keyboard.
5. We have our giant bottom padding. 

## Solution

I don't understand why only `BottomNavigationView` seems affected by this, or quite why it happened, but luckily the solution is pretty easy:

```
this.view?.hideSoftKeyboard()
```

Just calling this when an address is selected (AKA the screen with a keyboard is navigated away from) will cause the keyboard to be properly "hidden" when the user gets back to the `BottomNavigationView`.

A deeply satisfying Friday-last-thing fix to a bug that has plagued the app for years!

![](/assets/images/2022/bottombarcommit.png)
