---
title: Generating a SQLite word dictionary (with definitions) from WordNet using Python
image: /assets/images/banners/
tags:
  - Python
  - SQLite
---

I recently needed a SQLite dictionary with word, type, and definition(s). Turns out, it was easy enough to make my own!

All code in this article is available in [WordNetToSQLite repo](https://github.com/jakesteam/wordnetToSQLite/), as is [the final `words.db`](https://github.com/JakeSteam/WordNetToSQLite/blob/main/words.db) database ([license](https://github.com/JakeSteam/WordNetToSQLite/blob/main/LICENSE)).

## Objective

For an upcoming word game app, I wanted a relatively small dictionary of words. I wanted to know the type of word (noun / verb / adjective / adverb), and all definitions. Plus, it should only include sensible words (e.g. no proper nouns, acronyms, or profanity).

I decided to prefill a **SQLite database** and ship it with my app, since I can easily update it (just ship a new database, or even remotely update with SQL), and Android has good support for retrieving the data efficiently.

However, finding a suitable list of words was tricky! I found plenty sources containing just the words, or with no information on source or licensing. Eventually, I discovered [Princeton University's WordNet](https://wordnet.princeton.edu/) exists, and is free to use!

However, it contains a lot of unneeded information and complexity, and is 33MB+ uncompressed. Time to filter it...

## Running script

If you wish to recreate [`words.db`](https://github.com/JakeSteam/WordNetToSQLite/blob/main/words.db) from scratch, or customise the results, you can:

1. Download `WNdb-3.0.tar.gz` from [WordNet](https://wordnet.princeton.edu/download/current-version).
2. Extract it, and place the `data.x` files in `/wordnet-data/`.
3. Run `py wordnet-to-sqlite.py`.
4. After 10-15 seconds, you'll have a word database!

This script takes 10-15 seconds on an average laptop. Efficiency is not a priority (with profanity removal taking the majority of the time), as the output database only needs generating once.

## Results

The database contains just over 70k word & word type combinations, each with 1+ definitions. I use the open source [DB Browser for SQLite](https://sqlitebrowser.org/) to browse the results, looking something like this:

[![](/assets//images/2024/sqlite-browser.png)](/assets//images/2024/sqlite-browser.png)

### Sample data

Filtering `word` to `article`, alphabetical order, gives:

| word          | type      | definitions                                                                                                                                                                                                                                                  |
| :------------ | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| antiparticle  | noun      | a particle that has the same mass as another particle but has opposite values for its other properties                                                                                                                                                       |
| article       | noun      | one of a class of artifacts#nonfictional prose forming an independent part of a publication#(grammar) a determiner that may indicate the specificity of reference of a noun phrase#a separate section of a legal document (as a statute or contract or will) |
| article       | verb      | bind by a contract                                                                                                                                                                                                                                           |
| articled      | adjective | bound by contract                                                                                                                                                                                                                                            |
| particle      | noun      | a function word that can be used in English to form phrasal verbs#a body having finite mass and internal structure but negligible dimensions#(nontechnical usage) a tiny piece of anything                                                                   |
| quasiparticle | noun      | a quantum of energy (in a crystal lattice or other system) that has position and momentum and can in some respects be regarded as a particle                                                                                                                 |

### Schema definition

Word definitions for the same `type` are combined (e.g. with the noun `article`, but not the verb) with a `#` between definitions.

- `word`:
  - Any words with uppercase letters (e.g. proper nouns) are removed.
  - Any 1 character words are removed.
  - Any words with numbers are removed.
  - Any words with other characters (apostrophes, spaces) are removed.
  - Most profane words (133) are removed.
  - Roman numerals are removed (e.g. `XVII`).
- `type`:
  - Always `adjective` / `adverb` / `noun` / `verb`.
- `definition`:
  - Definition of the word, will contain multiple separated by `#` if the word appears as a synonym for another word.
  - Most profane definitions (385) are replaced with empty space.
  - May contain bracketed usage information, e.g. `(dated)`.
  - May contain special characters like `'`, `$`, `!`, `<`, `[`, etc.

Profanity removal (90% of the processing time) is performed using [`better_profanity` 0.6.1](https://github.com/snguyenthanh/better_profanity) (with a whitelist for the word "horny", since it's only used in a lizard context). This isn't perfect for biological words, but works quite well on slurs. A full list of removed words and definitions is available in [`removed-data.txt`](https://github.com/JakeSteam/WordNetToSQLite/blob/main/notes/removed-data.txt).

## Explanation of code

Whilst [`wordnet-to-sqlite.py](https://github.com/JakeSteam/WordNetToSQLite/blob/main/wordnet-to-sqlite.py) is pretty straight forward (I'm not particularly good at Python!), I'll briefly walk through what it does.

### Raw data

The raw data in Princeton's WordNet looks like this (`unknown` is the only valid noun to extract, with a single definition):

```
08632096 15 n 03 unknown 0 unknown_region 0 terra_incognita 0 001 @ 08630985 n 0000 | an unknown and unexplored region; "they came like angels out the unknown"
```

Further notes on WordNet's data files [are here](https://wordnet.princeton.edu/documentation/wndb5wn), this Python script just does a "dumb" parse then filters out numerical data and invalid words (spaces, capitalised letters, Roman numerals etc).

### Process

1. For each word type file (`data.noun`, `data.adj`, etc), pass it to `parse_file`.
2. Loop through every line in this file, primarily using `split` / `range` to fetch as many words as are defined, without taking the `0` and other non-word data.
3. Check each of these words is "valid", specifically that it's lowercase letters only (no symbols / spaces), isn't a Roman numeral (by matching the word & description), and isn't a profane word.
4. If the word is valid, either add it to the dictionary, or append the new description if the word + type combo is already present. For example the noun & verb versions of a word will have different definitions.
5. Finally, output all these word, type, and definition rows into a SQLite database we prepared earlier.

## Conclusion

The approach taken to generate the database had quite a lot of trial and error. Multiple times I thought I was "done", then I'd check the database or raw data and discover I was incorrectly including or excluding data!

I'll absolutely tweak this script a bit as I go forward and my requirements change, but it's good enough for a starting point. Specifically, next steps are probably:

- Try the [WordNet 3.1](https://wordnet.princeton.edu/download/current-version) database instead of 3.0, and see if there's any noticeable differences (there's no release notes!)
- Use [an open source fork](https://github.com/globalwordnet/english-wordnet) with a completely different format, since it has yearly updates so should be higher quality than WordNet's 2006 data.
- Replace the current profanity library, since it takes far longer than the rest of the process, and pointlessly checks letter replacements (e.g. `h3ll0`) despite knowing my words are all lowercase letters.
- Use the word + type combo as a composite primary key on the database, and ensure querying it is as efficient as possible.
