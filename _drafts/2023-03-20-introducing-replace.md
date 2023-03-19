---
title: Introducing "Replace" AKA rp.lc, a platform for creating recipes for simulation games from any image
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - rp.lc
    - Kotlin
---

intro?

TO DO BEFORE FINISHING:
- Add some kind of "behave according to neighbour" rule
- Add extra rules (beach, deep sea) to example
- Add basic structure support
- Add boat / beach hut to example
- Update score / resources

## What is rp.lc?

At it's core, rp.lc is an engine that performs image manipulations to generate simulations from input images.

These arbitrary rules are defined in a "recipe" that acts on an input image. The complexity comes from this recipe's ability to define resources, tile types, structures, actions to take each "tick", and overall appearance of the simulation. It is written in Kotlin.

## What can rp.lc be used for?

Well, any simulation-style game you can imagine players wanting to generate from their images!

A few examples, all of which would of course require image inputs from players:

* An "anthill" simulation with ant types, eggs, food, with the score being the colony's lifetime.
* A "city" simulation with industry types, transport, trade, with the score being the technology level.
* An "aquarium" simulation with types of fish and food, with the score being the size of the largest fish.
* An "island" simulation with water, trees, mountains, with score being ecosystem diversity.

## Example recipe

This very basic "island" recipe can be seen as a [set of rules]() or [a JSON recipe]().

| Input | Output | Notes |
| --- | --- | --- |
| | |

### How does it work?

-- recipe on excalidraw --

## What are the current & future rp.lc features?

There is a continually updated [to do list](https://github.com/JakeSteam/rp.lc/blob/main/todo.md) on rp.lc's repository, but here's a summary:

### Current

rp.lc can chain together multiple analysis / action rules and recipe rules, then perform the specified actions on any input image. A score & rank will be output.

* **Recipe**: Load & save a recipe from a JSON file.
* **Input image**: Handle PNG/JPG/BMP inputs, resize them appropriately, and retrieve their pixel info.
* **Rules**: Handle fully dynamic rulesets, with the ability to combine arbitrary data.
* **Output image**: Save static simulation to a PNG image.
* **Resources / Score**: Calculate the simulation's resources based on tiles, and use these to generate a score and rank.

### Short-term future features

* **Structures**: Support objects on top of tiles, with requirements, resources, etc.
* **Output image**: Support high res output, using icons instead of colours for tiles.
* **Time**: Support "ticking" time forward, with actions & world changes taken each tick. 
* **UI**: Have a basic UI for picking recipe & input image, as well as viewing output image & logs / score.
* **Rules**: Create a scalable rule architecture, and provide more example rules (e.g. copy nearby pixels if surrounded, % tolerances, etc). I'll use goal scenarios (anthill, game of life, etc) to guide rule creation.

### Long-term future features

* **Ecosystem**: Create an ecosystem of recipes, highscores, discussions, and "subrecipes" (reusable blocks).
* **Recipe creator**: A drag & drop recipe builder, with built-in validator.
* **Deployable**: Make rp.lc usable as a player without any technical knowledge / installation, perhaps as a webapp.

## Project inspiration

## Conclusion