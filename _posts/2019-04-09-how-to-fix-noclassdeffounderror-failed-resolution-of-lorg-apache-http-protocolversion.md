---
id: 2462
title: 'How to fix NoClassDefFoundError &#8220;Failed resolution of: Lorg/apache/http/ProtocolVersion&#8221;'
date: '2019-04-09T16:00:34+01:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2462'
permalink: /how-to-fix-noclassdeffounderror-failed-resolution-of-lorg-apache-http-protocolversion/
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6521411763437600768";s:5:"pDate";s:19:"2019-04-09 16:02:06";}}";'
snap_isAutoPosted:
    - '1554825726'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1115646076739096578";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1115646076739096578";s:5:"pDate";s:19:"2019-04-09 16:02:07";}}";'
image: /wp-content/uploads/2019/04/KNSaPEQ-150x150.png
categories:
    - 'Android Dev'
tags:
    - Cra
    - 'Google Play Services'
---

I recently updated an older app, and changed the target API from 27 to 28, as recommended. This app is using an older (15.x.x) version of the Google Maps library. Upon trying to actually use Google Maps, I received the following crash:

<div class="stack-trace-heading collapsible"><div class="stack-trace-caption">```
<pre class="stack-trace-title">Fatal Exception: java.lang.NoClassDefFoundError
Failed resolution of: Lorg/apache/http/ProtocolVersion;
```

</div></div><div class="stack-frames"><div class="stack-frames ng-star-inserted"><div class="stack-frame layout-row developer-code"><div class="context-cell">With a detailed message of:</div><div>```
<pre class="stack-trace-title">Caused by java.lang.ClassNotFoundException
Didn't find class "org.apache.http.ProtocolVersion" on path: DexPathList[[zip file "/data/user_de/0/com.google.android.gms/app_chimera/m/0000003d/MapsDynamite.apk"],nativeLibraryDirectories=[/data/user_de/0/com.google.android.gms/app_chimera/m/0000003d/MapsDynamite.apk!/lib/armeabi-v7a, /data/user_de/0/com.google.android.gms/app_chimera/m/0000003d/MapsDynamite.apk!/lib/armeabi, /system/lib]]
```

Newer Android versions no longer include the library (Apache HTTP) Google Maps and other libraries require, leading to this problem.

The recommended solution is to either update the Google Maps dependency in the Gradle file to at least 16.1.x (or update whichever library has the issue), but there is another workaround too. Just adding a declaration that you still need the library into your manifest within the `<application>` tag will resolve it:

```
<pre class="prettyprint">```
<span class="tag"><uses-library</span><span class="pln">
      </span><span class="atn">android:name</span><span class="pun">=</span><span class="atv">"org.apache.http.legacy"</span><span class="pln">
      </span><span class="atn">android:required</span><span class="pun">=</span><span class="atv">"false"</span> <span class="tag">/></span>
```
```

Further information about *why* Google made this change is [available here](https://developer.android.com/about/versions/pie/android-9.0-changes-28#apache-p), as is an [official recommendation](https://developers.google.com/maps/documentation/android-sdk/config#specify_requirement_for_apache_http_legacy_library) of the manifest approach.

</div></div></div></div>