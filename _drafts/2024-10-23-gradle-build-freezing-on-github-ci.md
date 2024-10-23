---
title: Diagnosing an intermittently freezing & timing out GitHub Android CI build
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  - Android
  - GitHub
  - CI
---

I recently experienced an Android project's GitHub build workflow sometimes taking 10 minutes... and sometimes seemingly freezing and eventually being killed after half hour by GitHub! The cause? Requesting too much RAM.

We have a relatively simply GitHub workflow triggered by various events (PR raised, release triggered, etc), that just compiled, ran unit tests, and deployed a test build.

Typically our build tasks take around 10 minutes, but seemingly at random builds would stop outputting anything for half hour, and eventually be killed by GitHub.

## The symptoms

Inside the build job, the typically spammy lines of output will suddenly stop, and seemingly at all will progress. This will persist for 25-30 minutes, when GitHub will likely cancel the build for high CPU & RAM usage.

On the workflow page, the following errors are seen:

```
Annotations
2 errors and 1 warning

**build**: The runner has received a shutdown signal. This can happen when the runner service is stopped, or a manually started runner is canceled.
**build**: The hosted runner encountered an error while running your job. (Error Type: Disconnect).
**build** Received request to deprovision: The request was cancelled by the remote provider.
```

[![](/assets/images/2024/github-ram-workflow.png)](/assets/images/2024/github-ram-workflow.png)

## The cause

This happens when your Gradle build is requesting more RAM than GitHub's runner has available.

For example, in our case our `gradle.properties` file previously contained `org.gradle.jvmargs= -Xmx4G` (4GB RAM), and it had been updated to `-Xmx8G` (8GB RAM). This worked fine locally, and initially worked fine during CI builds too, but was the cause of future problems!

Looking at [GitHub's documentation for their runners](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for--private-repositories), it turns out an **ubuntu** runner on a **private** repository only has **7GB** of RAM & 14GB of storage.

Whilst I've used 8GB of RAM before, I only retroactively realised this was either for **public** repositories (with a 16GB limit), or **macOS** runners (with a 14GB limit)!

## Notes

I was pretty surprised by the build process just freezing, I'd have assumed requesting more RAM than the runner has available would cause a pretty catastrophic failure. Diagnosing this issue took far longer than it should have, since some PRs old and new would work perfectly if they just happened to use less than 7GB RAM despite having 8GB available.

Of course, the other solution is to pay for [premium runners](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#larger-runners)... but the GitHub-hosted runners are plenty for most use cases. I'll try bumping up to 7GB RAM from 4GB next time I do CI maintenance, for now I've spent too much time staring at workflows today!
