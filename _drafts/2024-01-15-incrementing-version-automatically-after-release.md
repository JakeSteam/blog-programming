---
title: How to increment version code automatically after a release, using GitHub Actions
author: Jake Lee
layout: post
image: /assets/images/2023/autoincrement-banner.png
tags:
    - GitHub Actions
    - CI
---

Releasing software can be awkward. This is especially true when working in a complex ecosystem like Gradle for Android. Recently, I improved how an app releases by autoincrementing version number after a build has been published: here's how! 

## Overview

To autoincrement a version number inside a GitHub Action, we need the ability to do 3 tasks:
1. **Automatically make changes to the repo**: Using a Personal Access Token.
2. **Find the version number, increment it, and commit it**: Using [`gh-action-increment-value`](https://github.com/yoichiro/gh-action-increment-value).
3. **Trigger the workflow on a GitHub release**: `on: release: types: [published]`.

The ability to do these 3 tasks with [example versioning](https://github.com/JakeSteam/autoincrement-version/blob/main/versions.txt) is available as [a GitHub repository](https://github.com/JakeSteam/autoincrement-version/blob/main/.github/workflows/on-release.yml), read on for a step-by-step guide.

## 1. Making changes

To autoincrement the version number, your workflow needs permission to modify your repository. If you've got some sort of branch protections on (you should!) such as requiring PR approvals or preventing force pushes to your main branch, you'll need to bypass these. This can be done with a Personal Access Token (PAT).

### Creating a PAT

There are 2 options for creating a PAT:
1. "Tokens (classic)" are easier to use but riskier, as they apply to all repositories.
2. "[Fine-grained tokens](https://github.com/settings/personal-access-tokens/new)" are in [beta](https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/). They only last a year, but there is much more control over which repositories and permissions they can access. 

Since we need somewhat risky permissions (pushing commits), I'd recommend using the fine-grained tokens despite the extra effort. These unfortunately have a maximum expiry of 1 year, *but* can be scoped to just the repository that needs version incrementing. Whichever option you pick, make sure it has the ability to read and write the contents of your repository that needs autoincrementing.

Here's how mine looked:

| Repository access | Permissions |
| --- | --- |
| [![](/assets/images/2024/autoincrement-repo-thumbnail.png)](/assets/images/2024/autoincrement-repo.png) | [![](/assets/images/2024/autoincrement-permissions-thumbnail.png)](/assets/images/2024/autoincrement-permissions.png) |

Once your PAT is generated, you'll only have one chance to copy it. I'd recommend doing the next step in a new tab.

### Adding your PAT

Now you have a token that allows a script to act on your behalf, you need to safely store it in the repository that requires autoincrementing.

To do this, add a Repository Secret to your repository (Settings > Secrets and variables > Actions). Add your new repository secret with a descriptive name (I went for `PAT`), and it'll look like this:

[![](/assets/images/2024/autoincrement-pat.png)](/assets/images/2024/autoincrement-pat.png)

## 2. Incrementing the version

Incrementing a version number sounds simple, but can be pretty awkward if starting from scratch! You need to access the file that stores the version, find the number, increment it, and then make sure that gets into the actual build system.

Luckily, [a GitHub Action exists](https://github.com/yoichiro/gh-action-increment-value) that does all this hard work for us!

The only task left is configuring where the file is, and the strings before and after the numerical version. Here's an example config, that transforms `{"buildNumber":3}` into `{"buildNumber":4}`

```
      - name: Increment value
        uses: yoichiro/gh-action-increment-value@main
        with:
          target_directory: 'foobar/baz'
          target_file: 'build_number.json'
          prefix: 'buildNumber":'
          suffix: '}'
          commit_message: 'Increment the build number to '
```

## 3. Triggering the workflow

This is the easiest bit, since GitHub Actions supports this functionality already with `on: release:`. I'd also recommend adding `workflow_dispatch` you the workflow can be triggered manually:

```
on:
  release:
    types: [published]
  workflow_dispatch:
```

## Workflow

Finally, we can put all the pieces together!

As a reminder, we need to trigger the workflow on a release, checkout the code, and increment the version. Here's the entire workflow, an explanation of each section follows:

```
name: On release

on:
  release:
    types: [published]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3
        with:
          token: ${{ secrets.PAT }}
          ref: main

      - name: Increment patch version
        uses: yoichiro/gh-action-increment-value@v5
        with:
          target_directory: ''
          target_file: 'versions.txt'
          prefix: 'versionPatch:'
          suffix: ']'
          commit_message: '[skip ci] Increments the patch version to'
```

## Explanation

I won't walk through each line of code, but I will highlight a few areas that can lead to mistakes.

### Version code format matters

As [I wrote in an issue on the repo](https://github.com/yoichiro/gh-action-increment-value/issues/9), you may need to modify how your version codes are stored. This did not work:

```
ext.app_versions = [
    versionMajor:4,
    versionMinor:1,
    versionPatch:0,
]
```

This did:
```
ext.app_versions = [versionMajor:4, versionMinor:1, versionPatch:0]
```

### Checkout with PAT

The workflow checks out using the PAT (`with: token: ${{ secrets.PAT }}`) so that all parts of it have the ability to make changes. 

### Need ref to attach to correct branch

The workflow specifically checks out `main`, otherwise when triggered by a release it will end up with a detached `HEAD` and be unable to commit any changes.

### Use releases not tag

I initially triggered the action whenever a tag was pushed:

```
on:
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'
```

However, this would have caused problems if an old tag was ever pushed (e.g. for a historical release). As such, it now triggered when a release is published:

```
on:
  release:
    types: [published]
```

### Skip CI when incrementing

I don't want my `main` branch to rebuild after the version increments, so I added `[skip ci]` to the incrementer's commit message. This may vary in your use case.

### Using for Android builds

If you've read this far as an Android developer, you're probably wondering how this would work for Android, since we have both version name and version code. Once solution that worked for me is to define the build version (using [Semantic Versioning](https://semver.org/)) in a `dependencies.gradle` file:

```
ext.app_versions = [versionMajor:4, versionMinor:1, versionPatch:1]
```

The app-level `build.gradle` then reads this using:
```
apply from: rootProject.file('dependencies.gradle')
```

Now the version name can be created from this as:
```
versionName "${app_versions.versionMajor}.${app_versions.versionMinor}.${app_versions.versionPatch}"
```

And finally the version code can be created by multiplying the version components by powers of 10:
```
versionCode app_versions.versionMajor * 1000000 + app_versions.versionMinor * 10000 + app_versions.versionPatch
```

For example, `[versionMajor:4, versionMinor:1, versionPatch:1]` would become 4.1.1, which would become `4 * 1000000 + 1 * 10000 + 1` giving a version code of `4010001`.
