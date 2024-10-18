---
title: How to bulk download all past versions of a webpage, and extract metadata into a CSV
author: Jake Lee
layout: post
image: /assets/images/2024/
tags:
  - Python
  - Archive.org
  - StumbleUpon
  - BeautifulSoup
---

intro

## What's the goal?

For an upcoming project, I needed to extract as much historical data (2009-2012) from StumbleUpon as possible, then process the data. The obvious approach to this is using Archive.org's Wayback Machine to download all versions of "top posts" pages, plus some Python processing to extract data from the sedownloaded pages.

To summarise, my input is a URL, my desired output is a CSV / spreadsheet with information extracted from each result within each historical version of this URL's contents.

## What's the plan?

Assuming I already have a URL I wish to extract from, my plan is:

- **[Step 1](#step-1-downloading-all-versions)**: Download every version of the URL available.
- **[Step 2](#step-2-parsing-all-pages)**: Parse the downloaded pages into a CSV.
- **[Step 3](#step-3-sanitising-the-data)**: Tidy up the resulting data.

## Step 0: Prepare environment

We're going to be using Python to download the pages _and_ parse the downloaded data, so we need a decent environment for it!

You can of course skip the Python installing step if you already have it configured, you will however need to install the libraries this guide uses.

### Installing Python

1. Download the latest version [from Python.org](https://www.python.org/downloads/).
2. Install with mostly default options, plus:
   1. The "Optional feature" `pip` (to install packages).
   2. The "Advanced option" `Add Python to environment variables` (to allow command line usage).

I initially installed Python without either of these features, and had to rerun the installer and select "Modify". Oops.

|                                                     Optional features                                                     |                                                     Advanced options                                                      |
| :-----------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/stumbleupon-python-features-thumbnail.png)](/assets/images/2024/stumbleupon-python-features.png) | [![](/assets/images/2024/stumbleupon-python-advanced-thumbnail.png)](/assets/images/2024/stumbleupon-python-advanced.png) |

### Installing libraries

We're going to be using 3 libraries for this project:

1. [`waybackpack`](https://github.com/jsvine/waybackpack): To automate the Wayback Machine downloading process.
2. [`beautifulsoup4`](https://pypi.org/project/beautifulsoup4/): To parse & extract data from the downloaded HTML.
3. [`lxml`](https://pypi.org/project/lxml/): Adds a (generally) faster parser that `beautifulsoup4` can use ([more info](https://stackoverflow.com/a/50416216/608312)).

Luckily, we can install all of these at once in a single command in Command Prompt:

```
pip install waybackpack beautifulsoup4 lxml
```

We're ready to go!

## Step 1: Downloading all versions

As mentioned, we'll be using [`waybackpack`](https://github.com/jsvine/waybackpack) to download every version of our target URL(s).

### Using waybackpack

Whilst the most basic usage is just `waybackpack {url} -d {destination}`, There's quite a few config options available for this utility that drastically improve behaviour. Here's what I ended up with:

```
waybackpack ^
http://www.stumbleupon.com/discover/toprated/ ^
-d "/Projects/StumbleUpon-extract/data-raw" ^
--from-date 20091001 ^
--to-date 20120318 ^
--raw ^
--no-clobber ^
--delay-retry 2 ^
--max-retries 10 ^
--user-agent "waybackpack {myemail}"
```

So, what does it all do?

- The `^` at the end of each line lets me copy & paste into the command prompt as a multi-line command for ease of reading.
- `from-date` and `to-date` need customising based on your URL. For [my target URL](https://web.archive.org/web/20090501000000*/http://www.stumbleupon.com/discover/toprated/), I noticed the valid archives are only between October 2009 and March 2012, after which all the requests fail. Adding these fields avoids pointlessly fetching a few years worth of error / redirect pages!
- `raw` fetches the _actual_ source content, without the Wayback Machine URL rewriting, added JavaScript, or any other changes. This is useful since we want the original data, not to actually browse the pages.
- `no-clobber` skips trying to fetch any files that are already downloaded. This ensures running the same command again will only try to fetch the _failed_ pages, not all the successful ones.
- `delay-retry` and `max-retries` handle the retry delay (in seconds) and how many tries to make before giving up. Archive.org was fairly unreliable at time of writing, so connection errors were quite common. Running the entire command again a few minutes later typically resolved the problem.
- `user-agent` contains the tool we're using, and my email, as a courtesy to Wayback Machine in case the tool is doing something wrong with their API, or they need to contact me.

|                                                       Example output                                                        |                                                 Poor connection output                                                  |                                                     Downloaded files                                                      |
| :-------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/stumbleupon-download-success-thumbnail.png)](/assets/images/2024/stumbleupon-download-success.png) | [![](/assets/images/2024/stumbleupon-download-error-thumbnail.png)](/assets/images/2024/stumbleupon-download-error.png) | [![](/assets/images/2024/stumbleupon-download-result-thumbnail.png)](/assets/images/2024/stumbleupon-download-result.png) |

## Step 2: Parsing all pages

## Step 3: Sanitising the data
