---
id: 2754
title: 'Posting a Slack message from Travis CI'
date: '2020-04-27T16:00:09+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2754'
permalink: /posting-a-slack-message-from-travis-ci/
snap_isAutoPosted:
    - '1587999658'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapTW:
    - 's:218:"a:1:{i:0;a:8:{s:2:"do";s:1:"0";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";'
image: /wp-content/uploads/2020/04/tgzBJ6o.png
categories:
    - Development
tags:
    - CI
    - git
    - slack
    - Travis
---

As part of my ongoing mission to rewrite our CI system, the final step is letting QA know that a new build is available. They can’t test it if they don’t know it’s there!

We’ll be using our CI’s bash script for this, [the start of this article](https://blog.jakelee.co.uk/creating-an-app-bundle-and-apk-on-travis-ci-server/) describes how to create one if you haven’t already.

Not interested in the full tutorial? [Here’s the final Gist](https://gist.github.com/JakeSteam/671658a8654b0ab19b61cfa9e9c100c9), and here’s what we’ll end up with:

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/tgzBJ6o.png?resize=510%2C214&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/tgzBJ6o.png?ssl=1)

## Formatting a Slack message

The first step is telling Slack how our message should look. Slack has a [really nice online visualiser](https://api.slack.com/tools/block-kit-builder?template=1) for messages using their “Block Kit” syntax. Using one of their templates, it’s very easy to quickly build a message with example data and preview it on desktop or mobile.

[Here is the template](https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22section%22%2C%22text%22%3A%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*%24BRANCH%20build%20(%23%24BUILD_NUMBER)%20available%20on%20devices!*%5Cn*Message%3A*%20%24COMMIT_MESSAGE%22%7D%7D%2C%7B%22type%22%3A%22section%22%2C%22fields%22%3A%5B%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Debuggable%3A*%5Cn%24DEBUGGABLE%22%7D%2C%7B%22type%22%3A%22mrkdwn%22%2C%22text%22%3A%22*Hash%3A*%5Cn%24COMMIT_HASH_SHORT%22%7D%5D%7D%2C%7B%22type%22%3A%22actions%22%2C%22elements%22%3A%5B%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Install%22%7D%2C%22value%22%3A%22internal-app-sharing%22%2C%22url%22%3A%22https%3A%2F%2Fexample.com%22%7D%2C%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Help%22%7D%2C%22value%22%3A%22help%22%2C%22url%22%3A%22https%3A%2F%2Fsupport.google.com%2Fgoogleplay%2Fandroid-developer%2Fanswer%2F9303479%23on%22%7D%2C%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Travis%22%7D%2C%22value%22%3A%22travis%22%2C%22url%22%3A%22https%3A%2F%2Fexample.com%22%7D%2C%7B%22type%22%3A%22button%22%2C%22text%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22GitHub%22%7D%2C%22value%22%3A%22github%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2F%24REPO%2Fcommit%2F%24COMMIT_HASH%22%7D%5D%7D%5D) I created, it might be helpful as a starting point for your own.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/oPB3nFh.png?resize=700%2C328&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/oPB3nFh.png?ssl=1)

In my messages, I display metadata QA / other devs might find useful: branch name, build number, commit message, commit hash, debuggable state.

I’ve also included 4 buttons. One for the Google Play Internal App Sharing link ([guide to setting it up](https://blog.jakelee.co.uk/uploading-an-app-bundle-to-google-play-internal-app-sharing-from-travis-ci/)), one for help installing, one for the Travis build, and one for the commit’s link on GitHub.

## Getting a Slack webhook

Slack has [an official guide](https://api.slack.com/messaging/webhooks) to creating a webhook URL, but it is much more complicated than necessary. The essential steps are:

1. Create [a new app](https://api.slack.com/apps/new).
2. Add the “Incoming WebHooks” app to your Slack workspace by clicking “Add to Slack” from [the app management page](https://api.slack.com/apps) (this will be “Request Configuration” if you’re not an admin).
3. Select which room the messages should go to ([picture](https://i.imgur.com/RspYoeQ.png)). It might be helpful setting this to a private message with yourself whilst testing!
4. Once added, scroll down to “Integration settings” ([picture](https://i.imgur.com/4qGPM7X.png)), and customise the name and avatar (emoji or uploaded image).
5. Copy the “Webhook URL”.
6. Save settings.

## Posting messages to Slack

From your existing bash script ([guide to setting it up](https://blog.jakelee.co.uk/creating-an-app-bundle-and-apk-on-travis-ci-server/) if you need to), we just need to do a simple POST to our webhook. This assumes you’ve defined your Slack message’s JSON (`$DATA`) &amp; webhook URL (`$WEBHOOK_URL`) already:

```
HTTP_RESPONSE=$(curl --silent --write-out "HTTPSTATUS:%{http_code}" \
    --header "Content-type: application/json" \
    --request POST \
    --data "$DATA" \
    "$WEBHOOK_URL")
HTTP_BODY=$(echo ${HTTP_RESPONSE} | sed -e 's/HTTPSTATUS\:.*//g')
HTTP_STATUS=$(echo ${HTTP_RESPONSE} | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
if [[ ${HTTP_STATUS} != 200 ]]; then
  echo -e "Sending Slack notification failed.\nStatus: $HTTP_STATUS\nBody: $HTTP_BODY\nExiting."
  exit 1
fi
```

This short script will send the custom message to Slack, and display any errors if they occur.

## Putting it all together

You should now have everything you need to create a function that you can invoke in your scripts.

We’ll put a few placeholders (e.g. `$BRANCH`) in our message, and replace them when the script runs. I’m defining all of my environment variables at the start, so the script can be easily migrated to another CI if necessary, but some variables still need to be passed to the function.

[Here’s the full Gist](https://gist.github.com/JakeSteam/671658a8654b0ab19b61cfa9e9c100c9), make sure you define / pass all your variables!

## Further improvements

It might be useful to tag user(s) in your message. This can be done by adding their user ID somewhere in your message in this format: `<@theiruserid>`, which can be found by:

1. Clicking the user whose ID you want to find.
2. Clicking “View full profile”
3. Pressing the 3 dot icon, you can then copy their member ID:

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/iO1uMIo.png?resize=475%2C295&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/iO1uMIo.png?ssl=1)

Another improvement would be stopping the “warning” icon that appears next to a clicked button. This appears because Slack is trying to transfer (empty) data to the arbitrary URL we’re using, which isn’t accepting it.

Unfortunately there doesn’t seem to be an easy fix, since we’re using simple webhooks and [not anything more advanced](https://github.com/slackapi/node-slack-sdk/issues/869).

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/XFNE0x1.png?resize=478%2C178&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2020/04/XFNE0x1.png?ssl=1)