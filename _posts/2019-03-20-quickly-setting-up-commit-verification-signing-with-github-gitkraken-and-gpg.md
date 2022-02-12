---
id: 2436
title: 'Quickly setting up commit verification / signing with GitHub, GitKraken, and GPG'
date: '2019-03-20T21:31:04+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2436'
permalink: /quickly-setting-up-commit-verification-signing-with-github-gitkraken-and-gpg/
snap_isAutoPosted:
    - '1553117464'
snapMD:
    - "s:215:\"a:1:{i:0;a:6:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;}}\";"
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1108481229454823424";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1108481229454823424";s:5:"pDate";s:19:"2019-03-20 21:31:34";}}";'
image: /wp-content/uploads/2019/03/kCuSDTB-150x150.png
categories:
    - Development
tags:
    - git
    - GitHub
    - gpg
---

Whilst most developers use hosted git repositories on a service like GitHub, many forget that almost none of these commits are verified. If you own a repository, you can [“fake” a commit](https://dev.to/agrinman/spoof-a-commit-on-github-from-anyone-4gf4) from literally any user if you know their email. If that email matches a GitHub account, their avatar will be displayed next to their name! One famous example is a fake commit by Linus Torvalds:

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/VFQqkEo.png?resize=300%2C110&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/VFQqkEo.png?ssl=1)

An effortless way to protect against this is with git verified signatures. This proves that a commit was *really* from the person. GitKraken [introduced this feature a week ago](https://support.gitkraken.com/release-notes/current/#version-500), and it seems to work perfectly. This tutorial will provide a very simple guide to getting verified commits configured.

Note that GitKraken also has [a very in-depth guide](https://support.gitkraken.com/git-workflows-and-extensions/commit-signing-with-gpg/) with lots of extra information.

## Installing GPG

First, [download Gpg4win](https://gpg4win.org/get-gpg4win.html) (select $0 donation if you do not wish to donate, [mac / linux options also available](https://support.gitkraken.com/git-workflows-and-extensions/commit-signing-with-gpg/#commit-signing-requirements)).

Next follow the installer’s steps, deselecting GPGOL (Outlook email signing) and GPGEX (Right-click signing).

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/2HFJNf1.png?resize=499%2C388&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/2HFJNf1.png?ssl=1)

GPG is now installed!

## Getting a GPG key

Under GitKraken’s GPG Preferences (File -&gt; Preferences -&gt; GPG Preferences), browse for your newly installed GPG program. By default, this is at `C:\Program Files (x86)\GnuPG\bin\gpg.exe`.

Now that GitKraken knows about GPG, you can press “Generate”, with an optional passphrase.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/Qrw6Wbp.png?resize=551%2C274&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/Qrw6Wbp.png?ssl=1)

After a few seconds, you will now have a GPG signing key! The “Signing Key” field of GitKraken’s GPG Preferences screen is now populated with your new key.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/hzQUOhK.png?resize=300%2C90&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/hzQUOhK.png?ssl=1)

Make sure to tick both the “Sign Commits by Default” and “Sign Tags by Default” checkboxes, so all future actions are signed. You should end up with a preferences screen like this:

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/ovIoBca.png?resize=681%2C401&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/ovIoBca.png?ssl=1)

Your GitKraken is now configured to use commit verification! Time to sort out GitHub…

## Adding your GPG key to GitHub

1. Click “Copy GPG Public Key” in the GitKraken GPG Preferences screen. This will copy your public key to your clipboard, ready to give to GitHub.
2. Go to [GitHub’s “Add new GPG key” screen](https://github.com/settings/gpg/new).
3. Paste in your public key from step 1, and press “Add GPG key”.
4. You may need to reconfirm your password, then it’s been added![![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/KKkNvmr.png?resize=700%2C232&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/KKkNvmr.png?ssl=1)

## Testing your new signed commits

Try making a commit, you should now see a green icon next to your commit hash in GitKraken. You can mouseover it for more information about your signed commit:

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/NsMyHsN.png?resize=594%2C266&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/NsMyHsN.png?ssl=1)

When you push this commit, GitHub will also reflect your verified commit status:

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/EzwjkUn.png?resize=700%2C235&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2019/03/EzwjkUn.png?ssl=1)

Your future commits are now all verified!

Considering how popular [GitKraken](https://www.gitkraken.com/download) is becoming (it’s my personal client of choice), being able to implement commit signing so easily provides yet another reason to switchover. Going forward, I fully intend to verify all my commits, with no extra effort beyond the original setup!