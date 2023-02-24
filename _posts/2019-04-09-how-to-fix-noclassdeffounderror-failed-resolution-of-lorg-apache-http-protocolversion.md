---
id: 2462
title: 'How to fix NoClassDefFoundError "Failed resolution of: Lorg/apache/http/ProtocolVersion"'
date: '2019-04-09T16:00:34+01:00'
author: 'Jake Lee'
layout: post
permalink: /how-to-fix-noclassdeffounderror-failed-resolution-of-lorg-apache-http-protocolversion/
image: /wp-content/uploads/2019/04/KNSaPEQ.png
categories:
    - 'Android Dev'
tags:
    - 'Google Maps'
    - 'Google Play Services'
---

I recently updated an older app, and changed the target API from 27 to 28, as recommended. This app is using an older (15.x.x) version of the Google Maps library. Upon trying to actually use Google Maps, I received the following crash:

```text
Fatal Exception: java.lang.NoClassDefFoundError
Failed resolution of: Lorg/apache/http/ProtocolVersion;
```

With a detailed message of:
```text
Caused by java.lang.ClassNotFoundException
Didn't find class "org.apache.http.ProtocolVersion" on path: DexPathList[[zip file "/data/user_de/0/com.google.android.gms/app_chimera/m/0000003d/MapsDynamite.apk"],nativeLibraryDirectories=[/data/user_de/0/com.google.android.gms/app_chimera/m/0000003d/MapsDynamite.apk!/lib/armeabi-v7a, /data/user_de/0/com.google.android.gms/app_chimera/m/0000003d/MapsDynamite.apk!/lib/armeabi, /system/lib]]
```

Newer Android versions no longer include the library (Apache HTTP) Google Maps and other libraries require, leading to this problem.

The recommended solution is to either update the Google Maps dependency in the Gradle file to at least 16.1.x (or update whichever library has the issue), but there is another workaround too. Just adding a declaration that you still need the library into your manifest within the `<application>` tag will resolve it:

```xml
<uses-library
    android:name="org.apache.http.legacy"
    android:required="false"
```

Further information about *why* Google made this change is [available here](https://developer.android.com/about/versions/pie/android-9.0-changes-28#apache-p), as is an [official recommendation](https://developers.google.com/maps/documentation/android-sdk/config#specify_requirement_for_apache_http_legacy_library) of the manifest approach.
