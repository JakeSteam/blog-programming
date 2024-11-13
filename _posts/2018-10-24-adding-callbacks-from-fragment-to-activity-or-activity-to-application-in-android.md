---
id: 1790
title: 'Adding Callbacks From Fragment To Activity Or Activity To Application In Android'
date: '2018-10-24T09:00:23+01:00'
permalink: /adding-callbacks-from-fragment-to-activity-or-activity-to-application-in-android/
image: /wp-content/uploads/2018/10/fragmentclosedcode.png
categories:
    - 'Android Dev'
tags:
    - Callback
    - Interface
    - Kotlin
    - Navigation
---

When navigating between components in your Android app, you'll sometimes want to call back to the component's parent. If your navigation uses activities, `startActivityForResult()` is easy to use and works fine. However, if your app is a more modern app and uses fragments, this won't work, and there is no `startFragmentForResult()` function! It can also be helpful for the application class to know the result from a specific activity.

One solution (among others) to this problem is to define an interface with a callback that the parent component can implement, and the child component can obtain a reference to and then call. If that sounds a little complicated, the code should clarify!

This post is also [available as a Gist](https://gist.github.com/JakeSteam/868e9262ba540d38a2fca7ca56808b88).

## The interface

The interface (I've called mine `ActionHandler`) just needs to define a `handleAction` function, which takes a single string as a parameter.

```
interface ActionHandler {
    fun handleAction(actionCode: String)
}
```

## The parent

The parent activity or application needs to implement `ActionHandler` (e.g. `MainActivity : ActionHandler {`) and override `handleAction`. For example, the activity may need to perform different actions based on which fragment has just been closed.

```
    override fun handleAction(actionCode: String) {
        when {
            actionCode == FragmentA.FRAGMENT_A_CLOSED -> {
                doSomething()
            }
            actionCode == FragmentB.FRAGMENT_B_CLOSED -> {
                doSomethingElse()
            }
            actionCode == FragmentC.FRAGMENT_C_CLOSED -> {
                doAnotherThing()
            }
        }
    }
```

## The child

The child fragment or activity needs to have a public constant defined in the companion, used to check which callback is being triggered.

```
    companion object {
        const val FRAGMENT_A_CLOSED = "com.example.fragment_a_closed"
    }
```

Now, when the fragment should be closed (e.g. if it's a modal and the user has pressed the close button), try to call the parent's callback. It's worth wrapping this in a try/catch in case the fragment has accidentally been opened from another activity. The parent should never be null, as an activity can't live without an application, and a fragment can't live without an activity!

```
    try {
        (activity as ActionHandler).handleAction(FRAGMENT_A_CLOSED)
    } catch (e: ClassCastException) {
        Timber.e("Calling activity can't get callback!")
    }
    dismiss()
```

That's it! Now, when the child calls `handleAction`, the parent will receive the callback, and can perform any action needed.

## Next steps

If additional data should be passed back, an additional parameter can be added to the interface for the child to send back to the parent. The child does not also necessary have to close for the parent to receive the callback, even though receiving a callback on fragment close is the most common use case.

It's also worth pointing out that [there are many alternative techniques](https://stackoverflow.com/questions/6751583/is-there-a-method-that-works-like-start-fragment-for-result), but I found the method above to be the simplest and cleanest solution, as well as the easiest to add new functionality too.