---
title: Using SimpleJekyllSearch for easy and quick site searching
author: Jake Lee
layout: post
image: /assets/images/2023/v103-search-banner.png
tags:
  - Search
  - Jekyll
---

Historically, my Jekyll sites have always had a very slow search feature. Recently I updated [minimaJake](https://github.com/JakeSteam/minimaJake/) to use [SimpleJekyllSearch](https://github.com/christian-fei/Simple-Jekyll-Search), and now it's almost instant (99.5% reduction in time taken) and easy to customise! Here's some more detail on how it works, how to implement it, and some further improvements I'd love to try.

## Before & after

This change brings a lot of visual improvements, but they were technically possible before, just tricky. Far more significant are the massive performance improvements!

On a bad connection, loading the [search page](/search) would completely block the UI for over 7 seconds. Now, it's... 30 ms! That's an almost unbelievable 99.5% decrease in page loading time, and doesn't even factor in the fact that the search is now per-keystroke, instead of waiting for enter to be pressed.

| Before (v1.0.2) | After (v1.0.3) |
| [![](/assets/images/2023/v103-search-old-appearance.png)](/assets/images/2023/v103-search-old-appearance.png) | [![](/assets/images/2023/v103-search-new-appearance.png)](/assets/images/2023/v103-search-new-appearance.png) |
| [![](/assets/images/2023/v103-search-old.png)](/assets/images/2023/v103-search-old.png) | [![](/assets/images/2023/v103-search-new.png)](/assets/images/2023/v103-search-new.png) |

## Introducing SimpleJekyllSearch

In a [recent post](https://blog.jakelee.co.uk/introducing-minimajake-for-jekyll/#lunrjs-search) I laid out some of the problems with my current search, and proposed a better approach:

> Eventually I’d like to export the text from all posts to a static file during compilation / publishing, then just use this for future lookups instead of essentially regenerating this data every time the page is loaded.

And, luckily, this is pretty much exactly what SimpleJekyllSearch does. This library has [unfortunately been deprecated in 2022](https://github.com/christian-fei/Simple-Jekyll-Search), and hasn't had major development in a couple of years, but despite this seems to work perfectly. It consists of 2 parts:

1. Generating a `search.json` by just looping through each post and outputting searchable data into a JSON object.
2. Providing a configurable JavaScript helper that accepts result templates and element identifiers, then does all the hard work.

## Implementing SimpleJekyllSearch

### Creating searchable posts

First, we need to provide a list of all our posts (e.g. as [`posts.json`](/assets/js/posts.json)), complete with the searchable fields. This can be edited to suit your needs, minimaJake tidies up [the repo's example](https://github.com/christian-fei/Simple-Jekyll-Search#create-searchjson) to include post excerpts, format dates better, and avoid character encoding issues:

{% raw %}

```liquid
---
layout: none
---
[
  {% for post in site.posts %}
    {
      "title"    : {{ post.title | jsonify | strip_html }},
      "tags"     : "{{ post.tags | join: ', ' }}",
      "url"      : "{{ post.url }}",
      "date"     : "{{ post.date | date: "%b %-d, %Y" }}",
      "excerpt" : {{ post.excerpt | jsonify | strip_html }},
      "content"  : {{ post.content | jsonify | strip_html }}
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}
]
```

{% endraw %}

### Adding HTML elements

Now we need to add the text field and search results area onto the search page, something like:

```html
<form id="searchform">
  <p>
    <input
      type="text"
      id="search-input"
      class="form-control"
      name="q"
      value=""
      autofocus
    />
  </p>
</form>
<ul id="searchresults" class="post-list"></ul>
```

### Adding JavaScript

Next, copy either the [regular or minified search script](https://github.com/christian-fei/Simple-Jekyll-Search/tree/master/dest) into your site, perhaps at `/assets/js/search.js`.

We should also include this on the page we want to have the search on, similar to:

```html
<script src="/assets/js/search.js" type="text/javascript"></script>
```

Finally, we need to create a `SimpleJekyllSearch` object, and pass in all the bits we've setup:

```js
var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById("searchform"),
  resultsContainer: document.getElementById("searchresults"),
  json: "/posts.json",
});
```

You now have a functioning, speedy search!

### Customisation

For minimaJake, I chose to make a few additional changes to customise the "no results" message, and also format the data properly on the page:

```js
      noResultsText: 'No results found :(',
      searchResultTemplate: "<li class='card'>" +
          "<div class='content'>" +
            "<a class='post-link' href='{url}'>{title}</a>" +
            "<span class='post-meta'>{date} • {tags}</span>" +
            "<p>{excerpt}</p>" +
          "</div>" +
        "</li>"
      }
```

You might notice that the variables there (e.g. `{excerpt}`) are just data we output in an earlier stage ({% raw %}`{{ post.excerpt | jsonify | strip_html }}`{% endraw %}). It's very easy to customise these fields, if you want to search by some sort of custom metadata.

Additionally, I want the functionality to link directly to a set of results. For example, a [search for my name](https://blog.jakelee.co.uk/search/?q=jake). This is done by checking for a `q` URL parameter on page load, then if it exists populate & submit the search form:

```js
window.addEventListener(
  "load",
  function () {
    var searchParam = new URLSearchParams(window.location.search).get("q");
    if (searchParam != null) {
      document.getElementById("search-input").value = searchParam;
      sjs.search(searchParam);
    }
    document.getElementById("search-input").placeholder =
      "Type your search here...";
  },
  false
);
```

This snippet also handles setting a placeholder text, which needs to be done _after_ setting any prefilled search term to avoid a brief flicker.

## End result

So, if you follow all these steps what do you get? [A complete search page](https://github.com/JakeSteam/minimaJake/blob/main/_includes/custom/search.html)!

This can then be included elsewhere with just:

{% raw %}

```
{% include custom/search.html %}
```

{% endraw %}

## Drawbacks

Whilst the new search's performance is undoubtedly better, and there's far less hacky code around, it isn't perfect.

The main drawback I've found is that it doesn't search very selectively. For example if I search "a", it will just return every single post in date order that contains "a" anywhere in it. This even includes words like "apple", and doesn't prioritise tags or titles over the full text of the article.

I'm intending to eventually improve this, by ideally:

1. Returning all tag matches, then title matches, then excerpt matches, and _finally_ full text matches.
2. Only matching full words, ideally with variants. For example "cat" should return "cats" but not "scatter".
3. Highlighting where the result has been found, just like when searching in a page on Chrome.

I suspect the difficulty in implementing these well varies from tricky (#1) to almost impossible (#2). The library does have [`templateMiddleware`](https://github.com/christian-fei/Simple-Jekyll-Search#templatemiddleware-function-optional) and [`sortMiddleware`](https://github.com/christian-fei/Simple-Jekyll-Search#sortmiddleware-function-optional) so it should be possible with enough work!

## 2024 update

I implemented #1 & #3 to [minimaJake 1.0.4](https://minima.jakelee.co.uk/v1.0.4/), along with some other features after this article was published! To quote the release notes:

> - Sorts results according to relevance (tags > title > excerpt > url / date / content)
> - Highlight search term within results (colour needs improving?)
> - Exclude single-character search
> - Display number of results
> - Stops search looking inside character codes (e.g. &amp;)

As suspected, `templateMiddleware` and `sortMiddleware` were essential for this, but a few change to the `search.js` file had to be made to support the concept of "match priority". Check out the latest versions if you'd like the features listed above:

- [`search.html`](https://github.com/JakeSteam/minimaJake/blob/main/_includes/custom/search.html): The embeddable search HTML, initialises `SimpleJekyllSearch`.
- [`search.js`](https://github.com/JakeSteam/minimaJake/blob/main/assets/js/search.js): The core search script.

[Rees Draminski](https://reesdraminski.com/garden/search-with-simplejekyllsearch/) has also implemented the ability to display the relevant section of a post instead of the generic excerpt.

## Conclusion

Overall I'm happy with this migration, and how consumers of [minimaJake](https://github.com/JakeSteam/minimaJake/) now just need to include the search page to have a full-text, instant search available.

The change to use the same CSS as the homepage (minus the header image) also make the site feel much more coherent, whilst reducing the amount of visual areas that need tweaking. Previously, search was hard to read in dark mode due to hard-coded colours, now it's all automatic.

Having a search that works quickly frees up future interesting options, such as having a search available in the header of the site. If you're looking to add search to your site, give [SimpleJekyllSearch](https://github.com/christian-fei/Simple-Jekyll-Search) a go!
