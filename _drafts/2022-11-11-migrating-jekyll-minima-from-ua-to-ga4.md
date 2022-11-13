---
title: How to migrate a Jekyll Minima blog from Universal Analytics to Google Analytics 4 (UA to GA4)
author: Jake Lee
layout: post
image: /assets/images/2022/ga4-banner.png
tags:
    - 'Google Analytics'
    - 'Jekyll'
---

When I first setup my Jekyll blog with Minima, it had built-in support for Google Analytics. Great! However, only using a legacy "Universal Analytics" ID seemed to work. This was fine for a few years, until I discovered the system is being sunset, and all users *need* to move to Google Analytics 4 ASAP. Here's how to do it.

## Summary

Before I run through each step in detail, here's the high level overview:

1. Create a new GA4 property in Google Analytics to get a GA4 ID.
2. Override your Jekyll blog's UA code to support GA4.
3. Tidy up how your GA4 ID is used.
4. Testing.

## Step 1: Setting up GA4
Creating new property process
Getting ID

## Step 2: Replace existing tracking
Overriding header / GA file

## Step 3: Tidy up ID usage
Adding dynamic ID

## Step 4: Testing
Open locally (disabling checks)
Should see data flowing remotely