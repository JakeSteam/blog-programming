---
id: 2946
title: 'Creating the PR template that Future You wishes Past You used'
date: '2020-12-01T16:14:28+00:00'
permalink: /creating-a-pr-template/
image: /wp-content/uploads/2020/12/GpDWTLD.png
categories:
    - Development
tags:
    - GitHub
    - markdown
    - pr
    - 'pull request'
    - review
---

How many times have you found a confusing line of code, figured out which ticket it solved, opened the relevant PR and… nothing. There’s a few approvals and it’s merged, with no explanation / discussion of what on earth is going on!

When this happens, the only way to try and understand the code is to hope the author still works at the company (and remembers ancient, confusing code!). All it takes is a poor memory / high turnover, and there can easily be no helpful information anywhere.

This post will introduce a PR template I’ve used / refined through multiple teams, and have found extremely helpful. An example PR created using it is [available in a sample repo](https://github.com/JakeSteam/pr-process-demo/pull/1).

PS: I’m very sorry for the ridiculous title, I couldn’t resist.

## Why use a pull request template?

1. As mentioned in the intro, it ensures all PRs have enough information to be useful for future developers.
2. A consistent format helps newer developers know what a PR entails, without having to ask.
3. It can remind a developer of a forgotten task, for example when they try to answer “What tests have been added?” and realise none have!
4. Finally, having a structure with distinct sections avoids any “walls of text” or unstructured PRs.

## How do I setup a pull request template?

The actual location varies by code host, but the approach is always a markdown template within a specific folder:

- [GitHub](https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository) (also has limited template support)
- [Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/repos/git/pull-request-templates?view=azure-devops) (also supports per-branch templates!)
- [GitLab](https://docs.gitlab.com/ee/user/project/description_templates.html#creating-merge-request-templates)
- [BitBucket](https://bitbucket.org/blog/save-time-with-default-pull-request-descriptions)

## The PR template

The PR template is provided in [an example repository](https://github.com/JakeSteam/pr-process-demo), [here is the raw markdown](https://raw.githubusercontent.com/JakeSteam/pr-process-demo/main/.github/pull_request_template.md), and [here is an example PR raised with it](https://github.com/JakeSteam/pr-process-demo/pull/1).

[![Example PR screenshot](/wp-content/uploads/2020/12/kVXcYMQ.png)](/wp-content/uploads/2020/12/kVXcYMQ.png)

Here’s why each section is essential:

### “Tracked by…”

Having a link to the actual ticket makes it easy for developers to understand the purpose of the ticket, as well as ensuring information can easily be found.

Make sure to change the URL to match your JIRA / other ticket system format.

### “This PR…”

Having a simple, one sentence summary of the ticket ensures the PR has a clear overall focus. For example, *“This PR..*.

- *adds an email validator to the login screen”*
- *fixes a bug caused by an invalid string reference”*
- *disables the no longer supported Fabric integration”*

### “Considerations and implementations”

This is the main body of the PR, and varies massively by PR. A simple PR may have a single sentence here, others may have multiple paragraphs, diagrams, etc.

### “How to test”

Having an ordered, straightforward list of steps to test the changes massively helps overall understanding. This list can also be used as hints for QA, and is a good place to upload any custom configuration files etc needed.

### “Test(s) added”

Having this section helps reminds developers to always add tests, or explain themselves if they can’t!

### “Screenshots”

Having this section makes visual changes immediately obvious, and means visual bugs can often be identified instantly. Also, the screenshots are useful for non-devs preparing content for sprint review, or signing off work.

It’s worth mentioning that in less visual projects, this section could be called “Changes” and contain logs / process flows / etc. This section sometimes contains screenshots of Charles network requests or LogCat messages as well as normal screenshots.

## Conclusion

Adding a PR template is a very easy change, yet drastically improves documentation quality. It’s the dream, writing self-organising documentation as you go! A template also ensures the repository contains its own documentation, instead of relying on employees knowing past tickets.

Since the template provided will probably be customised over time according to how your team functions, [a repo of example templates](https://github.com/stevemao/github-issue-templates) may be useful.

Whilst having testing steps on the PR is useful for code review, ideally it should be accessible to QAs &amp; POs too. A basic way to do this is just put a link to the PR on the ticket when moving it to “Ready to test”, but I’m sure there are automated solutions!

Finally, remember that if you’re using GitHub for PRs you also have [access to the extremely useful rich diffs](/exploring-pull-requests-with-githubs-rich-diff-functionality/) in PRs!