---
title: How to add automatic webp post banners to Jekyll for faster load times
image: /assets/images/banners/webp-conversion.png
tags:
  - Jekyll
  - Liquid
  - Optimisation
---

Most modern browsers can handle the smaller & speedier webp versions of images, yet generating them manually can be a pain! Here's how to do it automatically in Jekyll.

I recently updated [my site template](https://minima.jakelee.co.uk/v1.4.0/) to support automatic webp conversion for the banners of every post. This requires both generating the files, and serving them correctly, with no extra manual effort. 

**A [full Gist of this post](https://gist.github.com/JakeSteam/3b40651a3079ff221243525b3ad843f1) is available.**

## Generating webp files 

There's a library that can do this all for us, unsurprisingly called [`jekyll-webp`](https://github.com/sverrirs/jekyll-webp)!

Setting it up is straight-forward:

1. Add `jekyll-webp` to your `Gemfile`.
2. Add `jekyll-webp` to your `_config.yml`'s `plugins` section.
3. Add a `webp` config object into your `_config.yml`. Below are the settings I use, a description of each is available on the repo:
```yml
webp: 
  enabled: true
  quality: 95
  img_dir: ["/assets/images/banners"]
  nested: true
  regenerate: false # Set to true if settings have been changed
  formats: [".jpeg", ".jpg", ".png"]
```

Once the configuration is set up, run `bundle install` then `bundle exec jekyll serve`, and any images in `/assets/images/banners` will have a webp version generated!

[![](/assets/images/2024/webp-site-output.png)](/assets/images/2024/webp-site-output.png)

## Displaying webp files

Now the post's banners are in webp format, they need to be displayed safely and only to browsers that can support them.

### Prep work

First, we need to create a `webp.html` somewhere. I used [`_includes/custom/webp.html`](https://github.com/JakeSteam/minimaJake/blob/main/_includes/custom/webp.html).

Next, we need to include it wherever we want our webp / other image format to appear. For me, this is my [`home.html`](https://github.com/JakeSteam/minimaJake/blob/main/_layouts/home.html) & [`post.html`](https://github.com/JakeSteam/minimaJake/blob/main/_layouts/post.html) files, where I want to display the image inside an `a` tag:

{% raw %}
```html
<a class="post-link" href="{{ post.url | relative_url }}">
  {% include custom/webp.html path=post.image alt=post.title %}
</a>
```
{% endraw %}

Make sure the `path` and `alt` parameters map to something useful in your template!

*Note: If you don't already have a `post.html` / `home.html` page because you're using a template's defaults, [GitHub has guidance](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll#customizing-your-themes-html-layout) on how to create them.*

### Checking webp file exists

Next, we need to build our `webp.html` to show these webp banners if the user's browser supports them, and they've been successfully generated.

Jekyll templates use the quite limited language [Liquid](https://shopify.github.io/liquid/), so we have to do some quite tedious string manipulation to:
1. Remove the extension from the file's path (e.g. `.png`, `.jpg`).
2. Add `.webp` onto the end.
3. Check this new path actually exists.

This can definitely be done more concisely, but I prioritised ease of reading / maintaining:

{% raw %}
```liquid
{% assign path = include.path %}
{% assign alt = include.alt | default: "article" %}

{% assign image_parts = path | split: '.' %}
{% assign extension_length = image_parts | last | size | plus: 1 %}
{% assign base_path_length = path | size | minus: extension_length %}
{% assign base_path = path | slice: 0, base_path_length %}

{% assign webp_path = base_path | append: '.webp' %}
{% assign webp_exists = site.static_files | where: "path", webp_path | first %}
```
{% endraw %}

### Displaying webp file

Finally, we're going to use [Picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) and source sets to let the browser determine if it can actually use the webp we're providing it. If not, it'll use our original image instead:

{% raw %}
```html
<picture class="bg-img">
    {% if webp_exists %}
    <source type="image/webp" srcset="{{ webp_path }}" >
    {% endif %}
    <img src="{{ path }}" alt="Preview image of {{ alt | escape }}" />
</picture>
```
{% endraw %}

You'll notice we're also using our `alt` parameter to set a somewhat useful alt text for accessibility, although this could of course be made more specific if the banner image is important.

## Extra details

Whilst your template will likely differ, for my site this is the CSS that sets the size & scaling of the image:

```css
.bg-img {
  height: 180px;
  border-radius: .17rem;
  display: block;
  overflow: hidden;
}

.bg-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Conclusion

Everything in this post [is available as a Gist](https://gist.github.com/JakeSteam/3b40651a3079ff221243525b3ad843f1).