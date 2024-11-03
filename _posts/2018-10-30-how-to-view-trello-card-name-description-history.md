---
id: 1885
title: 'How To View Trello Card Name / Description History'
date: '2018-10-30T19:31:16+00:00'
permalink: /how-to-view-trello-card-name-description-history/
image: /wp-content/uploads/2018/10/rr2lf5U.png
categories:
    - 'Project Management'
tags:
    - Agile
    - API
    - Kanban
    - Trello
---

Trello’s card management system is an extremely widely used approach to managing smaller projects, by moving cards left to right as they progress through various stages (Needs Estimate, In Progress, In QA, etc). Having a history of actions taken is essential, as it ensures all team members are aware of the card’s state at any time.

The activity log below each card contains details of the card movements between columns, comments, and assigned members. However, it misses crucial information such as the card’s name and description, which can easily be accidentally edited with no undo option. To access this information, we’ll have to do a (very basic!) dive into Trello’s API…

## Get card ID

First, open the target card that you need the history for. In the URL, after `/c/` there should be an 8 character long card identifier.  
For example, from the URL `https://trello.com/c/utrTeUcA/376-test-card`, we can retrieve the ID of `utrTeUcA`.

## Create base URL

To access the API, put the ID identified into the following URL: `https://trello.com/1/cards/ID HERE/actions`. For example, our ID from earlier gives us `https://trello.com/1/cards/utrTeUcA/actions`.

By default, this will return a JSON array of all comments on the card, with a large amount of metadata.

## Filtering results

Finally, we need to make the results more readable, and retrieve only the changes we’re actually interested in.

To make it more readable, the extension [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc) will format the returned results in an easily readable format. Once this is installed, it will automatically apply on pages that contain just JSON content, and can be disabled when not needed.

To display only name changes, add `?filter=updateCard:name` to the end of the URL. For description changes, add `?filter=updateCard:description`. This will display the new value (under `card`), and the previous value (under `old`).  
![](https://i.imgur.com/rr2lf5U.png)

Note that this data can take a few minutes to be deleted, so for testing this approach it’s best to use an existing card with changes instead of making new changes.