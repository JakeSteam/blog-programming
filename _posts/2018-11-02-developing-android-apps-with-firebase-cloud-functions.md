---
id: 1926
title: 'Developing Android Apps With Firebase Cloud Functions'
date: '2018-11-02T17:12:58+00:00'
permalink: /developing-android-apps-with-firebase-cloud-functions/
image: /wp-content/uploads/2018/11/functions.png
categories:
    - 'Android Dev'
tags:
    - 'Cloud Functions'
    - Firebase
    - JavaScript
    - Kotlin
---

Firebase Cloud Functions provide an easy way to execute JavaScript on Google’s servers, and call this code from your own apps. It removes the need to manually manage any sort of server, and can be up and running very quickly. Firebase’s free plan is somewhat limited, and cannot make network requests to other servers, but it can do plenty of processing.

This post is part of [The Complete Guide to Firebase](/search/?q=firebase). Throughout this tutorial, you’ll need access to the [Firebase Cloud Functions dashboard](https://console.firebase.google.com/u/0/project/_/functions/list), and the [official documentation](https://cloud.google.com/functions/docs/) may be useful too.

## Implementation

As always, the entire [Firebase Reference Project is open source](https://github.com/JakeSteam/FirebaseReference), and there is a [pull request for adding Firebase Cloud Functions](https://github.com/JakeSteam/FirebaseReference/pull/5) if you just want to see the code changes required. Additionally, the hosted functions code is [available as a repository](https://github.com/JakeSteam/FirebaseCloudFunctions).

This tutorial assumes you already have [Firebase added to your project](/adding-firebase-to-an-android-project/).

### Setting up Firebase Cloud Functions environment

1. First [install npm &amp; node.js](https://www.npmjs.com/get-npm), used to handle the Firebase installation process.
2. Next, open a Command Prompt and enter `npm install -g firebase-tools`, after a few minutes you should see something similar to the following image:[![](/wp-content/uploads/2018/11/2.png)](/wp-content/uploads/2018/11/2.png)
3. Next, login to your Firebase account using `firebase login`. This will open a browser with a login request. Once logged in, the Command Prompt will report success.[![](/wp-content/uploads/2018/11/yZ61qY0.png)](/wp-content/uploads/2018/11/yZ61qY0.png)
4. Next run `firebase init functions`, which will ask you a few questions about your setup. Click any of the following items to view a screenshot of the installation at that point. 
    1. [The project to use](https://i.imgur.com/WD5ZNUk.png), I chose my Firebase Reference Project.
    2. [The language to use](https://i.imgur.com/taBpPWI.png), I chose JavaScript.
    3. [Whether style checker ESLint should be used &amp; dependencies should be installed](https://i.imgur.com/h6b7TFp.png), I chose “Yes” to both.
5. You should now have a project folder containing a few files and folders. `functions/index.js` is the most important file, as it contains your functions’ actual code. Open this file up and uncomment the lines relating to `export.helloWorld`.

That’s it, your local environment is now fully setup, and you’ve got a “Hello World” function ready to deploy!

### Deploying Firebase Cloud Functions

To deploy or update your functions, enter `firebase deploy –only functions` to your Command Prompt whilst inside your project directory. On Windows machines, this will fail by default due to a slightly faulty configuration ([this error specifically](https://stackoverflow.com/questions/48345315/error-deploying-with-firebase-on-npm-prefix-resource-dir-run-lint)):

[![](/wp-content/uploads/2018/11/7.png)](/wp-content/uploads/2018/11/7.png)

Luckily, fixing this is just a case of opening your firebase.json and replacing `\\"$RESOURCE\_DIR\\"` with `./functions/`. Save the changes, enter `firebase deploy –only functions` again, and it should now successfully deploy:

[![](/wp-content/uploads/2018/11/8.png)](/wp-content/uploads/2018/11/8.png)

Our Hello World function is now ready to call! Visiting the URL outputted (<https://us-central1-fir-referenceproject.cloudfunctions.net/helloWorld>) will display whatever message our Cloud Function in `index.js` was set to output. You now have a cloud-hosted function, congratulations! Time to make your own…

### Creating a Cloud Function

You may have noticed the existing Hello World functions inside `index.js` uses `functions.https.onRequest`. This means it can be visited / called like a normal webpage, and has `Content-Type` headers etc. Whilst you can get URL parameters from these methods (using `request.query.text`), it’s safer to provide actual functions that can be called remotely. There’s a reason it’s called Cloud **Functions**!

We’re going to create a function that receives a phone’s manufacturer’s name from the app, converts it to uppercase, and then returns it to be shown in the app. This is obviously a pretty useless function that would usually be handled entirely inside the app, but it’s a simple way to show passing data back and forth.

To do this, use `functions.https.onCall` instead, which can also receive a data object with any additional parameters you’ve chosen to send. We’re going to receive a manufacturer parameter, so first check it has a length, then convert whatever it contains to uppercase and return it. Add the following into your `index.js`:

```
exports.uppercaseDeviceName = functions.https.onCall((data) => {
    if (data.manufacturer.length > 0) {
        return data.manufacturer.toUpperCase();
    }
    return "Unknown";
});
```

Save and redeploy the functions, and your custom function is now ready to be called. Note that to return data we just used `return x`, instead of the `response.send(x)` required by `onRequest` functions. Google’s example `index.js`> contains [more complex examples](https://github.com/firebase/quickstart-js/blob/master/functions/functions/index.js) that may be useful for further work.

Time to programmatically call our new function from inside an app!

### Calling Cloud Functions from an Android app

First, add the Firebase Cloud Functions dependency in your app-level `build.gradle` file and perform a sync:

```groovy
implementation 'com.google.firebase:firebase-functions:16.1.2'
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

In the example app, this is triggered inside an `onClick()`.

Due to Firebase already knowing which project you’re calling (due to the `google-services.json`), just passing the function’s name is enough to call the function. Pretty cool, right? If you encounter problems in getting a response from the server, the “Web interface” part of this post covers how to view server logs containing any runtime errors. ESLint should also alert you on deployment if your code contains incorrect syntax, helpful if JavaScript isn’t one of your core languages.

### Automatically triggering Cloud Functions

Whilst both the Hello World and Uppercase Manufacturer Name functions in this tutorial were triggered on demand, it’s also possible to automatically call cloud functions when an event happens. Using Google’s example, you could trigger functions when a new image is uploaded to Firebase Storage to store the location in Firebase Database, and create a thumbnail of the image using an external API.

[![](/wp-content/uploads/2018/11/intensive.png)](/wp-content/uploads/2018/11/intensive.png)

To set up these triggers, define your function as a listener instead of an `onCall` or `onRequest`. For example, [Cloud Firestore](https://blog.jakelee.co.uk/developing-android-apps-with-firebase-cloud-firestore/) has `onCreate`, `onUpdate`, `onDelete`, and `onWrite` listeners. Set these up in your index.js as if they were a normal function:

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

[![](/wp-content/uploads/2018/11/dashboard.png)](/wp-content/uploads/2018/11/dashboard.png)

#### Health

The Health tab shows an overview of your functions’ error rates and overall performance (times invoked, latency, memory usage, network usage). Checking this regularly can help you stay on track of any errors, and provide a quick health check of your functions.

[![](/wp-content/uploads/2018/11/performance.png)](/wp-content/uploads/2018/11/performance.png)

#### Logs

The Logs tab provides a simple log viewer, that can be used for basic analysis of any runtime issues encountered. Logs can be searched, and filtered by function, log level, and time period. These are very useful when experiencing issues with your functions, as a full stack trace will appear here.

[![](/wp-content/uploads/2018/11/logs.png)](/wp-content/uploads/2018/11/logs.png)

#### Usage

This tab displays a simple chart of total invocations in a selected date range, and a link to your current quota. As it is essentially a repeat of the Health tab, it’s not included here!

### Google Cloud Platform

As Cloud Functions technically run on Google Cloud, some statistics can only be viewed there. After visiting the links, make sure to select the correct project using the dropdown at the top of the page.

#### Dashboard

[The dashboard page](https://console.cloud.google.com/apis/dashboard) shows a more comprehensive overview of all your Google Cloud services, and their recent performance.

[![](/wp-content/uploads/2018/11/dashboard-1.png)](/wp-content/uploads/2018/11/dashboard-1.png)

#### Quotas

[The quotas page](https://console.cloud.google.com/apis/api/cloudfunctions.googleapis.com/quotas) shows your functions’ usage against all applicable resource limits. For example, your plan is subject to read limits, write limits, CPU limits, traffic limits, DNS limits, build time limits, etc. You should occasionally check the graphs on this page to make sure no functions are misbehaving.

[![](/wp-content/uploads/2018/11/quotas.png)](/wp-content/uploads/2018/11/quotas.png)

#### Functions

The [Cloud Platform functions overview tab](https://console.cloud.google.com/functions/list) looks and functions almost exactly the same as the Firebase functions overview tab, but it has one key feature: The ability to delete functions!

[![](/wp-content/uploads/2018/11/delete.png)](/wp-content/uploads/2018/11/delete.png)

## Conclusion

Firebase’s Cloud Functions service is extremely powerful, and should definitely be investigated if looking into server side processing or considering managing a server yourself.

However, for many use cases it can be simpler to perform basic functionality client-side. Afterwards, this data can then be passed straight to Firestore or Database instead of handling it with a function. Additionally, the ability to only write code in JavaScript (or TypeScript, a slightly extended variant) severely limits the usefulness. Many Android developers will have little to no JavaScript experience, so learning a whole new language with a whole host of [unique quirks](https://developer.telerik.com/featured/seven-javascript-quirks-i-wish-id-known-about/) can be a daunting experience.

Before rashly converting all of your node.js servers to cloud functions, consider running a test run. From this, you can see if the response times and quota fit your requirements. You may find that the ability to distribute the load over multiple regions causes unacceptable performance in some regions.

Previous: [Developing Android Apps With Firebase Realtime Database](/developing-android-apps-with-firebase-realtime-database/)

Next: [Developing Android Apps With Firebase Cloud Storage](/developing-android-apps-with-firebase-cloud-storage/)