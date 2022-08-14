---
title: How to migrate from Utterances to Giscus for Jekyll comments
author: Jake Lee
layout: post
image: /assets/images/2022/
tags:
    - Jekyll
    - GitHub
    - Comments
---

Since migrating [from Wordpress to Jekyll](https://blog.jakelee.co.uk/blog-has-moved-from-wordpress-to-jekyll/), this blog (and [my non-tech blog](https://jakelee.co.uk)) has used Utterances for comments. This service creatively uses GitHub issues for comment hosting. However, since then GitHub has release the "Discussions" feature which... is a much better fit! Luckily, Giscus is a way to use these, and can easily be migrated to.

I've now migrated both sites across to Giscus, and whilst it was a relatively simple process there's no all-in-one guide currently. The short version is we're going to enable GitHub discussions, configure Giscus, then add it to our Jekyll blog!

## An overview of Giscus

[Giscus](https://giscus.app/) is extremely similar to [Utterances](https://utteranc.es/), with 3 main improvements:
1. It uses [GitHub discussions](https://docs.github.com/en/discussions) instead of issues, making it less of a hacky implementation (comments logically aren't issues, they're discussions!).
2. It adds plenty of new features such as adding reactions to the main post, lazy loading comments, multiple languages, self-hosting the bot, and [advanced options](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md).
3. It's actually being maintained and updated! Constrastingly, Utterances hasn't been touched in 6 months...

In addition to these benefits, it keeps all the original benefits of Utterances, namely:
* Open source 
* No tracking / adverts / paid plan
* Lightweight

Unfortunately, it's worth mentioning it also has the same drawback, a [scary-looking auth screen](/assets/images/2022/giscus-auth.png) when users first comment. It's been a [known issue](https://github.com/cirruslabs/cirrus-ci-docs/issues/751) for years, and the app can actually only access [discussions on the repos it is added to](/assets/images/2022/giscus-install.png)!

## Step 1: Preparing your repository

Before Giscus can be enabled, your repository's discussions need to be prepared. First, enable discussions on your repository's settings page. This will automatically create a new placeholder discussion, feel free to delete it.

[![discussions enabled](/assets/images/2022/giscus-discussions-enable.png)]((/assets/images/2022/giscus-discussions-enable.png))

Next, we want an announcements-style discussion category (so only admins / Giscus can create topics, but anyone can reply), without reusing the "Announcements" category (since we may still want to make announcements!).

To do this, just click the edit icon next to categories on your repository's discussion page, delete any you don't need, and add your new category:

[![discussions configuration options](/assets/images/2022/giscus-comments-config-thumbnail.png)]((/assets/images/2022/giscus-comments-config.png))

Once you're done, your discussion categories should look something like:

[![discussions configured](/assets/images/2022/giscus-comments-configured.png)]((/assets/images/2022/giscus-comments-configured.png))

## Step 2: Preparing Giscus

First of all, [we need to add Giscus](https://github.com/apps/giscus), and give it permissions to manage discussions in any repositories we want to use it on:

[![install giscus app](/assets/images/2022/giscus-install-thumbnail.png)]((/assets/images/2022/giscus-install.png))

Now we've installed the app, we can use the [Giscus project page](https://giscus.app/)'s handy tool to configure the comments. 

1. Enter your repository in the text field (in the format `JakeSteam/blog-programming`).
2. Select how you want to map discussions to posts. I recommend leaving it on the default `pathname` setting, and *not* enabling strict title matching, as this will prevent easy post migration.
3. Select your new "Comments" discussion category.
4. Select your features. I enabled reactions, and lazy loading.
5. Select your theme. I just used "GitHub Light", but you can even use custom CSS here!

You'll now have a big block of JavaScript ready to embed in the next step! Here's how mine looks, if you want to compare:

```
<script src="https://giscus.app/client.js"
        data-repo="JakeSteam/blog-programming"
        data-repo-id="MDEwOlJlcG9zaXRvcnkzNTk5Mzc1OTM="
        data-category="Comments"
        data-category-id="DIC_kwDOFXQ2Oc4CQ06o"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
```

## Step 3: Preparing Jekyll

For this step, all you *need* to do is add that block of JavaScript to your Jekyll `post.html` page. If you don't have a custom post page yet, [the Jekyll docs](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) have a guide.

Optionally, a more Jekyll-y approach is to extract the IDs into your `_config.yml` file, and reference them in your `post.html`. This approach can be seen [in my migration commit](https://github.com/JakeSteam/blog-programming/commit/6d6c112e5964a2248ad62d8caa36c38714abb078), all we're doing is:
1. Add `giscus_repo_id: MDEwOlJlcG9zaXRvcnkzNTk5Mzc1OTM=` etc to your `_config.yml`.
2. In the JavaScript, replace the existing repo ID definition with `data-repo-id="{{ site.giscus_repo_id }}"`.

Run your site, and you should be able to create new discussions & leave comments! Nice! However... don't forget about the existing comments.

## Step 4: Migrating Comments

First, the good news: Issues can be migrated into discussions, and Giscus will be able to use them automatically. All existing comments will be kept, along with the author and reactions.

Alas, the bad news: Issues need to be migrated manually, one by one. [GitHub has an official guide](https://docs.github.com/en/discussions/managing-discussions-for-your-community/moderating-discussions#converting-an-issue-to-a-discussion), just make sure you select your "Comments" category for migrated discussions:

[![github issue to discussion](/assets/images/2022/giscus-issue-to-discussion.png)]((/assets/images/2022/giscus-issue-to-discussion.png))

Once they're all migrated, you're done! Woo!

## Conclusion

Overall, the migration seems a no-brainer. Giscus has all the features and benefits of Utterances, with plenty of additional options as well as a more logical place on your repository!

If you're currently using lots of custom Utterances styling, it's worth noting that the design has changed slightly (to match the discussions UI instead of issues UI):

| Utterances (default) | Giscus (default) |
| -- | -- |
| [![giscus before](/assets/images/2022/giscus-before-thumbnail.png)]((/assets/images/2022/giscus-before.png)) | [![giscus after](/assets/images/2022/giscus-after-thumbnail.png)]((/assets/images/2022/giscus-after.png)) | 