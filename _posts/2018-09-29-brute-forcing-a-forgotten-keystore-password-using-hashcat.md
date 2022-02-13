---
id: 1753
title: 'Brute Forcing A Forgotten Keystore Password Using Hashcat'
date: '2018-09-29T14:00:20+01:00'
author: 'Jake Lee'
layout: post
permalink: /brute-forcing-a-forgotten-keystore-password-using-hashcat/
image: /wp-content/uploads/2018/09/mxcyygz.png
categories:
    - 'Android Dev'
tags:
    - Cracking
    - Hashcat
    - Keystore
---

Recently, I was preparing an update to a long abandoned Android app of mine when I realised the password to the keystore was long forgotten. A keystore and associated password is essential for updating an app (more information on keystores is available in [easy to understand LEGO form](https://www.youtube.com/watch?v=3lDtAf8Jk_c)), and as such the app could never be updated again!

Luckily, it’s possible to crack the password to a keystore.

For this tutorial, the debug keystore will be used, but the steps are exactly the same for a release keystore, i.e. one used to update an app in the store. The debug keystore is located at `C:\Users\yourusername\.android\debug.keystore`.

## Retrieving hash

To retrieve the keystore’s hash so it can be cracked, we are going to use a useful little 10KB utility called `JksPrivkPrepare.jar`.

1. First, [download floyd-fuh’s hash retriever](https://github.com/floyd-fuh/JKS-private-key-cracker-hashcat/archive/master.zip) ([source code](https://github.com/floyd-fuh/JKS-private-key-cracker-hashcat)).
2. Unzip the `JKS-private-key-cracker-hashcat-master.zip` archive just downloaded.
3. Paste your target keystore inside the unzipped folder (in the same folder as the `README.md` etc).
4. Open up a command prompt / PowerShell prompt. Pressing shift + right click within the unzipped folder should provide an option to “Open Command Prompt here” or “Open PowerShell window here”.
5. Paste (right click -&gt; paste) the following, replacing `debug.keystore` with your keystore’s name: `java -jar JksPrivkPrepare.jar debug.keystore > hash.txt`, then press enter.
6. A `hash.txt` should now exist in the folder, that’s the hash we need! The tool will also tell you your key’s alias, shown below:

![hashcat installed](/wp-content/uploads/2018/09/leovqan.png)

## Preparing the hash

On Windows machines, `hash.txt` is output in a slightly incorrect format (contains a [BOM](https://www.w3.org/International/questions/qa-byte-order-mark), which files on Windows shouldn’t have). The easiest solution is to open `hash.txt` in [Notepad++](https://notepad-plus-plus.org/download/v7.5.8.html), convert it, then resave it.  
![converting file](/wp-content/uploads/2018/09/d22ooef.png)

## Cracking the hash

1. First, [download Hashcat](https://hashcat.net/hashcat/) by clicking “Download” on the “hashcat binaries” row.
2. Unzip the archive (this may require [7zip](https://www.7-zip.org/download.html)).
3. Move the fixed hash.txt from earlier into the unzipped folder.
4. Run `.\hashcat64 -m 15500 -a 3 -1 '?l' -w 3 hash.txt ?1?1?1?1?1?1?1`. (`hashcat32` on 32-bit systems, more detail on this command in the next section)
5. After a few seconds, you should see the very long hash we retrieved earlier followed by `:android`, telling us that the cracked password is “android”!

![cracking the hash](/wp-content/uploads/2018/09/lpp8e6k.png)

## Further crack configuration

The command entered earlier, `.\hashcat64 -m 15500 -a 3 -1 '?l' -w 3 hash.txt ?1?1?1?1?1?1?` is pretty overwhelming at first glance, but each section can be understood individually. A [full list of Hashcat parameters is available](https://hashcat.net/wiki/doku.php?id=hashcat), the following settings are sufficient for this purpose however. All reference tables below come from the official documentation.

- **.\\hashcat64**: Tells Windows we’re trying to use `hashcat64.exe`. On 32-bit machines this should be `hashcat32.exe`.
- **-m 15500**: Sets the hash type to “JKS Java Key Store Private Keys (SHA1)”, so that hashes can be compared.
- **-a 3**: Sets the attack mode to “Brute-force”, e.g. trying every possible password until the correct one is found.

![attack mode](/wp-content/uploads/2018/09/p5utt0q.png)

- **-1 ‘?l’**: Sets the first character set to `l` for lowercase. A password with uppercase + lowercase letters as well as numbers would need `?u?l?d`.

![charset](/wp-content/uploads/2018/09/3tndajn.png)

- **-w 3**: Sets the workload profile (intensity) to “High”.

![workload profile](/wp-content/uploads/2018/09/inwz4ub.png)

- **hash.txt**: Defines the list of hashes to crack, our file only has one.
- **?1?1?1?1?1?1?**: This sets the “mask” used for the search. Each instance of `?1` refers to the character set we defined earlier, and says there is a character from that character set in that position. We repeat this 7 times since it’s a 7 letter password, usually you would try 5 characters, then 6, etc.

The ability to set multiple character sets in the mask allows for situations where you know the password is a letter followed by numbers, or another pattern.

## Conclusion

The bulk of the work in this post is done by [Hashcat](https://hashcat.net/hashcat/), an extremely powerful hash cracking tool that has been around for years and is used by everyone from penetration testers to malicious hackers. That being said, it is simply a useful tool, not at all illegal!

Password cracking can be extremely complicated, but due to Hashcat’s popularity there are thousands of guides online. Alternatively, [the official forums](https://hashcat.net/forum/) can generally help out.

PS: Obviously, I don’t condone cracking any keystores that aren’t your own!