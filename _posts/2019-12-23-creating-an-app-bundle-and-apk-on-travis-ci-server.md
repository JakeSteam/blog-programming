---
id: 2624
title: 'How to create an app bundle (and APK) on Travis / CI server'
date: '2019-12-23T17:00:01+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=2624'
permalink: /creating-an-app-bundle-and-apk-on-travis-ci-server/
snap_isAutoPosted:
    - '1577120404'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:216:"a:1:{i:0;a:8:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;}}";'
snapTW:
    - 's:398:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:31:"%TITLE% (%HCATS% %HTAGS%) %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1209156734104805383";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1209156734104805383";s:5:"pDate";s:19:"2019-12-23 17:00:05";}}";'
image: /wp-content/uploads/2019/12/fNlttUh-150x150.png
categories:
    - 'Android Dev'
tags:
    - APK
    - AppBundles
    - CI
    - Travis
---

App bundles are one of my [5 Android techniques for 2020](https://www.youtube.com/watch?v=Z-yJTjbswhw), and with good reason: they’re a low effort way of drastically reducing app size. Surprisingly, we also noticed faster times creating an app bundle then an APK than creating an APK directly. Of course, moving away from APKs is trickier if you have a complicated multi-stage build process involving QA or deployment!

Currently I am transitioning a large app slowly from APKs to app bundles whilst retaining compatibility with our existing processes. For now this means generating both app bundles and APKs. Whilst creating both isn’t especially tricky, the detailed explanations in this post should make it easier to implement into Travis.

**Update**: If using Gradle plugin 3.5.0+, the app bundle will be generated at `app-<variant>.aab` (e.g. `app-debug.aab`) instead of `app.aab`. The following tutorial has been left unchanged, make sure to edit your script if using a later Gradle plugin version!

## The plan

Our approach is going to consist of 4 steps:

- Preparing Travis to use a build script
- Making an app bundle for our app
- Downloading bundletool, so we can…
- …generate a universal APK from our app bundle

If you’d like to see a finished script of this post (recommended), it’s available as a Gist: <https://gist.github.com/JakeSteam/eacc45ddd0db942d6902150f09dfa39f>

### Preparing Travis / CI config

Before we write anything, we need to make our CI config (e.g. `.travis.yml`) able to run a shell script! Otherwise, our build config is going to get very messy. These steps are going to vary a little bit between CIs, but should be pretty similar.

1. Before anything else, make sure the build scripts can be executed by changing their permissions (assuming they’re in `/build-scripts/`): ```
    before_install: # Make sure build scripts can be executed
          - chmod 755 build-scripts/*.sh
    ```
2. Next, add your script to the `script` step, passing the built-in build directory variable: ```
    script: # Runs build script
      - build-scripts/travis_build.sh $TRAVIS_BUILD_DIR
    ```

Our CI is now going to run `build-scripts/travis_build.sh`, so let’s make that file and make it do something!

### Making an app bundle

This is amazingly simple, we just need to run the gradle task for bundle generation inside our `travis_build.sh` file:

```
./gradlew app:bundleDebug
```

If you’re using build variants (e.g. `prodDebug`), you’ll need to do `app:bundleProdDebug` instead. This would also be a good place to do `lintDebug`, `ktlint`, or any other pre-build checks by adding them to the list of gradle tasks.

### Downloading bundletool

To convert our app bundle into a universal APK (an APK that can be installed on any device), we’ll need [bundletool](https://developer.android.com/studio/command-line/bundletool). This is just a case of `curl`ing it:

```
curl -O -L "https://github.com/google/bundletool/releases/download/0.11.0/bundletool-all-0.11.0.jar"
```

### Using bundletool to create a universal APK

To create our universal APK we’ll need our keystore information. This can be hardcoded, passed in, stored in environment variables, retrieved from a remote server etc, but we’ll be keeping it simple. We’re also storing a debug keystore in our repo for simplicity, and passing in the bundle &amp; output locations. Travis’ build directory is passed in from our build config.

```
# Get the build directory from build config
TRAVIS_BUILD_DIR=$1

# Use bundletool to create universal .apks zip
java -jar bundletool-all-0.11.0.jar build-apks \
    --mode=universal \
    --bundle=${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodDebug/app.aab \
    --output=${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodDebug/app.apks \
    --ks=${TRAVIS_BUILD_DIR}/app/build-extras/debug.keystore \
    --ks-pass=pass:android \
    --ks-key-alias=androiddebugkey \
    --key-pass=pass:android;
```

Bundletool actually creates an `.apks` file, a zip file of our universal APK. We can get our actual APK with a quick unzip into a new `unzipped` folder:

```
unzip ${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodDebug/app.apks -d ${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodDebug/unzipped;
```

And that’s it! We now have our universal APK at `${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodDebug/unzipped/universal.apk`, ready to be sent to wherever wants an APK.


## Tidying up

Whilst the above approach does achieve the goal, the code is pretty messy and hard coded. Extracting variables and making the code more generic will let us use it for debug and release builds, as well as making it easier to modify.

### Extracting variables

Inside our `travis_build.sh` script, we should extract all of our file locations and keystore information. Once this is done, it will be possible to pass the variables to a generic function that can handle any build type. For example:

```
# Debug build variables
DEBUG_BUNDLE_PATH=${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodDebug/
DEBUG_KEYSTORE_PATH=${TRAVIS_BUILD_DIR}/app/build-extras/debug.keystore
DEBUG_KEYSTORE_PASSWORD=android
DEBUG_KEYSTORE_ALIAS=androiddebugkey
DEBUG_KEYSTORE_KEY_PASSWORD=android

# Release build variables
RELEASE_BUNDLE_PATH=${TRAVIS_BUILD_DIR}/app/build/outputs/bundle/prodRelease/
RELEASE_KEYSTORE_PATH=${TRAVIS_BUILD_DIR}/app/build-extras/upload-keystore.jks
RELEASE_KEYSTORE_PASSWORD=mypassword
RELEASE_KEYSTORE_ALIAS=uploadkey
RELEASE_KEYSTORE_KEY_PASSWORD=mykeypassword
```

### Extracting into functions

Converting our script into functions will simplify the overall logic, and help clarify the code’s meaning. I chose to split my code into “bundle generating” and “bundle to apk conversion” functions. The converter also includes a quick check for the number of parameters passed:

```
function compileAndTestDebugBundle {
    echo "Compiling and testing a debug bundle!"
    ./gradlew app:bundleDebug
}

function convertBundleToApk {
    # Check all necessary arguments have been passed
    if [[ "$#" -eq 5 ]]; then
        echo "Converting bundle to APK!"
    else
        echo "Make sure you pass in a bundle path, and all 4 keystore values!"
        exit 1
    fi

    # Download bundletool
    curl -O -L "https://github.com/google/bundletool/releases/download/0.11.0/bundletool-all-0.11.0.jar"

    # Use bundletool to create universal .apks zip
    java -jar bundletool-all-0.11.0.jar build-apks \
        --mode=universal \
        --bundle=${1}app.aab \
        --output=${1}app.apks \
        --ks=${2} \
        --ks-pass=pass:${3} \
        --ks-key-alias=${4} \
        --key-pass=pass:${5};

    # Unzip .apks zip into /unzipped
    unzip ${1}app.apks -d ${1}unzipped;
}
```

Now, we can just call our functions (with the parameters) to perform the task, making the code’s intention much more obvious. Making a release build is as simple as passing different parameters, easy!

```
compileAndTestDebugBundle;
convertBundleToApk ${DEBUG_BUNDLE_PATH} ${DEBUG_KEYSTORE_PATH} ${DEBUG_KEYSTORE_PASSWORD} ${DEBUG_KEYSTORE_ALIAS} ${DEBUG_KEYSTORE_KEY_PASSWORD}
```

### Securing passwords

Whilst our approach so far works well, it isn’t particularly secure. Our keystore passwords are in our build config, meaning they’re visible to anyone who can see our CI logs or repository. Travis’ encrypted environment variables are a great solution to this. They encrypt your password (e.g. `KEYSTORE_PASSWORD` and `KEYSTORE_KEY_PASSWORD`, and only provide it to you during a build ([they can be retrieved though!](https://blog.jakelee.co.uk/retrieving-forgotten-environment-variables-from-travis-ci/)). This can then be passed to your script and used by changing the build config to:

```
script: # Runs build script
  - build-scripts/travis_build.sh $TRAVIS_BRANCH $KEYSTORE_PASSWORD $KEYSTORE_KEY_PASSWORD
```

And your variable definitions to:

```
RELEASE_KEYSTORE_PASSWORD=$2
RELEASE_KEYSTORE_KEY_PASSWORD=$3
```

### Next steps

Whilst [the results of this post](https://gist.github.com/JakeSteam/eacc45ddd0db942d6902150f09dfa39f) are enough to create app bundles and APKs, there’s always improvements to be made. For example, the functions could be extracted to a new `.sh` file, then included in `travis_build.sh`.

You could also perform a release build for specific branches, by passing the `TRAVIS_BRANCH` environment variable from the Travis config. This value can then be used in a simple if statement to create a build:

```
if [[ ${TRAVIS_BRANCH} == "dev" ]]; then
    compileAndTestReleaseBundle;
    convertBundleToApk ${RELEASE_BUNDLE_PATH} ${RELEASE_KEYSTORE_PATH} ${RELEASE_KEYSTORE_PASSWORD} ${RELEASE_KEYSTORE_ALIAS} ${RELEASE_KEYSTORE_KEY_PASSWORD}
    uploadToDeployGate;
else
    compileAndTestDebugBundle;
    convertBundleToApk ${DEBUG_BUNDLE_PATH} ${DEBUG_KEYSTORE_PATH} ${DEBUG_KEYSTORE_PASSWORD} ${DEBUG_KEYSTORE_ALIAS} ${DEBUG_KEYSTORE_KEY_PASSWORD}
    uploadToDeployGate;
fi
```

Finally, the next step for me will be moving away from APKs completely, by using [Google Play Internal App Sharing](https://support.google.com/googleplay/android-developer/answer/9303479?hl=en-GB) for QA. The [article for implementing this](https://blog.jakelee.co.uk/uploading-an-app-bundle-to-google-play-internal-app-sharing-from-travis-ci/) is now available.

PS: Just in case anyone missed it, here’s the outcome of this post: <https://gist.github.com/JakeSteam/eacc45ddd0db942d6902150f09dfa39f>

PPS: Happy holidays!