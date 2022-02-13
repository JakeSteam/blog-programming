---
id: 2386
title: 'How to share dependencies in a multi-module Android app'
date: '2019-02-22T17:00:52+00:00'
author: 'Jake Lee'
layout: post
permalink: /how-to-share-dependencies-in-a-multi-module-android-app/
image: /wp-content/uploads/2019/02/YMIOeHi.png
categories:
    - 'Android Dev'
tags:
    - Dependencies
    - Modules
---

###### *Note: This post is a tidied up version of [my answer to a StackOverflow question](https://stackoverflow.com/a/54173703/608312) about structuring multi-module apps.*

Transitioning to a multi-module project is an excellent way to increase code reuse, optimise build times (unchanged modules aren’t recompiled), and ensure your app’s structure is logical. Your core goal is to make your `app`module as small as possible, as it will be recompiled every time.

We used a few general principles, which may help you:

- A common `base-ui` module contains the primary `strings.xml`, `styles.xml` etc.
- Other front-end modules (`profile`, `dashboard`, etc) implement this `base-ui` module.
- Libraries that will be used in *all* user-facing modules are included in `base-ui`, as an `api` instead of `implementation`.
- Libraries that are only used in *some* modules are dependencies only in those modules.
- The project makes extensive use of data syncing etc too, so there are also `base-data`, `dashboard-data` etc modules, following the same logic.
- The `dashboard` feature module depends on `dashboard-data`.
- The `app` module depends only on feature modules, `dashboard`, `profile`, etc.

I strongly suggest sketching out your module dependency flow beforehand, we ended up with ~15 or so modules, all strictly organised. In your case, you mentioned it’s already quite a large app, so I imagine `app` needs feature modules pulled out of it, as does `domain`. Remember, small modules mean less code recompiled!

We encountered some issues with making sure the same version (`buildType`, `flavors`) of the app is used across all submodules. Essentially, all submodules have to have the same `flavor`s and `buildType`s defined as the `app` module.

On the other side of the coin, multi module development does really make you think about dependencies, and enforces strict separation between features. You’re likely to run into a few unexpected problems that you’ve never considered before. For example, something as simple as displaying the app’s version [suddenly complicates](/how-to-display-app-version-inside-a-submodule/).

[This article](https://medium.freecodecamp.org/how-modularisation-affects-build-time-of-an-android-application-43a984ce9968) also helped us decide on our approach. There are other excellent articles around nowadays, which I wish had existed when we’d transitioned!

Here’s an example diagram for an app I’m currently working on. Whilst it is far from perfect (the real world unfortunately intrudes!), all of the principles outlined above are visible:

[![](/wp-content/uploads/2019/02/LBrVD.png)](/wp-content/uploads/2019/02/LBrVD.png)

Note that distinguishing between `api` and `implementation` would be a good next step for a diagram like this, so that dependencies are more obvious.