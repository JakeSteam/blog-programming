---
id: 1926
title: 'Developing Android Apps With Firebase Cloud Functions'
date: '2018-11-02T17:12:58+00:00'
author: 'Jake Lee'
layout: post
guid: 'https://blog.jakelee.co.uk/?p=1926'
permalink: /developing-android-apps-with-firebase-cloud-functions/
snap_isAutoPosted:
    - '1541178780'
snap_MYURL:
    - ''
snapEdIT:
    - '1'
snapLI:
    - 's:369:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"postType";s:1:"A";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doLI";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:0:"";s:7:"postURL";s:50:"www.linkedin.com/updates?topic=6464172382251810816";s:5:"pDate";s:19:"2018-11-02 17:13:14";}}";'
snapMD:
    - "s:425:\"a:1:{i:0;a:10:{s:2:\"do\";s:1:\"1\";s:10:\"msgTFormat\";s:7:\"%TITLE%\";s:9:\"msgFormat\";s:63:\"%EXCERPT%\r\n\r\n\r\n\r\n\r\nFull post by %AUTHORNAME% available at %URL%\";s:9:\"isAutoURL\";s:1:\"A\";s:8:\"urlToUse\";s:0:\"\";s:4:\"doMD\";i:0;s:8:\"isPosted\";s:1:\"1\";s:4:\"pgID\";s:12:\"f17fd0aea4df\";s:7:\"postURL\";s:96:\"https://medium.com/@JakeSteam/developing-android-apps-with-firebase-cloud-functions-f17fd0aea4df\";s:5:\"pDate\";s:19:\"2018-11-02 17:13:13\";}}\";"
snapTW:
    - 's:396:"a:1:{i:0;a:12:{s:2:"do";s:1:"1";s:9:"msgFormat";s:29:"%TITLE% %HCATS% %HTAGS% %URL%";s:8:"attchImg";s:1:"0";s:9:"isAutoImg";s:1:"A";s:8:"imgToUse";s:0:"";s:9:"isAutoURL";s:1:"A";s:8:"urlToUse";s:0:"";s:4:"doTW";i:0;s:8:"isPosted";s:1:"1";s:4:"pgID";s:19:"1058406696136175616";s:7:"postURL";s:57:"https://twitter.com/JakeLeeLtd/status/1058406696136175616";s:5:"pDate";s:19:"2018-11-02 17:13:15";}}";'
image: /wp-content/uploads/2018/11/functions-150x150.png
categories:
    - 'Android Dev'
tags:
    - 'Cloud Functions'
    - Firebase
    - JavaScript
    - Kotlin
---

Firebase Cloud Functions provide an easy way to execute JavaScript on Google’s servers, and call this code from your own apps. It removes the need to manually manage any sort of server, and can be up and running very quickly. Firebase’s free plan is somewhat limited, and cannot make network requests to other servers, but it can do plenty of processing.

This post is part of [The Complete Guide to Firebase](https://blog.jakelee.co.uk//firebase/). Throughout this tutorial, you’ll need access to the [Firebase Cloud Functions dashboard](https://console.firebase.google.com/u/0/project/_/functions/list), and the [official documentation](https://cloud.google.com/functions/docs/) may be useful too.

## Implementation

As always, the entire [Firebase Reference Project is open source](https://github.com/JakeSteam/FirebaseReference), and there is a [pull request for adding Firebase Cloud Functions](https://github.com/JakeSteam/FirebaseReference/pull/5) if you just want to see the code changes required. Additionally, the hosted functions code is [available as a repository](https://github.com/JakeSteam/FirebaseCloudFunctions).

This tutorial assumes you already have [Firebase added to your project](https://blog.jakelee.co.uk//adding-firebase-to-an-android-project/).

### Setting up Firebase Cloud Functions environment

1. First [install npm &amp; node.js](https://www.npmjs.com/get-npm), used to handle the Firebase installation process.
2. Next, open a Command Prompt and enter <span style="font-family: 'courier new', courier, monospace;">npm install -g firebase-tools</span>, after a few minutes you should see something similar to the following image:[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/2.png?resize=700%2C368&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/2.png?ssl=1)
3. Next, login to your Firebase account using <span style="font-family: 'courier new', courier, monospace;">firebase login</span>. This will open a browser with a login request. Once logged in, the Command Prompt will report success.[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/yZ61qY0.png?resize=700%2C186&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/yZ61qY0.png?ssl=1)
4. Next run <span style="font-family: 'courier new', courier, monospace;">firebase init functions</span>, which will ask you a few questions about your setup. Click any of the following items to view a screenshot of the installation at that point. 
    1. [The project to use](https://i.imgur.com/WD5ZNUk.png), I chose my Firebase Reference Project.
    2. [The language to use](https://i.imgur.com/taBpPWI.png), I chose JavaScript.
    3. [Whether style checker ESLint should be used &amp; dependencies should be installed](https://i.imgur.com/h6b7TFp.png), I chose “Yes” to both.
5. You should now have a project folder containing a few files and folders. <span style="font-family: 'courier new', courier, monospace;">functions/index.js</span> is the most important file, as it contains your functions’ actual code. Open this file up and uncomment the lines relating to <span style="font-family: 'courier new', courier, monospace;">export.helloWorld</span>.

That’s it, your local environment is now fully setup, and you’ve got a “Hello World” function ready to deploy!

### Deploying Firebase Cloud Functions

To deploy or update your functions, enter <span style="font-family: 'courier new', courier, monospace;">firebase deploy –only functions</span> to your Command Prompt whilst inside your project directory. On Windows machines, this will fail by default due to a slightly faulty configuration ([this error specifically](https://stackoverflow.com/questions/48345315/error-deploying-with-firebase-on-npm-prefix-resource-dir-run-lint)):

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/7.png?resize=700%2C225&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/7.png?ssl=1)

Luckily, fixing this is just a case of opening your firebase.json and replacing <span style="font-family: 'courier new', courier, monospace;">\\”$RESOURCE\_DIR\\”</span> with <span style="font-family: 'courier new', courier, monospace;">./functions/</span>. Save the changes, enter <span style="font-family: 'courier new', courier, monospace;">firebase deploy –only functions</span> again, and it should now successfully deploy:

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/8.png?resize=689%2C335&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/8.png?ssl=1)

Our Hello World function is now ready to call! Visiting the URL outputted (<https://us-central1-fir-referenceproject.cloudfunctions.net/helloWorld>) will display whatever message our Cloud Function in <span style="font-family: 'courier new', courier, monospace;">index.js</span> was set to output. You now have a cloud-hosted function, congratulations! Time to make your own…

### Creating a Cloud Function

You may have noticed the existing Hello World functions inside <span style="font-family: 'courier new', courier, monospace;">index.js</span> uses <span style="font-family: 'courier new', courier, monospace;">functions.https.onRequest</span>. This means it can be visited / called like a normal webpage, and has <span style="font-family: 'courier new', courier, monospace;">Content-Type</span> headers etc. Whilst you can get URL parameters from these methods (using <span style="font-family: 'courier new', courier, monospace;">request.query.text</span>), it’s safer to provide actual functions that can be called remotely. There’s a reason it’s called Cloud **Functions**!

We’re going to create a function that receives a phone’s manufacturer’s name from the app, converts it to uppercase, and then returns it to be shown in the app. This is obviously a pretty useless function that would usually be handled entirely inside the app, but it’s a simple way to show passing data back and forth.

To do this, use <span style="font-family: 'courier new', courier, monospace;">functions.https.onCall</span> instead, which can also receive a data object with any additional parameters you’ve chosen to send. We’re going to receive a manufacturer parameter, so first check it has a length, then convert whatever it contains to uppercase and return it. Add the following into your <span style="font-family: 'courier new', courier, monospace;">index.js</span>:

```
exports.uppercaseDeviceName = functions.https.onCall((data) => {
    if (data.manufacturer.length > 0) {
        return data.manufacturer.toUpperCase();
    }
    return "Unknown";
});
```

Save and redeploy the functions, and your custom function is now ready to be called. Note that to return data we just used <span style="font-family: 'courier new', courier, monospace;">return x</span>, instead of the <span style="font-family: 'courier new', courier, monospace;">response.send(x)</span> required by <span style="font-family: 'courier new', courier, monospace;">onRequest</span> functions. Google’s example <span style="font-family: 'courier new', courier, monospace;">index.js</span> contains [more complex examples](https://github.com/firebase/quickstart-js/blob/master/functions/functions/index.js) that may be useful for further work.

Time to programmatically call our new function from inside an app!

### Calling Cloud Functions from an Android app

First, add the Firebase Cloud Functions dependency in your app-level <span style="font-family: 'courier new', courier, monospace;">build.gradle</span> file and perform a sync:

```
<span style="font-family: 'courier new', courier, monospace;">implementation </span><span class="pl-s"><span style="font-family: 'courier new', courier, monospace;"><span class="pl-pds">'</span>com.google.firebase:firebase-functions:16.1.2</span><span class="pl-pds"><span style="font-family: 'courier new', courier, monospace;">'</span></span></span>
```

Next, use the following to make a call to your new uppercaseDeviceName function, passing it a HashMap containing your device’s manufacturer (as the manufacturer key), and displaying a Toast of the result:

```
FirebaseFunctions.getInstance()
		.getHttpsCallable("uppercaseDeviceName")
		.call(hashMapOf("manufacturer" to Build.MANUFACTURER))
		.continueWith { task ->
			if (task.isSuccessful) {
				Toast.makeText(activity, "Uppercase manufacturer is: ${task.result!!.data}", Toast.LENGTH_SHORT).show()
			} else {
				Toast.makeText(activity, task.exception.toString(), Toast.LENGTH_SHORT).show()
			}
		}
```

In the example app, this is triggered inside an <span style="font-family: 'courier new', courier, monospace;">onClick()</span>.

Due to Firebase already knowing which project you’re calling (due to the <span style="font-family: 'courier new', courier, monospace;">google-services.json</span>), just passing the function’s name is enough to call the function. Pretty cool, right? If you encounter problems in getting a response from the server, the “Web interface” part of this post covers how to view server logs containing any runtime errors. ESLint should also alert you on deployment if your code contains incorrect syntax, helpful if JavaScript isn’t one of your core languages.

### Automatically triggering Cloud Functions

Whilst both the Hello World and Uppercase Manufacturer Name functions in this tutorial were triggered on demand, it’s also possible to automatically call cloud functions when an event happens. Using Google’s example, you could trigger functions when a new image is uploaded to Firebase Storage to store the location in Firebase Database, and create a thumbnail of the image using an external API.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/intensive.png?resize=700%2C394&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/intensive.png?ssl=1)

To set up these triggers, define your function as a listener instead of an <span style="font-family: 'courier new', courier, monospace;">onCall</span> or <span style="font-family: 'courier new', courier, monospace;">onRequest</span>. For example, [Cloud Firestore](https://blog.jakelee.co.uk/developing-android-apps-with-firebase-cloud-firestore/) has <span style="font-family: 'courier new', courier, monospace;">onCreate</span>, <span style="font-family: 'courier new', courier, monospace;">onUpdate</span>, <span style="font-family: 'courier new', courier, monospace;">onDelete</span>, and <span style="font-family: 'courier new', courier, monospace;">onWrite</span> listeners. Set these up in your index.js as if they were a normal function:

```
exports.yourFunctionName = functions.firestore
    .document('sampledata').onWrite((change, context) => {
      // All changes will be inside `change`
    });
```

Many Firebase services provide these listeners that your Cloud Functions can subscribe to. To see which listeners are available, please see the live documentation as all of these services are currently in Beta and subject to change:

- [Analytics](https://firebase.google.com/docs/functions/analytics-events)
- [Authentication](https://firebase.google.com/docs/functions/auth-events)
- [Firestore](https://firebase.google.com/docs/functions/firestore-events)
- [Cloud Pub/Sub](https://firebase.google.com/docs/functions/pubsub-events)
- [Cloud Storage](https://firebase.google.com/docs/functions/gcp-storage-events)
- [Crashlytics](https://firebase.google.com/docs/functions/crashlytics-events)
- [Realtime Database](https://firebase.google.com/docs/functions/database-events)
- [Remote Config](https://firebase.google.com/docs/functions/rc-events)

## Web interface

The majority of Cloud Functions’ interface is in Firebase, but certain actions (e.g. deleting a function) can only be performed in Google Cloud Platform, so both will be covered.

### Firebase

#### Dashboard

The dashboard shows an overview of all of your current cloud functions, with basic information like region, node version, and memory allocation.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/dashboard.png?resize=700%2C85&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/dashboard.png?ssl=1)

#### Health

The Health tab shows an overview of your functions’ error rates and overall performance (times invoked, latency, memory usage, network usage). Checking this regularly can help you stay on track of any errors, and provide a quick health check of your functions.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/performance.png?resize=700%2C413&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/performance.png?ssl=1)

#### Logs

The Logs tab provides a simple log viewer, that can be used for basic analysis of any runtime issues encountered. Logs can be searched, and filtered by function, log level, and time period. These are very useful when experiencing issues with your functions, as a full stack trace will appear here.

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/logs.png?resize=700%2C352&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/logs.png?ssl=1)

#### Usage

This tab displays a simple chart of total invocations in a selected date range, and a link to your current quota. As it is essentially a repeat of the Health tab, it’s not included here!

### Google Cloud Platform

As Cloud Functions technically run on Google Cloud, some statistics can only be viewed there. After visiting the links, make sure to select the correct project using the dropdown at the top of the page.

#### Dashboard

[The dashboard page](https://console.cloud.google.com/apis/dashboard) shows a more comprehensive overview of all your Google Cloud services, and their recent performance.

[![](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/dashboard-1.png?resize=700%2C167&ssl=1)](https://i0.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/dashboard-1.png?ssl=1)

#### Quotas

[The quotas page](https://console.cloud.google.com/apis/api/cloudfunctions.googleapis.com/quotas) shows your functions’ usage against all applicable resource limits. For example, your plan is subject to read limits, write limits, CPU limits, traffic limits, DNS limits, build time limits, etc. You should occasionally check the graphs on this page to make sure no functions are misbehaving.

[![](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/quotas.png?resize=700%2C258&ssl=1)](https://i2.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/quotas.png?ssl=1)

#### Functions

The [Cloud Platform functions overview tab](https://console.cloud.google.com/functions/list) looks and functions almost exactly the same as the Firebase functions overview tab, but it has one key feature: The ability to delete functions!

[![](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/delete.png?resize=700%2C138&ssl=1)](https://i1.wp.com/blog.jakelee.co.uk/wp-content/uploads/2018/11/delete.png?ssl=1)

## Conclusion

Firebase’s Cloud Functions service is extremely powerful, and should definitely be investigated if looking into server side processing or considering managing a server yourself.

However, for many use cases it can be simpler to perform basic functionality client-side. Afterwards, this data can then be passed straight to Firestore or Database instead of handling it with a function. Additionally, the ability to only write code in JavaScript (or TypeScript, a slightly extended variant) severely limits the usefulness. Many Android developers will have little to no JavaScript experience, so learning a whole new language with a whole host of [unique quirks](https://developer.telerik.com/featured/seven-javascript-quirks-i-wish-id-known-about/) can be a daunting experience.

Before rashly converting all of your node.js servers to cloud functions, consider running a test run. From this, you can see if the response times and quota fit your requirements. You may find that the ability to distribute the load over multiple regions causes unacceptable performance in some regions.

Previous: [Developing Android Apps With Firebase Realtime Database](https://blog.jakelee.co.uk//2018/10/25/developing-android-apps-with-firebase-realtime-database/)

Next: [Developing Android Apps With Firebase Cloud Storage](https://blog.jakelee.co.uk/developing-android-apps-with-firebase-cloud-storage/)