---
title: 'How minor bugs and security flaws can erode user trust: Examining my unfortunate experience with Bloggie.io'
author: Jake Lee
layout: post
image: /assets/images/2022/bloggie-header.png
tags:
    - Review
    - Bugs
---

Whilst wandering through GitHub recently, I discovered the Tokyo-based [Bloggie.io](https://bloggie.io), a markdown  blogging platform that gave a great first impression. Unfortunately, after an hour or so of clicking around, I realised my enthusiasm and trust had completely eroded. But why & how?

Before I get too into the article, I want to clarify that I do genuinely like the idea behind Bloggie.io, despite how this post might come across! However, it is a great personal example of the "user trust" concept that affects all software engineering / product teams.

## How I discovered Bloggie.io

So, how did I first find Bloggie.io? Google? A friend's post? Nope, GitHub stalking!

I was looking at the first GitHub issue I ever created[^first-github-issue] way back in 2016; a UI issue with a "guided tour" library I was using in a game. I also raised a PR[^first-pr] fixing it a year later and… it got no attention.

Not an ideal first experience on GitHub! Out of sheer curiosity I wondered what else the library's author had created, and discovered they were part of an organisation: Bloggie.io. This described itself as "A blogging platform crafted for software developers", which sounded intriguing and relevant… so I gave it a go.

## The good start

### First impressions
The initial impression was very, very strong. I liked the focussed scope of the articles, how my desired topic (Android) was available in a single click from the homepage, and the clean and simple design.

I'm always interested in who is behind hobby projects, and Bloggie.io's "Our Team" page[^our-team] is very endearing. I genuinely like reading about the professional & personal interests (& gifs when mousing over photos…) of small project maintainers, especially when it's only by 3 people! A snippet of the overall description helped set the scene too:

> We enjoy working on it, we enjoy learning from the experience, we enjoy the collaboration with each other.
>
> We hope our perseverance and passion can turn into something valuable for you and the developers community.

Whilst different demographics and individuals have their own preferences (obviously!), Bloggie.io's simple, content-first, and to-the-point design is what I almost always look for. Additionally, it seemed to only want me to read and enjoy articles, whilst similar sites (e.g., Medium) push sign-ups very heavily. Luckily, Bloggie.io is fairly open about its inspiration from Medium (side by side comparison in a bit), from the overall design to the privacy policy[^privacy-policy], which is:
> a derivative of Medium Privacy Policy by Medium, used under CC BY-SA 2.0.

[^first-github-issue]: [https://github.com/worker8/TourGuide/issues/88](https://github.com/worker8/TourGuide/issues/88)
[^first-pr]: [https://github.com/worker8/TourGuide/pull/110](https://github.com/worker8/TourGuide/pull/110)
[^privacy-policy]: [https://bloggie.io/privacy](https://bloggie.io/privacy)
[^our-team]: [https://bloggie.io/team](https://bloggie.io/team)

### Bloggie.io vs Medium

A brief side by side comparison should show the very similar, but simpler design Bloggie.io opts for:

| | Medium | Bloggie.io |
| -- | -- | -- |
| Homepage | [![](/assets/images/2022/bloggie-mediumhome-thumbnail.png)](/assets/images/2022/bloggie-mediumhome.png) | [![](/assets/images/2022/bloggie-bloggiehome-thumbnail.png)](/assets/images/2022/bloggie-bloggiehome.png) |
| Article | [![](/assets/images/2022/bloggie-mediumarticle-thumbnail.png)](/assets/images/2022/bloggie-mediumarticle.png) | [![](/assets/images/2022/bloggie-bloggiearticle-thumbnail.png)](/assets/images/2022/bloggie-bloggiearticle.png) | 
| Category / Community | [![](/assets/images/2022/bloggie-mediumtopic-thumbnail.png)](/assets/images/2022/bloggie-mediumtopic.png) | [![](/assets/images/2022/bloggie-bloggietopic-thumbnail.png)](/assets/images/2022/bloggie-bloggietopic.png) |

### Signing up
Signing up was also very smooth, with GitHub (my preference!) and Twitter options. The lack of any manual signup was an unusual choice, but at least it prevents spam signups.

I started a test post, and got thrown into a Markdown editor. No problem, I'm fluent in Markdown. I assumed the "Aa" button in the top right was some basic text styling (e.g., bold, italic) for those with less markdown experience. Nope, it says "Capitalise" in the hover text and when clicked… does nothing. A bit unexpected, but not a blocker.

Next, I spent a couple of minutes writing my text post, and went to publish.

### Posting
This part of the experience had a few nice surprises, primarily the ability to share a draft version of your post with someone. I often wish I had this feature myself, and end up just showing people the GitHub version of pages, which sometimes have minor formatting issues in comparison to the final post. Very cool.

Unfortunately, here's where the first tiny potential security issue made itself clear to me. I noticed my post editing URL contained `/705/`. And if I started a new post, it was `/706/`. Uh oh, I now know the site likely has around 700 combined posts and drafts. Not necessarily an issue, but not information I needed to know. Publishing the post went smoothly.

[![](/assets/images/2022/bloggie-post-thumbnail.png)](/assets/images/2022/bloggie-post.png)

Bloggie.io also has a "Notes" features, essentially the same as GitHub's Gists. This uses a totally different editor to posts, with the preview being in a separate tab instead of side by side. The published note page is similar to the post page (minus author information & comments), but here they use a GUID in the URL instead!

In a digital version of confirmation bias, the small URL decision for posts made the crucial change to my Bloggie.io exploration. Instead of being "I wonder if I can use this interesting platform", it became "I wonder how many bugs I can find on here", and by that stage anything less than a perfect site is doomed. 

Alas, Bloggie.io is not perfect.

## The warning signs

So far, I have only found an unnecessary button that doesn't work, and unusual decisions for URLs and signup options. These are all easily overlooked.

### Live editor
Since I was starting to look for bugs, I opened up [the demo editor](https://bloggie.io/demo). It invited me to "Try editing this area", and after doing as instructed… the preview didn't change. Considering the live editor worked whilst writing a post and the overall experience had been pretty smooth, I didn't expect to face issues so soon!

[![](/assets/images/2022/bloggie-liveeditor-740w.png)](/assets/images/2022/bloggie-liveeditor.png)

After trying to give it a helping hand by disabling adblock, clicking the preview, and refreshing the page, I had to conclude it's just broken. Oops.

### Overlapping menus
Next I looked at my example post, and realised the post "Share" and "Options" pop-up menus went underneath the very pretty code block, making them unreadable. Again, oops.

[![](/assets/images/2022/bloggie-codeblockbug.png)](/assets/images/2022/bloggie-codeblockbug.png)

Alright, so we've got some minor UI issues. And a bit of broken functionality here and there. Unfortunately, there's more to come…

## The cracks widening

### Maximum lengths
At this point I decided to see what non-destructive mischief I could get up to in the account page. First up, what's the maximum name / description length? Well, it appears to be pretty much infinite. Setting a long name and bio also breaks the "Updated!" dialog at the top. 

[![](/assets/images/2022/bloggie-maxlength-thumbnail.png)](/assets/images/2022/bloggie-maxlength.png)

At this point, the number and variety of bugs has ruled out the platform for me. If I've found 4-5 bugs in my first 10-15 minutes, I sadly can't trust that any posts I make will be safe from deletion / corruption in the future.

### Rules of engagement
I also made the conscious decision at this point to not do any "advanced" bug finding. For example, no SQL injection, no header manipulation, I will only do simple things that any user could do without any technical knowledge. I decided to do this as performing actual attacks, proof of concept or not, against an unwilling hobby project just isn't fair.

### Slug conflicts
Next, I suspected post slugs (the bit that identifies it) weren't being handled properly. To test this, I tried to publish a test post with the same name as an existing post (e.g., "An example post"). Since this is my only post with this name, it should be fine, but it looks like Bloggie.io only allows 1 post per slug across all users. Trying to publish a post with the same name as an existing one gives an unhelpful error:

[![](/assets/images/2022/bloggie-sameslug.png)](/assets/images/2022/bloggie-sameslug.png)

Whilst I definitely could have dived deeper into the potential cross-user exploits available here, I did not wish to cause any real damage so left it alone. Next up, the profile page! 

## The abyss

Unfortunately here's where I found some very concerning things. 

### Username
How's the username (used in URLs) filtering?

**Words**<br>
Well, after trying `admin`, `web`, `bloggie`, and an unpleasant word or two, I'm pretty confident there's no filter in place. 

**Symbols**<br>
Okay, but the words are still alphanumeric. What about `@`, `?`, or even my beloved zero width space `​`? Uh oh, they all work (although are URL encoded in the URL).

**Impersonation**<br>
Surely having a weird username is just a fun bug, right? Unfortunately not. Using zero width spaces in your name, you can now impersonate any user easily. 

For example, to impersonate a user at `https://bloggie.io/@Jake` I would put the space before my name, ending up with `https://bloggie.io/@​Jake`. They look identical until you click, then the character gets URL encoded. 

**Madness**<br>
Using symbols to impersonate any user almost undetectably is a good start. What else can we have as our username?

[![](/assets/images/2022/bloggie-codename.png)](/assets/images/2022/bloggie-codename.png)

... Oh. There really are no limits!

### Avatar
If you were going to build an avatar picker, what would your initial ideas for restrictions be? File type, file size, things like that? Well, none of those here!

To test this, I tried selecting a 1 GB zip file. It happily tried to upload it as a binary in a multipart form data, I closed the tab after ~10 seconds, in case I broke anything on the server. When trying a smaller non-image file, I got sent to an error page. Again, hopefully this didn't break anything.

[![](/assets/images/2022/bloggie-header-740w.png)](/assets/images/2022/bloggie-header.png)

## Conclusion

So, after all those issues, surely the site is not worth anyone's time, right?

The opposite! Despite these many comparatively small issues, the core idea and functionality is solid. If I didn't have my own sites already, or had limited web hosting knowledge, I would love a place to easily self-host a Markdown blog. This appeal increases massively when Bloggie.io appears to essentially be Medium without all the advertising / anti-consumer practices[^anti-consumer]! It helps to have a catchy name too, right?

Given a bit of tidying, and a bit more work growing the user base (all "Latest" posts in 2022 are from 2 authors, the owners), there is massive potential. Many software developers like writing about their experience, are comfortable with Markdown, and don't seek any financial benefit: Bloggie.io would suit this.

[^anti-consumer]: [https://news.ycombinator.com/item?id=24942037](https://news.ycombinator.com/item?id=24942037)

### 10 potential improvements

Finally, here's a short list of things that I think could really help Bloggie.io grow and succeed. I wish it the best of luck!

1. Fix the bugs / issues raised in this post, obviously!
2. Figure out how to grow the number of authors. Without content to discover, there's no reason to stick around.
3. Adding the ability to export all posts, in case a user wants to migrate to another platform.
4. Open sourcing if possible, to allow users to fix bugs.
5. More structured categories (e.g., "Web Dev" should include "JavaScript").
6. More accurate search: currently "Jake" returns 20 results, none of which contain "Jake"!
7. Add ability to signup without a Twitter or GitHub account, or at least add the ability to hide this connection on a user's profile.
8. Add ability to customise posts shown on homepage (similar to StackOverflow).
9. Add dark mode.
10. Add related posts (not just other author posts) at the end of an article.

## References