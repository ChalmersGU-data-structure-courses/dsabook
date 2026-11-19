
## Data structures {#intro:data-structures}

::: TODO
- Prio 1: start with a text talking about data structures
- Prio 1: introduce two DS: array and "sorted array", mention *invariant* for the sorted array
:::

The term data structure is loosely defined as a way of organising a
collection of data items in computer memory, along with operations for
accessing and modifying that data. Generally speaking that includes two things:

* A *data representation*, a description of how the data is stored in computer memory
* Efficient algorithms to access and modify the data

One of the simplest and most useful example of a data structure is the array.
We will be using arrays extensively as a building block for more complex data structures.
An array stores a sequence of elements in a contiguous block of memory.
As a data structure, arrays have two important limitations:

* All elements must have the same size in memory (for objects like strings, the elements are pointers)
* The size of an array cannot be extended after creation

The first limitations stems from wanting efficient *indexing*, to find
the element at position $i$, we compute its memory address
offset from the start of the array. The second limitation is because of how
computer memory is allocated, the memory immediately around the array may be occupied
by other data, so while the array can have any initial size, it cannot grow after
it is created.

If you are used to programming in Python, you may object that new elements
can be appended to arrays. That is because lists in Python are not arrays,
they are *dynamic arrays* (see @sec:sequences:dynamic-arrays).

A small variation of the array is the *sorted array*. A sorted array is an
array with an *ordering invariant*, such as an array of integers in
ascending order. The invariant must be preserved throughout the lifetime of
the sorted array. Any operation that modifies the array must ensure it remains sorted,
but it also allows operations to assume the array is sorted initially.

The other fundamental building block of data structures in this book are
objects as those in object oriented programming. Combinations of arrays
and objects with various invariants form the data representation of every
data structure taught in this book.