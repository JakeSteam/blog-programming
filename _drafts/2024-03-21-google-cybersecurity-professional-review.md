---
title: An unbiased detailed review of Google's Cybersecurity Professional Certificate 👨‍💻
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  - Google
  - Cybersecurity
  - Coursera
maxheader: 3
---

Did you know Google offers a Cybersecurity Professional Certificate? They do! I recently completed it, and wanted to share the good, the bad, and the confusing parts.

Before diving into the review, it's worth mentioning that the learning platform used for this (Coursera) has a very rewarding referral program, but **referral links are NOT used** in this article. This way, the review is guaranteed to be impartial.

Want to skip alllllll the words and detail? [Skip to the conclusion](#conclusion)!

## Overview

A few useful links before going into detail:

- [Google's Cybersecurity Professional Certificate](https://www.coursera.org/professional-certificates/google-cybersecurity)
- [An example of the final certificate](https://www.coursera.org/account/accomplishments/professional-cert/GLBE227BHPQ9) (mine!)
- [My notes made throughout the certificate process](https://github.com/JakeSteam/cybersecurity-certificate-notes), organised by course.

I won't cover all the basic information around the objectives of each module, or the areas covered, since this is all available on the official site. Instead, I'll cover all the things that _aren't_ discussed, far more interesting! However, it is worth referencing Google's summary of the certificate objectives:

> Understand the importance of cybersecurity practices and their impact for organizations.
>
> Identify common risks, threats, and vulnerabilities, as well as techniques to mitigate them.
>
> Protect networks, devices, people, and data from unauthorized access and cyberattacks using Security Information and Event Management (SIEM) tools.
>
> Gain hands-on experience with Python, Linux, and SQL.

### Duration

The description of [Google's Cybersecurity Professional Certificate](https://www.coursera.org/professional-certificates/google-cybersecurity) states "6 months at 7 hours a week". This simply isn't close to accurate, and is many times higher than the actual time required, regardless of experience levels.

Each of the 8 courses consist of 4 "modules", in theory a week of work. In reality each module will take around an hour of work, perhaps two for the very technical modules for complete newcomers. This gives a total time of around 32 hours (8 x 4), rounded down to 30 due to the last course containing far less detail. Nowhere near the ~180 estimated!

32 hours is roughly a work week, and I can see from my notes that I completed the course in 16 days (20th March - 5th April). During this time I was also working on an unrelated university project (and have a job!), so my personal estimate with a lot of relevant existing knowledge is around 20 hours.

In conclusion, 20 - 40 hours to complete is more accurate, depending on experience.

### Pricing

The certificate is served on Coursera, and whilst you _can_ pay for access to the certificate itself ($49/month), it costs about as much as a month of "Coursera Plus" ($59/month) which provides access to the certificate and hundreds of others.

As such, Coursera Plus seems to make far more sense if you intend on completing any additional courses whatsoever, otherwise you'll end up with overlapping $49/month subscriptions!

**[ CLARIFY FREE TRIAL, can take for free then pay for cert, etc ]**

### My background / aims

As hinted at earlier, I knew that this course would have quite a bit of overlap with my existing knowledge. I've worked as a software engineer for 10+ years, and have a personal interest in cybersecurity, encryption (my BSc Computer Science dissertation was on this!), and similar topics.

However, as with a lot of my tangential knowledge, it's been picked up at random through articles, conversations, and experiences at work or on side projects. This left me suspecting there might be some fundamental gaps in my knowledge, and this certificate confirmed that!

I'd estimate around 30% of the course was new to me. Whilst the Python ([Course 7](https://www.coursera.org/learn/automate-cybersecurity-tasks-with-python?specialization=google-cybersecurity)), SQL ([Course 4](https://www.coursera.org/learn/linux-and-sql)), and web portions were more of a refresher than anything new, the areas around incident detection and response ([Course 6](https://www.coursera.org/learn/detection-and-response)), and assets / threats / vulnerabilities ([Course 5](https://www.coursera.org/learn/assets-threats-and-vulnerabilities?specialization=google-cybersecurity)) were completely new information, with the other modules being a mixture.

With all that preamble finished, on with the actual review!

## The Good

### Varied, high quality content

People have different preferred learning styles, and I sometimes "bounce off" training courses because I don't particularly enjoy videos, and far prefer reading or interactive activities. As such, I was very impressed with the variety of formats, and how it was all extremely consistently excellent.

For example, whilst core information is often provided in a video, it's almost always expanded on in far more detail in text / graphic form in the next activity. This serves as a recap, clarifies any misunderstandings, and lets you absorb a bit more surrounding information.

In total, the formats offered, in approximate order of frequency, are:

#### Videos

Typically 2-8 minutes long, with a relevant Google employee on camera. These will often include animations, diagrams, or code when helpful, and are clearly filmed and edited professionally. More on these in [Videos](#video-features).

[![](/assets/images/2024/coursera-videos-thumbnail.png)](/assets/images/2024/coursera-videos.png)

#### Readings

Usually 100-800 words, with relevant diagrams and links. The writing is very high quality, easy to understand, yet also accurate. In fact, despite usually finding plenty, I didn't spot a single spelling mistake throughout the entire certificate! I wish these readings were provided as standalone content, as they're some of the best summaries I've ever seen.

[![](/assets/images/2024/coursera-readings-thumbnail.png)](/assets/images/2024/coursera-readings.png)

#### Quizzes

These are short, 4-8 question multiple choice quizzes around recently covered content. They're quite easy, usually require a 75% pass rate, and can be retaken if failed.

[![](/assets/images/2024/coursera-quizzes-thumbnail.png)](/assets/images/2024/coursera-quizzes.png)

#### Flashcards / Plugins

There's a few formats of these, but they all revolve around clicking to view summaries of information learned. They all contain high quality artwork, and are useful recaps.

[![](/assets/images/2024/coursera-plugins-thumbnail.png)](/assets/images/2024/coursera-plugins.png)

#### Portfolio builders

After learning about a new type of documentation (e.g. incident report), there'll be a self-marked assignment to create an example of this documentation, with an example provided afterwards. I admittedly skimmed these activities usually, since they were quite a lot of paperwork that I've completed in the real world before.

[![](/assets/images/2024/coursera-portfolio-thumbnail.png)](/assets/images/2024/coursera-portfolio.png)

#### Discussions

The only weak content type, "Discussions" give you a few prompts, and encourage you to answer in a few sentences, then reply to other student's answers. These are typically open-ended questions such as "Why are you interested in learning about network security?". Unfortunately these are almost entirely ignored (see ["Discussions are pointless"](#discussions-are-pointless")), fortunately they are completely optional!

[![](/assets/images/2024/coursera-discussions-thumbnail.png)](/assets/images/2024/coursera-discussions.png)

#### Lab activities

Some technical content, such as learning Linux, Python, or SQL, had an interactive lab activity available via "Qwiklabs". The Linux labs especially were very well-structured, more on those in [Linux labs](#linux-labs).

[![](/assets/images/2024/coursera-labs-thumbnail.png)](/assets/images/2024/coursera-labs.png)

### Video features

Whilst playing back a video _should_ be easy, it's startling how awful some non-YouTube video players can be (and even YouTube's sometimes). Luckily, this isn't the case for Coursera, with the player containing education-specific features in addition to the basics. The full list of features offered, in order of usefulness is:

- Playback speed is adjustable in 0.25x increments, from 0.75x - 2.00x. This is essential due to the [slow talking speed](#talking-speed-and-tone).
- Subtitles in English, with automatic alternatives for Spanish, French, Portuguese, and Chinese.
- A full, accurate transcript below the video, with the sentence being spoken highlighted. Clicking a sentence skips to that part in the video.
- The ability to make notes at timestamps in the video. Clicking "Save note" saves a clip, and the relevant transcript, and allows you to add your own comments. These can then be viewed in a central place for the course.
- The video (or transcript / subtitles) can be downloaded in low or high quality for offline revision.
- Some videos are interrupted by a multiple choice question halfway through, checking your understanding of the content so far.

[![](/assets/images/2024/coursera-saving-notes.png)](/assets/images/2024/coursera-saving-notes.png)

### Ambitious scope

This certificate will teach you a _lot_, even if you've already had plenty of related experience.

It's quite unusual for a single program to teach you languages like SQL and Python, how to use Linux, almost all the knowledge both technical and procedural involved in an entry level technical job, _plus_ advice on preparing a resume and interviewing!

This scope means there's a necessarily a quite fast pace, and I imagine most students will speed through some areas, then take extra days or weeks for additional independent study if this is their first time learning a technical topic.

Still, this broad focus, delivered in a structured and high quality way, makes it an easy recommendation for anyone trying to get into cybersecurity.

### Recurring host

Each course of 4 modules (so, 1/8th of the entire certificate) has a main host presenting the content. They introduce themselves, share some of their background, and present almost all of the content, with a few guest speakers scattered throughout.

Having a single person recurring in video after video on a topic helps you focus on the content itself and not the individual, and get used to their style of speaking. Additionally, each of these host speakers has a very relevant job at Google, such as the CISO of Google Fiber, a Technical Program Manager, or a mid-level Security Engineer.

Knowing that the speakers work for Google in technical roles, not in video creation, gives the content extra authority, since the person speaking about it has real life experience. There's a lovely video surprise at the end of the lab featuring these hosts, I won't spoil it here!

### Linux labs

During some modules, especially the Linux one, the course makes heavy use of "[Qwiklabs](https://go.qwiklabs.com/)". This is an online virtual machine based learning platform with various cloud related courses available, and combines a terminal, instructions, and checking your work.

Whilst this tasks start off very basic, and tell you exactly what to type, later on they'll require actual understanding. The instructions will ask you to change permissions for a user, but you'll need to remember the command's functionality and syntax to actually complete it.

Importantly, the labs strike a good balance between requiring you to type new commands to become familiar, whilst letting you copy and paste repeated or lengthy commands. This is accompanied by a very reliable progress checker, that offers hints if you've completed a task incorrectly. Sometimes a multiple choice question will be shown instead.

Finally, Qwiklabs also has a detailed "League" system, where you get put into a group of other students and promoted / demoted through leagues. This is more relevant for longer term learning, since I unsurprisingly shot to the top of my group after completing every Linux lab in the certificate!

[![](/assets/images/2024/coursera-qwiklabs-thumbnail.png)](/assets/images/2024/coursera-qwiklabs.png)

### Connected modules

All of the modules within a course _make sense_ together, and build on each other logically. Given the density of content I was concerned each video might end up being a standalone topic, but they're all woven together well.

For example, each section will mention why the new content is related to the previous content, and an end of module (and course) wrap-up ties all the details together.

### Realistic external sites

Finally, the references to external sources are up-to-date and realistic. Instead of referencing text books or mailing lists, sites like Reddit or Unix Stack Exchange are mentioned as far more realistic places to give & receive help.

This also applies to the training on specific tools. Google's products are mentioned when they are relevant and widespread, not focused on exclusively. For example, when talking about log analysis tools a tutorial on the industry standard "Splunk" was provided, in addition to Google's "Chronicle" alternative.

Surprisingly, this even applied when Google clearly has the superior option, such as free spreadsheet creation. Google Sheets is mentioned, but LibreOffice is also suggested as a possible alternative.

Considering this course is taught entirely by Google, I'm very impressed they resisted the urge to exclusively mention the products they presumably use (or work on) internally!

## The Bad

### Very easy

- It's very easy, due to ability to retake all exams, and no peer review.

### Focus on individuals

- Heavy focus on diversity, everyone is welcome, varied career paths, personal stories.

### Length

- Much, much shorter than advertised (ahead of the game, you got this). 45m for 9m quiz. 30m for ~6m reading.

### Coursera navigation

### Discussions are pointless

- Discussions are pointless (discussions.png)

### Learning Python

- Not sure Python in a Jupyter notebook is the best way to learn.

### Wireshark tutorial

- Windows labs just didn't work for me for Wireshark tutorial.

## The Confusing

### Talking speed and tone

- Absurdly slow talking speed, highly scripted. The occasional unscripted normal speed interview is startling!
- Somewhat infantilizing tone of voice:
  - "You did a fantastic job adding new knowledge to your security analyst toolkit ... Keep up the great work!"
  - "Wow, well done!"
  - "I really enjoyed debugging this code with you"

### Occasional focus loss

- Occasionally loses focus on cybersecurity, and becomes generic career advice (resume, cover letter, etc). Presumably due to completely new target audience.

### Distracting cast

- Diversity... 80-90% women, at least as much focus on background as actual content. This extends to flashcards etc where a single scene will have someone in a wheelchair, someone with a hearing aid, and someone in a Hijab, none white. First time I've ever noticed it. A deaf guest speaker?

### Unneeded emails and notifications

- Ending course and starting next results in email spam (joining course spam)

### Varying technical expertise

- Sometimes the technical expertise targeted varies massively. For example, 4.1 contains the extreme basics of what is an OS... and then talks about virtualization and hypervisors! Similarly, 5.4 talks about reflected XSS attacks, and also how to determine URL in an email link.

- Page mentions interview prep, career support, resume review... do these exist?

## Conclusion

[![](/assets/images/2024/example-thumbnail.png)](/assets/images/2024/example.png)
