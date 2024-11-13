---
id: 2610
title: 'How to see all dependencies in a multi-module Android app'
date: '2019-12-16T17:00:09+00:00'
permalink: /how-to-see-all-dependencies-in-a-multi-module-android-app/
image: /wp-content/uploads/2019/12/Screenshot-2019-12-14-at-19.31.20.png
categories:
    - 'Android Dev'
tags:
    - Dependency
    - Gradle
    - Modules
---

Recently at work, I needed to provide a list of all dependencies / external libraries used by an app. Requests like these are inevitable when working on bigger apps, especially with legislation like GDPR.

Whilst it's easy to check your app's Gradle file to see dependencies, this only works for that module. For a multi module project however, there must be an easier way than opening every module's Gradle file and merging them in a text file!

## Tree view

If you need a list of all dependencies, and all of their dependencies, and all of… etc, you'll want a tree view. This is useful for checking the same version of common libraries are being used throughout your app. The downside? It's massive! Including a single AndroidX library can add 20 entries to this list.

Running `./gradlew app:dependencies` in the terminal will produce something similar to:

```text
...
| +--- androidx.preference:preference:1.1.0
| | +--- androidx.appcompat:appcompat:1.1.0 (*)
| | +--- androidx.core:core:1.1.0 (*)
| | +--- androidx.fragment:fragment:1.1.0 (*)
| | +--- androidx.recyclerview:recyclerview:1.0.0 (*)
| | +--- androidx.annotation:annotation:1.1.0
| | \--- androidx.collection:collection:1.0.0 -> 1.1.0 (*)
| +--- androidx.lifecycle:lifecycle-extensions:2.1.0
| | +--- androidx.lifecycle:lifecycle-runtime:2.1.0 (*)
| | +--- androidx.arch.core:core-common:2.1.0 (*)
| | +--- androidx.arch.core:core-runtime:2.1.0 (*)
| | +--- androidx.fragment:fragment:1.0.0 -> 1.1.0 (*)
...
```

## Flat view

If however, you just want a simple list of all dependencies, `./gradlew app:androidDependencies` is best. This will list any jar files, submodules, and libraries used in your app.

```text
+--- :ui (variant: debug)
+--- me.tatarka.bindingcollectionadapter2:bindingcollectionadapter-recyclerview:3.0.0@aar
+--- me.tatarka.bindingcollectionadapter2:bindingcollectionadapter:3.0.0@aar
+--- androidx.databinding:databinding-adapters:3.4.1@aar
+--- androidx.databinding:databinding-runtime:3.4.1@aar
+--- androidx.databinding:databinding-common:3.4.1@jar
+--- :dataaccess
+--- :dependencies:exoplayer
+--- :dependencies:gson
+--- :dependencies:okhttp
+--- au.com.gridstone.rxstore:rxstore-kotlin:6.0.0@jar
+--- org.jetbrains.kotlin:kotlin-stdlib:1.3.40@jar
+--- com.squareup.dagger:dagger:1.2.2@jar
+--- io.reactivex.rxjava2:rxandroid:2.1.1@aar
```

If this list is to be shared with a non-technical audience, I recommend opening your favourite text editor and:

1. Find and replacing `@aar` and `@jar` with an empty string.
2. Next, removing the `+---` from the start of each line.
3. Next, removing all submodules, as they're not external dependencies.
4. (Optionally) removing all AndroidX / Google libraries from the list.

*Thanks to [this StackOverflow answer](https://stackoverflow.com/a/39020703) for the tip.*