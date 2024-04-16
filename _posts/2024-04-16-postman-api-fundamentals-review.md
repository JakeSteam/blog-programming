---
title: Reviewing Postman's API Fundamentals Student Expert certification
author: Jake Lee
layout: post
image: /assets/images/2024/postman-banner.png
tags:
  - Postman
  - Certification
  - Review
---

Postman has been around for a _long_ time, and is widely used when working with APIs. In addition to [documentation](https://learning.postman.com/docs/introduction/overview/), it also has [full training courses](https://academy.postman.com/page/self-study-learning), including a [student expert certification](https://academy.postman.com/path/postman-api-fundamentals-student-expert/postman-api-fundamentals-student-expert-certification-1). Here's a review!

Before diving into the course's content, [here's my completion badge](https://badgr.com/backpack/badges/661d9f7d839d0f1ea135a1be).

## Good

### Structured content

[The course](https://academy.postman.com/path/postman-api-fundamentals-student-expert)'s content is structured neatly into small, digestible chunks. For example, "Introduction to variables and scripting", or "Generating code".

There's a clear top to bottom order to work through, and automatic completion tracking works well. Similarly, each page has subsections to break up the text, and there's plenty of example gifs scattered throughout.

[![](/assets/images/2024/postman-example-thumbnail.png)](/assets/images/2024/postman-example.png)

### Learn by doing

As you might expect from software that is available for free online, Postman encourages you to follow along as you go, and you'll need to complete all the tasks to earn the badge. This hands-on approach ensures you'll actually have real experience completing tasks, and is much better than simply skim reading test.

### Submission tests

My favourite part of the course!

To check you have completed work completely, you:

1. Create a sharing URL with an embedded API key for your collection of API calls.
2. Fork a provided test suite collection.
3. Run your collection against this test suite: if the tests pass, so do you!

This approach showcases some of Postman's advanced functionalities (sharing collections, testing APIs, collection variables) and proves they can have real world value. I was genuinely impressed by this, testing your product knowledge using the product itself is such a good idea.

|                                           Success response                                            |                                             Passing tests                                             |
| :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/postman-success-1-thumbnail.png)](/assets/images/2024/postman-success-1.png) | [![](/assets/images/2024/postman-success-2-thumbnail.png)](/assets/images/2024/postman-success-2.png) |

Submitting your work using Postman itself is done halfway through and at the end of the course, and is required for completion.

### Shareable badge

Whilst not a deal-breaker, having a badge on a neutral third party platform ("Badgr" in this case) is a nice reward for completing a course.

[The rewarded badge](https://badgr.com/backpack/badges/661d9f7d839d0f1ea135a1be) is pretty simple, but accurately described what you've learnt from the course.

If you're interested in more Postman badges, there's [over 30](https://badgr.com/public/issuers/BC0x4AQaQPC7lFilsBP_tQ/badges) offered!

## Bad

### Arbitrary scope

Whilst the course does onboard you to a few Postman features, it seems somewhat arbitrary which are included and which are not.

For example, there is the "Generating code" section which shows you that cURL (and other) equivalents of a Postman request can be exported. This is a useful feature, but the course doesn't mention the essential "Environments" feature whatsoever!

The decision on what to include doesn't seem to prioritise either what is most useful to users (in this case students), nor what is core Postman functionality, and instead seems to emphasise the "cool" features.

This is understandable, since the goal is presumably to convince students Postman is a useful tool, but it does lead to the course being a bit disjointed, and a lack of clarity over why specific topics are being taught.

Similarly, if you are enthused by the course and want to learn more, there's very little guidance around next steps besides claiming your badge. Postman has [a whole engineer learning path](https://academy.postman.com/path/engineer-learning-path), and even a [suggested student project](https://academy.postman.com/project-ai-text-summarizer), but these aren't treated as logical next steps. Instead, you'll accidentally stumble across them and hope they're suitable.

### Unclear target audience

I'm not sure who specifically this course is targeted to. Whilst yes, "students", presumably computer science students, are we talking about school children or university students?

The description states:

> There are no pre-requisites to get started - you don't even have to know what API stands for.

However, a couple of the tasks briefly dive into JavaScript (to show off Postman scripting), assuming the audience already knows how programming in general works. The course also talks about getting and setting Postman-specific variables... and then mentions that JS comments exist!

If the course is also trying to onboard people to JavaScript, that's a massive scope creep. Instead, it just touches on JavaScript for a few minutes then zooms forward to `PATCH` and `DELETE` requests. I can imagine this step losing anyone who doesn't already have a working knowledge of JS.

Similarly, the course is often unclear if it's trying to teach you generic web concepts (e.g. status codes, requests) or Postman. Either of these are pretty big topics, and teaching them at the same time risks muddying the waters around what is a globally accepted standard, and what is a Postman invention.

### Inconsistent naming

This is a minor, petty complaint: Naming should be consistent throughout all documentation.

Whilst names are typically accurate, and only suffer from inconsistent plurals or use of "a", there's a few examples where the "here's what you should see" is significantly different from earlier in the page:

[![](/assets/images/2024/postman-naming-thumbnail.png)](/assets/images/2024/postman-naming.png)

Whilst yes, obviously it's clear these are the same content... why are colours, names, capitalisations all just a bit different? It hints at a lack of technical writing review, throwing the genuinely useful information into doubt.

There's also a few instances where the UI in an example picture is just slightly different to the current live UI. Nothing impossible to figure out, but just minor shuffling / changing of elements.

### Security error

To Postman's credit, there is a warning that an error might be shown whilst sharing your collection for the test suite.

However, it's a scary error that a new user shouldn't see! An email is also sent with `[Action Required]` in the subject line.

[![](/assets/images/2024/postman-error.png)](/assets/images/2024/postman-error.png)

### Embedded videos

It's great that almost every step has a gif showing the action to avoid confusion.

It's less great that these are full quality screen recordings at 2880x1800 resolution. Once there's multiple 10MB+ gifs playing on the screen, scrolling can stutter.

These should be something like `webp` or `avif`, gif is a poor choice for the size and detail required.

### Poor sample data

There are 2 risky decisions made with Postman's sample data.

1. All users read & write from the same book database. Since the tutorial always uses the same example book, the databases consists of hundreds of variations of "To Kill a Mockingbird" with slight metadata changes! There's a static API key for this data, so anything could be in there with no way to report.
2. When discussing query parameters, the course encourages querying Google in Postman as an example. This displays a cookie / authentication error, since it's not an intended use of Google. This might confuse new students.

## Conclusion

The course is OK. Not great, not, awful. Ultimately, it's hard to know who I'd recommend the course to, since it's too basic for experienced engineers learning Postman, too Postman-specific for beginner engineers, and too varied for any specific topic.

Whilst the content is presented well, this doesn't matter if it's not necessarily the right content. If the course had started off with generic HTTP concepts, then moved on to Postman, there'd be more incentive to at least recommend the first few steps.

I personally learned that Postman has unsurprisingly gained some new capabilities in the few years since I last used it, but none that I'm eager to actually start using myself. Admittedly I didn't learn anything new about API basics, but I wasn't expecting to from a student course considering I graduated from university 10 years ago!
