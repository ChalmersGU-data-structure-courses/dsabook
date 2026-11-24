
## Abstract data types {#intro:abstract-data-types}

An *abstract data type* (ADT) is how we describe what a data structure can do, or what kind of tasks it can be used for.
This is done by specifying what operations can be performed on it, and how these operations should behave.
Note that an ADT does not dictate *how* the operations should be implemented --
this is the duty of a data structure, and multiple data structures are often possible.
By hiding the implementation details from the user, it is possible to change the underlying representation
without changing the API of the abstract data type.
Using abstraction to handle complexity is a core principle throughout computer science.

In a wide sense, any kind of software interface can be called an ADT.
In this book we use ADTs mainly for specifying operations on collections, such as queues, sets or maps.
As an example, we can design a little ADT for *searchable sequences*, supporting the following operations:

`get(seq,i)`
:   Returns the element at position *i* of the sequence *seq*.

`set(seq,i,x)`
:   Sets the element at position *i* to *x*, overwriting the old element.

`search(seq,x)`
:   If *seq* contains *x*, returns its position; otherwise it fails.

Which data structure can we use to implement this ADT -- can all operations be implemented, and are they efficient?
Generally, a specific data structure can relate to an operation in an ADT in three different ways:

* The operation can be implemented efficiently for the data structure.
* The operation can be implemented, but it would be so inefficient compared to
  alternative data structures that using it indicates a bad design choice.
* The operation cannot be implemented at all for the data structure.

In the previous section we introduced the *array* and the *sorted array* as two different data structures.
Can they be used to implement our example ADT, and if so, which one is the best?
Can all three operations be implemented, and how efficient can they be made?

`get(seq,i)`
:   Both arrays and sorted arrays can implement this efficiently, it is simply array indexing.

`set(seq,i,x)`
:   An unordered array can implement setting a position, it is a normal assignment.
    But the operation does not make sense for a sorted array:
    Assume that we call `set(seq,0,4)` on the sorted array $[1,2,3]$ -- what should the result be?
    Changing the first element into a $4$ will break the ordering invariant, because $4>2$.
    But if we sort the array to $[2,3,4]$, it does not comply with the description of the operations.
    After running `set(a,0,4)` we would expect `get(a,0)` to return $4$,
    but after sorting it will return $2$ instead.

`search(seq,x)`
:   This operation can be implemented on both data structures.
    However, with a normal array we will have to use *linear search*
    (see @sec:sorting-1:linear-search), which is very slow.
    A sorted array on the other hand will be several magnitudes faster,
    because we can use *binary search* (see @sec:sorting-1:binary-search).


### The core abstract data types

Most abstract data types are some sort of *collections*, that is, structures that store elements.
We will discuss them in more detail in [Chapter @sec:ADTs],
but the ADTs presented in this book can roughly be categorised in the following groups:

Sequences
:   In a sequence the order between the elements matters, and the operations are sensitive to this order.
    Stacks and queues are the basic ADTs in this group, but there are also double-ended queues and general lists.
    Sequences are introduced in [Chapter @sec:sequences].

Priority queues
:   A priority queue is also a kind of sequence, but it differs in that the order depends on the *priority* of an element.
    Priority queues often have different use cases than sequences,
    and they are implemented using special data structures called *heaps*, so we put them in a separate category.
    Priority queue implementations are discussed in more detail in [Chapter @sec:heaps].

Sets
:   A set is an unordered collection of elements, where an element can only occur once.
    Sets have no inherent order, but instead they are tailor-made for adding, removing and finding elements fast.
    Implementations for sets and maps are discussed in [Chapters @sec:search-trees] [and @sec:hash-tables].

Maps
:   A map (also called a *dictionary*) is often implemented using the same data structures as sets,
    but it represents a function or a mapping from *keys* to *values*.
    One can view a map as a very simple database, where you add, edit, remove values by searching for a key.

Graphs
:   Graphs are used to model relationships between elements,
    where the elements are called *vertices* and the relations are represented by *edges*.
    Graphs and their core algorithms are introduced in [Chapter @sec:graphs].

