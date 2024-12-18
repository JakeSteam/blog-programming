---
title: Generating a SQLite word dictionary (with definitions) from WordNet using Python
image: /assets/images/banners/sqlite-browser.png
tags:
  - Python
  - SQLite
  - Regex
---

I recently needed a SQLite dictionary with word, type, and definition(s). Turns out, it was easy enough to make my own!

All code in this article is available in a [WordNetToSQLite repo](https://github.com/jakesteam/WordNetToSQLite/), as is [the final `words.db`](https://github.com/JakeSteam/WordNetToSQLite/blob/main/words.db) database ([license](https://github.com/JakeSteam/WordNetToSQLite/blob/main/LICENSE)).

## Objective

For an upcoming word game app, I needed a dictionary of words. I wanted to know the type of word (noun / verb / adjective / adverb), and a definition for each. Plus, it should only include sensible words (e.g. no proper nouns, acronyms, or profanity).

I decided to prefill a **SQLite database** and ship it with my app, since I can easily update it by just shipping a new database, or even remotely with SQL. Android also has good support for retrieving the data from SQLite.

However, finding a suitable list of words was tricky! I found plenty of sources containing just words, or with no information on source or licensing. Eventually, I discovered [Princeton University's WordNet](https://wordnet.princeton.edu/) exists, and is free to use! There's also a [more up to date fork](https://github.com/globalwordnet/english-wordnet) (2024 instead of 2006).

However, it contains a lot of unneeded information and complexity, and is 33MB+ uncompressed. Time to get filtering…

## Running script

If you wish to recreate [`words.db`](https://github.com/JakeSteam/WordNetToSQLite/blob/main/words.db) from scratch, or customise the results, you can:

1. Obtain a WordNet format database.
   - I used [a regularly updated fork](https://github.com/globalwordnet/english-wordnet) (2024 edition, WNDB format)
   - You can also use the original WordNet files from 2006 (`WNdb-3.0.tar.gz` from [WordNet](https://wordnet.princeton.edu/download/current-version))
2. Extract it, and place the `data.x` files in `/wordnet-data/`.
3. Run `py wordnet-to-sqlite.py`.
4. In a minute, you'll have a word database!

Out of the box, the script takes ~60 seconds to run. This slightly slow speed is an intentional trade-off in exchange for having full control over the language filter (see [profanity removal](#profanity-removal)).

## Notes on results

The database contains over 73k word & word type combinations, each with a definition. I use the open source [DB Browser for SQLite](https://sqlitebrowser.org/) to browse the results, looking something like this:

[![](/assets//images/2024/sqlite-browser.png)](/assets//images/2024/sqlite-browser.png)

### Schema definition

Only one definition per word for the same `type` are combined (e.g. with the noun `article`, but not the verb):

- `word`:
  - Any words with uppercase letters (e.g. proper nouns) are removed.
  - Any 1 character words are removed.
  - Any words with numbers are removed.
  - Any words with other characters (apostrophes, spaces) are removed.
  - Most profane words (626) are removed.
  - Roman numerals are removed (e.g. `XVII`).
- `type`:
  - Always `adjective` / `adverb` / `noun` / `verb`.
- `definition`:
  - Definition of the word, uses the first definition found.
  - Most profane definitions (1124) are replaced with empty space.
  - May contain bracketed usage information, e.g. `(dated)`.
  - May contain special characters like `'`, `$`, `!`, `<`, `[`, etc.

## Notes on code

Whilst [`wordnet-to-sqlite.py`](https://github.com/JakeSteam/WordNetToSQLite/blob/main/wordnet-to-sqlite.py) is under 100 lines of not-very-good Python, I'll briefly walk through what it does.

### Raw data

The raw data in WordNet databases looks like this (`unknown` is the only valid noun to extract, with a single definition):

```text
08632096 15 n 03 unknown 0 unknown_region 0 terra_incognita 0 001 @ 08630985 n 0000 | an unknown and unexplored region; "they came like angels out the unknown"
```

Further notes on WordNet's data files [are here](https://wordnet.princeton.edu/documentation/wndb5wn), this Python script just does a "dumb" parse then filters out numerical data and invalid words (spaces, capitalised letters, Roman numerals etc).

### Process

1. For each word type file (`data.noun`, `data.adj`, etc), pass it to `parse_file`.
2. Loop through every line in this file, primarily using `split` / `range` to fetch as many words as are defined, without taking the `0` and other non-word data.
3. Check each of these words is "valid", specifically that it's lowercase letters only (no symbols / spaces), isn't a Roman numeral (by matching the word & description), and isn't a profane word.
4. If the word is valid, add it to the dictionary so long as it isn't already defined for the current word type. For example, a word might be used as a noun _and_ an adjective.
5. Finally, output all these word, type, and definition rows into a SQLite database we prepared earlier.

### Profanity removal

Since this dictionary is for a child-friendly game, profane words should be removed if possible. Players are spelling the words themselves, so I don't need to filter _too_ aggressively, but slurs should never be possible.

The eventual solution is in [`/profanity/`](https://github.com/JakeSteam/WordNetToSQLite/tree/main/profanity), where `wordlist.json` is the words to remove, `whitelisted.txt` is the words I've manually removed from the wordlist, and `log.txt` is every removed word & definition.

#### Choice of package

I tried out quite a few Python packages for filtering out the profane words, with pretty poor results overall. They were generally far too simple, required building a whole AI model, were intended for machine learning tasks, or seemed entirely abandoned / non-functional.

Eventually, I used [`better_profanity` 0.6.1](https://github.com/snguyenthanh/better_profanity) for filtering (0.7.0 [has performance issues](https://github.com/snguyenthanh/better_profanity/issues/19)), and whilst it was fast, it missed very obvious explicit words, whilst triggering hundreds of false positives. However, this was the best package so far despite being semi-abandoned, so I used it for most of the project (before rolling my own).

#### Word list

With a [4 year old wordlist](https://github.com/snguyenthanh/better_profanity/blob/master/better_profanity/profanity_wordlist.txt), missing quite common slurs wasn't too surprising. As such, I tried using [a much more comprehensive wordlist](https://github.com/zacanger/profane-words/blob/master/words.json) (2823 words vs better profanity's 835). At this point, the library's "fuzzy" matching was far too fuzzy, and half the words had their definitions removed!

After logging all the removed words and definitions, I also noticed this list was quite over-zealous. I ended up manually removing 123 words (see `whitelisted.txt`), since words like "illegal", "kicking", "commie" are absolutely fine to all but the most prudish people. Removing false positives took the total number of profane removals from 3,368 to 1,750, all of which seem sensible.

Whilst I now had a good word list, at this point I gave up using libraries, and decided to just solve it myself. It's fine if the solution is slow and inefficient, so long as the output is correct.

#### Using regexes

I implemented a solution that just checks every word (& word of definition) against a combined regex of every profane word. Yes, this is a bit slow and naive, but it finally gives correct results!

The script takes about a minute to parse the 161,705 word candidates, pull out 71,361 acceptable words, and store them in the database. Fast enough for a rarely run task.

### Optimisation

A few steps are taken to improve performance:

- `executemany` is used to insert all the database rows at once.
- A combined (very long) regex is used since it's far faster than checking a word against 2700 regexes.
- A `set` is used for the word list, so words can be quickly checked against it.
- Only one definition for each word & type is included, as this reduces the database size from 7.2MB to 5.1MB.

## Conclusion

The approach taken to generate the database had quite a lot of trial and error. Multiple times I thought I was "done", then I'd check the database or raw data and discover I was incorrectly including or excluding data!

I'll absolutely tweak this script a bit as I go forward and my requirements change, but it's good enough for a starting point. Specifically, next steps are probably:

- ~~Try the [WordNet 3.1](https://wordnet.princeton.edu/download/current-version) database instead of 3.0, and see if there's any noticeable differences (there's no release notes!)~~ Tried, not much change
- ~~Use [an open source fork](https://github.com/globalwordnet/english-wordnet), since it has yearly updates so should be higher quality than WordNet's 2006 data.~~ Done!
- ~~Replace the current profanity library, since it takes far longer than the rest of the process, and pointlessly checks letter replacements (e.g. `h3ll0`) despite knowing my words are all lowercase letters.~~ Done!
- Use the word + type combo as a composite primary key on the database, and ensure querying it is as efficient as possible.
