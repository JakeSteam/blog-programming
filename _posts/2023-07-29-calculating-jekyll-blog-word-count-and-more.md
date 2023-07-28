---
title: How to discover your Jekyll site's total word count, longest / shortest post, and more 🔡
author: Jake Lee
layout: post
image: /assets/images/2023/wordcount-banner.png
tags:
    - Ruby
    - Jekyll
---

I've been writing blog posts for quite a few years, and when a single post can easily be thousands of words... my total word count must be in the hundreds of thousands! To find out, I expanded an existing Jekyll plugin's functionality, here's how to use it.

## The plugin

The base of this post's work is (author!) [Matt Gemmell](https://mattgemmell.com/)'s [`Jekyll-Posts-Word-Count` plugin](https://github.com/mattgemmell/Jekyll-Posts-Word-Count), *however* we'll be [using my fork](https://github.com/JakeSteam/Jekyll-Posts-Word-Count) since it adds a ton of functionality.

The original plugin hasn't had more than minor updates in 9 years(!), yet it still works perfectly. The beauty of simple, functional code, huh? 

## Installation

If you're using GitHub Pages (as I am) for your Jekyll site, this plugin will not work remotely. However, locally anything goes.

1. Create a `_plugins` folder in your site's base folder (if it doesn't exist).
2. Open [the `posts-word-count.rb` script](https://github.com/JakeSteam/Jekyll-Posts-Word-Count/blob/master/posts-word-count.rb), click `...` in the top right, and select `Download`.
3. Move the downloaded file into your `_plugins` folder.

[![](/assets/images/2023/wordcount-installed.png)](/assets/images/2023/wordcount-installed.png)

The plugin is installed! Now to use it...

## Usage

The plugin works via tags, with something like {% raw %}`{% posts_word_count total %}`{% endraw %} giving the total word count.

`posts_word_count` can (and usually should) be replaced with `published_posts_word_count` to exclude all draft posts.

`total` can be replaced with quite a few different parameters:

* `total` (total word count of all posts)
* `average` (average word count across all posts)
* `total_characters` (total character count of all posts)
* `average_characters` (total average count of all posts)
* `longest` (longest word count of any post)
* `longest_post_index` (index in site.posts of longest post)
* `longest_post_title` (title of longest post)
* `longest_post_url` (url of longest post)
* `shortest` (shortest word count of any post)
* `shortest_post_index` (index in site.posts of shortest post)
* `shortest_post_title` (title of shortest post)
* `shortest_post_url` (url of shortest post)

To view all stats for a site (e.g. for the analysis below), you can use the following:

{% raw %}
```markdown
### Totals

Total site words: {% published_posts_word_count total %} (average {% published_posts_word_count average %} per post)

Total site characters: {% published_posts_word_count total_characters %} (average {% published_posts_word_count average_characters %} per post)

### Published post records 

Longest post: <a href="{% published_posts_word_count longest_post_url %}">{% published_posts_word_count longest_post_title %}</a> ({% published_posts_word_count longest %} words)

Shortest post: <a href="{% published_posts_word_count shortest_post_url %}">{% published_posts_word_count shortest_post_title %}</a> ({% published_posts_word_count shortest %} words)
```
{% endraw %}

This will (when deployed locally) show something like:

[![](/assets/images/2023/wordcount-deployed.png)](/assets/images/2023/wordcount-deployed.png)

## My stats

### Programming site

* Total site words: 152243 (average 945 per post)
* Total site characters: 1767231 (average 10976 per post)
* Longest post: [Asynchronous Map Generator for Android](https://blog.jakelee.co.uk/android-asynchronous-map-generator/) (3661 words)
* Shortest post: [2020’s essential Android development techniques](https://blog.jakelee.co.uk/2020s-essential-android-development-techniques/) (62 words)

3.6k words in a single post!? The map generator writeup was my very first post on the site way back in 2017, so I understandably spend quite a lot of time going into... perhaps too much detail. However, I wonder if code is somehow included, since the post doesn't seem *that* long. The shortest post is essentially just an advert for an article I wrote for my employer, hence the impressively low 62 words.

Overall I'm pretty happy with an average of ~1k words per post. I've always intended to write detailed, unique articles, and this shows they're usually "meaty" enough to justify publication. Nice! 150k words over 5.5 years is also not too bad, eventually I'd love to do an analysis over time.

Oh, and these stats exclude... most of this post, as they were calculated during the writing process!

### Personal site

* Total site words: 72107 (average 1716 per post)
* Total site characters: 613702 (average 14611 per post)
* Longest post: [Reviewing ALL 83 Steam games from the Yogscast’s Jingle Jam charity bundle (part 1 of 3)](https://jakelee.co.uk/reviewing-every-jingle-jam-steam-game/) (6700 words)
* Shortest post: [How to replace a faulty Flexispot standing desk leg motor](https://jakelee.co.uk/replacing-flexispot-e7-leg-motor/) (348 words)

Okay, 6.7k words on a single post is clearly too many, *especially* as it is just 1 of 3 parts! The Jingle Jam write-up was an incredibly time-consuming project, but I didn't realise quite how detailed my reviews were until now. Terrifying.

The short Flexispot article is primarily photos with descriptive text, so no concerns over post quality from me. I'm pretty happy with 72k total words, considering I only started my personal site in February 2022. The average length being significantly longer than my programming site is interesting, I suspect this is due to lots of very long game review / spreadsheet explanation posts, whereas my programming blog has quite a few text-light but code-heavy articles.

### Internet history site

* Total site words: 5776 (average 1444 per post)
* Total site characters: 49704 (average 12426 per post)
* Longest post: [17 years ago today, the Million Dollar Homepage was completed, making a student $1m in 5 months](https://history.jakelee.co.uk/million-dollar-homepage/) (2373 words)
* Shortest post: [20 years ago today, the ‘Most Annoying Webpage’ was launched, trapping victims in popups for a few minutes](https://history.jakelee.co.uk/most-annoying-webpage/) (1392 words)

I probably could have worked this out manually, there's only 3 posts! They're not as long as I was expecting, especially since these posts usually take multiple days to research. I guess their research per paragraph ratio is far higher, but this isn't reflected in a simple word count! Similarly, the tens of references in each post aren't included in the word count.

### Totals

Adding up word counts across the 3 sites, we end with **230,126** (152243+72107+5776). 230k words feels like quite a lot, especially as 2 of the sites are under 18 months old, with likely around 90-100k words written in that time period. [Apparently](https://prowritingaid.com/average-book-length#:~:text=What%20Is%20the%20Average%20Novel,shorter%20than%20novels%20for%20adults.) 90k words is typical for a novel, so I hope you've all enjoyed reading the rather chaotic and varied story over that time period!

## Conclusion

Before any calculations, I predicted "my total word count must be in the hundreds of thousands"... and 230k fits within that very broad range. Whilst the totals themselves are relatively impressive, in the future I might improve the plugin to add a breakdown by year, since I strongly suspect mine will ramp up drastically. 

Speaking of the plugin, it's entirely possible better ones exist. However, a search for "jekyll count words" (and a lot of similar terms) generally showed either the word count in a post (which is included already...), or random chaotic scripts. [Matt's script](https://github.com/mattgemmell/Jekyll-Posts-Word-Count/blob/master/posts-word-count.rb), whilst simple, was a very understandable "loop through posts, build up stats" style plugin, more of a script than a fully fledged plugin.

This simplicity meant I could technically write my first ever Ruby code, since his framework could easily have new keywords, logic, or even entire tags added to it. I'm very grateful to his great start, and very impressed that it's almost all 9 years old with only 1-2 merged PRs since then! Hopefully he'll agree with my changes to the project, but if not this article should serve as a useful enough guide for others.

Benefiting from then contributing to an open source library is always a good feeling!