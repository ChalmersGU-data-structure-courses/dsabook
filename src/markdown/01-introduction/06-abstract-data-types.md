
## Abstract data types, ADT

::: TODO
- Prio 1: write sections Ordered seqs, Sets&maps, Graphs
- Prio 1: nice image showing all ADTs (and DSs) - see the slides
- Prio 2: overview and motivation
- Prio 2: analogy with Java interfaces (see preliminaries)
- Prio 3: update the text and examples in section Terminology
:::


Here we list all abstract data types that we will introduce in this
course book. Together they form an API (application programming
interface) for this book.

Don't worry about understanding the different interfaces now, they will
be explained in detail later on.

**Important Java note**: There are many similarities, but also some
differences, between the API below and the interfaces and classes in the
"standard" Java API. For more details about the differences, please
see the end of this chapter.

**Important Python note**: Python doesn't make use of abstract classes
(interfaces) in the same way as Java does. Instead they use a concept
called [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing), which
means that it's enough to just implement the required methods -- you
don't need a formal interface. However, in this course book we will still
pretend that there are interfaces, even in Python.



### Terminology and definitions

This section presents terminology and definitions related to techniques
for managing the tremendous complexity of computer programs. It also
presents working definitions for the fundamental but somewhat slippery
terms "[data item]{.term}" and
"[data structure]{.term}". We begin with the
basic elements on which data structures are built.

#### Type {-}

A [type]{.term} is a collection of values. For
example, the Boolean type consists of the values `true` and `false`. The
integers also form a type. An integer is a
[simple type]{.term} because its values contain
no subparts. A bank account record will typically contain several pieces
of information such as name, address, account number, and account
balance. Such a record is an example of an
[aggregate type]{.term} or [composite type]{.term}.
A [data item]{.term} is a piece of information or
a record whose value is drawn from a type. A data item is said to be a
[member]{.term} of a type.

#### Data type {-}

A [data type]{.term} is a type together with a
collection of operations to manipulate the type. For example, an integer
variable is a member of the integer data type. Addition is an example of
an operation on the integer data type.

A distinction should be made between the logical concept of a data type
and its physical implementation in a computer program. For example,
there are two traditional implementations for the [list]{.term} data type:
the [linked list]{.term} and the [array-based list]{.term}.
The list data type can therefore
be implemented using a linked list or an array. But we don't need to
know how the list is implemented when we wish to use a list to help in a
more complex design. For example, a list might be used to help implement
a [graph data structure](#graph-implementations).

As another example, the term "array" could refer either to a data type
or an implementation. "Array" is commonly used in computer programming
to mean a contiguous block of memory locations, where each memory
location stores one fixed-length data item. By this meaning, an array is
a physical data structure. However, array can also mean a logical data
type composed of a (typically homogeneous) collection of data items,
with each data item identified by an index number. It is possible to
implement arrays in many different ways besides as a block of contiguous
memory locations. The
[sparse matrix]{.term} refers to a large, two-dimensional array that stores only a
relatively few non-zero values. This is often implemented with a linked
structure, or possibly using a [hash table](#hashing). But
it could be implemented with an interface that uses traditional row and
column indices, thus appearing to the user in the same way that it would
if it had been implemented as a block of contiguous memory locations.

#### Abstract data type {-}

An [abstract data type]{.term} (ADT) is the
specification of a data type within some language, independent of an
implementation. The interface for the ADT is defined in terms of a type
and a set of operations on that type. The behavior of each operation is
determined by its inputs and outputs. An ADT does not specify *how* the
data type is implemented. These implementation details are hidden from
the user of the ADT and protected from outside access, a concept
referred to as [encapsulation]{.term}.

#### Data structure {-}

A [data structure]{.term} is the implementation
for an ADT. In an object-oriented language, an ADT and its
implementation together make up a [class]{.term}. Each operation associated with the ADT is implemented by a
[member function]{.term} or
[method]{.term}. The variables that define the
space required by a data item are referred to as
[data members](#data-member){.term}. An
[object]{.term} is an instance of a class, that
is, something that is created and takes up storage during the execution
of a computer program.

The term [data structure]{.term} often refers to
data stored in a computer's main memory. The related term
[file structure]{.term} often refers to the
organization of data on peripheral storage, such as a disk drive or CD.

::: topic
#### Example: Integers {-}

The mathematical concept of an integer, along with operations that
manipulate integers, form a data type. The `int` variable type is a
physical representation of the abstract integer. The `int` variable
type, along with the operations that act on an `int` variable, form an
ADT. Unfortunately, the `int` implementation is not completely true to
the abstract integer, as there are limitations on the range of values an
`int` variable can store. If these limitations prove unacceptable, then
some other representation for the ADT "integer" must be devised, and a
new implementation must be used for the associated operations.
:::

::: topic
#### Example: Lists of integers {-}

An ADT for a list of integers might specify the following operations:

1.  Insert a new integer at a particular position in the list.
2.  Return `true` if the list is empty.
3.  Reinitialize the list.
4.  Return the number of integers currently in the list.
5.  Retrieve the integer at a particular position in the list.
6.  Delete the integer at a particular position in the list.

From this description, the input and output of each operation should be
clear, but the implementation for lists has not been specified.
:::

There are often several possible implementations of the same ADT. The
reason for this is that it is usually not possible to implement all
operations efficiently, and often there is a trade off: As an example,
it could be the case that you can make operation A or B efficient, but
not both. And some applications might use A more often than B, while
other applications use B more often. Another example is that one
implementation could be efficient for small datasets (thousands of
elements), while another implementation is more efficient for large
datasets (millions of elements). Therefore there is usually a need for
several different implementations of the same ADT.

::: topic
#### Example: Collections or records {-}

Two popular implementations for large disk-based database applications
are [hashing] and
the [B-tree]{.term}. Both
support efficient insertion and deletion of records, and both support
exact-match queries. However, hashing is more efficient than the B-tree
for exact-match queries. On the other hand, the B-tree can perform range
queries efficiently, while hashing is hopelessly inefficient for range
queries. Thus, if the database application limits searches to
exact-match queries, hashing is preferred. On the other hand, if the
application requires support for range queries, the B-tree is preferred.
Despite these performance issues, both implementations solve versions of
the same problem: updating and searching a large collection of records.
:::

The concept of an ADT can help us to focus on key issues even in
non-computing applications.

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

The concept of an ADT is one instance of an important principle that
must be understood by any successful computer scientist: managing
complexity through abstraction. A central theme of computer science is
complexity and techniques for handling it. Humans deal with complexity
by assigning a label to an assembly of objects or concepts and then
manipulating the label in place of the assembly. Cognitive psychologists
call such a label a *metaphor*. A particular label might be related to
other pieces of information or other labels. This collection can in turn
be given a label, forming a hierarchy of concepts and labels. This
hierarchy of labels allows us to focus on important issues while
ignoring unnecessary details.

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

::: topic
#### Example: Disk-based databases {-}

Consider the design for a relatively simple database system stored on
disk. Typically, records on disk in such a program are accessed through
a [buffer pool]{.term} rather than directly. Variable length records might use a
[memory manager]{.term} to find an appropriate location within the disk file to
place the record. Multiple [index structures](#indexing){.term}
will typically be used to support access to a collection of records
using multiple [search keys](#search-key){.term}. Thus, we have a chain of classes, each with its own
responsibilities and access privileges. A database query from a user is
implemented by searching an index structure. This index requests access
to the record by means of a request to the buffer pool. If a record is
being inserted or deleted, such a request goes through the memory
manager, which in turn interacts with the buffer pool to gain access to
the disk file. A program such as this is far too complex for nearly any
human programmer to keep all of the details in their head at once. The
only way to design and implement such a program is through proper use of
abstraction and metaphors. In object-oriented programming, such
abstraction is handled using classes.
:::

Data types have both a [logical form]{.term} and
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
::::

As we saw, the ADT defines the logical form of the data type, while the
data structure implements the physical form of the data type. Users of
an ADT are typically programmers working in the same language as the
implementer of the ADT. Typically, these programmers want to use the ADT
as a component in another application. The interface to an ADT is also
commonly referred to as the Application Programmer Interface, or API,
for the ADT. The interface becomes a form of communication between two
programmers.

::: topic
#### Example: API for a list class {-}

A particular programming environment might provide a library that
includes a [list]{.term} class. The logical form
of the list is defined by the public functions, their inputs, and their
outputs that define the class. This might be all that you know about the
list class implementation, and this should be all you need to know.
Within the class, a variety of physical implementations for lists is
possible.
:::

![Overview of common Abstract Data Types (ADTs)](resources/images/ADT_overview.png)

### Ordered sequences

    interface Collection of T:
        // We assume that we can iterate over the elements in the collection, using a for loop.

        // The number of elements in this collection.
        size: Int

        // Returns true if the collection is empty.
        isEmpty() -> Bool:
            return size == 0

#### Use case(s)


#### Stacks

::: TODO
- Special cases of lists
- examples, use cases
- Restricted list ADTs
- makes it possible to use optimised implementations
- e.g., circular queues
- deque = double-ended queue = stack + queue
- Implementations: linked lists, dynamic arrays
:::

    interface Stack of T extends Collection of T:
        push(x: T)     // Pushes x on top of the stack.
        pop() -> T     // Pops the top of the stack and returns it.
        peek()  -> T   // Returns the top element, without removing it.

#### Queues

    interface Queue of T extends Collection of T:
        enqueue(x: T)    // Enqueues x at the end of the queue.
        dequeue() -> T   // Dequeues the frontmost element.
        peek() -> T      // Returns the frontmost element, without removing it.

#### Double-ended queues

#### Priority queues

::: TODO
- Similar API as stacks/queues, but returning different element
- sorted arrays - makes insertion expensive
- unsorted arrays - makes removal expensive
- Implementations: heaps, etc.
:::

    interface PriorityQueue of T extends Collection of T:
        add(x: t)          // Adds x to the priority queue.
        removeMin() -> T   // Removes and returns the minimum element.
        getMin() -> T      // Returns the minimum element, without removing it.


#### General lists

::: TODO
- examples, use cases
- Implementations: dynamic arrays, linked lists
- refer forward
- several possible interfaces
:::

    interface List of T extends Collection of T:
        add(i: Int, x: T)   // Adds x at position i; where 0 ≤ i ≤ size.
        get(i: Int) -> T    // Returns the element at position i; where 0 ≤ i < size.
        set(i: Int, x: T)   // Replaces the value at position i with x; where 0 ≤ i < size.
        remove(i: Int)      // Removes the element at position i; where 0 ≤ i < size.



### Sets and maps

::: TODO
- Implementations: arrays, hash tables
:::

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

