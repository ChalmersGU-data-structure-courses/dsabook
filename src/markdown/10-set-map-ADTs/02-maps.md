
## Maps, or dictionaries

A *map* (or dictionary) represents a set of *keys*, where each key has an associated
*value*. We can *add* and *remove* keys, but when we add a key we must
specify what *value* we want to associated with it. We can *check* if a
given key is present in the map. We can also *look up* a key to find the
associated value.

A map cannot contain duplicate *keys*, so each key is associated with
exactly one value. If we call `put(k,v)`, but the key `k` is already
present, then the value associated with `k` gets changed to `v`. On the
other hand, a map *can* contain duplicate *values*: two keys can have
the same value.
Here is a possible minimal interface for maps:

    interface Map of K to V extends Collection of K:
        put(key: K, value: V)        // Sets the value of the given key.
        get(key: K) -> V             // Returns the value associated with the given key, or `null` if the key is not there.
        remove(key: K)               // Removes the value associated with the given key.
        containsKey(key: K) -> Bool  // Returns true if the key has an associated value.

Note that maps depend on two different types, the keys `K` and the values `V`.
These types can be the same or different, depending on the needs of your application.

::: topic
#### Example: Cash register

The map is a perfect match for our supermarket example:

-   *Cash register:* Given a database of all items for sale in a supermarket, find information about the item with a given *EAN code*.

Here, the key should be the EAN code that the barcode scanner recognises, and the value should be a record containing information about the item.
If the EAN code is stored in a field `ean`, then to put an item `p` in the database we call `database.put(p.ean, p)`.
To find the item with barcode `code` we call `database.get(code)`.

    datatype Item
        ean: String
        name: String
        price: Number
        expires: Date

    datatype CashRegister:
        database: Map of String to Item = new Map()

        // Put the item in the database.
        put(p: Item):
            database.put(p.ean, p)

        // Remove an item from the database.
        remove(p: Item):
            database.remove(p.ean)

        // Find the item with the given EAN code.
        find(ean: String) -> Item:
            return database.get(ean)

:::

### Multimaps

Maps have the restriction that each key has only one value. However,
sometimes we want to store a list of records, where some records might
have the same key. Then we want something like a map, but where a key
can have multiple values associated with it. This structure is called a
*multimap*.

Unfortunately, most programming languages do not provide a multimap data
structure. Instead, we can implement it ourselves. The idea is to use a
map, whose value type is a *set* of the actual values that we are interested in.

::: topic
#### Example: Search engine

A multimap is the perfect data structure for our search engine example:

- Given a collection of documents (e.g. web pages), find all web pages containing a given word.

To find all documents containing a given word, we will build a multimap,
where the key is a word, and the values are all documents containing
that word. Then, searching for a word will just mean looking it up in
the multimap.

    // We model a document as a list of words.
    datatype Document:
        contents: Collection of String

    datatype SearchEngine:
        database: Map of String to Set of Document = new Map()

        // Add a new document to the database.
        add(doc: Document):
            for each word in doc.contents:
                if not database.containsKey(word):
                    // This is the first document containing this word.
                    database.put(word, new Set())

                // Get the set of documents containing this word, and add the document.
                set = database.get(word)
                set.add(doc)

        // Find all documents containing a given word.
        find(word: String) -> Set of Document:
            if database.containsKey(word):
                return database.get(word)
            else:
                // If the word is not found, return an empty set.
                return new Set()

Note that we don't have to `put` the updated set back into the database (in the `add` method).
This is because complex data structures are *mutable*, as explained in section XX.

:::
