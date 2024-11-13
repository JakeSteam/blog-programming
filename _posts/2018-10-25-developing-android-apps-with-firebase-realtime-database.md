---
id: 1806
title: "Developing Android Apps With Firebase Realtime Database"
date: "2018-10-25T21:20:24+01:00"
permalink: /developing-android-apps-with-firebase-realtime-database/
image: /wp-content/uploads/2018/10/f6fuu6w.png
categories:
  - "Android Dev"
tags:
  - Firebase
  - Kotlin
  - "Realtime Database"
---

Firebase Realtime Database is the more traditional predecessor to [Firestore](/developing-android-apps-with-firebase-cloud-firestore/), and is essentially a way to store data as JSON and sync it between all clients / servers. Google have also [provided a full comparison](https://cloud.google.com/datastore/docs/firestore-or-datastore).

Note that the JSON structured format can be quite limiting, and often requires thinking outside the box to make your existing data format fit inside it.

This post is part of [The Complete Guide to Firebase](/search/?q=firebase). Throughout this tutorial, you'll need access to the [Firebase Realtime Database dashboard](https://console.firebase.google.com/project/_/database), and the [official documentation](https://firebase.google.com/docs/database/android/start/) may be useful too.

## Implementation

As always, the entire [Firebase Reference Project is open source](https://github.com/JakeSteam/FirebaseReference), and there is a [pull request for adding Firebase Realtime Database](https://github.com/JakeSteam/FirebaseReference/pull/4) if you just want to see the code changes required.

This tutorial assumes you already have [Firebase added to your project](/adding-firebase-to-an-android-project/).

### Setting up

As Google recommends Cloud Firestore, it can be a little tricky to actually create the traditional Realtime Database. On [the Fireside Database page](https://console.firebase.google.com/u/0/project/_/database), scroll down to the Realtime Database banner and select "Create database".  
![f6fuu6w](/wp-content/uploads/2018/10/f6fuu6w.png)

Create the database in **test mode**, making sure to set up proper access control later on before the app gets released to a wider audience.

Next, add the dependency to your app-level `build.gradle` file:

```groovy
implementation 'com.google.firebase:firebase-database:16.0.3'
```

That's it, it's implemented!

### Getting data

Setting up an automatic data change listener is the most convenient way to be notified on any data changes, including when the activity / fragment starts up. To do this, select the specific node to be monitored, and add a listener. In the following example, the node "nestedData" is used:

```
     FirebaseDatabase.getInstance().getReference("nestedData").addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                displayData(dataSnapshot.value.toString())
            }

            override fun onCancelled(error: DatabaseError) {
                showToast("Failed to read value: ${error.toException()}")
            }
        })
```

As all data is stored as a giant JSON object, advanced filtering is not possible. Child nodes can be directly selected, for example `.getReference("nestedData").child("childNode")`, and there is some limited filtering available ([official documentation](https://firebase.google.com/docs/database/android/lists-of-data)).

#### Filtering

A few filtering methods are available, but are limited to selecting the first or last x results, or displaying results where a value is above, below, or equal to a specified value. These can also be combined, the table below explains these further:  
![filtering](/wp-content/uploads/2018/10/jrj4qpj.png)

#### Ordering

Additionally, child nodes **can** be ordered somewhat, by using `.orderByKey`, `.orderByValue`, or `.orderByChild("xyz")`. This can be combined with the previously described filtering methods, but only one ordering technique can be used at once.

### Inserting data

One advantage of Realtime Database is it can serialise your objects into JSON for you, keeping all parameter names intact. The examples below use the data class `DataRow`, a simple class containing just `uuid` and `number`:

```
data class DataRow(val uuid: String, val number: String)
```

Additionally, `nestedData` is the node all operations are performed on, a reference to it is obtained via `FirebaseDatabase.getInstance().getReference("nestedData")`.

#### Automatic ID

To get Firebase to automatically create an ID, `.push()` to a node, then retrieve the key immediately afterwards. This new child node can then be written to.

```
val key = nestedData.push().key
key?.let {
    nestedData.child(key).setValue(DataRow("thisisauuid", 1234))
}
```

This child node will now be saved under a random ID inside `nestedData`, with a key similar to "-LPc3jx0y-Hg6aITpvw2".

#### Manual ID

To manually set the ID, just write to your desired ID and the node will be created for you. This can be used for multiple levels of nesting to instantly create a multi-node data structure.

```
nestedData.child("collection").child("group").setValue(DataRow("anotheruuid, 4321"))
```

### Updating data

Updating data is almost identical to adding new rows, you just need to set the new value of a node. The example below loops through every returned node, retrieves the key, then uses that to get a reference to the updateable node. It then sets the "uuid" value to the current value, except with an asterisk before it.

The `.addListenerForSingleValueEvent()` listener is important, as it stops any future data changes (such as the current update!) triggering the listener again.

```kotlin
nestedData.addListenerForSingleValueEvent(object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            for (postSnapshot in dataSnapshot.children) {
                val child = nestedData.child(postSnapshot.key.toString()).child("uuid")
                val existingUuid = postSnapshot.child("uuid").value
                child.setValue("*$existingUuid")
            }
        }
```

### Deleting data

Again, deleting data is very similar to updating it. The easiest way to remove data is to simply set it to null. That's it!

For example, to wipe everything inside `nestedData`:

```
nestedData.setValue(null)
```

## Web interface

The web interface for Realtime Database allows reading / modifying the stored data, managing access rules, as well as enabling backups and monitoring usage.

### Data tab

This tab allows adding, editing, and deleting nodes. It's also possible to create new nested data, and is a good way to form the basic data structure before beginning programmatically adding data.  
![data tab](/wp-content/uploads/2018/10/pib8cpx.png)

### Rules tab

The rules tab handles security for your database. These aren't covered in this tutorial, but [the official documentation](https://firebase.google.com/docs/database/security) is very comprehensive.

### Backups tab

This tab is only useful on Blaze or above plans, and will allow you to start a manual backup or manage existing automatic backups. These will be compressed using GZip by default.

### Usage tab

This tab provides information on the recent usage of your database. It is updated every minute, and is an excellent way to get a quick overview of system load, and upgrade plans if necessary.  
![usage tab](/wp-content/uploads/2018/10/vukqkat.png)

## Conclusion

Whilst Realtime Database's node based architecture is perfect for some projects, its features pale in comparison to the more modern Cloud Firestore. As such, it's hard to recommend Realtime Database for any new projects, except those that already have a node-based data structure.

The offline data caching and syncing between all clients is as powerful as ever, but I find it hard to see any benefits over Firestore.

Previous: [Developing Android Apps With Firebase Cloud Firestore](/developing-android-apps-with-firebase-cloud-firestore)

Next: [Developing Android Apps With FIrebase Cloud Functions](/developing-android-apps-with-firebase-cloud-functions/)
