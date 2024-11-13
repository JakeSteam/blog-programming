---
id: 1680
title: 'Dynamically preventing scrolling on selected ViewPager pages'
date: '2018-09-06T21:12:05+01:00'
permalink: /dynamically-preventing-scrolling-on-selected-viewpager-pages/
image: /wp-content/uploads/2018/09/2yz7c05.png
categories:
    - 'Android Dev'
tags:
    - Kotlin
    - UI
    - ViewPager
---

ViewPagers are an extremely powerful UI tool that by default can be swiped left and right freely. In some cases however, it can be useful to prevent the user swiping in certain directions on certain pages, i.e. a "LockableViewPager". For example, the first 2 pages might have to be passed programmatically, and then all other pages can be navigated between freely.

This article will implement determining and changing at any time the current permitted swipe direction(s) (left, right, both, neither) using a custom ViewPager, concluding with a full use case. The end result of this article is also available as a [Gist](https://gist.github.com/JakeSteam/d69275118bd47984e94ee40d00aee219).

### Including custom element

Just replacing `ViewPager` with the full path of your `LockableViewPager` is the only change needed in your layout XML.

```
<com.example.LockableViewPager
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
```

### LockableViewPager

First, a new class extending `ViewPager` has to be created, as well as values for the `initialXValue` (used to determine swipe direction) and `direction` (used to store permitted swipe direction):

```
class LockableViewPager(context: Context, attrs: AttributeSet) : ViewPager(context, attrs) {

    private var initialXValue: Float = 0f
    private var direction: SwipeDirection? = null
```

Additionally, an enum of the possible scroll directions needs to be defined outside the class:

```
enum class SwipeDirection { BOTH, LEFT, RIGHT, NONE }
```

Next, wrappers around the existing `onTouchEvent` and `onInterceptTouchEvent` functions have to be added, so any attempts to move between pages can be checked before being acted on:

```
    override fun onTouchEvent(event: MotionEvent): Boolean {
        return if (this.isSwipeAllowed(event)) {
            super.onTouchEvent(event)
        } else false
    }

    override fun onInterceptTouchEvent(event: MotionEvent): Boolean {
        return if (this.isSwipeAllowed(event)) {
            super.onInterceptTouchEvent(event)
        } else false
    }
```

Now, the `isSwipeAllowed` function from the previous wrappers has to be implemented, returning a boolean. If the permitted direction is `BOTH`, `true` can be returned instantly, and the same for `NONE` and returning false.

When the `MotionEvent.ACTION_DOWN` is fired, the `initialXValue` is updated, so we know where the swipe started. When any subsequent `MotionEvent.ACTION_MOVE` event occurs, the `initialXValue` and swipe event's `x` can be used to calculate which way the user is swiping. The function can then return whether or not the swipe event is in a permitted direction.

```
    private fun isSwipeAllowed(event: MotionEvent): Boolean {
        if (this.direction === SwipeDirection.BOTH) {
            return true
        } else if (direction === SwipeDirection.NONE) {
            return false
        }

        if (event.action == MotionEvent.ACTION_DOWN) {
            initialXValue = event.x
            return true
        }

        if (event.action == MotionEvent.ACTION_MOVE) {
            try {
                val diffX = event.x - initialXValue
                if (diffX > 0 && direction === SwipeDirection.RIGHT) {
                    // swipe from left to right detected
                    return false
                } else if (diffX < 0 && direction === SwipeDirection.LEFT) {
                    // swipe from right to left detected
                    return false
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        return true
    }
```

Finally, a simple function for setting the permitted swipe direction is added, and then the core of the LockableViewPager is finished.

### Using LockableViewPager

To use the new `LockableViewPager`, just set your desired swipe direction during `onCreate` / `onViewCreated`:

```
pager.setAllowedSwipeDirection(SwipeDirection.LEFT)
```

### Example use case: unskippable pages

This code was originally used for inviting other users to an account. In this use case, some users were required (e.g. couldn't be skipped), whereas others were optional (e.g. could be skipped). As such, the required users were displayed first, and had to be passed by completing an invite process which then programmatically moved to the next page. Required users could not be swiped away, but the subsequent optional users could be swiped between freely.

First, during the `onCreate` / `onViewCreated`, a custom page change listener is set using `pager.addOnPageChangeListener(pageChangeListener())` so that swipe logic can be updated whenever a new page is navigated to. This listener is defined as:

```java
    private fun pageChangeListener(): ViewPager.SimpleOnPageChangeListener =
        object : ViewPager.SimpleOnPageChangeListener() {
            override fun onPageSelected(position: Int) {
                setSwipeability()
            }
        }
```

`setSwipeability` is just a wrapper around `pager.setAllowedSwipeDirection(getSwipeDirection(pager))`, which calls the main logic `getSwipeDirection`.

First, if the current user is required, no swiping is permitted:

```
        if (isDriverRequired(pager.currentItem)) {
            return SwipeDirection.NONE
        }
```

Next, various useful but simple values are calculated, to ensure there are no unreadably complicated boolean logic statements. The number of pages in the `LockableViewPager` is used extensively, and each statement builds on the last to avoid repeated logic.

```
        val isFirstUser = pager.currentItem == 0
        val isLastUser = pager.currentItem == pager.adapter!!.count - 1
        val isUserToLeft = !isFirstUser && pager.currentItem > 0
        val isUserToRight = !isLastUser && pager.currentItem < pager.adapter!!.count - 1
        val isOptionalUserOnLeft = isUserToLeft && !isUserRequired(pager.currentItem - 1)
        val isOptionalUserOnRight = isUserToRight && !isUserRequired(pager.currentItem + 1)
```

Now that all the information required to calculate the permitted swipe directions has been calculated, the actual end logic is extremely simple:

```
        if (isOptionalUserOnLeft && isOptionalUserOnRight) {
            return SwipeDirection.BOTH
        } else if (isOptionalUserOnLeft) {
            return SwipeDirection.LEFT
        } else if (isOptionalUserOnRight) {
            return SwipeDirection.RIGHT
        } else {
            return SwipeDirection.NONE
        }
```

### Conclusion

Whilst the initial idea of having varying swipe options on a per-page basis seems simple, the default `ViewPager` has no capabilities for this. Luckily, the extension described in this post adds the functionality in a very easy to use way, and has no noticeable performance impact.

Further improvements would be adding an optional "bounce" animation when trying to navigate in a non-permitted direction, instead of just ignoring the swipe. The `getSwipeDirection` function could also be improved by reducing the amount of if statements and distinct boolean statements, albeit at a risk of decreased readability.

As mentioned before, all of this [code is available as a Gist](https://gist.github.com/JakeSteam/d69275118bd47984e94ee40d00aee219). Additionally, the core locking idea is originally from [**andre719mv**‘s answer on StackOverflow](https://stackoverflow.com/a/34076649/608312).