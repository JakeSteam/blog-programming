---
id: 639
title: 'Selecting A Weighted Random Item From A List in Android'
date: '2017-01-27T12:00:05+00:00'
author: 'Jake Lee'
layout: post
permalink: /android-selecting-a-weighted-random-item-from-a-list/
image: /wp-content/uploads/2017/01/nsgt4yc.png
categories:
    - 'Android Dev'
tags:
    - Randomness
    - SQLite
    - Weighting
    - Java
---

In [Pixel Blacksmith](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmith), visitors arrive in the shop and have demands that need fulfilling. The visitors are mostly random, but each visitor is weighted to appear more or less frequently, to allow for rarer visitors. These weighted probabilities also need to be modifiable, to add seasonal visitors etc.

## The Solution

First, a list of all candidates must be created. The SQL in the example below is mostly irrelevant, it selected all visitors except ones that are currently present, it can be replaced by any other technique that ends up with a list of items.

```
private static Visitor_Type selectVisitorType() {
    Visitor_Type visitor = new Visitor_Type();

    List visitorTypes = Visitor_Type.findWithQuery(Visitor_Type.class,
            "SELECT * FROM VisitorType WHERE visitor_id NOT IN (SELECT type FROM Visitor)");
```

Most importantly, every item in the list that is being selected from must have a weighting, determining how likely they are to be selected. The actual values are irrelevant, all that matters is their relation to each other. For example, a weighting of 20 is twice as likely to be selected as a weighting of 10.

Next, the total weighting must be calculated. This is a simple case of iterating through the list and summing the weights.

```
// Work out the total weighting.
double totalWeighting = 0.0;
for (Visitor_Type type : visitorTypes) {
    totalWeighting += type.getWeighting();
}
```

After we have a total weighting, a number has to be selected between 0 and the total weighting. Due to `Math.random()` returning a `double` between 0 and 1, this is just a case of multiplying the result by the total weighting.

To explain how this works, imagine a list of 2 items, one with a weight of 10, and one with a weight of 30, giving a total weight of 40. If a number between 0-10 is picked, the first item will be selected, but if the number is in the larger range of 11-40, the second item will be picked. This effectively makes the second item 3x more likely to be selected, due to the ratio between 10 and 30.

```
// Generate a number between 0 and total probability.
double randomNumber = Math.random() * totalWeighting;
```

Now that a number has been selected, the list has to be walked through, keeping track of the running total. If after adding the current item’s weighting the total is above the random number, then the random number is in the current item’s range, so has been selected. The selected item is then returned.

```
    // Use the random number to select a visitor type.
    double probabilityIterator = 0.0;
    for (Visitor_Type type : visitorTypes) {
        probabilityIterator += type.getWeighting();
        if (probabilityIterator >= randomNumber) {
            visitor = type;
            break;
        }
    }
    return visitor;
}
```

## The Conclusion

Whilst a simple little function, the ability to select a weighted item from a list is pretty important if there’s any kind of loot / spawn mechanics in a game. The code isn’t dependant on any type of object or ORM, so is applicable to most scenarios.

A future improvement would be creating a generic function that receives a list of items that implement `.getWeighting()`, then returns a single item of that type. This would ensure the same code could be reused for multiple selections.

A Gist of the full function (and a Kotlin updated version) [is available here](https://gist.github.com/JakeSteam/79dc987c2c46cf83b0883a1a749d9360).

*<a href="https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmith">Pixel Blacksmith</a> is a free game developed by myself, it’s featured here because I know the code well!*