---
id: 2227
title: 'How to fix &#8220;Remote file is incorrect size&#8221; WordPress error'
date: '2018-12-19T22:09:09+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2227'
permalink: /how-to-fix-remote-file-is-incorrect-size-wordpress-error/
snap_isAutoPosted:
    - '1545257350'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapMD:
    - "s:430:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:65:\"%EXCERPT%\r\n<br><br>\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"93128c5a4657\";s:7:\"postURL\";s:99:\"https://medium.com/@JakeSteam/how-to-fix-remote-file-is-incorrect-size-wordpress-error-93128c5a4657\";s:5:\"pDate\";s:19:\"2018-12-19 22:09:29\";}}\";"
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6481279169929060352";s:5:"pDate";s:19:"2018-12-19 22:09:30";}}";'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1075513483716898816";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1075513483716898816";s:5:"pDate";s:19:"2018-12-19 22:09:31";}}";'
image: /wp-content/uploads/2018/12/j93wOuw-150x150.png
categories:
    - 'Web Dev'
tags:
    - Importer
    - PHP
    - Plugins
    - Wordpress
---

Whilst trying to [RAMP](https://shop.crowdfavorite.com/ramp/) posts from your staging environment to live, or import posts using [WordPress Importer](https://en-gb.wordpress.org/plugins/wordpress-importer/), a lot of under-the-hood code has to be run. One of the safety checks included in this is comparing the expected size of files with the actual size. Whilst this usually passes without any issues, occasionally it can cause the transfer to fail, leading to the “Remote file is incorrect size” error.

This error is occasionally caused by a corrupted file or network issues, but in those cases trying again resolves the issue. If a retry doesn’t fix it, more drastic action has to be taken! Removing the error handling code is an extreme step, so should only be taken if nothing else fixes the issue. That being said, it does instantly solve the problem with no noticeable side effects.

## [![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/broken.png?resize=700%2C384&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/broken.png?ssl=1)

## Find your file size checker

First, we need to open the file that performs the size check inside a text editor (e.g. Notepad++).

If you are using [WordPress Importer](https://en-gb.wordpress.org/plugins/wordpress-importer/), this code is in:

```
/wp-content/plugins/wordpress-importer/wordpress-importer.php
```

If you are using [RAMP](https://shop.crowdfavorite.com/ramp/), this code is in the following file (on the server being RAMPed to):

```
/wp-content/plugins/ramp/classes/deploy.class.php
```

## Comment out the code

Next, comment out the lines that handle file size checking. Do this by adding `/*` at the start and `*/` at the end.

If you are using [WordPress Importer](https://en-gb.wordpress.org/plugins/wordpress-importer/), the code to comment out is:

```
if ( isset( $headers['content-length'] ) && $filesize != $headers['content-length'] ) {
	@unlink( $upload['file'] );
	return new WP_Error( 'import_file_error', __('Remote file is incorrect size', 'wordpress-importer') );
}
```

If you are using [RAMP](https://shop.crowdfavorite.com/ramp/), the code to comment out is:

```
$received_size = filesize($upload['file']);
if ( $file_size !== $received_size ) {
	@unlink($upload['file']);
	return new WP_Error( 'import_file_error', sprintf(__('Remote file is incorrect size: expected %1$d, got %2$d', 'wordpress-importer'), $file_size, $received_size));
}
```

## Finishing up

Finally save your file, push it to your server, then try the importer / RAMP action again. Problem solved!

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/cslrcIr.png?resize=700%2C298&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/12/cslrcIr.png?ssl=1)

Thanks to Codeboxr’s [Sabuj Kundu’s article](https://codeboxr.com/fix-remote-file-is-incorrect-size-for-wordpress-import-error/) for the WordPress Importer addition.