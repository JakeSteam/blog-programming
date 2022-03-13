---
title: How I built the Google Play purchase history analyser
author: Jake Lee
layout: post
image: /assets/images/2022/googleplay-header.png
tags:
    - JavaScript
    - Web
---

I just added a [Google Play purchase history analyser](https://jakelee.co.uk/purchase-history/) on my non-programming blog, along [with instructions](https://jakelee.co.uk/analysing-my-google-play-purchase-history/), and thought I'd save the technical details of the JavaScript project for here! 

There's a [full repository](https://github.com/JakeSteam/Google-Play-purchase-history-analyser) available for the analyser, or [the script](https://github.com/JakeSteam/blog-personal/blob/main/assets/js/purchasehistory/purchasehistory.js) actually used.

## Overall flow

Overall it's a pretty simple script, convenient as my JavaScript is very rusty!

Here's how it works at a high level:
1. Let the user load their purchase history `.json` file.
2. Parse the file as JSON and loop through every purchase.
3. Add the purchase value to an object in the format `summary[groupedByYear][2022][sum]`, and track total number similarly.
4. Loop through each of our groupings, outputting headers and values in HTML tables.

All of this is client-side JavaScript, so no data protection or server cost concerns! 

## 1. Load purchase history file

For this, we need a basic HTML input element with a filter, and somewhere to put our output:

```html
<input type="file" name="inputfile" id="inputfile" accept=".json">

<div id="output"></div>
```

and a `FileReader` listener that passes the contents of this file to our `handlePurchasesFile` function:

```js
document.getElementById('inputfile').addEventListener('change', function () {
    var fr = new FileReader();
    fr.onload = function () {
        handlePurchasesFile(fr.result);
    }
    fr.readAsText(this.files[0]);
})
```

## 2. Parse as JSON & loop through

JavaScript can unsurprisingly parse JSON easily, so we parse & pass our purchases to `getPurchasesSummary`.

```js
function handlePurchasesFile(json) {
    var purchases = JSON.parse(json);
    var summary = getPurchasesSummary(purchases);
    var output = document.getElementById('output');
    outputSummaries(output, summary);
}
```

This function uses `reduce` as a `foreach`, and parses the purchase price before ignoring any values with an `amount` of 0:

```js
function getPurchasesSummary(purchases) {
    return purchases.reduce((totals, purchase) => {
        var amount = Number(purchase.purchaseHistory.invoicePrice.replace(/[^0-9.-]+/g, ""));
        if (amount == 0) {
            return totals;
        }
```

## 3. Add values to summary object

Here comes the interesting bit. I wanted to dynamically build up the summary objects without knowing any values in advance. This lets the code be as flexible as possible, and avoids any unusual values being missed. Using purchase type as an example, the values can be `Paypal: example@example.com`, `VISA-1234`, or many other values impossible to hardcode.

The following code is run on each purchase, and passes the summary array ("totals"), grouping name ("Grouped by purchase type"), type of this purchase, and price of this purchase to `updateTotals`:

```js
        var type = purchase.purchaseHistory.doc.documentType;
        updateTotals(totals, 'Grouped by purchase type', type, amount);
```

This `updateTotals` function exists mainly to make sure all object values are defined before we try to set them. As an example on first run: 
1. `totals` may be an empty object. The first `if` statement will make sure it has `totals['Grouped by purchase type']`. 
2. The second `if` statement will make sure it has `totals['Grouped by purchase type']['Paypal']`, along with `count` and `sum` entries for this purchase type.
3. Finally now we know the object is prepared, we can increment the `count` and add to the total `sum`!

```js
function updateTotals(totals, fieldName, fieldValue, purchaseAmount) {
    if (!totals.hasOwnProperty(fieldName)) {
        totals[fieldName] = {}
    }
    if (!totals[fieldName].hasOwnProperty(fieldValue)) {
        totals[fieldName][fieldValue] = {}
        totals[fieldName][fieldValue]['count'] = 0;
        totals[fieldName][fieldValue]['sum'] = 0
    }
    totals[fieldName][fieldValue]['count']++;
    totals[fieldName][fieldValue]['sum'] += purchaseAmount
}
```

All the other groupings use similar logic; get the value for this purchase, and pass it to `updateTotals` with the grouping name. This lets new groupings be added very, very simply, with literally 2 lines of code! E.g.:

```js
        var hour = purchaseTime.getHours();
        updateTotals(totals, 'Grouped by hour of day', hour, amount);
```

## 4. Output summary

We've now built up a somewhat complex `summary` (`totals`) object, time to actually use it!

As a very old-fashioned approach, I'm just building up an HTML string by looping through each "grouping", outputting the title, then outputting the name, count, and sum for each value inside.

This HTML string is then added to my `output` div, displaying all the data!

```js
function outputSummaries(output, summary) {
    output.innerHTML = "";
    for (grouping in summary) {
        var newHTML = '<h2>' + grouping + '</h2>\n';
        newHTML += '<table><tr><th></th><th>Count</th><th>Total</th></tr>\n';
        for (type in summary[grouping]) {
            newHTML += '<tr><td><b>' + type + '</b></td>\n';
            newHTML += '<td>' + summary[grouping][type]['count'] + '</td>\n';
            newHTML += '<td>' + summary[grouping][type]['sum'].toFixed(2) + '</td></tr>\n';
        }
        newHTML += '</table><br>\n';
        output.innerHTML += newHTML;
    }
}
```

This outputs a basic table, which gets stylised by my blog's existing stylesheets:

![](/assets/images/2022/googleplay-example.png)

There we go! A basic but functional analyser, feel free to [try it for yourself](https://jakelee.co.uk/purchase-history/).

## Links

* [Google Play purchase history analyser](https://jakelee.co.uk/purchase-history/)
* [Non-programming blog post about how to use it](https://jakelee.co.uk/analysing-my-google-play-purchase-history/)
* [Proof of concept project](https://github.com/JakeSteam/Google-Play-purchase-history-analyser)
* [Code used for the actual analyser](https://github.com/JakeSteam/blog-personal/blob/main/assets/js/purchasehistory/purchasehistory.js) and [wrapper page](https://github.com/JakeSteam/blog-personal/blob/main/purchase-history.html)

