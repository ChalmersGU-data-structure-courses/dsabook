
## Maps, or dictionaries {#maps}

A *map* (or dictionary) represents a set of *keys*, where each key has an associated *value*.
We can *add* and *remove* keys, but when we add a key we must specify what *value* we want to associated with it.
We can *check* if a given key is present in the map.
We can also *look up* a key to find the associated value.

A map cannot contain duplicate *keys*, so each key is associated with exactly one value.
If we call `put(k,v)`, but the key `k` is already present, then the value associated with `k` gets changed to `v`.
On the other hand, a map *can* contain duplicate *values*: two keys can map to the same value.
Here is a possible minimal interface for maps:

    interface Map of K to V extends Collection of K:
        put(key: K, value: V)        // Sets the value of the given key.
        get(key: K) -> V             // Returns the value associated with the given key, or `null` if the key is not there.
        remove(key: K)               // Removes the value associated with the given key.
        containsKey(key: K) -> Bool  // Returns true if the key has an associated value.

Note that maps depend on two different types, the keys `K` and the values `V`.
These types can be the same or different, depending on the needs of your application.

::: example
#### Example: Cash register

A map is a perfect match for implementing a cash register in a supermarket:

-   Given a database of all items for sale in a supermarket,
    find information about the item with a given *EAN code*.

Here, the key should be the EAN code that the barcode scanner recognises,
and the value should be a record containing information about the item.
For example, the information record could be structured like this:

    datatype Item
        ean: String
        name: String
        price: Number
        expires: Date


Now, to put an item `p` in the database we simply call `database.put(p.ean, p)`,
and to find the item with barcode `code` we call `database.get(code)`.

:::

### Multimaps

Maps have the restriction that each key has only one value.
However, sometimes we want to store a list of records, where some records might have the same key.
Then we want something like a map, but where a key can have multiple values associated with it.
This structure is called a *multimap*.

Most programming languages do not provide a multimap data structure,
but this is not a serious drawback because we can easily implement it ourselves.
The idea is to use a *map*, whose value type is a *set* of the actual values that we are interested in:

    datatype Multimap of K to V:
        internalMap: Map of K to (Set of V)

To add a value to a multimap, we also need to provide its key,
and then we can call `internalMap.get(key).add(value)`.
(But note that we also have to handle the case where the key is not in the underlying map yet.)
Other possible operations can be to remove a value (with an associated key),
and to iterate over all values for a given key.

Note that we don't have to `put` the updated set back into the internal map.
This is because complex data structures are *mutable*, as explained in @sec:programming-preliminaries.

::: example
#### Example: Search engine

As a good use case of a multimap we can use a search engine:

-   Given a collection of documents (such as, web pages),
    find all documents containing a given word.

To find all documents containing a given word, we will build a multimap where the key is a word,
and the values are all documents containing that word.
Then, searching for a word will just mean looking it up in the multimap using the normal *map* get method.

But how do we build this database?
Let us say that we have a list of "documents",
where each document is a pair of the name of the document and a list of all its words.
Building the database now involves to iterate through each word of each document
and add them to the multimap, something like this:

    function buildSearchEngine(documents: List(<Name, List(Word)>)) -> Map(Word, Set(Name))
        database = new Multimap()
        for each <name, words> in documents:
            for each word in words:
                database.add(name, word)
        return database

:::
