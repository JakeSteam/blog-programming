---
id: 3077
title: 'How to extract a Room list column into a new linked table, migrating data'
date: '2022-01-12T18:00:34+00:00'
permalink: /how-to-extract-a-room-list-column-into-a-new-linked-table-migrating-data/
image: /wp-content/uploads/2022/01/Tp3iZQX.png
categories:
    - 'Android Dev'
tags:
    - Kotlin
    - Room
    - SQLite
    - Migration
---

On a project recently the Room database consisted of a single table with many fields, some of which were `List`s. This was fine, and easy to work with until… it wasn't. We started [seeing an error](https://i.imgur.com/a1Jcd6Y.png) in Crashlytics caused by certain columns exceeding size limits. Uh oh.

The solution was obvious: The biggest column needs to be split out into a new table. Actually doing this however, is a bit trickier…

The end result of this tutorial is [available as a GitHub gist](https://gist.github.com/JakeSteam/831c9ea7962f923a01d451e650918031), it may be helpful to have it open as you proceed through the steps.

## The problem

To summarise the problem using a simplified `Car` example:

- We have an app with a single `Car` table in Room, with many columns.
- One of these columns is a `List<Component>`, containing all the components in the car.
- When serialised, this column is waaaay too big!
- We need to extract this data into a new `Component` table, and link it to our `Car`.

Our `Database.kt` is nothing unusual, and here's how our `Car.kt` starts off looking:

```
@Entity(tableName = "Cars")
data class Car(
    @PrimaryKey
    @ColumnInfo(name = "id")
    val id: String,
    
    @ColumnInfo(name = "colour")
    val colour: String,
    
    @ColumnInfo(name = "components")
    val components: List<Component>
)
```

Whilst our `Component.kt` looks like (vastly simplified!):

```
data class Component(
    val id: String,
    val type: String,
    val description: String,
    val created: Long
)
```

## The solution

So, how are we going to do it?

1. Set up a new `Component` table.
2. Link the `Component`s to our `Car`s.
3. Migrate our data: 
    1. Prepare the database schema changes.
    2. Fetch the existing `Component`s and manipulate them.
    3. Store these `Component`s in our new format.
    4. Tie it all together!

### Step 1: Creating a Component table

The simplest step, just need to add a few annotations [as per the docs](https://developer.android.com/training/data-storage/room#data-entity)! Our `Component` is now:

```
@Entity(tableName = "Component")
data class Component(
    @PrimaryKey
    @ColumnInfo(name = "componentId")
    val componentId: String,
    
    @ColumnInfo(name = "type")
    val type: String,
    
    @ColumnInfo(name = "description")
    val description: String,
    
    @ColumnInfo(name = "created")
    val created: Long
)
```

We also need to make sure our database knows about this new table, and increment our `version`:

```
@Database(
    entities = [CarMetadata::class, Component::class],
    version = 2
)
internal abstract class CarDatabase : RoomDatabase() {
```

### Step 2: Linking Component to Car

First, we need to make sure our `Component` can have a reference to a `Car`, via a new indexed `carId` column:

```
@ColumnInfo(name = "carId", index = true)
val carId: String,
```

Next comes the tricky bit, defining our one-to-many relationship between `Car` and `Component`. The easiest way to do this, again [as per the docs](https://developer.android.com/training/data-storage/room/relationships#one-to-many), is to convert `Car` into a `CarMetadata` entity, and create a new `Car` containing our columns as `@Embedded` or `@Relation` fields.

This will result in the following `Car.kt`:

```
class Car(
    @Embedded
    val metadata: CarMetadata,

    @Relation(
        parentColumn = "id", // The name of the CarMetadata ID field
        entityColumn = "carId" // The name of the Component's car ID field
    )
    var components: List<Component>
)
```

And our `CarMetadata.kt` looks similar to how `Car` did before, except without `components` (as they are handled by the new `Car`)

```
@Entity(tableName = "Cars")
data class CarMetadata(
    @PrimaryKey
    @ColumnInfo(name = "id")
    val id: String,
    
    @ColumnInfo(name = "colour")
    val colour: String
)
```

`Component` also needs to define its link to `CarMetadata`:

```
@Entity(
    tableName = "Component",
    foreignKeys = [ForeignKey(
        entity = CarMetadata::class,
        parentColumns = arrayOf("id"), // The name of the CarMetadata ID field
        childColumns = arrayOf("carId"), // The name of the Component's car ID field
        onDelete = ForeignKey.CASCADE
    )]
)
data class Component(
```

### Step 3.1: Preparing the database schema changes

So, we now have our new database schema set up, we're done right? Well.. not quite. We need to migrate existing users! There's 2 parts to this, migrating the database schema, and migrating the data itself.

Our changes are too complex for Room's [automigrations](https://developer.android.com/training/data-storage/room/migrating-db-versions#automated), but we can use that to get us started. To generate an automigration script (using Room 2.4.0-alpha01 or above):

1. Build the app with our old schema, and `version = 1`.
2. Add `automigrations = [AutoMigration(from = 1, to = 2)]` into the `@Database` annotation.
3. Build the app with our new schema, and `version = 2`.
4. You should now be able to open a Room generated `CarDatabase_AutoMigration_1_2_Impl.java` file, containing Room's best guess at migration.

This migration script contains 2 main parts:

1. A block of SQL to remove our `components`. Due to SQLite limitations, Room actually creates a new table without the column, transfers the data, then deletes the old one!
2. A block of SQL to create our new `Component` table, complete with foreign key link to `Car`, indexes, etc.

We are going to use this as the basis of our manual migration. In our `CarDatabase.kt`, we need to declare our migration when we build the database:

```
Room.databaseBuilder(context.applicationContext, CarDatabase::class.java, "car_database")
    .addMigrations(MIGRATION_1_2)
    .build()
```

The `MIGRATION_1_2` is an object extending `Migration`, containing our custom migration:

```
private val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        // Our code from above goes here!
    }
}
```

Our database is now being migrated, and we have control over the process! Next step, making sure user data survives the trip…

### Step 3.2: Parsing the existing data

Before we remove our `components` column, we need to pull all of the existing data out of it.

To do this, we're going to:

1. Fetch every `Car`‘s `id` and its serialised `List<Component>`.
2. Parse this serialised data back into useful objects.
3. Update every `Component`‘s `carId` so it is linked with the `Car`.
4. Return this list of updated `Component`s.

We'll extract most of this complexity into a `cursorToComponents` function, called via:

```
override fun migrate(database: SupportSQLiteDatabase) {
    val cursor = database.query("SELECT `id`, `components` FROM `Cars`")
    val components = cursorToComponents(cursor)
```

This function is fairly straightforward, hopefully the comments help:

```
private fun cursorToComponents(cursor: Cursor): List<Component> {
    // 1: First get the creation IDs and serialized component lists until there are no more rows
    val carData = arrayListOf<Pair<String, String>>()
    if (cursor.moveToFirst()) {
        val carIdIndex = cursor.getColumnIndex("id")
        val componentsIndex = cursor.getColumnIndex("components")
        do {
            carData.add(Pair(
                cursor.getString(carIdIndex),
                cursor.getString(componentsIndex)
            ))
        } while (cursor.moveToNext())
    }

    // 2: Parse each serialised list of components into objects, and update their carId
    val componentsList = carData.flatMap { carIdAndComponents ->
        ComponentTypeConverter.toComponents(carAndComponents.second).onEach {
            // 3: Update all carIds
            it.creationId = carIdAndComponents.first
        }
    }

    // 4: Return the list of components
    return componentsList
}
```

It's worth mentioning this `ComponentTypeConverter` is a `TypeAdapter`, whatever was previously used to store the `List<Component>` can be reused. The bare minimum needed is:

```
@TypeConverter
@JvmStatic
fun toComponents(jsonComponents: String): List<Component> {
    val componentsType = object : TypeToken<List<Component>>() {}.type
    return Gson().fromJson<List<Component>>(jsonComponents, componentsType)
}
```

### Step 3.3: Storing the updated data

We're nearly there! After step 3.2, we have a list of updated components. Once the schema changes in step 3.1 are performed, we can add our data back in.

To do this, we're unfortunately going to need to manually write some SQL for an `insertComponents` function. We can make this a bit easier, and much safer, by using prepared statements:

```
private fun insertComponents(database: SupportSQLiteDatabase, components: List<Component>) {
    val insertSql = "INSERT INTO " +
            "Component(carId, componentId, type, description, created) " +
            "VALUES (?, ?, ?, ?, ?)"
    val insertStatement = database.compileStatement(insertSql)
    components.forEach { 
        insertStatement.clearBindings()
        insertStatement.bindString(1, it.carId)
        insertStatement.bindString(2, it.componentId)
        insertStatement.bindString(3, it.type)
        insertStatement.bindString(4, it.description)
        insertStatement.bindString(5, it.created)
        insertStatement.executeInsert()
    }
}
```

As you can see, the SQL isn't at all complex, we're just looping through every component object and inserting it in our updated database.

### Step 3.4: Putting the pieces together

All the pieces of the puzzle are now complete! The final step is putting them all in the migration script, in the correct order.

As mentioned previously, we need to pull the existing data, update the schema, then insert our updated data. I also wrapped a try/catch around it, just in case:

```
        private val MIGRATION_1_2 = object : Migration(1, 12) {
            override fun migrate(database: SupportSQLiteDatabase) {
                try {
                    // Extract existing components
                    val cursor = database.query("SELECT `id`, `components` FROM `Cars`")
                    val components = cursorToComponents(cursor)

                    // Make new table without components column, SQLite cannot delete columns
                    database.execSQL("CREATE TABLE IF NOT EXISTS `_new_Cars` ...")
                    database.execSQL("INSERT INTO `_new_Cars` ...")
                    database.execSQL("DROP TABLE `Cars`")
                    database.execSQL("ALTER TABLE `_new_Cars` RENAME TO `Cars`")

                    // Add new table & index
                    database.execSQL("CREATE TABLE IF NOT EXISTS `component` ...")
                    database.execSQL("CREATE INDEX IF NOT EXISTS `index_component_carId` ...")

                    // Insert new components
                    insertComponents(database, components)
                } catch (e: Exception) {
                    // Migration failed, Room will automatically roll back the transaction and retry when DB accessed
                }
            }
        }
```

## Summary

You're done! Of course, there'll likely be some minor issues here and there before it all works flawlessly, and the following section should help with that.

Overall, whilst this solution isn't as neat as it could be, I'm pretty happy that it **works**! I wasn't sure if this migration was possible initially, and hopefully this guide saves others the same trial and error that I did.

If this "extract column into table" process is a regular occurrence there are many potential improvements, such as:

- Better error handling for the entire process, besides a blind try/catch.
- A "Please wait, updating" screen to avoid any user interactions during this process.
- Performing this upgrade as a WorkManager task silently in the background.
- Tidying up the code in general, as it's still fairly "proof of concept".

The finished files are available [as a GitHub gist](https://gist.github.com/JakeSteam/831c9ea7962f923a01d451e650918031), seeing an overview may help. Good luck!

## Potential issues

### Updating existing codebase

Of course, these changes will break some existing code. Most are easy to fix, here's a summary:

- Make sure you update every instance where `Component`s are created to now have a `carId`, otherwise they will become orphaned in the database.
- Every call to `car.type` etc will now need to use `car.metadata.type`.

### Type adapters

Your `Component` class may have lots of custom objects. As these are now being stored in columns, instead of serialised, Room needs to know how to save and load them.

The [Gist has an example](https://gist.github.com/JakeSteam/831c9ea7962f923a01d451e650918031#file-componenttypeconverter-kt) of using Gson to parse complex data, but the Android documentation also shows [how to convert simpler formats](https://developer.android.com/training/data-storage/room/referencing-data#type-converters).

Once your type adapters are set up, you can use them when manually saving data too, e.g.:

```
insertStatement.bindString(17, BackgroundTypeConverter.fromBackground(it.background))
```

### Storing booleans

Room actually stores booleans (and ints) as longs. Because of this, you will need to convert them yourself when saving the data.

Since `true` = `1` and `false` = `0`, this works for boolean conversion:

```
insertStatement.bindLong(10, if (it.isLocked) 1 else 0)
```

You may also encounter some issues with null data types, so make sure none of the prepared statement use nullable data.

### Storing sealed classes

I had some issues storing a sealed class ([one still unresolved](https://stackoverflow.com/q/70606390/608312)), and ended up needing to [register subtypes on my Gson instance](https://stackoverflow.com/a/68628603/608312).

Similarly, I had issues with needing to serialise the type of a sealed class, luckily [fairly easily resolved](https://stackoverflow.com/a/53674494/608312).

### Debugging

It's really, really, really important to **test** this migration extremely carefully. I'd recommend [inspecting your Room database](https://developer.android.com/studio/inspect/database#open) before and after migration multiple times, with every possible combination of your data.

### Transactions &amp; time

One bit that initially tripped me up is the migration will only be performed the first time the **database is accessed**, not on app startup.

The migration process was relatively quick, with &lt;10ms to parse &amp; insert each `Component` meaning a total time of 1-2s. Your time will obviously depend on the data size and complexity, but this approach's speed seems OK for up to 100-200 rows.

Various comments online indicate Room executes migrations in a transaction, however I'm not certain. Assuming this is true, this means any failed migration will automatically rollback, and be tried again the next time the database is accessed.

## Further reading / references

- Full Gist of the solution: <https://gist.github.com/JakeSteam/831c9ea7962f923a01d451e650918031>
- General Room info: <https://developer.android.com/training/data-storage/room>
- Configuring Room one-to-many relationships: <https://developer.android.com/training/data-storage/room/relationships#one-to-many>
- Room automigrations: <https://developer.android.com/training/data-storage/room/migrating-db-versions#automated>
- Using type converters: <https://developer.android.com/training/data-storage/room/referencing-data#type-converters>
- Inspecting your Room database: <https://developer.android.com/studio/inspect/database#open>
- Creating prepared statements: <https://stackoverflow.com/a/29797229/608312>
- Fetching data from a SQLite database: <https://stackoverflow.com/a/56978555/608312>