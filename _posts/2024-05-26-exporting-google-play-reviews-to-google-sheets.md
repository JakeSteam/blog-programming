---
title: How to bulk export your Android app's reviews into a Google Sheet for analysis
image: /assets/images/banners/reviews-banner.png
tags:
  - Google Sheets
  - Google Play
---

Whilst Google Play Console's "Reviews Analysis" feature is good, sometimes you really need the raw reviews to perform your own more detailed analysis on app feedback. This can be harder than it seems, here's how!

## Accessing reviews

If you're on the account that owns your app, there's a handy "Go to Download reports" button under your app's "Reviews" tab on Google Play Console:

[![Download reports](/assets/images/2024/reviews-downloadreports.png)](/assets/images/2024/reviews-downloadreports.png)

However, if you're not, or need to provide access to someone else... it likely won't work as you expect. Whilst there are app permissions for "View app information", "Reply to reviews", and even "Admin (all permissions)", these _will not_ grant access to the downloadable review data!

Instead, you need to provide an _account_ (not _app_) permission for "View app information and download bulk reports (read only)":

[![Review download permissions](/assets/images/2024/reviews-providepermissions-thumbnail.png)](/assets/images/2024/reviews-providepermissions.png)

Okay, access is finally granted!

## Downloading reviews

Whilst you can [access the CSVs via Google Cloud Storage](https://support.google.com/googleplay/android-developer/answer/6135870), they're easy enough to access directly in Google Play Console. You'll need to be on the main Google Play Console homepage (not your app's homepage), and select "Download reports" in the side navigation.

Unfortunately you'll then need to click the download button on each month individually, but the end result will be a nice collection of CSV reports:

[![Review download page](/assets/images/2024/reviews-downloadpage-thumbnail.png)](/assets/images/2024/reviews-downloadpage.png)

## Importing to a Google Sheet

Importing a CSV into a Google Sheet is straightforward, but having to combine multiple files can lead to mistakes if you're not careful!

To import multiple CSVs without overwriting existing data:

1. Create a new Google Sheet spreadsheet.
2. Click "File" -> "Import".
3. Upload your CSV file.
4. Set "Import location" to "Append to current sheet".

Each of the CSVs has a header row containing all the column names, so make sure to delete all of these! The easiest way is to just search for the text `Package Name`, the first column's title.

## Final notes

You should now have a Google Sheet containing all the information possible about your app's reviews!

All the columns within the data are self-explanatory, with "App Version Code / Name", "Star Rating", and "Review Text" being the most useful. You might want to rearrange them to have key information (like the link) immediately visible:
[![Reviews in Google Sheet](/assets/images/2024/reviews-finalsheet-740w.png)](/assets/images/2024/reviews-finalsheet.png)

Next up: Performing basic text analysis on the reviews... 👀
