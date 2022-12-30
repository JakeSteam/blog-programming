---
title: Using a Slack workflow to streamline internal bug triaging & Jira ticket creation
author: Jake Lee
layout: post
image: /assets/images/2022/slack-issue-3.png
tags:
    - Slack
    - Jira
    - Automation
---

Like many engineering teams, the Photobox app team lets colleagues from other departments report bugs internally via Slack. To ensure sufficient detail, we use a Slack workflow to standardise bug reporting and simplify Jira ticket raising. Here's how to implement something similar.

Here's what we're working towards:

## End result

### Submitter's perspective

The workflow aims to reduce the friction colleagues may face when raising bugs. As all the actions are public, the submitter can easily keep track of any bugs they want to follow the progress of, whilst also being confident that their report has been acted on.

| Creating | Submitting | Confirmation |
| --- | --- | --- |
| [![](/assets/images/2022/slack-end-1-thumbnail.png)](/assets/images/2022/slack-end-1.png) | [![](/assets/images/2022/slack-end-2-thumbnail.png)](/assets/images/2022/slack-end-2.png) | [![](/assets/images/2022/slack-end-3a-thumbnail.png)](/assets/images/2022/slack-end-3a.png) |

### Engineer's perspective

This semi-automated approach makes the process easier for the engineers / whoever is triaging the reports, by ensuring all the relevant information is provided upfront, and letting it be actioned without leaving Slack. Additionally, any follow-up questions can be asked directly to the bug submitter, avoiding any low quality / out of scope / duplicate bugs unexpectedly appearing in the backlog.

| Creating issue | Filling in data | Confirmation |
| --- | --- | --- |
| [![](/assets/images/2022/slack-end-3-thumbnail.png)](/assets/images/2022/slack-end-3.png) | [![](/assets/images/2022/slack-end-4-thumbnail.png)](/assets/images/2022/slack-end-4.png) | [![](/assets/images/2022/slack-end-5-thumbnail.png)](/assets/images/2022/slack-end-5.png) |

## Approach

Most steps in implementing this solution are quite customisable, so feel free to skip / modify any to your needs:

1. Connect our Jira instance to our Slack.
2. Create a bug report form.
3. Send the data to Jira.

There are a couple of important caveats with this method, that are worth considering before implementing:

1. The "workflow" feature used for the form requires a paid Slack plan.
2. The form results are not converted directly into Jira, and require copying from the description during creation.

## 1. Connecting Jira to Slack

Once connected, you will be able to make Jira tickets from any Slack message, as well as receive updates for new tickets, updated tickets, etc. Both Slack and Jira officially support connections to each other, so this process is straightforward.

| Instructions | Image |
| --- | --- |
| Within your Jira project's settings, navigate to the built-in "Slack integration" tab and click "Connect to Slack". | [![](/assets/images/2022/slack-setup-1-thumbnail.png)](/assets/images/2022/slack-setup-1.png) |
| Provide Jira access to your workspace (this may require approval from your Slack administrator) | [![](/assets/images/2022/slack-setup-2-thumbnail.png)](/assets/images/2022/slack-setup-2.png) |
| Select the channel to integrate with. This is only used for optional new ticket notifications, so doesn't matter much. | [![](/assets/images/2022/slack-setup-3-thumbnail.png)](/assets/images/2022/slack-setup-3.png) |
| The Jira bot should have posted in the connected channel. You now have the ability to create tickets from any message! | [![](/assets/images/2022/slack-setup-4-thumbnail.png)](/assets/images/2022/slack-setup-4.png) |


## 2. Creating a bug report form

Next, we want a form that colleagues can fill in to give us any information we need. This can include simple things like a description of the bug, or a multiple choice dropdown asking the bug's severity.

| Instructions | Image |
| --- | --- |
| Open up the settings for the channel you want bugs to be reported in, then "Add a workflow" under "Integrations". | [![](/assets/images/2022/slack-create-1-thumbnail.png)](/assets/images/2022/slack-create-1.png) |
| Give your workflow a simple name. | [![](/assets/images/2022/slack-create-2-thumbnail.png)](/assets/images/2022/slack-create-2.png) |
| Create your form. The actual fields you need will vary massively, but using your Jira ticket's fields is the easiest place to start. | [![](/assets/images/2022/slack-create-3-thumbnail.png)](/assets/images/2022/slack-create-3.png) |
| For now, just send the form output to the channel. We'll need to change this later. | [![](/assets/images/2022/slack-create-4-thumbnail.png)](/assets/images/2022/slack-create-4.png) |
| Here's a summary of the simple bug reporting workflow we've just created. | [![](/assets/images/2022/slack-create-5-thumbnail.png)](/assets/images/2022/slack-create-5.png) |
| And here's how it can be used, by clicking the "+" under the message box and selecting the workflow. | [![](/assets/images/2022/slack-create-6-thumbnail.png)](/assets/images/2022/slack-create-6.png) |

Now, whenever somebody fills in the form, a message is sent to the channel. Nice!

![](/assets/images/2022/slack-create-7.png)

## 3. Fixing & improving

If you try using Jira's create ticket functionality from the form results, you may notice something... not great. The output is all combined into one line, making it essentially unreadable even for short forms:

[![](/assets/images/2022/slack-issue-1-thumbnail.png)](/assets/images/2022/slack-issue-1.png)

To fix this, we need to change our workflow. Instead of sending the form results directly into the channel, we are going to send a separate message, using the received values:

| Instructions | Image |
| --- | --- |
| Open up your workflow's settings, and click "Add step" at the bottom. We want to "Send message". | [![](/assets/images/2022/slack-create-5-thumbnail.png)](/assets/images/2022/slack-create-5.png) |
| We now have to essentially recreate the previous message. All the variables are easy to access, including metadata such as who submitted the form. | [![](/assets/images/2022/slack-issue-2-thumbnail.png)](/assets/images/2022/slack-issue-2.png) |
| Our workflow now has an additional step. Don't forget to disable the message sending in the "Open a form" step, or the results will be sent twice! | [![](/assets/images/2022/slack-issue-3-thumbnail.png)](/assets/images/2022/slack-issue-3.png) |

## Potential improvements

1. In the Slack channel's settings, you can change posting permissions so that only the workflow has permission to post.
2. Ideally the Slack fields would directly fill in the Jira form. I couldn't get this to work, unfortunately.
3. The workflow's icon can be customised via it's settings.