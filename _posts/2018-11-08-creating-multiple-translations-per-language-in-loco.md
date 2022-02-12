---
id: 1975
title: 'Creating Multiple Translations Per Language In Loco'
date: '2018-11-08T19:21:19+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=1975'
permalink: /creating-multiple-translations-per-language-in-loco/
snap_isAutoPosted:
    - '1541704880'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6466379010325778432";s:5:"pDate";s:19:"2018-11-08 19:21:35";}}";'
snapMD:
    - "s:426:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:66:\"%ANNOUNCE%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"fd889ccd681f\";s:7:\"postURL\";s:94:\"https://medium.com/@JakeSteam/creating-multiple-translations-per-language-in-loco-fd889ccd681f\";s:5:\"pDate\";s:19:\"2018-11-08 19:21:34\";}}\";"
snapTW:
    - 's:396:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1060613574366818304";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1060613574366818304";s:5:"pDate";s:19:"2018-11-08 19:22:36";}}";'
image: /wp-content/uploads/2018/11/WB3Zr08-150x150.png
categories:
    - Development
tags:
    - Locale
    - Localisation
    - Loco
    - Translations
---

For most translation projects, the goal is to translate the base language to other dialects. However, if you are creating an app with multiple variants, translations can also be used to localise the project to specific audiences. For example, a collection of fast food apps may have different text for Pizza, Indian, or Chinese food.

Managing these text sets can be tricky, but using a translation management tool like Loco helps keep all the variants under control.

Whilst Loco isn’t designed for managing multiple translations in a single language, it can be done. The secret is using a custom country code as your language tag, but this comes with a few complications.

Alternative approaches, such as picking an arbitrary other language to represent a strings variant, have the massive disadvantage of confusing any future internationalization efforts.

## Creating a new variant

To add a locale, first press “New locale” on Loco’s sidebar. This will display the locale adding dialog, with “Basic”, “Custom”, and “Advanced” options.  
Select “Advanced”. Now, enter the locale’s unique identifier. This will be your 2 letter language code, followed by a “-” and up to 8 lowercase characters.  
[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/addlocale.png?resize=522%2C336&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/addlocale.png?ssl=1)  
After pressing “Add locale”, you’ll see a confirmation pop-up and your new locale is created!  
[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/localeadded.png?resize=523%2C72&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/localeadded.png?ssl=1)

## Language tag limitations

Loco has 3 different options for subtags (the text in a language tag after the language code) with slightly different rules. [Loco’s documentation](https://localise.biz/help/developers/locales) provides more information on these.

- Script: Must start with an uppercase letter, and be 2 or 4 letters long.
- Variant: Must start with a lowercase letter, and be 2-8 letters long.
- Extension: Must start with “x-“, then 1-8 letters / numbers long.

Mousing over a locale in the sidebar and clicking the gear icon will let you view the current configuration, including the “Custom language tag” (under the “Developer” tab).

The “Optional subtags” section shows the currently used subtag. Note that the language tag cannot be modified by changing these options, you’ll encounter a conflict with existing locales. Instead, use the “Developer” tab to do it manually. Additionally, you’ll see a warning about non-standard subtags, this is a side-effect of skipping normal locale codes!  
[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/subtags.png?resize=520%2C134&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/subtags.png?ssl=1)

## Warnings

Unfortunately this approach comes with a few drawbacks:

Firstly, changing the country’s language tag cannot be done via the subtags menu. Instead, the option is on the “Custom language tag” under the “Developer” tab of the locale settings. Luckily, it’s unlikely you’ll need to do this very often, if ever.

Secondly, some export formats (specifically Android’s <span style="font-family: 'courier new', courier, monospace;">strings.xml</span>) don’t properly handle multiple custom locales. Whilst SQL, JSON, HTML, iOS’ <span style="font-family: 'courier new', courier, monospace;">Localizable.strings</span> and all others tested correctly include all locales, the Android export compresses them all into a single locale. Individually exporting the locales is a workaround to this relatively minor issue.