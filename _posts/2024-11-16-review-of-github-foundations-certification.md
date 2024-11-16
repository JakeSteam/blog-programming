---
title: My experience with the GitHub Foundations Certification process
image: /assets/images/2024/github-certification.png
tags:
  - GitHub
  - Education
---

Did you know GitHub offer paid certifications? They do! The first of these is "GitHub Foundations", offered for free to students, here's my somewhat rocky experience of studying & taking the exam.

_Want to skip directly [to my study notes](https://github.com/JakeSteam/github-foundations-notes) or [the conclusion](#conclusion)?_

## Overview

The [Foundations Certification](https://education.github.com/experiences/foundations_certificate) came out earlier this year, and later on was made free for students with access to the [GitHub Student Developer Pack](https://education.github.com/pack). To quote GitHub's docs, this certification covers "your understanding of the foundational topics and concepts of collaborating, contributing, and working on GitHub", specifically:

- Collaboration
- GitHub products
- Git basics
- Working within GitHub repositories

Completion of the program rewards [a Credly badge](https://www.credly.com/badges/25737bc2-bf67-428c-9e77-0df2fd3980bd/), as is typical of other online training courses.

This can be added to your LinkedIn:

[![GitHub Foundations LinkedIn credential](/assets/images/2024/github-linkedin-credential.png)](/assets/images/2024/github-linkedin-credential.png)

## Studying

As a certification aimed at covering a wide area, some studying is required!

Somewhat bizarrely, GitHub recommends _multiple_ study guides on various platforms, namely:

1. [DataCamp's 4-course "Skill Track"](https://www.datacamp.com/tracks/github-foundations)
2. [A LinkedIn 7-course "Learning Path"](https://www.linkedin.com/learning/paths/prepare-for-the-github-foundations-certification)
3. [A question-based study guide](https://github.com/LadyKerr/github-certification-guide/blob/main/study-guides/gh-foundations.md) by a GitHub Developer Advocate. This is just a list of questions (e.g. "Describe branching") with no answers or information provided.
4. Finally, a [16-module Microsoft "Learning Path"](https://learn.microsoft.com/en-us/training/paths/github-foundations/), which is what I used to study since Microsoft owns GitHub, this is [recommended](https://resources.github.com/learn/certifications/), and is text & activity based, not video tutorials.

Throughout my studying I made [various notes along the way](https://github.com/JakeSteam/github-foundations-notes) of bits from Microsoft's training I might forget, feel free to fork the repo if you find it helpful.

### Training contents

I really, really enjoyed [Microsoft's Learning Path](https://learn.microsoft.com/en-us/collections/o1njfe825p602p) for this exam!

The typical format for a module is a few pages of text / diagrams to read, a 10-15 minute exercise performed on GitHub.com itself, then a (short, retakeable, multiple choice) knowledge check quiz. This adds up to around 30 minutes per module, so 8 hours for the entire learning path.

#### Modules

Whilst the overall learning path wasn't especially well organised, this was clearly because each module had been designed as an independent unit. For example, whilst the module "Contribute to an open-source project on GitHub" is clearly intended to come after the "Introduction to GitHub" module, it's clearly written to also be suitable by itself.

This led to a small amount of going over topics again, but this was probably beneficial for the target audience of the course, since the minor parts of repeated content would typically be approached from a new perspective, and in a different level of detail. In general each module built on earlier modules' teachings, so this is a minor complaint.

[![GitHub Foundations study module](/assets/images/2024/github-module-git.png)](/assets/images/2024/github-module-git.png)

#### Exercises

Easily the best feature of the training was the exercise repos on GitHub itself! Each of these (e.g. "[Review pull requests](https://github.com/skills/review-pull-requests)") requires forking a project, which triggers the `README.md`'s instructions to update in your fork of the project. Once the new instructions are followed, the `README.md` updates with extra information on what happened, and newer instructions to continue the exercise. Once this is repeated a few times, and the hands-on lessons have been learned, the exercise is complete.

All the exercises have the same getting started instructions:

[![GitHub Foundations exercise example](/assets/images/2024/github-exercise-example.png)](/assets/images/2024/github-exercise-example.png)

This simple cycle, performed by GitHub Actions, excellently highlights how to use GitHub by forcing the user to _actually perform the steps_. It also gives a hint at how powerful GitHub is, and that it is far more than just a file storage or a collaboration tool. The exercises even cover useful yet rarely taught abilities like "[connecting the dots](https://github.com/skills/connect-the-dots)" to hunt down a bug in a project using git blame.

Despite knowing how these features work very well (I've likely reviewed 1000+ PRs!), I still completed the exercises because they were genuinely well written and fun. For a new user to GitHub, this hand-holding yet independent approach to getting the basics sorted would be unbelievably helpful.

I'll definitely be taking a look at [all the "skills" training repos available](https://github.com/orgs/skills/repositories?type=all) and both trying some more myself and recommending them to more junior developers.

## Exam

So I enjoyed the 7-8 hours of training, time to take the exam! Should be easy, right?

Well, maybe if it went smoothly...

### Availability

I took this exam for free via GitHub Student Pack. There was [an unfortunate issue on initial release](https://github.com/orgs/community/discussions/138834) where the certification was made free to everyone(!) and the program was paused, but as of the 11th November it's available again for free.

This 2 month delay was a little annoying, but luckily I didn't actually start studying until it was made available again. 2 months _after incorrect implementation_ to get the vouchers working again seems a pretty long time, but it's free so I can't complain!

### Registering

When registering, the voucher to make the exam free was applied automatically, and there was a smooth handover between GitHub and the exam system (PSI exams).

Some unusual additional information was required, such as a full home address without any explanation, and a request for my phone number. When I entered my number I was told my country wasn't supported, but luckily I could skip this step! That same phone number was accepted later on as a contact number, so I'm not sure what changed.

The exam can be taken whenever you want, within 60 days of your registration. The scheduling confirmation email had some... odd parts (it was actually a 2-hour exam, and it had a name!), which was perhaps yet another warning that this process wasn't perfect:

> - **Test**: Exam Name
> - **Duration**: 11 minutes
> - **Exam Availability**: Anytime 24/7
> - **Location**: On Demand Testing

The actual booking process was uneventful:

[![GitHub Foundations order summary](/assets/images/2024/github-order-summary.png)](/assets/images/2024/github-order-summary.png)

### Taking exam

Finally, I went to start my exam. It required downloading and installing "PSI Bridge Secure Browser" which actually seemed shady enough that I double-checked the domain & company were legitimate! They were, and I had no other options if I wanted the certification, so I installed the browser.

#### Security check

Once installed, it somehow knew the exam I was taking and ran it's "Security Check".

This check was pretty obnoxious, I understand it's to prevent cheating but what a pain it is! I had to unplug my 2nd monitor, close Chrome, Spotify, WhatsApp, VSCode, and even open up "Services" and disable a few Hyper-V and Nvidia processes. Again, I understand why I can't have Chrome open, but this is a non-proctored exam and my phone is right in front of me, I suspect these controls work better in a classroom environment!

Starting the exam immediately took me into what seemed like a **post**-exam survey, asking if I felt I'd had enough time, how I found the exam etc. These required answers were impossible to answer yet, so I just submitted neutral answers with the intention of revisiting them afterwards.

#### Submitting exam

After an hour or so of answering every question (more on those later), I clicked submit and... received a fullscreen "Something went wrong" message. There was a "Details" button, so of course I clicked it to discover it was a TypeScript error around an undefined `total`!

[![GitHub Foundations exam error](/assets/images/2024/github-exam-error.png)](/assets/images/2024/github-exam-error.png)

Not ideal. I tried every control I had available to me (changing colour scheme, contrast, navigating via different routes, refreshing the exam) and it would happen every time. I tried reopening the secure browser and luckily the answers saved, but same error. Restarted laptop, same error. Uh oh.

#### Customer support pain

Ready for a rant? Feel free to skip!

I reached out to PSI's support email and was told I had to talk to the technical team instead, via phone or live chat. Opening live chat led to a very frustrating conversation with an obviously script-following support agent who essentially ignored what I said unless it directly answered a question, despite me showing him the error at the very start!

After 20 minutes of slow & pointless back and forth, he asked if I'd restarted the secure browser. I had (and had told him in the first message), this apparently meant I had to contact GitHub! There were no more detailed instructions, he offered to give me a ticket number which was better than nothing, so... sure, off to GitHub we go.

Over on GitHub I raised a support ticket, and had a far better experience. They replied within an hour that they are aware of the issue and are "coordinating with PSI" on it, with updates promised. 6 hours later, I received an email from Credly with my GitHub Foundation badge, I guess they managed to fix it!

[![GitHub Foundations Credly email](/assets/images/2024/github-badge-email.png)](/assets/images/2024/github-badge-email.png)

Overall PSI were very unhelpful, and I had to fend off multiple pointless suggestions (e.g. "Talk to your professor and ask to retake") whilst also being pushed between support platforms (PSI email, PSI live chat, GitHub support) without any handover. This meant I had to explain my situation 3x, with only GitHub showing any empathy or responsibility.

### Exam contents

The exam's contents were surprising. Instead of being a knowledge check of GitHub basics, it was more of a trivia and obscure information check.

I would estimate the exam consisted of:

- **30%**: Things a developer would actually need to know, and should be tested on (what is a branch, what is a fork),
- **60%**: Entirely pointless trivia that there is no value whatsoever in memorising, and can be easily looked up (how to access a setting, what view options are available for projects, features in GitHub paid plans).
- **5%**: Debatable answers that have different answers for different teams (best practices, how to interact on open source repositories, PR behaviour).
- **5%**: Incorrect, outdated, or unclear questions.

For example, one question asked "Which of the following can be performed within GitHub Mobile?", with 5 possible answers. The correct answer was "Managing notifications from github.com", and incorrect answers included "Managing enterprise and organization settings" but what is the point in knowing this? A user with the app installed can just use the website if they need to, and the app isn't required anyway!

Another poor question asked where the 2FA settings can be found, with options including "Profile > Account > 2FA" and "Settings > Password & Authentication > 2FA". This is an essentially impossible question, since it's a thing most users only configure occasionally, and the two answers are very similar regardless. Again, what's the point in ever memorising the navigation path to 2FA? If you need to change it, you'll click your user profile in the top right, and find a Settings-y option, and go from there.

Finally, one particularly silly example. One question asked about "Private beta" and "Public beta" feature previews. This terminology was [replaced a month ago](https://github.blog/changelog/2024-10-18-new-terminology-for-github-previews/), so there is no correct answer to the question!

## Conclusion

[![GitHub Foundations Microsoft learning path](/assets/images/2024/github-certification-banner.png)](/assets/images/2024/github-certification-banner.png)

I really enjoyed the studying for the GitHub Foundations Certification exam, especially the hands-on exercises, even if the majority of it wasn't new information. This was fully expected, since I've been a software engineer [for 10 years](/7-lessons-from-a-decade-in-tech/) so should know my way around GitHub! The training even gives a trophy, arguably almost as good as taking the actual exam:

[![GitHub Foundations Microsoft learning path](/assets/images/2024/github-microsoft-learning-path.png)](/assets/images/2024/github-microsoft-learning-path.png)

Unfortunately the exam's tendency to test pointless trivia (not to mention fatal technical issues) was far less enjoyable.

### Reputability

I discovered _after_ passing the exam that there's many "practice exams" available online that essentially have very similar / identical questions and answers. I won't link to them here since I'm pretty sure that's essentially cheating, but it's worth mentioning!

Due to this, and the basic sounding "Foundations" certification, I'm not sure how much value this certification will actually add to a LinkedIn profile or Resume. I'd actually find completing Microsoft's study guide training far more impressive (if the exercises are included), since it's real, hands-on experience, in contrast to the exam's trivia.

### Other certifications

Overall I don't think this certification is a good "advert" for GitHub's certification program, at least for personal development. The study guides are essentially a more focused version of the existing documentation, with the exam more covering how well you can memorise minutia than actually use the tools.

If my employment heavily involved GitHub [Actions](https://learn.microsoft.com/en-us/users/githubtraining/collections/n5p4a5z7keznp5), [Administration](https://learn.microsoft.com/en-us/users/githubtraining/collections/mom7u1gzjdxw03), [Advanced Security](https://learn.microsoft.com/en-us/users/githubtraining/collections/rqymc6yw8q5rey), or [Copilot](https://learn.microsoft.com/en-us/training/paths/copilot/) I might consider working through the study guides and getting corporate sponsorship (especially Actions), but as an Android Engineer they're not worth it yet. [A redditor](https://reddit.com/r/github/comments/1f4g2td/passed_all_5_github_exams_in_1_month/) has compared their experience taking all 5 exams.

### Summary

I'd absolutely recommend the [GitHub Foundations Certification](https://education.github.com/experiences/foundations_certificate) to students since **it's completely free**, or those with a corporate sponsor who will support their education. It teaches skills that almost every software engineer _will_ need in their very first role.

However, I wouldn't recommend paying for it yourself, since arguably the most valuable part is the [freely available training](https://learn.microsoft.com/en-us/training/paths/github-foundations/). I'd also not recommend it if you have a year or two of real world software engineering experience, instead it's more useful as a "bridge" between a Computer Science degree education and actually using GitHub day-to-day.
