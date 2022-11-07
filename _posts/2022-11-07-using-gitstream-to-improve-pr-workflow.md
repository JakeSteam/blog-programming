---
title: "Using gitStream for \"Continuous Merge\": automatically approving safe PRs, assigning reviewers, estimating review time, and more"
author: Jake Lee
layout: post
image: /assets/images/2022/gitstream-banner.png
tags:
    - gitStream
    - GitHub
---

[gitStream](https://gitstream.cm) is a GitHub app that aims to improve the PR review process, a common bottleneck during development. It aims to extend CI/CD to include CM: Continuous Merge. In this post, I'll explain what it is, how it works, and what it can be used for. 

## What can it do?
Pretty much anything on a PR involving labelling, adding reviewers, or autoapproving based on criteria. The [examples page](https://docs.gitstream.cm/examples/) lists some great starting points most projects could benefit from. Some basic capabilities are showcased in my [example repository](https://github.com/JakeSteam/gitStream/pulls), such as review time labels and auto approvals.

There is [a blog post by the creators](https://devinterrupted.substack.com/p/solving-the-next-engineering-challenge) (and [a podcast](https://devinterrupted.com/podcast/solving-the-pull-request-problem-with-continuous-merge/)) about the reason behind gitStream's creation and what it aims to solve that is definitely worth a read. Unlimited usage of gitStream is provided free by [LinearB](https://linearb.io/dev/gitstream/), presumably as a loss-leader for their paid "WorkerB" Chrome extension[^workerb] and "LinearB" workflow automation / analytics solution[^linearb]. 

[^workerb]: [https://linearb.io/dev/workerb-for-chrome-onboarding/](https://linearb.io/dev/workerb-for-chrome-onboarding/)
[^linearb]: [https://linearb.io/](https://linearb.io/)

### Reviewers 
Specific individuals (or groups) can be assigned as reviewers based on PR characteristics, such as lines / files of code changed or filetype[^assign-reviewers]. Additionally, the number of approvals required can be adjusted dynamically, such as making PRs with server config changes requiring more approvals than those updating documentation[^number-of-reviewers].

### Labels
Adding labels based on the content of a PR doesn't seem very powerful initially, but it has a lot of potential! GitHub's PR overview screen doesn't show many details about the contents of a PR, so even something as simple as colour-coded labels based on estimated review time could help smaller PRs get approved quicker[^labelling-prs]. 

### Approving PRs
When working on a project with experienced engineers, there'll likely be a few PRs that realistically don't need human eyes. This could be test updating, documentation updating, or some project-specific metadata that needs frequent changes (e.g., release notes). Luckily, gitStream lets you set criteria under which a PR should be autoapproved or even merged, avoiding the situation where a small typo fix takes days to be deployed.

Good starting criteria could be if a PR only contains documentation[^approve-documentation], or if the PR only adds new tests[^approve-tests]. 

### Enforcing arbitrary rules
Whilst most languages / developer environments have their own ways of indicating deprecated functionality (e.g. an annotation), this can also be performed platform agnostically inside gitStream. For example, if multiple projects are slowly migrating from `oldapi.example.com` to `newapi.example.com`, regular expression searches could be used to add warnings to any code additions featuring the deprecated URL[^migrations].

### Multiple actions
Whilst these individual actions are already useful by themselves, the true value comes when they are used with each other, making lots of little optimisations to the PR workflow. 

Using [this PR](https://github.com/JakeSteam/gitStream/pull/5) featuring only small changes to a markdown file as an example, it has been autoapproved with a 1-minute review estimate and a `safe-changes` label. On a busy team, these clear indicators of an easily mergeable PR will help it progress quickly, whilst reducing the cognitive load added by a long list of pending PRs. 

### Additional functionality
Along with these basic implementations, [the documentation](https://docs.gitstream.cm/automation-actions/) contains a detailed list of data manipulation tools and actions that can be combined and utilised. I'll briefly summarise these below, to give an idea of possibilities.

#### Data manipulation ([docs](https://docs.gitstream.cm/filter-functions/))

Basic logical operators (`every`, `includes`, `filter`, `match` etc) are useless by themselves, but provide a solid framework to build complex logic on.

The overall contents of a PR can be checked using:

* `allDocs`: Are all files `.md`, `.mkdown`, `.txt`, or `.rst`.
* `allImages`: Are all files `.svg`, `.png`, or `.gif`.
* `allTests`: Do all files have `test` or `spec` in the filename / path.

Whilst additional data can also be extracted using:

* `estimatedReviewTime`: Estimated review time, in minutes.
* `extensions`: A list of all unique file extensions.
* `isFormattingChange`: For JavaScript, TypeScript, JSON, YAML, or HTML files, check all changes are only formatting.
* `matchDiffLines`: Used to check the contents of every changed line according to a regular expression.

#### Actions ([docs](https://docs.gitstream.cm/automation-actions/))

All of the actions are self explanatory, and contain basic customisation (e.g. label text). Currently, the actions available are `add-comment`, `add-label`, `add-reviewers`, `approve`, `merge`, `set-required-approvals`, `require-reviewers`, `request-changes`, and finally `update-check` (to override a check's outcome).

[^labelling-prs]: [https://docs.gitstream.cm/examples/#label-prs-by-their-complexity](https://docs.gitstream.cm/examples/#label-prs-by-their-complexity)
[^assign-reviewers]: [https://docs.gitstream.cm/examples/#assign-reviewers-by-type-of-change](https://docs.gitstream.cm/examples/#assign-reviewers-by-type-of-change)
[^number-of-reviewers]: [https://docs.gitstream.cm/examples/#more-approvals-for-complex-changes](https://docs.gitstream.cm/examples/#more-approvals-for-complex-changes)
[^approve-documentation]: [https://docs.gitstream.cm/examples/#approve-safe-changes](https://docs.gitstream.cm/examples/#approve-safe-changes)
[^approve-tests]: [https://docs.gitstream.cm/examples/#approve-safe-changes](https://docs.gitstream.cm/examples/#approve-safe-changes)
[^migrations]: [https://docs.gitstream.cm/examples/#request-changes-on-deprecated-apis](https://docs.gitstream.cm/examples/#request-changes-on-deprecated-apis)

## What's the setup process?

The [official documentation](https://docs.gitstream.cm/github-installation/) contains straightforward instructions, with the core steps being:

1. Add [gitStream](https://github.com/marketplace/gitstream-by-linearb) to your account / organisation, and give it access to the target repository.
2. Add the basic framework file to your project's GitHub workflow (`.github/workflows/gitstream.yml`) to let gitStream run & access what it requires.
3. Add a configuration file with the specific automations required (`.cm/gitstream.cm`).
4. Create a temporary PR, so that gitStream is triggered. You should see it running as a GitHub Action.
5. (Optional) Set gitStream as a required check on your main branch.

## What are the limitations?

### Lack of extendability 

Whilst the small collection of low level functions are useful for creating more complex logic, they are just a start. Currently I don't believe there is any way to create more advanced functions and reuse them, or expand much on the built-in filters. This functionality is "coming soon"[^custom-filters], and would help gitStream achieve wider adoption.

[^custom-filters]: [https://docs.gitstream.cm/faq/#custom-filter-functions](https://docs.gitstream.cm/faq/#custom-filter-functions)

### Closed source

Considering gitStream's trusted access to all source code in a repository in real-time, it would be beneficial to know what it is actually doing. This is doubly so for an application that requires the ability to add and merge code[^same-permission]. Whilst the FAQ states "the source code is being scanned in the repo and is not shared with any external services", it does not seem possible to actually validate this.

Besides security concerns, there is the everyday annoyance of being unsure how the high level filter functions work. For example, `estimatedReviewTime` contains no information as to how it calculates the result, and as such the accuracy is unknowable[^estimatedreviewtime]:
> Returns the estimated review time in minutes based on statistical model. The model uses the PR size and type of file changed to produce the estimation.

[^estimatedreviewtime]: [https://docs.gitstream.cm/filter-functions/#estimatedreviewtime](https://docs.gitstream.cm/filter-functions/#estimatedreviewtime)

[^same-permission]: [https://docs.gitstream.cm/faq/#why-does-gitstream-require-permission-to-write-code](https://docs.gitstream.cm/faq/#why-does-gitstream-require-permission-to-write-code)

### No community

Whilst gitStream has a lot of helpful functionality, it seems to have very little traction in the developer community yet. As such, there are not many (read: none) "out of the box" configuration files that can be copied. Instead, any advanced functionality desired would require writing from scratch. In fact, [Googling "gitstream"](https://www.google.com/search?q=gitstream) returns several projects, with the correct one only featuring in around half the results. 

Whilst this is likely due to the very recent nature of gitStream (it appears to only be a few weeks old), the lack of any customer forums or [StackOverflow questions](https://stackoverflow.com/search?q=gitstream) suggests the only source for assistance will be from the application developer.

## Conclusion

Overall, gitStream appears to have immense potential as a platform for building on. Similar to GitHub Pages and GitHub Actions, it provides a seemingly obvious yet currently lacking function. The "continuous merge" phrase is catchy, and has a chance of catching on. I have no doubt that if the phrase and the application are marketed and advocated well, they could become commonplace.

Whilst I would recommend gitStream on open source projects, currently I'm undecided on whether I would advocate it on my company's commercial, closed-source projects. There are a few changes that would convince me to use it, although I'm of course aware they may not be possible:

1. **Open sourcing where possible**: Currently it is hard to trust the application, especially whilst it still has a small userbase. 
2. **Providing many more examples**: Whilst the current examples page is a good start, and lets developers add the basics, a collection of 10-20 more advanced implementations would be very beneficial. 
3. **Smoother onboarding process**: The current setup process requires 5 steps. Ideally it would be possible to grant the application access to a repository, then it could raise a PR configuring itself. There could be a "do manually, with minimum permissions" options, and a "do automatically, with config editing permissions" install option.
4. **More built-in functions**: Whilst the initial function offerings are a good start, the lack of ability to customise `allTests`'s logic or add new functions makes working with them hard. 

## References


