---
id: 2615
title: 'Retrieving forgotten environment variables from Travis CI'
date: '2019-12-18T15:00:37+00:00'
author: 'Jake Lee'
layout: post
permalink: /retrieving-forgotten-environment-variables-from-travis-ci/
image: /wp-content/uploads/2019/12/Screenshot-2019-12-16-at-09.29.23.png
categories:
    - 'Android Dev'
    - Development
tags:
    - ccrypt
    - CI
    - Travis
---

When using a CI server, you’ll often need a way to use highly sensitive strings (e.g. signing keys, API keys, passwords), whilst minimising who has access to them. Travis CI solves this using [encrypted environment variables](https://docs.travis-ci.com/user/environment-variables/#Encrypted-Variables), encrypting your variables using a private key only Travis has access to. These encrypted values are then stored in your `.travis.yml`.

This means nobody sees your plaintext string except Travis, and it is never sent between servers. The downside of this? **If you lose the secret string, only Travis knows what it is!**

When transitioning from APKs to app bundles recently (article soon!), I discovered our keystore’s password wasn’t stored anywhere besides Travis. The entire app being dependent on our CI staying up scared me! As such, I decided to extract the plaintext value to store in the same secure area as other company passwords.

Since Travis (correctly) tries very hard to stop you getting these variables back out, you’ll need to take a roundabout approach. I also didn’t want our password ever being displayed in the logs, or sent over the internet in plaintext.

## The plan

1. Create a new secure variable as an encryption key.
2. During a build decrypt our target variable into a file, then encrypt the file using our new encryption key.
3. Transfer this encrypted file off the CI server using [file.io](https://file.io).
4. Download it, then decrypt using the encryption key we created in step 1.

## Preparing Travis CI

Before running the script, you will need to add a new environment variable to Travis called `ENC_KEY`, and make it only available on your current branch. It should end up looking like this:

[![](/wp-content/uploads/2019/12/Screenshot-2019-12-16-at-08.41.10.png)](/wp-content/uploads/2019/12/Screenshot-2019-12-16-at-08.41.10.png)

Note: It’s good practice to always limit the branches your environment variables can run on.

## Preparing the build config

Next, add the following to your `.travis.yml` build config. Don’t forget to replace:

- `MY_VARIABLE` (two times) with your target encrypted variable’s name.
- `arandomfilename` (three times) with a string of your choice.

```yaml
install:
  - sudo apt-get install -y ccrypt
  - echo MY_VARIABLE = $MY_VARIABLE > arandomfilename.txt
  - ccencrypt arandonfilename.txt -K $ENC_KEY
  - curl -F'file=@arandomfilename.txt.cpt' https://file.io
```

This script installs ccrypt, puts our decrypted variable into a file, encrypts the file, and hosts it.

## Running the script

1. Commit your build config changes.
2. Push the branch.
3. You should now see a response with a URL after your last cURL statement, e.g:

```text
$ curl -F'file=@arandomfilename.txt.cpt' https://file.io
{"success":true,"key":"he5h9","link":"https://file.io/he5h9","expiry":"14 days"}
```

Note: This line of the log may be hidden by default by Travis, make sure to click any “expand” arrows.

## Retrieving the value

1. First, you need to download your encrypted file from the returned URL using curl (e.g. `curl -O https://file.io/he5h9`) or by opening it in a browser.
2. Next, you need ccrypt installed to decrypt it (e.g. `brew install ccrypt`).
3. Finally, decrypt it (e.g. `ccrypt -d arandomfile.cpt`).
4. You now have a text file containing your target value!

## Additional notes

Whilst the ability to retrieve a supposedly secure variable may seem concerning, it’s important to note this is only possible if you have push access to the repo. Travis also has the ability to only allow variables to be accessed from specific branches (e.g. `master`), which should be used when possible.

Also, whilst transferring even an encrypted value off-site may seem scary, file.io has extra protection. Once your file has been downloaded once, it can never be downloaded again. Thus, there’s no risk of someone else randomly stumbling across the file.

Finally, file hosts tend to come and go pretty quickly. If [file.io](https://file.io) no longer exists, any other command line based upload service will work!

*This article is based on [an excellent (but outdated) article by Matthew Twomey](https://www.topcoder.com/recover-lost-travisci-variables-two-ways/), which also covers how to avoid needing a third party host at all.*