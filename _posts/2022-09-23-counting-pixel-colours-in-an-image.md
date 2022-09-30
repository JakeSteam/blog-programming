---
title: How to count the number of pixels per colour in an image, without installing any software
author: Jake Lee
layout: post
image: /assets/images/2022/colours-banner.png
tags:
    - Web
    - JavaScript
---

Whilst working on a new project recently, I needed a list of all hex codes used in a very large pixel art image (1,000,000 pixels), sorted by how many pixels had each colour. I struggled to find any simple solution, so here's how I did it!

An important caveat is that I'm very aware I could have downloaded various libraries / image editors to solve this but... maybe I don't want to! This solution just needs Chrome, and access to dev tools.

## Photoshop's limitations

My initial instinct was to open the image in Photoshop, and use [the Histogram feature](https://helpx.adobe.com/uk/photoshop/using/viewing-histograms-pixel-values.html) to get my data. I used this for [my LEGO lenticular mosaic in 2017](https://jakelee.co.uk/lego-mario-and-luigi-lenticular-mosaic/), so maybe that'll work...

[![histogram](/assets/images/2022/colours-histogram.png)](/assets/images/2022/colours-histogram.png)

Well, that's something. Not what I wanted, but something. We can see the colours tend to spike at either end of the chart, suggesting white and black, as well as pure-colour pixels are common. However, with 250+ colours in my image, this isn't good enough.

## Getting all colours

After many fruitless Google searches for "online image processing", "pixel colour counter", "online count pixels" etc, I finally found a site that seemed like what I wanted. 

Ashley Grenon's [Pixel Color Counter](https://townsean.github.io/canvas-pixel-color-counter/) is a no-frills site that, unsurprisingly, counts how many pixels of each colour there are. It's also [open source](https://github.com/townsean/canvas-pixel-color-counter). Let's use a cute pixel art Charmander to test it out:

[![first analysis](/assets/images/2022/colours-charmander-thumbnail.png)](/assets/images/2022/colours-charmander.png)

Okay! We've got 7 unique colours, and how many pixels each colour occupies. For this example, we could just look at the image in Photoshop or similar to find our hex codes, but what if we have a more complex image? Let's try pixel art of the first 9 pokémon, to keep with the theme:

[![second analysis](/assets/images/2022/colours-first9-thumbnail.png)](/assets/images/2022/colours-first9.png)

Alright, 36 is too many colours to look each up, there must be a better way.

## Catching the raw data

Since we know [Pixel Color Counter](https://townsean.github.io/canvas-pixel-color-counter/) is a simple JavaScript webapp, we can look directly at the colour data after it's been processed! If you've not used Chrome's dev console before this might be a little bit confusing, but it's easier than it looks:

1. **Open the console**: Press F12, or Ctrl + Shift + I, or Options -> More tools -> Developer tools.
2. **Find our target code**: Use the "Sources" tab at the top, and open `counter.js` under `/assets/`.
3. **Set a breakpoint**: Click the number "33" next to `return colorCounts`, this will make the code pause next time we're about to return the colour data.

Your console should look like this:

[![setting developer tools breakpoint](/assets/images/2022/colours-tools-740w.png)](/assets/images/2022/colours-tools.png)

Finally, upload an image, and your breakpoint should be hit! Notice `colorCounts`, full of lots of RGBA values? That's what we were after.

[![hitting developer tools breakpoint](/assets/images/2022/colours-breakpoint-740w.png)](/assets/images/2022/colours-breakpoint.png)

## Inspecting the raw data

If we switch to the "Console" tab, type `colorCounts`, and press enter, we can see what our captured data looks like. 

[![initial view of data](/assets/images/2022/colours-initial.png)](/assets/images/2022/colours-initial.png)

Here's where we get our first red flag. The data looks OK at first glance, but eventually you may notice the data's keys (e.g. each colour) are named as the CSS code required to display them on screen. This works fine if we only ever want to show these colours on the website, but we want to extract all the data, preferably as standard hex codes! 

## Converting the raw data

So, what do we do? Well, we write a script to sort the data out for us. Knowing what the following code does isn't at all necessary to use it. 

1. Make sure your breakpoint from earlier has been hit.
2. Copy and paste the following into the "Console" tab
3. Press enter, and the result will be a tidied, sorted array!

```
// Prepare a new empty array, to store our tidied up data in.
var newArray = []; 

Object.keys(colorCounts).forEach(key => {
    // Remove the CSS wrapper from the key: `rgba(` & `)`.
    var keyNumbers = key.substring(key.indexOf("(") + 1, key.lastIndexOf(")"))

    // Split the key into red, green, and blue, discarding the alpha (transparency).
    var keyRGB = keyNumbers.split(", ", 3)

    // Convert the RGB values into a hex code.
    var keyHex = "#" + ((1 << 24) + (parseInt(keyRGB[0]) << 16) + (parseInt(keyRGB[1]) << 8) + parseInt(keyRGB[2])).toString(16).slice(1);

    // Save the key's value into our new array, with a new key.
    newArray[keyHex] = colorCounts[key]
}); 

// Sort the new array in descending order, and output it.
var sortedArray = Object.fromEntries(
    Object.entries(newArray).sort( (a,b) => b[1] - a[1] )    
);
console.log(sortedArray)
```

After using this script, your Console should look like the below. Notice the `#000000: 103500, #ff6208: 25500, #3bd8ff: 16700`, that looks a lot like a sorted list of hex colour codes!

[![converted view of data](/assets/images/2022/colours-result-740w.png)](/assets/images/2022/colours-result.png)

## Using the raw data

The final step is right clicking the outputted array, and selecting "Copy object":

[![copy object](/assets/images/2022/colours-copyobject.png)](/assets/images/2022/colours-copyobject.png)

Your data is ready to put somewhere! I usually use VSCode:

[![pasted into vscode](/assets/images/2022/colours-vscode.png)](/assets/images/2022/colours-vscode.png)

Enjoy! 🎉