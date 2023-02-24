---
id: 3027
title: Don't revert merges! A story of a mystery pull request merge
date: '2021-08-07T16:36:32+01:00'
author: 'Jake Lee'
layout: post
permalink: /dont-revert-merges/
image: /wp-content/uploads/2021/08/3.png
categories:
    - Development
tags:
    - Branch
    - Git
    - GitHub
    - PR
---

A Friday afternoon, after work hours. You and a colleague are merging the final few pull requests before giving a build to weekend testers.

You agree the “small feature” PR can be merged, but the unrelated “unfinished big feature” PR still needs some work next week. No problem. The “small feature” PR is merged, the build is made. Great.

You quickly double check next week’s changes required for “unfinished big feature” and… it’s been merged into develop!? 5 minutes ago!? What on earth…

## The mystery merge

The prelude above is exactly what happened to me yesterday! My colleague merged the small feature, and according to GitHub they merged the big unfinished feature too.

We had a very confusing conversation to work out what had happened, with the following basic facts:

- A small, finished PR was merged, as intended.
- A large, unfinished PR was also merged, with no explicit action.
- The small, finished PR had a bit of a messy git history, but the code changes were fine.

Here’s a “proof of concept” recreation of the mystery merge, feel free to try and work it out yourself before reading on: <https://github.com/JakeSteam/github-merge-mystery-poc/pull/2>

## Explanation

So, what happened? Looking at [a recreation of the “small, finished feature” PR](https://github.com/JakeSteam/github-merge-mystery-poc/pull/1) may help, here’s the chain of relevant events:

1. Big feature PR is raised, changes are suggested.
2. Dev working on small feature PR accidentally merges in the big feature branch when pulling due to similar ticket numbers, but immediately reverts it.
3. The small feature PR is merged in. Every single commit from big feature PR is included, with a revert commit at the end.
4. GitHub notices every commit in big feature PR is now merged in (technically), so closes the PR. This is attributed to whoever merged the small PR!

The git branch graph shows these events:

[![gitkraken branch diagram](/wp-content/uploads/2021/08/3.png)](/wp-content/uploads/2021/08/3.png)

Now it becomes obvious that all of big feature (`branchB`)’s commits are merged into small feature (`branchA`), but none of the code remains!

Because of this, closing the pull request is a reasonable thing for GitHub to do. Otherwise the eventual merge might actually do nothing, leading to the code never being included in the main branch (because it was reverted in `branchA`).

## Conclusion

When looking at the commits on a fresh repo, this explanation might have seemed immediately obvious. However, if you’re in a larger team, with other pull requests being merged and created between these two, it definitely isn’t as clear! Additionally, this merge &amp; revert may have happened days/weeks ago, with many commits since.

The part I find particularly concerning is how difficult it is to trace this. The issue is hidden if you aren’t specifically looking for a merge and revert.

The automatically closed PR should absolutely say WHY it has been closed. Currently, the person who accidentally did the revert and merge isn’t mentioned at all, instead the merger of the branch is “blamed”, and the unusual events aren’t flagged anywhere. Additionally, the person who unintentionally closed this PR isn’t notified that their merge has had side-effects, so this could result in lost work. It’s very easy to imagine a situation where the author of the automatically closed PR sees their PR has been “merged”, and assumes their work is now, well, merged.

The potential for losing work or not knowing the status of code is definitely in this albeit niche situation.

## Recommendations

Here’s a couple of ways to avoid this happening, or at least catch the issue:

- **Squash commits when merging**. This is a team preference thing, and we actually usually do, but in this case didn’t.
- **Don’t accidentally merge other branches**. Obviously this would avoid the whole problem, but mistakes happen!
- If a git mistake isn’t pushed, **hard reset to before the mistake** instead of reverting.
- **Review pull requests commit by commit**. I definitely don’t do this, but I do skim the commit titles, I’ll keep an eye out for merge &amp; reverts after this!
- **Talk if something strange happens**. We caught this issue immediately because the merge didn’t make sense. Questioning an unexpected merge of your PR is always OK.
- Finally, GitHub could provide a more helpful pull request closing message. Instead of “Jake merged commit `abc123` into `main`“, it could say “Pull request automatically closed as all commits are on `main` (Jake merged commit `abc123`)”.