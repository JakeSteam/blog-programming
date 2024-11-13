---
id: 1671
title: 'Loco 3: Exporting strings'
date: '2018-09-05T10:00:21+01:00'
permalink: /loco-3-exporting-strings/
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

[Loco](https://localise.biz) is a translation management tool with a staggering array of features, and a very reasonable free plan. This series of guides will cover the basics of using Loco, continuing with Part 3: Exporting strings in a variety of formats.

These articles are **not** sponsored!

To export strings, a user needs to have the "Access developer tools" permission. The following options and formats are available

### Options [(help)](https://localise.biz/help/formats/exporting)

![options](/wp-content/uploads/2018/09/jnj97ou.png)

1. **Locale selection**: Locale selection allows you to either export a single, multiple or all locales. If multiple are selected, a zip file will be provided with each file inside a folder structure suited for the export format (4).
2. **Locale fallback**: Specifying a default locale allows missing strings to be provided with a default translation, this can be useful when a translation has not been completed yet, but all strings are required to build the project.
3. **Tag filter**: Multiple tags can be used to ensure only the relevant strings are exported. For example, a "Password Reset" module of an app may only need the strings tagged "Password Reset". [More info on tags](/loco-1-string-management-for-multi-platform-multi-locale-projects/).
4. **File format**: The format of the exported data. This will be covered fully in the next section.
5. **Index**: This specifies what ID should be used for the text. Usually this will be the string name ("Asset ID"), but for some use cases it may be useful to use a different locale's full string.
6. **Order**: By default, strings are ordered by date added, this options provides the ability to order by a string's Asset ID instead.
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

In many agile projects, string management may be ongoing through the product's development, particularly if multiple locales are being used. Exporting a full set of Loco data before each new build ensures any updated translations are automatically included, meaning updating all string is just a couple of clicks away instead of manually editing files!