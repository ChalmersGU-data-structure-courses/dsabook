
## ADTs for sets and maps

### Use case: Information retrieval

Many programming tasks involve *finding the right piece of information*
in a large dataset. That is, we have a collection of items, and we want
to quickly retrieve the items matching certain criteria. Here are some
examples of information retrieval problems:

-   *Spell-checking:* Given a set containing all valid English words,
    check if a given string is present in the set (i.e. is a valid
    word).
-   *Database lookup:* Given a list of people, find the person with a
    given *personnummer*.
-   *Search engine:* Given a collection of documents (e.g. web pages),
    find all documents containing a given word.
-   *Between X and Y:* Given a list of all Swedish towns and their
    populations, find the towns whose population is between 5,000 and
    10,000.

All of these problems can be solved using two ADTs, the *set* and the
*map*. Both ADTs can be used to maintain a collection of *records*. They
provide operations for finding records, adding records, and removing
records from the collection. In this section we will see what sets and
maps are, and how to use them to solve the four problems above.

You may have already used sets and maps in programming, because almost
every programming language provides an implementation for them. For
example, Java provides the
[HashSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashSet.html)
and
[HashMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashMap.html)
classes, and Python provides
[sets](https://docs.python.org/3/tutorial/datastructures.html#sets) and
[dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)
(another word for maps) as part of its standard library.

### Sets

A *set* represents a collection of items, where we can *add* and
*remove* items, and *check* if a given item is present in the set. A set
cannot contain duplicate items: if we try to add an item that is already
present, nothing happens, and the set is left unchanged. Recall the
interface for sets from [the course API](#all-adts-used-in-this-book):

    interface Set extends Collection:
        add(x)       // Adds x to the set. Returns true if the element wasn't already in the set.
        remove(x)    // Removes x from the set. Returns true if the element was in the set.
        contains(x)  // Returns true if x is in the set.

::: topic
#### Example: Spell-checking {-}

We can use a set for the spell-checking example:

-   Given a set containing all valid English words, check if a given
    string is present in the set (i.e. is a valid word).

To create the spell-checking dictionary, we start with an initially
empty set, and then call `add` repeatedly to add each valid word to the
set. Then to spell-check a given word, we just call `contains`.

    class SpellChecker:
        SpellChecker(listOfValidWords):
            // Convert the list of words into a set.
            this.setOfValidWords = new Set()
            for each word in listOfValidWords:
                this.setOfValidWords.add(word)

        isValidWord(word):
            return this.setOfValidWords.contains(word)

    function main(listOfWordsToCheck):
        // Create a new spell checker.
        checker = new SpellChecker(["cat", "dog"])

        // Now we can spell-check a word easily.
        for each word in listOfWordsToCheck:
            if checker.isValidWord(word):
                print(word, "is valid")
            else:
                print(word, "is INVALID")

:::

### Maps, or dictionaries

A *map* (or dictionary) represents a set of *keys*, where each key has an associated
*value*. We can *add* and *remove* keys, but when we add a key we must
specify what *value* we want to associated with it. We can *check* if a
given key is present in the map. We can also *look up* a key to find the
associated value.

A map cannot contain duplicate *keys*, so each key is associated with
exactly one value. If we call `put(k,v)`, but the key `k` is already
present, then the value associated with `k` gets changed to `v`. On the
other hand, a map *can* contain duplicate *values*: two keys can have
the same value. Recall the interface for maps from
[the course API](#all-adts-used-in-this-book):

    interface Map extends Iterable:
        put(key, value)   // Sets the value of the given key. Returns the previous value, or nothing.
        get(key)          // Returns the value associated with the given key, or nothing if the key is not there.
        remove(key)       // Removes and returns the value associated with the given key, or nothing if there is no key.
        containsKey(key)  // Returns true if the key has an associated value.
        isEmpty()         // Returns true if there are no keys.
        size()            // Returns the number of keys (i.e., the number of key/value pairs).

::: topic
#### Example: Database lookup {-}

The map is a perfect match for our database example:

-   Given a list of people, find the person with a given *personnummer*.

Here, the key should be a personnummer, and the value should be a record
containing information about that person. If the personnummer is stored
in a field `pnr`, then to put a person `p` in the database we call
`database.put(p.pnr, p)`. To find the person with personnummer `pnr` we
call `database.get(pnr)`.

    class Person:
        Person(pnr, name):
            this.pnr  = pnr    // personnummer
            this.name = name   // person's name

    class PersonDatabase:
        PersonDatabase():
            this.database = new Map()

        put(p):
            // Put the person in the database.
            this.database.put(p.pnr, p)

        remove(p):
            // Remove a person from the database.
            this.database.remove(p.pnr)

        find(pnr):
            // Find the person who has a given personnummer.
            return this.database.get(pnr)

:::

### Multimaps

Maps have the restriction that each key has only one value. However,
sometimes we want to store a list of records, where some records might
have the same key. Then we want something like a map, but where a key
can have multiple values associated with it. This structure is called a
*multimap*.

Unfortunately, most programming languages do not provide a multimap data
structure. Instead, we can implement it ourselves. The idea is to use a
map, where the key is a word, and the value is not a document but a
*set* of documents.

::: topic
#### Example: Search engine {-}

A multimap is the perfect data structure for our search engine example:

-   Given a collection of documents (e.g. web pages), find all web pages
    containing a given word.

To find all documents containing a given word, we will build a multimap,
where the key is a word, and the values are all documents containing
that word. Then, searching for a word will just mean looking it up in
the multimap.

    class Document:
        // We model a document as a list of words.
        Document(contents):
            this.contents = contents

    class SearchEngine:
        SearchEngine():
            this.database = new Map()

        add(doc):
            // Add a new document to the database.
            for each word in doc.contents:
                // Get the set of documents containing this word.
                set = this.database.get(word)
                if set is null:
                    // This is the first document containing this word.
                    set = new Set()

                // Add the document to the set.
                set.add(doc)
                this.database.put(word, set)

        find(word):
            // Find all documents containing a given word.
            if this.database.containsKey(word):
                return this.database.get(word)
            else:
                // If the word is not found, return an empty set.
                return new Set()

:::


### How to implement sets and maps

Sets and maps are useful in a huge variety of computer programs, and are
perhaps the most useful of all data structures. But how can we design a
class that implements a set or a map, in such a way that adding,
removing and searching can be done efficiently? In this book we will see
several different ways of implementing sets and maps.

In Chapter [Arrays: Searching and Sorting],
we will see how to implement a set using an array. By
sorting the items in the array, it is possible to look up information
efficiently. However, it turns out that adding and removing items is
quite expensive. An array is a suitable way of storing a set or a map if
its contents never changes.

In Chapter [Search Trees](#binary-search-trees), we learn about
*balanced binary search trees (BSTs)*, a data structure for sets and
maps where adding, removing and searching are all efficient. BSTs also
support the *sorted map* operations that we used in our final example.

In Chapter [Hash Tables](#hashing), we learn about
*hash tables*, another way to implement the set and map ADTs. In a hash
table, `add`, `remove` and `contains` are even faster than in a BST, but
hash tables are somewhat harder to use than BSTs, and do not support the
*sorted map* operations.

Balanced BSTs and hash tables are the main ways that sets and maps are
implemented in practice. Almost every programming language provides sets
and maps as a built-in feature, based on one of these technologies. For
example, Java's
[HashSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashSet.html),
[HashMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashMap.html),
[TreeSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/TreeSet.html)
and
[TreeMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/TreeMap.html),
and Python's:
[sets](https://docs.python.org/3/tutorial/datastructures.html#sets) and
[dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries).
By the end of this book you will understand how all of these work.

