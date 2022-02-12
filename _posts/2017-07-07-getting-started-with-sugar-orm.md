---
id: 1456
title: 'Getting Started with Sugar ORM'
date: '2017-07-07T11:40:25+01:00'
author: 'Jake Lee'
layout: post
guid: 'http://gamedevalgorithms.com/?p=1456'
permalink: /getting-started-with-sugar-orm/
categories:
    - 'Android Dev'
tags:
    - Database
    - Java
    - ORM
    - SugarORM
    - Tutorial
---

[Sugar](https://github.com/chennaione/sugar) is a very easy to use ORM library used to make handling databases on Android hassle-free. Whilst it lacks some features, it is ideally suited to smaller projects due to the simple syntax.

There is [official documentation](http://satyan.github.io/sugar/getting-started.html), but it misses a few key points, so this article will serve as an alternative “Getting Started” guide. It also highlights a few vital options that aren’t mentioned in the official guide, and is geared towards those new to Android who want an easy way to setup a local database.

## Setting Up

Setting up Sugar is very straightforward, and contains just three simple steps.

#### 1. Adding the library

As with any other Gradle library, add the following to your `build.gradle` dependencies, and perform a rebuild (Android Studio will prompt to do this automatically). This will let us reference the library’s functionality:

```
compile <span class="pl-s"><span class="pl-pds">'</span>com.github.satyan:sugar:1.5<span class="pl-pds">'</span></span>
```

#### 2. Connecting app to Sugar

So that Sugar can run when the application starts, and perform other tasks, it needs to be created and destroyed when the application is, not an individual activity. To do this, we need to make a new class that extends `Application`, which we can then use to initialise Sugar and other services. I generally put this file outside of any subfolders in the project structure, but it can go anywhere.

```

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        SugarContext.init(this);
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        SugarContext.terminate();
    }
}
```

Now that we have our `MainApplication` class, we need to define it in the `AndroidManifest.xml`. To do this, just add / modify the `android:name=` attribute on `` to point to `.MainApplication`. If you placed the new class in a subfolder, it will be at `.Subfolder.MainApplication`:

```

<application
    android:name=".MainApplication"
```

#### 3. Configuring options

Final step! All that’s left to do is configure a few options. These are all inside the `<application` tag in `AndroidManifest.xml` in the format ``:

| Name | Value | Description |
|---|---|---|
| DATABASE | yourapp.db | The name of your database file. This can be anything, but it’s generally simpler to just use your app’s name. |
| VERSION | 1 | The version of your database. Update this when you add new columns / tables to automatically update your database. |
| QUERY\_LOG | false | Whether every query should be written to the log. This can slow down your app, but can be useful during development. |
| DOMAIN\_PACKAGE\_NAME | com.yourpackagename.model | Where your entities are stored. It’s cleanest to use a subfolder that only contains these classes. |

That’s it, you’re good to go! The rest of this guide will cover creating your entities / model, and basic usage.

## Using Sugar

#### Creating entities

In this example, we’ll use a simple table with just an `id` and a `text`.

```

@Table(name="mytable")
public class Text extends SugarRecord {
    @Column(name = "a") private Long id;
    @Column(name = "b") private String text;

    public Text() {}

    public Text(Long id, String text) {
        this.id = id;
        this.text = text;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
```

The first thing to look at is the most important, the `extends SugarRecord`. This lets Sugar know that this is a database table. In this example, we’ve used `@Table(name=` to tell Sugar to save the table under “mytable” instead.

Next, we declare the columns we want to include, and create getters and setters for them. As before, we can use `@Table(name=` to set a custom name if desired. Note that `id` is the built-in Sugar primary key, hence the `@Override`. It can optionally be included in your schema, or handled invisibly by Sugar.

Finally, we add a constructor with all parameters, and one with none. A constructor taking no parameters is **required** by Sugar ORM, and the table will not be usable without it. All of the getters / setters / constructors can be created by Android Studio by pressing `Alt` + `Insert` inside the class.

#### Saving data

Data can be saved by creating a new instance of the object, and calling `.save()` on it. This can also be included in your constructor if auto-save is desired.

```

Text text = new Text(1, "Example text");
text.setText("New test");
text.save();
```

#### Loading data

Data can be loaded from the database by id, using the query builder, or directly using SQL. All 3 of the following examples return the same result, the `Text` object with `id` 1.

1. Using primary key `id`: ```
    Text.findById(Text.class, 1);
    ```
2. Using query builder: ```
    Select.from(Text.class)
            .where(
                    Condition.prop("a").eq(1)
            ).first();
    ```
3. Using SQL: ```
    Text.find(Text.class, "a = 1").get(0);
    ```

Note that the 2nd and 3rd methods return a `List`, and we’re selecting the first record. The correct method to use depends on the situation, but looking rows up by their primary key is generally a good idea if possible for performance reasons.

## Conclusion

I’ve personally used Sugar for a few of my projects, such as [Pixel Blacksmith](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmith) and [Blacksmith Slots](https://play.google.com/store/apps/details?id=uk.co.jakelee.blacksmithslots), and found the simple syntax and speedy performance very helpful. However, colleagues have used it on more complex projects and found it lacking, so it may not be suitable for large scale commercial projects.

It also doesn’t receive many updates, but as it is relatively bug free due to the simple nature of it, this is less of an issue. Unfortunately it seems support and repository maintenance are lacking, but I still strongly recommend it for smaller projects.

As a reminder, there is [official documentation](http://satyan.github.io/sugar/index.html), and some [further reading on the repository](https://github.com/chennaione/sugar) which may be helpful to refer to.

All code used in this article is [available as a Gist](https://gist.github.com/JakeSteam/f813265fba2cec06be08051e304cf191).