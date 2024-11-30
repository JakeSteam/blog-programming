---
title: How to automatically add WebP post banners to Jekyll for faster load times
image: /assets/images/banners/webp-conversion.png
tags:
  - Jekyll
  - Liquid
  - Optimisation
---

Most modern browsers can handle the smaller & speedier WebP versions of images, yet generating them manually can be a pain! Here's how to do it automatically in Jekyll.

I recently updated [my site template](https://minima.jakelee.co.uk/v1.4.0/) to support automatic WebP conversion for the banners of every post. This requires both generating the files, and serving them correctly, with no extra manual effort.

**A [full Gist of this post](https://gist.github.com/JakeSteam/3b40651a3079ff221243525b3ad843f1) is available.**

## Generating WebP files

There's a library that can do this all for us, unsurprisingly called [`jekyll-webp`](https://github.com/sverrirs/jekyll-webp)!

Setting it up is straight-forward:

1. Add `jekyll-webp` to your `Gemfile`.
2. Add `jekyll-webp` to your `_config.yml`'s `plugins` section.
3. Finally, add a `webp` config object into your `_config.yml`. Below are the settings I use, a description of each is available on the repo:

```yml
webp:
  enabled: true
  quality: 95
  img_dir: ["/assets/images/banners"]
  nested: true
  regenerate: false # Set to true if settings have been changed
  formats: [".jpeg", ".jpg", ".png"]
```

Once the configuration is set up, run `bundle install` then `bundle exec jekyll serve`, and any images in `/assets/images/banners` will have a WebP version generated!

[![](/assets/images/2024/webp-site-output.png)](/assets/images/2024/webp-site-output.png)

## Displaying webp files

Now the post's banners are in WebP format, they need to be displayed safely and only to browsers that can support them.

### Prep work

First, we need to create a `webp.html` somewhere. I used [`_includes/custom/webp.html`](https://github.com/JakeSteam/minimaJake/blob/main/_includes/custom/webp.html).

Next, we need to include it wherever we want our WebP / other image formats to appear. For me, this is my [`home.html`](https://github.com/JakeSteam/minimaJake/blob/main/_layouts/home.html) & [`post.html`](https://github.com/JakeSteam/minimaJake/blob/main/_layouts/post.html) files, where I want to display the image inside an `a` tag:

{% raw %}

```html
<a class="post-link" href="{{ post.url | relative_url }}">
  {% include custom/webp.html path=post.image alt=post.title %}
</a>
```

{% endraw %}

Make sure the `path` and `alt` parameters map to something useful in your template!

_Note: If you don't already have a `post.html` / `home.html` page because you're using a template's defaults, [GitHub has guidance](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll#customizing-your-themes-html-layout) on how to create them._

### Checking WebP file exists

Next, we need to build our `webp.html` to show these WebP banners if the user's browser supports them, and they've been successfully generated.

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

### Displaying WebP files

Finally, we're going to use [Picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) and source sets to let the browser determine if it can actually use the WebP we're providing it. If not, it'll use our original image instead:

{% raw %}

```html
<picture class="bg-img">
  {% if webp_exists %}
  <source type="image/webp" srcset="{{ webp_path }}" />
  {% endif %}
  <img src="{{ path }}" alt="Preview image of {{ alt | escape }}" />
</picture>
```

{% endraw %}

You'll notice we're also using our `alt` parameter to set a somewhat useful alternative text for accessibility, although this could of course be made more specific if the banner image is important.

## Extra details

### CSS

Whilst your template will likely differ, for my site this is the CSS that sets the size & scaling of the image:

```css
.bg-img {
  height: 180px;
  border-radius: 0.17rem;
  display: block;
  overflow: hidden;
}

.bg-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### WebP limitations

I found some colours (especially dark orange) just _wouldn't_ render properly in WebP, regardless of quality settings. I strongly suspect this is an issue with the converter I'm using (since it has other [long-standing broken functionality](https://github.com/sverrirs/jekyll-webp/issues/14)). It's good enough for now, but may need replacing!

## Conclusion

Using WebP drastically reduced the size of my site, and now it's all automatic I won't need to "fix" it again in the future. It's long overdue, and I won't be retroactively fixing past posts, but at least further posts will receive the benefits!

In terms of next steps, I'd like to add automatic banner image resizing, and be able to provide an alternate image for social media sharing. Neither of these is essential, and is arguably bloat, so perhaps not any time soon.

Everything in this post [is available as a Gist](https://gist.github.com/JakeSteam/3b40651a3079ff221243525b3ad843f1).
