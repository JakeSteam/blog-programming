---
id: 2521
title: 'Tutorials overview for Retrofit'
date: '2019-06-05T17:00:51+01:00'
permalink: /tutorials-overview-for-retrofit/
image: /wp-content/uploads/2019/06/1_WMf1XcyKU98dOMlNnn-Agg.png
categories:
    - 'Android Dev'
tags:
    - API
    - Retrofit
---

Whilst I’ve used [Retrofit](https://square.github.io/retrofit/) before, I’d always just used the very basics and not thought much about it. Hey, it’s just the API interface, who cares right? I decided to check out a few implementations of the basics, making a repo along the way. [This GitHub repo is available here](https://github.com/JakeSteam/retrofit-experiments), and contains completed versions of most of the tutorials listed here.

This post will very briefly cover the few tutorials used, although not all were completed fully for various reasons.

## “Retrofit – A simple Android tutorial” – Prakash Pun

[This tutorial](https://medium.com/@prakash_pun/retrofit-a-simple-android-tutorial-48437e4e5a23) starts off strong, providing prominent links to the example repo and library. Each step is clearly defined, as well as why the code is needed. Luckily, Prakash also avoids falling into the mistake of pages upon pages of boilerplate code, and keeps it simple.

Whilst there are minor typos (`progressDoalog` springs to mind), the overall code works out of the box, and produces an impressive end result.

[The tutorial](https://medium.com/@prakash_pun/retrofit-a-simple-android-tutorial-48437e4e5a23) perfectly shows the core Retrofit concepts, albeit perhaps in not quite enough detail, but it’s an absolutely solid starting point. Another improvement would be suggestions for related resources at the end, for those curious readers who want to learn more.


## “Using Retrofit 2.x as REST client” – Vogella

[This tutorial](https://www.vogella.com/tutorials/Retrofit/article.html) contains a few examples of uses, and dives quite deep into the entire app creation process.

I found this tutorial fairly disappointing. Whilst it contained a lot of useful information, there were quite a few massive mistakes (e.g. sections 3 &amp; 6 contain exactly the same text and code, presumably a poor copy and paste job).

The dive into XML processing was a nice change from the GSON parsing all tutorials use, but the code was rarely explained sufficiently. Instead the entire file was displayed, with little surrounding information, jumping between many files without much discussion of *why*.

The final issue was the same (large) files being displayed in full repeatedly, with minor changes, requiring close inspection to find the changes. Whilst the end result is multiple useful Retrofit implementations, the emphasis on non-Retrofit boilerplate code reduces the usefulness. Unfortunately I gave up on the tutorial after the 8th section, as the mistakes got somewhat overwhelming!

## “Retrofit Android Example Tutorial” – Anupam Chugh

[This tutorial](https://www.journaldev.com/13639/retrofit-android-example-tutorial) uses [Reqres](https://reqres.in) to handle fake data generation, making the example seem more realistic. Whilst the tutorial (as seems common) suffers from a few typos, and the end code is rather spaghetti-like, it utilises an impressive array of Retrofit features. In a single tutorial, it manages to cover all of the basics, as well as exploring OkHTTP’s interceptors to change the logging configuration.

One downside of the tutorial is the code blocks not being sufficiently explained, and instead just appearing. As an example, the final step adds 70-80 lines to `MainActivity.java`, with just a 1 sentence explanation of the overall effect.

Despite the drawbacks, this tutorial ends up with a pretty powerful Activity, capable of GETting and POSTing multiple resource types. As always, a nice improvement would be further reading suggestions.