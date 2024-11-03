---
id: 3056
title: 'Fixing a misleading "duplicate class" error during kaptDebugKotlin after merging'
date: '2021-10-13T19:12:34+01:00'
permalink: /fixing-a-misleading-duplicate-class-error-during-kaptdebugkotlin-after-merging/
image: /wp-content/uploads/2021/10/errorstacktrace.png
categories:
    - 'Android Dev'
tags:
    - Android
    - Gradle
    - kapt
    - Kotlin
    - Merge
---

Recently, I merged a repository’s main branch into an older feature branch, only to get a mysterious `InvocationTargetException` during compilation:  

[![](/wp-content/uploads/2021/10/originalerror.png)](/wp-content/uploads/2021/10/originalerror.png)

Viewing the full error (by clicking “Build: failed”) provided lots more information but… only deepened the mystery! All of the apparently duplicate classes are temporary Java files (the codebase is 100% Kotlin) and the classes all only have 1 definition.

There’s also various errors to do with “ANTLR Tool version”, and even some lint warnings about deprecated methods sneaking in. Definitely important, but very unrelated to the duplicate class mystery. My first thought was Android Studio’s cache causing issues, but a project clean and cache clear didn’t help. Hmm!

[![](/wp-content/uploads/2021/10/3czsRYU.png)](/wp-content/uploads/2021/10/3czsRYU.png)

After looking into all of the Kotlin files, checking no major changes had been merged, redoing the merge, and fruitlessly searching [various](https://stackoverflow.com/q/36990054/608312) [StackOverflow](https://stackoverflow.com/q/56029393/608312) [answers](https://stackoverflow.com/q/56574910/608312), I finally found the answer.

The merge had resulted in a class (that referenced all the supposedly duplicate classes) having two companion objects:

[![](/wp-content/uploads/2021/10/actualissue.png)](/wp-content/uploads/2021/10/actualissue.png)

The obvious fix of removing the outdated companion immediately resolved the issue, shame the original error was so unhelpful!

And yes, this did take an embarrassingly long time to resolve.