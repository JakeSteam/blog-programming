---
id: 1297
title: 'Selectively Playing Tracks Whilst Game Is Active / Open'
date: '2017-06-05T19:29:04+01:00'
author: 'Jake Lee'
layout: post
permalink: /selectively-playing-tracks-whilst-game-is-active-open/
image: /wp-content/uploads/2017/06/vaidqil.png
categories:
    - 'Android Dev'
tags:
    - Games
    - Java
    - 'Media Service'
    - Music
---


Playing background music on Android is pretty easy: just start a service with a media player. Great, that was easy! However, when the user presses the home button, the music… continues. This is good for music apps, but awful for games. In this example, [Blacksmith Slots](https://www.reddit.com/r/BlacksmithSlots/) had one music track for the intro, and one for the main game.

## The Solution

The basic idea for the solution comes from [a 5 year old StackOverflow answer](https://stackoverflow.com/a/12652213/608312), with the only upvote being mine. Essentially, the music is stopped whenever an activity is paused, unless a boolean flag is set. In this implementation, a `MusicHelper` singleton was used, so that any activity could change audio track if necessary.

#### Media Service

The media service is a relatively basic service that creates a media player and starts it. The code is [available on this article’s Gist](https://gist.github.com/JakeSteam/55cd4384f92b76f8a6f1c82a32e04124#file-musicservice-java), but essentially the track to play is passed via a reference to the asset (e.g. `R.raw.music`) on the service’s start intent.

A reference to the service is stored within the `MusicHelper`, and assigned by the following:

```
musicService = new Intent(context.getApplicationContext(), MusicService.class)
    .putExtra("songId", trackToPlay);
```

#### Base Activity

This article assumes all of the application’s activities extend the same base activity. If this isn’t the case, the following can be implemented on every activity, but this is obviously more effort.

When an activity is paused (application exited, user receives a call, starting a new activity, etc) if the `movingInApp` flag isn’t set, the music is paused.

```
@Override
public void onPause() {
    super.onPause();
    if (!MusicHelper.getInstance(this).isMovingInApp()) {
        MusicHelper.getInstance(this).stopMusic();
    }
}
```

When an activity resumes the `movingInApp` flag is set to false, so that the next time an activity pauses it can be checked again.

```
@Override
protected void onResume() {
    super.onResume();
    MusicHelper.getInstance(this).setMovingInApp(false);
}
```

#### Setting Moving Flag

In order for the `isMovingInApp()` check to work, every time an activity is closed or opened, `movingInApp` must be set to true first. As a base activity was used in this example, a generic close method could be used, but the same code must be called just before starting a new activity too.

```
public void close(View v) {
    MusicHelper.getInstance(this).setMovingInApp(true);
    finish();
}
```

#### Playing Music

To play music, the `playIfPossible()` function can be used, passing the asset that should be played. This will play the track if there is currently no audio playing, or another track is currently being played.

```
MusicHelper.getInstance(this).playIfPossible(R.raw.village_consort);
```

As mentioned before, `playIfPossible()` checks if the track isn’t currently playing, then starts the service if necessary. This is done in a new thread to avoid UI stutters. Note that the project used as an example allows the user to mute music at any time, including before settings have been setup, hence playing if it is intro music, and checking the user’s preference. This is of course optional.

```
public void playIfPossible(final int trackToPlay) {
    new Thread(new Runnable() {
        public void run() {
            // If music should be playing, and it isn't, or is the wrong track, fix that!
            if ((isIntroMusic(R.raw.time_passes) || Setting.getBoolean(Enums.Setting.Music)) &&
                    (trackToPlay != currentTrack || !musicServiceIsStarted)) {
                musicService = new Intent(context.getApplicationContext(), MusicService.class)
                    .putExtra("songId", trackToPlay);
                currentTrack = trackToPlay;
                context.startService(musicService);
                musicServiceIsStarted = true;
            } else if (!Setting.getBoolean(Enums.Setting.Music) &amp;&amp; musicServiceIsStarted) {
                context.stopService(musicService);
                musicServiceIsStarted = false;
            }
        }
    }).start();
}
```

## The Conclusion

Background music is absolutely essential in a game, and being able to control this playback is just as important. If a game’s music continues when the app is closed, the user is likely to uninstall it pretty quickly, and understandably so.

The implementation described in this article will also stop music when the activity is temporarily paused, and start it again when it is resumed. In most cases this isn’t ideal, so the media player’s start and stop functions could probably be replaced with play and pause functions, but it was not necessary for this use case.

I’d also like to say thank you to [the user](https://stackoverflow.com/users/1069068/raghav-sood) who posted the initial idea, it’s a rather elegant solution to a tricky problem. I’m sure in the 5 years since it was posted, there have been libraries and better solutions discovered, but I was unable to find any. Besides, this one works perfectly!

As always, all code used in this article is available as a [GitHub Gist](https://gist.github.com/JakeSteam/55cd4384f92b76f8a6f1c82a32e04124).