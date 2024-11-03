---
id: 2134
title: "How To Free Up Space in Google Drive, Gmail, and Google Photos"
date: "2018-12-08T15:21:26+00:00"
permalink: /how-to-free-up-space-in-google-drive-gmail-and-google-photos/
image: /wp-content/uploads/2018/12/small.png
categories:
  - Tips
tags:
  - Drive
  - Gmail
  - Google
  - Storage
---

I’ve been lightly using Google Drive, Gmail, and Google Photos for close to 6 years, with no major complaints. The default space limitation is 15GB, with an extra 2GB available for each year the [security checkup is completed](https://blog.google/products/drive/safer-internet-day-2016/). There was also previously 100GB (expiring after a year) available for local guides, but this [program is now cancelled](https://www.androidpolice.com/2017/03/03/new-level-4-local-guides-google-maps-will-no-longer-receive-free-100gb-drive-storage/).

Recently I realised I was getting unnervingly close (84%) to my 19GB limit, and went on a quest to minimise this amount as much as possible, eventually getting it down to 6% without losing any useful content!

First, [view your overall usage at Google One](https://one.google.com/storage), this will help you guide your efforts to the biggest space hoggers. My initial overview is shown below, further updates will be shown throughout this tutorial.

[![](/wp-content/uploads/2018/12/storage1.png)](/wp-content/uploads/2018/12/storage1.png)

## Drive

The biggest user of space was Google Drive, so that seemed a sensible place to start. A three pronged attack would be used; deleting large files, deleting unused files, and emptying the bin.

### Emptying Google Drive bin

I have [Google Drive synced to a local folder on my PC](https://www.google.com/drive/download/), so my first step was checking the disk space used.

[![](/wp-content/uploads/2018/12/storagelocal.png)](/wp-content/uploads/2018/12/storagelocal.png)

It turned out to be just 1GB, so where on earth was the extra 8.4GB coming from!?

After a little research, I discovered every deleted file in Google Drive is kept… forever. That 500MB video you used Google Drive to transfer 5 years ago, then deleted the next day? It’s still there! Those few thousand image assets you downloaded for a project then ended up deleting? Still there!

Luckily, it is possible to empty this bin. Just [visit the Trash](https://drive.google.com/drive/u/0/trash), then click “Bin” and “Empty bin”. Due to the 6 years of files hidden away in there for me, this process took around half an hour to complete. During that time, the Trash would show a random selection of files, so it was hard to tell if it was actually making any progress. Viewing the [storage overview page](https://one.google.com/storage) gives a more up to date account of your space usage. Note that due to the time taken to empty the bin, later screenshots in this tutorial will have ever-decreasing Google Drive sizes!

[![](/wp-content/uploads/2018/12/emptybin.png)](/wp-content/uploads/2018/12/emptybin.png)

### Cleaning out Google Drive

[![](/wp-content/uploads/2018/12/quota.png)](/wp-content/uploads/2018/12/quota.png)

First, visit [the quota page](https://drive.google.com/drive/u/0/quota) and sort by “Storage used”. This will show you your largest files, and let you delete them. This is useful for any forgotten large files (e.g. videos, 3D renders) that are no longer useful.

However, this approach misses any small files, and fails to give you a more general overview of your space used. Luckily, [WinDirStat (Windows Directory Statistics)](https://windirstat.net/index.html) exists, an application which provides a very detailed analysis of the space used in a specific folder.

Whilst WinDirStat definitely isn’t a pretty program, or particularly easy to understand the first time round, it’s worth learning. When run on your Google Drive folder, it will tell you:

- Which folders / subfolders are using the most space (top left)
- Which file types are using the most space (top right)
- A visual representation of every file, with larger ones appearing larger.

Clicking on a file’s visual representation will show you the location, filename, and filetype. Using this information, you can delete any large files / collections of files you no longer wish to keep. For example, the screenshot below has a large `.psd` selected.

[![](/wp-content/uploads/2018/12/windirstat.png)](/wp-content/uploads/2018/12/windirstat.png)

Now that large / unneeded files have been removed and the bin has been emptied, the Google Drive space used is just 30% of the original, a very nice start!

[![](/wp-content/uploads/2018/12/storage3.png)](/wp-content/uploads/2018/12/storage3.png)

## Gmail

As I use Gmail for all of my daily emails (across at least 5 accounts), there are tens of thousands of emails that have been archived forever and forgotten about. Whilst Gmail only uses 1.35GB, that seemed pretty excessive considering I’m not intentionally keeping any files / emails!

### Large files

[![](/wp-content/uploads/2018/12/storagemore.png)](/wp-content/uploads/2018/12/storagemore.png)The first task is removing any large attachments that are hidden away in old emails. Luckily, [Gmail has extremely powerful search operators](https://support.google.com/mail/answer/7190) that can be used to filter emails. For this task we want to delete emails with attachments, that are at least 20MB in size. To do this, enter the following into the Gmail search bar:

```
has:attachment size:20MB
```

You can of course change `20MB` to `10MB` or any other amount, depending on how aggressively you want to free up space.

### Junk emails

Next, I noticed that there were thousands and thousands of emails that had already been actioned, or were just notifications in email form. Whilst there were around 4,000 unread emails like this, there were at least 25,000 already read!

Luckily, Gmail automatically categorises most emails into “Social”, “Updated”, “Forums”, or “Promotions”. Clearing these out was just a case of:

1. Going to each folder
2. Clicking the “Select all” square at the top
3. Clicking the “Select all X messages in Y” bar at the top
4. Pressing the trash icon

| Folders                                                                                                     | Select all                                                                                            | Category                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [![](/wp-content/uploads/2018/12/storagecategories.png)](/wp-content/uploads/2018/12/storagecategories.png) | [![](/wp-content/uploads/2018/12/storagefolders.png)](/wp-content/uploads/2018/12/storagefolders.png) | [![](/wp-content/uploads/2018/12/storagefolders2.png)](/wp-content/uploads/2018/12/storagefolders2.png) |

Deleting thousands of emails can take a few seconds, make sure not to close the tab before it is done! The space used by Gmail has now dropped from 1.35GB to 0.41GB, without anything important being lost. Note that Google Drive’s space is still slowly going down, as it works through the thousands of deleted files from the previous step!
[![](/wp-content/uploads/2018/12/storage6.png)](/wp-content/uploads/2018/12/storage6.png)

## Google Photos

The final section to clear out is Google Photos. For this, I used Google Photos’ unlimited “High Quality” storage option. With this option, your full quality photos are replaced with “high” quality ones, which don’t count towards your allocation. High quality is defined as a maximum of 16MP, which is good enough for everyday usage (especially with my poor photography skills!).
[![](/wp-content/uploads/2018/12/compress1.png)](/wp-content/uploads/2018/12/compress1.png)

![](/wp-content/uploads/2018/12/compress2.png)

To apply this setting, visit your [Google Photos settings](https://photos.google.com/settings) and change the “Upload size” setting from “Original” to “High quality”. This process takes around 5 minutes per 500MB, and is a good way of freeing up a large amount of space for very little effort.

[![](/wp-content/uploads/2018/12/storage7.png)](/wp-content/uploads/2018/12/storage7.png)

The space used by Google Photos has now dropped from 5.32GB to 0GB. Pretty good!

## Conclusion

| Before                                                                                        | After                                                                                     |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [![](/wp-content/uploads/2018/12/storage1-1.png)](/wp-content/uploads/2018/12/storage1-1.png) | [![](/wp-content/uploads/2018/12/storage7.png)](/wp-content/uploads/2018/12/storage7.png) |

So, the total space used has dropped from 16.07GB to 1.14GB, and from 84% utilisation to just 6%. Plenty of space now!

Emptying the Google Drive trash was by far the biggest space saving action, freeing up around 8GB of space. Whilst I have relied on Google Drive’s trash in the past, it’s surprising that it can grow to be 8x the size of the actual files, and not have any automatic emptying. Gmail’s trash folder is emptied after 30 days naturally.

If these space freeing techniques don’t free up enough space, there **are** paid plans available. The prices are very reasonable, with plans ranging from 100GB (£1.59/mo) to 30TB (£239.99/mo). Dropbox only offers a [single 2TB paid plan](https://www.dropbox.com/upgrade), whilst [OneDrive offer 3 premium plans](https://onedrive.live.com/about/en-GB/plans/), all more expensive than comparable Google One plans. As well as having very competitive pricing, the main advantages of Google’s plans are their integration into services you’re likely using already (Google Photos, Gmail, Google Drive).
