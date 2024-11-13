---
id: 2486
title: 'Using Dyno to create a Discord command that displays a message and DMs a specified user'
date: '2019-05-20T12:09:06+01:00'
permalink: /using-dyno-to-create-a-discord-command-that-displays-a-message-and-dms-a-specified-user/
image: /wp-content/uploads/2019/05/Annotation-2019-05-20-115753.jpg
categories:
    - Development
tags:
    - Command
    - Discord
    - Dyno
---

Dyno is an extremely powerful bot for Discord, with a staggering set of features, split into modules. One of the easiest to use is the "Custom Command" module, allowing actions to be taken in response to messages in chat. Setting up Dyno to a server you have "Manage server" permissions on is very straightforward, just click "Add to server" on [Dyno.gg](https://dyno.gg/account), then follow the instructions.

On the [Android Dev](https://discord.gg/D2cNrqX) and [Flutter Dev](https://discord.gg/N5MDVG6) servers, there are a few commands currently in use. Most of them are simple autoresponses (displaying a message when a command like `?screenshot` is entered), but the longer autoresponses take up far too much room in chat. To get around this, I implemented a solution that DMs the response to a specified user, and displays a confirmation message in the original channel.

## Command code

Here's the code used on the [Android Dev](https://discord.gg/D2cNrqX) discord to let users send each other information on Kotlin, using `?kotlin @Username#123`:

```text
{delete}{!announce {channel} Sending Kotlin resources to $1 on behalf of {user.mention}!} 
{dm:$1} 
Looking to get started with Kotlin development? 
Here's a Udacity course: <https://www.udacity.com/course/developing-android-apps-with-kotlin--ud9012> 
And a useful wiki if you already know Java: <https://github.com/Zhuinden/guide-to-kotlin/wiki>
```

The command can look a little complicated, so here's what each part does:

- The curly braces (`{` &amp; `}`) wrap each part of the command.
- `delete` deletes the command (`?kotlin`) used to summon the bot.
- `!announce` uses Dyno's `announce` command to display the "X has sent resources to Y" message in chat. 
    - `channel` tells Dyno to output the message in the channel where the command was sent.
    - `$1` tells Dyno to use the first parameter sent to it, in this case the target user (X).
    - `user.mention` references the user who sent the initial command (Y).
- `dm:$1` sends a private message (DM) to `$1`, which is described above.
- Finally, `<` and `>` are used around links to prevent them displaying large embeds.

Here's what displays in the channel:

[![](/wp-content/uploads/2019/05/Annotation-2019-05-20-115614.jpg)](/wp-content/uploads/2019/05/Annotation-2019-05-20-115614.jpg)

And here's what the user receives in their inbox:

[![](/wp-content/uploads/2019/05/Annotation-2019-05-20-115753.jpg)](/wp-content/uploads/2019/05/Annotation-2019-05-20-115753.jpg)

This approach unfortunately doesn't work if a user has blocked Dyno. However, this is relatively unusual it's generally not worth considering as a downside.

Overall the approach is simple to adapt and extend, and adds powerful functionality to any server. If your servers uses commands like this, make sure it also has a `#botspam` channel for people to try out the commands!

Finally, here's how the command will look on your Dyno Custom Commands list:

[![](/wp-content/uploads/2019/05/Annotation-2019-05-20-120517.jpg)](/wp-content/uploads/2019/05/Annotation-2019-05-20-120517.jpg)