
## Abstract data types

::: TODO
- Prio 2: analogy with Java interfaces (see preliminaries)
- Prio 3: update the text and examples in section Terminology
:::

Earlier, we introduced the term [data type]{.term}, which refers to a type along with a collection of operations for manipulating values of that type.
For instance, integers form a data type, and addition is an operation that can be performed on them.
These are known as _concrete_ data types, meaning they consist of actual values and a specific implementation.
In contrast, an [abstract data type]{.term} (ADT) does not specify concrete values or implementations.
Instead, it defines a data type purely in terms of a set of operations and the expected behavior of those operations, as determined by their inputs and outputs.
An ADT does not dictate _how_ the operations should be implemented, and multiple implementations are often possible.
These implementation details are hidden from the user—a concept known as [encapsulation]{.term}.
The set of operations offered by an abstract data type is known as its [application programming interface]{.term} (API).

Using an ADT, we can distinguish between the logical behavior of a data type and its actual implementation in a concrete program.
A classic example is the [list]{.term} abstract data type, which support the following set of operations:

    interface List of T:
        add(i: Int, x: T)   // Adds x at position i; where 0 ≤ i ≤ size.
        get(i: Int) -> T    // Returns the element at position i; where 0 ≤ i < size.
        set(i: Int, x: T)   // Replaces the value at position i with x; where 0 ≤ i < size.
        remove(i: Int)      // Removes the element at position i; where 0 ≤ i < size.

A list can be implemented using either an array or a linked list.
Users of a list do not need to know which implementation is used in order to make use of its functionality.
The actual implementations of an ADT rely on specific _data structures_ to realize the desired behavior of the operations -- for example, calculating the size of a list.

Although different implementations of an abstract data type (ADT) offer the same set of operations, the choice of [data structure]{.term} can significantly impact the _efficiency_ of those operations.
Often, there are trade-offs involved: optimizing one operation may come at the cost of another.
For example, an array-based list allows fast access to elements at specific indices, while a linked-list implementation excels at inserting elements at the front.
Furthermore, different applications may prioritize different operations.
One program might frequently perform operation A, while another relies more heavily on operation B.
In such cases, it is often not possible to implement all operations efficiently, so multiple implementations of the same ADT are needed.
Additionally, one implementation may be more efficient for small datasets (thousands of elements), whereas another may scale better for large datasets (millions of elements).
The most suitable data structure depends on the specific use case, and making informed and well-reasoned choices is one of the central goals of this book.

::: topic
#### Example: Collection of records {-}

A _database_ is a structured collection of data that can be easily accessed, managed, and updated.
Each item in a database is typically called a _record_, which consists of multiple fields containing information—such as a name, an ID number, or an address.
Efficiently organizing, storing, and searching these records is a key challenge in database design.

Two popular implementations for managing large disk-based database applications are [hashing]i{.term} and the [B-tree]{.term}.
Both support efficient insertion and deletion of records, as well as exact-match queries.
However, they differ in the types of queries they handle best.
Hashing is particularly efficient for exact-match queries, where you are looking for a record with a specific key.
On the other hand, B-trees are better suited for _range queries_, where you want to retrieve all records with keys within a certain interval.
In such cases, hashing becomes inefficient.

Therefore, if a database application only requires exact-match queries, hashing is typically the better choice.
But if the application needs to support range queries—such as finding all records with values between X and Y—the B-tree is preferred.
Despite their performance differences, both data structures address the same core problem: how to efficiently update and search a large collection of records.
:::

The concept of an ADT can help us to focus on key issues even in non-computing applications.

::: topic
#### Example: Cars {-}

When operating a car, the primary activities are steering, accelerating,
and braking. On nearly all passenger cars, you steer by turning the
steering wheel, accelerate by pushing the gas pedal, and brake by
pushing the brake pedal. This design for cars can be viewed as an ADT
with operations "steer", "accelerate", and "brake". Two cars might
implement these operations in radically different ways, say with
different types of engine, or front- versus rear-wheel drive. Yet, most
drivers can operate many different cars because the ADT presents a
uniform method of operation that does not require the driver to
understand the specifics of any particular engine or drive design. These
differences are deliberately hidden.
:::

The concept of an ADT is one instance of an important principle that must be understood by any successful computer scientist: managing complexity through abstraction.
A central theme of computer science is complexity and techniques for handling it.
Humans deal with complexity by assigning a label to an assembly of objects or concepts and then manipulating the label in place of the assembly.
Cognitive psychologists call such a label a *metaphor*.
A particular label might be related to other pieces of information or other labels.
This collection can in turn be given a label, forming a hierarchy of concepts and labels.
This hierarchy of labels allows us to focus on important issues while ignoring unnecessary details.

::: topic
#### Example: Computers, hard drives, and CPUs {-}

We apply the label "hard drive" to a collection of hardware that
manipulates data on a particular type of storage device, and we apply
the label "CPU" to the hardware that controls execution of computer
instructions. These and other labels are gathered together under the
label "computer". Because even the smallest home computers today have
millions of components, some form of abstraction is necessary to
comprehend how a computer operates.
:::

Consider how you might go about the process of designing a complex
computer program that implements and manipulates an ADT. The ADT is
implemented in one part of the program by a particular data structure.
While designing those parts of the program that use the ADT, you can
think in terms of operations on the data type without concern for the
data structure's implementation. Without this ability to simplify your
thinking about a complex program, you would have no hope of
understanding or implementing it.

<!-- Data types have both a [logical form]{.term} and
a [physical form]{.term}. The definition of the
data type in terms of an ADT is its logical form. The implementation of
the data type as a data structure is its physical form. Sometimes you
might see the term *concrete implementation*, but the word concrete is
redundant. The figure below illustrates this relationship between
logical and physical forms for data types. When you implement an ADT,
you are dealing with the physical form of the associated data type. When
you use an ADT elsewhere in your program, you are concerned with the
associated data type's logical form. Some sections of this book focus
on physical implementations for a given data structure. Other sections
use the logical ADT for the data structure in the context of a
higher-level task.

:::: figure
#### Figure: ADTs, data structures, and data items {-}

<inlineav id="ADTCON" src="Design/ADTCON.js" name="Design/ADTCON" links="Design/ADTCON.css" static/>

The relationship between data items, abstract data types, and data
structures.
:::: -->

<!-- As we saw, the ADT defines the logical form of the data type, while the
data structure implements the physical form of the data type. Users of
an ADT are typically programmers working in the same language as the
implementer of the ADT. Typically, these programmers want to use the ADT
as a component in another application. The interface to an ADT is also
commonly referred to as the Application Programmer Interface, or API,
for the ADT. The interface becomes a form of communication between two
programmers. -->

<!-- ::: topic
#### Example: API for a list class {-}

A particular programming environment might provide a library that
includes a [list]{.term} class. The logical form
of the list is defined by the public functions, their inputs, and their
outputs that define the class. This might be all that you know about the
list class implementation, and this should be all you need to know.
Within the class, a variety of physical implementations for lists is
possible.
::: -->

Most of the abstract data types (ADTs) we introduce in this book are collections, that is, structures that store elements of an arbitrary type.
The earlier example of a list illustrates this: a list is a collection that holds elements, which can be of any type.

We group these collection-based ADTs into two main categories:

- Ordered sequences
- Sets and maps

In addition to these, we also introduce graphs, along with their commonly used implementations.

The rest of this section gives a high-level overview of the ADTs covered throughout the course.
The figure below summarizes these ADTs and highlights how they relate to one another.
Each ADT will be discussed in more detail later in the book, including their operations and the data structures used to implement them.

![An overview of ADTS with their common implementations](resources/images/ADT_overview.png)


### Ordered sequences

Ordered sequences are a category of abstract data types in which the order of the elements matters.
This means that each element has a specific position in the sequence, and operations on the ADT are sensitive to this order.
Insertion, removal, and retrieval operations often depend on the position within the sequence.

The ordered sequence ADTs found in this book are:

- Stacks, a sequence with a Last-In-First-Out (LIFO) ordering
- Queues, a sequence with a First-In-First-Out (FIFO) ordering
- Double-ended queues (deques), which allow insertion and removal at both ends
- Priority queues, return elements based on priority rather than insertion order, but are conceptually related
- General lists, support adding, removing, and accessing elements

Ordered sequences are used in many applications and algorithms where the order of operations or items is important.
For example, maintaining a task list, simulating a line of customers, or a editor’s undo/redo history.

### Sets and maps

#### Use case: Information retrieval

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

#### Sets

A *set* represents a collection of items, where we can *add* and
*remove* items, and *check* if a given item is present in the set. A set
cannot contain duplicate items: if we try to add an item that is already
present, nothing happens, and the set is left unchanged. Recall the
interface for sets from [the course API](#all-adts-used-in-this-book):

    interface Set of T extends Collection of T:
        add(x: T)               // Adds x to the set.
        remove(x: T)            // Removes x from the set.
        contains(x: T) -> Bool  // Returns true if x is in the set.

::: topic
##### Example: Spell-checking {-}

We can use a set for the spell-checking example:

-   Given a set containing all valid English words, check if a given
    string is present in the set (i.e. is a valid word).

To create the spell-checking dictionary, we start with an initially
empty set, and then call `add` repeatedly to add each valid word to the
set. Then to spell-check a given word, we just call `contains`.

    datatype SpellChecker:
        validWords: Set of String

        constructor(listOfValidWords: Collection of String):
            // Convert the list of words into a set.
            validWords = new Set()
            for each word in listOfValidWords:
                validWords.add(word)

        isValidWord(word) -> Bool:
            return validWords.contains(word)

Here's how the `SpellChecker` can be used:

    function main(wordsToCheck: Collection of String):
        // Create a new spell checker.
        checker = new SpellChecker(["cat", "dog"])

        // Now we can spell-check a word easily.
        for each word in wordsToCheck:
            if checker.isValidWord(word):
                print word "is valid"
            else:
                print word "is INVALID"

:::


#### Maps, or dictionaries

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

    interface Map of K to V extends Collection of K:
        put(key: K, value: V)        // Sets the value of the given key.
        get(key: K) -> V             // Returns the value associated with the given key, or `null` if the key is not there.
        remove(key: K)               // Removes the value associated with the given key.
        containsKey(key: K) -> Bool  // Returns true if the key has an associated value.

Note that maps depend on two different types, the keys `K` and the values `V`.
These types can be the same or different, depending on the needs of your application.

::: topic
##### Example: Database lookup {-}

The map is a perfect match for our database example:

-   Given a list of people, find the person with a given *personnummer*.

Here, the key should be a personnummer, and the value should be a record
containing information about that person. If the personnummer is stored
in a field `pnr`, then to put a person `p` in the database we call
`database.put(p.pnr, p)`. To find the person with personnummer `pnr` we
call `database.get(pnr)`.

    datatype Person
        pnr: String
        name: String

    datatype PersonDatabase:
        database: Map of String to Person = new Map()

        // Put the person in the database.
        put(p: Person):
            database.put(p.pnr, p)

        // Remove a person from the database.
        remove(p: Person):
            database.remove(p.pnr)

        // Find the person who has a given personnummer.
        find(pnr: String) -> Person:
            return database.get(pnr)

:::

#### Multimaps

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
##### Example: Search engine {-}

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


#### How to implement sets and maps

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


#### Sorted sets and maps


::: topic
##### Use case: Between X and Y {-}

Consider the final example problem:

-   Given a list of all Swedish towns and their populations, find the
    towns whose population is between 5,000 and 10,000.

One way to solve this problem would be to use a multimap. The key would
be a population number, and the values would be all towns having that
population. Then we could find the required towns by making a sequence
of calls to `contains`:

-   `contains(5000)` - find all towns with 5,000 population
-   `contains(5001)` - find all towns with 5,001 population
-   `contains(5002)` - find all towns with 5,002 population
-   etc.

But this is not a sensible approach. We would need to make \~5,000 calls
to `contains`, and if we wanted to instead find all cities in Europe
having a population of between 1 and 2 million, we would need to make
\~1,000,000 calls.

There is a better way. If the towns are stored in an array, and sorted
by population, we can use the following algorithm:

-   Find the position in the array of the *first* town that has a
    population of *at least* 5,000. (We will see in the section about
    [binary search] that it
    is possible to find this position efficiently.)
-   Find the position in the array of the *last* town that has a
    population of *at most* 10,000.
-   Now return all towns between those two positions in the array.

:::

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

Here is a possible interface for sorted maps:

    interface SortedMap of K to V extends Map of K to V:
        firstKey() -> K              // Returns the first (smallest) key.
        lastKey() -> K               // Returns the last (largest) key.
        floorKey(key: K) -> K        // Returns the closest key ≤ k, or nothing if there is no key.
        ceilingKey(key: K) -> K      // Returns the closest key ≤ k, or nothing if there is no key.
        lowerKey(key: K) -> K        // Returns the closest key < k, or nothing if there is no such element.
        higherKey(key: K) -> K       // Returns the closest key > k, or nothing if there is no such element.
        keysBetween(key1: K, key2: K) -> Collection of K
                                     // Returns all keys k such that k1 ≤ k ≤ k2.

::: topic
##### Example: Small Swedish towns {-}

Here is how to use a sorted map ADT to find all Swedish towns having
between 5,000 and 10,000 population. As there may be towns that have the
same population, we need a *multimap*. As before, we solve this by
having the key be a population number and the value be a set of towns.

    datatype City:
        name: String
        population: Int

    // Similar to the search engine, use a map where the value is a list of cities.
    datatype CityPopulations:
        cities: SortedMap of Int to Set of City = new SortedMap()

        // Add a new city to the database.
        add(city: City):
            if not cities.containsKey(city.population):
                // This is the first city with this population.
                    cities.put(city.population, new Set())

            // Get the set of documents containing this city.
            set = cities.get(city.population)
            set.add(doc)

        // Find all cities with a population between lower and upper
        findBetween(lower: Int, upper: Int) -> Set of City:
            result = new Set()
            // The range query returns a collection of keys, i.e. populations.
            for each population in cities.keysBetween(lower, upper):
                // cities.get(population) returns the list of cities with that population.
                for each city in cities.get(population):
                    result.add(city)
            return result

:::


### Graphs

::: TODO
- examples, use cases
- Terminology: vertices/nodes, edges, directed/undirected, weighted/unweighted (negative weights)
- quickly: MST, shortest path, topological order
- Implementations: adjacency list, adjacency matrix
:::

#### Edges, vertices

    datatype Edge of V:
        start: V              // start vertex
        end: V                // end vertex
        weight: Float = 1.0   // weight, defaults to 1.0


#### ADTs for graphs

    interface Graph of V:
        addVertex(v: V)                 // Adds the vertex v to the graph.
        addEdge(e: Edge of V)           // Adds the edge e to the graph.
        vertices() -> Collection of V   // Returns a Collection of all vertices in the graph.
        outgoingEdges(v: V) -> Collection of Edge of V
                                        // Returns a Collection of the edges that originates in vertex v.
        vertexCount() -> Int            // Returns the number of vertices in the graph.
        edgeCount() -> Int              // Returns the number of edges in the graph.


##### Use case(s) / examples


### Comparison with standard libraries

#### The standard Java API

The standard Java API can be found here (this is Java SE 11):
<https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/package-summary.html>. Here is a quick comparison
beteween the interfaces we have defined above, and the most similar ones
that are defined in the standard Java API:

Iterable, Collection, List:

:   These interfaces are similar to
    [Iterable](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Iterable.html),
    [Collection](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Collection.html)
    and
    [List](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)
    in the standard Java API, but with fewer methods.

Stack:

:   The main difference is that we define it as an interface
    (because there are several possible implementations), but it's a
    single class
    [Stack](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Stack.html)
    in the Java standard.

Queue:

:   The Java API has an interface
    [Queue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Queue.html)
    which uses different method names.

PriorityQueue:

:   We define priority queues as an interface
    (because there are several possible implementations), but in the
    Java API it's a single class
    [PriorityQueue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/PriorityQueue.html)
    that implements their
    [Queue](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Queue.html)
    interface. So the method names are different too.

Set, SortedSet, Map, SortedMap:

:   These interfaces are similar to
    [Set](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Set.html),
    [SortedSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/SortedSet.html),
    [Map](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)
    and
    [SortedMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/SortedMap.html)
    in the Java API, but with fewer methods. Also, some methods are
    simpler than the corresponding ones in the Java API.

Graph:

:   There is no interface (or class) for graphs in the standard Java API.


#### The Python standard library

