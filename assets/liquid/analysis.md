---
layout: none
---


{% assign DATES = "" | split: ',' %}
{% assign SHORTEST = site.posts.first %}
{% assign LONGEST = site.posts.first %}
{% for post in site.posts %}
{%      assign YEAR = post.date | date: "%Y" %}
{%      if DATES contains YEAR %}
{%         assign DATES[YEAR] = DATES[YEAR] | plus: 1 %}
{%      else %}
{%          assign DATES[YEAR] = 1 %}
{%      endif %}

{%     assign SHORTESTLENGTH = SHORTEST.content | number_of_words %}
{%     assign LONGESTLENGTH = LONGEST.content | number_of_words %}
{%     assign CURRENTLENGTH = post.content | number_of_words %}
{%     if SHORTESTLENGTH > CURRENTLENGTH %}
{%         assign SHORTEST = post %}
{%      elsif LONGESTLENGTH < CURRENTLENGTH %}
{%         assign LONGEST = post %}
{%      endif %}
{% endfor %}

## Overall metadata 

* Total posts: {{ site.posts.size }}
* First post: {{ site.posts.last.title }} ({{ site.posts.last.date }})
* Latest post: {{ site.posts.first.title }} ({{site.posts.first.date}})

## Length analysis

* Longest post: "{{ LONGEST.title }}" with {{ LONGESTLENGTH }} words.
* Shortest post: "{{ SHORTEST.title }}" with {{ SHORTESTLENGTH }} words.