---
id: 2436
title: "Quickly setting up commit verification / signing with GitHub, GitKraken, and GPG"
date: "2019-03-20T21:31:04+00:00"
permalink: /quickly-setting-up-commit-verification-signing-with-github-gitkraken-and-gpg/
image: /wp-content/uploads/2019/03/kCuSDTB.png
categories:
  - Development
tags:
  - Git
  - GitHub
  - gpg
---

Whilst most developers use hosted git repositories on a service like GitHub, many forget that almost none of these commits are verified. If you own a repository, you can [“fake” a commit](https://dev.to/agrinman/spoof-a-commit-on-github-from-anyone-4gf4) from literally any user if you know their email. If that email matches a GitHub account, their avatar will be displayed next to their name! One famous example is a fake commit by Linus Torvalds.

An effortless way to protect against this is with git verified signatures. This proves that a commit was _really_ from the person. GitKraken [introduced this feature a week ago](https://support.gitkraken.com/release-notes/current/#version-500), and it seems to work perfectly. This tutorial will provide a very simple guide to getting verified commits configured.

Note that GitKraken also has [a very in-depth guide](https://support.gitkraken.com/git-workflows-and-extensions/commit-signing-with-gpg/) with lots of extra information.

## Installing GPG

First, [download Gpg4win](https://gpg4win.org/get-gpg4win.html) (select $0 donation if you do not wish to donate, [mac / linux options also available](https://support.gitkraken.com/git-workflows-and-extensions/commit-signing-with-gpg/#commit-signing-requirements)).

Next follow the installer’s steps, deselecting GPGOL (Outlook email signing) and GPGEX (Right-click signing).

[![](/wp-content/uploads/2019/03/2HFJNf1.png)](/wp-content/uploads/2019/03/2HFJNf1.png)

GPG is now installed!

## Getting a GPG key

Under GitKraken’s GPG Preferences (File -&gt; Preferences -&gt; GPG Preferences), browse for your newly installed GPG program. By default, this is at `C:\Program Files (x86)\GnuPG\bin\gpg.exe`.

Now that GitKraken knows about GPG, you can press “Generate”, with an optional passphrase.

[![](/wp-content/uploads/2019/03/Qrw6Wbp.png)](/wp-content/uploads/2019/03/Qrw6Wbp.png)

After a few seconds, you will now have a GPG signing key! The “Signing Key” field of GitKraken’s GPG Preferences screen is now populated with your new key.

[![](/wp-content/uploads/2019/03/hzQUOhK.png)](/wp-content/uploads/2019/03/hzQUOhK.png)

Make sure to tick both the “Sign Commits by Default” and “Sign Tags by Default” checkboxes, so all future actions are signed. You should end up with a preferences screen like this:

[![](/wp-content/uploads/2019/03/ovIoBca.png)](/wp-content/uploads/2019/03/ovIoBca.png)

Your GitKraken is now configured to use commit verification! Time to sort out GitHub…

## Adding your GPG key to GitHub

1. Click “Copy GPG Public Key” in the GitKraken GPG Preferences screen. This will copy your public key to your clipboard, ready to give to GitHub.
2. Go to [GitHub’s “Add new GPG key” screen](https://github.com/settings/gpg/new).
3. Paste in your public key from step 1, and press “Add GPG key”.
4. You may need to reconfirm your password, then it’s been added![![](/wp-content/uploads/2019/03/KKkNvmr.png)](/wp-content/uploads/2019/03/KKkNvmr.png)

## Testing your new signed commits

Try making a commit, you should now see a green icon next to your commit hash in GitKraken. You can mouseover it for more information about your signed commit:

[![](/wp-content/uploads/2019/03/NsMyHsN.png)](/wp-content/uploads/2019/03/NsMyHsN.png)

When you push this commit, GitHub will also reflect your verified commit status:

[![](/wp-content/uploads/2019/03/EzwjkUn.png)](/wp-content/uploads/2019/03/EzwjkUn.png)

Your future commits are now all verified!

Considering how popular [GitKraken](https://www.gitkraken.com/download) is becoming (it’s my personal client of choice), being able to implement commit signing so easily provides yet another reason to switchover. Going forward, I fully intend to verify all my commits, with no extra effort beyond the original setup!
