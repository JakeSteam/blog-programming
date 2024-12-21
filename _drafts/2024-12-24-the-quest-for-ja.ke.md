---
title: The quest for ja.ke
image: /assets/images/banners/
tags:
  -
---

## Summary

- Registered on truehost.cloud (AKA truehost.co.ke)
- Uses Cloudflare
- Uses unusual fonts
- Only recently active

## Wayback machine

All entries ([source](https://web.archive.org/web/20240000000000*/ja.ke)):

- Aug 20th: Error 521
- Oct 6th: Error 521
- Oct 8th: Error 521
- Nov 18th: "ja.ke"
- Dec 18th: "ja.ke"

Note that error 521 is a Cloudflare issue.

## DNS clues

DNS checkers seem to give weird responses, but it confirms the Cloudflare hosting. [DomainTools](https://whois.domaintools.com/ja.ke) reports:

- IP Location: United States - California - San Jose - Cloudflare Inc.
- IP History: 1 change on 1 unique IP addresses over 0 years
- Hosting History: 2 changes on 3 unique name servers over 0 year

Even Kenya registry's whois [gives an error](https://www.webhostkenya.co.ke/wp-content/plugins/whmpress/whois.php?domain=ja.ke).

[Afriregister](https://afriregister.co.ke/whois.php?action=check&sld=ja&tld=.ke) gives registrar info (and confirms Cloudflare again):

- Registrar: Truehost Cloud Limited
- Registrar IANA ID: P051332644V
- Registrar Address: Ryanada Place, Thika Superhighway, Highpoint, Juja. P.O. Box 14460 - 00400. Nairobi. Kenya.

## Mail server

MX records (MX, SPF) confirm using Google (so probably Google Workspace), plus a `google-site-verification`.

## Source code clues

- `MorePerfectDOSVGA` and `BerkeleyMono-Regular` are _not_ commonly used fonts.
- More Perfect DOS VGA (2013) is [Laemeur's modification](https://laemeur.sdf.org/fonts/) of Perfect DOS VGA 437 (2003) by [Zeh Fernando](https://zehfernando.com/2015/revisiting-vga-fonts/), but created in FontForge in 2013 (file metadata) so likely irrelevant.

Searching for snippets of the source code returns nothing, indicating this isn't lazily copy-pasted code, it's been written for this project.

## Source code

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jake</title>
    <style>
        @font-face {
            font-family: 'BerkeleyMono-Regular';
            src: url('BerkeleyMono-Regular.woff2') format('woff2'),
                 url('BerkeleyMono-Regular.woff') format('woff');
        }
        @font-face {
            font-family: 'MorePerfectDOSVGA';
            src: url('MorePerfectDOSVGA.ttf') format('truetype');
        }
        body {
            background-color: black;
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .central {
            color: white;
            font-family: 'MorePerfectDOSVGA', sans-serif;
            text-align: center;
            font-size: 8vw;
        }
    </style>
</head>
<body>
    <div class="central">
        ja.ke
    </div>
</body>
</html>
```
