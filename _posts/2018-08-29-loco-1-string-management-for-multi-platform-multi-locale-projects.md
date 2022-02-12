---
id: 1651
title: 'Loco 1: String management for multi-platform &#038; multi-locale projects'
date: '2018-08-29T20:50:32+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk//?p=1651'
permalink: /loco-1-string-management-for-multi-platform-multi-locale-projects/
publicize_linkedin_url:
    - 'www.linkedin.com/updates?topic=6440671861805240320'
timeline_notification:
    - '1535575835'
publicize_twitter_user:
    - JakeLeeLtd
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapMD:
    - "s:207:\"a:1:{i:0;a:6:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:57:\"%FULLTEXT%\r\n\r\nOriginally written by %AUTHORNAME% at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;}}\";"
snapTW:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;}}";'
image: /wp-content/uploads/2018/08/hjrpcec.png
categories:
    - Development
tags:
    - Locale
    - Localisation
    - Loco
    - Resources
    - Translation
---

[Loco](https://localise.biz) is a translation management tool with a staggering array of features, and a very reasonable free plan. [This series of guides](https://blog.jakelee.co.uk//tag/loco/) will cover the basics of using Loco, starting with Part 1: Creating a project and adding strings.

These articles are **not** sponsored!

### Creating an account

First, create an account with either your email, or using GitHub, Twitter, or Facebook login. Once your email has been confirmed / permission has been given, a super simple signup screen asks for a password and not much more.  
![nde6pf6](https://i0.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/08/nde6pf6.png?resize=700%2C395&ssl=1)

### Creating a project

A default project will be created for you upon signup, with customisable URL, name, and description. The URL for your project will be the very simple `https://localise.biz/username/project`.

### Adding locales

Next, add the locales / languages the strings should be translated into via the `+` button next to your default locale in the top left of the “Manage” tab. Locales can be anything from a simple language (e.g. French) into a fully custom identifier. A particularly useful feature is the ability to rename locales, which can be extremely useful when the same text needs to be translated into the same language multiple times (e.g. different brands within the same country).  
![kqiptna](https://i2.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/08/kqiptna.png?resize=529%2C512&ssl=1)

### Adding strings

It’s finally time to start actually adding text to translate, or “Assets”. Click “New asset” and a popup will appear which can be a little overwhelming!

1. **Source text** is the initial text to use, in the project’s native locale (e.g. English).
2. [**Asset ID**](https://localise.biz/help/glossary/asset-id) is the name used to reference the text in code. This will be something like `Dialog_Title_IncorrectPassword` or `dialog-title-incorrectpassword` depending on your preferred style.
3. [**Context**](https://localise.biz/help/glossary/asset-context) is used when a text’s use is ambiguous, but is generally not needed for most use cases due to Notes.
4. **Type** should almost always be “Plain text”, unless HTML is needed.
5. **Tags** are a powerful way of categorising strings, as each string can have one or more. A common use case is adding a tag per screen (e.g. “Login”, “Registration”), so that all the strings for a specific screen can easily be viewed at once. Shared strings will have multiple screen tags.
6. **Notes** are a way to provide extra information to translators, generally used if the Asset ID and Tags by themselves are not descriptive enough.

![0fv3giy](https://i1.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/08/0fv3giy.png?resize=546%2C621&ssl=1)

### String statuses

Once a string has been added, it will by default have the status of “Translated” in the original locale, and “Untranslated” in all other locales. These statuses can be changed at will, and feature 5 different “in progress” states to help collaboration between different project teams. For example, in a recent project new strings were marked as “Provisional” when they had been translated by developers, “Unapproved” when a professional translator had corrected mistakes, and “Translated” when a line manager had signed off a translation.  
![dchlb7s](https://i0.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/08/dchlb7s.png?resize=537%2C342&ssl=1)

### Plan pricing

Loco’s free plan is usually generous enough for almost all use cases, even for large projects with a few hundred assets, multiple languages, and many translators. At my company we went for the “Pro” plan, as we needed custom roles for certain individuals. This cost us a grand total of just £4.95/month (approximately $6.50)!  
![nf6ilvp](https://i0.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/08/nf6ilvp.png?resize=700%2C317&ssl=1)  
More information on these quotas are [available on Loco’s help pages](https://localise.biz/help/accounts/quotas), and a brief explanation is below. It’s worth emphasising that only the project owner needs to pay, and all other project collaborators can benefit.

1. **Translations** refers to the total number of translations used across the entire account. The default limit of 2,000 is equal to a project with 500 strings translated into 3 languages (plus original language). A relatively large app will likely have between 300-600 assets, keeping in mind common text (e.g. “OK”) can share the same asset.
2. **Collaboration** refers to the roles that invited users can have. This will be covered in-depth in a later post, but essentially the free plan allows unlimited translators (can only edit translations), but no additional roles.
3. **Projects** unsurprisingly refers to the number of projects that can be added to an account.
4. **Translatable assets** refers to the number of assets that can be included in a single project. The free plan’s limits of 2 projects and 1,000 assets per project give the total of 2,000 available translations.
5. **Languages** refers to the number of different locales / languages that can be added to a project.
6. **Revision history** refers to the ability to see an asset’s history (e.g. who changed status, text, etc). Whilst the free plan’s “see previous version” is useful, being able to view a full history is essential for larger projects.
7. **Extra translations** refers to the ability to purchase more translations if the very generous limits are reached.

### Additional features

Individual strings can also have plurals and placeholders (e.g. `%1$s` for Android) configured, all changes logged, and comments with user tagging support.

In addition to Loco’s core features, a few free utilities are provided such as [iOS Android string conversion](https://localise.biz/free/converter/ios-to-android), or [conversion between all common formats](https://localise.biz/free/converter).

[Loco](https://localise.biz) has such a massive set of features that only the very basics have been covered here. Collaboration, exporting, and command line interface will all be covered in later articles.