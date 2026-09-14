
## Data structures and abstract data types {#intro:DS-and-ADT}

We write programs to solve problems.
This might sound obvious, but sometimes we forget this and do not analyse the problem properly.
Returning to the comparison between linear search and binary search,
the comparison is not entirely fair since they solve two subtly different problems,
the problem of searching an array versus the problem of searching a sorted array.

If we ignore the problem analysis, the risk is that we apply a data structure that is inappropriate for the task,
just because it is familiar to us and we have used it before.
A very common example of this is using a list data structure (like a dynamic array)
where a set data structure (like a hash set) would be more suitable.
Another common example is using a sorted array where a heap would suffice.
Each of these data structures and the operations they efficiently support are explained in this book.
The result of making the wrong choice is usually a slow program,
or a program that uses too much memory, or both.

On the other hand, sometimes we can adopt a data structure that is unnecessarily complex.
This data structure might be very efficient for some very difficult problems,
but if we will not encounter these problems it might be better to use a simpler data structure,
that for example uses less memory.

1.  Analyse your problem to determine the operations that must be supported.
    Examples of operations include inserting or deleting items, and searching in the data structure.
2.  State the constraints for each operation -- how much (time or space) resources it is allowed to use?
3.  Select the data structure that best meets these requirements.

The main idea with this three-step approach is that we analyse the *data* and what we want to do with the data.
When we have done this it becomes easier to decide the representation of the data,
and after that we can start developing the algorithms.

When analysing your problem and the data, the following three questions can help you deciding which data structure to use.

1.  How do you insert items into the data structure?
    If all items are inserted simultaneously and then never modified, we have a *static* application.
    Then we can often select a simpler data structure
    than if we have a *dynamic* application where the data is updated during the course of the program.
2.  Can items be deleted or modified?
    If so, you will probably need a more complicated data structure.
3.  Do you process the data in some well-defined order,
    or will you search for any kind of items at any time?
    Being able to search efficiently generally requires more complex data structures.

As an example, a sorted array is excellent data structure for representing a
static set of elements. We sort the array once when the application starts,
and then we can perform efficient binary searches throughout the runtime of
the application. If the content of the set needs to change during execution,
the situation is drastically different. Inserting a value into a sorted
array is a time consuming operation, so a different data structure is needed.

No data structure is inherently best for all tasks.
Every data structure presented in this book has practical applications where they
are the most suitable choice.



### Abstract data types {#intro:abstract-data-types}

An *abstract data type* (ADT) is how we describe what a data structure can do, or what kind of tasks it can be used for.
This is done by specifying what operations that can be performed on it, and how these operations should behave.
Note that an ADT does not dictate *how* the operations should be implemented, and multiple implementations are often possible.
By hiding the implementation details from the user, it is possible to change the underlying representation or an algorithm,
without changing the API of the abstract data type.
Using abstraction to handle complexity is a core principle throughout computer science.


In a wide sense, any kind of software interface can be called an ADT.
In this book we use ADTs mainly for specifying operations on collections such as lists or sets.
An operation would be something like `contains(x)`
that determines if a value $x$ is in the collection.
Generally, a specific data structure (like an array) can
relate to an operation in an ADT in three different ways:

* The operation can be implemented efficiently for the data structure.
* The operation can be implemented, but it would be so inefficient compared to
  alternative data structures that using it indicates a bad design choice.
* The operation cannot be implemented at all for the data structure.

Consider these three operations for collections of values:

`get(c,i)`
:   returns the value on position $i$ of the collection $c$.

`set(c,i,x)`
:   sets the value of position $i$ to $x$, overwriting the previous value.

`contains(c,x)`
:   answers true if and only if $c$ contains $x$.

The operations form a little ADT for *sequences*, collections where elements have positions.
Consider these operations on the similar data structures of *arrays* and *sorted arrays*
(an array with an ordering invariant: elements are and must remain sorted in increasing order).
Can the operations be implemented on both data structures,
and how efficient can they be made?

`get`
:   Both arrays and sorted arrays can implement `get` efficiently, it is simply array indexing.

`set`
:   A general array can implement `set`, but the operation does not make sense for a sorted array.
    Calling `set(a,0,4)` on the sorted array $a=[1,2,3]$ cannot give $[4,2,3]$,
    since that breaks the ordering invariant.
    If `set` shuffles things around around to $[2,3,4]$, it does not comply with the description of `set` and `get`.
    After running `set(a,0,4)` we would expect `get(a,0)` to give $4$, not $2$.

`contains`
:   This operation can be implemented on both data structures,
    but it will be much faster on a sorted array, since we can use binary search.


#### The core abstract data types

Most of abstract data types are some sort of *collections*, that is, structures that store elements.
The ADTs we discuss in this book can be categorised in the following groups.

Sequences
:   In a sequence the order between the elements matters, and the ADT operations are sensitive to this order.
    Stacks and queues are the basic ADTs in this group, but there are also double-ended queues (deques), and general lists.
    Sequences are introduced in [Chapter @sec:sequences].

Priority queues
:   A priority queue is also a kind of sequence, but it differs in that the order depends on the *priority* of an element.
    Priority queues often have different use cases than sequences,
    and they are implemented using special data structures, so we put them in a separate category.
    Priority queues are discussed in more detail in [Chapter @sec:trees].

Sets
:   A set is an unordered collection of elements, where an element can only occur once.
    Sets have no inherent order, but instead they are tailor-made for adding, removing and finding elements fast.
    Implementations for sets and maps are discussed in [Chapters @sec:search-trees;Chapters @sec:hash-tables].

Maps
:   A map (or *dictionary*) is often implemented using the same data structures as sets,
    but it represents a *function* or a *mapping* from keys to values.
    One can view a map as a very simple database, where you add, edit, remove values by searching for a key.

Graphs
:   Graphs are used to model relationships between elements,
    where the elements are called *vertices* and and the relations are represented by *edges*.
    Graphs and their core algorithms are introduced in [Chapter @sec:graphs].

We will discuss abstract data types in more detail in [Chapter @sec:ADTs].
