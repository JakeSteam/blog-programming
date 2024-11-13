---
id: 1975
title: 'Creating Multiple Translations Per Language In Loco'
date: '2018-11-08T19:21:19+00:00'
permalink: /creating-multiple-translations-per-language-in-loco/
image: /wp-content/uploads/2018/11/WB3Zr08.png
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

Whilst Loco isn't designed for managing multiple translations in a single language, it can be done. The secret is using a custom country code as your language tag, but this comes with a few complications.

Alternative approaches, such as picking an arbitrary other language to represent a strings variant, have the massive disadvantage of confusing any future internationalization efforts.

## Creating a new variant

To add a locale, first press "New locale" on Loco's sidebar. This will display the locale adding dialog, with "Basic", "Custom", and "Advanced" options.  

Select "Advanced". Now, enter the locale's unique identifier. This will be your 2 letter language code, followed by a "-" and up to 8 lowercase characters.  

[![](/wp-content/uploads/2018/11/addlocale.png)](/wp-content/uploads/2018/11/addlocale.png)  

After pressing "Add locale", you'll see a confirmation pop-up and your new locale is created!  

[![](/wp-content/uploads/2018/11/localeadded.png)](/wp-content/uploads/2018/11/localeadded.png)

## Language tag limitations

Loco has 3 different options for subtags (the text in a language tag after the language code) with slightly different rules. [Loco's documentation](https://localise.biz/help/developers/locales) provides more information on these.

- Script: Must start with an uppercase letter, and be 2 or 4 letters long.
- Variant: Must start with a lowercase letter, and be 2-8 letters long.
- Extension: Must start with "x-", then 1-8 letters / numbers long.

Mousing over a locale in the sidebar and clicking the gear icon will let you view the current configuration, including the "Custom language tag" (under the "Developer" tab).

The "Optional subtags" section shows the currently used subtag. Note that the language tag cannot be modified by changing these options, you'll encounter a conflict with existing locales. Instead, use the "Developer" tab to do it manually. Additionally, you'll see a warning about non-standard subtags, this is a side-effect of skipping normal locale codes!  
[![](/wp-content/uploads/2018/11/subtags.png)](/wp-content/uploads/2018/11/subtags.png)

## Warnings

Unfortunately this approach comes with a few drawbacks:

Firstly, changing the country's language tag cannot be done via the subtags menu. Instead, the option is on the "Custom language tag" under the "Developer" tab of the locale settings. Luckily, it's unlikely you'll need to do this very often, if ever.

Secondly, some export formats (specifically Android's `strings.xml`) don't properly handle multiple custom locales. Whilst SQL, JSON, HTML, iOS' `Localizable.strings` and all others tested correctly include all locales, the Android export compresses them all into a single locale. Individually exporting the locales is a workaround to this relatively minor issue.