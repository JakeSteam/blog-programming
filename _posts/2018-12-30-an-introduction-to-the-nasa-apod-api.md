---
id: 2305
title: 'An introduction to the NASA APOD API'
date: '2018-12-30T18:00:47+00:00'
permalink: /an-introduction-to-the-nasa-apod-api/
image: /wp-content/uploads/2018/12/header.png
categories:
    - Development
tags:
    - API
    - APOD
    - NASA
    - Postman
---

NASA's [Astronomy Picture of the Day API](https://api.nasa.gov/api.html) is an amazing service providing free, reliably sourced space images. However, the official documentation can be a little lacking, hopefully this post will improve on it somewhat.

I'm currently using the API to [create an Android app that changes your wallpaper everyday](https://github.com/JakeSteam/APODWallpaper), so all lessons here were learnt through trial and error. The app isn't quite finished yet, but already has more features and reliability than all other similar offerings!

## Postman collection

Every request made in this tutorial is available in a Postman collection, so you can start using the API instantly. You'll need to [create an environment variable](http://blog.getpostman.com/2014/02/20/using-variables-inside-postman-and-collection-runner/) called `api_key` with your API key.

To use the collection, [save this link](https://pastebin.com/raw/nwvEaHHN) as `postman.json`, then import it into your Postman collections:

[![](/wp-content/uploads/2018/12/GMmn5ah.png)](/wp-content/uploads/2018/12/GMmn5ah.png)

## Request

To return an APOD, make a `GET` request to `https://api.nasa.gov/planetary/apod`. Whilst the following 4 URL parameters are optional, your requests will almost certainly need a couple of them:

- `api_key`: Using an API key allows you to make up to 1000 requests per hour. If you do not set one, you'll hit quota limits pretty quickly. You can get one by filling in the [simple API key form](https://api.nasa.gov/index.html#apply-for-an-api-key), you'll then be emailed an API key within a few minutes.
- `date`: This is the date you want to return the APOD for (in `YYYY-MM-DD` format), if none is set the latest APOD will be returned. Please see the "Limitations" section for more information on this.
- `start_date` and `end_date`: This is an alternative to `date`, and returns an array of all APODs inside the range.
- `hd`: This specifies whether the image's HD URL should be returned alongside a regular quality URL, and should be set to `true` or `false`. However, the API doesn't seem to always follow this parameter, and sometimes returns the HD URL even if you haven't asked for it!

A fully populated example URL is `https://api.nasa.gov/planetary/apod?api_key=xxxxxxxxxxxxxxxxxxxxxxxx&date=2018-12-28`, the response for this will be described below.

## Response

The response is a JSON object (or if using a date range, an array of objects), with some fields always being present and others dependant on the APOD requested. All fields are strings. for example:

```
{
   "copyright":"island universe",
   "date":"2018-12-28",
   "explanation":"Barred spiral galaxy NGC 1365 is truly a majestic island universe some 200,000 light-years across. Located a mere 60 million light-years away toward the chemical constellation Fornax, NGC 1365 is a dominant member of the well-studied Fornax galaxy cluster. This impressively sharp color image shows intense star forming regions at the ends of the bar and along the spiral arms, and details of dust lanes cutting across the galaxy's bright core. At the core lies a supermassive black hole. Astronomers think NGC 1365's prominent bar plays a crucial role in the galaxy's evolution, drawing gas and dust into a star-forming maelstrom and ultimately feeding material into the central black hole.",
   "hdurl":"https://apod.nasa.gov/apod/image/1812/NGC1365_HaLRGBpugh.jpg",
   "media_type":"image",
   "service_version":"v1",
   "title":"NGC 1365: Majestic Island Universe",
   "url":"https://apod.nasa.gov/apod/image/1812/NGC1365_HaLRGBpugh1024.jpg"
}
```

- `copyright` (optional): This field (when present) contains the copyright holder of the image. If the field is not present, the image is public domain.
- `date`: This field just returns the date passed in the URL, so is only useful if not defining a target APOD date.
- `explanation`: A text description of the photo. This usually contains 100-200 words.
- `hdurl` (optional): If requested, this field contains the full quality version of the image. Note that this can be missing, even if you request it!
- `media_type`: This field determines the type of content. Usually this is `image`, but can be `video`. There may be other `media_type`s, but I haven't found any.
- `service_version`: This has always been `v1`, but.. could one day change.
- `title`: This APOD title is usually 3-6 words long, and is reliably concise, factual, and descriptive.
- `url`: This field contains the actual APOD URL. Usually a `.jpg`, but for non-image APODs may be a YouTube video or another arbitrary URL.

## Limitations

Whilst the API is an excellent service, it definitely isn't perfect. The following few sections are things that may be unclear initially, but need to be considered when using the API.

### Reliability

The API quite often simply doesn't work. It'll return a (HTML) server error page from their CDN after a long delay (20-30 seconds). This usually persists for 5-10 minutes, the API then performs normally again. Luckily, these failed requests don't seem to use up your quota, but you'll still need to handle this unusual response.

```html
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title>Application Error</title>
        <style media="screen">
		  html,body,iframe {
			margin: 0;
			padding: 0;
		  }
		  html,body {
			height: 100%;
			overflow: hidden;
		  }
		  iframe {
			width: 100%;
			height: 100%;
			border: 0;
		  }
		</style>
    </head>
    <body>
        <iframe src="//www.herokucdn.com/error-pages/application-error.html"></iframe>
    </body>
</html>
```

### Valid dates

According to [the APOD archive](https://apod.nasa.gov/apod/archivepix.html), the earliest APOD is from 1995-06-16. There are a few missing days since then, requesting any of these (e.g. 1995-06-17) will return a server error:

```
{
    "code": 500,
    "msg": "Internal Service Error",
    "service_version": "v1"
}
```

It's also not guaranteed that today's APOD will be ready at midnight, especially when considering time zones. As such, any implementation should have the ability to handle today's date not returning results, and potentially falling back to the day before.

### Non-image dates

Whilst most days return image URLs, some return video URLs (or potentially other content), determined by the `media_type` field in the response. For example, 2018-12-23 is a video, and returns the following:

```
{
    "date": "2018-12-23",
    "explanation": "About 12 seconds into this video, something unusual happens. The Earth begins to rise.  Never seen by humans before, the rise of the Earth over the limb of the Moon occurred 50 years ago tomorrow and surprised and amazed the crew of Apollo 8. The crew immediately scrambled to take still images of the stunning vista caused by Apollo 8's orbit around the Moon. The featured video is a modern reconstruction of the event as it would have looked were it recorded with a modern movie camera. The colorful orb of our Earth stood out as a familiar icon rising above a distant and unfamiliar moonscape, the whole scene the conceptual reverse of a more familiar moonrise as seen from Earth. To many, the scene also spoke about the unity of humanity: that big blue marble -- that's us -- we all live there. The two-minute video is not time-lapse -- this is the real speed of the Earth rising through the windows of Apollo 8. Seven months and three missions later, Apollo 11 astronauts would not only circle Earth's moon, but land on it.",
    "media_type": "video",
    "service_version": "v1",
    "title": "Earthrise: A Video Reconstruction",
    "url": "https://www.youtube.com/embed/1R5QqhPq1Ik?rel=0"
}
```

### Image size

Whilst the `url` field has reasonably sized images (usually 1000-2000px width / height), the `hdurl` field can have absolutely massive images. For example, 2018-12-02 returns `https://apod.nasa.gov/apod/image/1812/FairyPillar_Hubble_3857.jpg`, a 3857×7804 image! There's certainly larger ones out there, so HD images need to be handled carefully to avoid excessive memory usage.

### Quota

Your API key has a default limit of 1000 requests per hour. Every response contains a header `X-RateLimit-Remaining` with your remaining requests, and a header `X-RateLimit-Limit` with your current quota.

If the 1000/hr quota isn't enough, NASA ask you to contact them for a higher limit, although no contact details are provided!

### Headers

Every response contains the following headers, although only the `X-RateLimit` ones are likely to be useful:

```html
Server → openresty
Date → Fri, 28 Dec 2018 23:51:36 GMT
Content-Type → application/json
Transfer-Encoding → chunked
Connection → keep-alive
Vary → Accept-Encoding
X-RateLimit-Limit → 1000
X-RateLimit-Remaining → 979
Via → 1.1 vegur, http/1.1 api-umbrella (ApacheTrafficServer [cMsSf ])
Age → 0
X-Cache → MISS
Access-Control-Allow-Origin → *
Strict-Transport-Security → max-age=31536000; preload
Content-Encoding → gzip
```

## Summary

As mentioned at the start of this post, NASA's APOD API is an extremely useful resource, even with it's faults and quirks.

I strongly recommend you [download the Postman collection I created](https://pastebin.com/raw/nwvEaHHN) (save as a `.json` and import) and start playing around yourself!