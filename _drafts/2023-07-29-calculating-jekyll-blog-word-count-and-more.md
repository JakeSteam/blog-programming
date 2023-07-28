---
title: How to discover your Jekyll site's total word count, longest / shortest post, and more
author: Jake Lee
layout: post
image: /assets/images/2023/
tags:
    - Ruby
    - Jekyll
---

I've been writing blog posts for quite a few years, and when a single post can easily be thousands of words... my total word count must be in the hundreds of thousands! To find out, I expanded an existing Jekyll plugin's functionality, here's how to use it 📊

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
* Longest post: [Asynchronous Map Generator for Android](/android-asynchronous-map-generator/) (3661 words)
* Shortest post: [2020’s essential Android development techniques](/2020s-essential-android-development-techniques/) (62 words)

### Personal site

### Internet history site


## Conclusion
