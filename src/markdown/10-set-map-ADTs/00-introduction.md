
# Sets and maps

::: TODO
- Prio 1: write this chapter
    - introduction
    - explanations for each interface
- Prio 2: add use cases
- Contents:
    - API for sets and maps
    - Example implementation: using lists (dyn.arrays, linked lists)
    - [1.3.3 ADTs for Sets]
    - [1.4.1 Sets]
    - [1.3.4 ADTs for Maps or Dictionaries]
    - [1.4.2 Maps or dictionaries]
    - Extension: [1.4.3 Multimaps]
    - [1.4.5 How to implement sets and maps]
    - Efficient implementations:
        - hash tables → refer to chapter
        - search trees → refer to chapter(s)
    - [1.4.4 Between X and Y: Sorted Sets and Maps]
    - [1.4.5 How to implement sets and maps]
:::

Many programming tasks involve *finding the right piece of information*
in a large dataset.
That is, we have a collection of items, and we want to quickly retrieve the items matching certain criteria.
Here are some examples of information retrieval problems:

-   *Spell-checking:* Given a set containing all valid English words,
    check if a given string is present in the set (i.e. is a valid
    word).
-   *Cash register:* Given a database of all items for sale in a supermarket, find information about the item with a given *EAN code*.-   *Search engine:* Given a collection of documents (e.g. web pages),
    find all documents containing a given word.
-   *Between X and Y:* Given a list of all Swedish towns and their populations, are there any towns whose population is between 5,000 and 10,000? And if so, which are these towns?

These problems can all be addressed using two abstract data types (ADTs):  the *set* and the *map*.
Both provide efficient ways to manage a collection of elements, supporting operations to find, add, and remove elements.

In this section, we'll explore what sets and maps are, how they work, and how they can be applied to solve the four example problems introduced above.

You may have already used sets and maps in programming, because almost
every programming language provides an implementation for them. For
example, Java provides the
[HashSet](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashSet.html)
and
[HashMap](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/HashMap.html)
classes, and Python provides
[sets](https://docs.python.org/3/tutorial/datastructures.html#sets) and
[dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)
(another word for maps) as part of their standard libraries.


Sets and maps are useful in a huge variety of computer programs, and are
perhaps the most useful of all data structures. But how can we design a
class that implements a set or a map, in such a way that adding,
removing and searching can be done efficiently? In this book we will see
several different ways of implementing sets and maps.

- In section @sec:case-study-implementing-sets-and-maps-using-sorted-lists,
we will see how to implement a set or a map using a list. By
sorting the items in the list, it is possible to look up information
efficiently. However, it turns out that adding and removing items is
quite expensive. A list is a suitable way of storing a set or a map if
its contents never changes.

- In chapter @sec:search-trees, we learn about
*balanced binary search trees (BSTs)*, a data structure for sets and
maps where adding, removing and searching are all efficient. BSTs also
support the *sorted map* operations that we used in our final example.

- In chapter @sec:hash-tables, we learn about
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
