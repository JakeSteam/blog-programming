---
id: 2227
title: 'How to fix &#8220;Remote file is incorrect size&#8221; WordPress error'
date: '2018-12-19T22:09:09+00:00'
author: 'Jake Lee'
layout: post
permalink: /how-to-fix-remote-file-is-incorrect-size-wordpress-error/
image: /wp-content/uploads/2018/12/j93wOuw.png
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

[![](/wp-content/uploads/2018/12/broken.png)](/wp-content/uploads/2018/12/broken.png)

## Find your file size checker

First, we need to open the file that performs the size check inside a text editor (e.g. Notepad++).

If you are using [WordPress Importer](https://en-gb.wordpress.org/plugins/wordpress-importer/), this code is in:

```text
/wp-content/plugins/wordpress-importer/wordpress-importer.php
```

If you are using [RAMP](https://shop.crowdfavorite.com/ramp/), this code is in the following file (on the server being RAMPed to):

```text
/wp-content/plugins/ramp/classes/deploy.class.php
```

## Comment out the code

Next, comment out the lines that handle file size checking. Do this by adding `/*` at the start and `*/` at the end.

If you are using [WordPress Importer](https://en-gb.wordpress.org/plugins/wordpress-importer/), the code to comment out is:

```php
if ( isset( $headers['content-length'] ) && $filesize != $headers['content-length'] ) {
	@unlink( $upload['file'] );
	return new WP_Error( 'import_file_error', __('Remote file is incorrect size', 'wordpress-importer') );
}
```

If you are using [RAMP](https://shop.crowdfavorite.com/ramp/), the code to comment out is:

```php
$received_size = filesize($upload['file']);
if ( $file_size !== $received_size ) {
	@unlink($upload['file']);
	return new WP_Error( 'import_file_error', sprintf(__('Remote file is incorrect size: expected %1$d, got %2$d', 'wordpress-importer'), $file_size, $received_size));
}
```

## Finishing up

Finally save your file, push it to your server, then try the importer / RAMP action again. Problem solved!

[![](/wp-content/uploads/2018/12/cslrcIr.png)](/wp-content/uploads/2018/12/cslrcIr.png)

Thanks to Codeboxr’s [Sabuj Kundu’s article](https://codeboxr.com/fix-remote-file-is-incorrect-size-for-wordpress-import-error/) for the WordPress Importer addition.