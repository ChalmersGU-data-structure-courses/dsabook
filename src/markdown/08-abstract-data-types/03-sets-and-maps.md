
## Sets and maps

<!-- NICSMA: START -->
Many programming tasks involve *finding the right piece of information* in a large dataset.
That is, we have a collection of items, and we want to quickly retrieve the items matching certain criteria.
Here are some examples of information retrieval problems:
<!-- NICSMA: END -->

Spell-checking
:   Given a set containing valid English words, check if a given string is a valid word.

Cash register
:   Given a database of everything for sale in a supermarket,
    find information about the item with a given *EAN code*.

Search engine
:   Given a collection of documents, find all documents containing a given word.

These problems can all be addressed using two abstract data types: the *set* and the *map*.
Both provide efficient ways to manage a collection of elements,
supporting operations to find, add, and remove elements.

<!-- NICSMA: START -->
Sets and maps are useful in a huge variety of computer programs,
and are perhaps the most useful of all data structures.
But how can we design a class that implements a set or a map, in such a way that adding,
removing and searching can be done efficiently?
Later we will see several different ways of implementing sets and maps.

-   Just as for priority queues we can implement a set or a map using
    a linked list or a dynamic array.

-   In [Chapter @sec:search-trees], we learn about self-balancing *search trees*,
    a data structure for sets and maps where adding, removing and searching are all efficient.

-   In [Chapter @sec:hash-tables], we learn about *hash tables*,
    which can be even faster than search trees, under some circumstances.-

Search trees and hash tables are the main ways that sets and maps are implemented in practice.
Almost every programming language provides sets and maps as a built-in feature, based on one of these technologies.

### Sets

<!-- NICSMA: START -->
A *set* represents a collection of items, where we can *add* and *remove* items,
and *check* if a given item is present in the set.
A set cannot contain duplicate items:
if we try to add an item that is already present, nothing happens, and the set is left unchanged.
We can specify a minimal interface for sets like this:

    interface Set of K extends Collection:
        add(key: K)               // Adds the key to the set.
        remove(key: K)            // Removes the key from the set, if it is there.
        contains(key: K) -> Bool  // Returns true if the key is in the set.

::: example
#### Example: Spell-checking

We can use a set to create a very simple spell-checker,
like the first example at the beginning of this section.

To create the spell-checking lexicon, we start with an initially empty set,
and then repeatedly *add* each valid word to the set.
Then to spell-check a given word, we just call *contains* on the set.
:::
<!-- NICSMA: END -->

We could also extend the interface with "bulk" operations,
for taking the *union* or *intersection* of two sets.
There are some data structures that can handle operations like that efficiently,
such as the *disjoint-set* data structure (see @sec:disjoint-sets).
But it is very difficult to design data structures that can handle bulk operations,
so we do introduce any interface for them in this introductory text.

### Maps, or dictionaries {#maps}

<!-- NICSMA: START -->
A *map* (or dictionary) represents a set of *keys*, where each key has an associated *value*.
We can *add* and *remove* keys, but when we add a key we must specify what *value* we want to associated with it.
We can *check* if a given key is present in the map, and
we can also *look up* a key to find the associated value.

A map cannot contain duplicate *keys*, so each key is associated with exactly one value.
If we call `put(k,v)`, but the key `k` is already present, then the value associated with `k` gets changed to `v`.
On the other hand, a map *can* contain duplicate *values*: two keys can map to the same value.
<!-- NICSMA: END -->
Here is a possible minimal interface for maps:

    interface Map of K to V extends Collection of K:
        put(key: K, value: V)     // Sets the value of the given key.
        get(key: K) -> V          // Returns the value associated with the given key.
        remove(key: K)            // Removes the value associated with the given key.
        contains(key: K) -> Bool  // Returns true if the key has an associated value.

Note that maps depend on two different types, the keys `K` and the values `V`.
These types can be the same or different, depending on the needs of your application.

::: example
#### Example: Cash register

A map is a perfect match for implementing the *cash register* example from the beginning of this section:
to find information about an item with a given EAN code.

Here, the key should be the EAN code that the barcode scanner recognises,
and the value should be a record containing information about the item.
For example, the information record could be structured like this:

    datatype Item:
        ean: String
        name: String
        price: Number
        expires: Date

Now, to put an item `p` in the database we simply call `database.put(p.ean, p)`,
and to find the item with barcode `code` we call `database.get(code)`.
:::

### Multimaps

<!-- NICSMA: START -->
Maps have the restriction that each key has only one value.
However, sometimes we want to store a list of records, where some records might have the same key.
Then we want something like a map, but where a key can have multiple values associated with it.
This structure is called a *multimap*.
<!-- NICSMA: END -->

Most programming languages do not provide a multimap data structure,
but this is not a serious drawback because we can easily implement it ourselves.
The idea is to use a *map*, whose value type is a *set* of the actual values that we are interested in:

    datatype Multimap of K to V:
        mmap: Map of K to (Set of V)

To add a value to a multimap, we also need to provide its key,
and then we can call `mmap.get(key).add(value)`.
(But note that we also have to handle the case where the key is not in the underlying map yet.)
Other possible operations can be to remove a value (with an associated key),
and to iterate over all values for a given key.

Note that we do not have to `put` the updated set back into the internal map.
This is because complex data structures are *mutable*:
when we update a set it is modified *in-place* -- so it still pointed to by the internal map.

::: example
#### Example: Search engine

The final example from above is a good use case of a multimap, the *search engine*.
First we have to build the database, which is a multimap where the key is a word,
and the values are all document ids containing that word.
Now, searching for a word just means looking it up in the multimap,
which is the same as calling `get` on the underlying map.

<!-- But how do we build this database?
Let us say that we have a list of "documents",
where each document is a pair of the name of the document and a list of all its words.
Building the database now involves to iterate through each word of each document
and add them to the multimap, something like this:

    buildSearchEngine(documents: List(<Name, List(Word)>)) -> Map(Word, Set(Name))
        database = new Multimap()
        for each <name, words> in documents:
            for each word in words:
                database.add(name, word)
        return database
-->
:::
