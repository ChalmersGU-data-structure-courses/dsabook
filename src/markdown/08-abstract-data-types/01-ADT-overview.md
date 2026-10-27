
## Introduction to Abstract Data Types {#ADTs:overview}

::: TODO
- Prio 1: do we need the code in the beginning?
:::

A classic example of an ADT is the *stack*, which supports the following operations:

    interface Stack of T:
        push(stack, x: T)        // Pushes x on the top of the stack
        pop(stack) -> T          // Pops the top element off the stack and returns it
        isEmpty(stack) -> Bool   // Tells if the stack is empty or not

As discussed in [Chapter @sec:sequences], a stack can be implemented using either a dynamic array or a linked list.
Using the terminology from object-oriented programming,
dynamic arrays and linked lists are two separate *classes* that implements the stack interface.

Often we can distinguish between *core* and *auxiliary* operations of an ADT.
The core operations are the ones that define the "essence" of the data type,
while the auxilary operations might simplify some use cases, but are not essential.
For the example of stacks, here are some common auxiliary operations:

    interface Stack of T:
        (...)
        size(stack) -> Int   // Returns the number of elements on the stack
        peek(stack) -> T     // Returns the top element, but does not remove it


Although different implementations of an abstract data type offer the same operations,
the choice of data structure can significantly impact the *performance* of those operations.
Often, there are trade-offs involved: optimising one operation may come at the cost of another.

The most suitable data structure depends on the specific use case,
and it is important that you can make informed and well-reasoned choices when it comes to selecting what data structure to use.

::: {.example #ex:databases}
#### Example: Databases

A _database_ is a structured collection of data that can be easily accessed, managed, and updated.
Efficiently organising, storing, and searching the records in a database is a key challenge in database design.

Two popular implementations for managing large disk-based database applications are
*hash tables* ([Chapter @sec:hash-tables]) and *search trees* ([Chapter @sec:search-trees]).
Both support efficient insertion and deletion of records, as well as different kinds of queries.
However, they differ in the types of queries they handle best.
Hash tables are particularly efficient for exact-match queries, where you are looking for a record with a specific key.
On the other hand, B-trees are better suited for _range queries_, where you want to retrieve all records with keys within a certain interval.
:::

There are many different abstract data types, but most of them can be categorised in just a few generic groups.
The ones we use in this book were already introduced in @sec:intro:abstract-data-types. @Fig:adt-overview summarises these ADTs and highlights how they relate to one another.
Each ADT will be discussed in more detail later in the book,
including their operations and the data structures used to implement them.

![An overview of ADTs with some common implementations](images/8.0-ADT-overview.svg){#fig:adt-overview}

This chapter will focus on ADTs for for *collection types*, types that contain a collection of values,
with operations for adding, removing and finding values.
The data structures we have seen in [Chapter @sec:sequences], dynamic arrays and linked lists, are suitable for
implementing *Sequence types*, collections of values where each value has a position.
This includes stacks, queues and lists.

In addition to sequence types, this chapter introduces three main collection ADTs that cannot
be efficiently implemented using dynamic arrays and linked lists:

Priority queues
:   A *priority queue* is also a kind of sequence, but the order of elements is determined
    by a designated priority.
    Slightly simplified: If a stack removes the newest element first, and a queue removes the oldest,
    then a priority queue removes the smallest element first -- using some comparison function.

Sets
:   A *set* represents an unordered collection of elements, capturing the mathematical notion of sets.
    Unlike sequence types, a set cannot contain duplicate values. The most important operations
    on sets are adding values and determining if a set contains a specific value.

Maps
:   A map (or *dictionary*) is similar to a set, but represents a collection of *key-value pairs*.
    The main idea is that you can use a map look up the *value* for a given
    *key* (or change the value, or remove it).
    Maps do not allow duplicate keys, so the keys of a map are a set.
