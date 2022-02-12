---
id: 1671
title: 'Loco 3: Exporting strings'
date: '2018-09-05T10:00:21+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk//?p=1671'
permalink: /loco-3-exporting-strings/
timeline_notification:
    - '1536142167'
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
image: /wp-content/uploads/2018/09/szugysr.png
categories:
    - Development
tags:
    - Locale
    - Localisation
    - Loco
    - Resources
    - Translation
---

[Loco](https://localise.biz) is a translation management tool with a staggering array of features, and a very reasonable free plan. [This series of guides](https://blog.jakelee.co.uk//tag/loco/) will cover the basics of using Loco, continuing with Part 3: Exporting strings in a variety of formats.

These articles are **not** sponsored!

To export strings, a user needs to have the “Access developer tools” permission. The following options and formats are available

### Options [(help)](https://localise.biz/help/formats/exporting)

![jnj97ou](https://i2.wp.com/blog.jakelee.co.uk//wp-content/uploads/2018/09/jnj97ou.png?resize=543%2C672&ssl=1)

1. **Locale selection**: Locale selection allows you to either export a single, multiple or all locales. If multiple are selected, a zip file will be provided with each file inside a folder structure suited for the export format (4).
2. **Locale fallback**: Specifying a default locale allows missing strings to be provided with a default translation, this can be useful when a translation has not been completed yet, but all strings are required to build the project.
3. **Tag filter**: Multiple tags can be used to ensure only the relevant strings are exported. For example, a “Password Reset” module of an app may only need the strings tagged “Password Reset”. [More info on tags](https://blog.jakelee.co.uk//2018/08/29/loco-1-string-management-for-multi-platform-multi-locale-projects/).
4. **File format**: The format of the exported data. This will be covered fully in the next section.
5. **Index**: This specifies what ID should be used for the text. Usually this will be the string name (“Asset ID”), but for some use cases it may be useful to use a different locale’s full string.
6. **Order**: By default, strings are ordered by date added, this options provides the ability to order by a string’s Asset ID instead.
7. **Status**: Similar to the Tag Filter, this allows only exporting strings that have a specific status / flag, for example only exporting translated strings.
8. **API Endpoint**: The URL to call to export strings at the current settings, this will be covered in more detail in Part 4 of this series.

### Formats

The [full list of basic export formats](https://localise.biz/api#formats) is reproduced below:

- `.pot .po .mo`: Gettext PO, POT and binary MO
- `.tmx`: Translation Memory eXchange
- `.xlf .xliff`: Localization Interchange File Format
- `.csv`: Comma separated values
- `.sql`: MySQL INSERT statements
- `.resx`: ResX for .NET framework
- `.html`: HTML table
- `.strings`: iOS Localizable strings
- `.stringsdict`: iOS plural rules
- `.plist .bplist`: Apple property list XML and binary formats
- `.properties`: Java properties file
- `.ts`: An XML format for Qt Framework

Additionally, the following formats have multiple options available:

- `.json`: Available in Chrome, Jed, or i18next language pack formats.
- `.php`: Available in a variety of framework formats, specifically Zend, Symfony (array or INI), Code Igniter, or as constant definitions.
- `.xml`: Available in Java properties or Tizen format.
- `.yml`: Available in Simple YAML, Symfony YAML, Ruby on Rails YAML, or a generic nested format.

### Notes

In many agile projects, string management may be ongoing through the product’s development, particularly if multiple locales are being used. Exporting a full set of Loco data before each new build ensures any updated translations are automatically included, meaning updating all string is just a couple of clicks away instead of manually editing files!