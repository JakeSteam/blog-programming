---
title: A possible fix for intermittently hanging Android builds on GitHub
image: /assets/images/2024/github-ram-banner.png
tags:
  - Android
  - GitHub
  - CI
---

I recently experienced an Android project's GitHub build workflow sometimes taking 10 minutes... but sometimes freezing and eventually being killed after half hour by GitHub! The cause? Requesting too much RAM.

## Scenario

We have a relatively simply GitHub workflow triggered by various events (PR raised, release triggered, etc), that just compiles a build, runs unit tests, and deploys a test build.

Typically our build tasks take around 10 minutes, but seemingly at random builds would stop outputting anything for half hour, and eventually be killed by GitHub. This didn't seem related to any code changes on the failed builds, and there were no actual errors, so diagnosing it was harder than expected.

## Symptoms

Inside the GitHub build job, the typically spammy lines of output will suddenly stop, and the build will stop all progress. This will persist for 25-30 minutes, when GitHub will likely cancel the build for high CPU & RAM usage.

On the workflow page, the following errors are seen:

```txt
Annotations
2 errors and 1 warning

build: The runner has received a shutdown signal. This can happen when the runner service is stopped, or a manually started runner is canceled.
build: The hosted runner encountered an error while running your job. (Error Type: Disconnect).
build: Received request to deprovision: The request was cancelled by the remote provider.
```

[![](/assets/images/2024/github-ram-workflow.png)](/assets/images/2024/github-ram-workflow.png)

## Cause & resolution

This happens when your Gradle build is allowed more RAM than GitHub's runner has available, and a build happens to go over the limit.

For example, in our case the `gradle.properties` file previously specified 4GB of RAM:

```
org.gradle.jvmargs=-Xmx4G
```

However, it had been updated to `-Xmx8G`. This worked fine locally, and initially worked fine during CI builds too, but was the cause of problems a few days later!

Looking at [GitHub's documentation for their runners](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for--private-repositories), it turns out an **ubuntu** runner on a **private** repository only has **7GB** of RAM & 14GB of storage.

Whilst I've used 8GB of RAM before, I only retroactively realised this was either for **public** repositories (with a 16GB limit), or **macOS** runners (with a 14GB limit)!

## Notes

I was pretty surprised by the build process just freezing, I'd have assumed requesting more RAM than the runner has available would cause a pretty catastrophic failure. Diagnosing this issue took far longer than it should have, since some PRs old and new would work perfectly if they just happened to use less than 7GB RAM despite having 8GB available.

Of course, the other solution is to pay for [premium runners](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#larger-runners)... but the GitHub-hosted runners are plenty for most use cases. I'll try bumping up to 7GB RAM from 4GB next time I do CI maintenance, for now I've spent too much time staring at workflows today!

Additionally, the error messages currently give zero results(!) when Googled, so they're included here in plaintext to help others:

- build: The runner has received a shutdown signal. This can happen when the runner service is stopped, or a manually started runner is canceled.
- build: The hosted runner encountered an error while running your job. (Error Type: Disconnect).
- build: Received request to deprovision: The request was cancelled by the remote provider.
