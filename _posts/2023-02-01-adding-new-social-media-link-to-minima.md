---
title: How to add a new social media link to Minima 2.5.1 and latest unreleased version (3.0.0)
image: /assets/images/2023/minima-header.png
tags:
  - Minima
  - Web
  - SVG
---

Recently I migrated all of my Jekyll sites from Minima 2.5.1 (updated August 2019) to the latest version on GitHub (updated January 2023). This came with lots of new features, but also changed how social links are handled. In this post I'll cover both the old and new method for adding new social links, as well as the technical details.

Before we get started, [here is the Minima 2.5.1 sourcecode](https://github.com/jekyll/minima/tree/v2.5.1), and [here is the latest source code](https://github.com/jekyll/minima). Minima inexplicably hasn't had a new release in over 3 years, so the latest codebase has diverged from the latest release.

## Which Minima version do I have?

If you've just set up your Jekyll blog, **you have Minima 2.5.1**.

If you've manually set `remote_theme=jekyll/minima` in your `_config.yml`, **you have the unreleased Minima 3.0.0**.

## Adding social link in Minima 2.5.1

Adding a new social link is pretty straightforward, but there's no official guide! You can see an example of this process in a commit from [when I added a Substack link to my site](https://github.com/JakeSteam/blog-programming/commit/14e81949ab5c9cd9ffab9f6e5f3f5fdf64ec9caf#diff-6f8682cd360f5dfab6e928d3ec0bd71221b5f3dbba0d596dad0df2069d6418ad). Note that the SVG is minimised (all on one line), but you can still see the `<symbol>`.

### Steps

1. **Get an SVG.**
   - In this example I'll use [FontAwesome's "coins" icon](https://fontawesome.com/icons/coins?s=solid&f=classic), obviously make sure you have permission to use your SVG!
2. **Change the SVG into a named symbol.**
   - Open in any text editor.
   - Remove everything except the `<svg>` and `<path>` sections.
   - Change the `<svg` and `</svg>` to `<symbol` and `</symbol>`.
   - Delete everything from the `<symbol` except `viewport=" ... "`, and add an `id=" ... "`.
   - Delete everything from the `<path` except `d=" ... "`.
     [![](/assets/images/2023/minima-2-icons.png)](/assets/images/2023/minima-2-icons.png)
3. **Add SVG to combined image.**
   - Put the SVG code at the bottom of `assets/minima-social-icons.svg`, just before `</svg>`.
     [![](/assets/images/2023/minima-2-combined.png)](/assets/images/2023/minima-2-combined.png)
4. **Add social link to footer.**
   - Inside [`social.html`](https://github.com/jekyll/minima/blob/v2.5.1/_includes/social.html), copy an existing line (e.g. YouTube) and replace the URL & variable names (e.g. `youtube_username` to `coins_username`).
   - Don't forget to update the `minima-social-icons.svg#youtube` to your ID from step 2.
5. **Add to `_config.yml`.**
   - For example, these coins might be `coins_username: Jake123` and `coins_url: https://example.com/Jake123`.
6. **Relaunch your site, your new social link should be there!**

### Explanation

Whilst the process of adding a new social icon to Minima 2.5.1 is pretty convoluted, at least the use of it is simple!

1. [`footer.html`](https://github.com/jekyll/minima/blob/v2.5.1/_includes/footer.html) includes [`social.html`](https://github.com/jekyll/minima/blob/v2.5.1/_includes/social.html).
2. [`social.html`](https://github.com/jekyll/minima/blob/v2.5.1/_includes/social.html) checks each social source to see if it is defined in [`_config.yml`](https://github.com/jekyll/minima/blob/v2.5.1/_config.yml), and displays the username & URL if so.
3. Additionally, [`social.html`](https://github.com/jekyll/minima/blob/v2.5.1/_includes/social.html) uses the `symbol`'s `id` to fetch a specific section of the [`minima-social-icons.svg`](https://github.com/jekyll/minima/blob/v2.5.1/assets/minima-social-icons.svg), e.g. `#youtube`.

## Adding social link to latest Minima

Whilst there is a guide on [the project's readme](https://github.com/jekyll/minima#social-networks), it can be a little tricky to know how to resize the image and handle it correctly.

### Steps

1. **Get an SVG.**
   - In this example I'll use [FontAwesome's "coins" icon](https://fontawesome.com/icons/coins?s=solid&f=classic), obviously make sure you have permission to use your SVG!
2. **Resize to be 16x16 square.**
   - I used "[iloveimg](https://www.iloveimg.com/resize-image/resize-svg#resize-options,pixels)", but if you have a proper SVG editor feel free to use it.
   - Set the width & height px to 16 (since SVGs are scalable there won't be any loss of quality) then download.
   - It's OK if it's not square by a pixel or two, but it's worth the effort if possible!
3. **Remove everything except `<path>` data.**
   - Open in any text editor.
   - Check inside the `<svg>` element for `viewBox="0 0 16 16"`, this means it's the correct size.
   - Delete everything outside of the `<path>` tag, and the `style=" ... "` bit, then save.
     ![](/assets/images/2023/minima-3-icons.png)
4. **Put this SVG in `_includes/social-icons/`.**
5. **Add to `_config.yml`.**
   - For example, these coins might be `- { platform: coins,  user_url: "https://example.com/mycoins" }`
6. **Relaunch your site, your new social link should be there!**

### Explanation

Minima 3 changed how social icons are used. Instead of being manually added into one big SVG, they are now dynamically built up during compile time.

Personally I think this is overly convoluted, and would be better served by just displaying standard SVG icons, or using the slightly simpler previous system. The [justifications in the PR](https://github.com/jekyll/minima/pull/686) do make sense, but for a "minimal" theme it's a totally unnecessary complication (as was the previous system). Adding a new clickable icon shouldn't include this much complexity:

**Generating the combined SVG**

1. [`minima-social-icons.liquid`](https://github.com/jekyll/minima/blob/master/assets/minima-social-icons.liquid) loops through the `social_links` defined in [`_config.yml`](https://github.com/jekyll/minima/blob/master/_config.yml), and includes [`svg_symbol.html`](https://github.com/jekyll/minima/blob/master/_includes/svg_symbol.html) once per social link.
2. [`svg_symbol.html`](https://github.com/jekyll/minima/blob/master/_includes/svg_symbol.html) builds up a 16x16 section of the overall SVG, including the social link's icon by name.

**Using the combined SVG**

1. [`_includes/footer.html`](https://github.com/jekyll/minima/blob/master/_includes/footer.html) (the site's footer) includes [`social.html`](https://github.com/jekyll/minima/blob/master/_includes/social.html).
2. [`social.html`](https://github.com/jekyll/minima/blob/master/_includes/social.html) loops through the `social_links` defined in [`_config.yml`](https://github.com/jekyll/minima/blob/master/_config.yml), and includes [`social-item.html`](https://github.com/jekyll/minima/blob/master/_includes/social-item.html) once per social link.
3. [`social-item.html`](https://github.com/jekyll/minima/blob/master/_includes/social-item.html) looks in the `minima-social-icons.svg` file for an SVG with the social link's name, and displays a clickable icon.
