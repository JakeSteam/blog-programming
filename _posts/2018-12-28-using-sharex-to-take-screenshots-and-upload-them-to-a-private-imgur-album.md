---
id: 2265
title: 'Using ShareX to take screenshots and upload them to a private Imgur album'
date: '2018-12-28T14:58:20+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2265'
permalink: /using-sharex-to-take-screenshots-and-upload-them-to-a-private-imgur-album/
snap_isAutoPosted:
    - '1546009101'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapMD:
    - "s:215:\"a:1:{i:0;a:6:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;}}\";"
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1078666531742117888";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1078666531742117888";s:5:"pDate";s:19:"2018-12-28 14:58:36";}}";'
image: /wp-content/uploads/2018/12/FOLT86E-150x150.png
categories:
    - Tips
tags:
    - Imgur
    - Screenshot
    - ShareX
    - Sharing
---

The ability to quickly share screenshots with others is essential to day to day conversation / work, especially when talking to people in other offices or countries. The built in Windows Snipping Tool has good basic functionality (e.g. press Win + Shift + S to select an area to copy), but lacks any image uploading functionality, or advanced editing.

This tutorial will let you do the following with ShareX, with one keypress:

1. Select an area
2. Perform advanced editing (numbering, blurring, pixelating, highlighting, circling etc)
3. Copy the selected area to your clipboard, ready to be pasted
4. Upload the selected area to a private album on Imgur, and provide you a link in a notification if you need it

Pretty good, for a completely free setup!

## Installing ShareX

First, [download and install ShareX](https://getsharex.com/). It’s also [available on Steam](https://store.steampowered.com/app/400040/ShareX/).

It has an absolutely staggering number of features (see gif below), and it’s definitely worth having a look at the included tools if you’re ever looking for a new utility program.

<div class="wp-caption aligncenter" id="attachment_2268" style="width: 846px">[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/ShareX_Animation.gif?resize=700%2C386&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/ShareX_Animation.gif?ssl=1)Animation from getsharex.com

</div>Once ShareX is running, it will appear in your toolbar. Double clicking the icon opens the settings screen. Whilst it can be a little confusing to navigate, the following steps will cover all you need for this configuration.

## Configuring clipboard copying

Clipboard copying is going to be an “After capture” task. To enable it, click “After capture tasks”, then “Copy image to clipboard”, making sure nothing else is ticked. That’s it!

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/Ow1oJ1S.png?resize=382%2C144&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/Ow1oJ1S.png?ssl=1)

## Configuring Imgur uploading

The next stage is uploading your screenshot to imgur, so that it displays in a popup notification. Clicking this notification opens the image in your default browser, so you can easily copy the URL wherever you need to.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/M36rzzD.png?resize=380%2C158&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/M36rzzD.png?ssl=1)

### Enabling Imgur

First, under “After capture tasks”, enable “Upload image to host”.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/52vtvJi.png?resize=393%2C420&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/52vtvJi.png?ssl=1)

Next, set Imgur as your image host under “Destinations”, “Image Uploader”, then “Imgur”.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/nibVcSy.png?resize=566%2C145&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/nibVcSy.png?ssl=1)

### Connecting ShareX to Imgur

In the same “Destinations” menu, open “Destination settings”. You’ll now need to authorise ShareX to access your Imgur account. This is done by:

1. Select “Account type” of “User”.
2. Click “Step 1: Open authorize page”.
3. This will open your browser. Log in to your Imgur account, and you will be shown a verification code.
4. Copy this code into the “Verification code” text box in ShareX.
5. Click “Step 2: Complete authorization”.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/NtoNJTj.png?resize=300%2C190&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/NtoNJTj.png?ssl=1)

You’re now connected! Time to get an album set up.

### Uploading ShareX images to an Imgur album

Make sure “Use direct link” is ticked, then make ShareX upload your images into an album:

1. Make a new album on imgur with the privacy “Secret”, so that only you can view it.
2. Click “Refresh album list” on the Imgur destination settings in ShareX.
3. Select your newly created folder.
4. Make sure “Upload images to selected album” is ticked.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/DY39iIB.png?resize=300%2C280&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/DY39iIB.png?ssl=1)

## Adding hotkey

Almost there! The final necessary step is setting up a hotkey for your task. Set this under “Hotkey settings”, I find F11 to be most convenient but it can be almost anything.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/tcKRfCS.png?resize=608%2C171&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/tcKRfCS.png?ssl=1)

Your ShareX is now fully setup! Press F11 (or your hotkey), and enjoy your clipboard copying and automatic uploading!

## Using ShareX’s screenshot tool

When your hotkey is pressed, the ShareX screenshot tool will popup. Whilst just selecting an area will perform the normal actions, there’s a lot of functionality included which can be very useful. Below is a screenshot of the editor, as well as an explanation of every option, since it can be a little overwhelming.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/editor.png?resize=641%2C330&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/editor.png?ssl=1)

#### Main bar (left to right)

1. The 3 dot icon lets you move the main bar around the screen.
2. The rectangular icon lets you select a rectangular area to capture (default).
3. The circular icon lets you select a circular / oval area to capture.
4. The odd shaped icon lets you select a custom shape to capture. This can have many points, even overlapping!
5. This rectangular icon lets you select a rectangle to overlay on the screen. Selecting this (or the circular overlay) will display options for outline / fill colour.
6. This circular icon lets you select a circular / oval shape to overlay on the screen.
7. The pen icon lets you draw / write on the captured area.
8. The connected dot icon lets you draw lines between areas in the captured area.
9. The arrow icon lets you draw arrows.
10. The letter “A” lets you add text to the captured area.
11. The letter “A” with a background lets you add text, but with a background.
12. The speech bubble lets you add a speech bubble to the screenshot.
13. The “001” icon lets you start counting. Once enabled, each time you click a new number will appear, one higher than the one before. This is useful for listing steps in a process.
14. The folder icon lets you overlay an existing image into your screenshot.
15. The monitor icon lets you overlay a part of the screen on your screenshot. Yes, really!
16. The emoji icon lets you add a sticker. Google’s blob emojis and a few custom ones are included. The [full list is in the source code](https://github.com/ShareX/ShareX/tree/master/ShareX.ScreenCaptureLib/Stickers/BlobEmoji).
17. The pointer icon lets you display a cursor on your screenshot.
18. The striped area icon lets you blur a selected area.
19. The grid icon lets you pixelate a selected area.
20. The “abc” icon lets you highlight a selected area.
21. This option (and the next) provide options for the currently selected tool, so vary depending on tool.
22. See above.
23. The camera icon lets you change the capture area (screen, area, window).
24. The settings icon lets you customise the editor with options for crosshair, icons to display, etc.
25. Same as #1.

#### Additional UI

1. The “crosshair” icon determines where your cursor currently is. Clicking and holding will let you select an area, whilst a single click will upload the whole screen.
2. The “magnifier” lets you zoom in on where your cursor is, to make sure you are getting the perfect pixel.
3. The X and Y coordinates below your magnifier shown help orientate your cursor in the overall window.
4. Additionally, selecting an area shows the below UI, with your cursor’s original X + Y coord, and the selected areas width and height.

## [![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/ofM9S7t.png?resize=261%2C133&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/ofM9S7t.png?ssl=1)Summary

Hopefully you’ve now got your ShareX setup with some basic but useful functionality. There’s a **lot** more customisation available, this is barely scratching the surface, so experiment by yourself! There is some community support available on [the Steam forums](https://steamcommunity.com/app/400040/discussions/) and on [/r/ShareX](https://www.reddit.com/r/sharex).

There’s also lots of included tools, many with further customisation, such as those screenshotted below. Gifs can also be recorded, images saved locally, and all kinds of convoluted workflows setup! I use ShareX for all screenshots on this blog, and find it extremely useful, usually capturing 10-30 images per day.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/9Z5oPfp.png?resize=340%2C343&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/9Z5oPfp.png?ssl=1)