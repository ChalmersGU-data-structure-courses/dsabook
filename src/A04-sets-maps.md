
## Information retrieval: Sets and Maps

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
    find all web pages containing a given word.
-   *Between X and Y:* Given a list of all Swedish towns and their
    populations, find the towns whose population is between 1,000 and
    2,000.

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

### Spell-checking: Sets

A *set* represents a collection of items, where we can *add* and
*remove* items, and *check* if a given item is present in the set. A set
cannot contain duplicate items: if we try to add an item that is already
present, nothing happens, and the set is left unchanged. Recall the
interface for sets from [the course API](#all-adts-used-in-this-book):

```python
class Set(Collection):
    def add(self, x):      """Adds x to the set. Returns true if the element wasn't already in the set."""
    def remove(self, x):   """Removes x from the set. Returns true if the element was in the set."""
    def contains(self, x): """Returns true if x is in the set."""
    # Note: __iter__() can yield the elements in any order.
```

We can use a set for the spell-checking example:

-   Given a set containing all valid English words, check if a given
    string is present in the set (i.e. is a valid word).

To create the spell-checking dictionary, we start with an initially
empty set, and then call `add` repeatedly to add each valid word to the
set. Then to spell-check a given word, we just call `contains`.

```python
class SpellChecker:
    def __init__(self, list_of_valid_words):
        # Convert the list of words into a set.
        self.set_of_valid_words = Set()
        for word in list_of_valid_words:
            self.set_of_valid_words.add(word)

    def is_valid_word(self, word):
        return self.set_of_valid_words.contains(word)

if __name__ == '__main__':
    # Create a new spell checker.
    checker = SpellChecker(["cat", "dog"])

    # Select some words to spell check. 
    # If there are no command-line arguments, default to testing "dog" and "kat".
    list_of_words_to_check = sys.argv[1:] if len(sys.argv) > 1 else ["dog", "kat"]

    # Now we can spell-check a word easily.
    for word in list_of_words_to_check:
        if checker.is_valid_word(word):
            print(word, "is valid")
        else:
            print(word, "is INVALID")
```

### Database lookup: Maps

A *map* represents a set of *keys*, where each key has an associated
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

```python
class Map(Iterable):
    def put(self, key, value):  """Sets the value of the given key. Returns the previous value, or None."""
    def get(self, key):         """Returns the value associated with the given key, or None if the key is not there."""
    def remove(self, key):      """Removes and returns the value associated with the given key, or None if there is no key."""
    def containsKey(self, key): """Returns true if the key has an associated value."""
    def isEmpty(self):          """Returns true if there are no keys."""
    def size(self):             """Returns the number of keys (i.e., the number of key/value pairs)."""
    # Note: __iter__() can yield the keys in any order.
```

The map is a perfect match for our database example:

-   Given a list of people, find the person with a given *personnummer*.

Here, the key should be a personnummer, and the value should be a record
containing information about that person. If the personnummer is stored
in a field `pnr`, then to put a person `p` in the database we call
`database.put(p.pnr, p)`. To find the person with personnummer `pnr` we
call `database.get(pnr)`.

```python
class Person:
    def __init__(self, pnr, name):
        self.pnr  = pnr    # personnummer
        self.name = name   # person's name

class PersonDatabase:
    def __init__(self):
        self.database = Map()

    def put(self, p):
        """Put the person in the database."""
        self.database.put(p.pnr, p)

    def remove(self, p):
        """Remove a person from the database."""
        self.database.remove(p.pnr)

    def find(self, pnr):
        """Find the person who has a given personnummer."""
        return self.database.get(pnr)
```

### Search engine: Multimaps

Maps have the restriction that each key has only one value. However,
sometimes we want to store a list of records, where some records might
have the same key. Then we want something like a map, but where a key
can have multiple values associated with it. This structure is called a
*multimap*.

Unfortunately, most programming languages do not provide a multimap data
structure. Instead, we can implement it ourselves. The idea is to use a
map, where the key is a word, and the value is not a document but a
*set* of documents.

A multimap is the perfect data structure for our search engine example:

-   Given a collection of documents (e.g. web pages), find all web pages
    containing a given word.

To find all documents containing a given word, we will build a multimap,
where the key is a word, and the values are all documents containing
that word. Then, searching for a word will just mean looking it up in
the multimap.

```python
# We model a document as a list of words.
class Document:
    def __init__(self, contents):
        self.contents = contents

class SearchEngine:
    def __init__(self):
        self.database = Map()

    def add(self, doc):
        """Add a new document to the database."""
        for word in doc.contents:
            # Get the set of documents containing this word.
            set = self.database.get(word)
            if set is None:
                # This is the first document containing this word.
                set = Set()

            # Add the document to the set.
            set.add(doc)
            self.database.put(word, set)

    def find(self, word):
        """Find all documents containing a given word."""
        if self.database.containsKey(word):
            return self.database.get(word)
        else:
            # If the word is not found, return an empty set rather than None.
            return Set()
```

### Between X and Y: Sorted Sets and Maps

Consider the final example problem:

-   Given a list of all Swedish towns and their populations, find the
    towns whose population is between 1,000 and 2,000.

One way to solve this problem would be to use a multimap. The key would
be a population number, and the values would be all towns having that
population. Then we could find the required towns by making a sequence
of calls to `contains`:

-   `contains(1000)` - find all towns with 1,000 population
-   `contains(1001)` - find all towns with 1,001 population
-   `contains(1002)` - find all towns with 1,002 population
-   etc.

But this is not a sensible approach. We would need to make \~1,000 calls
to `contains`, and if we wanted to instead find all cities in the USA
having a population of between 1 and 2 million, we would need to make
\~1,000,000 calls.

There is a better way. If the towns are stored in an array, and sorted
by population, we can use the following algorithm:

-   Find the position in the array of the *first* town that has a
    population of *at least* 1,000. (We will see in the section about
    [binary search] that it
    is possible to find this position efficiently.)
-   Find the position in the array of the *last* town that has a
    population of *at most* 2,000.
-   Now return all towns between those two positions in the array.

This is an example of a *range query*: given a map, finding all items
whose key lies in a given range. Some map implementations support
answering range queries efficiently; we say that these data structures
implement *sorted maps*.

Apart from range queries, sorted maps support several other operations
that take advantage of the natural order of the keys:

-   Finding the *smallest* or *largest* key in the map.

-   Finding the *closest* key to a given one. Given a key $k$ (which may
    or may not be in the map), then:

    -   The *successor* of $k$ is the next key after $k$ in the map,
        i.e. the smallest key $k\prime$ such that $k < k\prime$.
    -   The *predecessor* of $k$ is the previous key before $k$ in the
        map, i.e. the greatest key $k\prime$ such that $k\prime < k$.

    A variant which is sometimes useful is *floor* and *ceiling*:

    -   The *floor* of $k$ is the greatest key $k\prime$ such that
        $k\prime \leq k$. If $k$ is in the map, then the floor of $k$ is
        just $k$; otherwise it is the predecessor of $k$.
    -   The *ceiling* of $k$ is the least key $k\prime$ such that
        $k \leq k\prime$. If $k$ is in the map, then the ceiling of $k$
        is just $k$; otherwise it is the successor of $k$.

Recall the interface for sorted maps from
[the course API](#all-adts-used-in-this-book):

```python
class SortedMap(Map):
    def firstKey(self):                """Returns the first (smallest) key. Raises an exception if the map is empty."""
    def lastKey(self):                 """Returns the last (largest) key. Raises an exception if the map is empty."""
    def floorKey(self, key):           """Returns the closest key <= k, or None if there is no key."""
    def ceilingKey(self, key):         """Returns the closest key >= k, or None if there is no key."""
    def lowerKey(self, key):           """Returns the closest key < k, or None if there is no such element."""
    def higherKey(self, key):          """Returns the closest key > k, or None if there is no such element."""
    def keysBetween(self, key1, key2): """Returns all keys k such that k1 <= k <= k2."""
    # Note: __iter__() should yield the keys in order.
```

As well as a sorted map, it is also possible to have a *sorted set*.
Recall the interface for sorted sets from
[the course API](#all-adts-used-in-this-book):

```python
class SortedSet(Set):
    def first(self):            """Returns the first (smallest) element. Raises an exception if the set is empty."""
    def last(self):             """Returns the last (largest) element. Raises an exception if the set is empty."""
    def floor(self, x):         """Returns the closest element <= x, or None if there is no such element."""
    def ceiling(self, x):       """Returns the closest element >= x, or None if there is no such element."""
    def lower(self, x):         """Returns the closest element < x, or None if there is no such element."""
    def higher(self, x):        """Returns the closest element > x, or None if there is no such element."""
    def between(self, x1, x2):  """Returns all elements x such that x1 <= x <= x2."""
    # Note: __iter__() should yield the elements in order.
```

Here is how to use a sorted map ADT to find all Swedish towns having
between 1,000 and 2,000 population. As there may be towns that have the
same population, we need a *multimap*. As before, we solve this by
having the key be a population number and the value be a set of towns.

```python
class City:
    def __init__(self, name, population):
        self.name = name
        self.population = population

class CityPopulations:
    # Similar to the search engine, use a map where the value is a list of cities.
    def __init__(self):
        self.cities = SortedMap()

    def add(self, city):
        """Add a new city to the database."""
        # Get the set of documents containing this city
        set = self.cities.get(city.population)
        if set is None:
            # This is the first city with this population
            set = Set()

        # Add the city to the set
        set.add(city)
        self.cities.put(city.population, set)

    def findBetween(self, lower, upper):
        """Find all cities with a population between lower and upper"""
        result = Set()
        # The range query returns a set of keys, i.e. populations.
        for population in self.cities.keysBetween(lower, upper):
            # cities.get(population) returns the list of cities with that population.
            for city in self.cities.get(population):
                result.add(city)
        return result
```

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
