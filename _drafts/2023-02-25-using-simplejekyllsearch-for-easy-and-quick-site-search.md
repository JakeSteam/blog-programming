---
title: Using SimpleJekyllSearch for easy and quick site searching
author: Jake Lee
layout: post
image: /assets/images/2023/v103-search-new-appearance.png
tags:
    - Search
    - Jekyll
---

Historically, my Jekyll sites have always have a very slow search. Recently I updated minimaJake to use SimpleJekyllSearch, and now it's almost instant and easy to customise! Here's some more detail on how it works.

## Before & after 

This change brings a lot of visual improvements, but they were technically possible before, just tricky. Far more significant are the massive performance improvements!

On a bad connection, loading the [search page](/search) would completely block the UI for over 7 seconds. Now, it's... 30 ms! That's an almost unbelievable 99.5% decrease in page loading time, and doesn't even factor in the fact that the search is now per-keystroke, instead of waiting for enter to be pressed.

| | Before (v1.0.2) | After (v1.0.3) |
| Appearance | [![](/assets/images/2023/v103-search-old-appearance.png)](/assets/images/2023/v103-search-old-appearance.png) | [![](/assets/images/2023/v103-search-new-appearance.png)](/assets/images/2023/v103-search-new-appearance.png) | 
| Performance | [![](/assets/images/2023/v103-search-old.png)](/assets/images/2023/v103-search-old.png) | [![](/assets/images/2023/v103-search-new.png)](/assets/images/2023/v103-search-new.png) | 

## Introducing SimpleJekyllSearch

In a [recent post](https://blog.jakelee.co.uk/introducing-minimajake-for-jekyll/#lunrjs-search) I laid out some of the problems with my current search, and proposed a better approach:

> Eventually I’d like to export the text from all posts to a static file during compilation / publishing, then just use this for future lookups instead of essentially regenerating this data every time the page is loaded.

And, luckily, this is pretty much exactly what SimpleJekyllSearch does. This library has [unfortunately been deprecated in 2022](https://github.com/christian-fei/Simple-Jekyll-Search), and hasn't had major development in a couple of years, but despite this seems to work perfectly. It consists of 2 parts:

1. Generating a `search.json` by just looping through each post and outputting searchable data into a JSON object.
2. Providing a configurable JavaScript helper that accepts result templates and element identifiers, then does all the hard work.

## Implementing SimpleJekyllSearch

### Creating searchable posts 

First, we need to provide a list of all our posts (e.g. as [`posts.json`](/assets/js/posts.json)), complete with the searchable fields. This can be edited to suit your needs, minimaJake tidies up [the repo's example](https://github.com/christian-fei/Simple-Jekyll-Search#create-searchjson) to include post excerpts, format dates better, and avoid character encoding issues:

```
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

### Adding JavaScript 

Next, copy either the [regular or minified search script](https://github.com/christian-fei/Simple-Jekyll-Search/tree/master/dest) into your site, perhaps at `/assets/js/search.js`.

We should also include this on the page we want to have the search on, similar to:

```
<script src="/assets/js/search.js" type="text/javascript"></script>
```

### Adding HTML elements

Now we need to add the text field and search results area onto the search page, something like:

```
<form id="searchform">
  <p><input type="text" id="search-input" class="form-control" name="q" value="" autofocus /></p>
</form>
<ul id="searchresults" class="post-list"></ul>
```

Finally, we need to create a `SimpleJekyllSearch` object, and pass in all the bits we've setup:

```
var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('searchform'),
  resultsContainer: document.getElementById('searchresults'),
  json: '/posts.json'
})
```

You now have a functioning, speedy search!

## Customising SimpleJekyllSearch 

For minimaJake, I chose to make a few additional changes to customise the "no results" message, and also format the data properly on the page:

```
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

You might notice that the variables there (e.g. `{excerpt}`) are just data we output in an earlier stage (`{{ post.excerpt | jsonify | strip_html }}`). It's very easy to customise these fields, if you want to search by some sort of custom metadata.

Additionally, I want the functionality to link directly to a set of results. For example, a [search for my name](https://blog.jakelee.co.uk/search/?q=jake). This is done by checking for a `q` URL parameter on page load, then if it exists populate & submit the search form:

```
    window.addEventListener('load', function() {
        var searchParam = new URLSearchParams(window.location.search).get("q")
        if (searchParam != null) {
            document.getElementById('search-input').value = searchParam
            sjs.search(searchParam)
        } 
        document.getElementById('search-input').placeholder = "Type your search here..."
    }, false);
```
This snippet also handles setting a placeholder text, which needs to be done *after* setting any prefilled search term to avoid a brief flicker.

## End result 

So, if you follow all these steps what do you get? [A complete search page](https://github.com/JakeSteam/minimaJake/blob/main/_includes/custom/search.html)!

This can then be included elsewhere with just `{% include custom/search.html %}`.

## Conclusion