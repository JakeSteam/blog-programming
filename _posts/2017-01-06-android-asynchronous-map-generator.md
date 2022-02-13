---
id: 32
title: 'Asynchronous Map Generator for Android'
date: '2017-01-06T18:36:31+00:00'
author: 'Jake Lee'
layout: post
permalink: /android-asynchronous-map-generator/
image: /wp-content/uploads/2017/01/xrulgkh.png
categories:
    - 'Android Dev'
tags:
    - Algorithm
    - 'Isometric Tiles'
    - 'Map Generation'
    - Java
---

[City Flow](https://play.google.com/store/apps/details?id=uk.co.jakelee.cityflow) is an Android game that tasks players with solving puzzles by rotating tiles to make all “flows” match up with no loose ends. Each tile has a flow (e.g. road, path, grass, river) on each side, as well as a height (high, normal, low). There are a few hundred built-in levels, but players can also create, share, and import their own levels for extended playability.

The game features a level generator, where players can specify:

- Puzzle width (2-15)
- Puzzle height (2-15)
- Environment (subset of tiles to use)
- Whether a blank puzzle should be generated
- Whether they wish to edit the puzzle before playing

Since a puzzle can contain up to 225 tiles (15×15), each from a pool of 200+ different tile types, the amount of data to process can swiftly ramp up.

Additionally, since this process could take a long time, it must be performed off the main thread (asynchronously). The player also needs to be kept updated throughout the process with current progress, and have the ability to cancel midway through.

## The Solution

We’re going to display an updating popup on screen, whilst the generation happens in the background using an `AsyncTask` . Generation will occur by cycling through every x and y position, generating a list of all possible tiles, then randomly selecting one. If a “dead end” is reached (e.g. a non-existent tile configuration is requested), limited backtracking will occur.

#### Updating Dialog

First of all, a “currently generating” popup is displayed on screen, which calls the Puzzle Generator and handles displaying progress.

Note the “execute” method called immediately after creation, this is what actually triggers the `AsyncTask` to start.

```
private static void puzzleLoadingProgress(final Activity activity, int xValue, int yValue, int environmentId, boolean blankPuzzle, boolean shuffleAndPlay) {
    final Dialog dialog = new Dialog(activity);
    dialog.setContentView(R.layout.custom_dialog_puzzle_loading);
    dialog.setCancelable(true);
    ((TextView) dialog.findViewById(R.id.title)).setText(Text.get("WORD_LOADING"));
    dialog.show();

    PuzzleGenerator puzzleGenerator = new PuzzleGenerator(activity,
            dialog,
            xValue,
            yValue,
            environmentId,
            blankPuzzle,
            shuffleAndPlay);
    puzzleGenerator.execute("");
}
```

The required parameters are passed to the generator, namely:

- Puzzle options (size, environment, whether to play immediately, etc)
- UI elements that need to be kept updated on current progress (elements in the dialog)

#### Puzzle Generator Constructor

Variables are for the most part just assigned to local variables for future usage, except for UI elements which are found in the calling dialog.

`hasAllTiles()` is a flag for whether the user has purchased the ability to access all tiles without unlocking them through gameplay, and is not relevant for this example.

```
public class PuzzleGenerator extends AsyncTask {
    ... variables snipped ...

    public PuzzleGenerator(Activity activity, Dialog dialog, int xValue, int yValue, int environmentId, boolean blankPuzzle, boolean shuffleAndPlay) {
        this.activity = activity;
        this.dialog = dialog;
        this.xValue = xValue;
        this.yValue = yValue;
        this.environmentId = environmentId;
        this.blankPuzzle = blankPuzzle;
        this.shuffleAndPlay = shuffleAndPlay;
        this.hasAllTiles = Iap.hasAllTiles();

        this.progressText = (TextView) dialog.findViewById(R.id.progressText);
        this.progressPercentage = (TextView) dialog.findViewById(R.id.progressPercentage);
    }
```

#### Cancellability

To add the ability to cancel puzzle generation despite happening asynchronously, a simple cancel listener was added to the calling dialog before execution. This means that when the back button is pressed, the `cancelReceived` flag will be set to true, which the actual generators check during execution.

```
@Override
protected void onPreExecute() {
    dialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
        @Override
        public void onCancel(DialogInterface dialogInterface) {
            cancel();
        }
    });
}

public void cancel() {
    cancelReceived = true;
}
```

#### Beginning Generation

After `onPreExecute` has run, the main meat of the task `doInBackground` is called. This checks whether full puzzle generation needs to happen. If a blank puzzle is requested, then all tiles are selected as a predetermined “empty” tile for the selected environment, with no flow &amp; a normal height on all sides.

This article will only cover `createFilledPuzzle()`, since `createEmptyPuzzle()` is just a simpler version.

```
@Override
    protected Integer doInBackground(String... params) {
    totalTiles = xValue * yValue;
    if (blankPuzzle) {
        return createEmptyPuzzle(xValue, yValue, environmentId);
    } else {
        return createFilledPuzzle(xValue, yValue, environmentId);
    }
}
```

Notice the `totalTiles` local variable being set, this is used to calculate a % complete to display to the end user. After each tile is generated, `onProgressUpdate` is passed the total number of tiles generated. Using this it calculates how far through the process the generator is, and keeps the user updated in real time via the views on the calling dialog.

```
@Override
protected void onProgressUpdate(Integer... values) {
    int percent = (int) (((double) values[0]) / ((double) totalTiles) * 100);
    progressPercentage.setText(String.format(Locale.ENGLISH, "%1$d%%", percent));
    progressText.setText(String.format(Locale.ENGLISH, "(%1$d/%2$d)", values[0], totalTiles));
}
```

#### Creating The Puzzle

First, placeholder puzzle objects are created. This gives a puzzle ID, so that the tiles can be saved to the correct puzzle. `PuzzleCustom` is also used as this is a player created puzzle, not one included in the game.

```
private int createFilledPuzzle(int maxX, int maxY, int environmentId) {
    int newPuzzleId = getNextCustomPuzzleId();
    Puzzle newPuzzle = createBasicPuzzleObject(newPuzzleId);
    PuzzleCustom puzzleCustom = createBasicPuzzleCustomObject(newPuzzleId, maxX, maxY);

    newPuzzle.save();
    puzzleCustom.save();
```

Whilst the process can initially seem complex, essentially we’re just looping through every y position for every x position, from 0 to the maximum. Note the `cancelReceived` check, which will cancel puzzle generation if the back button has been pressed.

`getPossibleTiles()` is explained fully in the next step, it essentially returns a list of all tiles (and their rotation) that could fit into the specified x and y, based on the existing tiles. If any tiles are returned, one of them is randomly picked using [a simple Math.random() function](http://stackoverflow.com/questions/363681/generating-random-integers-in-a-specific-range). Alternatively, the failed attempt counters are increased, and we move on to the next code block…

```
List tiles = new ArrayList();
int prevY = 0;
int failedAttempts = 0;
int totalAttempts = 0;
int maxAttemptsPerTile = 3;
int maxTotalAttempts = 10;
for (int x = 0; x < maxX; x++) {
    for (int y = 0; y < maxY; y++) {
        if (cancelReceived) {
            newPuzzle.safelyDelete();
            return 0;
        }

        List potentialTiles = getPossibleTiles(newPuzzleId, tiles, x, y, maxX - 1, maxY - 1, environmentId);
        if (potentialTiles.size() > 0) {
            Tile selectedTile = potentialTiles.get(RandomHelper.getNumber(0, potentialTiles.size() - 1));
            tiles.add(selectedTile);
            prevY = y;
            failedAttempts = 0;
        } else {
            failedAttempts++;
            totalAttempts++;
            failedTiles++;
```

First, we check if the current tile has been tried too many times, or we’ve failed too many times during the puzzle in general. If so, we just give up, and put in an empty tile, otherwise we’ll end up backtracking forever! This happens more often the more complex the flow / height setup of the puzzle is.

If we want to try again, we remove the last tile in the generated tiles list, and get the previous tile’s x and y, so that the next generation iteration can try it again.

Whilst being able to do multiple backtracks is essential, it’s important to set some kind of global maximum, otherwise a puzzle can get stuck, and it’s very hard to detect this situation (since tiles are generating successfully, but creating an impossible situation for the next tile).

Note the `publishProgress` method being called after each iteration, as mentioned earlier.

```
            if (failedAttempts > maxAttemptsPerTile || totalAttempts > maxTotalAttempts) {
                tiles.add(new Tile(newPuzzleId, 0, x, y, Constants.ROTATION_NORTH));
                prevY = y;
                failedAttempts = 0;
                totalAttempts = 0;
                failedTiles++;
            } else {
                tiles.remove(tiles.size() - 1);
                if (y == 0) {
                    x--;
                    y = maxY - 1;
                } else {
                    y = prevY - 1;
                }
            }
        }
        publishProgress(tiles.size());
    }
}
```

The puzzle is now generated, so we shuffle it if the user wants to play it immediately, otherwise save all the tiles, and return the new puzzle’s ID, so that we can redirect the player to either play or edit the level.

```

    if (shuffleAndPlay) {
        Puzzle.shuffle(tiles);
        Tile.executeQuery("UPDATE tile SET default_rotation = rotation WHERE puzzle_id = " + newPuzzleId);
    } else {
        Tile.saveInTx(tiles);
    }
    return newPuzzleId;
}
```

#### Get All Possible Tiles For Position

To identify possible tiles, we need to know the existing tiles (since we usually need to match their flow &amp; height), as well as what position we’re looking for.

First we get the south &amp; west tiles. If we’re on the furthest south / west position (X / Y = 0), then there won’t be a tile in that position. These 2 tiles are required to calculate what flows we need. We get the tile type to avoid looking it up repeatedly.

Next we calculate what flows are allowed on all sides. If we’re at the max X / Y, we’re at the edge, so no flows are allowed on that side. Otherwise, we look at the previously fetched tile types (using our knowledge of the tile’s current rotation) to identify what flows are allowed. Height is a very similar process, except that any height can touch the edge of the puzzle.

Then we call the `getPossibleTilesByRotation` function 4 times, once assuming all potential tiles are facing North, then East, South, and West. This ensures that tiles that are suitable in multiple rotations are included repeatedly.

```
private List getPossibleTiles(int puzzleId, List existingTiles, int tileX, int tileY, int maxX, int maxY, int environmentId) {
    Tile southTile = tileY == 0 ? new Tile() : existingTiles.get(existingTiles.size() - 1); // Get the south tile, or an empty one if we're starting a new column
    Tile westTile = tileX == 0 ? new Tile() : existingTiles.get(existingTiles.size() - (maxY + 1)); // Get the west tile (#Y tiles previous), or empty if new row

    TileType southTileType = TileType.get(southTile.getTileTypeId());
    TileType westTileType = TileType.get(westTile.getTileTypeId());

    int nFlow = tileY == maxY ? 0 : Constants.FLOW_ANY;
    int eFlow = tileX == maxX ? 0 : Constants.FLOW_ANY;
    int sFlow = southTileType.getFlow(Constants.SIDE_NORTH, southTile.getRotation());
    int wFlow = westTileType.getFlow(Constants.SIDE_EAST, westTile.getRotation());

    // If there's no flow, then do any height we want
    int nHeight = Constants.FLOW_ANY;
    int eHeight = Constants.FLOW_ANY;
    int sHeight = sFlow > 0 && tileY > 0 ? southTileType.getHeight(Constants.SIDE_NORTH, southTile.getRotation()) : Constants.FLOW_ANY;
    int wHeight = wFlow > 0 && tileX > 0 ? westTileType.getHeight(Constants.SIDE_EAST, westTile.getRotation()) : Constants.FLOW_ANY;

    // Make list
    List tiles = getPossibleTilesByRotation(puzzleId, tileX, tileY, environmentId, Constants.ROTATION_NORTH, nFlow, eFlow, sFlow, wFlow, nHeight, eHeight, sHeight, wHeight);
    tiles.addAll(getPossibleTilesByRotation(puzzleId, tileX, tileY, environmentId, Constants.ROTATION_WEST, wFlow, nFlow, eFlow, sFlow, wHeight, nHeight, eHeight, sHeight));
    tiles.addAll(getPossibleTilesByRotation(puzzleId, tileX, tileY, environmentId, Constants.ROTATION_SOUTH, sFlow, wFlow, nFlow, eFlow, sHeight, wHeight, nHeight, eHeight));
    tiles.addAll(getPossibleTilesByRotation(puzzleId, tileX, tileY, environmentId, Constants.ROTATION_EAST, eFlow, sFlow, wFlow, nFlow, eHeight, sHeight, wHeight, nHeight));

    return tiles;
}
```

#### Get Possible Tiles For Current Rotation

Since we’re using a database to store all our tile information, we manually construct a query to get all possible tiles based on the parameters received.

The `match` function is used extensively, it is used so that -1 can be used to represent “Any”. For example, a value of 1 would result in `name = 1`, whilst -1 would result in `name >= -1`.

First, we construct the SQL for checking the flow. This is relatively straightforward, the only complexity is forcing the very first tile to have a flow (otherwise we might get a puzzle of all decorative / empty tiles!). We then repeat the process for height.

Next, we make sure we’re only selecting from tiles that are unlocked (unless they have unlocked accessing all tiles) in the selected environment. The final list of tile types are then made into tile objects for the puzzle, most importantly with the selected rotation.

```
private List getPossibleTilesByRotation(int puzzleId, int x, int y, int environmentId, int rotation, int nFlow, int eFlow, int sFlow, int wFlow, int nHeight, int eHeight, int sHeight, int wHeight) {
    String flowSql = String.format(Locale.ENGLISH, "%1$s AND %2$s AND %3$s AND %4$s",
            match("flow_north", nFlow),
            match("flow_east", eFlow),
            match("flow_south", sFlow),
            match("flow_west", wFlow));
    String forceFlowSql = (x == 0 && y == 0 ? " AND (flow_north > 0 OR flow_east > 0 OR flow_south > 0 OR flow_west > 0)" : "");

    String heightSql = String.format(Locale.ENGLISH, "%1$s AND %2$s AND %3$s AND %4$s",
            match("height_north", nHeight),
            match("height_east", eHeight),
            match("height_south", sHeight),
            match("height_west", wHeight));

    String sql = String.format(Locale.ENGLISH, "environment_id %1$s %2$d AND " + flowSql + forceFlowSql + " AND " + heightSql + " AND status %3$s %4$d",
            environmentId > 0 ? "=" : ">=", environmentId,
            hasAllTiles ? ">=" : "=",
            Constants.TILE_STATUS_UNLOCKED);
    List tileTypes = TileType.find(TileType.class, sql);

    List tiles = new ArrayList();
    for (TileType tile : tileTypes) {
        tiles.add(new Tile(puzzleId, tile.getTypeId(), x, y, rotation));
    }
    return tiles;
}

private static String match(String name, int value) {
    return String.format(Locale.ENGLISH, "(%1$s %2$s %3$s)",
            name,
            (value >= 0 ? "=" : ">="),
            value);
}
```

## The Conclusion

The puzzle generator is very much an optional feature of City Flow, but one which has grown more and more powerful over time. It has gone through various refactorings to improve readability, but unfortunately the more complex parts are still rather hard to understand. However, it performs excellently, and should hopefully provide increased longevity to the game’s lifespan by allowing more levels to be generated than players can ever complete.

Whilst there are quite a few domain specific elements in the code (e.g. `hasAllTiles`, `environmentId`), the general idea of generating a data structure in the background and keeping users updated is definitely applicable to other scenarios.

To improve performance, reducing the number of `String.format`s would be a good start, as there are currently 44 per tile, resulting in a worst case scenario of almost 10k calls ((44 \* (15 \* 15)) = 9900).

The full `PuzzleGenerator.java` file can be downloaded from [GitHub Gist](https://gist.github.com/JakeSteam/b4821859e08202a0040d67f0b6158bec).

*Disclaimer: I wrote [City Flow](https://play.google.com/store/apps/details?id=uk.co.jakelee.cityflow), I’m featuring it here because I know the codebase very well!*