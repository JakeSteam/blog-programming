---
title: Introducing "Replace" AKA rp.lc, a platform for creating simulation games from any image
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - rp.lc
    - Kotlin
---

intro?

## What is rp.lc?

At it's core, rp.lc is an engine that performs image manipulations to generate simulations from input images.

These arbitrary rules are defined in a "recipe" that acts on an input image. The complexity comes from this recipe's ability to define resources, tile types, structures, actions to take each "tick", and overall appearance of the simulation.

## What can rp.lc be used for?

Well, any simulation-style game you can imagine players interacting with!

A few examples, all of which would of course require image inputs from players:

* An "anthill" simulation with ant types, eggs, food, with the score being the colony's lifetime.
* A "city" simulation with industry types, transport, trade, with the score being the technology level.
* An "aquarium" simulation with types of fish and food, with the score being the size of the largest fish.

## What are the current & future rp.lc features?

There is a continually updated [to do list](https://github.com/JakeSteam/rp.lc/blob/main/todo.md) on rp.lc's repository, but here's a summary:

### Current

rp.lc can chain together multiple analysis / action rules and recipe rules, then perform the specified actions on any input image. A score & rank will be output.

* **Recipe**: Load & save a recipe from a JSON file.
* **Input image**: Handle PNG/JPG/BMP inputs, resize them appropriately, and retrieve their pixel info.
* **Rules**: Handle fully dynamic rulesets, with the ability to combine arbitrary data.
* **Output image**: Save static simulation to a PNG image.
* **Resources / Score**: Calculate the simulation's resources based on tiles, and use these to generate a score and rank.

### Short-term future

### Long-term future

## Project inspiration