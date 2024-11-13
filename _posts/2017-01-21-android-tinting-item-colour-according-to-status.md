---
id: 545
title: 'Tinting Item Colour According To Status in Android'
date: '2017-01-21T01:24:00+00:00'
permalink: /android-tinting-item-colour-according-to-status/
image: /wp-content/uploads/2017/01/untitled.png
categories:
    - 'Android Dev'
tags:
    - ColorFilter
    - Colours
    - PorterDuff
    - Tint
    - Java
---

[Pixel Blacksmith](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmith) is an Android game where players craft and sell items to visitors, in order to make a profit to buy upgrades / more resources. These items can be enchanted with gems, and the item's image needs to be tinted the gem's colour to reflect this.

## The Solution

To modify the item's colour (whilst only affecting the transparent pixels), we'll be using the `MULTIPLY` color filter option. It can be hard to predict the outcome a specific colour code will have when applied to the drawables, so it's recommended to try out 5-6 and choose one which has the desired effect.

### Defining Colours

First, the hex codes of the desired colours were found via trial and error, and saved in the `colors.xml` file.

```xml
<color name="redOverlay">#ff7777</color>
<color name="blueOverlay">#9cb4fc</color>
<color name="greenOverlay">#8abc84</color>
<color name="whiteOverlay">#e2e2e2</color>
<color name="blackOverlay">#3d3d3d</color>
<color name="purpleOverlay">#b041ba</color>
<color name="yellowOverlay">#e2df0b</color>
```

### Applying Colours

For (albeit extremely minor, possibly non-existent) performance reasons, a switch statement is used instead of a large if / else. The item's state (i.e. the colour it needs tinting) is checked against the list of states, and the correct colour is applied. The `MULTIPLY` porterduff mode is used. The technicalities of this aren't necessary to know, but [a reference image](/assets/images/2024/tinting-reference.png) is very useful (source: [Softwyer](https://softwyer.wordpress.com/2012/01/21/1009/)). Essentially, multiple merges the two resources, in this case the item image and the colour overlay, but only the pixels where the first resource isn't fully transparent.

`imageResource` is the item drawable to be modified. If no coloured state is identified, any existing colour filters are cleared, in case they've somehow got attached erroneously earlier on.

```
switch (itemState) {
    case Constants.STATE_RED: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.redOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    case Constants.STATE_BLUE: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.blueOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    case Constants.STATE_GREEN: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.greenOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    case Constants.STATE_WHITE: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.whiteOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    case Constants.STATE_BLACK: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.blackOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    case Constants.STATE_PURPLE: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.purpleOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    case Constants.STATE_YELLOW: imageResource.setColorFilter(ContextCompat.getColor(context, R.color.yellowOverlay), PorterDuff.Mode.MULTIPLY);
        break;
    default: imageResource.clearColorFilter();
        break;
}
```

Note that `ContextCompat.getColor(context, id)` is used to get the resolved colour instead of the very common, but deprecated, `context.getResources().getColor(id)`. The latter method is extremely widespread, so unlikely to ever actually be removed, but it's still always worth avoiding deprecated methods, to cut down on future maintenance.

## The Conclusion

Whilst providing a visual representation of the item's state is a minor UI change, it helps reinforce the differences between items, and make the game's items seem more varied. Identifying the colour filter mode and colour codes to use are rather dull exercises in trial and error, but the final effect is very effective.

Tinting a drawable with a colour is a common requirement in apps, helping to cut down on the number of unique drawables needed. This is much easier if the drawable is a single colour, specifically white. Below, the difference in effect between an ideal item (mostly white) and an imperfect one (2 strong colours, green and gold). The effect is much more obvious in the first, although still noticeable in the second.

| Swords | Helmets |
| -- | -- |
| [![screenshot_1484960747](/wp-content/uploads/2017/01/screenshot_1484960747.png)](/wp-content/uploads/2017/01/screenshot_1484960747.png) | [![screenshot_1484961693](/wp-content/uploads/2017/01/screenshot_1484961693.png)](/wp-content/uploads/2017/01/screenshot_1484961693.png) |