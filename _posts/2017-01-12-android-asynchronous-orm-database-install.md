---
id: 406
title: 'Asynchronous ORM Database Install in Android'
date: '2017-01-12T15:39:15+00:00'
author: 'Jake Lee'
layout: post
permalink: /android-asynchronous-orm-database-install/
image: /wp-content/uploads/2017/01/kvc1tsw.png
categories:
    - 'Android Dev'
tags:
    - Asynchronous
    - Database
    - ORM
    - Patches
    - SugarORM
    - Java
---

Many apps need to ship with a local database, and many apps also use a ORM to handle their database actions (I personally use and recommend [Sugar](http://satyan.github.io/sugar/)). Tying together these two approaches requires some sort of compromise, often manually copying a SQLite database around the device’s filesystem.

Instead for City Flow a different approach was decided: Installing the database on first run, providing progress updates to the user.

## The Solution

The core part of the solution will be the `AsyncTask` described in an earlier article about [asynchronous map generation](https://blog.jakelee.co.uk/android-asynchronous-map-generator/). We’ll be starting an asynchronous task on first start, which will be reporting progress back to the progress bar and text on screen. In addition, we’ll be using ORM-specific techniques to actually save the new data, however they are common to almost every ORM.

#### Preparing The Installer

A separate `PatchHelper` class is used to handle the initial database install and subsequent patches. This is then called every time the app starts, in case any new databases patches are available. The app’s main activity creates a new `PatchHelper` instance (passing itself), then starts the AsyncTask.

```
    new PatchHelper(this).execute();
```

In the `PatchHelper` constructor, we find the install text and progress bar from the calling activity so that we can update them during installation. These are just a `TextView` and a `ProgressBar`, the XML of which can be [viewed at this Gist](https://gist.github.com/JakeSteam/25e82a6527be4061294e0636ecf3dbf9).

```
public class PatchHelper extends AsyncTask {
    public final static int NO_DATABASE = 0;
    public final static int V1_0_0 = 1;
    private Activity activity;
    private TextView progressText;
    private ProgressBar progressBar; 

    public PatchHelper(Activity activity) {
        this.activity = activity;
        this.progressText = (TextView) activity.findViewById(R.id.progressText);
        this.progressBar = (ProgressBar) activity.findViewById(R.id.progressBar);
}
```

#### Starting The Installer

Shared preferences are used to store the current database version. It’s very reliable, and we aren’t concerned about the user modifying this value if they’re rooted, so security is a non-issue.

If the current database version is non-existent, or set to `NO_DATABASE`(0), then the initial database install needs to be performed, and the new database version saved. Otherwise, just return, since no install is needed.

```
@Override
protected String doInBackground(String... params) {
    SharedPreferences prefs = activity.getSharedPreferences("uk.co.jakelee.cityflow", MODE_PRIVATE);

    if (prefs.getInt("databaseVersion", PatchHelper.NO_DATABASE) &lt;= PatchHelper.NO_DATABASE) {
        createDatabase();
        prefs.edit().putInt("databaseVersion", PatchHelper.V1_0_0).apply();
    }
    return "";
}
```

#### Performing The Install

The overarching `createDatabase()` calls 2 types of methods repeatedly, one to update the user, the other to actually perform the action.

```
private void createDatabase() {
    setProgress("Achievements", 0);
    createAchievement();
    setProgress("Backgrounds", 3);
    createBackground();
    --- many more similar lines clipped ---
}
```

Two parameters are passed to `setProgress()`, the name of the current item, and the percentage of progress made. The percentage progress is fixed in this implementation based on usual installation times.

`setProgress()` updates the progress bar’s value, and passes the current item text onto `publishProgress()`. Somewhat confusingly, calling `publishProgress` triggers `onProgressUpdate`, which updates the progress text’s value. Note that multiple strings could very easily be passed.

```
private void setProgress(String currentTask, int percentage) {
    if (progressText != null && progressBar != null) {
        publishProgress(currentTask);
        progressBar.setProgress(percentage);
    }
}

@Override
protected void onProgressUpdate(String... values) {
    progressText.setText("Installing:\n" + values[0]);
}
```

The actual creation methods are very simple, and will be ORM specific. For Sugar ORM, the most efficient way to bulk-add records is to create a `List` of them, then pass the whole set to `saveInTx()`, where they will all be added very quickly (a few hundred records a second).

```
private void createAchievement() {
    List achievements = new ArrayList();
    achievements.add(new Achievement("An achievement");
    achievements.add(new Achievement("Another achievement"));
    Achievement.saveInTx(achievements);
}
```

#### Tidying Up

Finally, the “progress” container is hidden, and the normal main menu is displayed. Included below for completeness, but hopefully it should be pretty obvious!

```
    progressWrapper.setVisibility(View.GONE);
    mainMenuWrapper.setVisibility(View.VISIBLE);
```

## The Conclusion

Whilst the actual installation is ORM specific, the overall mechanism of installing is applicable regardless of ORM, and even applicable to non-database background installations.

Additionally, it’s worth pointing out that an asynchronous database installation on first launch isn’t necessarily the best implementation for all use cases. If there is a very large amount of data for example, it may be more efficient to copy the database on launch, synchronise it from a remote server, or have a small “default” database replaced later on during a sync.