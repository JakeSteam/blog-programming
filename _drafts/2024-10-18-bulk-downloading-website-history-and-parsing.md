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

For an upcoming project, I needed to extract as much historical data (2009-2012) from StumbleUpon as possible, then process the data. The obvious approach to this is using Archive.org's Wayback Machine to download all versions of "top posts" pages, plus some Python processing to extract data from the downloaded pages.

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

### Preparing download script

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

### Running download script

Copying and pasting the whole command into Command Prompt will start the download process, taking under 1 second for successful fetches, and up to 20 seconds for unsuccessful fetches.

Notes:

1. The files will end up in the specified destination in the format `/timestamp/url`, creating any necessary folders. For example, `http://www.stumbleupon.com/discover/toprated/` will become `/20120101165409/www.stumbleupon.com/discover/toprated/index.html`.
2. Passing a URL ending in `/` will result in `index.html`, otherwise the filename will be the path (e.g. `toprated` with no extension).
3. It's likely a few fetches will fail (with max retries) on first attempt, so I'd recommend running the command a couple more times until the only failures are `HTTP status code: 301`. Each retry should try fewer and fewer URLs due to the `no-clobber` option!

|                                                       Example output                                                        |                                                 Poor connection output                                                  |                                                     Downloaded files                                                      |
| :-------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| [![](/assets/images/2024/stumbleupon-download-success-thumbnail.png)](/assets/images/2024/stumbleupon-download-success.png) | [![](/assets/images/2024/stumbleupon-download-error-thumbnail.png)](/assets/images/2024/stumbleupon-download-error.png) | [![](/assets/images/2024/stumbleupon-download-result-thumbnail.png)](/assets/images/2024/stumbleupon-download-result.png) |

## Step 2: Parsing data into CSV

This step is going to be relatively specific to my use case; extracting links from archived StumbleUpon pages. However, the overall approach is applicable to any data extracting needs, with just the specific fields needing changes.

### Requirements

For my scenario, the requirements were:

1. Parse each downloaded HTML file, and extract the 10 links included.
2. For each link, extract as much metadata as possible (e.g. views, title, URL).
3. Output the extracted metadata into a CSV for further analysis.
4. Automate the process as much as possible!

Before diving into the solution, it might be helpful to look at sample inputs and outputs to clarify the objectives:

- [Sample file](https://github.com/JakeSteam/StumbleUpon-extract/blob/main/samples/sample-url.html), containing 10x links ([sample](https://github.com/JakeSteam/StumbleUpon-extract/blob/main/samples/sample-url.html)) plus lots of irrelevant data.
- [Sample output](https://github.com/JakeSteam/StumbleUpon-extract/blob/main/samples/sample-output.csv) in CSV format (note GitHub will autoformat into a table for readability).

### Script overview

The [Python script is on GitHub](https://github.com/JakeSteam/StumbleUpon-extract/blob/main/extract_stumbleupon_metadata.py), although it's a little messy as it's specific to this project!

Before diving too deep into a line-by-line analysis, here's how the script works:

- Step 2a: Define a few parameters around input and output, and checking the local environment.
- Step 2b: Define a `extract_metadata` function that opens the HTML file passed to it, parses all the links, and returns a list of metadata objects (each of which is a CSV line).
- Step 2c: Find every downloaded HTML file, pass them to `extract_metadata`, and save all the metadata into the `output_csv`.

### Step 2a: Overall setup

Tiny bit of simple setup, before the useful functionality starts:

- The `root_dir` and `output_csv` variables let the script know where the HTML input files and CSV output file should be.
- `max_files` is used to aid testing, to try parsing 1-2 files initially.
- `stumbleupon_prefix` is used for extracting the "real" URLs.
- Finally, `os.makedirs` ensures the output CSV folder exists and is accessible.

```
import os
import csv
from bs4 import BeautifulSoup

root_dir = r'data-raw'
max_files = 999999
stumbleupon_prefix = 'http://www.stumbleupon.com/url/'
output_csv = 'data-parsed/toprated.csv'

os.makedirs(os.path.dirname(output_csv), exist_ok=True)
```

### Step 2b: Metadata extracting

Whilst there's quite a big chunk of code inside `extract_metadata`, none of it is actually very complicated or clever!

All we're doing is finding every `listLi` element, pulling out data within it, and adding it all to our `metadata` dictionary. These are then all collated and returned to the caller.

```
def extract_metadata(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
        content = file.read()
        soup = BeautifulSoup(content, 'lxml')
        list_items = soup.find_all(class_='listLi')
        metadata_list = []
        for item in list_items:
            user = item.find(class_='avatar')
            reviews = item.find(class_='showReview') or item.find(class_='showStumble')
            views = item.find(class_='views')

            # Assumes relative path `data-raw\20091011113141\www.stumbleupon.com\discover\toprated\index.html`
            path_parts = file_path.split(os.sep)

            metadata = {
                'id': item.find('var')['class'][0],
                'url': f'https://{reviews.find("a")["href"][len(stumbleupon_prefix):]}',
                'title': item.find("span", class_='img').find("img")["alt"],
                'review_count': int(''.join(filter(str.isdigit, reviews.find('a').get_text(strip=True).split()[0]))),
                'view_count': int(''.join(filter(str.isdigit, views.find('a')['title'].split()[0]))),
                'date': int(path_parts[-5]),
                'user_id': int(user['id']) if user else -1,
                'user_name': user['title'] if user else 'Unavailable',
                'source': path_parts[-2]
            }
            metadata_list.append(metadata)
        print(f"Processed {len(list_items)} items from {file_path}")
        return metadata_list
```

The parsing can seem complicated, but they all just require careful reading. Looking at [an example `listLi` element](https://github.com/JakeSteam/StumbleUpon-extract/blob/main/samples/sample-url.html), the task of extracting `46` from this source HTML can be worked through step by step:

```
    <p class="showReview">
      <a
        href="http://www.stumbleupon.com/url/sciencehax.com/2010/01/beautiful-home-built-from-recycled-materials/"
        >46 reviews</a
      >
```

We first need to actually find this element, it is usually the element with class `showReview` but can be `showStumble` in some scenarios. This can be expressed as:

```
item.find(class_='showReview') or item.find(class_='showStumble')
```

Now we have a `reviews` item, working from the inside out:

- First we find the `a` element (`reviews.find('a')`) and get the link text ([`get_text`](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#get-text)), giving us `46 reviews`.
- Next, we split this into `46` and `reviews` and take the first string (with `.split()[0]`).
- Now, we make sure this is a number (e.g. 12,345) by removing any non-numerical characters (`filter(str.isdigit, "46")`). This gives us the array `["4", "6"]`, so we use `''.join` to put it back into a single string.
- Finally, `int()` wraps everything, as we want a numerical output (to avoid any quotation marks in the CSV).

Hopefully that example highlights how the parsing is pretty straightforward, even if fetched from the file's path itself (`path_parts`).

### Step 2c: File input & output

As a reminder, our goal is to find every available `.html` or extensionless file, parse them with `extract_metadata`, then save the extracted data into a CSV.

```
with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = ['id', 'url', 'title', 'review_count', 'view_count', 'date', 'user_id', 'user_name', 'source']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_NONNUMERIC)

    writer.writeheader()

    # Traverse directories and process HTML files
    file_count = 0
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file_count >= max_files:
                break
            file_path = os.path.join(subdir, file)
            # Check if the file has no extension or has an .html extension
            if not os.path.splitext(file)[1] or file.endswith('.html'):
                metadata_list = extract_metadata(file_path)
                for data in metadata_list:
                    writer.writerow(data)
                file_count += 1
        if file_count >= max_files:
            break
```

Again, nothing complicated here. We've got a bit of extra logic to output the CSV headers, and allow limiting the number of files to parse, but it's just a big old nested `for` loop!

## Step 3: Sanitising the data

# TEMP

### All top rated

```
waybackpack ^
http://www.stumbleupon.com/discover/humor/ ^
-d "/Users/jake_/Documents/Projects/StumbleUpon-extract/data-raw" ^
--from-date 20091001 ^
--to-date 20120318 ^
--raw ^
--no-clobber ^
--delay-retry 2 ^
--max-retries 10 ^
--user-agent "waybackpack jake@jakelee.co.uk"
```

### By interest

http://www.stumbleupon.com/discover/toprated/ x
http://www.stumbleupon.com/discover/animation/ x
http://www.stumbleupon.com/discover/arts/ x
http://www.stumbleupon.com/discover/bizarre/ x
http://www.stumbleupon.com/discover/books/ x
http://www.stumbleupon.com/discover/business/ x
http://www.stumbleupon.com/discover/cats/ x
http://www.stumbleupon.com/discover/computer-graphics/ x
http://www.stumbleupon.com/discover/computers/ x
http://www.stumbleupon.com/discover/drawing/ x
http://www.stumbleupon.com/discover/food/ x
http://www.stumbleupon.com/discover/fun/ x
http://www.stumbleupon.com/discover/graphic-design/ x
http://www.stumbleupon.com/discover/health/ x
http://www.stumbleupon.com/discover/humor/ x
http://www.stumbleupon.com/discover/internet-tools/
http://www.stumbleupon.com/discover/internet/
http://www.stumbleupon.com/discover/lifestyle/
http://www.stumbleupon.com/discover/movies/
http://www.stumbleupon.com/discover/music/
http://www.stumbleupon.com/discover/news/
http://www.stumbleupon.com/discover/online-games/
http://www.stumbleupon.com/discover/photography/
http://www.stumbleupon.com/discover/politics/
http://www.stumbleupon.com/discover/psychology/
http://www.stumbleupon.com/discover/satire/
http://www.stumbleupon.com/discover/science/
http://www.stumbleupon.com/discover/self-improvement/
http://www.stumbleupon.com/discover/sports/
http://www.stumbleupon.com/discover/technology/
http://www.stumbleupon.com/discover/travel/
http://www.stumbleupon.com/discover/videos/
